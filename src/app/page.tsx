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
          Every Boat Ramp on Grand Lake
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
