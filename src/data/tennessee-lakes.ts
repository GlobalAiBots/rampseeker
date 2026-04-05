import type { Lake } from "./lakes";
import tnLakesData from "./tennessee-lakes.json";

export const tennesseeLakes: Lake[] = tnLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getTennesseeLakeById(id: string): Lake | undefined {
  return tennesseeLakes.find((l) => l.id === id);
}

export function getTennesseeLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of tennesseeLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
