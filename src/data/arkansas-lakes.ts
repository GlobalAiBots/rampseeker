import type { Lake } from "./lakes";
import arLakesData from "./arkansas-lakes.json";

export const arkansasLakes: Lake[] = arLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getArkansasLakeById(id: string): Lake | undefined {
  return arkansasLakes.find((l) => l.id === id);
}

export function getArkansasLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of arkansasLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
