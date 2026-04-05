import type { Lake } from "./lakes";
import gaLakesData from "./georgia-lakes.json";

export const georgiaLakes: Lake[] = gaLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getGeorgiaLakeById(id: string): Lake | undefined {
  return georgiaLakes.find((l) => l.id === id);
}

export function getGeorgiaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of georgiaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
