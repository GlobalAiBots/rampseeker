"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { lakes, getLakeForRamp } from "@/data/lakes";

// Precompute lake ramp counts
const lakeCounts: Record<string, number> = {};
for (const l of lakes) {
  lakeCounts[l.id] = l.id === "grand-lake"
    ? unified.filter((r) => r.featured).length
    : unified.filter((r) => getLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
}
const sortedLakes = [...lakes].sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0));

export default function MapPage() {
  const [lake, setLake] = useState("");

  const { ramps, center, zoom, title } = useMemo(() => {
    if (!lake) {
      return {
        ramps: unified,
        center: "35.5,-97.5",
        zoom: 7,
        title: "All Oklahoma",
      };
    }
    const lakeData = lakes.find((l) => l.id === lake);
    if (!lakeData) return { ramps: unified, center: "35.5,-97.5", zoom: 7, title: "All Oklahoma" };

    const filtered = lake === "grand-lake"
      ? unified.filter((r) => r.featured)
      : unified.filter((r) => getLakeForRamp(r.latitude, r.longitude)?.id === lake);

    return {
      ramps: filtered,
      center: `${lakeData.lat},${lakeData.lng}`,
      zoom: 11,
      title: lakeData.name,
    };
  }, [lake]);

  const embedUrl = `https://www.google.com/maps?q=boat+ramps+${encodeURIComponent(title)}+Oklahoma&ll=${center}&z=${zoom}&output=embed`;

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-1">Oklahoma Boat Ramp Map</h1>
        <p className="text-gray-500 mb-6">{unified.length}+ boat ramps across {lakes.length} lakes</p>

        {/* Lake selector */}
        <div className="mb-6">
          <select
            value={lake}
            onChange={(e) => setLake(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white border border-gray-200 text-charcoal text-sm outline-none focus:border-water transition cursor-pointer shadow-sm w-full sm:w-auto"
          >
            <option value="">All Oklahoma ({unified.length})</option>
            {sortedLakes.map((l) => (
              <option key={l.id} value={l.id}>{l.name} ({lakeCounts[l.id] || 0})</option>
            ))}
          </select>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8" style={{ height: 480 }}>
          <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${title} boat ramp map`} />
        </div>

        {/* Ramp count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">
            {lake ? `Ramps on ${title}` : "All Ramps"} ({ramps.length})
          </h2>
          {lake && (
            <Link href={lake === "grand-lake" ? "/grand-lake" : `/lakes/${lake}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition">
              Full {title} page &rarr;
            </Link>
          )}
        </div>

        {/* Ramp list */}
        <div className="space-y-2">
          {ramps.map((r) => {
            const rampLake = getLakeForRamp(r.latitude, r.longitude);
            return (
              <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex-1 min-w-0">
                  <Link href={`/ramps/${r.id}`} className="font-bold text-charcoal hover:text-water transition text-sm">{r.name}</Link>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {r.city}, OK
                    {rampLake && !lake ? ` \u00b7 ${rampLake.name}` : ""}
                    {r.featured ? " \u00b7 Detailed Guide" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-400 font-mono hidden sm:inline">{r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}</span>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-sunset/10 hover:bg-sunset/20 text-sunset text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap">
                    Directions
                  </a>
                  <Link href={`/ramps/${r.id}`} className="text-water text-xs font-bold hover:text-water-light transition whitespace-nowrap">
                    Details &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
