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

/** Check if a ramp name is generic/unnamed */
export function isGenericName(name: string): boolean {
  const n = (name || "").trim().toLowerCase();
  if (!n || n.length < 3) return true;
  if (n === "boat ramp" || n === "boat launch" || n === "slipway") return true;
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
