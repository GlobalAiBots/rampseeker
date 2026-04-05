import type { Lake } from "./lakes";
import data from "./iowa-lakes.json";

export const iowaLakes: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getIowaLakeById(id: string): Lake | undefined {
  return iowaLakes.find((l) => l.id === id);
}

export function getIowaLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of iowaLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
