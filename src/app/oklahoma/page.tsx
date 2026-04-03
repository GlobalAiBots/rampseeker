import Link from "next/link";
import { unified, getAllCities } from "@/data/all-ramps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boat Ramps in Oklahoma — Complete Directory | RampSeeker",
  description: "Find every boat ramp in Oklahoma. 144+ ramps across Grand Lake, Tenkiller, Eufaula, Keystone, Broken Bow, and more. GPS coordinates, directions, and local tips.",
  openGraph: {
    title: "Oklahoma Boat Ramps — RampSeeker",
    description: "The most complete boat ramp directory for Oklahoma.",
    url: "https://rampseeker.com/oklahoma",
  },
  alternates: { canonical: "https://rampseeker.com/oklahoma" },
};

export default function OklahomaPage() {
  const cities = getAllCities();
  const featured = unified.filter((r) => r.featured);
  const all = unified;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Boat Ramps in Oklahoma</h1>
      <p className="text-gray-500 mb-8">{all.length} boat ramps across the state. {featured.length} detailed Grand Lake ramps with local tips.</p>

      {/* Grand Lake Featured */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Grand Lake O&apos; the Cherokees</h2>
          <span className="text-xs font-bold text-sunset bg-sunset/10 px-2.5 py-1 rounded-full">Featured</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.slice(0, 6).map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-water transition">{r.name}</p>
              <p className="text-gray-500 text-sm">{r.city}, OK</p>
            </Link>
          ))}
        </div>
        <Link href="/grand-lake" className="inline-block mt-3 text-sm font-semibold text-sunset hover:text-sunset-dark transition">View all {featured.length} Grand Lake ramps &rarr;</Link>
      </div>

      {/* By City */}
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Ramps by City</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
        {cities.map(({ city, count }) => (
          <div key={city} className="bg-white border border-gray-200 rounded-lg p-3 text-left">
            <p className="font-bold text-charcoal text-sm">{city}</p>
            <p className="text-gray-400 text-xs">{count} ramp{count > 1 ? "s" : ""}</p>
          </div>
        ))}
      </div>

      {/* All Ramps */}
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All Oklahoma Ramps</h2>
      <div className="space-y-2">
        {all.map((r) => (
          <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 hover:border-water/40 transition shadow-sm">
            <div>
              <span className="font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
              <span className="text-gray-400 text-xs ml-2">{r.city}, OK</span>
              {r.featured && <span className="text-xs text-sunset font-bold ml-2">Featured</span>}
            </div>
            <span className="text-gray-400 text-xs font-mono">{r.latitude.toFixed(2)}, {r.longitude.toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
