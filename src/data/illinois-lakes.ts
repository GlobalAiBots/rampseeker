import type { Lake } from "./lakes";
import ilLakesData from "./illinois-lakes.json";

export const illinoisLakes: Lake[] = ilLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getIllinoisLakeById(id: string): Lake | undefined {
  return illinoisLakes.find((l) => l.id === id);
}

export function getIllinoisLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of illinoisLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
