import type { Lake } from "./lakes";
import flLakesData from "./florida-lakes.json";

export const floridaLakes: Lake[] = flLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getFloridaLakeById(id: string): Lake | undefined {
  return floridaLakes.find((l) => l.id === id);
}

export function getFloridaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of floridaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
