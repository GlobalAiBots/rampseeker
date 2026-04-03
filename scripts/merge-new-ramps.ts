/**
 * merge-new-ramps.ts
 *
 * Merges verified new ramps from scripts/output/new-verified.json
 * into src/data/oklahoma-ramps.json, deduplicating by GPS proximity.
 *
 * Usage: npx tsx scripts/merge-new-ramps.ts
 */

import * as fs from "fs";
import * as path from "path";

const DATA_PATH = path.join(__dirname, "..", "src", "data", "oklahoma-ramps.json");
const NEW_PATH = path.join(__dirname, "output", "new-verified.json");

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

function main() {
  console.log("=== Merging New Ramps ===\n");

  const existing: RampRecord[] = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  console.log(`Existing ramps: ${existing.length}`);

  if (!fs.existsSync(NEW_PATH)) {
    console.error("No new-verified.json found. Run process-new-ramps.ts first.");
    process.exit(1);
  }

  const newRamps: Array<{
    name: string; latitude: number; longitude: number; address: string;
    city: string; rating: number | null; total_ratings: number; place_id: string;
    originalName: string;
  }> = JSON.parse(fs.readFileSync(NEW_PATH, "utf8"));

  console.log(`New verified ramps: ${newRamps.length}`);

  let added = 0;
  let skipped = 0;

  for (const nr of newRamps) {
    // Check GPS proximity — skip if within 0.005 degrees (~500m) of existing
    const tooClose = existing.some((e) =>
      Math.abs(e.latitude - nr.latitude) < 0.005 && Math.abs(e.longitude - nr.longitude) < 0.005
    );

    // Also check place_id duplicate
    const samePlaceId = existing.some((e) => e.place_id === nr.place_id);

    if (tooClose || samePlaceId) {
      skipped++;
      continue;
    }

    existing.push({
      place_id: nr.place_id,
      name: nr.name,
      formatted_address: nr.address,
      latitude: nr.latitude,
      longitude: nr.longitude,
      city: nr.city,
      county: "",
      rating: nr.rating,
      total_ratings: nr.total_ratings,
      types: ["establishment", "point_of_interest"],
      business_status: "OPERATIONAL",
    });
    added++;
  }

  // Sort by latitude (north to south)
  existing.sort((a, b) => b.latitude - a.latitude);

  fs.writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2));

  console.log(`\nAdded: ${added} new ramps`);
  console.log(`Skipped: ${skipped} (too close to existing or duplicate place_id)`);
  console.log(`Total ramps now: ${existing.length}`);
  console.log(`\nSaved to ${DATA_PATH}`);
}

main();
