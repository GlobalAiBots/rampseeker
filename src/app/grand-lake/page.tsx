"use client";

import { useState } from "react";
import Link from "next/link";
import { unified, amenityLabels } from "@/data/all-ramps";

const areas = ["All", "Grove", "Disney", "Ketchum", "Afton", "Bernice", "Langley", "Wyandotte", "Miami", "Cleora"];
const filterAmenities = ["restrooms", "courtesy-dock", "lighting", "fuel-nearby"];

export default function GrandLakePage() {
  const featured = unified.filter((r) => r.featured);
  const [area, setArea] = useState("All");
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);

  const filtered = featured.filter((r) => {
    if (area !== "All" && !r.city.toLowerCase().includes(area.toLowerCase())) return false;
    if (amenityFilter.length > 0) {
      const gl = r.grandLakeData;
      if (!gl) return false;
      if (!amenityFilter.every((a) => gl.amenities.includes(a))) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-20 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Grand Lake O&apos; the Cherokees</p>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal max-w-3xl mx-auto">
          Every Boat Ramp on <span style={{ whiteSpace: "nowrap" }}>Grand Lake</span>
        </h1>
        <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
          {featured.length} detailed ramp guides with GPS, amenities, local tips, and nearby businesses.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {areas.map((a) => (
            <button key={a} onClick={() => setArea(a)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${area === a ? "bg-water text-white" : "bg-white text-gray-500 hover:text-water border border-gray-200"}`}>{a}</button>
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
        <p className="text-gray-400 text-sm mt-3">{filtered.length} ramp{filtered.length !== 1 ? "s" : ""}</p>
      </section>

      {/* Ramp Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => {
            const gl = r.grandLakeData;
            return (
              <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h2>
                  {gl && <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full whitespace-nowrap">{gl.rampCount} ramp{gl.rampCount > 1 ? "s" : ""}</span>}
                </div>
                <p className="text-gray-500 text-sm mb-3">{r.city}, OK{gl ? ` \u00b7 ${gl.surface} \u00b7 ${gl.fee === "free" ? "Free" : gl.fee}` : ""}</p>
                {gl && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {gl.amenities.map((a) => (
                      <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => <span key={s} className={s <= r.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 14 }}>&#9733;</span>)}
                  </div>
                  <span className="text-sm font-semibold text-sunset group-hover:text-sunset-dark transition">View Details &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
