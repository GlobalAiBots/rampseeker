import type { Lake } from "./lakes";
import ksLakesData from "./kansas-lakes.json";

export const kansasLakes: Lake[] = ksLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getKansasLakeById(id: string): Lake | undefined {
  return kansasLakes.find((l) => l.id === id);
}

export function getKansasLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of kansasLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
