import type { Lake } from "./lakes";
import data from "./louisiana-lakes.json";

export const louisianaLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getLouisianaLakeById(id: string): Lake | undefined {
  return louisianaLakes.find((l) => l.id === id);
}

export function getLouisianaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of louisianaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
