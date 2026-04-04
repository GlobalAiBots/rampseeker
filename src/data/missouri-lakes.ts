import type { Lake } from "./lakes";
import moLakesData from "./missouri-lakes.json";

export const missouriLakes: Lake[] = moLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getMissouriLakeById(id: string): Lake | undefined {
  return missouriLakes.find((l) => l.id === id);
}

export function getMissouriLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of missouriLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
