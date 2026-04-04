import * as fs from "fs";
import * as path from "path";

interface OsmRamp { id: number; name: string; latitude: number; longitude: number; tags: Record<string, string> }
interface ARLake {
  id: string; name: string; lat: number; lng: number; radius: number;
  acres: number; shorelineMiles: number; maxDepth: number;
  counties: string[]; fishSpecies: string[]; nearestTowns: string[]; description: string;
}

const arLakes: ARLake[] = [
  { id:"beaver-lake",name:"Beaver Lake",lat:36.35,lng:-94.05,radius:0.18,acres:28370,shorelineMiles:487,maxDepth:210,counties:["Benton","Washington","Carroll","Madison"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Striped Bass","Crappie","Walleye","Catfish"],nearestTowns:["Rogers","Eureka Springs","Springdale"],description:"Beaver Lake is Northwest Arkansas's premier lake — 28,370 acres of crystal-clear Ozark water impounded on the White River. The lake's clear water and rocky structure support outstanding bass fishing with all three species (largemouth, smallmouth, and spotted) thriving.\n\nStriped bass fishing is excellent in the deeper main lake, with fish over 30 pounds caught annually. The upper lake arms near War Eagle Creek offer protected coves with great crappie and bass.\n\nThe lake sits in the rapidly growing NWA metro (Rogers, Bentonville, Springdale, Fayetteville) making it one of the most accessible quality fishing lakes in the region." },
  { id:"bull-shoals-lake-ar",name:"Bull Shoals Lake",lat:36.38,lng:-92.55,radius:0.18,acres:45440,shorelineMiles:740,maxDepth:200,counties:["Marion","Baxter","Boone"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Crappie","Walleye","Catfish","Trout (tailwater)"],nearestTowns:["Mountain Home","Lakeview","Bull Shoals"],description:"Bull Shoals Lake is one of the crown jewels of the Ozarks — 45,440 acres of deep, clear water spanning the Arkansas-Missouri border. The Arkansas side has the majority of the lake and offers world-class bass fishing.\n\nThe tailwater below Bull Shoals Dam on the White River is one of the premier trout fisheries in the US, regularly producing trophy brown and rainbow trout.\n\nMountain Home serves as the primary gateway city with full services for anglers." },
  { id:"greers-ferry-lake",name:"Greers Ferry Lake",lat:35.55,lng:-92.15,radius:0.15,acres:31500,shorelineMiles:340,maxDepth:180,counties:["Cleburne","Van Buren","Faulkner"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Walleye","Crappie","Catfish","Trout (tailwater)"],nearestTowns:["Heber Springs","Clinton","Greers Ferry"],description:"Greers Ferry Lake is often called Arkansas's cleanest lake with visibility exceeding 20 feet in its lower sections. The 31,500-acre reservoir in the Ozark foothills offers diverse fishing and stunning scenery.\n\nAll three bass species thrive here, with spotted bass being particularly abundant. The tailwater below the dam supports an excellent trout fishery.\n\nHeber Springs on the lake's south shore is a charming small town with a strong fishing culture." },
  { id:"lake-ouachita",name:"Lake Ouachita",lat:34.58,lng:-93.25,radius:0.18,acres:40100,shorelineMiles:690,maxDepth:180,counties:["Garland","Montgomery"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Striped Bass","Bream","Crappie","Catfish"],nearestTowns:["Hot Springs","Mount Ida","Royal"],description:"Lake Ouachita is the largest lake entirely within Arkansas at 40,100 acres. Set in the Ouachita Mountains west of Hot Springs, it's one of the clearest and most scenic lakes in the state.\n\nThe lake has produced the state record largemouth bass and supports excellent populations of all three bass species plus stripers. Islands and rocky points create diverse structure.\n\nHot Springs National Park is nearby, making this a unique combination of fishing and tourism." },
  { id:"degray-lake",name:"DeGray Lake",lat:34.23,lng:-93.12,radius:0.10,acres:13400,shorelineMiles:207,maxDepth:120,counties:["Clark","Hot Spring"],fishSpecies:["Largemouth Bass","Hybrid Striper","Crappie","Bream","Catfish"],nearestTowns:["Arkadelphia","Bismarck","Caddo Valley"],description:"DeGray Lake is a 13,400-acre reservoir in the Ouachita Mountains known for consistent bass fishing and its resort lodge. DeGray Lake Resort State Park on its shores offers one of Arkansas's premier outdoor resort experiences.\n\nThe lake's hybrid striper fishery is particularly popular, with aggressive fish that put up an incredible fight." },
  { id:"norfork-lake",name:"Norfork Lake",lat:36.25,lng:-92.28,radius:0.12,acres:22000,shorelineMiles:550,maxDepth:177,counties:["Baxter","Fulton"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Striped Bass","Crappie","Walleye"],nearestTowns:["Mountain Home","Norfork","Henderson"],description:"Norfork Lake is a clear, deep Ozark reservoir east of Mountain Home. At 22,000 acres with 550 miles of shoreline, it offers excellent bass fishing in clear water conditions.\n\nThe lake is known for trophy striped bass and solid smallmouth populations along its rocky bluffs. The Norfork tailwater below the dam is another premier White River trout fishing destination." },
  { id:"lake-hamilton",name:"Lake Hamilton",lat:34.48,lng:-93.05,radius:0.08,acres:7200,shorelineMiles:97,maxDepth:60,counties:["Garland"],fishSpecies:["Largemouth Bass","Crappie","Bream","Catfish"],nearestTowns:["Hot Springs"],description:"Lake Hamilton is Hot Springs' backyard lake — a 7,200-acre reservoir on the Ouachita River that runs through the city. It's heavily developed with lakefront homes and marinas but still produces good bass and crappie fishing." },
  { id:"millwood-lake",name:"Millwood Lake",lat:33.72,lng:-94.05,radius:0.10,acres:29500,shorelineMiles:95,maxDepth:45,counties:["Little River","Hempstead"],fishSpecies:["Largemouth Bass","Crappie","Catfish","Bream"],nearestTowns:["Ashdown","De Queen","Nashville"],description:"Millwood Lake in Southwest Arkansas is a shallow, timbered lake that's a crappie fishing paradise. The 29,500-acre reservoir is full of standing timber that provides incredible habitat for crappie and bass.\n\nThe lake's shallow nature and flooded timber make it ideal for kayak fishing." },
  { id:"lake-dardanelle",name:"Lake Dardanelle",lat:35.30,lng:-93.15,radius:0.15,acres:34300,shorelineMiles:315,maxDepth:50,counties:["Yell","Pope","Logan","Johnson"],fishSpecies:["Largemouth Bass","Smallmouth Bass","Spotted Bass","Catfish","Crappie","Striped Bass"],nearestTowns:["Russellville","Dardanelle","Atkins"],description:"Lake Dardanelle is a 34,300-acre reservoir on the Arkansas River in the River Valley region. The lake is known for excellent bass fishing and has hosted major bass tournaments.\n\nThe Arkansas River current through the lake creates unique fishing patterns compared to typical still-water reservoirs." },
  { id:"blue-mountain-lake",name:"Blue Mountain Lake",lat:35.10,lng:-93.65,radius:0.06,acres:2910,shorelineMiles:52,maxDepth:65,counties:["Logan"],fishSpecies:["Largemouth Bass","Crappie","Catfish","Bream"],nearestTowns:["Booneville","Magazine","Havana"],description:"Blue Mountain Lake is a scenic 2,910-acre lake in the Ouachita National Forest. It offers a quiet, uncrowded fishing experience with good bass and crappie populations." },
  { id:"nimrod-lake",name:"Nimrod Lake",lat:34.95,lng:-93.10,radius:0.08,acres:3550,shorelineMiles:77,maxDepth:50,counties:["Perry"],fishSpecies:["Largemouth Bass","Crappie","Catfish","Bream"],nearestTowns:["Plainview","Ola","Perryville"],description:"Nimrod Lake is a quiet 3,550-acre lake on the Fourche LaFave River. It's known for consistent crappie fishing and a peaceful, uncrowded atmosphere." },
  { id:"lake-chicot",name:"Lake Chicot",lat:33.38,lng:-91.28,radius:0.06,acres:5100,shorelineMiles:42,maxDepth:25,counties:["Chicot"],fishSpecies:["Largemouth Bass","Crappie","Bream","Catfish"],nearestTowns:["Lake Village"],description:"Lake Chicot is the largest natural lake in Arkansas — an old oxbow of the Mississippi River. At 5,100 acres, it offers excellent bass fishing in a unique natural setting." },
  { id:"greeson-lake",name:"Greeson Lake (Narrows Dam)",lat:34.18,lng:-93.70,radius:0.06,acres:7260,shorelineMiles:95,maxDepth:125,counties:["Pike"],fishSpecies:["Largemouth Bass","Walleye","Crappie","Catfish","Bream"],nearestTowns:["Murfreesboro","Glenwood","Kirby"],description:"Greeson Lake (also called Narrows Dam) is a clear, deep Ouachita Mountains lake with excellent walleye fishing — one of the best walleye lakes in Arkansas. Bass fishing is also solid." },
];

const arRamps: OsmRamp[] = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "states", "arkansas.json"), "utf8"));

function findLake(lat: number, lng: number): ARLake | null {
  for (const l of arLakes) { if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l; }
  return null;
}

const arCities: { name: string; lat: number; lng: number; r: number }[] = [
  {name:"Little Rock",lat:34.75,lng:-92.29,r:0.25},{name:"Fayetteville",lat:36.06,lng:-94.16,r:0.12},
  {name:"Fort Smith",lat:35.39,lng:-94.40,r:0.12},{name:"Rogers",lat:36.33,lng:-94.12,r:0.10},
  {name:"Hot Springs",lat:34.50,lng:-93.06,r:0.10},{name:"Mountain Home",lat:36.34,lng:-92.39,r:0.08},
  {name:"Russellville",lat:35.28,lng:-93.13,r:0.08},{name:"Heber Springs",lat:35.49,lng:-92.03,r:0.06},
  {name:"Harrison",lat:36.23,lng:-93.11,r:0.06},{name:"Arkadelphia",lat:34.12,lng:-93.05,r:0.06},
  {name:"Bull Shoals",lat:36.38,lng:-92.58,r:0.06},{name:"Lake Village",lat:33.33,lng:-91.27,r:0.06},
  {name:"Eureka Springs",lat:36.40,lng:-93.74,r:0.06},{name:"De Queen",lat:34.04,lng:-94.34,r:0.06},
];

function findCity(lat: number, lng: number): string {
  let best = ""; let bestDist = Infinity;
  for (const c of arCities) { const d = Math.abs(lat - c.lat) + Math.abs(lng - c.lng); if (d < c.r && d < bestDist) { best = c.name; bestDist = d; } }
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

for (const r of arRamps) {
  const lake = findLake(r.latitude, r.longitude);
  const city = r.tags?.["addr:city"] || findCity(r.latitude, r.longitude) || "";
  let name = r.name || "Boat Ramp";
  if (name === "Boat Ramp" && lake) name = `Boat Ramp at ${lake.name}`;
  if (name === "Boat Ramp" && city) name = `Boat Ramp near ${city}`;
  let slug = slugify(name);
  if (seenSlugs.has(slug)) slug = `${slug}-${r.id.toString().substring(0, 6)}`;
  seenSlugs.add(slug);
  records.push({
    place_id: "osm_" + r.id, name, formatted_address: city ? `${city}, AR, USA` : "Arkansas, USA",
    latitude: r.latitude, longitude: r.longitude, city, county: "", rating: null, total_ratings: 0,
    types: ["leisure_slipway"], business_status: "OPERATIONAL", lake_id: lake?.id || "", lake_name: lake?.name || "",
  });
}

const outDir = path.join(__dirname, "..", "src", "data");
fs.writeFileSync(path.join(outDir, "arkansas-ramps.json"), JSON.stringify(records, null, 2));

const byLake: Record<string, number> = {};
for (const r of records) { const k = r.lake_name || "(no lake)"; byLake[k] = (byLake[k] || 0) + 1; }

const lakesOut = arLakes.map(l => ({ ...l, rampCount: byLake[l.name] || 0 }));
fs.writeFileSync(path.join(outDir, "arkansas-lakes.json"), JSON.stringify(lakesOut, null, 2));

console.log("Arkansas ramps:", records.length);
console.log("Lakes:", lakesOut.length);
console.log("\nBy lake:");
Object.entries(byLake).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([l, c]) => console.log(`  ${l}: ${c}`));
