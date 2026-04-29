"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { illinoisLakes, getIllinoisLakeForRamp } from "@/data/illinois-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function IllinoisPage() {
  const ilRamps = useMemo(() => unified.filter((r) => r.state === "IL"), []);

  const featuredLake = useMemo(() => {
    let best = illinoisLakes.find((l) => l.id === "lake-michigan-il") || illinoisLakes[0]; let bestCount = 0;
    for (const l of illinoisLakes) {
      const count = ilRamps.filter((r) => getIllinoisLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [ilRamps]);
  const featuredRamps = useMemo(() => featuredLake ? ilRamps.filter((r) => getIllinoisLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [ilRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of illinoisLakes) map[l.id] = ilRamps.filter((r) => getIllinoisLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [ilRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["illinois"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? ilRamps.filter(r => r.city?.trim() === selectedCity) : ilRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Illinois?", a: "Most state-managed and county boat ramps are free. Cook County Forest Preserve ramps require a free online pass. Chicago Park District harbor slips require seasonal mooring permits or daily transient fees. Army Corps reservoirs (Carlyle, Shelbyville, Rend) typically charge $5 daily or $40 annually." },
    { q: "When does the boating season open in Illinois?", a: "Central and southern Illinois reservoirs are launchable late March through early November. Lake Michigan harbors open by early April. Hardy anglers fish the Illinois River year-round for sauger and saugeye, with the Mississippi pool system accessible during ice-free periods." },
    { q: "What's the best fishing on an Illinois boat ramp?", a: "Muskie and walleye on the Chain O' Lakes. Bass and catfish on Lake Shelbyville, Carlyle, and Rend Lake. Smallmouth on the Kankakee and Fox rivers. Trout, salmon, and perch on Lake Michigan from Chicago and North Shore harbors. Sauger on the Illinois and Mississippi river pools." },
    { q: "Do I need a fishing license to fish from my boat in Illinois?", a: "Yes, anyone 16 or older needs an Illinois fishing license. Lake Michigan salmon and trout fishing requires an additional Salmon Stamp. Inland trout require a separate Inland Trout Stamp. All licenses are issued through the Illinois DNR." },
    { q: "Are Illinois boat ramps crowded on weekends?", a: "Yes, particularly the Chain O' Lakes (Fox Lake, Pistakee) and Chicago harbors on summer weekends. Plan to arrive at sunrise on holiday weekends. Central Illinois reservoirs (Shelbyville, Carlyle) handle weekend traffic better than the Chain O' Lakes but still see early-morning lines during peak season." },
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
        headline: "Where to Launch in Illinois: Boating Season, Permits, and Local Rules",
        description: "Illinois boating guide covering Lake Michigan harbors, the Chain O' Lakes, central Army Corps reservoirs, the Illinois River corridor, and southern strip-mine lakes — plus seasonal conditions and state registration rules.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/illinois" },
        articleSection: "Boating",
        keywords: ["illinois boat ramps", "chain o lakes ramp", "lake shelbyville launches", "carlyle lake boat ramp", "chicago harbor mooring", "illinois river launches", "illinois fishing license"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Illinois Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Illinois</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{ilRamps.length}+ boat ramps across {illinoisLakes.length} lakes and rivers. Lake Michigan from Chicago, Mississippi River fishing, 900+ public lakes.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Illinois has 941 public boat ramps spanning the Lake Michigan shoreline at Chicago and the North Shore, the Illinois and Mississippi river systems, the chain of lakes near McHenry, the Rock and Fox river corridors, and the strip-mine reservoirs of southern Illinois. Whether you&apos;re launching for muskie on the Chain O&apos; Lakes, walleye on the Mississippi, smallmouth on the Kankakee, or perch on Lake Michigan, the directory below shows ramps with parking, pool depth, and amenity details verified from state, federal, and county sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = ilRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = ilRamps.length > 0 ? [ilRamps.reduce((s, r) => s + r.latitude, 0) / ilRamps.length, ilRamps.reduce((s, r) => s + r.longitude, 0) / ilRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/illinois/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Illinois"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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

      {/* 5. LAKES & RIVERS */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Illinois Lakes &amp; Rivers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {illinoisLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/illinois/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {ilRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Illinois" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Illinois</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Illinois requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in Illinois.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in Illinois.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Illinois</h2>
          <p>Illinois boating splits into five recognizable regions. Lake Michigan and the Chicago harbor system anchor the northeast &mdash; Burnham, Belmont, Diversey, Montrose, and 31st Street harbors serve power boaters and sailors year-round, with Cook County Forest Preserve launches handling smaller craft on inland lakes. The Chain O&apos; Lakes region &mdash; Fox Lake, Pistakee, Channel, Petite &mdash; sits an hour northwest of Chicago and runs the highest weekend traffic in the state, with summer ramp lines starting at 5 AM. Central Illinois offers reservoir launches at Lake Shelbyville, Carlyle Lake, Rend Lake, and Clinton Lake &mdash; Army Corps facilities with full-service amenities. The Illinois River corridor and its connected pools (Peoria, Starved Rock, Marseilles) deliver flat-water bass and catfish access from Joliet to the Mississippi. Southern Illinois&apos; strip-mine reservoirs and the Crab Orchard / Kinkaid lake system near Carbondale serve the deep-south part of the state with crystal-clear water and bass-tournament-ready ramps.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Illinois</h2>
          <p>Illinois has a longer practical boating season than the upper Midwest &mdash; central and southern reservoirs are launchable from late March through early November, with hardy anglers running winter sauger and saugeye trips on the Illinois River through January. Lake Michigan harbors close ice-out by early April but Coast Guard advisories run year-round; Chicago&apos;s lakefront produces 4-6 foot seas with under two hours of warning when a north or northeast wind sets in. River flooding is the biggest seasonal hazard: Mississippi and Illinois River pools open and close ramps based on stage, and the Army Corps publishes daily updates during high-water periods. Strong storm cells move through central Illinois on summer afternoons &mdash; check radar before launching on Lake Shelbyville or Carlyle, both of which can build 4-foot chop quickly. Illinois DNR posts live ramp closures during drought or flood events.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Illinois</h2>
          <p>All motorized vessels in Illinois must carry current state registration and validation decals issued by the Illinois DNR, valid for three years. Anyone born after January 1, 1998, must complete a NASBLA-approved boating safety course to operate a vessel with more than 10 horsepower. An Illinois fishing license is required for residents 16 or older and non-residents 16 or older fishing from any boat or shore; a separate Salmon Stamp is required for Lake Michigan trout and salmon. Children under 13 must wear a Coast Guard-approved life jacket on any vessel under way (longer than the federal default age of 12 because Illinois raised the threshold). Lake Michigan harbors operated by the Chicago Park District require seasonal mooring permits for slip use; transient stays are permitted with daily fees. Cook County Forest Preserve launches require a free pass available online.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Illinois Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-illinois"} />
      <CletusAd /></div>
    </div>
  );
}
