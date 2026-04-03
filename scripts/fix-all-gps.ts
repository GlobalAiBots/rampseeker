/**
 * fix-all-gps.ts
 *
 * Verifies and corrects GPS coordinates for ALL ramps in the database
 * using Google Places API.
 *
 * Usage: npx tsx scripts/fix-all-gps.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
if (!API_KEY) { console.error("Missing GOOGLE_PLACES_API_KEY in .env.local"); process.exit(1); }

const TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

// ── Distance calculation ──

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dlat = (lat2 - lat1) * 69.0;
  const dlng = (lng2 - lng1) * Math.cos((lat1 * Math.PI) / 180) * 69.0;
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// ── Google Places search ──

interface PlaceResult {
  lat: number;
  lng: number;
  name: string;
  address: string;
  place_id: string;
}

async function searchPlace(query: string): Promise<PlaceResult | null> {
  try {
    const res = await axios.get(TEXT_SEARCH_URL, { params: { query, key: API_KEY } });
    if (res.data.status === "OVER_QUERY_LIMIT") {
      console.warn("    Rate limited, waiting 30s...");
      await sleep(30000);
      return searchPlace(query);
    }
    const results = res.data.results || [];
    // Prefer Oklahoma results
    const okResult = results.find((r: { formatted_address: string }) =>
      r.formatted_address.includes("OK") || r.formatted_address.includes("Oklahoma")
    ) || results[0];
    if (!okResult) return null;
    return {
      lat: okResult.geometry.location.lat,
      lng: okResult.geometry.location.lng,
      name: okResult.name,
      address: okResult.formatted_address,
      place_id: okResult.place_id,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("429")) {
      console.warn("    HTTP 429, waiting 60s...");
      await sleep(60000);
      return searchPlace(query);
    }
    return null;
  }
}

async function findRamp(name: string, oldLat: number, oldLng: number): Promise<{ result: PlaceResult | null; attempt: string }> {
  // Try 1: specific boat ramp search
  let result = await searchPlace(`${name} boat ramp Oklahoma`);
  if (result && distanceMiles(oldLat, oldLng, result.lat, result.lng) < 50) {
    return { result, attempt: "boat ramp OK" };
  }
  await sleep(1000);

  // Try 2: name + Oklahoma
  result = await searchPlace(`${name} Oklahoma`);
  if (result && distanceMiles(oldLat, oldLng, result.lat, result.lng) < 50) {
    return { result, attempt: "name + OK" };
  }
  await sleep(1000);

  // Try 3: just the name
  result = await searchPlace(name);
  if (result) {
    return { result, attempt: "name only" };
  }

  return { result: null, attempt: "no match" };
}

// ── Load data ──

interface OKRamp {
  place_id: string;
  name: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
  city: string;
  county: string;
  rating: number | null;
  total_ratings: number;
  types: string[];
  business_status: string;
}

const okPath = path.join(__dirname, "..", "src", "data", "oklahoma-ramps.json");
const okRamps: OKRamp[] = JSON.parse(fs.readFileSync(okPath, "utf8"));

// Parse Grand Lake ramps from TS file
const glPath = path.join(__dirname, "..", "src", "data", "ramps.ts");
const glContent = fs.readFileSync(glPath, "utf8");

interface GLEntry { name: string; lat: number; lng: number }
const glEntries: GLEntry[] = [];
const rampBlocks = glContent.split(/\n  \{/);
for (const block of rampBlocks) {
  const nameMatch = block.match(/name: "([^"]+)"/);
  const latMatch = block.match(/latitude: ([\d.-]+)/);
  const lngMatch = block.match(/longitude: ([\d.-]+)/);
  if (nameMatch && latMatch && lngMatch) {
    glEntries.push({
      name: nameMatch[1],
      lat: parseFloat(latMatch[1]),
      lng: parseFloat(lngMatch[1]),
    });
  }
}

// ── Main ──

async function main() {
  console.log("=== GPS Coordinate Verification ===\n");
  console.log(`Grand Lake ramps: ${glEntries.length}`);
  console.log(`Oklahoma ramps: ${okRamps.length}`);
  console.log(`Total to check: ${glEntries.length + okRamps.length}\n`);

  const updated: string[] = [];
  const significantMoves: string[] = [];
  const noMatch: string[] = [];
  const suspicious: string[] = [];
  let checked = 0;

  // ── Check Grand Lake ramps ──
  console.log("--- Grand Lake Ramps ---");
  const glUpdates: Record<string, { lat: number; lng: number }> = {};

  for (const gl of glEntries) {
    checked++;
    process.stdout.write(`  [${checked}/${glEntries.length + okRamps.length}] ${gl.name}...`);

    const { result, attempt } = await findRamp(gl.name, gl.lat, gl.lng);

    if (!result) {
      noMatch.push(`${gl.name} (Grand Lake) — kept ${gl.lat}, ${gl.lng}`);
      console.log(` NO MATCH (kept original)`);
    } else {
      const dist = distanceMiles(gl.lat, gl.lng, result.lat, result.lng);
      if (dist > 50) {
        suspicious.push(`${gl.name}: ${dist.toFixed(1)}mi away → ${result.name} at ${result.lat}, ${result.lng} (${result.address})`);
        console.log(` SUSPICIOUS (${dist.toFixed(1)}mi away)`);
      } else if (dist > 0.01) {
        glUpdates[gl.name] = { lat: result.lat, lng: result.lng };
        updated.push(`${gl.name}: ${gl.lat},${gl.lng} → ${result.lat},${result.lng} (${dist.toFixed(2)}mi, ${attempt})`);
        if (dist > 0.5) {
          significantMoves.push(`${gl.name}: moved ${dist.toFixed(2)}mi — ${gl.lat},${gl.lng} → ${result.lat},${result.lng}`);
        }
        console.log(` UPDATED (${dist.toFixed(2)}mi via ${attempt})`);
      } else {
        console.log(` OK (${dist.toFixed(3)}mi)`);
      }
    }
    await sleep(1000);
  }

  // ── Check Oklahoma ramps ──
  console.log("\n--- Oklahoma Ramps ---");

  for (let i = 0; i < okRamps.length; i++) {
    const r = okRamps[i];
    checked++;

    if (checked % 25 === 0 || i === 0) {
      console.log(`\n  Progress: ${checked}/${glEntries.length + okRamps.length} — ${updated.length} updated so far\n`);
    }

    process.stdout.write(`  [${checked}] ${r.name}...`);

    const { result, attempt } = await findRamp(r.name, r.latitude, r.longitude);

    if (!result) {
      noMatch.push(`${r.name} (${r.city}) — kept ${r.latitude}, ${r.longitude}`);
      console.log(` NO MATCH`);
    } else {
      const dist = distanceMiles(r.latitude, r.longitude, result.lat, result.lng);
      if (dist > 50) {
        suspicious.push(`${r.name} (${r.city}): ${dist.toFixed(1)}mi away → ${result.name} at ${result.lat}, ${result.lng}`);
        console.log(` SUSPICIOUS (${dist.toFixed(1)}mi)`);
      } else if (dist > 0.01) {
        okRamps[i].latitude = result.lat;
        okRamps[i].longitude = result.lng;
        if (result.address && result.address.includes("OK")) {
          okRamps[i].formatted_address = result.address;
        }
        updated.push(`${r.name}: ${r.latitude},${r.longitude} → ${result.lat},${result.lng} (${dist.toFixed(2)}mi, ${attempt})`);
        if (dist > 0.5) {
          significantMoves.push(`${r.name} (${r.city}): moved ${dist.toFixed(2)}mi`);
        }
        console.log(` UPDATED (${dist.toFixed(2)}mi)`);
      } else {
        console.log(` OK`);
      }
    }
    await sleep(1000);
  }

  // ── Save Oklahoma ramps ──
  fs.writeFileSync(okPath, JSON.stringify(okRamps, null, 2));
  console.log(`\nSaved updated oklahoma-ramps.json`);

  // ── Update Grand Lake ramps.ts ──
  let glUpdated = glContent;
  for (const [name, coords] of Object.entries(glUpdates)) {
    // Find and replace the coordinates for this ramp
    const nameEscaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `(name: "${nameEscaped}"[\\s\\S]*?latitude: )[\\d.-]+(,[\\s\\S]*?longitude: )[\\d.-]+`,
    );
    glUpdated = glUpdated.replace(pattern, `$1${coords.lat}$2${coords.lng}`);
  }
  if (Object.keys(glUpdates).length > 0) {
    fs.writeFileSync(glPath, glUpdated);
    console.log(`Updated ${Object.keys(glUpdates).length} coordinates in ramps.ts`);
  }

  // ── Report ──
  console.log("\n========================================");
  console.log("           GPS VERIFICATION REPORT");
  console.log("========================================\n");
  console.log(`Total ramps checked: ${checked}`);
  console.log(`Coordinates updated: ${updated.length}`);
  console.log(`Significant moves (>0.5mi): ${significantMoves.length}`);
  console.log(`No match found (kept original): ${noMatch.length}`);
  console.log(`Suspicious (>50mi, not applied): ${suspicious.length}`);

  if (significantMoves.length > 0) {
    console.log("\n--- Significant Moves (>0.5 miles) ---");
    significantMoves.forEach((s) => console.log(`  ${s}`));
  }

  if (noMatch.length > 0) {
    console.log("\n--- No Match Found (kept original) ---");
    noMatch.forEach((s) => console.log(`  ${s}`));
  }

  if (suspicious.length > 0) {
    console.log("\n--- Suspicious Matches (>50mi, NOT applied) ---");
    suspicious.forEach((s) => console.log(`  ${s}`));
  }

  // Save report
  const reportPath = path.join(__dirname, "output", "gps-report.txt");
  const report = [
    `GPS Verification Report — ${new Date().toISOString()}`,
    `Total checked: ${checked}`,
    `Updated: ${updated.length}`,
    `Significant moves: ${significantMoves.length}`,
    `No match: ${noMatch.length}`,
    `Suspicious: ${suspicious.length}`,
    "",
    "=== All Updates ===",
    ...updated,
    "",
    "=== Significant Moves ===",
    ...significantMoves,
    "",
    "=== No Match ===",
    ...noMatch,
    "",
    "=== Suspicious ===",
    ...suspicious,
  ].join("\n");
  fs.writeFileSync(reportPath, report);
  console.log(`\nFull report saved to scripts/output/gps-report.txt`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
