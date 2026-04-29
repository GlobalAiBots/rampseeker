/* eslint-disable */
/**
 * Build-time precompute: for every US state, generate a sorted [city, count]
 * list of cities with at least one ramp whose coordinates fall inside the
 * state's actual political polygon (point-in-polygon test against US Census
 * state boundaries).
 *
 * Output: src/data/state-cities-prefiltered.json
 *
 * State pages import this small JSON directly. The polygon library and
 * the GeoJSON file never reach the client bundle — they only run here at
 * build time.
 *
 * Run: node scripts/precompute-state-cities.js
 *
 * Why polygon-in-polygon and not a bbox check: bboxes can't follow the
 * Mississippi River (IL/MO border), Lake Michigan (MI/WI border), or any
 * other shared water boundary. Rectangles overlap on shared water and
 * leave both sides matching. A real polygon test resolves it correctly.
 */
const fs = require("fs");
const path = require("path");
const { point } = require("@turf/helpers");
const booleanPointInPolygon = require("@turf/boolean-point-in-polygon").default;

const STATES_GEOJSON_PATH = path.join(__dirname, "data", "us-states.geojson");
const RAMP_DATA_DIR = path.join(__dirname, "..", "src", "data");
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "state-cities-prefiltered.json");

// Map US Census state name -> our route slug
const NAME_TO_SLUG = {
  Alabama: "alabama",
  Alaska: "alaska",
  Arizona: "arizona",
  Arkansas: "arkansas",
  California: "california",
  Colorado: "colorado",
  Connecticut: "connecticut",
  Delaware: "delaware",
  "District of Columbia": "district-of-columbia",
  Florida: "florida",
  Georgia: "georgia",
  Hawaii: "hawaii",
  Idaho: "idaho",
  Illinois: "illinois",
  Indiana: "indiana",
  Iowa: "iowa",
  Kansas: "kansas",
  Kentucky: "kentucky",
  Louisiana: "louisiana",
  Maine: "maine",
  Maryland: "maryland",
  Massachusetts: "massachusetts",
  Michigan: "michigan",
  Minnesota: "minnesota",
  Mississippi: "mississippi",
  Missouri: "missouri",
  Montana: "montana",
  Nebraska: "nebraska",
  Nevada: "nevada",
  "New Hampshire": "new-hampshire",
  "New Jersey": "new-jersey",
  "New Mexico": "new-mexico",
  "New York": "new-york",
  "North Carolina": "north-carolina",
  "North Dakota": "north-dakota",
  Ohio: "ohio",
  Oklahoma: "oklahoma",
  Oregon: "oregon",
  Pennsylvania: "pennsylvania",
  "Rhode Island": "rhode-island",
  "South Carolina": "south-carolina",
  "South Dakota": "south-dakota",
  Tennessee: "tennessee",
  Texas: "texas",
  Utah: "utah",
  Vermont: "vermont",
  Virginia: "virginia",
  Washington: "washington",
  "West Virginia": "west-virginia",
  Wisconsin: "wisconsin",
  Wyoming: "wyoming",
};

console.log("Loading US state polygons...");
const states = JSON.parse(fs.readFileSync(STATES_GEOJSON_PATH, "utf8"));

// slug -> polygon feature
const STATE_POLY = {};
for (const f of states.features) {
  const name = f.properties.name || f.properties.NAME;
  const slug = NAME_TO_SLUG[name];
  if (slug) STATE_POLY[slug] = f;
}
console.log(`Loaded ${Object.keys(STATE_POLY).length} state polygons.`);

const isInStatePolygon = (lat, lng, slug) => {
  const poly = STATE_POLY[slug];
  if (!poly) return true;
  if (lat == null || lng == null) return true;
  try {
    return booleanPointInPolygon(point([lng, lat]), poly);
  } catch {
    return true;
  }
};

// Load every per-state ramp file, run polygon test, build city counts
const rampFiles = fs.readdirSync(RAMP_DATA_DIR).filter((f) => /-ramps\.json$/.test(f));
console.log(`Processing ${rampFiles.length} state ramp files...`);

const result = {};
const stats = { total: 0, kept: 0, dropped: 0, missingCoords: 0, droppedBySlug: {} };

for (const file of rampFiles) {
  const slug = file.replace("-ramps.json", "");
  const ramps = JSON.parse(fs.readFileSync(path.join(RAMP_DATA_DIR, file), "utf8"));
  const cityCounts = {};
  let kept = 0,
    dropped = 0;
  for (const r of ramps) {
    stats.total++;
    const lat = r.latitude;
    const lng = r.longitude;
    const city = (r.city || "").trim();
    if (!city || city.length <= 1) continue;
    if (lat == null || lng == null) {
      stats.missingCoords++;
      // Coords missing → keep the city (we can't verify either way)
      cityCounts[city] = (cityCounts[city] || 0) + 1;
      kept++;
      continue;
    }
    if (!isInStatePolygon(lat, lng, slug)) {
      dropped++;
      continue;
    }
    cityCounts[city] = (cityCounts[city] || 0) + 1;
    kept++;
  }
  stats.kept += kept;
  stats.dropped += dropped;
  if (dropped > 0) stats.droppedBySlug[slug] = dropped;

  // Sort desc by count and keep tuples — same shape state pages already use
  const sorted = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]);
  result[slug] = sorted;
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result));
const sizeKB = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1);

console.log();
console.log("=== PRECOMPUTE COMPLETE ===");
console.log(`Total ramps processed:  ${stats.total}`);
console.log(`Kept (in declared state):  ${stats.kept}`);
console.log(`Dropped (outside polygon): ${stats.dropped}`);
console.log(`Missing coords (kept):     ${stats.missingCoords}`);
console.log();
console.log("Top 10 states by drop count (cross-state pollution):");
const dropEntries = Object.entries(stats.droppedBySlug).sort((a, b) => b[1] - a[1]);
for (const [s, n] of dropEntries.slice(0, 10)) console.log(`  ${s}: ${n}`);
console.log();
console.log(`Output: ${OUTPUT_PATH} (${sizeKB} KB)`);
