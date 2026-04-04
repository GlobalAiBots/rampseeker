/**
 * enrich-florida.ts
 * Recovers hidden Florida ramps via GPS-based Google Places nearby search,
 * then enriches all visible ramps with ratings and city data.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
if (!API_KEY) { console.error("Missing GOOGLE_PLACES_API_KEY"); process.exit(1); }

const NEARBY_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const TEXT_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function assignAmenities(name: string): string[] {
  const n = name.toLowerCase();
  const a: string[] = ["parking"];
  if (/state park|county park|recreation area|public use|campground/.test(n)) a.push("restrooms");
  if (/marina/.test(n)) { a.push("fuel-nearby"); a.push("restrooms"); }
  return a;
}

interface FLRamp {
  place_id: string; name: string; formatted_address: string;
  latitude: number; longitude: number; city: string; county: string;
  rating: number | null; total_ratings: number; types: string[]; business_status: string;
  lake_id: string; lake_name: string; water_type: string;
  amenities: string[]; fee: string; rampCount: number; surface: string; enriched: boolean;
}

async function nearbySearch(lat: number, lng: number): Promise<{ name: string; address: string; city: string; rating: number | null; total_ratings: number } | null> {
  try {
    const res = await axios.get(NEARBY_URL, {
      params: { location: `${lat},${lng}`, radius: 500, keyword: "boat ramp", key: API_KEY },
      timeout: 15000,
    });
    if (res.data.status === "OVER_QUERY_LIMIT") {
      console.warn("  Rate limited, waiting 60s...");
      await sleep(60000);
      return nearbySearch(lat, lng);
    }
    const r = res.data.results?.[0];
    if (!r || !r.name) return null;
    // Only accept if it's actually near our coordinates
    const dist = Math.abs(r.geometry.location.lat - lat) + Math.abs(r.geometry.location.lng - lng);
    if (dist > 0.01) return null; // More than ~1km away, wrong match
    const addr = r.vicinity || "";
    const parts = addr.split(",").map((s: string) => s.trim());
    return {
      name: r.name,
      address: addr,
      city: parts[parts.length - 1] || "",
      rating: r.rating ?? null,
      total_ratings: r.user_ratings_total ?? 0,
    };
  } catch { return null; }
}

async function textSearch(query: string): Promise<{ rating: number | null; total_ratings: number; address: string; city: string } | null> {
  try {
    const res = await axios.get(TEXT_URL, {
      params: { query, key: API_KEY },
      timeout: 15000,
    });
    if (res.data.status === "OVER_QUERY_LIMIT") {
      console.warn("  Rate limited, waiting 60s...");
      await sleep(60000);
      return textSearch(query);
    }
    const r = res.data.results?.find((x: { formatted_address: string }) => x.formatted_address?.includes("FL"));
    if (!r) return null;
    const parts = (r.formatted_address || "").split(",").map((s: string) => s.trim());
    const stIdx = parts.findIndex((p: string) => /\bFL\b/.test(p));
    return {
      rating: r.rating ?? null,
      total_ratings: r.user_ratings_total ?? 0,
      address: r.formatted_address || "",
      city: stIdx > 0 ? parts[stIdx - 1] : parts[1] || "",
    };
  } catch { return null; }
}

function isGenericName(name: string): boolean {
  const n = (name || "").toLowerCase();
  return !n || n.length < 3 || /^boat[_ ]ramp/i.test(n) || n === "boat launch";
}

async function main() {
  console.log("=== Florida Ramp Enrichment ===\n");

  const dataPath = path.join(__dirname, "..", "src", "data", "florida-ramps.json");
  const ramps: FLRamp[] = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  console.log(`Total Florida ramps: ${ramps.length}`);

  const hidden = ramps.filter(r => isGenericName(r.name));
  const visible = ramps.filter(r => !isGenericName(r.name));
  console.log(`Hidden (generic): ${hidden.length}`);
  console.log(`Visible (named): ${visible.length}`);

  let recovered = 0;
  let enriched = 0;
  let apiCalls = 0;

  // Phase 1: Recover hidden ramps via nearby search
  console.log(`\n--- Phase 1: Recovering hidden ramps (${hidden.length}) ---`);

  for (let i = 0; i < hidden.length; i++) {
    const r = hidden[i];

    if (i % 50 === 0) {
      console.log(`  Progress: ${i}/${hidden.length} — ${recovered} recovered, ${apiCalls} API calls`);
    }

    const result = await nearbySearch(r.latitude, r.longitude);
    apiCalls++;

    if (result && result.name && !isGenericName(result.name)) {
      r.name = result.name;
      r.formatted_address = result.address || r.formatted_address;
      r.city = result.city || r.city;
      r.rating = result.rating;
      r.total_ratings = result.total_ratings;
      r.amenities = assignAmenities(result.name);
      r.fee = /marina/i.test(result.name) ? "varies" : "free";
      r.enriched = true;
      recovered++;
    }

    await sleep(1000);
  }

  console.log(`\nPhase 1 complete: ${recovered} ramps recovered`);

  // Phase 2: Enrich visible ramps (including newly recovered)
  const toEnrich = ramps.filter(r => !isGenericName(r.name) && !r.enriched);
  console.log(`\n--- Phase 2: Enriching ${toEnrich.length} named ramps ---`);

  for (let i = 0; i < toEnrich.length; i++) {
    const r = toEnrich[i];

    if (i % 25 === 0) {
      console.log(`  Progress: ${i}/${toEnrich.length} — ${enriched} enriched`);
    }

    const result = await textSearch(`${r.name} boat ramp Florida`);
    apiCalls++;

    if (result) {
      if (result.rating) r.rating = result.rating;
      if (result.total_ratings) r.total_ratings = result.total_ratings;
      if (result.address && !r.formatted_address?.includes("FL")) r.formatted_address = result.address;
      if (result.city && !r.city) r.city = result.city;
    }

    r.amenities = r.amenities?.length ? r.amenities : assignAmenities(r.name);
    r.fee = r.fee || (/marina/i.test(r.name) ? "varies" : "free");
    r.enriched = true;
    enriched++;

    await sleep(1000);
  }

  // Save
  fs.writeFileSync(dataPath, JSON.stringify(ramps, null, 2));

  // Count new visible
  const nowVisible = ramps.filter(r => !isGenericName(r.name)).length;

  // Water body counts
  const byWB: Record<string, number> = {};
  for (const r of ramps.filter(rr => !isGenericName(rr.name))) {
    const k = r.lake_name || "(no water body)";
    byWB[k] = (byWB[k] || 0) + 1;
  }

  console.log("\n========================================");
  console.log("     FLORIDA ENRICHMENT REPORT");
  console.log("========================================\n");
  console.log(`Ramps recovered (hidden → visible): ${recovered}`);
  console.log(`Ramps enriched with ratings: ${enriched}`);
  console.log(`Total API calls: ${apiCalls}`);
  console.log(`Estimated cost: ~$${(apiCalls * 0.032).toFixed(2)}`);
  console.log(`\nVisible ramps before: ${visible.length}`);
  console.log(`Visible ramps now: ${nowVisible}`);
  console.log(`\nUpdated water body counts:`);
  Object.entries(byWB).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([w, c]) => console.log(`  ${w}: ${c}`));
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
