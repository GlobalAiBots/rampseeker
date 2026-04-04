import type { Lake } from "./lakes";
import txLakesData from "./texas-lakes.json";

export const texasLakes: Lake[] = txLakesData.map((l) => ({
  id: l.id,
  name: l.name,
  description: l.description,
  acres: l.acres,
  shorelineMiles: l.shorelineMiles,
  maxDepth: l.maxDepth,
  counties: l.counties,
  fishSpecies: l.fishSpecies,
  nearestTowns: l.nearestTowns,
  lat: l.lat,
  lng: l.lng,
  radius: l.radius,
}));

export function getTexasLakeById(id: string): Lake | undefined {
  return texasLakes.find((l) => l.id === id);
}

export function getTexasLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of texasLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
