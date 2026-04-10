const fs = require("fs");
const path = require("path");

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.endsWith("-ramps.json"));

// Load all ramps
const allRamps = [];
files.forEach(f => {
  const stateName = f.replace("-ramps.json", "");
  const stateCode = Object.entries(STATE_SLUGS).find(([, s]) => s === stateName)?.[0] || "";
  const ramps = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));
  ramps.forEach(r => {
    if (r.name && r.latitude && r.longitude) {
      allRamps.push({
        id: r.place_id || `${stateName}-${slugify(r.name)}`,
        name: r.name,
        lat: r.latitude,
        lng: r.longitude,
        city: r.city || "",
        state: stateCode,
      });
    }
  });
});

console.log(`Loaded ${allRamps.length} ramps`);

// Sort by latitude for spatial optimization
allRamps.sort((a, b) => a.lat - b.lat);

// Build nearby map with latitude window optimization
const nearby = {};
const MAX_DIST = 50; // miles
const LAT_WINDOW = 0.75; // ~52 miles in latitude degrees
let comparisons = 0;

for (let i = 0; i < allRamps.length; i++) {
  const r = allRamps[i];
  const candidates = [];

  // Look backward and forward within latitude window
  for (let j = i - 1; j >= 0 && allRamps[j].lat >= r.lat - LAT_WINDOW; j--) {
    const dist = haversine(r.lat, r.lng, allRamps[j].lat, allRamps[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= MAX_DIST) {
      candidates.push({ id: allRamps[j].id, name: allRamps[j].name, distance: Math.round(dist * 10) / 10, city: allRamps[j].city, state: allRamps[j].state });
    }
  }
  for (let j = i + 1; j < allRamps.length && allRamps[j].lat <= r.lat + LAT_WINDOW; j++) {
    const dist = haversine(r.lat, r.lng, allRamps[j].lat, allRamps[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= MAX_DIST) {
      candidates.push({ id: allRamps[j].id, name: allRamps[j].name, distance: Math.round(dist * 10) / 10, city: allRamps[j].city, state: allRamps[j].state });
    }
  }

  // Keep closest 5
  candidates.sort((a, b) => a.distance - b.distance);
  if (candidates.length > 0) {
    nearby[r.id] = candidates.slice(0, 5);
  }

  if ((i + 1) % 5000 === 0) {
    console.log(`  ${i + 1}/${allRamps.length} processed (${comparisons.toLocaleString()} comparisons)`);
  }
}

const outputFile = path.join(dataDir, "nearby.json");
fs.writeFileSync(outputFile, JSON.stringify(nearby));

const withNearby = Object.keys(nearby).length;
const avgNearby = Object.values(nearby).reduce((s, v) => s + v.length, 0) / Math.max(withNearby, 1);
const fileSize = (fs.statSync(outputFile).size / 1024 / 1024).toFixed(1);

console.log(`\nDone: ${comparisons.toLocaleString()} comparisons`);
console.log(`Ramps with nearby: ${withNearby}/${allRamps.length}`);
console.log(`Avg nearby per ramp: ${avgNearby.toFixed(1)}`);
console.log(`File size: ${fileSize}MB`);
