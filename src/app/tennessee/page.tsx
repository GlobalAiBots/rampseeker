"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { tennesseeLakes, getTennesseeLakeForRamp } from "@/data/tennessee-lakes";
import CletusAd from "@/components/CletusAd";
import RampList from "@/components/RampList";

export default function TennesseePage() {
  const tnRamps = useMemo(() => unified.filter((r) => r.state === "TN"), []);

  const featuredLake = useMemo(() => {
    let best = tennesseeLakes.find((l) => l.id === "norris-lake") || tennesseeLakes[0]; let bestCount = 0;
    for (const l of tennesseeLakes) {
      const count = tnRamps.filter((r) => getTennesseeLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [tnRamps]);
  const featuredRamps = useMemo(() => featuredLake ? tnRamps.filter((r) => getTennesseeLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [tnRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of tennesseeLakes) map[l.id] = tnRamps.filter((r) => getTennesseeLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [tnRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of tnRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [tnRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? tnRamps.filter(r => r.city?.trim() === selectedCity) : tnRamps;

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Tennessee Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Tennessee</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{tnRamps.length}+ boat ramps across {tennesseeLakes.length} lakes and rivers. TVA reservoir chain, world-record smallmouth bass (Dale Hollow), Great Smoky Mountains trout.</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/tennessee/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Tennessee"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
                {r.amenities && r.amenities.length > 0 && (<div className="flex flex-wrap gap-1 mt-2">{r.amenities.slice(0, 3).map((a) => (<span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>))}</div>)}
                <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tennessee Lakes &amp; Rivers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tennesseeLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/tennessee/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between"><h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3><span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span></div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">{l.acres > 0 && <span>{l.acres.toLocaleString()} acres</span>}<span>{l.maxDepth} ft deep</span></div>
            </Link>
          ))}
        </div>
      </section>

      {cityMap.length > 0 && (<section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => (<button key={city} onClick={() => { setSelectedCity(city === selectedCity ? null : city); document.getElementById('ramp-list')?.scrollIntoView({ behavior: 'smooth' }); }} className={`text-left bg-white border rounded-lg p-3 hover:border-water hover:bg-blue-50 transition cursor-pointer ${selectedCity === city ? 'border-water bg-blue-50 ring-2 ring-water' : 'border-gray-200'}`}><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></button>))}</div></section>)}

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {tnRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Tennessee" /></div>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tennessee Boating FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in Tennessee?", a: `RampSeeker lists ${tnRamps.length}+ boat ramps across Tennessee, from the TVA reservoirs to the Great Smoky Mountains.` },
            { q: "What are the best fishing spots in Tennessee?", a: "Dale Hollow Lake holds the world record for smallmouth bass. Norris Lake is renowned for its crystal-clear water and striped bass. Kentucky Lake is the largest lake east of the Mississippi with outstanding bass and crappie fishing. Reelfoot Lake is a crappie fishing paradise. The Great Smoky Mountains offer pristine trout streams." },
            { q: "Do I need a boating license in Tennessee?", a: "Tennessee requires Boating Safety Education for all motorized vessel operators born on or after January 1, 1989. All motorized boats must be registered with the Tennessee Wildlife Resources Agency." },
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
