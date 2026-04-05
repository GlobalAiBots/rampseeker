import type { Lake } from "./lakes";
import data from "./new-hampshire-lakes.json";

export const newHampshireLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getNewHampshireLakeById(id: string): Lake | undefined {
  return newHampshireLakes.find((l) => l.id === id);
}

export function getNewHampshireLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of newHampshireLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
