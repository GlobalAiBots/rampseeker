// Per-state cross-border filter for ramp records mistagged with a US state.
//
// Why this exists: imported ramp data has Canadian records (and a few
// other-US-state records) tagged with the wrong state. The political
// border can't be derived from a simple US-wide bounding box because
// shared lakes (Ontario, Erie, Huron, Lake of the Woods) and the
// St. Lawrence River put US and Canadian records at overlapping
// lat/lng. Each border state needs its own rules.
//
// Returns true if the record is most likely OUTSIDE the named US state
// (typically across an international border). Callers should drop or
// skip those records when building cityMaps for the cities sub-grid.

export function isLikelyNonUS(
  stateAbbr: string,
  lat: number | null | undefined,
  lng: number | null | undefined,
  city?: string | null,
): boolean {
  if (lat == null || lng == null) return false;
  const c = (city || "").toLowerCase();

  switch (stateAbbr) {
    case "NY":
      // Across Lake Ontario / north shore (Toronto, Kawartha Lakes, Belleville,
      // Greater Napanee, Prince Edward County, Frontenac County)
      if (lat > 43.5 && lng < -76.0 && lng > -80.0 && lat < 45.0) return true;
      // Across St. Lawrence into eastern Ontario / Quebec
      if (lat > 44.5 && lng > -76.0 && lng < -73.5) return true;
      // Across Lake Erie (Ontario north shore: Haldimand County, Norfolk County)
      if (lat > 42.5 && lng < -78.9 && lng > -80.5 && lat < 43.2) return true;
      return false;

    case "MN":
      // Anything north of the 49th parallel is Manitoba/Ontario
      if (lat > 49.0) return true;
      // The Rainy River and Lake of the Woods border weaves; lat alone can't
      // distinguish, so block known-Canadian district names that show up in
      // the data tagged as MN.
      if (
        c.includes("unorganized rainy river") ||
        c.includes("unorganized thunder bay") ||
        c.includes("sioux narrows") ||
        c.includes("emo township") ||
        c.includes("nestor falls")
      ) {
        return true;
      }
      return false;

    default:
      return false;
  }
}
