import * as fs from "fs";
import * as path from "path";

interface OsmRamp { id: number; name: string; latitude: number; longitude: number; tags: Record<string, string> }

interface MOLake {
  id: string; name: string; lat: number; lng: number; radius: number;
  acres: number; shorelineMiles: number; maxDepth: number;
  counties: string[]; fishSpecies: string[]; nearestTowns: string[]; description: string;
}

const moLakes: MOLake[] = [
  { id:"lake-of-the-ozarks",name:"Lake of the Ozarks",lat:38.12,lng:-92.65,radius:0.25,acres:54000,shorelineMiles:1150,maxDepth:130,counties:["Camden","Miller","Morgan","Benton"],fishSpecies:["Largemouth Bass","Crappie","Catfish","White Bass","Paddlefish"],nearestTowns:["Osage Beach","Lake Ozark","Camdenton"],description:"Lake of the Ozarks is Missouri's iconic playground — 54,000 acres with 1,150 miles of shoreline (more than the California coast). Created in 1931 by Bagnell Dam on the Osage River, it's one of the largest man-made lakes in the central US.\n\nBass fishing is excellent throughout the lake's winding arms and coves. Crappie, catfish, and white bass round out the fishing. The Party Cove is famous (or infamous) for summer boat gatherings.\n\nOsage Beach, Lake Ozark, and Camdenton form the main resort corridor with marinas, restaurants, and entertainment." },
  { id:"table-rock-lake",name:"Table Rock Lake",lat:36.60,lng:-93.30,radius:0.18,acres:43100,shorelineMiles:745,maxDepth:220,counties:["Stone","Taney","Barry"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Crappie","White Bass","Catfish"],nearestTowns:["Branson","Kimberling City","Shell Knob"],description:"Table Rock Lake is a crystal-clear Ozarks jewel near Branson with some of the best bass fishing in the Midwest. The lake's clear water and rocky structure support outstanding largemouth, smallmouth, and spotted bass populations.\n\nThe 43,100-acre lake reaches depths of 220 feet near the dam and offers diverse fishing year-round. The Branson area provides world-class entertainment alongside the fishing.\n\nMultiple state parks and Corps of Engineers areas provide excellent ramp access around the lake." },
  { id:"stockton-lake",name:"Stockton Lake",lat:37.68,lng:-93.73,radius:0.12,acres:24900,shorelineMiles:298,maxDepth:115,counties:["Cedar","Dade","Polk"],fishSpecies:["Walleye","Largemouth Bass","Crappie","Catfish","Paddlefish"],nearestTowns:["Stockton","Greenfield","Bolivar"],description:"Stockton Lake is Missouri's premier walleye lake. The 24,900-acre reservoir on the Sac River produces trophy walleye regularly and has excellent crappie and bass fishing too.\n\nThe clear Ozarks water and rocky points create ideal walleye habitat. Stockton State Park on the lake's east shore provides camping and launch facilities." },
  { id:"truman-lake",name:"Truman Lake (Harry S. Truman Reservoir)",lat:38.25,lng:-93.45,radius:0.20,acres:55600,shorelineMiles:958,maxDepth:90,counties:["Benton","Henry","Hickory","St. Clair"],fishSpecies:["Crappie","Largemouth Bass","Catfish","White Bass","Paddlefish"],nearestTowns:["Warsaw","Clinton","Hermitage"],description:"Truman Lake is one of the largest reservoirs in Missouri at 55,600 acres. It's a crappie fishing paradise — consistently ranked among the best crappie lakes in the country.\n\nThe lake's flooded timber and brush provide endless crappie habitat. Bass fishing is also excellent in the creek arms. The lake connects to Lake of the Ozarks at its eastern end." },
  { id:"bull-shoals-lake",name:"Bull Shoals Lake",lat:36.55,lng:-92.60,radius:0.15,acres:45440,shorelineMiles:740,maxDepth:200,counties:["Taney","Ozark"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Crappie","Walleye","Trout (tailwater)"],nearestTowns:["Forsyth","Theodosia","Protem"],description:"Bull Shoals Lake straddles the Missouri-Arkansas border with 45,440 acres of clear Ozark water. The Missouri portion offers excellent bass fishing with largemouth, smallmouth, and spotted bass all thriving.\n\nThe tailwater below Bull Shoals Dam is a nationally recognized trout fishery. The lake's deep, clear water makes it popular for scuba diving as well." },
  { id:"pomme-de-terre-lake",name:"Pomme de Terre Lake",lat:37.88,lng:-93.33,radius:0.08,acres:7800,shorelineMiles:113,maxDepth:105,counties:["Polk","Hickory"],fishSpecies:["Muskie","Largemouth Bass","Crappie","Catfish"],nearestTowns:["Pittsburg","Hermitage","Bolivar"],description:"Pomme de Terre Lake is Missouri's best muskie lake. The 7,800-acre reservoir is stocked with muskellunge and produces trophy fish regularly. Bass and crappie fishing are also excellent." },
  { id:"mark-twain-lake",name:"Mark Twain Lake",lat:39.52,lng:-91.75,radius:0.12,acres:18600,shorelineMiles:285,maxDepth:110,counties:["Ralls","Monroe"],fishSpecies:["Largemouth Bass","Crappie","Catfish","White Bass"],nearestTowns:["Monroe City","Perry","Center"],description:"Mark Twain Lake in northeast Missouri is an 18,600-acre reservoir named for the state's most famous author. The lake offers solid bass and crappie fishing with less pressure than the bigger Ozark lakes.\n\nMark Twain State Park provides excellent facilities including a marina and multiple launch ramps." },
  { id:"smithville-lake",name:"Smithville Lake",lat:39.40,lng:-94.55,radius:0.08,acres:7200,shorelineMiles:115,maxDepth:80,counties:["Clay"],fishSpecies:["Largemouth Bass","Crappie","Walleye","Catfish"],nearestTowns:["Smithville","Kansas City","Kearney"],description:"Smithville Lake is the Kansas City metro's favorite fishing lake. Just 30 minutes north of downtown KC, it offers good bass, crappie, walleye, and catfish in a convenient location." },
  { id:"wappapello-lake",name:"Wappapello Lake",lat:37.00,lng:-90.30,radius:0.10,acres:8400,shorelineMiles:79,maxDepth:88,counties:["Wayne"],fishSpecies:["Largemouth Bass","Crappie","Catfish"],nearestTowns:["Wappapello","Poplar Bluff","Greenville"],description:"Wappapello Lake in southeastern Missouri is an 8,400-acre reservoir on the St. Francis River. Good bass and crappie fishing in the flooded timber. Less crowded than the big Ozark lakes." },
  { id:"lake-taneycomo",name:"Lake Taneycomo",lat:36.62,lng:-93.25,radius:0.06,acres:2080,shorelineMiles:22,maxDepth:100,counties:["Taney"],fishSpecies:["Rainbow Trout","Brown Trout","Largemouth Bass"],nearestTowns:["Branson","Hollister","Forsyth"],description:"Lake Taneycomo isn't really a lake — it's more like a cold river running through Branson. Fed by cold water from the bottom of Table Rock Dam, it's Missouri's premier trout fishery with rainbow and brown trout." },
  { id:"clearwater-lake",name:"Clearwater Lake",lat:37.13,lng:-90.77,radius:0.06,acres:1600,shorelineMiles:40,maxDepth:80,counties:["Reynolds"],fishSpecies:["Largemouth Bass","Crappie","Bluegill","Catfish"],nearestTowns:["Piedmont","Ellington"],description:"Clearwater Lake lives up to its name with some of the clearest water in Missouri. The small but scenic 1,600-acre lake offers good bass fishing and a peaceful, uncrowded experience." },
  { id:"norfolk-lake",name:"Norfolk Lake",lat:36.48,lng:-92.25,radius:0.10,acres:22000,shorelineMiles:550,maxDepth:180,counties:["Ozark (MO)","Baxter (AR)"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Crappie","Walleye","Catfish"],nearestTowns:["Gainesville","Mountain Home (AR)"],description:"Norfolk Lake spans the Missouri-Arkansas border with 22,000 acres of clear Ozark water. The Missouri arm offers excellent bass fishing with less boat traffic than the Arkansas side." },
];

const moRamps: OsmRamp[] = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "states", "missouri.json"), "utf8"));

function findLake(lat: number, lng: number): MOLake | null {
  for (const l of moLakes) { if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l; }
  return null;
}

const moCities: { name: string; lat: number; lng: number; r: number }[] = [
  {name:"Kansas City",lat:39.10,lng:-94.58,r:0.3},{name:"St. Louis",lat:38.63,lng:-90.20,r:0.3},
  {name:"Springfield",lat:37.22,lng:-93.29,r:0.2},{name:"Columbia",lat:38.95,lng:-92.33,r:0.15},
  {name:"Branson",lat:36.64,lng:-93.22,r:0.12},{name:"Joplin",lat:37.08,lng:-94.51,r:0.1},
  {name:"Jefferson City",lat:38.58,lng:-92.17,r:0.1},{name:"Cape Girardeau",lat:37.31,lng:-89.52,r:0.1},
  {name:"Osage Beach",lat:38.13,lng:-92.66,r:0.08},{name:"Camdenton",lat:37.99,lng:-92.74,r:0.08},
  {name:"Warsaw",lat:38.24,lng:-93.38,r:0.08},{name:"Clinton",lat:38.37,lng:-93.78,r:0.08},
  {name:"Stockton",lat:37.70,lng:-93.80,r:0.08},{name:"Poplar Bluff",lat:36.76,lng:-90.39,r:0.08},
  {name:"Smithville",lat:39.39,lng:-94.58,r:0.06},{name:"Forsyth",lat:36.69,lng:-93.12,r:0.06},
];

function findCity(lat: number, lng: number): string {
  let best = ""; let bestDist = Infinity;
  for (const c of moCities) { const d = Math.abs(lat - c.lat) + Math.abs(lng - c.lng); if (d < c.r && d < bestDist) { best = c.name; bestDist = d; } }
  return best;
}

function slugify(s: string): string { return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").substring(0, 60); }

const seenSlugs = new Set<string>();
const records: Array<{
  place_id: string; name: string; formatted_address: string;
  latitude: number; longitude: number; city: string; county: string;
  rating: number | null; total_ratings: number; types: string[]; business_status: string;
  lake_id: string; lake_name: string;
}> = [];

for (const r of moRamps) {
  const lake = findLake(r.latitude, r.longitude);
  const city = r.tags?.["addr:city"] || findCity(r.latitude, r.longitude) || "";
  let name = r.name || "Boat Ramp";
  if (name === "Boat Ramp" && lake) name = `Boat Ramp at ${lake.name}`;
  if (name === "Boat Ramp" && city) name = `Boat Ramp near ${city}`;
  let slug = slugify(name);
  if (seenSlugs.has(slug)) slug = `${slug}-${r.id.toString().substring(0, 6)}`;
  seenSlugs.add(slug);
  records.push({
    place_id: "osm_" + r.id, name, formatted_address: city ? `${city}, MO, USA` : "Missouri, USA",
    latitude: r.latitude, longitude: r.longitude, city, county: "", rating: null, total_ratings: 0,
    types: ["leisure_slipway"], business_status: "OPERATIONAL", lake_id: lake?.id || "", lake_name: lake?.name || "",
  });
}

const outDir = path.join(__dirname, "..", "src", "data");
fs.writeFileSync(path.join(outDir, "missouri-ramps.json"), JSON.stringify(records, null, 2));

const byLake: Record<string, number> = {};
for (const r of records) { const k = r.lake_name || "(no lake)"; byLake[k] = (byLake[k] || 0) + 1; }

const lakesOut = moLakes.map(l => ({ ...l, rampCount: byLake[l.name] || 0 }));
fs.writeFileSync(path.join(outDir, "missouri-lakes.json"), JSON.stringify(lakesOut, null, 2));

console.log("Missouri ramps:", records.length);
console.log("Lakes:", lakesOut.length);
console.log("\nBy lake:");
Object.entries(byLake).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([l, c]) => console.log(`  ${l}: ${c}`));
const withLake = records.filter(r => r.lake_id).length;
console.log(`\nWith lake: ${withLake}/${records.length}`);
