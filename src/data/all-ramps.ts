import { ramps as grandLakeRamps, amenityLabels, type Ramp } from "./ramps";
import oklahomaRampsRaw from "./oklahoma-ramps.json";
import texasRampsRaw from "./texas-ramps.json";
import missouriRampsRaw from "./missouri-ramps.json";
import arkansasRampsRaw from "./arkansas-ramps.json";
import kansasRampsRaw from "./kansas-ramps.json";
import floridaRampsRaw from "./florida-ramps.json";
import michiganRampsRaw from "./michigan-ramps.json";
import minnesotaRampsRaw from "./minnesota-ramps.json";
import northCarolinaRampsRaw from "./north-carolina-ramps.json";
import newYorkRampsRaw from "./new-york-ramps.json";
import illinoisRampsRaw from "./illinois-ramps.json";
import ohioRampsRaw from "./ohio-ramps.json";
import washingtonRampsRaw from "./washington-ramps.json";
import alabamaRampsRaw from "./alabama-ramps.json";
import georgiaRampsRaw from "./georgia-ramps.json";
import marylandRampsRaw from "./maryland-ramps.json";
import oregonRampsRaw from "./oregon-ramps.json";
import tennesseeRampsRaw from "./tennessee-ramps.json";
import alaskaRampsRaw from "./alaska-ramps.json";
import arizonaRampsRaw from "./arizona-ramps.json";
import californiaRampsRaw from "./california-ramps.json";
import coloradoRampsRaw from "./colorado-ramps.json";
import connecticutRampsRaw from "./connecticut-ramps.json";
import delawareRampsRaw from "./delaware-ramps.json";
import hawaiiRampsRaw from "./hawaii-ramps.json";
import idahoRampsRaw from "./idaho-ramps.json";
import indianaRampsRaw from "./indiana-ramps.json";
import iowaRampsRaw from "./iowa-ramps.json";
import kentuckyRampsRaw from "./kentucky-ramps.json";
import louisianaRampsRaw from "./louisiana-ramps.json";
import maineRampsRaw from "./maine-ramps.json";
import massachusettsRampsRaw from "./massachusetts-ramps.json";
import mississippiRampsRaw from "./mississippi-ramps.json";
import montanaRampsRaw from "./montana-ramps.json";
import nebraskaRampsRaw from "./nebraska-ramps.json";
import newHampshireRampsRaw from "./new-hampshire-ramps.json";
import newJerseyRampsRaw from "./new-jersey-ramps.json";
import newMexicoRampsRaw from "./new-mexico-ramps.json";
import northDakotaRampsRaw from "./north-dakota-ramps.json";
import pennsylvaniaRampsRaw from "./pennsylvania-ramps.json";
import southCarolinaRampsRaw from "./south-carolina-ramps.json";
import southDakotaRampsRaw from "./south-dakota-ramps.json";
import utahRampsRaw from "./utah-ramps.json";
import virginiaRampsRaw from "./virginia-ramps.json";
import westVirginiaRampsRaw from "./west-virginia-ramps.json";
import wyomingRampsRaw from "./wyoming-ramps.json";

