import { unified, type UnifiedRamp } from "./all-ramps";

export interface CountyInfo {
  slug: string;
  name: string;
  ramps: UnifiedRamp[];
}

// City-to-county mapping for Oklahoma
const cityCountyMap: Record<string, string> = {
  "Grove": "Delaware", "Afton": "Ottawa", "Miami": "Ottawa", "Vinita": "Craig",
  "Jay": "Delaware", "Ketchum": "Delaware", "Cleora": "Delaware", "Bernice": "Delaware",
  "Langley": "Mayes", "Disney": "Mayes", "Salina": "Mayes", "Chouteau": "Mayes",
  "Wyandotte": "Ottawa", "Fairland": "Ottawa", "Copan": "Washington",
  "Wagoner": "Wagoner", "Inola": "Rogers", "Claremore": "Rogers",
  "Oologah": "Rogers", "Nowata": "Nowata", "Talala": "Rogers",
  "Skiatook": "Osage", "Sperry": "Tulsa", "Sand Springs": "Tulsa",
  "Mannford": "Creek", "Cleveland": "Pawnee", "Broken Arrow": "Tulsa",
  "Ponca City": "Kay", "Kaw City": "Kay", "Newkirk": "Kay", "Burbank": "Osage",
  "Edmond": "Oklahoma", "Oklahoma City": "Oklahoma", "Norman": "Cleveland",
  "Eufaula": "McIntosh", "Stigler": "Haskell", "Muskogee": "Muskogee",
  "Park Hill": "Cherokee", "Cookson": "Cherokee", "Vian": "Sequoyah", "Gore": "Sequoyah",
  "Broken Bow": "McCurtain", "Eagletown": "McCurtain",
  "Fort Cobb": "Caddo", "Clinton": "Custer", "Butler": "Custer", "Hydro": "Caddo",
  "Sulphur": "Murray", "Ardmore": "Carter", "Kingston": "Marshall",
  "Cartwright": "Bryan", "Mead": "Bryan", "Waurika": "Jefferson",
  "Comanche": "Stephens", "Lawton": "Comanche", "Medicine Park": "Comanche",
  "Elgin": "Comanche", "Mountain Park": "Kiowa",
  "Clayton": "Pushmataha", "Poteau": "Le Flore", "Spiro": "Le Flore",
  "Hugo": "Choctaw", "Shawnee": "Pottawatomie", "McLoud": "Pottawatomie",
  "Okmulgee": "Okmulgee", "Henryetta": "Okmulgee", "Chandler": "Lincoln",
  "Glencoe": "Payne", "Springer": "Carter", "Sequoyah": "Cherokee",
  "Muldrow": "Sequoyah", "Wewoka": "Seminole", "Quinton": "Pittsburg",
  "Council Hill": "Muskogee", "Grant": "Choctaw",
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getCounty(city: string): string {
  return cityCountyMap[city] || "";
}

// Build county index
const countyMap = new Map<string, UnifiedRamp[]>();

for (const r of unified) {
  const county = getCounty(r.city) || r.county;
  if (!county) continue;
  if (!countyMap.has(county)) countyMap.set(county, []);
  countyMap.get(county)!.push(r);
}

export const counties: CountyInfo[] = Array.from(countyMap.entries())
  .map(([name, ramps]) => ({ slug: slugify(name), name, ramps }))
  .sort((a, b) => b.ramps.length - a.ramps.length);

export function getCountyBySlug(slug: string): CountyInfo | undefined {
  return counties.find((c) => c.slug === slug);
}

export function getCountyForCity(city: string): string {
  return getCounty(city);
}
