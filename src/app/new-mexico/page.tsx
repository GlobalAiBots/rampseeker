"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { newMexicoLakes, getNewMexicoLakeForRamp } from "@/data/new-mexico-lakes";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";

export default function NewMexicoPage() {
  const stRamps = useMemo(() => unified.filter((r) => r.state === "NM"), []);

  const featuredLake = useMemo(() => {
    let best = newMexicoLakes.find((l) => l.id === "elephant-butte-lake") || newMexicoLakes[0]; let bestCount = 0;
    for (const l of newMexicoLakes) {
      const count = stRamps.filter((r) => getNewMexicoLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [stRamps]);
  const featuredRamps = useMemo(() => featuredLake ? stRamps.filter((r) => getNewMexicoLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [stRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of newMexicoLakes) map[l.id] = stRamps.filter((r) => getNewMexicoLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [stRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of stRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [stRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? stRamps.filter(r => r.city?.trim() === selectedCity) : stRamps;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many boat ramps are in New Mexico?", acceptedAnswer: { "@type": "Answer", text: `There are ${stRamps.length} boat ramps in New Mexico. RampSeeker has mapped every public boat launch across the state.` } },
          { "@type": "Question", name: "Are boat ramps in New Mexico free?", acceptedAnswer: { "@type": "Answer", text: "Many boat ramps in New Mexico are free, especially those managed by state parks or the Army Corps of Engineers. Some may charge a launch fee." } },
          { "@type": "Question", name: "How do I find boat ramps near me in New Mexico?", acceptedAnswer: { "@type": "Answer", text: `Use RampSeeker to browse all ${stRamps.length} boat ramps in New Mexico by city. Each listing includes a map and directions.` } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">New Mexico Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in New Mexico</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stRamps.length}+ boat ramps across {newMexicoLakes.length} lakes and waterways. Desert reservoir boating, Elephant Butte, Navajo Lake fishing.</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/new-mexico/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "New Mexico"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
                {r.amenities && r.amenities.length > 0 && (<div className="flex flex-wrap gap-1 mt-2">{r.amenities.slice(0, 3).map((a) => (<span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>))}</div>)}
                <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">New Mexico Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {newMexicoLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/new-mexico/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between"><h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3><span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span></div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">{l.acres > 0 && <span>{l.acres.toLocaleString()} acres</span>}<span>{l.maxDepth} ft deep</span></div>
            </Link>
          ))}
        </div>
      </section>

      {cityMap.length > 0 && (<section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => (<button key={city} onClick={() => { setSelectedCity(city === selectedCity ? null : city); document.getElementById('ramp-list')?.scrollIntoView({ behavior: 'smooth' }); }} className={`text-left bg-white border rounded-lg p-3 hover:border-water hover:bg-blue-50 transition cursor-pointer ${selectedCity === city ? 'border-water bg-blue-50 ring-2 ring-water' : 'border-gray-200'}`}><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></button>))}</div></section>)}

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {stRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="New Mexico" /></div>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">New Mexico Boating FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in New Mexico?", a: `RampSeeker lists ${stRamps.length}+ boat ramps across New Mexico.` },
            { q: "Is RampSeeker free?", a: "Yes, completely free. No login, no account, no fees." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-new-mexico"} />
      <CletusAd /></div>
    </div>
  );
}
