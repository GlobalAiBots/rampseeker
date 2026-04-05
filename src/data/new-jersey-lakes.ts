import type { Lake } from "./lakes";
import data from "./new-jersey-lakes.json";

export const newJerseyLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getNewJerseyLakeById(id: string): Lake | undefined {
  return newJerseyLakes.find((l) => l.id === id);
}

export function getNewJerseyLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of newJerseyLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
