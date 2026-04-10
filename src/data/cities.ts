import { unified, type UnifiedRamp } from "./all-ramps";

export interface CityInfo {
  slug: string;
  name: string;
  state: string;
  stateName: string;
  stateSlug: string;
  ramps: UnifiedRamp[];
  lat: number;
  lng: number;
}

const STATE_INFO: Record<string, { name: string; slug: string }> = {
  AL:{name:"Alabama",slug:"alabama"},AK:{name:"Alaska",slug:"alaska"},AZ:{name:"Arizona",slug:"arizona"},AR:{name:"Arkansas",slug:"arkansas"},CA:{name:"California",slug:"california"},CO:{name:"Colorado",slug:"colorado"},CT:{name:"Connecticut",slug:"connecticut"},DE:{name:"Delaware",slug:"delaware"},FL:{name:"Florida",slug:"florida"},GA:{name:"Georgia",slug:"georgia"},HI:{name:"Hawaii",slug:"hawaii"},ID:{name:"Idaho",slug:"idaho"},IL:{name:"Illinois",slug:"illinois"},IN:{name:"Indiana",slug:"indiana"},IA:{name:"Iowa",slug:"iowa"},KS:{name:"Kansas",slug:"kansas"},KY:{name:"Kentucky",slug:"kentucky"},LA:{name:"Louisiana",slug:"louisiana"},ME:{name:"Maine",slug:"maine"},MD:{name:"Maryland",slug:"maryland"},MA:{name:"Massachusetts",slug:"massachusetts"},MI:{name:"Michigan",slug:"michigan"},MN:{name:"Minnesota",slug:"minnesota"},MS:{name:"Mississippi",slug:"mississippi"},MO:{name:"Missouri",slug:"missouri"},MT:{name:"Montana",slug:"montana"},NE:{name:"Nebraska",slug:"nebraska"},NV:{name:"Nevada",slug:"nevada"},NH:{name:"New Hampshire",slug:"new-hampshire"},NJ:{name:"New Jersey",slug:"new-jersey"},NM:{name:"New Mexico",slug:"new-mexico"},NY:{name:"New York",slug:"new-york"},NC:{name:"North Carolina",slug:"north-carolina"},ND:{name:"North Dakota",slug:"north-dakota"},OH:{name:"Ohio",slug:"ohio"},OK:{name:"Oklahoma",slug:"oklahoma"},OR:{name:"Oregon",slug:"oregon"},PA:{name:"Pennsylvania",slug:"pennsylvania"},RI:{name:"Rhode Island",slug:"rhode-island"},SC:{name:"South Carolina",slug:"south-carolina"},SD:{name:"South Dakota",slug:"south-dakota"},TN:{name:"Tennessee",slug:"tennessee"},TX:{name:"Texas",slug:"texas"},UT:{name:"Utah",slug:"utah"},VT:{name:"Vermont",slug:"vermont"},VA:{name:"Virginia",slug:"virginia"},WA:{name:"Washington",slug:"washington"},WV:{name:"West Virginia",slug:"west-virginia"},WI:{name:"Wisconsin",slug:"wisconsin"},WY:{name:"Wyoming",slug:"wyoming"},
};

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
const cityMap = new Map<string, { ramps: UnifiedRamp[]; lat: number; lng: number; state: string }>();

for (const r of unified) {
  const city = r.city?.trim();
  if (!city || city.includes("County") || /^\d/.test(city)) continue;

  const key = `${r.state}|${city}`;
  if (!cityMap.has(key)) {
    cityMap.set(key, { ramps: [], lat: 0, lng: 0, state: r.state || "" });
  }
  const entry = cityMap.get(key)!;
  entry.ramps.push(r);
  entry.lat = (entry.lat * (entry.ramps.length - 1) + r.latitude) / entry.ramps.length;
  entry.lng = (entry.lng * (entry.ramps.length - 1) + r.longitude) / entry.ramps.length;
}

export const cities: CityInfo[] = Array.from(cityMap.entries())
  .map(([, data]) => {
    const si = STATE_INFO[data.state] || { name: data.state, slug: slugify(data.state) };
    const cityName = data.ramps[0]?.city?.trim() || "";
    return {
      slug: slugify(cityName),
      name: cityName,
      state: data.state,
      stateName: si.name,
      stateSlug: si.slug,
      ramps: data.ramps,
      lat: data.lat,
      lng: data.lng,
    };
  })
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
