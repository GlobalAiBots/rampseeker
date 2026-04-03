/**
 * fetch-oklahoma-ramps.ts
 *
 * Boat ramp locations are public data. This script collects publicly available
 * information from Google Places API in accordance with Google's Terms of Service.
 *
 * Usage:
 *   1. Add GOOGLE_PLACES_API_KEY=your_key to .env.local
 *   2. npx tsx scripts/fetch-oklahoma-ramps.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
if (!API_KEY) {
  console.error("ERROR: Missing GOOGLE_PLACES_API_KEY in .env.local");
  console.error("");
  console.error("To get an API key:");
  console.error("  1. Go to https://console.cloud.google.com/");
  console.error("  2. Create or select a project");
  console.error("  3. Enable 'Places API' under APIs & Services > Library");
  console.error("  4. Create an API key under APIs & Services > Credentials");
  console.error("  5. Add to .env.local: GOOGLE_PLACES_API_KEY=your_key_here");
  process.exit(1);
}

const TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

// Oklahoma bounding box
const LAT_MIN = 33.6;
const LAT_MAX = 37.0;
const LNG_MIN = -103.0;
const LNG_MAX = -94.4;
const LAT_STEP = 0.4;
const LNG_STEP = 0.5;
const RADIUS = 30000; // 30km

const SEARCH_TERMS = [
  "boat ramp",
  "boat launch",
  "boat landing",
  "public boat ramp",
  "marina boat ramp",
];

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: { location: { lat: number; lng: number } };
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  business_status?: string;
}

interface RampRecord {
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractCity(address: string): string {
  // Typical format: "123 Main St, City, OK 74xxx, USA"
  const parts = address.split(",").map((s) => s.trim());
  if (parts.length >= 3) {
    // City is usually the second-to-last before state
    const stateIdx = parts.findIndex((p) => /\bOK\b/.test(p));
    if (stateIdx > 0) return parts[stateIdx - 1];
    return parts[1];
  }
  return parts[0] || "Unknown";
}

function extractCounty(address: string): string {
  // County sometimes appears in the address, otherwise we leave blank
  const match = address.match(/(\w+)\s+County/i);
  return match ? match[1] + " County" : "";
}

async function textSearch(query: string, lat: number, lng: number, pageToken?: string): Promise<{ results: PlaceResult[]; nextPageToken?: string }> {
  const params: Record<string, string | number> = {
    query: query + " Oklahoma",
    location: `${lat},${lng}`,
    radius: RADIUS,
    key: API_KEY,
  };
  if (pageToken) {
    params.pagetoken = pageToken;
    delete params.query;
    delete params.location;
    delete params.radius;
  }

  const res = await axios.get(TEXT_SEARCH_URL, { params });

  if (res.data.status === "REQUEST_DENIED") {
    console.error("API Error:", res.data.error_message || res.data.status);
    process.exit(1);
  }

  return {
    results: res.data.results || [],
    nextPageToken: res.data.next_page_token,
  };
}

async function collectRamps(): Promise<Map<string, RampRecord>> {
  const seen = new Map<string, RampRecord>();
  let totalSearches = 0;

  // Build grid
  const points: { lat: number; lng: number }[] = [];
  for (let lat = LAT_MIN; lat <= LAT_MAX; lat += LAT_STEP) {
    for (let lng = LNG_MIN; lng <= LNG_MAX; lng += LNG_STEP) {
      points.push({ lat: +lat.toFixed(4), lng: +lng.toFixed(4) });
    }
  }

  console.log(`Grid: ${points.length} points x ${SEARCH_TERMS.length} terms = ${points.length * SEARCH_TERMS.length} max searches\n`);

  for (const term of SEARCH_TERMS) {
    console.log(`--- Searching: "${term}" ---`);

    for (let i = 0; i < points.length; i++) {
      const { lat, lng } = points[i];
      totalSearches++;

      if (i % 25 === 0) {
        process.stdout.write(`  Point ${i + 1}/${points.length} (${lat}, ${lng}) — ${seen.size} unique ramps\r`);
      }

      try {
        let { results, nextPageToken } = await textSearch(term, lat, lng);
        addResults(seen, results);

        // Paginate (up to 2 more pages = 60 results max)
        let page = 1;
        while (nextPageToken && page < 3) {
          await sleep(2000);
          const next = await textSearch(term, lat, lng, nextPageToken);
          addResults(seen, next.results);
          nextPageToken = next.nextPageToken;
          page++;
        }

        await sleep(250); // Rate limit buffer
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("OVER_QUERY_LIMIT") || msg.includes("429")) {
          console.warn(`\n  Rate limited. Waiting 60s...`);
          await sleep(60000);
          i--; // Retry
        } else {
          console.warn(`\n  Error at (${lat}, ${lng}): ${msg}`);
        }
      }
    }
    console.log(`  Done. ${seen.size} unique ramps so far.`);
  }

  console.log(`\nTotal API searches: ${totalSearches}`);
  return seen;
}

function addResults(seen: Map<string, RampRecord>, results: PlaceResult[]) {
  for (const r of results) {
    // Only keep Oklahoma results
    if (!r.formatted_address.includes("OK") && !r.formatted_address.includes("Oklahoma")) continue;

    if (!seen.has(r.place_id)) {
      seen.set(r.place_id, {
        place_id: r.place_id,
        name: r.name,
        formatted_address: r.formatted_address,
        latitude: r.geometry.location.lat,
        longitude: r.geometry.location.lng,
        city: extractCity(r.formatted_address),
        county: extractCounty(r.formatted_address),
        rating: r.rating ?? null,
        total_ratings: r.user_ratings_total ?? 0,
        types: r.types || [],
        business_status: r.business_status || "OPERATIONAL",
      });
    }
  }
}

function processRamps(raw: RampRecord[]): RampRecord[] {
  const rampKeywords = /ramp|launch|landing|boat\s*access|public\s*access|put.?in/i;
  const boatTypes = ["boat_ramp", "park", "campground", "marina"];

  return raw
    .filter((r) => {
      // Keep if name suggests a boat ramp
      if (rampKeywords.test(r.name)) return true;
      // Keep if Google types include boat-related categories
      if (r.types.some((t) => boatTypes.includes(t))) return true;
      // Keep if it has "ramp" or "launch" in the address
      if (rampKeywords.test(r.formatted_address)) return true;
      return false;
    })
    .filter((r) => r.business_status !== "CLOSED_PERMANENTLY")
    .sort((a, b) => b.latitude - a.latitude); // North to south
}

async function main() {
  console.log("=== Oklahoma Boat Ramp Collector ===\n");

  // Step 1: Collect
  const seen = await collectRamps();
  const rawArray = Array.from(seen.values());

  const rawPath = path.join(__dirname, "..", "src", "data", "oklahoma-ramps-raw.json");
  fs.writeFileSync(rawPath, JSON.stringify(rawArray, null, 2));
  console.log(`\nRaw results saved: ${rawPath} (${rawArray.length} places)`);

  // Step 2: Process
  const cleaned = processRamps(rawArray);
  const cleanPath = path.join(__dirname, "..", "src", "data", "oklahoma-ramps.json");
  fs.writeFileSync(cleanPath, JSON.stringify(cleaned, null, 2));
  console.log(`Cleaned results saved: ${cleanPath} (${cleaned.length} boat ramps)`);

  // Summary
  const byCity: Record<string, number> = {};
  for (const r of cleaned) {
    byCity[r.city] = (byCity[r.city] || 0) + 1;
  }

  console.log("\n=== SUMMARY ===");
  console.log(`Total unique boat ramps: ${cleaned.length}`);
  console.log(`Raw places found: ${rawArray.length}`);
  console.log(`\nBy city/area (top 20):`);
  Object.entries(byCity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([city, count]) => console.log(`  ${city}: ${count}`));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
