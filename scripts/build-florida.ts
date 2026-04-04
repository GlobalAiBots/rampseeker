import * as fs from "fs";
import * as path from "path";

interface OsmRamp { id: number; name: string; latitude: number; longitude: number; tags: Record<string, string> }
interface FLWaterBody {
  id: string; name: string; lat: number; lng: number; radius: number;
  acres: number; shorelineMiles: number; maxDepth: number;
  counties: string[]; fishSpecies: string[]; nearestTowns: string[]; description: string;
  type: "freshwater" | "saltwater";
}

const flWaterBodies: FLWaterBody[] = [
  // Freshwater
  { id:"lake-okeechobee",name:"Lake Okeechobee",lat:26.95,lng:-80.80,radius:0.30,acres:730000,shorelineMiles:135,maxDepth:15,counties:["Palm Beach","Glades","Hendry","Martin","Okeechobee"],fishSpecies:["Largemouth Bass","Crappie (Speck)","Bluegill","Catfish","Bowfin"],nearestTowns:["Clewiston","Okeechobee","Belle Glade","Pahokee"],description:"Lake Okeechobee is the largest lake in the southeastern US at 730 square miles. Known as the Big O, it's one of the premier bass fishing destinations in the world. The shallow, fertile water grows trophy largemouth bass — fish over 10 pounds are caught regularly.\n\nThe lake's vast lily pad fields, bulrush, and Kissimmee grass create endless bass habitat. Crappie (called 'specks' in Florida) fishing is also outstanding, especially in winter.\n\nMultiple towns ring the lake with full marina facilities and guide services. The Herbert Hoover Dike provides levee-top access for bank fishing.",type:"freshwater" },
  { id:"lake-toho",name:"Lake Tohopekaliga",lat:28.22,lng:-81.40,radius:0.12,acres:22700,shorelineMiles:57,maxDepth:15,counties:["Osceola"],fishSpecies:["Largemouth Bass","Crappie","Bluegill","Catfish","Gar"],nearestTowns:["Kissimmee","St. Cloud"],description:"Lake Toho is Central Florida's trophy bass factory. The 22,700-acre lake near Kissimmee consistently produces 10+ pound largemouth bass and has hosted major Bassmaster and FLW tournaments.\n\nThe lake's extensive hydrilla, lily pads, and bulrush beds create ideal bass habitat. It's just minutes from Walt Disney World, making it popular with visiting anglers.",type:"freshwater" },
  { id:"lake-kissimmee",name:"Lake Kissimmee",lat:27.95,lng:-81.28,radius:0.10,acres:34948,shorelineMiles:60,maxDepth:12,counties:["Osceola","Polk"],fishSpecies:["Largemouth Bass","Crappie","Bluegill","Catfish"],nearestTowns:["Lake Wales","Kenansville"],description:"Lake Kissimmee is a 34,948-acre lake in the Kissimmee Chain of Lakes, famous for trophy bass. The lake's diverse habitat — hydrilla, kissimmee grass, buggy whips — supports world-class largemouth bass fishing year-round.",type:"freshwater" },
  { id:"lake-george",name:"Lake George",lat:29.28,lng:-81.58,radius:0.10,acres:46000,shorelineMiles:60,maxDepth:12,counties:["Volusia","Putnam"],fishSpecies:["Largemouth Bass","Crappie","Striped Bass","Catfish","Bream"],nearestTowns:["DeLand","Crescent City","Georgetown"],description:"Lake George is the second largest lake in Florida at 46,000 acres. Located on the St. Johns River system, it offers excellent bass, crappie, and striped bass fishing in a scenic natural setting.",type:"freshwater" },
  { id:"rodman-reservoir",name:"Rodman Reservoir",lat:29.55,lng:-81.82,radius:0.08,acres:9500,shorelineMiles:52,maxDepth:22,counties:["Putnam","Marion"],fishSpecies:["Largemouth Bass","Crappie","Bream","Catfish"],nearestTowns:["Palatka","Interlachen"],description:"Rodman Reservoir (Lake Ocklawaha) is a legendary bass lake in North Florida. The flooded timber and hydrilla create incredible habitat. It consistently ranks among the top bass fishing lakes in the state.",type:"freshwater" },
  { id:"lake-seminole-fl",name:"Lake Seminole",lat:30.75,lng:-84.82,radius:0.12,acres:37500,shorelineMiles:253,maxDepth:35,counties:["Gadsden","Jackson"],fishSpecies:["Largemouth Bass","Crappie","Catfish","Striped Bass","Bream"],nearestTowns:["Sneads","Chattahoochee"],description:"Lake Seminole straddles the Florida-Georgia border with 37,500 acres of excellent bass and crappie fishing. The flooded timber in the Flint and Chattahoochee arms holds big fish year-round.",type:"freshwater" },
  // Saltwater/Coastal
  { id:"tampa-bay",name:"Tampa Bay",lat:27.80,lng:-82.55,radius:0.25,acres:0,shorelineMiles:200,maxDepth:35,counties:["Hillsborough","Pinellas","Manatee"],fishSpecies:["Redfish","Snook","Spotted Seatrout","Tarpon","Sheepshead","Mangrove Snapper"],nearestTowns:["Tampa","St. Petersburg","Clearwater","Bradenton"],description:"Tampa Bay is one of Florida's premier inshore saltwater fishing destinations. The largest open-water estuary in Florida, it offers world-class fishing for redfish, snook, and spotted seatrout.\n\nThe bay's seagrass flats, mangrove shorelines, and bridges create diverse habitat. Tarpon fishing in late spring and summer draws anglers from around the world.\n\nDozens of public boat ramps ring the bay from Tampa and St. Pete to Bradenton and Clearwater.",type:"saltwater" },
  { id:"charlotte-harbor",name:"Charlotte Harbor",lat:26.90,lng:-82.10,radius:0.15,acres:0,shorelineMiles:180,maxDepth:12,counties:["Charlotte","Lee"],fishSpecies:["Tarpon","Snook","Redfish","Spotted Seatrout","Grouper","Cobia"],nearestTowns:["Punta Gorda","Port Charlotte","Cape Coral"],description:"Charlotte Harbor is a world-renowned tarpon fishing destination. The harbor and surrounding estuaries — Pine Island Sound, Matlacha Pass, and the Peace River — offer exceptional inshore fishing.\n\nThe area is famous for its spring tarpon migration, with fish over 100 pounds caught from boats and bridges.",type:"saltwater" },
  { id:"biscayne-bay",name:"Biscayne Bay",lat:25.60,lng:-80.20,radius:0.15,acres:0,shorelineMiles:100,maxDepth:15,counties:["Miami-Dade"],fishSpecies:["Bonefish","Tarpon","Permit","Snook","Redfish","Barracuda"],nearestTowns:["Miami","Key Biscayne","Homestead"],description:"Biscayne Bay is South Florida's premier flats fishing destination. It's one of the northernmost reliable bonefish habitats in the US, and the clear shallow water makes for incredible sight-fishing.\n\nBiscayne National Park protects much of the bay. Tarpon, permit, snook, and redfish round out the incredible diversity.",type:"saltwater" },
  { id:"indian-river-lagoon",name:"Indian River Lagoon",lat:27.80,lng:-80.50,radius:0.20,acres:0,shorelineMiles:300,maxDepth:6,counties:["Brevard","Indian River","St. Lucie","Martin"],fishSpecies:["Redfish","Spotted Seatrout","Snook","Tarpon","Flounder","Black Drum"],nearestTowns:["Melbourne","Vero Beach","Fort Pierce","Stuart"],description:"The Indian River Lagoon stretches 156 miles along Florida's east coast and is the most biologically diverse estuary in North America. The shallow lagoon offers outstanding redfish, seatrout, and snook fishing.\n\nThe Mosquito Lagoon at the north end is one of Florida's most famous sight-fishing destinations for redfish on the flats.",type:"saltwater" },
  { id:"apalachicola-bay",name:"Apalachicola Bay",lat:29.70,lng:-85.00,radius:0.12,acres:0,shorelineMiles:100,maxDepth:12,counties:["Franklin"],fishSpecies:["Redfish","Spotted Seatrout","Flounder","Sheepshead","Tripletail","Oysters"],nearestTowns:["Apalachicola","Eastpoint","Carrabelle"],description:"Apalachicola Bay is the crown jewel of Florida's Forgotten Coast. Famous for its oysters and pristine waters, the bay offers excellent inshore fishing for redfish, seatrout, and flounder in an uncrowded setting.",type:"saltwater" },
  { id:"pensacola-bay-fl",name:"Pensacola Bay",lat:30.38,lng:-87.18,radius:0.10,acres:0,shorelineMiles:80,maxDepth:30,counties:["Escambia","Santa Rosa"],fishSpecies:["Redfish","Spotted Seatrout","Flounder","Cobia","King Mackerel","Red Snapper"],nearestTowns:["Pensacola","Gulf Breeze","Navarre"],description:"Pensacola Bay and the connected Santa Rosa Sound offer diverse fishing from inshore flats to nearshore reefs. The bay system is home to excellent redfish and seatrout, while just offshore the Gulf waters hold cobia, king mackerel, and red snapper.",type:"saltwater" },
  { id:"st-johns-river",name:"St. Johns River",lat:29.90,lng:-81.60,radius:0.25,acres:0,shorelineMiles:500,maxDepth:35,counties:["Duval","Clay","St. Johns","Putnam","Volusia","Seminole","Brevard"],fishSpecies:["Largemouth Bass","Crappie","Striped Bass","Redfish","Catfish","Bream"],nearestTowns:["Jacksonville","Palatka","Sanford","DeLand"],description:"The St. Johns River is one of the few rivers in North America that flows north. It stretches over 300 miles and offers both freshwater bass fishing in its upper reaches and saltwater fishing near Jacksonville.\n\nThe river connects multiple major lakes (George, Monroe, Harney) and supports an incredible diversity of fish species from largemouth bass to saltwater redfish.",type:"freshwater" },
  { id:"crystal-river-fl",name:"Crystal River / Homosassa",lat:28.90,lng:-82.60,radius:0.08,acres:0,shorelineMiles:50,maxDepth:6,counties:["Citrus"],fishSpecies:["Redfish","Spotted Seatrout","Snook","Cobia","Grouper","Tarpon"],nearestTowns:["Crystal River","Homosassa","Inverness"],description:"Crystal River and Homosassa are famous for crystal-clear spring-fed waters and world-class inshore fishing. The area is also the winter home of Florida manatees, making it a unique combination of fishing and wildlife viewing.",type:"saltwater" },
];

