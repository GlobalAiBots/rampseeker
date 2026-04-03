import { unified, type UnifiedRamp } from "./all-ramps";

export interface CityInfo {
  slug: string;
  name: string;
  ramps: UnifiedRamp[];
  lat: number;
  lng: number;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function distance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  // Approximate miles using Haversine shortcut for small distances
  const dlat = (lat2 - lat1) * 69.0;
  const dlng = (lng2 - lng1) * 54.6; // cos(36°) ≈ 0.809, 69 * 0.809 ≈ 55
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

// Build city index from all ramps
const cityMap = new Map<string, { ramps: UnifiedRamp[]; lat: number; lng: number }>();

for (const r of unified) {
  const city = r.city?.trim();
  if (!city || city.includes("County") || /^\d/.test(city)) continue;

  if (!cityMap.has(city)) {
    cityMap.set(city, { ramps: [], lat: 0, lng: 0 });
  }
  const entry = cityMap.get(city)!;
  entry.ramps.push(r);
  // Average the GPS to get city center
  entry.lat = (entry.lat * (entry.ramps.length - 1) + r.latitude) / entry.ramps.length;
  entry.lng = (entry.lng * (entry.ramps.length - 1) + r.longitude) / entry.ramps.length;
}

export const cities: CityInfo[] = Array.from(cityMap.entries())
  .map(([name, data]) => ({
    slug: slugify(name),
    name,
    ramps: data.ramps,
    lat: data.lat,
    lng: data.lng,
  }))
  .filter((c) => c.slug.length > 1)
  .sort((a, b) => b.ramps.length - a.ramps.length);

export function getCityBySlug(slug: string): CityInfo | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getNearbyRamps(lat: number, lng: number, limit = 20): (UnifiedRamp & { distanceMiles: number })[] {
  return unified
    .map((r) => ({ ...r, distanceMiles: +distance(lat, lng, r.latitude, r.longitude).toFixed(1) }))
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, limit);
}

export function getRampsNearCity(citySlug: string, limit = 20): (UnifiedRamp & { distanceMiles: number })[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return getNearbyRamps(city.lat, city.lng, limit);
}
