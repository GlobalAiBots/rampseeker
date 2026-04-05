import type { Lake } from "./lakes";
import data from "./maine-lakes.json";

export const maineLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getMaineLakeById(id: string): Lake | undefined {
  return maineLakes.find((l) => l.id === id);
}

export function getMaineLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of maineLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
