"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { minnesotaLakes, getMinnesotaLakeForRamp } from "@/data/minnesota-lakes";
import { isLikelyNonUS } from "@/lib/non-us-filter";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function MinnesotaPage() {
  const mnRamps = useMemo(() => unified.filter((r) => r.state === "MN"), []);

  const featuredLake = useMemo(() => {
    let best = minnesotaLakes.find((l) => l.id === "mille-lacs-lake") || minnesotaLakes[0]; let bestCount = 0;
    for (const l of minnesotaLakes) {
      const count = mnRamps.filter((r) => getMinnesotaLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [mnRamps]);
  const featuredRamps = useMemo(() => featuredLake ? mnRamps.filter((r) => getMinnesotaLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [mnRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of minnesotaLakes) map[l.id] = mnRamps.filter((r) => getMinnesotaLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [mnRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of mnRamps) {
      const c = r.city?.trim();
      if (!c || c.length <= 1) continue;
      if (isLikelyNonUS("MN", r.latitude, r.longitude, c)) continue;
      m[c] = (m[c] || 0) + 1;
    }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [mnRamps]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? mnRamps.filter(r => r.city?.trim() === selectedCity) : mnRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Minnesota?", a: "Most state-managed and county boat ramps are free. Some municipal ramps charge $5-10 daily. Boundary Waters launches require a BWCAW entry permit reserved through Recreation.gov. Voyageurs National Park ramps are free but require self-issued permits for overnight stays." },
    { q: "When does the boating season open in Minnesota?", a: "Ice-out on central Minnesota lakes typically runs early to mid-April. Northern Boundary Waters lakes don't reliably open until early May. The state fishing opener — the second Saturday in May — marks the unofficial start of the open-water season." },
    { q: "What are AIS inspections at Minnesota boat ramps?", a: "Aquatic Invasive Species inspections are mandatory at most major Minnesota launches. Inspectors check for zebra mussels, milfoil, and other invasive species. Plan for 5-15 extra minutes during peak periods. Drain all water, remove plants, and dispose of unused bait before arriving." },
    { q: "What's the best fishing on a Minnesota boat ramp?", a: "Walleye on Mille Lacs, Lake of the Woods, and Leech Lake statewide. Muskie on Lake Vermilion and Mille Lacs. Lake trout in the Boundary Waters. Smallmouth on the St. Croix and Lake Vermilion. Lake Superior trout and salmon at Two Harbors and Grand Marais." },
    { q: "Are Minnesota boat ramps crowded on weekends?", a: "Yes, particularly on the fishing opener (second Saturday in May) and summer holiday weekends. Mille Lacs, Lake Minnetonka, Lake of the Woods, and Leech Lake hit ramp capacity by 5-6 AM on prime weekends. RampSeeker lists alternates within 30 minutes if your first choice is full." },
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
        headline: "Where to Launch in Minnesota: Boating Season, Permits, and Local Rules",
        description: "Minnesota boating guide covering Boundary Waters, the central walleye belt, Twin Cities Metro, southern bluff country, and Lake Superior — plus ice-out timing, AIS rules, and state registration requirements.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/minnesota" },
        articleSection: "Boating",
        keywords: ["minnesota boat ramps", "boundary waters launches", "lake mille lacs ramps", "lake of the woods boat ramp", "minnesota fishing opener", "minnesota AIS inspection", "minnesota boater safety"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Minnesota Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Minnesota</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{mnRamps.length}+ boat ramps across {minnesotaLakes.length} major lakes. The Land of 10,000 Lakes (actually 11,842) &mdash; #2 in registered boats. Walleye capital of the world.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Minnesota&apos;s nickname understates the reality &mdash; the state actually has 11,842 lakes, supporting 1,523 public boat ramps from the Boundary Waters in the north to the bluff country in the south. Whether you&apos;re launching for muskie on Mille Lacs, walleye on Lake of the Woods, lake trout in the Boundary Waters, or smallmouth on the St. Croix, the directory below shows ramps with parking, accessibility details, and launch fees verified from state, federal, and county sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = mnRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = mnRamps.length > 0 ? [mnRamps.reduce((s, r) => s + r.latitude, 0) / mnRamps.length, mnRamps.reduce((s, r) => s + r.longitude, 0) / mnRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/minnesota/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Minnesota"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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

      {/* 5. LAKES */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Minnesota Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {minnesotaLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/minnesota/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {mnRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Minnesota" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Minnesota</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Minnesota requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in Minnesota.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in Minnesota.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Minnesota</h2>
          <p>Minnesota&apos;s boating regions break into four distinct zones. Northern Minnesota &mdash; the Boundary Waters Canoe Area, Voyageurs National Park, and the Iron Range &mdash; offers wilderness launches accessed by gravel roads, paddler-only put-ins, and remote ramps with limited parking. Lake Mille Lacs, Lake of the Woods, and Leech Lake anchor the central walleye belt with full-service public ramps that fill by 6 AM on summer weekends. The Twin Cities Metro region &mdash; Minnetonka, White Bear, Bald Eagle, the Mississippi and St. Croix river chains &mdash; packs 200+ ramps within 30 minutes of downtown Minneapolis or Saint Paul. Southern Minnesota&apos;s bluff country and the Mississippi backwaters around Wabasha, Winona, and Lake Pepin deliver flatwater bass and panfish in landscapes most out-of-staters don&apos;t associate with the state. Lake Superior&apos;s North Shore offers Great Lakes launches at Two Harbors, Grand Marais, and Knife River for trout and salmon.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Minnesota</h2>
          <p>Minnesota&apos;s open-water season is the shortest of any major boating state. Ice-out on central lakes typically runs early to mid-April; northern Boundary Waters lakes don&apos;t reliably ice out until early May. Most lakes freeze again by mid-November, with northern lakes locking up by late October. The fishing opener &mdash; typically the second Saturday in May &mdash; sees the year&apos;s heaviest ramp traffic statewide, with major lakes hitting capacity by 5 AM. Wind is the dominant weather factor: large lakes like Mille Lacs, Leech, and Lake of the Woods build dangerous chop fast in 15+ mph winds, and Lake Superior conditions can shift from glass to gale within an hour. Minnesota DNR maintains AIS (aquatic invasive species) inspection stations at most major launches &mdash; plan for a 5-15 minute inspection during peak periods.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Minnesota</h2>
          <p>All motorized vessels in Minnesota must carry current state registration, valid for three years through the DNR. Non-residents using a non-resident-registered boat for more than 90 consecutive days must transfer to MN registration. Anyone born after July 1, 1987, must complete a state-approved boating safety course to operate a boat with more than 25 horsepower. A Minnesota fishing license is required for anyone 16 or older; non-resident licenses are available for 1, 3, 7, and 14 days plus annual. The state strictly enforces AIS rules: drain all water, remove all aquatic plants, and dispose of unused bait before leaving any water access. Civil penalties for AIS violations start at $100 and escalate quickly. Children under 10 must wear a Coast Guard-approved life jacket on any boat under way. Boundary Waters launches require a separate BWCAW entry permit reservable through Recreation.gov.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Minnesota Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-minnesota"} />
      <CletusAd /></div>
    </div>
  );
}
