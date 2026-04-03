"use client";

import { useState } from "react";
import Link from "next/link";
import { unified, getAllCities, amenityLabels } from "@/data/all-ramps";

const filterAmenities = ["restrooms", "courtesy-dock", "lighting", "fuel-nearby"];

export default function Home() {
  const featured = unified.filter((r) => r.featured);
  const allCities = getAllCities();
  const [city, setCity] = useState("All");
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const filtered = unified.filter((r) => {
    if (city !== "All" && r.city.toLowerCase() !== city.toLowerCase()) return false;
    if (amenityFilter.length > 0) {
      const gl = r.grandLakeData;
      if (!gl) return false;
      if (!amenityFilter.every((a) => gl.amenities.includes(a))) return false;
    }
    return true;
  });

  const displayRamps = showAll ? filtered : filtered.slice(0, 30);

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "RampSeeker",
        url: "https://rampseeker.com",
        description: "The most complete boat ramp directory for Oklahoma. 144+ ramps with GPS coordinates, amenities, and local tips.",
      }) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-4 font-[Cabin]">Oklahoma Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-6xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          Every Boat Ramp in Oklahoma
        </h1>
        <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          {unified.length}+ boat ramps across Oklahoma. Starting with the most complete guide to <span style={{ whiteSpace: "nowrap" }}>Grand Lake</span> O&apos; the Cherokees.
        </p>
        <div className="flex gap-3 justify-center mt-8 flex-wrap">
          <Link href="/grand-lake" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Grand Lake Ramps</Link>
          <Link href="/oklahoma" className="border-2 border-water text-water hover:bg-water hover:text-white font-bold px-6 py-3 rounded-lg transition">All Oklahoma</Link>
          <Link href="/map" className="border-2 border-gray-300 text-gray-600 hover:border-water hover:text-water font-bold px-6 py-3 rounded-lg transition">View Map</Link>
        </div>
      </section>

      {/* Featured Grand Lake */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-[Cabin] text-2xl font-bold text-charcoal">Featured: Grand Lake</h2>
            <p className="text-gray-400 text-sm">{featured.length} ramps with detailed guides, local tips, and nearby businesses</p>
          </div>
          <Link href="/grand-lake" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.slice(0, 6).map((r) => {
            const gl = r.grandLakeData;
            return (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city}, OK{gl ? ` \u00b7 ${gl.rampCount} ramp${gl.rampCount > 1 ? "s" : ""} \u00b7 ${gl.fee === "free" ? "Free" : gl.fee}` : ""}</p>
                {gl && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {gl.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                    ))}
                  </div>
                )}
                <span className="text-sm font-semibold text-sunset mt-3 inline-block">View Details &rarr;</span>
              </Link>
            );
          })}
        </div>
        <Link href="/grand-lake" className="inline-block mt-4 text-sm font-semibold text-sunset hover:text-sunset-dark transition sm:hidden">View all {featured.length} Grand Lake ramps &rarr;</Link>
      </section>

      {/* All Oklahoma Ramps */}
      <section id="ramps" className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">All Oklahoma Boat Ramps</h2>

        {/* City filter */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button onClick={() => setCity("All")} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${city === "All" ? "bg-water text-white" : "bg-white text-gray-500 hover:text-water border border-gray-200"}`}>All</button>
          {allCities.slice(0, 15).map(({ city: c }) => (
            <button key={c} onClick={() => setCity(c)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${city === c ? "bg-water text-white" : "bg-white text-gray-500 hover:text-water border border-gray-200"}`}>{c}</button>
          ))}
        </div>

        {/* Amenity filter */}
        <div className="flex flex-wrap gap-2">
          {filterAmenities.map((a) => {
            const active = amenityFilter.includes(a);
            return (
              <button key={a} onClick={() => setAmenityFilter(active ? amenityFilter.filter((x) => x !== a) : [...amenityFilter, a])}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${active ? "bg-forest/10 text-forest border border-forest/30" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200"}`}>
                <span>{amenityLabels[a]?.icon}</span> {amenityLabels[a]?.label}
              </button>
            );
          })}
        </div>
        <p className="text-gray-400 text-sm mt-3">{filtered.length} ramp{filtered.length !== 1 ? "s" : ""} found</p>
      </section>

      {/* Ramp list */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayRamps.map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</h3>
                {r.featured && <span className="text-[10px] font-bold text-sunset bg-sunset/10 px-1.5 py-0.5 rounded-full">Featured</span>}
              </div>
              <p className="text-gray-500 text-xs mt-1">{r.city}, OK</p>
              {r.rating > 0 && (
                <div className="flex items-center gap-0.5 mt-1.5">
                  {[1,2,3,4,5].map((s) => <span key={s} className={s <= r.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 12 }}>&#9733;</span>)}
                </div>
              )}
            </Link>
          ))}
        </div>
        {!showAll && filtered.length > 30 && (
          <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">
            Show all {filtered.length} ramps
          </button>
        )}
      </section>

      {/* About Oklahoma */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Boating in Oklahoma</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Oklahoma has over 200 lakes and more than 1 million surface acres of water — more man-made lake shoreline than any other state. From Grand Lake and Tenkiller in the east to Fort Cobb and Foss in the west, Oklahoma is a boater&apos;s paradise hiding in plain sight.</p>
            <p>Grand Lake O&apos; the Cherokees is the crown jewel — 46,000 acres with 1,300 miles of shoreline in Northeast Oklahoma. But lakes like Eufaula (102,000 acres), Texoma (89,000 acres), Broken Bow, Keystone, Skiatook, and Fort Gibson all have excellent boat access and world-class fishing.</p>
            <p>RampSeeker covers {unified.length}+ boat ramps across the state, starting with the most detailed guide to Grand Lake. We&apos;re adding more detailed guides for every major Oklahoma lake.</p>
          </div>
        </div>
      </section>

      {/* Homepage FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How many boat ramps are in Oklahoma?", acceptedAnswer: { "@type": "Answer", text: `RampSeeker lists ${unified.length}+ boat ramps across Oklahoma, with more being added regularly.` } },
            { "@type": "Question", name: "What is the best boat ramp on Grand Lake?", acceptedAnswer: { "@type": "Answer", text: "Wolf Creek Park in Grove is the most popular, with 6 concrete ramps, parking for 400+ vehicles, and restrooms. It's the primary tournament launch site." } },
            { "@type": "Question", name: "Are Oklahoma boat ramps free?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps in Oklahoma are free. Some marina ramps may charge a fee for non-customers." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in Oklahoma?", a: `RampSeeker lists ${unified.length}+ boat ramps across Oklahoma, with more being added regularly. Grand Lake alone has ${featured.length} documented ramps.` },
            { q: "What is the best boat ramp on Grand Lake?", a: "Wolf Creek Park in Grove is the most popular, with 6 concrete ramps, parking for 400+ vehicles, and restrooms. It's the primary tournament launch site on Grand Lake." },
            { q: "Are Oklahoma boat ramps free?", a: "Most public boat ramps in Oklahoma are free, including state park ramps and city-operated ramps. Some marina ramps may charge a fee." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">
                {f.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Submit */}
      <section id="submit" className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-2">Know a ramp we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete ramp directory in Oklahoma.</p>
          <a href="mailto:hello@rampseeker.com?subject=New%20Ramp%20Submission" className="bg-sunset hover:bg-sunset-dark text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Ramp</a>
        </div>
      </section>
    </div>
  );
}