export interface UnifiedRamp {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  county: string;
  state: string;
  rating: number;
  totalRatings: number;
  featured: boolean;
  amenities?: string[];
  fee?: string;
  rampCount?: number;
  grandLakeData?: Ramp;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

/**
 * Only consider an Oklahoma ramp a duplicate of a Grand Lake ramp if:
 * 1. GPS coordinates are within 0.01 degrees (~1km), OR
 * 2. Exact name match (case-insensitive)
 */
function isDuplicateOfGrandLake(name: string, lat: number, lng: number): boolean {
  const lower = name.toLowerCase().trim();
  for (const gl of grandLakeRamps as Ramp[]) {
    // Exact name match
    if (gl.name.toLowerCase() === lower) return true;
    // GPS proximity match (within ~1km)
    if (Math.abs(gl.latitude - lat) < 0.01 && Math.abs(gl.longitude - lng) < 0.01) return true;
  }
  return false;
}

/** Check if a ramp name is generic/unnamed — no real identifying name */
export function isGenericName(name: string): boolean {
  const n = (name || "").trim().toLowerCase();
  if (!n || n.length < 3) return true;
  if (n === "boat ramp" || n === "boat launch" || n === "slipway") return true;
  // "Boat Ramp at [Lake]", "Boat Ramp near [City]", "Boat Launch at [Lake]", etc.
  if (/^boat\s+(ramp|launch)\s+(at|near|on|off)\s+/i.test(n)) return true;
  // "Boat Ramp - [Location]" or "Boat Ramp #2" style
  if (/^boat\s+(ramp|launch)\s*[-#]/i.test(n)) return true;
  return false;
}

/** Sort ramps: enriched first (by rating desc), then named (alpha), then generic (alpha) */
export function sortRamps(ramps: UnifiedRamp[]): UnifiedRamp[] {
  return [...ramps].sort((a, b) => {
    const aEnriched = a.rating > 0 || a.totalRatings > 0 || !!(a.amenities?.length) || a.featured;
    const bEnriched = b.rating > 0 || b.totalRatings > 0 || !!(b.amenities?.length) || b.featured;
    const aGeneric = isGenericName(a.name);
    const bGeneric = isGenericName(b.name);
    // Tier 1: enriched ramps first
    if (aEnriched && !bEnriched) return -1;
    if (!aEnriched && bEnriched) return 1;
    if (aEnriched && bEnriched) return (b.rating || 0) - (a.rating || 0) || a.name.localeCompare(b.name);
    // Tier 2: named ramps before generic
    if (!aGeneric && bGeneric) return -1;
    if (aGeneric && !bGeneric) return 1;
    // Within same tier, sort alphabetically
    return a.name.localeCompare(b.name);
  });
}

function generateDescription(raw: { name: string; city: string; rating: number | null; total_ratings: number; latitude: number; longitude: number }): string {
  const name = raw.name.replace(/[^\w\s'-]/g, "").trim();
  const city = raw.city || "the area";
  const parts: string[] = [];
  parts.push(`${name} is a public boat ramp located near ${city}.`);
  if (raw.rating && raw.total_ratings > 0) {
    parts.push(`Rated ${raw.rating}/5 by ${raw.total_ratings} visitor${raw.total_ratings > 1 ? "s" : ""} on Google.`);
  }
  parts.push(`GPS coordinates: ${raw.latitude.toFixed(4)}, ${raw.longitude.toFixed(4)}.`);
  return parts.join(" ");
}

function extractCounty(address: string): string {
  const match = address.match(/(\w+)\s+County/i);
  return match ? match[1] : "";
}

// Build unified list
const seenSlugs = new Set<string>();
const allRamps: UnifiedRamp[] = [];

// 1. Add all Grand Lake ramps first (featured)
for (const r of grandLakeRamps as Ramp[]) {
  seenSlugs.add(r.id);
  allRamps.push({
    id: r.id,
    name: r.name,
    description: r.description,
    latitude: r.latitude,
    longitude: r.longitude,
    address: `${r.address}, ${r.city}, ${r.state} ${r.zip}`,
    city: r.city,
    county: "Delaware",
    state: "OK",
    rating: r.rating,
    totalRatings: 0,
    featured: true,
    grandLakeData: r,
  });
}

// 2. Add Oklahoma ramps — only skip true duplicates
for (const raw of oklahomaRampsRaw) {
  const cleanName = raw.name.replace(/[^\w\s'-]/g, "").trim() || "Boat Ramp";

  // Only skip if GPS or exact name matches a Grand Lake ramp
  if (isDuplicateOfGrandLake(cleanName, raw.latitude, raw.longitude)) continue;

  // Generate unique slug — append place_id if slug collides
  let slug = slugify(cleanName) || "boat-ramp";
  if (seenSlugs.has(slug)) {
    const city = slugify(raw.city);
    slug = city ? `${slug}-${city}` : `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  }
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;

  seenSlugs.add(slug);
  allRamps.push({
    id: slug,
    name: cleanName,
    description: generateDescription(raw),
    latitude: raw.latitude,
    longitude: raw.longitude,
    address: raw.formatted_address,
    city: raw.city,
    county: extractCounty(raw.formatted_address) || raw.county || "",
    state: "OK",
    rating: raw.rating || 0,
    totalRatings: raw.total_ratings || 0,
    featured: false,
  });
}

// 3. Add Texas ramps
for (const raw of texasRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `tx-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug,
    name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude,
    longitude: raw.longitude,
    address: raw.formatted_address || "",
    city: raw.city || "",
    county: raw.county || "",
    state: "TX",
    rating: raw.rating || 0,
    totalRatings: raw.total_ratings || 0,
    featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 4. Add Missouri ramps
for (const raw of missouriRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `mo-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug,
    name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude,
    longitude: raw.longitude,
    address: raw.formatted_address || "",
    city: raw.city || "",
    county: raw.county || "",
    state: "MO",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 5. Add Arkansas ramps
for (const raw of arkansasRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `ar-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "AR",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 6. Add Kansas ramps
for (const raw of kansasRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `ks-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "KS",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 7. Add Florida ramps
for (const raw of floridaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `fl-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "FL",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 8. Add Michigan ramps
for (const raw of michiganRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `mi-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "MI",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 9. Add Minnesota ramps
for (const raw of minnesotaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `mn-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "MN",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 10. Add North Carolina ramps
for (const raw of northCarolinaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `nc-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "NC",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 11. Add New York ramps
for (const raw of newYorkRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `ny-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "NY",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 12. Add Illinois ramps
for (const raw of illinoisRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `il-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "IL",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 13. Add Ohio ramps
for (const raw of ohioRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `oh-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "OH",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 14. Add Washington ramps
for (const raw of washingtonRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `wa-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "WA",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 15. Add Alabama ramps
for (const raw of alabamaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `al-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "AL",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 16. Add Georgia ramps
for (const raw of georgiaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();

  let slug = `ga-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({
    id: slug, name: cleanName,
    description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
    latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
    city: raw.city || "", county: raw.county || "", state: "GA",
    rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
    amenities: (raw as Record<string, unknown>).amenities as string[] | undefined,
    fee: (raw as Record<string, unknown>).fee as string | undefined,
    rampCount: (raw as Record<string, unknown>).rampCount as number | undefined,
  });
}

// 17. Add Maryland ramps
for (const raw of marylandRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `md-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "MD", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 18. Add Oregon ramps
for (const raw of oregonRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `or-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "OR", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 19. Add Tennessee ramps
for (const raw of tennesseeRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `tn-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "TN", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}


// 20. Add alaska ramps
for (const raw of alaskaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ak-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "AK", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 21. Add arizona ramps
for (const raw of arizonaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `az-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "AZ", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 22. Add california ramps
for (const raw of californiaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ca-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "CA", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 23. Add colorado ramps
for (const raw of coloradoRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `co-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "CO", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 24. Add connecticut ramps
for (const raw of connecticutRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ct-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "CT", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 25. Add delaware ramps
for (const raw of delawareRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `de-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "DE", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 26. Add hawaii ramps
for (const raw of hawaiiRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `hi-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "HI", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 27. Add idaho ramps
for (const raw of idahoRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `id-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "ID", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 28. Add indiana ramps
for (const raw of indianaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `in-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "IN", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 29. Add iowa ramps
for (const raw of iowaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ia-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "IA", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 30. Add kentucky ramps
for (const raw of kentuckyRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ky-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "KY", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 31. Add louisiana ramps
for (const raw of louisianaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `la-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "LA", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 32. Add maine ramps
for (const raw of maineRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `me-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "ME", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 33. Add massachusetts ramps
for (const raw of massachusettsRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ma-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "MA", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 34. Add mississippi ramps
for (const raw of mississippiRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ms-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "MS", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 35. Add montana ramps
for (const raw of montanaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `mt-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "MT", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 36. Add nebraska ramps
for (const raw of nebraskaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ne-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "NE", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 37. Add new-hampshire ramps
for (const raw of newHampshireRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `nh-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "NH", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 38. Add new-jersey ramps
for (const raw of newJerseyRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `nj-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "NJ", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 39. Add new-mexico ramps
for (const raw of newMexicoRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `nm-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "NM", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 40. Add north-dakota ramps
for (const raw of northDakotaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `nd-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "ND", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 41. Add pennsylvania ramps
for (const raw of pennsylvaniaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `pa-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "PA", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 42. Add south-carolina ramps
for (const raw of southCarolinaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `sc-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "SC", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 43. Add south-dakota ramps
for (const raw of southDakotaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `sd-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "SD", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 44. Add utah ramps
for (const raw of utahRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `ut-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "UT", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 45. Add virginia ramps
for (const raw of virginiaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `va-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "VA", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 46. Add west-virginia ramps
for (const raw of westVirginiaRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `wv-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "WV", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

// 47. Add wyoming ramps
for (const raw of wyomingRampsRaw) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
  let slug = `wy-${slugify(cleanName) || "boat-ramp"}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
  if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "WY", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}

export const unified = allRamps;

export function getUnifiedRampById(id: string): UnifiedRamp | undefined {
  return allRamps.find((r) => r.id === id);
}

export function getRampsByCity(city: string): UnifiedRamp[] {
  return allRamps.filter((r) => r.city.toLowerCase() === city.toLowerCase());
}

export function getFeaturedRamps(): UnifiedRamp[] {
  return allRamps.filter((r) => r.featured);
}

export function getAllCities(): { city: string; count: number }[] {
  const map: Record<string, number> = {};
  for (const r of allRamps) {
    const c = r.city || "Unknown";
    map[c] = (map[c] || 0) + 1;
  }
  return Object.entries(map)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
}

export { amenityLabels };
