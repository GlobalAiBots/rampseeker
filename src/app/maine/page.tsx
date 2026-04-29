"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { maineLakes, getMaineLakeForRamp } from "@/data/maine-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function MainePage() {
  const meRamps = useMemo(() => unified.filter((r) => r.state === "ME"), []);

  const featuredLake = useMemo(() => {
    let best = maineLakes.find((l) => l.id === "moosehead-lake") || maineLakes[0]; let bestCount = 0;
    for (const l of maineLakes) {
      const count = meRamps.filter((r) => getMaineLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [meRamps]);
  const featuredRamps = useMemo(() => featuredLake ? meRamps.filter((r) => getMaineLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [meRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of maineLakes) map[l.id] = meRamps.filter((r) => getMaineLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [meRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["maine"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? meRamps.filter(r => r.city?.trim() === selectedCity) : meRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Maine?", a: "Most state-managed inland ramps are free with current registration and a Lake and River Protection Sticker. Many coastal town ramps charge resident or seasonal launch permits ($25-200) — call the harbormaster before driving. Federal launches in Acadia and Allagash Wilderness Waterway have separate fee structures." },
    { q: "When does the boating season open in Maine?", a: "Inland lakes typically ice out mid-April through early May. Northern lakes (Moosehead, Eagle, Allagash region) open mid-May in cold years. Most lakes freeze again by late November. Coastal ramps stay accessible year-round, with winter use limited to mid-coast lobstermen and fall striper anglers." },
    { q: "What's the best fishing on a Maine boat ramp?", a: "Striped bass and bluefish along the southern coast May through October. Landlocked salmon and brook trout in the Rangeley region year-round. Lake trout (togue) on Moosehead and Sebago. Smallmouth bass on Sebago, China Lake, and the Belgrade chain. Brook trout in nearly every cold-water inland pond. Fall striper run mid-September through October." },
    { q: "Do I need a fishing license to fish from my boat in Maine?", a: "Yes, anyone 16 or older needs a Maine fishing license for inland waters. Saltwater anglers register for free through the Maine Saltwater Recreational Fishing Registry — required but no fee. All licenses through Maine DIFW." },
    { q: "What's the Lake and River Protection Sticker?", a: "A required permit on almost all motorized inland boats in Maine, funding aquatic invasive species prevention. Costs $20-45 depending on residency and boat size. Available at town offices, sporting goods stores, and online through Maine DIFW. Display the sticker on the port side of the bow." },
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
        headline: "Where to Launch in Maine: Boating Season, Permits, and Local Rules",
        description: "Maine boating guide covering southern Maine coast, midcoast working waterfront, Down East fjords, and inland lake systems including Sebago, Rangeley, Moosehead, and the Belgrade chain — plus latitude-compressed season, 20-foot tides, and Maine's Lake and River Protection Sticker.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/maine" },
        articleSection: "Boating",
        keywords: ["maine boat ramps", "sebago lake launches", "moosehead lake boat ramp", "rangeley lakes salmon", "casco bay launches", "down east maine boating", "maine lake protection sticker"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Maine Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Maine</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{meRamps.length}+ boat ramps across {maineLakes.length} major waterways. Atlantic coast, Casco and Penobscot bays, Sebago and Moosehead lakes, and the Rangeley salmon country.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Maine has 673 public boat ramps spanning a 3,500-mile rocky Atlantic coastline, 6,000+ inland lakes and ponds, the Penobscot and Casco bays, and the deep cold-water lake system that includes Sebago, Moosehead, and the Rangeley chain. Whether you&apos;re launching for striped bass off Popham Beach, lake trout at Moosehead, smallmouth on Sebago, or salmon and brook trout in the Rangeley region, the directory below shows ramps with parking, water-level notes, ice-out updates, and amenity verifications from state, federal, and town sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = meRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = meRamps.length > 0 ? [meRamps.reduce((s, r) => s + r.latitude, 0) / meRamps.length, meRamps.reduce((s, r) => s + r.longitude, 0) / meRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/maine/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Maine"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Maine Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {maineLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/maine/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = `maine-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {meRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Maine" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Maine</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most motorized inland boats need a Lake and River Protection Sticker ($20-45) before launch.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Maine has the largest tidal range on the U.S. East Coast &mdash; 9-12 feet midcoast, 20+ feet Down East. Plan launches around tide tables.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Coastal town ramps often charge resident or seasonal permits &mdash; call the harbormaster before driving.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Down East summer fog can persist into early afternoon &mdash; check NOAA marine forecasts before heading offshore.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Maine</h2>
          <p>Maine boating splits clearly between coastal and inland &mdash; and within each, into distinct regional patterns. The southern Maine coast from Kittery to Portland delivers striped bass, bluefish, and inshore mackerel runs, with major ramps at York Harbor, Saco, Old Orchard Beach, and Portland&apos;s Spring Point. The midcoast region &mdash; Casco Bay through Penobscot Bay &mdash; is the working waterfront of Maine: lobster boats, schooners, and recreational launches share ramps at Boothbay, Rockland, Camden, and Belfast. Down East from Acadia toward the New Brunswick border opens up rocky offshore islands, deepwater fjords, and tide ranges over 20 feet, with ramps at Bar Harbor, Jonesport, Cutler, and Eastport. Inland, Sebago Lake &mdash; Maine&apos;s deepest, second-largest &mdash; is the southern bass and salmon fishery within an hour of Portland. The Rangeley Lakes region holds landlocked salmon and native brook trout in some of the clearest cold water east of the Mississippi. Moosehead Lake &mdash; 117 square miles in north-central Maine &mdash; anchors a vast wilderness lake system feeding the Kennebec and Penobscot rivers with lake trout, togue, and salmon. The Belgrade and China lake chains, plus Cobbosseecontee and Megunticook, fill out the central Maine warmwater bass fishery.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Maine</h2>
          <p>Maine&apos;s open-water season is highly compressed by latitude. Most inland lakes ice out from mid-April through early May, with northern lakes (Moosehead, Eagle Lake, Allagash region) opening as late as mid-May in cold years. Lakes typically freeze again by late November or early December, with northern lakes locking up by mid-November. Coastal ramps stay accessible year-round, though winter use is limited to hardy mid-coast lobstermen and striper-chasing surf casters during fall runs. The Maine coast has the largest tidal range on the U.S. East Coast &mdash; over 20 feet at Eastport, 9-12 feet through most of the midcoast &mdash; so launch timing matters enormously. A ramp that&apos;s submerged at high tide may be a 50-yard mud walk at low. Fog is the dominant summer hazard, especially Down East where dense morning fog can persist into early afternoon. NOAA marine forecasts and tide tables are essential for any coastal boating. Lake fishing peaks in May (post-ice-out salmon and lake trout), warms through the summer bass and pickerel season, and has a strong fall foliage window from late September through mid-October.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Maine</h2>
          <p>All motorized vessels in Maine must carry current state registration, valid for one calendar year through the Department of Inland Fisheries and Wildlife. Anyone born after January 1, 1999, must complete a NASBLA-approved boating safety course to operate a motor over 25 horsepower. A Maine fishing license is required for anyone 16 or older fishing inland waters; saltwater anglers register for free through the Maine Saltwater Recreational Fishing Registry. Children under 11 must wear a Coast Guard-approved life jacket on any vessel under way. Maine strictly enforces Aquatic Invasive Species rules: a Lake and River Protection Sticker ($20-45 depending on residency and boat type) is required for almost all motorized inland boats, and most major launches have voluntary or mandatory inspection programs. Lobster traps in coastal waters require non-commercial recreational licenses with a 5-trap limit per household. Many coastal town ramps require resident or seasonal permits ($25-200) &mdash; call the harbormaster before driving out to confirm fees and parking availability.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Maine Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-maine"} />
      <CletusAd /></div>
    </div>
  );
}
