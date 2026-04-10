const fs = require("fs");
const path = require("path");

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const STATE_SLUGS = {
  AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",
  CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",
  IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",
  ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",
  MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",
  NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",
  OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",
  TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",
  WV:"west-virginia",WI:"wisconsin",WY:"wyoming",
};

const STATE_NAMES = {};
Object.entries(STATE_SLUGS).forEach(([code, slug]) => {
  STATE_NAMES[code] = slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
});

// Load all ramp data
const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.endsWith("-ramps.json"));

const allRamps = [];
files.forEach(f => {
  const ramps = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));
  // Extract state code from filename
  const stateName = f.replace("-ramps.json", "");
  const stateCode = Object.entries(STATE_SLUGS).find(([, slug]) => slug === stateName)?.[0] || "";
  ramps.forEach(r => {
    if (r.name && r.latitude && r.longitude) {
      allRamps.push({
        id: r.place_id || `${stateName}-${slugify(r.name)}`,
        name: r.name,
        lat: r.latitude,
        lng: r.longitude,
        city: (r.city || "").trim(),
        state: stateCode,
        stateSlug: stateName,
      });
    }
  });
});

console.log(`Total ramps loaded: ${allRamps.length}`);

// Group by state + city
const cityGroups = {};
allRamps.forEach(r => {
  if (!r.city || r.city.length < 2 || r.city === "Unknown") return;
  const key = `${r.state}|${r.city}`;
  if (!cityGroups[key]) {
    cityGroups[key] = {
      state: r.state,
      stateName: STATE_NAMES[r.state] || r.state,
      stateSlug: r.stateSlug,
      city: r.city,
      citySlug: slugify(r.city),
      ramps: [],
      lats: [],
      lngs: [],
    };
  }
  cityGroups[key].ramps.push(r.id);
  cityGroups[key].lats.push(r.lat);
  cityGroups[key].lngs.push(r.lng);
});

// Filter to cities with 2+ ramps
const cities = Object.values(cityGroups)
  .filter(c => c.ramps.length >= 2)
  .map(c => ({
    state: c.state,
    stateName: c.stateName,
    stateSlug: c.stateSlug,
    city: c.city,
    citySlug: c.citySlug,
    count: c.ramps.length,
    lat: c.lats.reduce((a, b) => a + b, 0) / c.lats.length,
    lng: c.lngs.reduce((a, b) => a + b, 0) / c.lngs.length,
  }))
  .sort((a, b) => b.count - a.count);

// Save
const outputFile = path.join(dataDir, "cities.json");
fs.writeFileSync(outputFile, JSON.stringify(cities, null, 2));

// Generate sitemap
const sitemapLines = cities.map(c =>
  `  <url><loc>https://rampseeker.com/${c.stateSlug}/cities/${c.citySlug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapLines.join("\n")}\n</urlset>`;
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-cities.xml"), sitemap);

// Report
console.log(`\nTotal city pages generated: ${cities.length}`);
console.log(`\nTop 20 cities by ramp count:`);
cities.slice(0, 20).forEach(c => console.log(`  ${c.city}, ${c.state}: ${c.count} ramps`));

const stateCityCounts = {};
cities.forEach(c => { stateCityCounts[c.state] = (stateCityCounts[c.state] || 0) + 1; });
console.log(`\nTop 10 states by city page count:`);
Object.entries(stateCityCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([st, c]) => console.log(`  ${st}: ${c} cities`));

console.log(`\nSaved to ${outputFile}`);
console.log(`Sitemap saved to public/sitemap-cities.xml`);
