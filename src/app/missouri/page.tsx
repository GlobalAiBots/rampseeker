"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { missouriLakes, getMissouriLakeForRamp } from "@/data/missouri-lakes";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";

export default function MissouriPage() {
  const moRamps = useMemo(() => unified.filter((r) => r.state === "MO"), []);
  // Pick featured lake: find the one with the most NAMED ramps
  const featuredLake = useMemo(() => {
    let best = missouriLakes[0]; let bestCount = 0;
    for (const l of missouriLakes) {
      const count = moRamps.filter((r) => getMissouriLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [moRamps]);
  const featuredRamps = useMemo(() => featuredLake ? moRamps.filter((r) => getMissouriLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [moRamps, featuredLake]);
  const lakeCounts = useMemo(() => { const m: Record<string, number> = {}; for (const l of missouriLakes) m[l.id] = moRamps.filter((r) => getMissouriLakeForRamp(r.latitude, r.longitude)?.id === l.id).length; return m; }, [moRamps]);
  const cityMap = useMemo(() => { const m: Record<string, number> = {}; for (const r of moRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1]); }, [moRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? moRamps.filter(r => r.city?.trim() === selectedCity) : moRamps;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many boat ramps are in Missouri?", acceptedAnswer: { "@type": "Answer", text: `There are ${moRamps.length} boat ramps in Missouri. RampSeeker has mapped every public boat launch across the state.` } },
          { "@type": "Question", name: "Are boat ramps in Missouri free?", acceptedAnswer: { "@type": "Answer", text: "Many boat ramps in Missouri are free, especially those managed by state parks or the Army Corps of Engineers. Some may charge a launch fee." } },
          { "@type": "Question", name: "How do I find boat ramps near me in Missouri?", acceptedAnswer: { "@type": "Answer", text: `Use RampSeeker to browse all ${moRamps.length} boat ramps in Missouri by city. Each listing includes a map and directions.` } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Missouri Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Missouri</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{moRamps.length}+ boat ramps across {missouriLakes.length} major lakes.</p>
      </section>

      

      {/* State intro */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Boating in Missouri</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Missouri offers {moRamps.length.toLocaleString()}+ public boat ramps across its waterways. From Table Rock Lake, Lake of the Ozarks, and Truman Lake, the state provides excellent access for boaters, anglers, and kayakers. Popular catches include bass, crappie, and catfish. <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">Learn how to launch safely</Link>.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Missouri</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Missouri requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in Missouri.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in Missouri.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* State Map */}
      {(() => {
        const mapPins = moRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = moRamps.length > 0 ? [moRamps.reduce((s, r) => s + r.latitude, 0) / moRamps.length, moRamps.reduce((s, r) => s + r.longitude, 0) / moRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

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
                <p className="text-gray-500 text-sm mt-1">{r.city || "Missouri"}{r.fee ? ` \u00b7 ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-"); return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
      </section>)}

      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {moRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Missouri" /></div>
      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-missouri"} />
      <CletusAd /></div>
    </div>
  );
}
