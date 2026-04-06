import { amenityLabels, type Ramp } from "./ramps";

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

/** Check if a ramp name is generic/unnamed — no real identifying name */
export function isGenericName(name: string): boolean {
  const n = (name || "").trim().toLowerCase();
  if (!n || n.length < 3) return true;
  if (n === "boat ramp" || n === "boat launch" || n === "slipway") return true;
  if (/^boat\s+(ramp|launch)\s+(at|near|on|off)\s+/i.test(n)) return true;
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
    if (aEnriched && !bEnriched) return -1;
    if (!aEnriched && bEnriched) return 1;
    if (aEnriched && bEnriched) return (b.rating || 0) - (a.rating || 0) || a.name.localeCompare(b.name);
    if (!aGeneric && bGeneric) return -1;
    if (aGeneric && !bGeneric) return 1;
    return a.name.localeCompare(b.name);
  });
}

export { amenityLabels };
