"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { washingtonLakes, getWashingtonLakeForRamp } from "@/data/washington-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function WashingtonPage() {
  const waRamps = useMemo(() => unified.filter((r) => r.state === "WA"), []);

  const featuredLake = useMemo(() => {
    let best = washingtonLakes.find((l) => l.id === "puget-sound") || washingtonLakes[0]; let bestCount = 0;
    for (const l of washingtonLakes) {
      const count = waRamps.filter((r) => getWashingtonLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [waRamps]);
  const featuredRamps = useMemo(() => featuredLake ? waRamps.filter((r) => getWashingtonLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [waRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of washingtonLakes) map[l.id] = waRamps.filter((r) => getWashingtonLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [waRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["washington"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? waRamps.filter(r => r.city?.trim() === selectedCity) : waRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Washington?", a: "Most state-managed launches require a Discover Pass ($30 annual or $10 daily) for parking. Washington Department of Fish and Wildlife sites also accept the Vehicle Access Pass bundled with hunting/fishing licenses. County and municipal ramps are usually free; tribal launches require tribal permits." },
    { q: "When does the boating season open in Washington?", a: "Puget Sound and Pacific coast support year-round boating with hardy winter crabbers and steelheaders. East-side lakes and reservoirs are launchable April through October. Lake Chelan and Banks Lake hit peak fishing pressure May through June." },
    { q: "What's the best fishing on a Washington boat ramp?", a: "Chinook and coho salmon in Puget Sound. Steelhead on the Snake and Cowlitz rivers. Walleye on the Columbia River impoundments. Kokanee on Lake Chelan. Smallmouth on the Snake and lower Columbia. Crab and lingcod throughout Puget Sound during open seasons." },
    { q: "Do I need a fishing license to fish from my boat in Washington?", a: "Yes, anyone 15 or older needs a Washington fishing license. Saltwater (Puget Sound and Pacific coast) and freshwater licenses are separate — buy both if you fish both. Salmon, steelhead, and shellfish require additional endorsements. Issued through WDFW." },
    { q: "Are Washington boat ramps crowded on weekends?", a: "Yes, particularly Edmonds, Everett, and Shilshole on summer Puget Sound weekends. Lake Chelan ramps fill by 7 AM during June-August. Snake River steelhead ramps near the Tri-Cities hit capacity during fall runs. Plan to arrive at sunrise on prime weekends." },
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
        headline: "Where to Launch in Washington: Boating Season, Permits, and Local Rules",
        description: "Washington boating guide covering Puget Sound and Hood Canal saltwater, the San Juan Islands, the Columbia and Snake river systems, and glacial lakes from Lake Chelan to Lake Sammamish — plus tide-driven seasonal conditions and Discover Pass and tribal permit requirements.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/washington" },
        articleSection: "Boating",
        keywords: ["washington boat ramps", "puget sound launches", "san juan islands boat ramp", "lake chelan boating", "columbia river launches", "discover pass", "washington fishing license"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Washington Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Washington</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{waRamps.length}+ boat ramps across {washingtonLakes.length} lakes and waterways. Puget Sound salmon, San Juan Islands, Lake Chelan, and the Columbia River basin.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Washington has 1,094 public boat ramps spanning Puget Sound, Hood Canal, the San Juan Islands, the Columbia and Snake river systems, and a chain of glacial lakes from Lake Chelan to Lake Sammamish. Whether you&apos;re launching for Chinook salmon in Puget Sound, kokanee on Lake Chelan, smallmouth on the Columbia, or steelhead on the Snake, the directory below shows ramps with parking, tide considerations, and amenity details verified from state, federal, and tribal sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = waRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = waRamps.length > 0 ? [waRamps.reduce((s, r) => s + r.latitude, 0) / waRamps.length, waRamps.reduce((s, r) => s + r.longitude, 0) / waRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/washington/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Washington"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Washington Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {washingtonLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/washington/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {waRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Washington" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Washington</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Washington requires all motorized boats to be registered and display a current Department of Licensing decal.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A Discover Pass ($30 annual, $10 daily) is required for parking at most state-managed launches.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Tide and current matter most in Puget Sound &mdash; check NOAA tide tables before launching west of the Cascades.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and during salmon season openers.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Washington</h2>
          <p>Washington&apos;s boating geography divides into three distinct zones. West of the Cascades, Puget Sound and Hood Canal anchor saltwater boating with launches at Edmonds, Everett, Anacortes, Port Angeles, and Olympia serving Chinook and coho salmon, Dungeness crab, and bottom-fishing for lingcod and rockfish. The San Juan Islands offer remote launches at Friday Harbor, Lopez, and Orcas with currents that demand experience and tide-aware planning. East of the Cascades, the Columbia River and its impoundments &mdash; Lake Roosevelt, Lake Wallula, Priest Rapids &mdash; deliver flatwater bass, walleye, and the country&apos;s most consistent fall Chinook fishery. The Snake River from the Idaho border down to the Tri-Cities produces world-class steelhead. Glacial lakes &mdash; Chelan, Sammamish, Washington, Stevens &mdash; sit between the two, offering everything from kokanee to bass to warmwater panfish. Lake Chelan alone is over 1,500 feet deep and 50 miles long, with limited but excellent ramp access.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Washington</h2>
          <p>Washington&apos;s boating season splits dramatically by region. Puget Sound and the Pacific coast support year-round saltwater boating, though winter weather narrows practical use to December through February for hardy crabbers and winter-run steelheaders. East-side reservoirs and lakes typically run April through October, with Lake Chelan and Banks Lake hitting peak fishing pressure in May and June. Tide is the dominant factor in Puget Sound &mdash; currents at Deception Pass, the San Juans, and the entrances to Hood Canal exceed 6 knots on big tide swings, and slack-water windows of 20 minutes determine whether a passage is safe or stupid. East of the Cascades, summer temperatures push surface water above 70&deg;F by early July, shifting bass and walleye to deeper structure. Coast Guard rescues spike on Puget Sound during summer afternoon northwesterlies, which build 3-5 foot chop in under an hour. Check NOAA marine forecasts and tide tables before launching anywhere west of the Cascades.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Washington</h2>
          <p>All motorized vessels in Washington must carry current state registration and a Department of Licensing decal, valid for one year. The state requires a Boater Education Card for everyone born after January 1, 1955 &mdash; a rolling phase-in that now covers nearly all adult operators. Washington&apos;s freshwater fishing license structure is separate from saltwater (Puget Sound and coast); both are required if you fish both. A Discover Pass ($30 annual or $10 daily) is required for parking at most state-managed water access sites and many DNR launches; tribal launches on the Olympic Peninsula and east-side reservations have separate permit requirements. Children under 12 must wear a Coast Guard-approved life jacket on any vessel under way. Crabbing and shellfishing in Puget Sound require additional permits and have strict daily quotas &mdash; check the WDFW emergency rule changes weekly during peak season because closures happen fast.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Washington Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-washington"} />
      <CletusAd /></div>
    </div>
  );
}
