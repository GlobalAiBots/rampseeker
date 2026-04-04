"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { arkansasLakes, getArkansasLakeForRamp } from "@/data/arkansas-lakes";

export default function ArkansasPage() {
  const arRamps = useMemo(() => unified.filter((r) => r.state === "AR"), []);
  const [showAll, setShowAll] = useState(false);
  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of arkansasLakes) map[l.id] = arRamps.filter((r) => getArkansasLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [arRamps]);
  const display = showAll ? arRamps : arRamps.slice(0, 36);

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Arkansas Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Arkansas</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{arRamps.length}+ boat ramps across {arkansasLakes.length} major lakes. GPS coordinates, amenities, directions.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
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

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
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
    </div>
  );
}
