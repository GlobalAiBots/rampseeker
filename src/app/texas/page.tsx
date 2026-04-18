"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { texasLakes, getTexasLakeForRamp } from "@/data/texas-lakes";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many boat ramps are in Texas?", acceptedAnswer: { "@type": "Answer", text: `There are ${txRamps.length} boat ramps in Texas. RampSeeker has mapped every public boat launch across the state.` } },
          { "@type": "Question", name: "Are boat ramps in Texas free?", acceptedAnswer: { "@type": "Answer", text: "Many boat ramps in Texas are free, especially those managed by state parks or the Army Corps of Engineers. Some may charge a launch fee." } },
          { "@type": "Question", name: "How do I find boat ramps near me in Texas?", acceptedAnswer: { "@type": "Answer", text: `Use RampSeeker to browse all ${txRamps.length} boat ramps in Texas by city. Each listing includes a map and directions.` } },
          { "@type": "Question", name: "Are boat ramps free?", acceptedAnswer: { "@type": "Answer", text: "Many public boat ramps are free, especially those run by state parks, Army Corps of Engineers, or county agencies. Some charge $5-15 per launch or require an annual pass." } },
          { "@type": "Question", name: "Do you need a permit to use a boat ramp?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps do not require a special permit. You need a valid boat registration and in some states a launch pass. Check local regulations before launching." } },
          { "@type": "Question", name: "What time do boat ramps open?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps are open 24 hours. Some state park ramps follow park hours, typically dawn to dusk. Pay ramps may have limited hours for fee collection." } },
          { "@type": "Question", name: "Can you launch a kayak at a boat ramp?", acceptedAnswer: { "@type": "Answer", text: "Yes, most boat ramps accommodate kayaks and canoes. Some ramps have dedicated kayak launch areas. Smaller paddlecraft can also use informal put-ins and shoreline access points." } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Texas Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Texas</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{txRamps.length}+ boat ramps across {texasLakes.length} major lakes. GPS coordinates, amenities, directions.</p>
      </section>

      

      {/* State intro */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Boating in Texas</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Texas offers {txRamps.length.toLocaleString()}+ public boat ramps across its waterways. From Lake Travis, Sam Rayburn, and the Gulf Coast, the state provides excellent access for boaters, anglers, and kayakers. Popular catches include bass, catfish, and redfish. <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">Learn how to launch safely</Link>.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Texas</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Texas requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in Texas.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in Texas.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
        <GearRecommendation section="launch-gear" />
      </section>

      {/* State Map */}
      {(() => {
        const mapPins = txRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = txRamps.length > 0 ? [txRamps.reduce((s, r) => s + r.latitude, 0) / txRamps.length, txRamps.reduce((s, r) => s + r.longitude, 0) / txRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

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
      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-texas"} />
      <CletusAd /></div>
    </div>
  );
}
