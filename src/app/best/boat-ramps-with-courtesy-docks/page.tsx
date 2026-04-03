import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oklahoma Boat Ramps with Courtesy Docks | RampSeeker",
  description: "Find Oklahoma boat ramps with courtesy docks for easy solo launching. Floating docks make launching and loading your boat much easier.",
  alternates: { canonical: "https://rampseeker.com/best/boat-ramps-with-courtesy-docks" },
};

export default function DocksPage() {
  const withDocks = unified.filter((r) => r.grandLakeData?.amenities.includes("courtesy-dock"));
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/best" className="hover:text-water transition">Best Ramps</Link><span>/</span>
        <span className="text-charcoal font-medium">Courtesy Docks</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Oklahoma Boat Ramps with Courtesy Docks</h1>
      <p className="text-gray-500 mb-8">{withDocks.length} boat ramps with floating courtesy docks. A dock makes solo launching significantly easier — tie off your boat while you park the trailer.</p>
      <div className="space-y-2 mb-10">
        {withDocks.map((r) => {
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:border-water/40 transition">
              <div>
                <span className="font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                <span className="text-gray-400 text-xs ml-2">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</span>
              </div>
              <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">Dock</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
