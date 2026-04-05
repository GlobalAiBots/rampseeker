import type { Lake } from "./lakes";
import miLakesData from "./michigan-lakes.json";

export const michiganLakes: Lake[] = miLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getMichiganLakeById(id: string): Lake | undefined {
  return michiganLakes.find((l) => l.id === id);
}

export function getMichiganLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of michiganLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
