"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { floridaLakes, getFloridaLakeForRamp } from "@/data/florida-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function FloridaPage() {
  const flRamps = useMemo(() => unified.filter((r) => r.state === "FL"), []);

  const featuredLake = useMemo(() => {
    let best = floridaLakes.find((l) => l.id === "tampa-bay") || floridaLakes[0]; let bestCount = 0;
    for (const l of floridaLakes) {
      const count = flRamps.filter((r) => getFloridaLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [flRamps]);
  const featuredRamps = useMemo(() => featuredLake ? flRamps.filter((r) => getFloridaLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [flRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of floridaLakes) map[l.id] = flRamps.filter((r) => getFloridaLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [flRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["florida"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? flRamps.filter(r => r.city?.trim() === selectedCity) : flRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Florida?", a: "Most state and county ramps are free, though Miami-Dade, Broward, and the Keys charge daily fees ($10-20) at popular ramps. Florida State Parks charge $4 day-use plus per-vehicle entry. Federal ramps in Everglades National Park and Biscayne National Park have separate fee structures." },
    { q: "What's the best fishing on a Florida boat ramp?", a: "Tarpon at Boca Grande Pass May-June. Snook in the Indian River Lagoon and the Ten Thousand Islands. Redfish on the grass flats from Tampa Bay to Mosquito Lagoon. Largemouth bass on Lake Okeechobee, the Stick Marsh, and the Harris Chain January-April. Bonefish and permit on the Keys flats. Offshore grouper and snapper from Tampa, Destin, and Miami." },
    { q: "Do I need a fishing license to fish from my boat in Florida?", a: "Yes, anyone 16 or older needs a Florida fishing license — separate freshwater and saltwater licenses, both required if you fish both. Snook and tarpon require additional permits during open seasons. Issued through FWC." },
    { q: "When is hurricane season in Florida and how does it affect boat ramps?", a: "Hurricane season runs June 1 through November 30, with peak activity August through October. Named storms close ramps statewide for safety; FWC and county parks post live ramp status during and after storms. Most ramps reopen within 7-14 days after a major storm; some take longer if docks or parking are damaged." },
    { q: "Are Florida boat ramps crowded on weekends?", a: "Yes, particularly Sebastian Inlet, Ponce Inlet, Port Canaveral, Black Point, Haulover, and the Boca Grande area during peak season. Plan to arrive at sunrise on summer weekends and during tarpon and snook season. RampSeeker lists alternates within 30 minutes if your first choice is full." },
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
        headline: "Where to Launch in Florida: Boating Season, Permits, and Local Rules",
        description: "Florida boating guide covering Atlantic and Gulf coasts, the Indian River Lagoon, Florida Keys flats, north Florida spring-fed rivers, and the central Florida bass chain — plus year-round species seasons, hurricane impacts, and Florida-specific permits including manatee zones and snook tags.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/florida" },
        articleSection: "Boating",
        keywords: ["florida boat ramps", "indian river lagoon launches", "florida keys boat ramp", "lake okeechobee ramps", "boca grande tarpon", "florida snook permit", "manatee zones florida"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Florida Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Florida</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{flRamps.length}+ boat ramps across {floridaLakes.length} major waterways. Atlantic and Gulf coasts, Indian River Lagoon, Florida Keys, Lake Okeechobee, and the central Florida bass chain.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Florida has 1,195 public boat ramps spanning more coastline than any state in the lower 48 &mdash; Atlantic, Gulf, the Florida Keys, the Indian River Lagoon, the St. Johns and Suwannee rivers, Lake Okeechobee, and the limestone springs of north-central Florida. Whether you&apos;re launching for snook in the Indian River, redfish in the Mosquito Lagoon, largemouth on the Stick Marsh, tarpon in Boca Grande, or grouper offshore from Tampa, the directory below shows ramps with parking, tide considerations, fee details, and amenity verifications from state, county, and federal sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = flRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = flRamps.length > 0 ? [flRamps.reduce((s, r) => s + r.latitude, 0) / flRamps.length, flRamps.reduce((s, r) => s + r.longitude, 0) / flRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/florida/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Florida"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Florida Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {floridaLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/florida/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = `florida-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {flRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Florida" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Florida</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Florida requires all motorized boats to be registered through the county tax collector before launching.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Manatee zones are strictly enforced November through March &mdash; check FWC maps and respect idle/no-entry zones.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Afternoon thunderstorms develop fast in summer &mdash; most experienced boaters are off the water by 2 PM in July and August.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive at sunrise during tarpon and snook season.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Florida</h2>
          <p>Florida&apos;s boating geography breaks into six distinct zones, each with its own species, conditions, and access patterns. The Atlantic coast from Jacksonville to Miami serves saltwater anglers chasing tarpon, snook, redfish, and offshore pelagics, with major ramp clusters at Mayport, Daytona, Ponce Inlet, Port Canaveral, Sebastian Inlet, and Miami&apos;s Black Point Marina. The Indian River Lagoon system &mdash; 156 miles of shallow brackish estuary &mdash; is the country&apos;s most biodiverse fishery and the heartland of inshore fly fishing. The Florida Keys and Florida Bay deliver flats fishing for bonefish and permit, with ramps from Key Largo to Key West. The Gulf coast from Tampa Bay south to Naples and Marco Island runs a more protected pattern with grass-flat redfish and tarpon migrations. North Florida&apos;s spring-fed rivers &mdash; the Suwannee, Santa Fe, Ichetucknee, and Wakulla &mdash; offer crystal-clear paddleboard and kayak launches unlike anywhere else in the country. Inland, Lake Okeechobee, the Stick Marsh, Lake Tohopekaliga, and the Harris Chain anchor largemouth bass tournament fishing nationally. Lake Okeechobee alone has 730 square miles of water and dozens of public ramps.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Florida</h2>
          <p>Florida supports year-round boating across all six zones, but the productive seasons differ dramatically by species and location. Snook season is closed statewide June through August on the Atlantic side and December through February on the Gulf &mdash; both protect spawning aggregations. Tarpon migrations move up the Gulf coast from April through July, peaking in May and June at Boca Grande Pass. Bass fishing on Lake Okeechobee and the central Florida chain peaks January through April when fish are bedding. Hurricane season runs June through November and reshapes ramp access every year &mdash; the South Florida Water Management District and FWC post live ramp closures during and after named storms. Afternoon thunderstorms develop fast in summer, with lightning the leading cause of inland boating fatalities &mdash; most experienced Florida boaters are off the water by 2 PM in July and August. Tide ranges are modest in the Keys (1-2 feet) but significant on the northeast Atlantic coast (5-7 feet at Jacksonville).</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Florida</h2>
          <p>All motorized vessels in Florida must carry current state registration, valid for one year and renewed through the county tax collector. Anyone born after January 1, 1988, must complete a state-approved boating safety course to operate a vessel with 10 or more horsepower. A Florida fishing license is required for anyone 16 or older &mdash; separate freshwater and saltwater licenses, both required if you fish both. A Snook Permit and Tarpon Tag are required for those species during open seasons. Children under 6 must wear a Coast Guard-approved life jacket on any vessel under 26 feet under way. Manatee zones &mdash; slow speed, idle speed, no entry &mdash; are strictly enforced statewide November through March when manatees gather in warm-water refuges; FWC posts maps and fines start at $90 for first violations. Many county and municipal ramps in Miami-Dade, Broward, and the Keys charge daily launch fees ($10-20). Some require resident discount cards available through the county parks department.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Florida Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-florida"} />
      <CletusAd /></div>
    </div>
  );
}
