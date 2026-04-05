import type { Lake } from "./lakes";
import ncLakesData from "./north-carolina-lakes.json";

export const northCarolinaLakes: Lake[] = ncLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getNorthCarolinaLakeById(id: string): Lake | undefined {
  return northCarolinaLakes.find((l) => l.id === id);
}

export function getNorthCarolinaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of northCarolinaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
