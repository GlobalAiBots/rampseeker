"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels } from "@/data/all-ramps";
import { arkansasLakes, getArkansasLakeForRamp } from "@/data/arkansas-lakes";
import CletusAd from "@/components/CletusAd";

function hasRealName(name: string): boolean {
  const n = (name || "").toLowerCase();
  return n.length > 2 && !n.startsWith("boat ramp at") && !n.startsWith("boat ramp near") && n !== "boat ramp" && n !== "boat launch";
}

export default function ArkansasPage() {
  const arRamps = useMemo(() => unified.filter((r) => r.state === "AR"), []);
  const [showAll, setShowAll] = useState(false);
  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of arkansasLakes) map[l.id] = arRamps.filter((r) => getArkansasLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [arRamps]);
  const featuredLake = useMemo(() => {
    let best = arkansasLakes.find((l) => l.id === "beaver-lake") || arkansasLakes[0]; let bestCount = 0;
    for (const l of arkansasLakes) {
      const count = arRamps.filter((r) => getArkansasLakeForRamp(r.latitude, r.longitude)?.id === l.id && hasRealName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [arRamps]);
  const featuredRamps = useMemo(() => featuredLake ? arRamps.filter((r) => getArkansasLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && hasRealName(r.name)) : [], [arRamps, featuredLake]);
  const cityMap = useMemo(() => { const m: Record<string, number> = {}; for (const r of arRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1]); }, [arRamps]);
  const display = showAll ? arRamps : arRamps.slice(0, 36);

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Arkansas Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Arkansas</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{arRamps.length}+ boat ramps across {arkansasLakes.length} major lakes. GPS coordinates, amenities, directions.</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} ramps &middot; Crystal-clear Ozark water</p></div>
            <Link href={`/arkansas/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Arkansas"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
                {r.amenities && r.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {r.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                    ))}
                  </div>
                )}
                <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Arkansas Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {arkansasLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/arkansas/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => (<div key={city} className="bg-white border border-gray-200 rounded-lg p-3"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></div>))}</div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All {arRamps.length} Arkansas Boat Ramps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {display.map((r) => {
            const lake = getArkansasLakeForRamp(r.latitude, r.longitude);
            return (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-lg p-3 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                <p className="text-gray-500 text-xs mt-0.5">{r.city || "Arkansas"}{lake ? ` \u00b7 ${lake.name}` : ""}</p>
              </Link>
            );
          })}
        </div>
        {!showAll && arRamps.length > 36 && (
          <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">Show all {arRamps.length} ramps</button>
        )}
      </section>
      <div className="max-w-6xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
