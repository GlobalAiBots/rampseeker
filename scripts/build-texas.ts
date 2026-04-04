/**
 * build-texas.ts — Process Texas ramp data and create state files
 */
import * as fs from "fs";
import * as path from "path";

interface OsmRamp {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  stateAbbr: string;
  tags: Record<string, string>;
}

interface TXLake {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  acres: number;
  shorelineMiles: number;
  maxDepth: number;
  counties: string[];
  fishSpecies: string[];
  nearestTowns: string[];
  description: string;
}

const txLakes: TXLake[] = [
  { id: "lake-texoma", name: "Lake Texoma", lat: 33.85, lng: -96.60, radius: 0.25, acres: 89000, shorelineMiles: 580, maxDepth: 110, counties: ["Grayson","Cooke","Bryan (OK)"], fishSpecies: ["Striped Bass","Smallmouth Bass","Largemouth Bass","Catfish","Crappie"], nearestTowns: ["Denison","Sherman","Durant (OK)"], description: "Lake Texoma is one of the largest reservoirs in the US, straddling the Oklahoma-Texas border. Famous for its naturally reproducing striped bass population — one of the best striper fisheries in the country.\n\nThe lake covers 89,000 acres fed by the Red and Washita Rivers. Besides stripers, excellent smallmouth bass fishing along rocky Oklahoma shoreline and largemouth in Texas coves.\n\nDenison and Sherman on the Texas side offer full services. The lake draws anglers from both DFW and Oklahoma City." },
  { id: "lake-fork", name: "Lake Fork Reservoir", lat: 32.85, lng: -95.58, radius: 0.15, acres: 27690, shorelineMiles: 315, maxDepth: 70, counties: ["Rains","Wood","Hopkins"], fishSpecies: ["Largemouth Bass","Crappie","Catfish","Bluegill"], nearestTowns: ["Quitman","Emory","Alba"], description: "Lake Fork is Texas's #1 trophy bass lake. It has produced more ShareLunker bass (13+ pounds) than any other lake in the state. The flooded timber and managed habitat create ideal conditions for growing giant largemouth.\n\nThe lake's slot limit (16-24 inches must be released) has helped build and maintain the trophy fishery. Spring is prime time, but quality fish are caught year-round.\n\nSmall towns around the lake — Quitman, Emory, Alba — cater heavily to anglers with bait shops, guides, and cabin rentals." },
  { id: "sam-rayburn", name: "Sam Rayburn Reservoir", lat: 31.10, lng: -94.15, radius: 0.20, acres: 114500, shorelineMiles: 560, maxDepth: 80, counties: ["Jasper","Angelina","San Augustine","Sabine","Nacogdoches"], fishSpecies: ["Largemouth Bass","Crappie","Catfish","White Bass"], nearestTowns: ["Jasper","Lufkin","Brookeland"], description: "Sam Rayburn is the largest lake entirely within Texas at 114,500 acres. Located in the Piney Woods of East Texas, it offers outstanding bass fishing in flooded timber and standing dead trees.\n\nThe sheer size means you can always find unpressured water. Crappie fishing is also excellent, especially in winter and spring around submerged brush." },
  { id: "toledo-bend", name: "Toledo Bend Reservoir", lat: 31.20, lng: -93.60, radius: 0.20, acres: 181600, shorelineMiles: 1200, maxDepth: 100, counties: ["Sabine","Shelby","Newton"], fishSpecies: ["Largemouth Bass","Crappie","Catfish","Bream"], nearestTowns: ["Hemphill","Many (LA)","Logansport (LA)"], description: "Toledo Bend is one of the largest man-made lakes in the US at 181,600 acres, spanning the Texas-Louisiana border. It's a legendary bass fishing destination that has hosted major tournaments.\n\nThe lake's massive size and diverse habitat produce quality bass throughout the year. Standing timber, grass beds, and rocky points all hold fish." },
  { id: "lake-conroe", name: "Lake Conroe", lat: 30.40, lng: -95.55, radius: 0.12, acres: 21000, shorelineMiles: 157, maxDepth: 70, counties: ["Montgomery","Walker"], fishSpecies: ["Largemouth Bass","Catfish","Crappie","Hybrid Striper"], nearestTowns: ["Conroe","Montgomery","Willis"], description: "Lake Conroe is the premier fishing and recreation lake in the Houston metro area. Just 40 miles north of downtown Houston, it offers excellent bass fishing along its many residential docks and natural shoreline.\n\nThe lake supports good populations of largemouth bass, catfish, crappie, and hybrid stripers." },
  { id: "lake-travis", name: "Lake Travis", lat: 30.42, lng: -97.92, radius: 0.15, acres: 18930, shorelineMiles: 271, maxDepth: 210, counties: ["Travis","Burnet"], fishSpecies: ["Largemouth Bass","Guadalupe Bass","Striped Bass","Catfish"], nearestTowns: ["Austin","Lakeway","Lago Vista"], description: "Lake Travis is Austin's playground — a clear Highland Lakes reservoir in the Texas Hill Country. The lake is famous for its deep, clear water and scenic limestone cliffs.\n\nGuadalupe bass (Texas's state fish), largemouth, and stripers are the primary game fish. The lake's clear water makes sight-fishing possible." },
  { id: "possum-kingdom", name: "Possum Kingdom Lake", lat: 32.87, lng: -98.50, radius: 0.12, acres: 17622, shorelineMiles: 310, maxDepth: 150, counties: ["Palo Pinto","Stephens","Young"], fishSpecies: ["Striped Bass","Largemouth Bass","Sand Bass","Catfish"], nearestTowns: ["Mineral Wells","Graford","Caddo"], description: "Possum Kingdom Lake is one of the clearest lakes in Texas with visibility up to 20 feet. Known for trophy striped bass and scenic bluffs, it sits in the Palo Pinto Mountains west of Fort Worth.\n\nThe lake's Hell's Gate rock formation is one of the most photographed landmarks in Texas." },
  { id: "lake-whitney", name: "Lake Whitney", lat: 31.90, lng: -97.40, radius: 0.12, acres: 23560, shorelineMiles: 225, maxDepth: 100, counties: ["Hill","Bosque","Johnson"], fishSpecies: ["Striped Bass","Smallmouth Bass","Largemouth Bass","Catfish","White Bass"], nearestTowns: ["Whitney","Clifton","Meridian"], description: "Lake Whitney is a large Corps of Engineers lake on the Brazos River, known for excellent striped bass and smallmouth bass fishing. The rocky limestone bluffs provide ideal smallmouth habitat." },
  { id: "lewisville-lake", name: "Lewisville Lake", lat: 33.10, lng: -97.00, radius: 0.10, acres: 29000, shorelineMiles: 233, maxDepth: 67, counties: ["Denton"], fishSpecies: ["Largemouth Bass","Crappie","Sand Bass","Catfish"], nearestTowns: ["Lewisville","Frisco","The Colony"], description: "Lewisville Lake is the DFW metroplex's most accessible big lake, just north of Dallas. It offers solid bass and crappie fishing with numerous public ramps and parks along its shores." },
  { id: "lake-ray-roberts", name: "Lake Ray Roberts", lat: 33.35, lng: -97.05, radius: 0.10, acres: 29350, shorelineMiles: 148, maxDepth: 90, counties: ["Denton","Cooke","Grayson"], fishSpecies: ["Largemouth Bass","Crappie","White Bass","Catfish"], nearestTowns: ["Pilot Point","Sanger","Denton"], description: "Lake Ray Roberts is a well-managed Corps of Engineers lake north of Denton with excellent bass fishing. The state park on its shores provides great camping and ramp access." },
  { id: "lake-livingston", name: "Lake Livingston", lat: 30.80, lng: -95.10, radius: 0.15, acres: 83000, shorelineMiles: 450, maxDepth: 80, counties: ["Polk","San Jacinto","Trinity","Walker"], fishSpecies: ["Catfish","White Bass","Largemouth Bass","Crappie","Striped Bass"], nearestTowns: ["Livingston","Onalaska","Coldspring"], description: "Lake Livingston is one of the largest lakes in Texas at 83,000 acres. It's the catfish capital of East Texas and also offers excellent white bass runs up the Trinity River in spring." },
  { id: "falcon-lake", name: "Falcon Lake", lat: 26.65, lng: -99.25, radius: 0.12, acres: 87210, shorelineMiles: 321, maxDepth: 110, counties: ["Starr","Zapata"], fishSpecies: ["Largemouth Bass","Catfish","White Bass","Striped Bass"], nearestTowns: ["Zapata","Roma","Falcon Heights"], description: "Falcon Lake on the US-Mexico border is legendary for trophy largemouth bass. The warm South Texas climate allows bass to grow year-round, producing 10+ pound fish regularly." },
  { id: "lake-amistad", name: "Lake Amistad", lat: 29.50, lng: -101.05, radius: 0.15, acres: 65000, shorelineMiles: 851, maxDepth: 217, counties: ["Val Verde"], fishSpecies: ["Largemouth Bass","Smallmouth Bass","Striped Bass","Catfish","White Bass"], nearestTowns: ["Del Rio","Ciudad Acuna (MX)"], description: "Lake Amistad is a crystal-clear international reservoir on the Rio Grande near Del Rio. The clear water supports both largemouth and smallmouth bass, plus excellent striped bass fishing in deep water." },
  { id: "canyon-lake", name: "Canyon Lake", lat: 29.87, lng: -98.22, radius: 0.08, acres: 8230, shorelineMiles: 80, maxDepth: 125, counties: ["Comal"], fishSpecies: ["Largemouth Bass","Guadalupe Bass","Striped Bass","Catfish"], nearestTowns: ["Canyon Lake","New Braunfels","San Marcos"], description: "Canyon Lake is a clear Hill Country lake between San Antonio and Austin. The tailrace below the dam is one of the best trout fisheries in Texas, and the lake itself produces quality bass and stripers." },
  { id: "cedar-creek-lake", name: "Cedar Creek Lake", lat: 32.15, lng: -96.08, radius: 0.10, acres: 33750, shorelineMiles: 320, maxDepth: 57, counties: ["Henderson","Kaufman","Navarro"], fishSpecies: ["Largemouth Bass","Catfish","Crappie","Sand Bass"], nearestTowns: ["Gun Barrel City","Mabank","Seven Points"], description: "Cedar Creek Lake is a popular DFW-area fishing and recreation lake east of Dallas. Good bass, catfish, and crappie fishing in a lakeside community atmosphere." },
  { id: "lake-tawakoni", name: "Lake Tawakoni", lat: 32.85, lng: -96.00, radius: 0.10, acres: 36700, shorelineMiles: 200, maxDepth: 75, counties: ["Rains","Van Zandt","Hunt"], fishSpecies: ["Largemouth Bass","Catfish","Crappie","Striped Bass","White Bass"], nearestTowns: ["Wills Point","West Tawakoni","Point"], description: "Lake Tawakoni is a large, productive lake east of Dallas with diverse fishing opportunities. Blue catfish over 50 pounds are caught regularly, and the bass fishing is underrated." },
  { id: "lake-buchanan", name: "Lake Buchanan", lat: 30.78, lng: -98.40, radius: 0.10, acres: 22333, shorelineMiles: 124, maxDepth: 132, counties: ["Burnet","Llano","San Saba"], fishSpecies: ["Striped Bass","Largemouth Bass","White Bass","Catfish"], nearestTowns: ["Burnet","Buchanan Dam","Llano"], description: "Lake Buchanan is the largest and northernmost of the Highland Lakes chain in the Texas Hill Country. Trophy striped bass are the main draw, with fish over 30 pounds caught each year." },
];

