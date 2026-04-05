import type { Lake } from "./lakes";
import mdLakesData from "./maryland-lakes.json";

export const marylandLakes: Lake[] = mdLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getMarylandLakeById(id: string): Lake | undefined {
  return marylandLakes.find((l) => l.id === id);
}

export function getMarylandLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of marylandLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
