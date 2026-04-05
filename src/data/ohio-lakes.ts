import type { Lake } from "./lakes";
import ohLakesData from "./ohio-lakes.json";

export const ohioLakes: Lake[] = ohLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getOhioLakeById(id: string): Lake | undefined {
  return ohioLakes.find((l) => l.id === id);
}

export function getOhioLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of ohioLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
