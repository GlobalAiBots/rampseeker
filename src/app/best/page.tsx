import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Boat Ramps in Oklahoma — Filtered by Feature | RampSeeker",
  description: "Find the best boat ramps in Oklahoma filtered by amenities: free ramps, restrooms, lighting, courtesy docks, fuel, and more.",
  alternates: { canonical: "https://rampseeker.com/best" },
};

const categories = [
  { href: "/best/free-boat-ramps-oklahoma", title: "Free Boat Ramps", desc: "All free public boat ramps in Oklahoma — no launch fees." },
  { href: "/best/boat-ramps-with-restrooms", title: "Ramps with Restrooms", desc: "Oklahoma boat ramps that have restroom facilities on site." },
  { href: "/best/lighted-boat-ramps", title: "Lighted Boat Ramps", desc: "Night launch sites with lighting for pre-dawn and after-dark trips." },
  { href: "/best/boat-ramps-with-courtesy-docks", title: "Ramps with Courtesy Docks", desc: "Ramps with floating docks that make solo launching easier." },
  { href: "/best/boat-ramps-with-fuel", title: "Ramps Near Fuel", desc: "Launch sites near fuel stations and marina gas docks." },
];

export default function BestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Best Boat Ramps in Oklahoma</h1>
      <p className="text-gray-500 mb-8">Find the perfect boat ramp filtered by the features that matter to you.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((c) => (
          <Link key={c.href} href={c.href} className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-sunset">
            <h2 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{c.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{c.desc}</p>
            <span className="text-sm font-semibold text-sunset mt-2 inline-block">Browse &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
