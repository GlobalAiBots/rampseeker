/* eslint-disable */
/**
 * Cross-state pollution audit for rampseeker ramp data.
 *
 * Reads every src/data/{state}-ramps.json file (state implied by filename),
 * checks each ramp's lat/lng against state bounding boxes, and reports
 * mistagged records.
 *
 * Limitation: bounding boxes are rectangles. Shared water-body borders
 * (Mississippi River for IL/MO, Lake Michigan for MI/WI, Great Lakes,
 * etc.) cannot be cleanly captured by rectangles — bboxes from neighboring
 * states overlap on shared water. Pollution along those borders may be
 * reported as "ambiguous" or even as "correct" because the declared bbox
 * still contains the coords. Treat the audit as a floor on pollution,
 * not a complete picture.
 */
const fs = require("fs");
const path = require("path");

// Approximate state bboxes [minLat, maxLat, minLng, maxLng]
const STATE_BBOX = {
  alabama: [30.14, 35.01, -88.47, -84.89],
  alaska: [54.0, 71.5, -179.99, -129.97],
  arizona: [31.33, 37.0, -114.82, -109.05],
  arkansas: [33.0, 36.5, -94.62, -89.64],
  california: [32.53, 42.0, -124.42, -114.13],
  colorado: [36.99, 41.0, -109.06, -102.04],
  connecticut: [40.99, 42.05, -73.73, -71.79],
  delaware: [38.45, 39.84, -75.79, -75.05],
  "district-of-columbia": [38.79, 39.0, -77.12, -76.91],
  florida: [24.4, 31.0, -87.63, -80.03],
  georgia: [30.36, 35.0, -85.61, -80.84],
  hawaii: [18.91, 22.24, -160.25, -154.81],
  idaho: [41.99, 49.0, -117.24, -111.04],
  illinois: [36.97, 42.51, -91.51, -87.5],
  indiana: [37.77, 41.76, -88.1, -84.78],
  iowa: [40.38, 43.5, -96.64, -90.14],
  kansas: [37.0, 40.0, -102.05, -94.59],
  kentucky: [36.5, 39.15, -89.57, -81.97],
  louisiana: [28.93, 33.02, -94.04, -88.82],
  maine: [43.06, 47.46, -71.08, -66.95],
  maryland: [37.91, 39.72, -79.49, -75.05],
  massachusetts: [41.24, 42.89, -73.51, -69.93],
  michigan: [41.7, 48.31, -90.42, -82.41],
  minnesota: [43.5, 49.38, -97.24, -89.49],
  mississippi: [30.17, 35.01, -91.66, -88.1],
  missouri: [35.99, 40.61, -95.77, -89.1],
  montana: [44.36, 49.0, -116.05, -104.04],
  nebraska: [40.0, 43.0, -104.05, -95.31],
  nevada: [35.0, 42.0, -120.01, -114.04],
  "new-hampshire": [42.7, 45.31, -72.56, -70.61],
  "new-jersey": [38.93, 41.36, -75.56, -73.89],
  "new-mexico": [31.33, 37.0, -109.05, -103.0],
  "new-york": [40.5, 45.02, -79.76, -71.86],
  "north-carolina": [33.84, 36.59, -84.32, -75.46],
  "north-dakota": [45.94, 49.0, -104.05, -96.55],
  ohio: [38.4, 41.98, -84.82, -80.52],
  oklahoma: [33.62, 37.0, -103.0, -94.43],
  oregon: [41.99, 46.3, -124.55, -116.46],
  pennsylvania: [39.72, 42.27, -80.52, -74.69],
  "rhode-island": [41.15, 42.02, -71.86, -71.12],
  "south-carolina": [32.03, 35.22, -83.35, -78.54],
  "south-dakota": [42.48, 45.95, -104.06, -96.44],
  tennessee: [34.98, 36.68, -90.31, -81.65],
  texas: [25.84, 36.5, -106.65, -93.51],
  utah: [37.0, 42.0, -114.05, -109.04],
  vermont: [42.73, 45.02, -73.44, -71.46],
  virginia: [36.54, 39.47, -83.68, -75.24],
  washington: [45.54, 49.0, -124.85, -116.92],
  "west-virginia": [37.2, 40.64, -82.65, -77.72],
  wisconsin: [42.49, 47.08, -92.89, -86.81],
  wyoming: [40.99, 45.01, -111.05, -104.05],
};

