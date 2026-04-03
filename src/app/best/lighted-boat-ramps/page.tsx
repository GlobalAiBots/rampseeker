import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lighted Boat Ramps in Oklahoma — Night Launch Sites | RampSeeker",
  description: "Find Oklahoma boat ramps with lighting for pre-dawn and night launches. Essential for early morning fishing trips and tournament prep.",
  alternates: { canonical: "https://rampseeker.com/best/lighted-boat-ramps" },
};

export default function LightedPage() {
  const lighted = unified.filter((r) => r.grandLakeData?.amenities.includes("lighting"));
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/best" className="hover:text-water transition">Best Ramps</Link><span>/</span>
        <span className="text-charcoal font-medium">Lighted Ramps</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Lighted Boat Ramps in Oklahoma</h1>
      <p className="text-gray-500 mb-3">{lighted.length} boat ramps with confirmed lighting for night and pre-dawn launches.</p>
      <p className="text-gray-500 mb-8 text-sm">Planning a 4 AM tournament launch or a night fishing trip? These ramps have lighting so you can load and launch safely in the dark.</p>
      <div className="space-y-2 mb-10">
        {lighted.map((r) => {
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:border-water/40 transition">
              <div>
                <span className="font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                <span className="text-gray-400 text-xs ml-2">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</span>
              </div>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">Lighted</span>
            </Link>
          );
        })}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">Related</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/best/free-boat-ramps-oklahoma" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Free ramps</Link>
          <Link href="/best/boat-ramps-with-restrooms" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">With restrooms</Link>
        </div>
      </div>
    </div>
  );
}
