import type { Lake } from "./lakes";
import data from "./utah-lakes.json";

export const utahLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getUtahLakeById(id: string): Lake | undefined {
  return utahLakes.find((l) => l.id === id);
}

export function getUtahLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of utahLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
