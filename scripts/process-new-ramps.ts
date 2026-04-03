/**
 * process-new-ramps.ts
 *
 * Processes a raw list of potential boat ramps, deduplicates against existing data,
 * verifies new entries via Google Places API, and outputs categorized results.
 *
 * Usage: npx tsx scripts/process-new-ramps.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
const TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

// ── Load existing data ──

const existingOK: Array<{ name: string; latitude: number; longitude: number; place_id: string }> =
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "oklahoma-ramps.json"), "utf8"));

// Parse Grand Lake ramp names from the TS file
const rampsTsContent = fs.readFileSync(path.join(__dirname, "..", "src", "data", "ramps.ts"), "utf8");
const grandLakeNames = [...rampsTsContent.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);

const allExistingNames = [
  ...existingOK.map((r) => r.name.toLowerCase().trim()),
  ...grandLakeNames.map((n) => n.toLowerCase().trim()),
];

// ── Exclusion patterns ──

const EXCLUDE_PATTERNS = [
  /pavilion/i, /yacht club/i, /campground loop/i, /\brv park\b/i,
  /\bassociation\b/i, /\bnon-profit\b/i, /\bunknown\b/i,
  /\bbiological station\b/i, /\bsailing club\b/i, /\bboat club\b/i,
];

const BARE_WATER_BODIES = /^(eufaula lake|hulah lake|lake texoma|broken bow lake|oologah lake|hugo lake|wister lake|fort cobb reservoir|canton lake|keystone lake|optima lake|lake fort supply|lake chickasha|canadian river|arkansas river|cimarron river|poteau river|red river)$/i;

function shouldExclude(name: string): boolean {
  if (EXCLUDE_PATTERNS.some((p) => p.test(name))) return true;
  if (BARE_WATER_BODIES.test(name.trim())) return true;
  // Exclude bare creek/river names with no facility context
  if (/^([\w\s]+)\s+(creek|river)$/i.test(name.trim()) && !/landing|ramp|launch|park|point|cove|bay/i.test(name)) return true;
  // Exclude street addresses
  if (/^\d+\w*\s+(avenue|street|blvd|road)\b/i.test(name.trim())) return true;
  if (/^(S\.|SW |NW |SE |NE |N\.|E\.|W\.)\s*\d/i.test(name.trim())) return true;
  return false;
}

function toTitleCase(s: string): string {
  // If ALL CAPS, convert to Title Case
  if (s === s.toUpperCase() && s.length > 3) {
    return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\bOk\b/, "OK").replace(/\bFt\b/, "Ft").replace(/\b(I|Ii|Iii)\b/gi, (m) => m.toUpperCase());
  }
  return s.trim();
}

function normalize(name: string): string {
  return name
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/\(OK\)/gi, "")
    .replace(/\s*-\s*/g, " - ")
    .trim();
}

function fuzzyMatch(a: string, b: string): boolean {
  const na = a.toLowerCase().replace(/[^a-z0-9]/g, "");
  const nb = b.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  // Check core words match (ignore "boat", "ramp", "park", etc.)
  const stopWords = new Set(["boat", "ramp", "park", "lake", "the", "area", "state", "recreation", "landing", "ok", "oklahoma"]);
  const wordsA = na.match(/[a-z]+/g)?.filter((w) => !stopWords.has(w) && w.length > 2) || [];
  const wordsB = nb.match(/[a-z]+/g)?.filter((w) => !stopWords.has(w) && w.length > 2) || [];
  if (wordsA.length >= 2 && wordsB.length >= 2) {
    const matchCount = wordsA.filter((w) => wordsB.includes(w)).length;
    if (matchCount >= 2) return true;
  }
  return false;
}

function existsAlready(name: string): boolean {
  return allExistingNames.some((existing) => fuzzyMatch(name, existing));
}

// ── Google Places lookup ──

