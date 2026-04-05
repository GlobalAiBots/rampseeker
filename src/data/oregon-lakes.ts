import type { Lake } from "./lakes";
import orLakesData from "./oregon-lakes.json";

export const oregonLakes: Lake[] = orLakesData.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function getOregonLakeById(id: string): Lake | undefined {
  return oregonLakes.find((l) => l.id === id);
}

export function getOregonLakeForRamp(lat: number, lng: number): Lake | undefined {
  for (const l of oregonLakes) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
