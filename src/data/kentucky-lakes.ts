import type { Lake } from "./lakes";
import data from "./kentucky-lakes.json";

export const kentuckyLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getKentuckyLakeById(id: string): Lake | undefined {
  return kentuckyLakes.find((l) => l.id === id);
}

export function getKentuckyLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of kentuckyLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
