/**
 * enrich-top-lakes.ts
 * Enriches top 3 lakes per state (TX, MO, AR, KS) with Google Places data.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
if (!API_KEY) { console.error("Missing GOOGLE_PLACES_API_KEY"); process.exit(1); }

const TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// Lakes to enrich: state -> lake_ids
const targetLakes: Record<string, { file: string; stateAbbr: string; lakeName: string; lakeId: string }[]> = {
  texas: [
    { file: "texas-ramps.json", stateAbbr: "TX", lakeName: "Lake Travis", lakeId: "lake-travis" },
    { file: "texas-ramps.json", stateAbbr: "TX", lakeName: "Lewisville Lake", lakeId: "lewisville-lake" },
    { file: "texas-ramps.json", stateAbbr: "TX", lakeName: "Lake Amistad", lakeId: "lake-amistad" },
  ],
  missouri: [
    { file: "missouri-ramps.json", stateAbbr: "MO", lakeName: "Lake of the Ozarks", lakeId: "lake-of-the-ozarks" },
    { file: "missouri-ramps.json", stateAbbr: "MO", lakeName: "Table Rock Lake", lakeId: "table-rock-lake" },
    { file: "missouri-ramps.json", stateAbbr: "MO", lakeName: "Stockton Lake", lakeId: "stockton-lake" },
  ],
  arkansas: [
    { file: "arkansas-ramps.json", stateAbbr: "AR", lakeName: "Beaver Lake", lakeId: "beaver-lake" },
    { file: "arkansas-ramps.json", stateAbbr: "AR", lakeName: "Bull Shoals Lake", lakeId: "bull-shoals-lake-ar" },
    { file: "arkansas-ramps.json", stateAbbr: "AR", lakeName: "Greers Ferry Lake", lakeId: "greers-ferry-lake" },
  ],
  kansas: [
    { file: "kansas-ramps.json", stateAbbr: "KS", lakeName: "Milford Lake", lakeId: "milford-lake" },
    { file: "kansas-ramps.json", stateAbbr: "KS", lakeName: "Tuttle Creek Lake", lakeId: "tuttle-creek-lake" },
    { file: "kansas-ramps.json", stateAbbr: "KS", lakeName: "Clinton Lake", lakeId: "clinton-lake" },
  ],
};

const stateNames: Record<string, string> = { TX: "Texas", MO: "Missouri", AR: "Arkansas", KS: "Kansas" };

function assignAmenities(name: string): string[] {
  const n = name.toLowerCase();
  const a: string[] = ["parking"];
  if (/state park|recreation area|corps|usace|public use|campground/.test(n)) a.push("restrooms");
  if (/marina/.test(n)) { a.push("fuel-nearby"); a.push("restrooms"); }
  if (/landing|access/.test(n)) { /* parking already added */ }
  return a;
}

function assignFee(name: string): string {
  const n = name.toLowerCase();
  if (/marina/.test(n)) return "varies";
  return "free";
}

async function searchPlace(query: string): Promise<{ rating: number | null; total_ratings: number; address: string; city: string } | null> {
  try {
    const res = await axios.get(TEXT_SEARCH_URL, { params: { query, key: API_KEY }, timeout: 15000 });
    if (res.data.status === "OVER_QUERY_LIMIT") {
      console.warn("  Rate limited, waiting 60s...");
      await sleep(60000);
      return searchPlace(query);
    }
    const r = res.data.results?.[0];
    if (!r) return null;
    const parts = (r.formatted_address || "").split(",").map((s: string) => s.trim());
    const stIdx = parts.findIndex((p: string) => /\b(TX|MO|AR|KS|OK)\b/.test(p));
    const city = stIdx > 0 ? parts[stIdx - 1] : parts[1] || "";
    return {
      rating: r.rating ?? null,
      total_ratings: r.user_ratings_total ?? 0,
      address: r.formatted_address || "",
      city,
    };
  } catch {
    return null;
  }
}

async function main() {
  console.log("=== Enriching Top Lakes ===\n");

  let totalCalls = 0;
  let totalEnriched = 0;
  const report: string[] = [];

  for (const [state, lakes] of Object.entries(targetLakes)) {
    const dataPath = path.join(__dirname, "..", "src", "data", lakes[0].file);
    const ramps = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const stateName = stateNames[lakes[0].stateAbbr];
    console.log(`--- ${stateName} ---`);
    let stateEnriched = 0;

    for (const lake of lakes) {
      const lakeRamps = ramps.filter((r: { lake_id: string }) => r.lake_id === lake.lakeId);
      console.log(`\n  ${lake.lakeName}: ${lakeRamps.length} ramps`);
      let lakeEnriched = 0;

      for (const r of lakeRamps) {
        const origName = r.name || "Boat Ramp";
        // Skip pure generics for API calls — save quota
        const isGeneric = origName.startsWith("Boat Ramp at") || origName.startsWith("Boat Ramp near") || origName === "Boat Ramp";

        // Assign amenities and fee regardless
        if (!r.amenities || r.amenities.length === 0) {
          r.amenities = assignAmenities(origName);
        }
        if (!r.fee) r.fee = assignFee(origName);
        if (!r.rampCount) r.rampCount = 1;
        if (!r.surface) r.surface = "concrete";

        // Only call API for named ramps
        if (!isGeneric) {
          const query = `${origName} boat ramp ${stateName}`;
          process.stdout.write(`    ${origName}...`);
          const result = await searchPlace(query);
          totalCalls++;

          if (result) {
            if (result.rating) r.rating = result.rating;
            if (result.total_ratings) r.total_ratings = result.total_ratings;
            if (result.address && !r.formatted_address?.includes(stateName)) r.formatted_address = result.address;
            if (result.city && !r.city) r.city = result.city;
            console.log(` ${result.rating || "no rating"} (${result.city})`);
          } else {
            console.log(" not found");
          }
          await sleep(1000);
        }

        r.enriched = true;
        lakeEnriched++;
        stateEnriched++;
        totalEnriched++;
      }

      report.push(`  ${lake.lakeName}: ${lakeEnriched} ramps enriched`);
    }

    // Save updated file
    fs.writeFileSync(dataPath, JSON.stringify(ramps, null, 2));
    console.log(`\n  ${stateName}: ${stateEnriched} ramps enriched, saved.`);
    report.push(`${stateName}: ${stateEnriched} total enriched`);
  }

  console.log("\n========================================");
  console.log("        ENRICHMENT REPORT");
  console.log("========================================\n");
  console.log(`Total API calls: ${totalCalls}`);
  console.log(`Total ramps enriched: ${totalEnriched}`);
  console.log(`Estimated API cost: ~$${(totalCalls * 0.032).toFixed(2)} (Text Search @ $32/1000)`);
  console.log(`\nPer lake:`);
  report.forEach((r) => console.log(r));
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
