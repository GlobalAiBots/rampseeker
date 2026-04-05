import type { Lake } from "./lakes";
import mnLakesData from "./minnesota-lakes.json";

export const minnesotaLakes: Lake[] = mnLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getMinnesotaLakeById(id: string): Lake | undefined {
  return minnesotaLakes.find((l) => l.id === id);
}

export function getMinnesotaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of minnesotaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
