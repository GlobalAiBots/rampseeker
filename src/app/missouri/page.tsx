"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { missouriLakes, getMissouriLakeForRamp } from "@/data/missouri-lakes";

export default function MissouriPage() {
  const moRamps = useMemo(() => unified.filter((r) => r.state === "MO"), []);
  const [showAll, setShowAll] = useState(false);
  const featuredLake = missouriLakes.find((l) => l.id === "lake-of-the-ozarks");
  const featuredRamps = useMemo(() => featuredLake ? moRamps.filter((r) => getMissouriLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id) : [], [moRamps, featuredLake]);
  const lakeCounts = useMemo(() => { const m: Record<string, number> = {}; for (const l of missouriLakes) m[l.id] = moRamps.filter((r) => getMissouriLakeForRamp(r.latitude, r.longitude)?.id === l.id).length; return m; }, [moRamps]);
  const cityMap = useMemo(() => { const m: Record<string, number> = {}; for (const r of moRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1]); }, [moRamps]);
  const display = showAll ? moRamps : moRamps.slice(0, 36);

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Missouri Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Missouri</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{moRamps.length}+ boat ramps across {missouriLakes.length} major lakes.</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} ramps &middot; 1,150 miles of shoreline</p></div>
            <Link href={`/missouri/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Missouri"}</p>
                <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8"><h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Missouri Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {missouriLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/missouri/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between"><h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3><span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span></div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400"><span>{l.acres.toLocaleString()} acres</span><span>{l.maxDepth} ft deep</span></div>
            </Link>
          ))}
        </div>
      </section>

      {cityMap.length > 0 && (<section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => (<div key={city} className="bg-white border border-gray-200 rounded-lg p-3"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></div>))}</div>
      </section>)}

      <section className="max-w-6xl mx-auto px-4 pt-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All {moRamps.length} Missouri Boat Ramps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {display.map((r) => { const lake = getMissouriLakeForRamp(r.latitude, r.longitude); return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-lg p-3 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
              <p className="text-gray-500 text-xs mt-0.5">{r.city || "Missouri"}{lake ? ` \u00b7 ${lake.name}` : ""}</p>
            </Link>); })}
        </div>
        {!showAll && moRamps.length > 36 && (<button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">Show all {moRamps.length} ramps</button>)}
      </section>
    </div>
  );
}
