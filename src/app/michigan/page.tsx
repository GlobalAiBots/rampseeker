"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { michiganLakes, getMichiganLakeForRamp } from "@/data/michigan-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function MichiganPage() {
  const miRamps = useMemo(() => unified.filter((r) => r.state === "MI"), []);

  const featuredLake = useMemo(() => {
    let best = michiganLakes.find((l) => l.id === "lake-michigan") || michiganLakes[0]; let bestCount = 0;
    for (const l of michiganLakes) {
      const count = miRamps.filter((r) => getMichiganLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [miRamps]);
  const featuredRamps = useMemo(() => featuredLake ? miRamps.filter((r) => getMichiganLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [miRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of michiganLakes) map[l.id] = miRamps.filter((r) => getMichiganLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [miRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["michigan"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? miRamps.filter(r => r.city?.trim() === selectedCity) : miRamps;

  const faqItems = [
    { q: "How many boat ramps are in Michigan?", a: `RampSeeker lists ${miRamps.length}+ boat ramps across Michigan, covering all four Great Lakes and 11,000+ inland lakes.` },
    { q: "What are the best fishing lakes in Michigan?", a: "Michigan offers world-class walleye fishing on Lake St. Clair and Saginaw Bay, trophy salmon and steelhead on Lake Michigan, and excellent bass fishing on Torch Lake, Houghton Lake, and Burt Lake." },
    { q: "Do I need a boating license in Michigan?", a: "Anyone born after December 31, 1978 must carry a Michigan Boater Safety Certificate. All motorized boats must be registered with the Michigan Secretary of State." },
    { q: "What fish can I catch in Michigan?", a: "Michigan offers incredible variety: walleye, yellow perch, smallmouth and largemouth bass, northern pike, musky, lake trout, steelhead, Chinook and Coho salmon, panfish, and more across Great Lakes and inland waters." },
  ];

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Where to Launch in Michigan: Boating Season, Permits, and Local Rules",
        description: "Michigan boating guide covering Great Lakes and inland-lake launch options, season and weather conditions, and state registration and licensing rules.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/michigan" },
        articleSection: "Boating",
        keywords: ["michigan boat ramps", "lake michigan launches", "lake superior boat ramps", "michigan boating season", "michigan recreational passport", "michigan boat registration"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Michigan Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Michigan</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{miRamps.length}+ boat ramps across {michiganLakes.length} major lakes and Great Lakes shoreline. The Great Lakes State &mdash; #3 in registered boats with 11,000+ inland lakes.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Michigan offers {miRamps.length.toLocaleString()}+ public boat ramps across the Great Lakes coastline, inland lakes, and major rivers &mdash; from Lake Superior in the Upper Peninsula to walleye and salmon waters across the Lower Peninsula. Use the map and directory below to find ramps with parking, courtesy docks, and amenity details verified from state sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = miRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = miRamps.length > 0 ? [miRamps.reduce((s, r) => s + r.latitude, 0) / miRamps.length, miRamps.reduce((s, r) => s + r.longitude, 0) / miRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/michigan/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Michigan"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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

      {/* 5. LAKES & GREAT LAKES */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Michigan Lakes &amp; Great Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {michiganLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/michigan/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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

      {/* 6. CITIES SUB-GRID */}
      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-"); return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY (RampList continues the directory experience) */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {miRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Michigan" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Michigan</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Michigan requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in Michigan.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in Michigan.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Michigan</h2>
          <p>Michigan&apos;s 2,623 boat ramps span the Great Lakes coastline, inland lakes, and major rivers. Lake Michigan alone has 623 named ramps, anchored by launches at Suttons Bay, Sturgeon Bay, and Saugatuck. Lake Superior offers 284 ramps for Upper Peninsula anglers, while Houghton Lake and Burt Lake serve north-central Michigan boaters. Whether you&apos;re targeting walleye on Saginaw Bay, salmon on Lake Michigan, or smallmouth on Burt Lake, the directory above shows ramps with parking, courtesy docks, and amenity details verified from state sources.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Michigan</h2>
          <p>Boating season in Michigan typically runs May through October on inland lakes, with Great Lakes harbors ice-free roughly mid-April to late November depending on latitude. Storms develop fast on the Great Lakes &mdash; check NOAA marine forecasts before launching, especially on Lake Michigan and Lake Superior where 6-foot seas can build within hours. State DNR ramps post real-time water-level advisories during drought years.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Michigan</h2>
          <p>All motorized vessels in Michigan must carry current state registration. The state requires invasive species inspection at many launches &mdash; particularly on Great Lakes ports &mdash; and aquatic plant material must be removed before transport between water bodies. Children under 6 must wear a life jacket on any boat under 26 feet under way. Michigan&apos;s Recreational Passport ($14 annually for residents) covers entry to state-park ramps; non-state-park public ramps are typically free.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Michigan Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-michigan"} />
      <CletusAd /></div>
    </div>
  );
}
