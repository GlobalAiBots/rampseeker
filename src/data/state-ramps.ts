/**
 * Per-state ramp loader — imports only ONE state's ramps at a time.
 * Use this instead of importing `unified` from all-ramps.ts to avoid
 * loading all 29,000+ ramps into every page.
 */
import { ramps as grandLakeRamps, type Ramp } from "./ramps";
import type { UnifiedRamp } from "./ramp-utils";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 60);
}

function generateDescription(raw: { name: string; city: string; rating: number | null; total_ratings: number; latitude: number; longitude: number }): string {
  const name = raw.name.replace(/[^\w\s'-]/g, "").trim();
  const city = raw.city || "the area";
  const parts: string[] = [`${name} is a public boat ramp located near ${city}.`];
  if (raw.rating && raw.total_ratings > 0) parts.push(`Rated ${raw.rating}/5 by ${raw.total_ratings} visitor${raw.total_ratings > 1 ? "s" : ""} on Google.`);
  parts.push(`GPS coordinates: ${raw.latitude.toFixed(4)}, ${raw.longitude.toFixed(4)}.`);
  return parts.join(" ");
}

function isDuplicateOfGrandLake(name: string, lat: number, lng: number): boolean {
  const lower = name.toLowerCase().trim();
  for (const gl of grandLakeRamps as Ramp[]) {
    if (gl.name.toLowerCase() === lower) return true;
    if (Math.abs(gl.latitude - lat) < 0.01 && Math.abs(gl.longitude - lng) < 0.01) return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildRamps(rawRamps: any[], stateCode: string, prefix: string, isOK = false): UnifiedRamp[] {
  const seenSlugs = new Set<string>();
  const result: UnifiedRamp[] = [];

  if (isOK) {
    // Add Grand Lake ramps first
    for (const r of grandLakeRamps as Ramp[]) {
      seenSlugs.add(r.id);
      result.push({
        id: r.id, name: r.name, description: r.description,
        latitude: r.latitude, longitude: r.longitude,
        address: `${r.address}, ${r.city}, ${r.state} ${r.zip}`,
        city: r.city, county: "Delaware", state: "OK",
        rating: r.rating, totalRatings: 0, featured: true, grandLakeData: r,
      });
    }
  }

  for (const raw of rawRamps) {
    const cleanName = (raw.name || "Boat Ramp").replace(/[^\w\s'-]/g, "").trim();
    if (isOK && isDuplicateOfGrandLake(cleanName, raw.latitude, raw.longitude)) continue;

    let slug = isOK
      ? (slugify(cleanName) || "boat-ramp")
      : `${prefix}-${slugify(cleanName) || "boat-ramp"}`;
    if (seenSlugs.has(slug)) {
      if (isOK) {
        const city = slugify(raw.city);
        slug = city ? `${slug}-${city}` : `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
      } else {
        slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
      }
    }
    if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
    if (seenSlugs.has(slug)) continue;

    seenSlugs.add(slug);
    result.push({
      id: slug, name: cleanName,
      description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }),
      latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
      city: raw.city || "", county: raw.county || "", state: stateCode,
      rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
      amenities: raw.amenities as string[] | undefined,
      fee: raw.fee as string | undefined,
      rampCount: raw.rampCount as number | undefined,
    });
  }
  return result;
}

// Pre-built loaders for each state — only the imported one runs
import okRaw from "./oklahoma-ramps.json";
export const oklahomaRamps = buildRamps(okRaw, "OK", "", true);

import txRaw from "./texas-ramps.json";
export const texasRamps = buildRamps(txRaw, "TX", "tx");

import moRaw from "./missouri-ramps.json";
export const missouriRamps = buildRamps(moRaw, "MO", "mo");

import arRaw from "./arkansas-ramps.json";
export const arkansasRamps = buildRamps(arRaw, "AR", "ar");

import ksRaw from "./kansas-ramps.json";
export const kansasRamps = buildRamps(ksRaw, "KS", "ks");

import flRaw from "./florida-ramps.json";
export const floridaRamps = buildRamps(flRaw, "FL", "fl");

import miRaw from "./michigan-ramps.json";
export const michiganRamps = buildRamps(miRaw, "MI", "mi");

import mnRaw from "./minnesota-ramps.json";
export const minnesotaRamps = buildRamps(mnRaw, "MN", "mn");

import ncRaw from "./north-carolina-ramps.json";
export const northCarolinaRamps = buildRamps(ncRaw, "NC", "nc");

import nyRaw from "./new-york-ramps.json";
export const newYorkRamps = buildRamps(nyRaw, "NY", "ny");

import ilRaw from "./illinois-ramps.json";
export const illinoisRamps = buildRamps(ilRaw, "IL", "il");

import ohRaw from "./ohio-ramps.json";
export const ohioRamps = buildRamps(ohRaw, "OH", "oh");

import waRaw from "./washington-ramps.json";
export const washingtonRamps = buildRamps(waRaw, "WA", "wa");

import alRaw from "./alabama-ramps.json";
export const alabamaRamps = buildRamps(alRaw, "AL", "al");

import gaRaw from "./georgia-ramps.json";
export const georgiaRamps = buildRamps(gaRaw, "GA", "ga");

import mdRaw from "./maryland-ramps.json";
export const marylandRamps = buildRamps(mdRaw, "MD", "md");

import orRaw from "./oregon-ramps.json";
export const oregonRamps = buildRamps(orRaw, "OR", "or");

import tnRaw from "./tennessee-ramps.json";
export const tennesseeRamps = buildRamps(tnRaw, "TN", "tn");

import akRaw from "./alaska-ramps.json";
export const alaskaRamps = buildRamps(akRaw, "AK", "ak");

import azRaw from "./arizona-ramps.json";
export const arizonaRamps = buildRamps(azRaw, "AZ", "az");

import caRaw from "./california-ramps.json";
export const californiaRamps = buildRamps(caRaw, "CA", "ca");

import coRaw from "./colorado-ramps.json";
export const coloradoRamps = buildRamps(coRaw, "CO", "co");

import ctRaw from "./connecticut-ramps.json";
export const connecticutRamps = buildRamps(ctRaw, "CT", "ct");

import deRaw from "./delaware-ramps.json";
export const delawareRamps = buildRamps(deRaw, "DE", "de");

import hiRaw from "./hawaii-ramps.json";
export const hawaiiRamps = buildRamps(hiRaw, "HI", "hi");

import idRaw from "./idaho-ramps.json";
export const idahoRamps = buildRamps(idRaw, "ID", "id");

import inRaw from "./indiana-ramps.json";
export const indianaRamps = buildRamps(inRaw, "IN", "in");

import iaRaw from "./iowa-ramps.json";
export const iowaRamps = buildRamps(iaRaw, "IA", "ia");

import kyRaw from "./kentucky-ramps.json";
export const kentuckyRamps = buildRamps(kyRaw, "KY", "ky");

import laRaw from "./louisiana-ramps.json";
export const louisianaRamps = buildRamps(laRaw, "LA", "la");

import meRaw from "./maine-ramps.json";
export const maineRamps = buildRamps(meRaw, "ME", "me");

import maRaw from "./massachusetts-ramps.json";
export const massachusettsRamps = buildRamps(maRaw, "MA", "ma");

import msRaw from "./mississippi-ramps.json";
export const mississippiRamps = buildRamps(msRaw, "MS", "ms");

import mtRaw from "./montana-ramps.json";
export const montanaRamps = buildRamps(mtRaw, "MT", "mt");

import neRaw from "./nebraska-ramps.json";
export const nebraskaRamps = buildRamps(neRaw, "NE", "ne");

import nhRaw from "./new-hampshire-ramps.json";
export const newHampshireRamps = buildRamps(nhRaw, "NH", "nh");

import njRaw from "./new-jersey-ramps.json";
export const newJerseyRamps = buildRamps(njRaw, "NJ", "nj");

import nmRaw from "./new-mexico-ramps.json";
export const newMexicoRamps = buildRamps(nmRaw, "NM", "nm");

import ndRaw from "./north-dakota-ramps.json";
export const northDakotaRamps = buildRamps(ndRaw, "ND", "nd");

import paRaw from "./pennsylvania-ramps.json";
export const pennsylvaniaRamps = buildRamps(paRaw, "PA", "pa");

import scRaw from "./south-carolina-ramps.json";
export const southCarolinaRamps = buildRamps(scRaw, "SC", "sc");

import sdRaw from "./south-dakota-ramps.json";
export const southDakotaRamps = buildRamps(sdRaw, "SD", "sd");

import utRaw from "./utah-ramps.json";
export const utahRamps = buildRamps(utRaw, "UT", "ut");

import vaRaw from "./virginia-ramps.json";
export const virginiaRamps = buildRamps(vaRaw, "VA", "va");

import wvRaw from "./west-virginia-ramps.json";
export const westVirginiaRamps = buildRamps(wvRaw, "WV", "wv");

import wyRaw from "./wyoming-ramps.json";
export const wyomingRamps = buildRamps(wyRaw, "WY", "wy");
