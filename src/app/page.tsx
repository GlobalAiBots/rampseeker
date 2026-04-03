"use client";

import { useState } from "react";
import Link from "next/link";
import { ramps, amenityLabels } from "@/data/ramps";

const areas = ["All", "Grove", "Disney", "Ketchum", "Afton", "Bernice", "Langley", "Wyandotte", "Miami", "Cleora"];
const filterAmenities = ["restrooms", "courtesy-dock", "lighting", "fuel-nearby"];

export default function Home() {
  const [area, setArea] = useState("All");
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);

  const filtered = ramps.filter((r) => {
    if (area !== "All" && !r.city.toLowerCase().includes(area.toLowerCase())) return false;
    if (amenityFilter.length > 0 && !amenityFilter.every((a) => r.amenities.includes(a))) return false;
    return true;
  });

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "RampSeeker",
        url: "https://rampseeker.com",
        description: "The most complete boat ramp directory for Grand Lake O' the Cherokees, Oklahoma.",
        potentialAction: { "@type": "SearchAction", target: "https://rampseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />

      {/* Hero */}
      <section className="relative py-20 md:py-28 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-4 font-[Cabin]">Grand Lake O&apos; the Cherokees</p>
        <h1 className="font-[Cabin] text-4xl md:text-6xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          Every Boat Ramp on{" "}<span style={{ whiteSpace: "nowrap" }}>Grand Lake</span>
        </h1>
        <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          {ramps.length} launch points. GPS coordinates. Local tips. The most complete boat ramp guide for Grand Lake O&apos; the Cherokees.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <a href="#ramps" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Browse All Ramps</a>
          <Link href="/map" className="border-2 border-water text-water hover:bg-water hover:text-white font-bold px-6 py-3 rounded-lg transition">View Map</Link>
        </div>
      </section>

      {/* Filters */}
      <section id="ramps" className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {areas.map((a) => (
            <button key={a} onClick={() => setArea(a)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${area === a ? "bg-water text-white" : "bg-white text-gray-500 hover:text-water border border-gray-200"}`}>
              {a}
            </button>
          ))}
        </div>
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

      {/* Ramp Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h2>
                <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full whitespace-nowrap">{r.rampCount} ramp{r.rampCount > 1 ? "s" : ""}</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">{r.city}, {r.state} &middot; {r.surface} &middot; {r.fee === "free" ? "Free" : r.fee}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {r.amenities.map((a) => (
                  <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full" title={amenityLabels[a]?.label}>
                    {amenityLabels[a]?.icon} {amenityLabels[a]?.label}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => <span key={s} className={s <= r.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 14 }}>&#9733;</span>)}
                </div>
                <span className="text-sm font-semibold text-sunset group-hover:text-sunset-dark transition">View Details &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ramps by Area */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Boat Ramps by Area</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {(() => {
            const areaMap: Record<string, typeof ramps> = {};
            for (const r of ramps) { const c = r.city; if (!areaMap[c]) areaMap[c] = []; areaMap[c].push(r); }
            return Object.entries(areaMap).sort((a, b) => b[1].length - a[1].length).map(([city, cityRamps]) => (
              <button key={city} onClick={() => { setArea(city); document.getElementById("ramps")?.scrollIntoView({ behavior: "smooth" }); }}
                className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:border-water hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{cityRamps.length} ramp{cityRamps.length > 1 ? "s" : ""}</p>
              </button>
            ));
          })()}
        </div>
      </section>

      {/* About Grand Lake */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">About Grand Lake O&apos; the Cherokees</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>
              Grand Lake O&apos; the Cherokees is a 46,000-acre reservoir in Northeast Oklahoma with over 1,300 miles of shoreline. Created by the Pensacola Dam in 1940, it&apos;s one of Oklahoma&apos;s most popular destinations for fishing, boating, and water sports, drawing over 3 million visitors annually.
            </p>
            <p>
              The lake is renowned for its bass fishing — largemouth, smallmouth, and spotted bass all thrive here, along with crappie, catfish, white bass, striped bass, and paddlefish. Major bass tournament trails including B.A.S.S. and FLW regularly hold events on Grand Lake, with Wolf Creek Park in Grove serving as the primary tournament launch site.
            </p>
            <p>
              Grand Lake stretches across multiple towns in Northeast Oklahoma including Grove, Vinita, Jay, Miami, Afton, Langley, Disney, Ketchum, Bernice, Wyandotte, and the famous Monkey Island. Each area offers different fishing opportunities and launch points, from the wide-open main lake to quiet river-fed coves.
            </p>
          </div>
        </div>
      </section>

      {/* Homepage FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How many boat ramps are on Grand Lake?", acceptedAnswer: { "@type": "Answer", text: "There are 23 known public and marina boat ramps on Grand Lake O' the Cherokees, spread across Grove, Disney, Ketchum, Afton, Bernice, Langley, Wyandotte, and Miami." } },
            { "@type": "Question", name: "Are Grand Lake boat ramps free?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps on Grand Lake are free, including all state park ramps and city-operated ramps. Some marina ramps may charge a fee for non-customers." } },
            { "@type": "Question", name: "What is the best boat ramp on Grand Lake?", acceptedAnswer: { "@type": "Answer", text: "Wolf Creek Park in Grove is the most popular, with 6 concrete ramps, parking for 400+ vehicles, and restrooms. It's the primary tournament launch site on Grand Lake." } },
            { "@type": "Question", name: "Can I launch a boat at night on Grand Lake?", acceptedAnswer: { "@type": "Answer", text: "Disney Area State Park has a lighted boat ramp for night launches. The Cleora public ramp also offers 24-hour access. Most other ramps are not lit." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are on Grand Lake?", a: "There are 23 known public and marina boat ramps on Grand Lake O' the Cherokees, spread across Grove, Disney, Ketchum, Afton, Bernice, Langley, Wyandotte, and Miami." },
            { q: "Are Grand Lake boat ramps free?", a: "Most public boat ramps on Grand Lake are free, including all state park ramps and city-operated ramps. Some marina ramps may charge a fee for non-customers." },
            { q: "What is the best boat ramp on Grand Lake?", a: "Wolf Creek Park in Grove is the most popular, with 6 concrete ramps, parking for 400+ vehicles, and restrooms. It's the primary tournament launch site on Grand Lake." },
            { q: "Can I launch a boat at night on Grand Lake?", a: "Disney Area State Park has a lighted boat ramp for night launches. The Cleora public ramp also offers 24-hour access. Most other ramps are not lit." },
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

      {/* Submit CTA */}
      <section id="submit" className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-2">Know a ramp we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete ramp directory on Grand Lake.</p>
          <form action="mailto:hello@rampseeker.com" method="GET" className="flex flex-col gap-3 max-w-md mx-auto">
            <input type="text" placeholder="Ramp name" className="w-full px-4 py-3 rounded-lg bg-cream border border-gray-200 text-charcoal text-sm outline-none focus:border-water focus:ring-1 focus:ring-water/20 transition" />
            <input type="text" placeholder="Location / GPS coordinates" className="w-full px-4 py-3 rounded-lg bg-cream border border-gray-200 text-charcoal text-sm outline-none focus:border-water focus:ring-1 focus:ring-water/20 transition" />
            <textarea placeholder="Description and any details" rows={3} className="w-full px-4 py-3 rounded-lg bg-cream border border-gray-200 text-charcoal text-sm outline-none focus:border-water focus:ring-1 focus:ring-water/20 transition resize-none" />
            <a href="mailto:hello@rampseeker.com?subject=New%20Ramp%20Submission" className="bg-sunset hover:bg-sunset-dark text-white font-bold py-3 rounded-lg transition text-center shadow-sm">Submit Ramp</a>
          </form>
        </div>
      </section>
    </div>
  );
}
