"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type UnifiedRamp, amenityLabels, isGenericName, sortRamps } from "@/data/all-ramps";

export default function RampList({ ramps, stateName }: { ramps: UnifiedRamp[]; stateName: string }) {
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(() => sortRamps(ramps), [ramps]);

  const enriched = useMemo(() => sorted.filter((r) => r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length) || r.featured), [sorted]);
  const named = useMemo(() => sorted.filter((r) => !isGenericName(r.name) && !(r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length) || r.featured)), [sorted]);
  const generic = useMemo(() => sorted.filter((r) => isGenericName(r.name) && !(r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length))), [sorted]);

  const namedDisplay = showAll ? named : named.slice(0, 30);
  const genericDisplay = showAll ? generic : generic.slice(0, 20);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All {ramps.length} {stateName} Boat Ramps</h2>

      {/* Tier 1: Enriched ramps with full cards */}
      {enriched.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {enriched.map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {r.city || stateName}
                {r.rating > 0 && <span> &middot; {r.rating}/5{r.totalRatings > 0 ? ` (${r.totalRatings})` : ""}</span>}
                {r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}
              </p>
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
      )}

      {/* Tier 2: Named ramps — standard cards */}
      {namedDisplay.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {namedDisplay.map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-lg p-3 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
              <p className="text-gray-500 text-xs mt-0.5">{r.city || stateName}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Tier 3: Generic ramps — compact rows */}
      {genericDisplay.length > 0 && (
        <>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Additional Launch Sites</p>
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
            {genericDisplay.map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="flex items-center justify-between px-4 py-2.5 hover:bg-water/5 transition group">
                <div>
                  <span className="text-sm text-charcoal group-hover:text-water transition">{r.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}</span>
                </div>
                <span className="text-xs font-semibold text-sunset">Details &rarr;</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {!showAll && (named.length > 30 || generic.length > 20) && (
        <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">
          Show all {ramps.length} ramps ({named.length - namedDisplay.length + generic.length - genericDisplay.length} more)
        </button>
      )}
    </section>
  );
}
