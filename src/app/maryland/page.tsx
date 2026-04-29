"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { marylandLakes, getMarylandLakeForRamp } from "@/data/maryland-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function MarylandPage() {
  const mdRamps = useMemo(() => unified.filter((r) => r.state === "MD"), []);

  const featuredLake = useMemo(() => {
    let best = marylandLakes.find((l) => l.id === "chesapeake-bay-middle") || marylandLakes[0]; let bestCount = 0;
    for (const l of marylandLakes) {
      const count = mdRamps.filter((r) => getMarylandLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [mdRamps]);
  const featuredRamps = useMemo(() => featuredLake ? mdRamps.filter((r) => getMarylandLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [mdRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of marylandLakes) map[l.id] = mdRamps.filter((r) => getMarylandLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [mdRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["maryland"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? mdRamps.filter(r => r.city?.trim() === selectedCity) : mdRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Maryland?", a: "Most state-managed ramps are free with a Maryland fishing license or DNR vehicle pass. Some county ramps charge $5-15 daily. Federal launches at Assateague Island and the C&O Canal have separate fee structures. Ocean City public ramps are free but parking fills fast on summer weekends." },
    { q: "What's the best fishing on a Maryland boat ramp?", a: "Trophy striped bass on the upper Bay and Susquehanna Flats mid-April through mid-May. White perch and blue crabs Bay-wide summer. Fall striper run September through November. Snakeheads and largemouth on the Potomac year-round. Walleye and trout on Deep Creek Lake. Offshore tuna and white marlin from Ocean City June through September." },
    { q: "Do I need a fishing license to fish from my boat in Maryland?", a: "Yes, anyone 16 or older needs a Maryland fishing license. Tidal waters (Chesapeake Bay and tributaries to head of tide) require a tidal or Chesapeake Bay Sport Fishing license; non-tidal waters require a separate freshwater license. Issued through Maryland DNR." },
    { q: "What's the striped bass season in Maryland?", a: "Trophy spring season typically runs mid-April through mid-May for fish 28 inches and above. Summer slot season follows with smaller fish. Fall run September through November. Winter catch-and-release continues on the Susquehanna Flats. Maryland DNR publishes exact dates and slot limits annually — check before each trip because rules change yearly." },
    { q: "Are Maryland boat ramps crowded on weekends?", a: "Yes, particularly Sandy Point State Park (Bay Bridge area), Solomons Island, Ocean City public ramps, and Deep Creek Lake during summer weekends. Trophy striper season ramps fill by 5 AM. Plan to arrive at sunrise on prime weekends. RampSeeker lists alternates within 30 minutes if your first choice is full." },
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
        headline: "Where to Launch in Maryland: Boating Season, Permits, and Local Rules",
        description: "Maryland boating guide covering Chesapeake Bay and tributaries, western Maryland highlands, Atlantic offshore from Ocean City, and the Potomac River fishery — plus striped bass cycle by season and tidal vs non-tidal licensing rules.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/maryland" },
        articleSection: "Boating",
        keywords: ["maryland boat ramps", "chesapeake bay launches", "susquehanna flats striped bass", "ocean city boat ramp", "deep creek lake", "potomac river ramps", "maryland fishing license"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Maryland Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Maryland</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{mdRamps.length}+ boat ramps across {marylandLakes.length} major waterways. Chesapeake Bay tributaries, the Potomac River, western Maryland lakes, and Ocean City Atlantic access.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Maryland has 542 public boat ramps &mdash; and over half of them sit on the Chesapeake Bay or its tributaries. The Bay shapes Maryland boating in a way no other body of water shapes any other state. Whether you&apos;re chasing striped bass on the Susquehanna Flats, crabbing in Eastern Shore creeks, casting for snakeheads on the Potomac, or running offshore from Ocean City for tuna and marlin, the directory below shows ramps with parking, tide considerations, and amenity verifications from state, county, and federal sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = mdRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = mdRamps.length > 0 ? [mdRamps.reduce((s, r) => s + r.latitude, 0) / mdRamps.length, mdRamps.reduce((s, r) => s + r.longitude, 0) / mdRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/maryland/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Maryland"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Maryland Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {marylandLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/maryland/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = `maryland-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {mdRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Maryland" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Maryland</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Maryland requires a state-approved Boating Safety Certificate for anyone born after July 1, 1972.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Tidal and non-tidal fishing licenses are separate &mdash; buy both if you fish both.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Striped bass slot limits and seasonal closures change yearly &mdash; check Maryland DNR before every trip.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Wind matters more than tide on the open Bay &mdash; northwest blows over 15 knots build dangerous chop quickly.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Maryland</h2>
          <p>Maryland boating divides cleanly along three water systems. The Chesapeake Bay and its tributaries dominate &mdash; the Susquehanna Flats at the Bay&apos;s head, the Magothy and Severn rivers near Annapolis, the Choptank and Chester on the Eastern Shore, the Potomac running the southern border, the Patuxent winding through Anne Arundel and Calvert counties. Striped bass, white perch, and blue crabs are the universal targets across the Bay system. Western Maryland&apos;s freshwater lakes &mdash; Deep Creek Lake, Rocky Gap, Savage River Reservoir &mdash; sit in the Allegheny highlands and offer cold-water bass, walleye, and trout fishing entirely unlike the Bay. The Atlantic side at Ocean City and Assateague provides offshore access to canyons holding tuna, mahi, and white marlin during summer migrations, plus inshore flats for flounder and stripers. The Potomac River from the D.C. line down to Point Lookout is a fishery in its own right &mdash; largemouth and smallmouth bass, snakeheads, blue catfish, and seasonal striped bass runs that draw anglers from four states.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Maryland</h2>
          <p>Maryland&apos;s productive seasons are tightly tied to the Bay&apos;s striped bass cycle. The trophy spring season runs roughly mid-April through mid-May, with charter and private boats targeting post-spawn rockfish above 28 inches in the upper Bay. Summer fishing transitions to schoolie stripers, white perch, and bluefish, with crabbing peaking July through September. Fall brings the fall run &mdash; striper schools busting bait on the surface, often visible from miles away. Winter slows but doesn&apos;t stop: catch-and-release striper fishing continues into December on the Susquehanna Flats, and ice fishing on Deep Creek Lake delivers walleye and yellow perch when the lake freezes hard. Wind is the dominant Bay weather factor: northwest blows over 15 knots build dangerous chop on the open Bay, and crossings between the western and eastern shores demand careful timing. NOAA marine forecasts and tide predictions are essential &mdash; Bay tides run only 1-2 feet but currents at the Bay Bridge and Tangier Sound get strong.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Maryland</h2>
          <p>All motorized vessels in Maryland must carry current state registration, valid for two years through the Department of Natural Resources. Anyone born after July 1, 1972, must carry a state-approved Boating Safety Certificate. Maryland fishing licenses come in distinct tidal (Chesapeake and tributaries to the head of tide) and non-tidal (everything above) categories; buy whichever matches where you fish, or both for full coverage. A Chesapeake Bay Sport Fishing License covers tidal waters; a separate freshwater license covers non-tidal. Striped bass regulations are strict and change yearly &mdash; slot limits, seasonal closures, and gear restrictions vary by season and sub-region of the Bay. Crabbing requires a separate license above small recreational thresholds. Children under 13 must wear a Coast Guard-approved life jacket on any vessel under 21 feet under way. Ocean City inlet has its own no-anchor zones and traffic patterns enforced by the Coast Guard during peak summer.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Maryland Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-maryland"} />
      <CletusAd /></div>
    </div>
  );
}
