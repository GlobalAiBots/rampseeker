const fs = require("fs");
const path = require("path");

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};
const STATE_NAMES = {};
Object.entries(STATE_SLUGS).forEach(([c, s]) => { STATE_NAMES[c] = s.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" "); });

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.endsWith("-ramps.json"));

const allRamps = [];
files.forEach(f => {
  const stateName = f.replace("-ramps.json", "");
  const stateCode = Object.entries(STATE_SLUGS).find(([, s]) => s === stateName)?.[0] || "";
  JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8")).forEach(r => {
    allRamps.push({ ...r, stateCode, stateSlug: stateName });
  });
});

function groupByState(list) {
  const byState = {};
  list.forEach(r => {
    const st = r.stateCode || "Unknown";
    if (!byState[st]) byState[st] = { code: st, name: STATE_NAMES[st] || st, slug: STATE_SLUGS[st] || slugify(st), count: 0 };
    byState[st].count++;
  });
  return Object.values(byState).sort((a, b) => b.count - a.count);
}

const catDefs = [
  { slug: "free", title: "Free Boat Ramps", desc: "Free public boat ramps with no launch fee — save money every time you hit the water.",
    match: r => { const n = (r.name||"").toLowerCase(); return n.includes("free") || r.fee === "free"; } },
  { slug: "public", title: "Public Boat Ramps", desc: "Government-owned public boat ramps open to everyone — no membership or permits required.",
    match: r => { const n = (r.name||"").toLowerCase(); return n.includes("public") || n.includes("state park") || n.includes("county") || n.includes("city park"); } },
  { slug: "kayak", title: "Kayak & Canoe Launches", desc: "Launches designed for kayaks, canoes, and small non-motorized watercraft with easy water access.",
    match: r => { const n = (r.name||"").toLowerCase(); return n.includes("kayak") || n.includes("canoe") || n.includes("paddle") || n.includes("non-motorized"); } },
  { slug: "with-parking", title: "Boat Ramps with Parking", desc: "Boat ramps with dedicated parking areas for trucks, trailers, and vehicles.",
    match: r => (r.amenities || []).includes("parking") },
  { slug: "with-restrooms", title: "Boat Ramps with Restrooms", desc: "Boat ramps with on-site restroom facilities for your convenience.",
    match: r => (r.amenities || []).includes("restrooms") },
];

const categories = catDefs.map(def => {
  const matching = allRamps.filter(def.match);
  return { slug: def.slug, title: def.title, description: def.desc, totalCount: matching.length, states: groupByState(matching) };
}).filter(c => c.totalCount >= 10);

console.log("Categories:");
categories.forEach(c => console.log(`  ${c.slug}: ${c.totalCount} ramps`));

fs.writeFileSync(path.join(dataDir, "categories.json"), JSON.stringify(categories, null, 2));

const sitemapLines = categories.map(c => `  <url><loc>https://www.rampseeker.com/category/${c.slug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-categories.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapLines.join("\n")}\n</urlset>`);

console.log(`\nTotal: ${categories.length} categories`);
