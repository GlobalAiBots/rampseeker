/**
 * fetch-us-ramps.ts
 *
 * Downloads boat ramp data for the entire United States from OpenStreetMap
 * via the Overpass API (free, no API key needed).
 *
 * Usage: npx tsx scripts/fetch-us-ramps.ts
 */

import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

// US regions with bounding boxes [south, west, north, east]
const regions: { name: string; bbox: [number, number, number, number] }[] = [
  // Split into ~12 regions to avoid timeouts
  { name: "Pacific NW", bbox: [42.0, -125.0, 49.5, -116.0] },
  { name: "Pacific SW", bbox: [32.0, -125.0, 42.0, -114.0] },
  { name: "Mountain N", bbox: [42.0, -116.0, 49.5, -104.0] },
  { name: "Mountain S", bbox: [31.0, -114.0, 42.0, -104.0] },
  { name: "Plains N", bbox: [40.0, -104.0, 49.5, -95.0] },
  { name: "Plains S", bbox: [25.0, -104.0, 40.0, -95.0] },
  { name: "Midwest N", bbox: [42.0, -95.0, 49.5, -84.0] },
  { name: "Midwest S", bbox: [35.0, -95.0, 42.0, -84.0] },
  { name: "Southeast W", bbox: [25.0, -95.0, 35.0, -84.0] },
  { name: "Southeast E", bbox: [25.0, -84.0, 35.0, -75.0] },
  { name: "Northeast S", bbox: [35.0, -84.0, 42.0, -66.5] },
  { name: "Northeast N", bbox: [42.0, -84.0, 47.5, -66.5] },
  { name: "Alaska", bbox: [51.0, -180.0, 71.5, -129.0] },
  { name: "Hawaii", bbox: [18.5, -160.5, 22.5, -154.5] },
];

