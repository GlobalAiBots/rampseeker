import { ramps as grandLakeRamps, amenityLabels, type Ramp } from "./ramps";
import oklahomaRampsRaw from "./oklahoma-ramps.json";

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

// Known Grand Lake name matches (fuzzy matching)
const grandLakeNameMap: Record<string, string> = {};
for (const r of grandLakeRamps as Ramp[]) {
  grandLakeNameMap[r.name.toLowerCase()] = r.id;
}

function matchesGrandLake(name: string): string | null {
  const lower = name.toLowerCase();
  // Direct match
  if (grandLakeNameMap[lower]) return grandLakeNameMap[lower];
  // Partial matches
  for (const [glName, glId] of Object.entries(grandLakeNameMap)) {
    if (lower.includes(glName) || glName.includes(lower)) return glId;
    // Match key words
    const words = glName.split(/\s+/).filter((w) => w.length > 3);
    const matchCount = words.filter((w) => lower.includes(w)).length;
    if (matchCount >= 2 && words.length <= 4) return glId;
  }
  return null;
}

function generateDescription(raw: typeof oklahomaRampsRaw[0]): string {
  const name = raw.name.replace(/[^\w\s'-]/g, "").trim();
  const city = raw.city || "Oklahoma";
  const parts: string[] = [];
  parts.push(`${name} is a public boat ramp located near ${city}, Oklahoma.`);
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

// 2. Add Oklahoma ramps that don't duplicate Grand Lake ones
for (const raw of oklahomaRampsRaw) {
  const cleanName = raw.name.replace(/[^\w\s'-]/g, "").trim();
  const slug = slugify(cleanName) || `ramp-${raw.place_id.substring(0, 8)}`;

  // Skip if matches a Grand Lake ramp
  const glMatch = matchesGrandLake(raw.name);
  if (glMatch) continue;

  // Skip duplicate slugs
  if (seenSlugs.has(slug)) {
    const deduped = `${slug}-${raw.city.toLowerCase().replace(/\s+/g, "-")}`;
    if (seenSlugs.has(deduped)) continue;
    seenSlugs.add(deduped);
    allRamps.push({
      id: deduped,
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
  } else {
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
