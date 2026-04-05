/**
 * enrich-mi-mn.ts
 * Enriches Michigan Great Lakes ramps and ALL Minnesota ramps via Google Places API.
 * - Michigan: Only ramps near Lake Michigan, Lake Huron, Lake Superior, Lake Erie, Lake St. Clair
 * - Minnesota: All 1,729 ramps
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
  if (/state park|county park|recreation area|public use|campground|dnr|public access/.test(n)) a.push("restrooms");
  if (/marina/.test(n)) { a.push("fuel-nearby"); a.push("restrooms"); }
  return a;
}

interface Ramp {
  place_id: string; name: string; formatted_address: string;
  latitude: number; longitude: number; city: string; county: string;
  rating: number | null; total_ratings: number; types: string[];
  business_status: string;
  amenities?: string[]; fee?: string; rampCount?: number; surface?: string; enriched?: boolean;
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
    const dist = Math.abs(r.geometry.location.lat - lat) + Math.abs(r.geometry.location.lng - lng);
    if (dist > 0.01) return null;
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

async function textSearch(query: string, stateAbbr: string): Promise<{ rating: number | null; total_ratings: number; address: string; city: string } | null> {
  try {
    const res = await axios.get(TEXT_URL, {
      params: { query, key: API_KEY },
      timeout: 15000,
    });
    if (res.data.status === "OVER_QUERY_LIMIT") {
      console.warn("  Rate limited, waiting 60s...");
      await sleep(60000);
      return textSearch(query, stateAbbr);
    }
    const r = res.data.results?.find((x: { formatted_address: string }) => x.formatted_address?.includes(stateAbbr));
    if (!r) return null;
    const parts = (r.formatted_address || "").split(",").map((s: string) => s.trim());
    const stIdx = parts.findIndex((p: string) => new RegExp(`\\b${stateAbbr}\\b`).test(p));
    return {
      rating: r.rating ?? null,
      total_ratings: r.user_ratings_total ?? 0,
      address: r.formatted_address || "",
      city: stIdx > 0 ? parts[stIdx - 1] : parts[1] || "",
    };
  } catch { return null; }
}

function isGenericName(name: string): boolean {
  const n = (name || "").trim().toLowerCase();
  return !n || n.length < 3 || n === "boat ramp" || n === "boat launch" || n === "slipway";
}

// Michigan Great Lakes GPS bounding boxes (generous ~10 mile buffer from shoreline)
const GL_BOUNDS: Record<string, { latMin: number; latMax: number; lngMin: number; lngMax: number }> = {
  "Lake Michigan": { latMin: 41.5, latMax: 46.5, lngMin: -87.5, lngMax: -85.5 },
  "Lake Huron": { latMin: 43.0, latMax: 46.5, lngMin: -84.5, lngMax: -82.0 },
  "Lake Superior": { latMin: 46.0, latMax: 48.5, lngMin: -90.5, lngMax: -84.0 },
  "Lake Erie": { latMin: 41.3, latMax: 42.2, lngMin: -84.0, lngMax: -82.5 },
  "Lake St. Clair": { latMin: 42.2, latMax: 42.7, lngMin: -83.1, lngMax: -82.5 },
};

function isNearGreatLake(lat: number, lng: number): string | null {
  for (const [name, b] of Object.entries(GL_BOUNDS)) {
    if (lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax) return name;
  }
  return null;
}

async function enrichState(
  ramps: Ramp[],
  stateName: string,
  stateAbbr: string,
  filterFn: (r: Ramp) => boolean,
) {
  const toProcess = ramps.filter(filterFn);
  const hidden = toProcess.filter(r => isGenericName(r.name));
  const visible = toProcess.filter(r => !isGenericName(r.name) && !r.enriched);
  const alreadyEnriched = toProcess.filter(r => r.enriched);

  console.log(`\n=== ${stateName} Enrichment ===`);
  console.log(`Ramps to process: ${toProcess.length}`);
  console.log(`  Hidden (generic name): ${hidden.length}`);
  console.log(`  Visible (not yet enriched): ${visible.length}`);
  console.log(`  Already enriched: ${alreadyEnriched.length}`);

  let recovered = 0;
  let enrichedCount = 0;
  let apiCalls = 0;

  // Phase 1: Recover hidden ramps via nearby search
  console.log(`\n--- Phase 1: Recovering ${hidden.length} hidden ramps ---`);

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
    } else {
      // Even if not recovered, mark as enriched so we don't retry
      r.enriched = true;
    }

    await sleep(1000);
  }

  console.log(`\nPhase 1 complete: ${recovered} ramps recovered out of ${hidden.length} hidden`);

  // Phase 2: Enrich visible ramps with ratings
  console.log(`\n--- Phase 2: Enriching ${visible.length} named ramps ---`);

  for (let i = 0; i < visible.length; i++) {
    const r = visible[i];

    if (i % 25 === 0) {
      console.log(`  Progress: ${i}/${visible.length} — ${enrichedCount} enriched`);
    }

    const result = await textSearch(`${r.name} boat ramp ${stateName}`, stateAbbr);
    apiCalls++;

    if (result) {
      if (result.rating) r.rating = result.rating;
      if (result.total_ratings) r.total_ratings = result.total_ratings;
      if (result.address && !r.formatted_address?.includes(stateAbbr)) r.formatted_address = result.address;
      if (result.city && !r.city) r.city = result.city;
    }

    r.amenities = r.amenities?.length ? r.amenities : assignAmenities(r.name);
    r.fee = r.fee || (/marina/i.test(r.name) ? "varies" : "free");
    r.enriched = true;
    enrichedCount++;

    await sleep(1000);
  }

  return { recovered, enrichedCount, apiCalls, totalProcessed: toProcess.length };
}

async function main() {
  console.log("========================================");
  console.log("  MI Great Lakes + MN Full Enrichment");
  console.log("========================================\n");

  // --- MICHIGAN ---
  const miPath = path.join(__dirname, "..", "src", "data", "michigan-ramps.json");
  const miRamps: Ramp[] = JSON.parse(fs.readFileSync(miPath, "utf8"));
  console.log(`Michigan total ramps: ${miRamps.length}`);

  // Count by Great Lake before
  for (const [name, b] of Object.entries(GL_BOUNDS)) {
    const near = miRamps.filter(r => isNearGreatLake(r.latitude, r.longitude) === name);
    const vis = near.filter(r => !isGenericName(r.name));
    console.log(`  ${name}: ${near.length} total, ${vis.length} visible`);
  }

  const miResult = await enrichState(
    miRamps,
    "Michigan",
    "MI",
    (r) => isNearGreatLake(r.latitude, r.longitude) !== null,
  );

  // Save Michigan
  fs.writeFileSync(miPath, JSON.stringify(miRamps, null, 2));
  console.log("\nMichigan data saved.");

  // Count by Great Lake after
  console.log("\nMichigan Great Lakes — After enrichment:");
  let miGLVisible = 0;
  for (const [name] of Object.entries(GL_BOUNDS)) {
    const near = miRamps.filter(r => isNearGreatLake(r.latitude, r.longitude) === name);
    const vis = near.filter(r => !isGenericName(r.name));
    console.log(`  ${name}: ${vis.length} visible (of ${near.length})`);
    miGLVisible += vis.length;
  }

  const miInlandVisible = miRamps.filter(r => isNearGreatLake(r.latitude, r.longitude) === null && !isGenericName(r.name)).length;
  console.log(`\nMI Great Lakes visible: ${miGLVisible}`);
  console.log(`MI Inland visible (unchanged): ${miInlandVisible}`);
  console.log(`MI Total visible: ${miGLVisible + miInlandVisible}`);

  // --- MINNESOTA ---
  const mnPath = path.join(__dirname, "..", "src", "data", "minnesota-ramps.json");
  const mnRamps: Ramp[] = JSON.parse(fs.readFileSync(mnPath, "utf8"));
  console.log(`\nMinnesota total ramps: ${mnRamps.length}`);

  const mnResult = await enrichState(
    mnRamps,
    "Minnesota",
    "MN",
    () => true, // all ramps
  );

  // Save Minnesota
  fs.writeFileSync(mnPath, JSON.stringify(mnRamps, null, 2));
  console.log("\nMinnesota data saved.");

  const mnNowVisible = mnRamps.filter(r => !isGenericName(r.name)).length;

  // --- FINAL REPORT ---
  const totalApiCalls = miResult.apiCalls + mnResult.apiCalls;

  console.log("\n========================================");
  console.log("         FINAL ENRICHMENT REPORT");
  console.log("========================================\n");

  console.log("MICHIGAN (Great Lakes only):");
  console.log(`  API calls: ${miResult.apiCalls}`);
  console.log(`  Ramps recovered (hidden → visible): ${miResult.recovered}`);
  console.log(`  Ramps enriched with ratings: ${miResult.enrichedCount}`);
  console.log(`  Great Lakes visible: ${miGLVisible}`);
  console.log(`  Inland visible (unchanged): ${miInlandVisible}`);
  console.log(`  Total MI visible: ${miGLVisible + miInlandVisible}`);

  console.log("\nMINNESOTA (all ramps):");
  console.log(`  API calls: ${mnResult.apiCalls}`);
  console.log(`  Ramps recovered (hidden → visible): ${mnResult.recovered}`);
  console.log(`  Ramps enriched with ratings: ${mnResult.enrichedCount}`);
  console.log(`  Total MN visible: ${mnNowVisible}`);

  console.log(`\nTotal API calls: ${totalApiCalls}`);
  console.log(`Estimated cost: ~$${(totalApiCalls * 0.032).toFixed(2)}`);
  console.log(`(Google Places: $0.032 per Nearby/Text Search request)`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
