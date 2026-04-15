"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { oregonLakes, getOregonLakeForRamp } from "@/data/oregon-lakes";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";

export default function OregonPage() {
  const orRamps = useMemo(() => unified.filter((r) => r.state === "OR"), []);

  const featuredLake = useMemo(() => {
    let best = oregonLakes.find((l) => l.id === "columbia-river-or") || oregonLakes[0]; let bestCount = 0;
    for (const l of oregonLakes) {
      const count = orRamps.filter((r) => getOregonLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [orRamps]);
  const featuredRamps = useMemo(() => featuredLake ? orRamps.filter((r) => getOregonLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [orRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of oregonLakes) map[l.id] = orRamps.filter((r) => getOregonLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [orRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of orRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [orRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? orRamps.filter(r => r.city?.trim() === selectedCity) : orRamps;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many boat ramps are in Oregon?", acceptedAnswer: { "@type": "Answer", text: `There are ${orRamps.length} boat ramps in Oregon. RampSeeker has mapped every public boat launch across the state.` } },
          { "@type": "Question", name: "Are boat ramps in Oregon free?", acceptedAnswer: { "@type": "Answer", text: "Many boat ramps in Oregon are free, especially those managed by state parks or the Army Corps of Engineers. Some may charge a launch fee." } },
          { "@type": "Question", name: "How do I find boat ramps near me in Oregon?", acceptedAnswer: { "@type": "Answer", text: `Use RampSeeker to browse all ${orRamps.length} boat ramps in Oregon by city. Each listing includes a map and directions.` } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Oregon Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Oregon</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{orRamps.length}+ boat ramps across {oregonLakes.length} lakes and waterways. World-class salmon and steelhead rivers, Pacific coast fishing, Crater Lake — deepest in the US.</p>
      </section>

      {/* State intro */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Boating in Oregon</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Oregon offers {orRamps.length.toLocaleString()}+ public boat ramps across its waterways. From the Columbia River, Crater Lake, and the Oregon coast, the state provides excellent access for boaters, anglers, and kayakers. Popular catches include salmon, steelhead, and bass. <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">Learn how to launch safely</Link>.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Oregon</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Oregon requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in Oregon.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in Oregon.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/oregon/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Oregon"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
                {r.amenities && r.amenities.length > 0 && (<div className="flex flex-wrap gap-1 mt-2">{r.amenities.slice(0, 3).map((a) => (<span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>))}</div>)}
                <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Oregon Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {oregonLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/oregon/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between"><h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3><span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span></div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">{l.acres > 0 && <span>{l.acres.toLocaleString()} acres</span>}<span>{l.maxDepth} ft deep</span></div>
            </Link>
          ))}
        </div>
      </section>

      {cityMap.length > 0 && (<section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = city.toLowerCase().replace(/s+/g, "-"); return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div></section>)}

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {orRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Oregon" /></div>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Oregon Boating FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in Oregon?", a: `RampSeeker lists ${orRamps.length}+ boat ramps across Oregon, from the Columbia River to the Pacific Coast.` },
            { q: "What are the best fishing spots in Oregon?", a: "The Columbia River is world-famous for salmon and sturgeon fishing. The Deschutes River offers premier fly fishing for trout and steelhead. The Rogue River is legendary for steelhead runs. The Pacific coast provides excellent halibut and lingcod fishing." },
            { q: "Do I need a boating license in Oregon?", a: "Oregon requires a Boater Education Card for all motorized vessel operators born on or after January 1, 1988. All motorized boats must be registered with the Oregon State Marine Board." },
          
            { q: "Do I need a boating license in Oregon?", a: "Oregon requires a boating safety education certificate for boat operators. Check with the state's wildlife agency for specific age and horsepower requirements." },
            { q: "When is the best time to boat in Oregon?", a: "Peak boating season in Oregon runs from May through October, but many waterways are accessible year-round. Spring and fall offer less crowded conditions and excellent fishing." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-oregon"} />
      <CletusAd /></div>
    </div>
  );
}
