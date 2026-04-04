"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels } from "@/data/all-ramps";
import { lakes, getLakeForRamp } from "@/data/lakes";
import CletusAd from "@/components/CletusAd";

export default function OklahomaPage() {
  const okRamps = useMemo(() => unified.filter((r) => r.state === "OK"), []);
  const featured = useMemo(() => okRamps.filter((r) => r.featured), [okRamps]);
  const [showAll, setShowAll] = useState(false);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of lakes) {
      map[l.id] = l.id === "grand-lake"
        ? featured.length
        : okRamps.filter((r) => getLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    }
    return map;
  }, [okRamps, featured]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of okRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [okRamps]);

  const display = showAll ? okRamps : okRamps.slice(0, 36);

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Oklahoma Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Oklahoma</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{okRamps.length}+ boat ramps across {lakes.length} major lakes. GPS coordinates, amenities, directions.</p>
      </section>

      {/* Featured Grand Lake */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: Grand Lake</h2>
              <p className="text-gray-400 text-sm">{featured.length} ramps with detailed guides and local tips</p>
            </div>
            <Link href="/grand-lake" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.slice(0, 6).map((r) => {
              const gl = r.grandLakeData;
              return (
                <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{r.city}, OK{gl ? ` \u00b7 ${gl.rampCount} ramp${gl.rampCount > 1 ? "s" : ""} \u00b7 ${gl.fee === "free" ? "Free" : gl.fee}` : ""}</p>
                  {gl && gl.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {gl.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                      ))}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Lakes */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Oklahoma Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).slice(0, 12).map((l) => (
            <Link key={l.id} href={l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}`}
              className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3>
                <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">
                <span>{l.acres.toLocaleString()} acres</span>
                <span>{l.maxDepth} ft deep</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cities */}
      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 16).map(([city, count]) => (
              <Link key={city} href={`/find/${city.toLowerCase().replace(/\s+/g, "-")}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{city}</p>
                <p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Ramps */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All {okRamps.length} Oklahoma Boat Ramps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {display.map((r) => {
            const lake = getLakeForRamp(r.latitude, r.longitude);
            return (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-lg p-3 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                  {r.featured && <span className="text-[10px] font-bold text-sunset bg-sunset/10 px-1.5 py-0.5 rounded-full">Detailed</span>}
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{r.city || "Oklahoma"}{lake ? ` \u00b7 ${lake.name}` : ""}</p>
              </Link>
            );
          })}
        </div>
        {!showAll && okRamps.length > 36 && (
          <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">
            Show all {okRamps.length} ramps
          </button>
        )}
      </section>

      <div className="max-w-6xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