async function searchPlaces(query: string): Promise<{
  name: string; latitude: number; longitude: number; address: string;
  city: string; rating: number | null; total_ratings: number; place_id: string;
} | null> {
  if (!API_KEY) return null;
  try {
    const res = await axios.get(TEXT_SEARCH_URL, {
      params: { query: query + " Oklahoma", key: API_KEY },
    });
    const results = res.data.results || [];
    // Filter to Oklahoma results
    const okResult = results.find((r: { formatted_address: string }) =>
      r.formatted_address.includes("OK") || r.formatted_address.includes("Oklahoma")
    );
    if (!okResult) return null;
    const parts = okResult.formatted_address.split(",").map((s: string) => s.trim());
    const stateIdx = parts.findIndex((p: string) => /\bOK\b/.test(p));
    const city = stateIdx > 0 ? parts[stateIdx - 1] : parts[1] || "";
    return {
      name: okResult.name,
      latitude: okResult.geometry.location.lat,
      longitude: okResult.geometry.location.lng,
      address: okResult.formatted_address,
      city,
      rating: okResult.rating ?? null,
      total_ratings: okResult.user_ratings_total ?? 0,
      place_id: okResult.place_id,
    };
  } catch {
    return null;
  }
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// ── Main ──

async function main() {
  console.log("=== Processing New Ramp List ===\n");

  // Read and clean raw list
  const raw = fs.readFileSync(path.join(__dirname, "new-ramps-raw.txt"), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 2);

  console.log(`Raw entries: ${raw.length}`);

  // Normalize and deduplicate
  const seen = new Set<string>();
  const cleaned: string[] = [];
  for (const line of raw) {
    const normalized = normalize(toTitleCase(line));
    const key = normalized.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seen.has(key)) continue;
    seen.add(key);
    if (shouldExclude(normalized)) continue;
    cleaned.push(normalized);
  }

  console.log(`After cleaning: ${cleaned.length} (removed ${raw.length - cleaned.length} duplicates/exclusions)\n`);

  // Categorize
  const alreadyExists: string[] = [];
  const needsLookup: string[] = [];

  for (const name of cleaned) {
    if (existsAlready(name)) {
      alreadyExists.push(name);
    } else {
      needsLookup.push(name);
    }
  }

  console.log(`Already in database: ${alreadyExists.length}`);
  console.log(`New — needs verification: ${needsLookup.length}\n`);

  // Google Places lookup for new entries
  const verified: Array<{
    name: string; latitude: number; longitude: number; address: string;
    city: string; rating: number | null; total_ratings: number; place_id: string;
    originalName: string;
  }> = [];
  const unverified: string[] = [];

  if (API_KEY) {
    console.log("Looking up new ramps on Google Places...\n");
    for (let i = 0; i < needsLookup.length; i++) {
      const name = needsLookup[i];
      process.stdout.write(`  [${i + 1}/${needsLookup.length}] ${name}...`);

      // Try specific search first
      let result = await searchPlaces(`${name} boat ramp`);
      if (!result) {
        await sleep(1000);
        result = await searchPlaces(name);
      }

      if (result) {
        verified.push({ ...result, originalName: name });
        console.log(` FOUND (${result.city})`);
      } else {
        unverified.push(name);
        console.log(` NOT FOUND`);
      }

      await sleep(1000); // Rate limit: 1 req/sec
    }
  } else {
    console.log("No GOOGLE_PLACES_API_KEY — skipping verification. All new entries marked as unverified.\n");
    unverified.push(...needsLookup);
  }

  // Save results
  const outDir = path.join(__dirname, "output");
  fs.writeFileSync(path.join(outDir, "already-exists.json"), JSON.stringify(alreadyExists, null, 2));
  fs.writeFileSync(path.join(outDir, "new-verified.json"), JSON.stringify(verified, null, 2));
  fs.writeFileSync(path.join(outDir, "unverified.json"), JSON.stringify(unverified, null, 2));

  console.log("\n=== SUMMARY ===");
  console.log(`Already exist: ${alreadyExists.length}`);
  console.log(`New verified (with GPS): ${verified.length}`);
  console.log(`Unverified (needs review): ${unverified.length}`);
  console.log(`\nFiles saved to scripts/output/`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