// State bounding boxes for classification
const stateBounds: { state: string; abbr: string; s: number; w: number; n: number; e: number }[] = [
  { state: "Alabama", abbr: "AL", s: 30.2, w: -88.5, n: 35.0, e: -84.9 },
  { state: "Alaska", abbr: "AK", s: 51.2, w: -180.0, n: 71.4, e: -129.0 },
  { state: "Arizona", abbr: "AZ", s: 31.3, w: -114.8, n: 37.0, e: -109.0 },
  { state: "Arkansas", abbr: "AR", s: 33.0, w: -94.6, n: 36.5, e: -89.6 },
  { state: "California", abbr: "CA", s: 32.5, w: -124.5, n: 42.0, e: -114.1 },
  { state: "Colorado", abbr: "CO", s: 36.9, w: -109.1, n: 41.0, e: -102.0 },
  { state: "Connecticut", abbr: "CT", s: 40.9, w: -73.7, n: 42.1, e: -71.8 },
  { state: "Delaware", abbr: "DE", s: 38.4, w: -75.8, n: 39.8, e: -75.0 },
  { state: "Florida", abbr: "FL", s: 24.5, w: -87.6, n: 31.0, e: -80.0 },
  { state: "Georgia", abbr: "GA", s: 30.4, w: -85.6, n: 35.0, e: -80.8 },
  { state: "Hawaii", abbr: "HI", s: 18.9, w: -160.3, n: 22.3, e: -154.8 },
  { state: "Idaho", abbr: "ID", s: 42.0, w: -117.2, n: 49.0, e: -111.0 },
  { state: "Illinois", abbr: "IL", s: 36.9, w: -91.5, n: 42.5, e: -87.5 },
  { state: "Indiana", abbr: "IN", s: 37.8, w: -88.1, n: 41.8, e: -84.8 },
  { state: "Iowa", abbr: "IA", s: 40.4, w: -96.6, n: 43.5, e: -90.1 },
  { state: "Kansas", abbr: "KS", s: 37.0, w: -102.1, n: 40.0, e: -94.6 },
  { state: "Kentucky", abbr: "KY", s: 36.5, w: -89.6, n: 39.1, e: -81.9 },
  { state: "Louisiana", abbr: "LA", s: 28.9, w: -94.0, n: 33.0, e: -89.0 },
  { state: "Maine", abbr: "ME", s: 43.1, w: -71.1, n: 47.5, e: -66.9 },
  { state: "Maryland", abbr: "MD", s: 37.9, w: -79.5, n: 39.7, e: -75.0 },
  { state: "Massachusetts", abbr: "MA", s: 41.2, w: -73.5, n: 42.9, e: -69.9 },
  { state: "Michigan", abbr: "MI", s: 41.7, w: -90.4, n: 48.3, e: -82.4 },
  { state: "Minnesota", abbr: "MN", s: 43.5, w: -97.2, n: 49.4, e: -89.5 },
  { state: "Mississippi", abbr: "MS", s: 30.2, w: -91.7, n: 35.0, e: -88.1 },
  { state: "Missouri", abbr: "MO", s: 36.0, w: -95.8, n: 40.6, e: -89.1 },
  { state: "Montana", abbr: "MT", s: 44.4, w: -116.1, n: 49.0, e: -104.0 },
  { state: "Nebraska", abbr: "NE", s: 40.0, w: -104.1, n: 43.0, e: -95.3 },
  { state: "Nevada", abbr: "NV", s: 35.0, w: -120.0, n: 42.0, e: -114.0 },
  { state: "New Hampshire", abbr: "NH", s: 42.7, w: -72.6, n: 45.3, e: -70.7 },
  { state: "New Jersey", abbr: "NJ", s: 38.9, w: -75.6, n: 41.4, e: -73.9 },
  { state: "New Mexico", abbr: "NM", s: 31.3, w: -109.1, n: 37.0, e: -103.0 },
  { state: "New York", abbr: "NY", s: 40.5, w: -79.8, n: 45.0, e: -71.9 },
  { state: "North Carolina", abbr: "NC", s: 33.8, w: -84.3, n: 36.6, e: -75.5 },
  { state: "North Dakota", abbr: "ND", s: 45.9, w: -104.1, n: 49.0, e: -96.6 },
  { state: "Ohio", abbr: "OH", s: 38.4, w: -84.8, n: 42.0, e: -80.5 },
  { state: "Oklahoma", abbr: "OK", s: 33.6, w: -103.0, n: 37.0, e: -94.4 },
  { state: "Oregon", abbr: "OR", s: 42.0, w: -124.6, n: 46.3, e: -116.5 },
  { state: "Pennsylvania", abbr: "PA", s: 39.7, w: -80.5, n: 42.3, e: -74.7 },
  { state: "Rhode Island", abbr: "RI", s: 41.1, w: -71.9, n: 42.0, e: -71.1 },
  { state: "South Carolina", abbr: "SC", s: 32.0, w: -83.4, n: 35.2, e: -78.5 },
  { state: "South Dakota", abbr: "SD", s: 42.5, w: -104.1, n: 46.0, e: -96.4 },
  { state: "Tennessee", abbr: "TN", s: 35.0, w: -90.3, n: 36.7, e: -81.6 },
  { state: "Texas", abbr: "TX", s: 25.8, w: -106.7, n: 36.5, e: -93.5 },
  { state: "Utah", abbr: "UT", s: 37.0, w: -114.1, n: 42.0, e: -109.0 },
  { state: "Vermont", abbr: "VT", s: 42.7, w: -73.4, n: 45.0, e: -71.5 },
  { state: "Virginia", abbr: "VA", s: 36.5, w: -83.7, n: 39.5, e: -75.2 },
  { state: "Washington", abbr: "WA", s: 45.5, w: -124.8, n: 49.0, e: -116.9 },
  { state: "West Virginia", abbr: "WV", s: 37.2, w: -82.6, n: 40.6, e: -77.7 },
  { state: "Wisconsin", abbr: "WI", s: 42.5, w: -92.9, n: 47.1, e: -86.8 },
  { state: "Wyoming", abbr: "WY", s: 41.0, w: -111.1, n: 45.0, e: -104.1 },
];

interface OsmNode {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
}