const inBBox = (lat, lng, bbox) =>
  lat >= bbox[0] && lat <= bbox[1] && lng >= bbox[2] && lng <= bbox[3];

function findStates(lat, lng, declared) {
  if (STATE_BBOX[declared] && inBBox(lat, lng, STATE_BBOX[declared])) {
    // declared bbox matches — also collect alternate states that match (border ambiguity)
    const alternates = Object.keys(STATE_BBOX).filter(
      (s) => s !== declared && inBBox(lat, lng, STATE_BBOX[s]),
    );
    return { match: declared, alternates, status: alternates.length ? "ambiguous_border" : "correct" };
  }
  const matches = Object.keys(STATE_BBOX).filter((s) => inBBox(lat, lng, STATE_BBOX[s]));
  if (matches.length === 0) return { match: null, alternates: [], status: "no_match" };
  if (matches.length === 1) return { match: matches[0], alternates: [], status: "mistagged" };
  return { match: matches[0], alternates: matches.slice(1), status: "mistagged_multi" };
}

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter((f) => /-ramps\.json$/.test(f));

let total = 0,
  correct = 0,
  ambiguous = 0,
  mistagged = 0,
  noMatch = 0;
const byState = {};
const flowMap = {}; // declared -> { actual: count }

for (const f of files) {
  const stateSlug = f.replace("-ramps.json", "");
  const arr = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));
  for (const r of arr) {
    total++;
    const lat = r.latitude,
      lng = r.longitude;
    if (lat == null || lng == null) continue;
    const result = findStates(lat, lng, stateSlug);
    if (result.status === "correct") {
      correct++;
      continue;
    }
    if (result.status === "ambiguous_border") {
      ambiguous++;
      continue;
    }
    if (result.status === "no_match") {
      noMatch++;
      continue;
    }
    mistagged++;
    if (!byState[stateSlug]) byState[stateSlug] = [];
    byState[stateSlug].push({
      name: r.name,
      city: r.city,
      lat,
      lng,
      probable: result.match,
      otherCandidates: result.alternates,
    });
    if (!flowMap[stateSlug]) flowMap[stateSlug] = {};
    flowMap[stateSlug][result.match] = (flowMap[stateSlug][result.match] || 0) + 1;
  }
}

console.log("=== POLLUTION AUDIT SUMMARY ===");
console.log("Total ramps:", total);
console.log("Coords inside declared bbox (correct or ambiguous):", correct + ambiguous);
console.log("  - clean (only one state matches):", correct);
console.log("  - ambiguous (multiple state bboxes contain coords — shared water borders):", ambiguous);
console.log("Mistagged (clearly outside declared bbox):", mistagged);
console.log("No match (coords outside all 50 state bboxes — Canadian / ocean / bad data):", noMatch);
console.log();
console.log("=== MISTAGGED COUNT BY DECLARED STATE ===");
const sortedStates = Object.entries(byState).sort((a, b) => b[1].length - a[1].length);
for (const [s, recs] of sortedStates) {
  console.log("  " + s + ": " + recs.length + " mistagged");
}
console.log();
console.log("=== POLLUTION FLOW (declared -> actually-in) for top 10 ===");
for (const [declared, recs] of sortedStates.slice(0, 10)) {
  console.log("  " + declared + " (" + recs.length + " mistagged):");
  const dest = Object.entries(flowMap[declared]).sort((a, b) => b[1] - a[1]);
  for (const [actual, count] of dest) {
    console.log("    -> " + actual + ": " + count);
  }
}
console.log();
console.log("=== SAMPLES — top 5 mistagged states, 3 records each ===");
for (const [s, recs] of sortedStates.slice(0, 5)) {
  console.log("  " + s + ":");
  for (const r of recs.slice(0, 3)) {
    console.log(
      "    " +
        (r.name || "(no name)").substring(0, 40) +
        " | city=" +
        (r.city || "?") +
        " | (" +
        r.lat.toFixed(2) +
        "," +
        r.lng.toFixed(2) +
        ") -> " +
        r.probable,
    );
  }
}

fs.writeFileSync(path.join(__dirname, "..", "pollution-audit.json"), JSON.stringify({ summary: { total, correct, ambiguous, mistagged, noMatch }, byState, flowMap }, null, 2));
console.log();
console.log("Full report saved to ./pollution-audit.json");