const flRamps: OsmRamp[] = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "states", "florida.json"), "utf8"));

function findWaterBody(lat: number, lng: number): FLWaterBody | null {
  for (const w of flWaterBodies) { if (Math.abs(lat - w.lat) < w.radius && Math.abs(lng - w.lng) < w.radius) return w; }
  return null;
}

const flCities: { name: string; lat: number; lng: number; r: number }[] = [
  {name:"Jacksonville",lat:30.33,lng:-81.66,r:0.25},{name:"Miami",lat:25.76,lng:-80.19,r:0.2},
  {name:"Tampa",lat:27.95,lng:-82.46,r:0.2},{name:"Orlando",lat:28.54,lng:-81.38,r:0.2},
  {name:"St. Petersburg",lat:27.77,lng:-82.64,r:0.1},{name:"Fort Lauderdale",lat:26.12,lng:-80.14,r:0.1},
  {name:"Cape Coral",lat:26.56,lng:-81.95,r:0.1},{name:"Clearwater",lat:27.97,lng:-82.80,r:0.08},
  {name:"Kissimmee",lat:28.29,lng:-81.41,r:0.08},{name:"Pensacola",lat:30.44,lng:-87.22,r:0.1},
  {name:"Fort Myers",lat:26.64,lng:-81.87,r:0.1},{name:"Bradenton",lat:27.50,lng:-82.57,r:0.08},
  {name:"Sarasota",lat:27.34,lng:-82.53,r:0.08},{name:"Daytona Beach",lat:29.21,lng:-81.02,r:0.08},
  {name:"Melbourne",lat:28.08,lng:-80.61,r:0.08},{name:"Vero Beach",lat:27.64,lng:-80.39,r:0.06},
  {name:"Stuart",lat:27.20,lng:-80.25,r:0.06},{name:"Cocoa",lat:28.39,lng:-80.74,r:0.06},
  {name:"Palatka",lat:29.65,lng:-81.64,r:0.06},{name:"Apalachicola",lat:29.73,lng:-85.02,r:0.06},
  {name:"Clewiston",lat:26.75,lng:-80.93,r:0.06},{name:"Okeechobee",lat:27.24,lng:-80.83,r:0.06},
  {name:"Punta Gorda",lat:26.93,lng:-82.05,r:0.06},{name:"Panama City",lat:30.16,lng:-85.66,r:0.08},
  {name:"Tallahassee",lat:30.44,lng:-84.28,r:0.1},{name:"Gainesville",lat:29.65,lng:-82.32,r:0.08},
  {name:"Naples",lat:26.14,lng:-81.79,r:0.08},{name:"Key West",lat:24.56,lng:-81.78,r:0.08},
];

