import type { Lake } from "./lakes";
import alLakesData from "./alabama-lakes.json";

export const alabamaLakes: Lake[] = alLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getAlabamaLakeById(id: string): Lake | undefined {
  return alabamaLakes.find((l) => l.id === id);
}

export function getAlabamaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of alabamaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