interface RampRecord {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  stateAbbr: string;
  tags: Record<string, string>;
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function getState(lat: number, lng: number): { state: string; abbr: string } | null {
  for (const s of stateBounds) {
    if (lat >= s.s && lat <= s.n && lng >= s.w && lng <= s.e) {
      return { state: s.state, abbr: s.abbr };
    }
  }
  return null;
}

async function queryOverpass(bbox: [number, number, number, number], retries = 3): Promise<OsmNode[]> {
  const [s, w, n, e] = bbox;
  const query = `[out:json][timeout:120];(node["leisure"="slipway"](${s},${w},${n},${e});node["seamark:type"="slipway"](${s},${w},${n},${e});way["leisure"="slipway"](${s},${w},${n},${e}););out center;`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 180000,
      });
      return (res.data.elements || []).map((el: OsmNode & { center?: { lat: number; lon: number } }) => ({
        ...el,
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
      })).filter((el: OsmNode) => el.lat && el.lon);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  Attempt ${attempt + 1} failed: ${msg.substring(0, 80)}`);
      if (attempt < retries - 1) {
        console.warn(`  Waiting ${30 * (attempt + 1)}s before retry...`);
        await sleep(30000 * (attempt + 1));
      }
    }
  }
  return [];
}

function toTitleCase(s: string): string {
  if (!s) return "";
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  console.log("=== US Boat Ramp Data Collection (OpenStreetMap) ===\n");

  const allNodes: OsmNode[] = [];

  for (let i = 0; i < regions.length; i++) {
    const r = regions[i];
    console.log(`[${i + 1}/${regions.length}] Querying ${r.name}...`);
    const nodes = await queryOverpass(r.bbox);
    console.log(`  Found ${nodes.length} ramps`);
    allNodes.push(...nodes);
    if (i < regions.length - 1) await sleep(10000); // Be polite to Overpass
  }

  // Deduplicate by OSM ID
  const seen = new Map<number, OsmNode>();
  for (const n of allNodes) {
    if (!seen.has(n.id)) seen.set(n.id, n);
  }

  console.log(`\nTotal unique OSM nodes: ${seen.size}`);

  // Classify by state and build records
  const ramps: RampRecord[] = [];
  const stateMap: Record<string, RampRecord[]> = {};
  let unclassified = 0;

  for (const node of seen.values()) {
    const stateInfo = getState(node.lat, node.lon);
    if (!stateInfo) { unclassified++; continue; }

    const name = toTitleCase(node.tags?.name || node.tags?.["seamark:name"] || "") || "Boat Ramp";
    const record: RampRecord = {
      id: node.id,
      name,
      latitude: node.lat,
      longitude: node.lon,
      state: stateInfo.state,
      stateAbbr: stateInfo.abbr,
      tags: node.tags || {},
    };
    ramps.push(record);

    if (!stateMap[stateInfo.state]) stateMap[stateInfo.state] = [];
    stateMap[stateInfo.state].push(record);
  }

  console.log(`Classified: ${ramps.length} ramps across ${Object.keys(stateMap).length} states`);
  console.log(`Unclassified (outside US bounds): ${unclassified}`);

  // Save master file
  const dataDir = path.join(__dirname, "data");
  fs.writeFileSync(path.join(dataDir, "all-us-ramps.json"), JSON.stringify(ramps, null, 2));
  console.log(`\nSaved: scripts/data/all-us-ramps.json (${ramps.length} ramps)`);

  // Save per-state files
  const statesDir = path.join(dataDir, "states");
  for (const [state, stateRamps] of Object.entries(stateMap)) {
    const slug = state.toLowerCase().replace(/\s+/g, "-");
    fs.writeFileSync(path.join(statesDir, `${slug}.json`), JSON.stringify(stateRamps, null, 2));
  }
  console.log(`Saved: ${Object.keys(stateMap).length} state files to scripts/data/states/`);

  // Cross-check Oklahoma
  console.log("\n--- Oklahoma Cross-Check ---");
  const existingOK: Array<{ name: string; latitude: number; longitude: number }> =
    JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "oklahoma-ramps.json"), "utf8"));

  const newOK = stateMap["Oklahoma"] || [];
  let alreadyHave = 0;
  let newToAdd = 0;
  const newOKRamps: RampRecord[] = [];

  for (const nr of newOK) {
    const tooClose = existingOK.some((e) =>
      Math.abs(e.latitude - nr.latitude) < 0.005 && Math.abs(e.longitude - nr.longitude) < 0.005
    );
    if (tooClose) { alreadyHave++; } else { newToAdd++; newOKRamps.push(nr); }
  }

  console.log(`Existing OK ramps: ${existingOK.length}`);
  console.log(`Found in OSM: ${newOK.length}`);
  console.log(`Already have (GPS match): ${alreadyHave}`);
  console.log(`New ramps to review: ${newToAdd}`);

  if (newOKRamps.length > 0) {
    fs.writeFileSync(path.join(dataDir, "oklahoma-new-from-osm.json"), JSON.stringify(newOKRamps, null, 2));
    console.log(`Saved: scripts/data/oklahoma-new-from-osm.json`);
  }

  // Report
  console.log("\n========================================");
  console.log("     US BOAT RAMP DATA REPORT");
  console.log("========================================\n");
  console.log(`Total ramps found: ${ramps.length.toLocaleString()}`);
  console.log(`\nTop 20 states by ramp count:`);
  console.log("State                | Ramps");
  console.log("---------------------|------");

  const sorted = Object.entries(stateMap).sort((a, b) => b[1].length - a[1].length);
  sorted.slice(0, 20).forEach(([state, r]) => {
    console.log(`${state.padEnd(21)}| ${r.length.toLocaleString()}`);
  });

  // Neighboring states
  console.log("\n--- Neighboring states (ready to build) ---");
  for (const neighbor of ["Texas", "Missouri", "Arkansas", "Kansas", "Colorado", "New Mexico"]) {
    const count = stateMap[neighbor]?.length || 0;
    console.log(`  ${neighbor}: ${count} ramps`);
  }

  console.log("\nData files created:");
  console.log(`  scripts/data/all-us-ramps.json (${ramps.length.toLocaleString()} total)`);
  console.log(`  scripts/data/states/ (${Object.keys(stateMap).length} state files)`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
