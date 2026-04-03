import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oklahoma Boat Ramps with Restrooms — Launch Sites with Facilities | RampSeeker",
  description: "Find Oklahoma boat ramps that have restroom facilities on site. Perfect for families and long days on the water.",
  openGraph: { title: "Oklahoma Boat Ramps with Restrooms", url: "https://rampseeker.com/best/boat-ramps-with-restrooms", siteName: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/best/boat-ramps-with-restrooms" },
};

export default function RestroomsPage() {
  const withRestrooms = unified.filter((r) => r.grandLakeData?.amenities.includes("restrooms"));
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/best" className="hover:text-water transition">Best Ramps</Link><span>/</span>
        <span className="text-charcoal font-medium">With Restrooms</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Oklahoma Boat Ramps with Restrooms</h1>
      <p className="text-gray-500 mb-8">{withRestrooms.length} boat ramps with confirmed restroom facilities. Essential for families and long days on the water.</p>
      <div className="space-y-2 mb-10">
        {withRestrooms.map((r) => {
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:border-water/40 transition">
              <div>
                <span className="font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                <span className="text-gray-400 text-xs ml-2">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</span>
              </div>
              <span className="text-xs font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-full">Restrooms</span>
            </Link>
          );
        })}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">Related</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/best/free-boat-ramps-oklahoma" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Free ramps</Link>
          <Link href="/best/boat-ramps-with-courtesy-docks" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">With courtesy docks</Link>
        </div>
      </div>
    </div>
  );
}
