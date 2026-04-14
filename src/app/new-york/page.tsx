"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { newYorkLakes, getNewYorkLakeForRamp } from "@/data/new-york-lakes";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";

export default function NewYorkPage() {
  const nyRamps = useMemo(() => unified.filter((r) => r.state === "NY"), []);

  const featuredLake = useMemo(() => {
    let best = newYorkLakes.find((l) => l.id === "lake-george") || newYorkLakes[0]; let bestCount = 0;
    for (const l of newYorkLakes) {
      const count = nyRamps.filter((r) => getNewYorkLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [nyRamps]);
  const featuredRamps = useMemo(() => featuredLake ? nyRamps.filter((r) => getNewYorkLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [nyRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of newYorkLakes) map[l.id] = nyRamps.filter((r) => getNewYorkLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [nyRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of nyRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [nyRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? nyRamps.filter(r => r.city?.trim() === selectedCity) : nyRamps;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many boat ramps are in New York?", acceptedAnswer: { "@type": "Answer", text: `There are ${nyRamps.length} boat ramps in New York. RampSeeker has mapped every public boat launch across the state.` } },
          { "@type": "Question", name: "Are boat ramps in New York free?", acceptedAnswer: { "@type": "Answer", text: "Many boat ramps in New York are free, especially those managed by state parks or the Army Corps of Engineers. Some may charge a launch fee." } },
          { "@type": "Question", name: "How do I find boat ramps near me in New York?", acceptedAnswer: { "@type": "Answer", text: `Use RampSeeker to browse all ${nyRamps.length} boat ramps in New York by city. Each listing includes a map and directions.` } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">New York Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in New York</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{nyRamps.length}+ boat ramps across {newYorkLakes.length} lakes and waterways. Adirondacks paradise, Finger Lakes fishing, Great Lakes salmon runs, and Long Island striped bass.</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/new-york/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "New York"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">New York Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {newYorkLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/new-york/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {nyRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="New York" /></div>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">New York Boating FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in New York?", a: `RampSeeker lists ${nyRamps.length}+ boat ramps across New York, from the Adirondacks to Long Island Sound.` },
            { q: "What are the best fishing lakes in New York?", a: "Lake George is the crown jewel of the Adirondacks. Oneida Lake is NY's premier walleye fishery. The Finger Lakes offer world-class lake trout and salmon. Lake Ontario has legendary salmon runs, and the St. Lawrence River is a musky paradise." },
            { q: "Do I need a boating license in New York?", a: "Anyone born on or after May 1, 1996 must complete a NYS Boater Safety Course. All motorized vessels must be registered with the NY DMV." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-new-york"} />
      <CletusAd /></div>
    </div>
  );
}
