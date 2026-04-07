"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { minnesotaLakes, getMinnesotaLakeForRamp } from "@/data/minnesota-lakes";
import CletusAd from "@/components/CletusAd";
import RampList from "@/components/RampList";

export default function MinnesotaPage() {
  const mnRamps = useMemo(() => unified.filter((r) => r.state === "MN"), []);

  const featuredLake = useMemo(() => {
    let best = minnesotaLakes.find((l) => l.id === "mille-lacs-lake") || minnesotaLakes[0]; let bestCount = 0;
    for (const l of minnesotaLakes) {
      const count = mnRamps.filter((r) => getMinnesotaLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [mnRamps]);
  const featuredRamps = useMemo(() => featuredLake ? mnRamps.filter((r) => getMinnesotaLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [mnRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of minnesotaLakes) map[l.id] = mnRamps.filter((r) => getMinnesotaLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [mnRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of mnRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [mnRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? mnRamps.filter(r => r.city?.trim() === selectedCity) : mnRamps;


  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Minnesota Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Minnesota</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{mnRamps.length}+ boat ramps across {minnesotaLakes.length} major lakes. The Land of 10,000 Lakes (actually 11,842) — #2 in registered boats. Walleye capital of the world.</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/minnesota/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Minnesota"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Minnesota Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {minnesotaLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/minnesota/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3>
                <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">
                {l.acres > 0 && <span>{l.acres.toLocaleString()} acres</span>}
                <span>{l.maxDepth} ft deep</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => (<button key={city} onClick={() => { setSelectedCity(city === selectedCity ? null : city); document.getElementById('ramp-list')?.scrollIntoView({ behavior: 'smooth' }); }} className={`text-left bg-white border rounded-lg p-3 hover:border-water hover:bg-blue-50 transition cursor-pointer ${selectedCity === city ? 'border-water bg-blue-50 ring-2 ring-water' : 'border-gray-200'}`}><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></button>))}</div>
        </section>
      )}

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {mnRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Minnesota" /></div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Minnesota Boating FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in Minnesota?", a: `RampSeeker lists ${mnRamps.length}+ boat ramps across Minnesota, covering 11,842 lakes and countless rivers and streams.` },
            { q: "What are the best fishing lakes in Minnesota?", a: "Mille Lacs Lake is the walleye capital of the world. Lake Vermilion offers trophy musky and walleye. Leech Lake, Lake Winnibigoshish, and Lake of the Woods are also world-class walleye destinations." },
            { q: "When is Minnesota fishing opener?", a: "Minnesota's fishing opener is a state holiday — typically the second Saturday in May. It marks the start of walleye and northern pike season and is one of the biggest weekends of the year for boaters." },
            { q: "Do I need a boating license in Minnesota?", a: "Anyone born after June 30, 1996 must complete a Minnesota Boating Safety Course before operating a motorboat over 25 HP. All motorized boats and personal watercraft must be registered." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
