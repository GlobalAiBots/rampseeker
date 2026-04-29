"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { californiaLakes, getCaliforniaLakeForRamp } from "@/data/california-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function CaliforniaPage() {
  const caRamps = useMemo(() => unified.filter((r) => r.state === "CA"), []);

  const featuredLake = useMemo(() => {
    let best = californiaLakes.find((l) => l.id === "clear-lake") || californiaLakes[0]; let bestCount = 0;
    for (const l of californiaLakes) {
      const count = caRamps.filter((r) => getCaliforniaLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [caRamps]);
  const featuredRamps = useMemo(() => featuredLake ? caRamps.filter((r) => getCaliforniaLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [caRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of californiaLakes) map[l.id] = caRamps.filter((r) => getCaliforniaLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [caRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["california"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? caRamps.filter(r => r.city?.trim() === selectedCity) : caRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in California?", a: "Most state-managed reservoirs charge $10-25 daily launch fees. State Parks annual passes cover unlimited launches at state-managed sites. Federal launches at Lake Shasta and Lake Mead have separate fee structures. Coastal harbors are typically free but may charge transient slip fees. Lake Tahoe basin requires invasive species inspection ($35-75 decontamination fee for out-of-basin boats)." },
    { q: "What's the best fishing on a California boat ramp?", a: "Trophy largemouth bass on Castaic, Pyramid, and Diamond Valley year-round. Kokanee on Lake Tahoe and Don Pedro summer. Striped bass and sturgeon in the Delta fall through spring. Albacore tuna offshore from Morro Bay and San Diego summer. Lake trout (mackinaw) on Tahoe year-round. King salmon on the Sacramento River and Klamath River fall." },
    { q: "Do I need a fishing license to fish from my boat in California?", a: "Yes, anyone 16 or older needs a California sport fishing license. Saltwater south of Point Arguello requires an additional Ocean Enhancement Validation. Striped bass and sturgeon in the Delta require a Bay Delta Stamp. Inland trout fishing requires a separate endorsement. All issued through CDFW." },
    { q: "How do California's drought years affect boat ramp access?", a: "Major reservoirs — Shasta, Folsom, Oroville, New Melones — drop 50-150+ feet during drought cycles, closing or restricting many ramps and forcing use of low-water launch sites. The Department of Water Resources publishes weekly reservoir levels. Check current conditions before driving out, especially in late summer of dry years." },
    { q: "What's the invasive species inspection process at California boat ramps?", a: "Quagga and zebra mussel inspections are mandatory at most major reservoirs and required at Lake Tahoe. Boats arriving from outside the Tahoe basin must pass inspection before launch; out-of-basin boats may require hot-wash decontamination ($35-75 fee). Plan for 30-60 minutes during peak periods. Drain all water, remove plants, and dry the hull before transporting between water bodies." },
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
        headline: "Where to Launch in California: Boating Season, Permits, and Local Rules",
        description: "California boating guide covering the Pacific coast, Sacramento-San Joaquin Delta, Sierra Nevada reservoirs, Lake Tahoe, Southern California reservoirs, and the desert/Colorado/Salton corridor — plus drought-driven reservoir level conditions and CDFW licensing rules including Tahoe invasive species protocol.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/california" },
        articleSection: "Boating",
        keywords: ["california boat ramps", "sacramento delta launches", "lake tahoe boat ramp", "lake shasta launches", "castaic lake bass", "morro bay tuna", "california fishing license", "tahoe invasive species inspection"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">California Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in California</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{caRamps.length}+ boat ramps across {californiaLakes.length} major waterways. Pacific coast, Sacramento Delta, Sierra reservoirs, Lake Tahoe, and the Southern California bass chain.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">California has 812 public boat ramps spanning more boating geography than any other state &mdash; 840 miles of Pacific coastline, the 1,100-square-mile Sacramento-San Joaquin Delta, glacial reservoirs in the Sierra Nevada, alpine lakes at Tahoe and June, desert reservoirs east of the Cascades, and the salt-stratified Salton Sea. Whether you&apos;re launching for albacore offshore from Morro Bay, striped bass in the Delta, lake trout at Tahoe, bass on Lake Shasta, or kokanee at Don Pedro, the directory below shows ramps with parking, fee details, water-level advisories, and amenity verifications from state, federal, and county sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = caRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = caRamps.length > 0 ? [caRamps.reduce((s, r) => s + r.latitude, 0) / caRamps.length, caRamps.reduce((s, r) => s + r.longitude, 0) / caRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={6} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/california/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "California"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">California Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {californiaLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/california/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = `california-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {caRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="California" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in California</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> California requires a Boater Card for anyone born on or after January 1, 1985.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Drought reservoir levels swing dramatically &mdash; check Department of Water Resources weekly readings before driving out.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Lake Tahoe enforces strict invasive species inspection &mdash; out-of-basin boats may require hot-wash decontamination.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Pacific coastal afternoon winds build fast &mdash; most experienced boaters are off the water by 2 PM.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in California</h2>
          <p>California&apos;s boating geography splits into six distinct zones, each with its own season and target species. The Pacific coast from Crescent City to San Diego serves saltwater anglers chasing tuna, yellowtail, calico bass, halibut, and rockfish, with major ramp clusters at Eureka, Bodega Bay, San Francisco Bay, Monterey, Morro Bay, Channel Islands, Long Beach, and Mission Bay. The Sacramento-San Joaquin Delta is its own ecosystem &mdash; 1,100 square miles of interconnected sloughs, channels, and back-bays that hold striped bass, sturgeon, largemouth, and migratory salmon. Sierra Nevada reservoirs &mdash; Shasta, Oroville, Folsom, Don Pedro, New Melones &mdash; anchor inland bass tournament fishing nationally, with kokanee and trout layered into the cold-water mix. Lake Tahoe, Donner, and June Lake offer alpine fishing for mackinaw, kokanee, and rainbow trout in the cleanest water in the lower 48. Southern California&apos;s reservoir systems &mdash; Pyramid, Castaic, Casitas, Diamond Valley &mdash; produce world-record-class largemouth bass thanks to a year-round growing season and stocked threadfin shad. The Colorado River corridor and the Salton Sea round out the desert boating scene, with the Salton Sea uniquely brackish and ecologically fragile after decades of evaporation.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in California</h2>
          <p>California&apos;s coastal and southern reservoir boating runs year-round, but the inland and Sierra reservoirs swing dramatically with snowpack and water-level fluctuations. Drought years close or restrict ramp access at major reservoirs &mdash; Shasta, Folsom, and New Melones have all dropped 100+ feet from full pool in recent dry cycles, exposing ramps and forcing low-water launch sites. The California Department of Water Resources publishes current reservoir levels weekly. Pacific coastal conditions are dominated by the afternoon thermal wind cycle: most days produce glass-calm mornings followed by 15-25 knot northwest winds by 2 PM, especially north of Point Conception. Most experienced California boaters launch at sunrise and are off the water by early afternoon. Tide ranges run 4-6 feet on the central coast, smaller in Southern California. The Delta has its own tidal influence pushing 30+ miles inland from the Bay; understanding tide direction matters as much as wind there. Sierra lakes ice out from late April through early June depending on elevation, and Lake Tahoe rarely freezes except in shallow bays &mdash; making winter trout fishing accessible for hardy anglers.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in California</h2>
          <p>All motorized vessels in California must carry current state registration through DMV, valid for two years. Anyone born on or after January 1, 1985, must hold a California Boater Card &mdash; the age cutoff phases higher each year and now covers most adult operators. A California sport fishing license is required for anyone 16 or older, with separate Ocean Enhancement Validation for saltwater south of Point Arguello and a Bay Delta Stamp for striped bass and sturgeon in the Delta. Trout fishing requires a separate Inland Trout endorsement. Children under 13 must wear a Coast Guard-approved life jacket on any vessel under 26 feet under way. California&apos;s invasive species program is strict: quagga and zebra mussel inspections are mandatory at most major reservoirs, with Lake Tahoe enforcing the country&apos;s most rigorous decontamination protocol &mdash; boats arriving from outside the Tahoe basin must be inspected and may require hot-wash decontamination ($35-75 fee). Allow 30-60 minutes for inspection during peak periods. Many state reservoirs charge daily launch fees ($10-25); annual passes through the Department of Parks and Recreation cover most state-managed sites.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">California Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-california"} />
      <CletusAd /></div>
    </div>
  );
}
