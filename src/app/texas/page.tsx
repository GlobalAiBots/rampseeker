"use client";

import dynamic from "next/dynamic";
const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { texasLakes, getTexasLakeForRamp } from "@/data/texas-lakes";
import precomputedCities from "@/data/state-cities-prefiltered.json";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import RampList from "@/components/RampList";
import GearRecommendation from "@/components/GearRecommendation";

export default function TexasPage() {
  const txRamps = useMemo(() => unified.filter((r) => r.state === "TX"), []);

  const featuredLake = useMemo(() => {
    let best = texasLakes.find((l) => l.id === "lake-travis") || texasLakes[0]; let bestCount = 0;
    for (const l of texasLakes) {
      const count = txRamps.filter((r) => getTexasLakeForRamp(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [txRamps]);
  const featuredRamps = useMemo(() => featuredLake ? txRamps.filter((r) => getTexasLakeForRamp(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [txRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of texasLakes) map[l.id] = txRamps.filter((r) => getTexasLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [txRamps]);

  const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["texas"] || [];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredRamps = selectedCity ? txRamps.filter(r => r.city?.trim() === selectedCity) : txRamps;

  const faqItems = [
    { q: "Do I need a permit to launch a boat in Texas?", a: "Texas Parks ramps and most Corps of Engineers reservoirs charge $5-15 daily entry, or accept the Texas State Parks Pass ($70 annual). Many county and municipal ramps are free. Federal launches at Padre Island National Seashore have separate fee structures. Coastal harbors typically free with paid parking." },
    { q: "What's the best fishing on a Texas boat ramp?", a: "Trophy largemouth bass on Lake Fork, Sam Rayburn, and Toledo Bend February-April. White bass runs on the Brazos, Trinity, and Colorado rivers late February through April. Striped bass at Lake Texoma year-round, peaking summer-fall. Coastal redfish and speckled trout in the Laguna Madre, Aransas Bay, and Galveston Bay year-round. Offshore tuna, kingfish, and red snapper from Port Aransas and Port Mansfield." },
    { q: "Do I need a fishing license to fish from my boat in Texas?", a: "Yes, anyone 17 or older needs a Texas fishing license. Saltwater requires a separate Saltwater Endorsement; freshwater requires a Freshwater Stamp. Red drum require a Red Drum Tag. Lake Texoma requires its own license unless you hold both Texas and Oklahoma. All licenses through TPWD." },
    { q: "When is hurricane season in Texas and how does it affect boat ramps?", a: "Hurricane season runs June 1 through November 30, with peak activity August through October. Named storms close Gulf coast ramps for safety; TPWD and county harbormasters post live ramp status during and after storms. Most ramps reopen within 7-14 days; some take longer if docks or roads are damaged. Inland reservoirs are usually unaffected." },
    { q: "How do drought years affect Texas reservoir boat ramps?", a: "Hill Country and Highland Lakes reservoirs — Travis, Buchanan, LBJ — drop dramatically during multi-year droughts, restricting or closing ramps. East Texas reservoirs and Sam Rayburn hold up better but can still see exposed ramps in deep dry cycles. The Texas Water Development Board publishes weekly reservoir levels. Check current conditions before driving out, especially July through October of dry years." },
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
        headline: "Where to Launch in Texas: Boating Season, Permits, and Local Rules",
        description: "Texas boating guide covering Gulf coast bays from Sabine to Laguna Madre, the Highland Lakes chain, East Texas reservoir belt (Sam Rayburn, Toledo Bend, Lake Fork), North Texas reservoirs, and West Texas border lakes — plus species-specific spawn windows, hurricane and drought cycles, and TPWD licensing rules.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com/texas" },
        articleSection: "Boating",
        keywords: ["texas boat ramps", "lake fork bass", "sam rayburn launches", "toledo bend boat ramp", "lake travis ramps", "lake texoma license", "laguna madre redfish", "tpwd boating safety"],
      }) }} />

      {/* 1. HERO */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Texas Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in Texas</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{txRamps.length}+ boat ramps across {texasLakes.length} major waterways. Gulf coast bays, the Highland Lakes chain, East Texas trophy bass reservoirs, and North Texas striper lakes.</p>
      </section>

      {/* 2. BRIEF INTRO */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">Texas has 760 public boat ramps spanning a 367-mile Gulf coast from the Sabine to the Rio Grande, the Highland Lakes chain winding through Hill Country, the East Texas reservoir belt anchored by Sam Rayburn and Toledo Bend, the West Texas border reservoirs at Amistad and Falcon, and Padre Island&apos;s offshore access to the Western Gulf. Whether you&apos;re launching for trophy largemouth on Lake Fork, redfish in the Laguna Madre, striped bass at Lake Texoma, white bass on the Brazos, or offshore tuna and red snapper out of Port Aransas, the directory below shows ramps with parking, fee details, and amenity verifications from state, federal, and local sources.</p>
      </section>

      {/* 3. MAP */}
      {(() => {
        const mapPins = txRamps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = txRamps.length > 0 ? [txRamps.reduce((s, r) => s + r.latitude, 0) / txRamps.length, txRamps.reduce((s, r) => s + r.longitude, 0) / txRamps.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={6} height="350px" className="mb-4" /></div>;
      })()}

      {/* 4. FEATURED RAMPS */}
      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={`/texas/lakes/${featuredLake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "Texas"}{r.fee ? ` · ${r.fee === "free" ? "Free" : r.fee}` : ""}</p>
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Texas Lakes &amp; Waterways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {texasLakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={`/texas/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => { const slug = `texas-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`; return (<Link key={city} href={`/cities/${slug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></Link>); })}</div>
        </section>
      )}

      {/* 6.5 FULL DIRECTORY */}
      {selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {txRamps.length} ramps</button></div>)}
      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="Texas" /></div>

      {/* 7. TIPS */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in Texas</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Texas requires a Boater Education Card for anyone born on or after September 1, 1993, operating motors over 15 HP.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Saltwater Endorsement, Freshwater Stamp, and Red Drum Tag are separate add-ons to the base TX fishing license.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Lake Texoma needs its own license unless you hold both TX and OK fishing licenses.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Drought years drop Hill Country reservoir levels &mdash; check Texas Water Development Board weekly readings before driving out.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>

      {/* 8. EDITORIAL */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Where to Launch in Texas</h2>
          <p>Texas boating divides into five distinct geographies, each with its own season and signature species. The Gulf coast runs from Sabine Lake at the Louisiana border down through Galveston, Matagorda, Aransas, Corpus Christi, and the Laguna Madre, delivering redfish, speckled trout, flounder, and offshore tarpon, tuna, kingfish, and red snapper. Sabine Pass and Galveston Bay handle most freight; Port Aransas and Port Mansfield serve offshore charter fleets and serious recreational anglers. The Highland Lakes chain west of Austin &mdash; Travis, LBJ, Buchanan, Inks, Marble Falls, Austin &mdash; runs the Colorado River through Hill Country with white bass, smallmouth, and increasingly striped bass following stocking programs. The East Texas reservoir belt is bass tournament country: Sam Rayburn (114,000 acres), Toledo Bend (185,000 acres straddling the Louisiana line), Lake Fork (the most-fished trophy bass lake in America), and Lake Conroe near Houston anchor a ten-reservoir region that produces a quarter of the country&apos;s tournament-caught largemouth. North Texas reservoirs &mdash; Texoma, Tawakoni, Ray Roberts, Lewisville &mdash; serve the Dallas-Fort Worth metro with striped bass, white bass, and walleye. West Texas border reservoirs Amistad and Falcon hold black and white bass plus Mexican-side fishery access for cross-border boaters with proper documentation.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Boating Season and Conditions in Texas</h2>
          <p>Texas supports year-round boating across most of the state, but productive seasons swing dramatically by region and species. Largemouth bass on East Texas reservoirs spawn February through April &mdash; that&apos;s the trophy window when 10-pound-plus fish move shallow on Sam Rayburn, Toledo Bend, and Lake Fork. White bass &quot;sand bass&quot; runs hit the Brazos, Trinity, and Colorado rivers in late February through April when fish push upstream from the reservoirs to spawn. Striped bass on Lake Texoma stay catchable year-round but peak summer through fall. Coastal speckled trout and redfish stay productive year-round in Texas bays, with fall producing the heaviest schools and largest fish. Hurricane season runs June through November and reshapes Gulf coast access every year &mdash; Texas Parks &amp; Wildlife and county harbormasters post live ramp closures during named storms. Summer afternoon thunderstorms develop fast on East Texas reservoirs, with lightning fatalities concentrated in July and August. Drought cycles drop reservoir levels significantly &mdash; Lake Travis, Buchanan, and many Hill Country reservoirs hit historic lows in dry years that close or restrict ramp access. The Texas Water Development Board publishes weekly reservoir levels.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">Permits, Registration, and Local Rules in Texas</h2>
          <p>All motorized vessels in Texas must carry current state registration and Texas Parks &amp; Wildlife Department (TPWD) decals, valid for two years. Anyone born on or after September 1, 1993, must complete a NASBLA-approved boating safety course to operate a motor over 15 horsepower or sailboat over 14 feet. A Texas fishing license is required for anyone 17 or older fishing inland or coastal waters; saltwater requires an additional Saltwater Endorsement, freshwater requires a Freshwater Stamp, and red drum require a Red Drum Tag. Children under 13 must wear a Coast Guard-approved life jacket on any vessel under 26 feet under way. Lake Texoma straddles the Texas-Oklahoma line and requires a separate Lake Texoma License unless you hold valid Texas and Oklahoma fishing licenses. Texas Parks ramps and most Corps of Engineers reservoirs charge daily entry fees ($5-15) or accept the Texas State Parks Pass ($70 annual). Coastal ramps and unattended public ramps are typically free, though some Galveston and Corpus Christi area ramps charge daily parking. Boats trailered between water bodies must be drained and dried under TPWD invasive species rules &mdash; quagga mussels and giant salvinia closures affect specific reservoirs.</p>
        </div>
      </article>

      {/* 9. GEAR (3 items) */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <GearRecommendation section="launch-gear" />
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Texas Boating FAQ</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-texas"} />
      <CletusAd /></div>
    </div>
  );
}
