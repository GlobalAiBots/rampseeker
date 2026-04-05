import type { Lake } from "./lakes";
import waLakesData from "./washington-lakes.json";

export const washingtonLakes: Lake[] = waLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getWashingtonLakeById(id: string): Lake | undefined {
  return washingtonLakes.find((l) => l.id === id);
}

export function getWashingtonLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of washingtonLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