// Load Texas ramps
const txRamps: OsmRamp[] = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "states", "texas.json"), "utf8"));
console.log("Texas OSM ramps:", txRamps.length);

// Assign lakes by GPS proximity
function findLake(lat: number, lng: number): TXLake | null {
  for (const l of txLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return null;
}

// Reverse geocode state for rough city name from coordinates
// Use known city centers for major Texas cities
const txCities: { name: string; lat: number; lng: number; r: number }[] = [
  { name: "Houston", lat: 29.76, lng: -95.37, r: 0.4 },
  { name: "Dallas", lat: 32.78, lng: -96.80, r: 0.35 },
  { name: "San Antonio", lat: 29.42, lng: -98.49, r: 0.3 },
  { name: "Austin", lat: 30.27, lng: -97.74, r: 0.3 },
  { name: "Fort Worth", lat: 32.75, lng: -97.33, r: 0.25 },
  { name: "El Paso", lat: 31.76, lng: -106.44, r: 0.2 },
  { name: "Corpus Christi", lat: 27.80, lng: -97.40, r: 0.2 },
  { name: "Galveston", lat: 29.30, lng: -94.80, r: 0.15 },
  { name: "Brownsville", lat: 25.90, lng: -97.50, r: 0.15 },
  { name: "Lubbock", lat: 33.58, lng: -101.85, r: 0.15 },
  { name: "Amarillo", lat: 35.22, lng: -101.83, r: 0.15 },
  { name: "Waco", lat: 31.55, lng: -97.15, r: 0.15 },
  { name: "Tyler", lat: 32.35, lng: -95.30, r: 0.15 },
  { name: "Denison", lat: 33.76, lng: -96.54, r: 0.10 },
  { name: "Sherman", lat: 33.64, lng: -96.61, r: 0.10 },
  { name: "Conroe", lat: 30.31, lng: -95.46, r: 0.10 },
  { name: "Livingston", lat: 30.71, lng: -94.93, r: 0.10 },
  { name: "Zapata", lat: 26.91, lng: -99.27, r: 0.10 },
  { name: "Del Rio", lat: 29.36, lng: -100.90, r: 0.10 },
  { name: "Jasper", lat: 30.92, lng: -93.99, r: 0.10 },
  { name: "Mineral Wells", lat: 32.81, lng: -98.11, r: 0.10 },
  { name: "Whitney", lat: 31.95, lng: -97.32, r: 0.10 },
  { name: "Emory", lat: 32.87, lng: -95.77, r: 0.10 },
  { name: "Burnet", lat: 30.76, lng: -98.23, r: 0.10 },
  { name: "New Braunfels", lat: 29.70, lng: -98.12, r: 0.10 },
  { name: "Lewisville", lat: 33.05, lng: -96.99, r: 0.10 },
  { name: "Denton", lat: 33.21, lng: -97.13, r: 0.10 },
  { name: "Gun Barrel City", lat: 32.33, lng: -96.15, r: 0.10 },
];

function findCity(lat: number, lng: number): string {
  let best = "";
  let bestDist = Infinity;
  for (const c of txCities) {
    const d = Math.abs(lat - c.lat) + Math.abs(lng - c.lng);
    if (d < c.r && d < bestDist) { best = c.name; bestDist = d; }
  }
  return best;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").substring(0, 60);
}

// Build Texas ramps JSON
const seenSlugs = new Set<string>();
const txRampRecords: Array<{
  place_id: string; name: string; formatted_address: string;
  latitude: number; longitude: number; city: string; county: string;
  rating: number | null; total_ratings: number; types: string[]; business_status: string;
  lake_id: string; lake_name: string;
}> = [];

for (const r of txRamps) {
  const lake = findLake(r.latitude, r.longitude);
  const city = r.tags?.["addr:city"] || findCity(r.latitude, r.longitude) || "";
  let name = r.name || "Boat Ramp";

  // Generate better name for unnamed ramps near lakes
  if (name === "Boat Ramp" && lake) {
    name = `Boat Ramp at ${lake.name}`;
  }
  if (name === "Boat Ramp" && city) {
    name = `Boat Ramp near ${city}`;
  }

  let slug = slugify(name);
  if (seenSlugs.has(slug)) {
    slug = `${slug}-${r.id.toString().substring(0, 6)}`;
  }
  seenSlugs.add(slug);

  txRampRecords.push({
    place_id: "osm_" + r.id,
    name,
    formatted_address: city ? `${city}, TX, USA` : "Texas, USA",
    latitude: r.latitude,
    longitude: r.longitude,
    city,
    county: "",
    rating: null,
    total_ratings: 0,
    types: ["leisure_slipway"],
    business_status: "OPERATIONAL",
    lake_id: lake?.id || "",
    lake_name: lake?.name || "",
  });
}

// Save Texas ramps
const outDir = path.join(__dirname, "..", "src", "data");
fs.writeFileSync(path.join(outDir, "texas-ramps.json"), JSON.stringify(txRampRecords, null, 2));
console.log("Saved texas-ramps.json:", txRampRecords.length, "ramps");

// Count by lake
const byLake: Record<string, number> = {};
for (const r of txRampRecords) {
  const key = r.lake_name || "(no lake)";
  byLake[key] = (byLake[key] || 0) + 1;
}
console.log("\nRamps by lake:");
Object.entries(byLake).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([l, c]) => console.log(`  ${l}: ${c}`));

// Save Texas lakes data as JSON for import
const lakesOut = txLakes.map(l => ({
  ...l,
  rampCount: byLake[l.name] || 0,
}));
fs.writeFileSync(path.join(outDir, "texas-lakes.json"), JSON.stringify(lakesOut, null, 2));
console.log("\nSaved texas-lakes.json:", lakesOut.length, "lakes");

// Stats
const withLake = txRampRecords.filter(r => r.lake_id).length;
const withCity = txRampRecords.filter(r => r.city).length;
console.log(`\nWith lake assignment: ${withLake}/${txRampRecords.length}`);
console.log(`With city: ${withCity}/${txRampRecords.length}`);
