import type { Lake } from "./lakes";
import nyLakesData from "./new-york-lakes.json";

export const newYorkLakes: Lake[] = nyLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getNewYorkLakeById(id: string): Lake | undefined {
  return newYorkLakes.find((l) => l.id === id);
}

export function getNewYorkLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of newYorkLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
