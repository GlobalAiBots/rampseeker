"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { texasLakes, getTexasLakeForRamp } from "@/data/texas-lakes";
import CletusAd from "@/components/CletusAd";
import RampList from "@/components/RampList";

export default function TexasPage() {
  const txRamps = useMemo(() => unified.filter((r) => r.state === "TX"), []);

  // Featured lake: pick the one with most NAMED ramps
  const featuredLake = useMemo(() => {
    let best = texasLakes.find((l) => l.id === "lake-travis") || texasLakes[0]; let bestCount = 0;
    for (const l of texasLakes) {
      const count = txRamps.filter((r) => getTexasLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [txRamps]);
  const featuredRamps = useMemo(() => featuredLake ? txRamps.filter((r) => getTexasLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [txRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of texasLakes) map[l.id] = txRamps.filter((r) => getTexasLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [txRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of txRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [txRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? txRamps.filter(r => r.city?.trim() === selectedCity) : txRamps;


  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Texas Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Texas</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{txRamps.length}+ boat ramps across {texasLakes.length} major lakes. GPS coordinates, amenities, directions.</p>
      </section>

      {/* Featured: Lake Travis */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2>
              <p className="text-gray-400 text-sm">{featuredRamps.length} ramps near Austin</p>
            </div>
            <Link href={`/texas/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Texas"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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

      {/* Lakes */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Texas Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {texasLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/texas/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
              <div key={city} className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-charcoal text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {txRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Texas" /></div>
      <div className="max-w-6xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