function findCity(lat: number, lng: number): string {
  let best = ""; let bestDist = Infinity;
  for (const c of flCities) { const d = Math.abs(lat - c.lat) + Math.abs(lng - c.lng); if (d < c.r && d < bestDist) { best = c.name; bestDist = d; } }
  return best;
}

function slugify(s: string): string { return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").substring(0, 60); }

function assignAmenities(name: string): string[] {
  const n = name.toLowerCase();
  const a: string[] = ["parking"];
  if (/state park|recreation area|county park|public use|campground/.test(n)) a.push("restrooms");
  if (/marina/.test(n)) { a.push("fuel-nearby"); a.push("restrooms"); }
  return a;
}

const seenSlugs = new Set<string>();
const records: Array<{
  place_id: string; name: string; formatted_address: string;
  latitude: number; longitude: number; city: string; county: string;
  rating: number | null; total_ratings: number; types: string[]; business_status: string;
  lake_id: string; lake_name: string; water_type: string;
  amenities: string[]; fee: string; rampCount: number; surface: string; enriched: boolean;
}> = [];

for (const r of flRamps) {
  const wb = findWaterBody(r.latitude, r.longitude);
  const city = r.tags?.["addr:city"] || findCity(r.latitude, r.longitude) || "";
  let name = r.name || "Boat Ramp";
  if (name === "Boat Ramp" && wb) name = `Boat Ramp at ${wb.name}`;
  if (name === "Boat Ramp" && city) name = `Boat Ramp near ${city}`;
  let slug = slugify(name);
  if (seenSlugs.has(slug)) slug = `${slug}-${r.id.toString().substring(0, 6)}`;
  seenSlugs.add(slug);
  records.push({
    place_id: "osm_" + r.id, name, formatted_address: city ? `${city}, FL, USA` : "Florida, USA",
    latitude: r.latitude, longitude: r.longitude, city, county: "", rating: null, total_ratings: 0,
    types: ["leisure_slipway"], business_status: "OPERATIONAL",
    lake_id: wb?.id || "", lake_name: wb?.name || "", water_type: wb?.type || "unknown",
    amenities: assignAmenities(name), fee: /marina/i.test(name) ? "varies" : "free",
    rampCount: 1, surface: "concrete", enriched: false,
  });
}

const outDir = path.join(__dirname, "..", "src", "data");
fs.writeFileSync(path.join(outDir, "florida-ramps.json"), JSON.stringify(records, null, 2));

const byWB: Record<string, number> = {};
for (const r of records) { const k = r.lake_name || "(no water body)"; byWB[k] = (byWB[k] || 0) + 1; }
const lakesOut = flWaterBodies.map(w => ({ ...w, rampCount: byWB[w.name] || 0 }));
fs.writeFileSync(path.join(outDir, "florida-lakes.json"), JSON.stringify(lakesOut, null, 2));

console.log("Florida ramps:", records.length);
console.log("Water bodies:", lakesOut.length);
const visible = records.filter(r => {
  const n = r.name.toLowerCase();
  return n.length > 2 && !/^boat[_ ]ramp(\s|$)/i.test(n) && n !== "boat launch";
}).length;
console.log("Visible (after generic filter):", visible);
console.log("\nBy water body:");
Object.entries(byWB).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([w, c]) => console.log(`  ${w}: ${c}`));
