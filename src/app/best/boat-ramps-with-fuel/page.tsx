import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oklahoma Boat Ramps Near Fuel Stations | RampSeeker",
  description: "Find Oklahoma boat ramps near fuel docks and gas stations. Top off before you launch or fuel up on the water.",
  openGraph: { title: "Oklahoma Boat Ramps Near Fuel", url: "https://rampseeker.com/best/boat-ramps-with-fuel", siteName: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/best/boat-ramps-with-fuel" },
};

export default function FuelPage() {
  const withFuel = unified.filter((r) => r.grandLakeData?.amenities.includes("fuel-nearby"));
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/best" className="hover:text-water transition">Best Ramps</Link><span>/</span>
        <span className="text-charcoal font-medium">Near Fuel</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Oklahoma Boat Ramps Near Fuel</h1>
      <p className="text-gray-500 mb-8">{withFuel.length} boat ramps near fuel docks or gas stations. Never run low on the water.</p>
      <div className="space-y-2 mb-10">
        {withFuel.map((r) => {
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:border-water/40 transition">
              <div>
                <span className="font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                <span className="text-gray-400 text-xs ml-2">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</span>
              </div>
              <span className="text-xs font-bold text-sunset bg-sunset/10 px-2 py-0.5 rounded-full">Fuel</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
