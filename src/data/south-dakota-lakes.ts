import type { Lake } from "./lakes";
import data from "./south-dakota-lakes.json";

export const southDakotaLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getSouthDakotaLakeById(id: string): Lake | undefined {
  return southDakotaLakes.find((l) => l.id === id);
}

export function getSouthDakotaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of southDakotaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
