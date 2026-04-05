import type { Lake } from "./lakes";
import data from "./hawaii-lakes.json";

export const hawaiiLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getHawaiiLakeById(id: string): Lake | undefined {
  return hawaiiLakes.find((l) => l.id === id);
}

export function getHawaiiLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of hawaiiLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
