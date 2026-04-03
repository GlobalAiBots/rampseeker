import Link from "next/link";
import { lakes } from "@/data/lakes";
import { unified } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oklahoma Lakes — Boat Ramps by Lake | RampSeeker",
  description: "Browse boat ramps organized by lake across Oklahoma. Grand Lake, Tenkiller, Eufaula, Keystone, Texoma, Broken Bow, and 15+ more.",
  openGraph: { title: "Oklahoma Lakes — RampSeeker", url: "https://rampseeker.com/lakes" },
  alternates: { canonical: "https://rampseeker.com/lakes" },
};

export default function LakesPage() {
  const lakeCounts = lakes.map((l) => {
    const count = l.id === "grand-lake"
      ? unified.filter((r) => r.featured).length
      : unified.filter((r) => !r.featured && getLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    return { ...l, rampCount: count };
  }).sort((a, b) => b.rampCount - a.rampCount);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Oklahoma Lakes</h1>
      <p className="text-gray-500 mb-8">Browse boat ramps organized by lake. {lakes.length} lakes with launch access across Oklahoma.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lakeCounts.map((l) => (
          <Link key={l.id} href={l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}`}
            className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
            <h2 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
            <div className="flex gap-4 mt-3 text-xs text-gray-400">
              <span>{l.rampCount} ramp{l.rampCount !== 1 ? "s" : ""}</span>
              {l.acres > 0 && <span>{l.acres.toLocaleString()} acres</span>}
              {l.maxDepth > 0 && <span>{l.maxDepth} ft deep</span>}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {l.fishSpecies.slice(0, 3).map((s) => (
                <span key={s} className="text-[10px] bg-forest/10 text-forest px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
            <span className="text-sm font-semibold text-sunset mt-3 inline-block group-hover:text-sunset-dark transition">View Ramps &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
