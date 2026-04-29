"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { newYorkLakes, getNewYorkLakeForRamp } from "@/data/new-york-lakes";
import { isLikelyNonUS } from "@/lib/non-us-filter";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

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
    for (const r of nyRamps) {
      const c = r.city?.trim();
      if (!c || c.length <= 1) continue;
      if (isLikelyNonUS("NY", r.latitude, r.longitude, c)) continue;
      m[c] = (m[c] || 0) + 1;
    }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [nyRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? nyRamps.filter(r => r.city?.trim() === selectedCity) : nyRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in New York?", a: "Most state-managed and county boat ramps are free. Some Adirondack and Catskill ramps require a free state pass for parking — register through the DEC website. Federal launches on the Hudson and Lake Champlain may charge daily or annual fees." },
    { q: "What's the best fishing on a New York boat ramp?", a: "It depends on the region. Striped bass on the Hudson estuary spring and fall, lake trout and salmon in the Finger Lakes year-round, walleye on Oneida Lake, smallmouth on Lake George, king salmon on Lake Ontario tributaries September through November." },
    { q: "Do I need a fishing license to fish from my boat in New York?", a: "Yes, anyone 16 or older needs a New York freshwater fishing license. Saltwater fishing requires the free Marine Registry separate from the freshwater license. Both are issued through the DEC." },
    { q: "When does the boating season open in New York?", a: "Inland lakes are typically launchable mid-April through late October. Adirondack lakes ice out 2-3 weeks later than southern New York. Long Island and Hudson estuary access stays year-round for hardy anglers." },
    { q: "Are New York boat ramps crowded on weekends?", a: "Yes, particularly Saratoga Lake, Oneida Lake, Lake George, and Henderson Harbor on summer weekends. Plan to arrive at sunrise on holiday weekends. RampSeeker's directory includes alternates within 30 minutes if your first choice is full." },
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
        headline: "Where to Launch in New York: Boating Season, Permits, and Local Rules",
        description: "New York boating guide covering Finger Lakes, Adirondacks, Long Island estuaries, Great Lakes harbors, and Hudson/Mohawk corridors — plus seasonal conditions and state registration rules.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/new-york" },
        articleSection: "Boating",
        keywords: ["new york boat ramps", "finger lakes launches", "adirondack boat ramps", "lake george boating", "lake ontario salmon ramps", "hudson river boat launches", "new york fishing license"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">New York Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in New York</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{nyRamps.length}+ boat ramps across {newYorkLakes.length} lakes and waterways. Adirondacks paradise, Finger Lakes fishing, Great Lakes salmon runs, and Long Island striped bass.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">New York has 1,564 public boat ramps spanning the Atlantic coastline, the Finger Lakes, the Adirondack and Catskill regions, the Hudson and Mohawk rivers, and Lakes Erie and Ontario. Whether you&apos;re launching for striped bass on the Hudson, lake trout on Lake George, or smallmouth on Oneida Lake, the directory below shows ramps with parking, courtesy docks, and amenity details verified from state and federal sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = nyRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = nyRamps.length > 0 ? [nyRamps.reduce((s, r) => s + r.latitude, 0) / nyRamps.length, nyRamps.reduce((s, r) => s + r.longitude, 0) / nyRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
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
                <p className="text-gray-500 text-sm mt-1">{r.city || "New York"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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

      {/* 5. LAKES & WATERWAYS */}
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

      {/* 6. CITIES SUB-GRID */}
      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-"); return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {nyRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="New York" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in New York</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> New York requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in New York.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in New York.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in New York</h2>
          <p>New York&apos;s boating geography splits into five distinct regions, each with its own character. The Finger Lakes &mdash; Cayuga, Seneca, Keuka, Canandaigua &mdash; anchor central New York with deepwater lakes ideal for lake trout, smallmouth bass, and landlocked salmon. Lake George and the broader Adirondack region serve northern New York with cold, clear lakes and remote launches accessible by gravel road. Long Island&apos;s south shore and the Hudson estuary offer saltwater and brackish-water access for striped bass, fluke, and bluefish. Lake Erie and Lake Ontario harbors deliver Great Lakes-class fishing for walleye, king salmon, and steelhead. The Mohawk and Hudson river corridors carry boaters from the Erie Canal system through historic working waterways. Ramps at Saratoga Lake, Oneida Lake, Canandaigua Lake, and Henderson Harbor see the highest weekend traffic statewide.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in New York</h2>
          <p>Boating season in New York runs roughly mid-April through late October on inland lakes, with northern Adirondack lakes opening 2-3 weeks later due to ice-out. Long Island and Hudson estuary access stays effectively year-round, though winter conditions narrow practical use to October through April for cold-water anglers only. Weather changes fast on Lake Erie and Lake Ontario &mdash; both produce 6-8 foot seas with under three hours of warning when fronts move through, and Coast Guard rescues spike on summer afternoons when storms build over the lakes. The Hudson develops its own current and tide patterns; the lower river south of Albany is tidal and reverses with each flood. State DEC posts real-time water-level advisories during drought years, particularly on Finger Lakes feeder waters. Check NOAA marine forecasts before launching on any Great Lakes harbor or coastal estuary.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in New York</h2>
          <p>All motorized vessels in New York must carry current state registration, valid for three years and renewable through the DMV. Boats over 18 feet require navigation lights, a sound-producing device, and visual distress signals &mdash; Coast Guard Auxiliary inspections are free and recommended annually. New York requires a Boating Safety Certificate for operators born after January 1, 1978; this is being phased in across all ages by 2026, so confirm current rules before launching. A New York fishing license is required for anyone 16 or older fishing from any boat or shore in fresh water; saltwater fishing requires the free Marine Registry. Children under 12 must wear a Coast Guard-approved life jacket on any vessel under 65 feet under way. Some Adirondack and Catskill ramps require a free state pass for parking &mdash; check the launch listing before driving out.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">New York Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
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
