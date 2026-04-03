import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Boat Ramps in Oklahoma — No Launch Fees | RampSeeker",
  description: "Complete list of free boat ramps in Oklahoma. Public launch sites with no fees across Grand Lake, Tenkiller, Eufaula, Keystone, and every major lake.",
  alternates: { canonical: "https://rampseeker.com/best/free-boat-ramps-oklahoma" },
};

export default function FreePage() {
  const free = unified.filter((r) => {
    const gl = r.grandLakeData;
    return gl ? gl.fee === "free" : !r.description.toLowerCase().includes("fee");
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many free boat ramps are in Oklahoma?", acceptedAnswer: { "@type": "Answer", text: `There are approximately ${free.length} free boat ramps in Oklahoma, including state park ramps, city-operated ramps, and Corps of Engineers facilities.` } },
          { "@type": "Question", name: "Are Oklahoma state park boat ramps free?", acceptedAnswer: { "@type": "Answer", text: "Yes, most Oklahoma state park boat ramps are free to use. Some may require a state park parking pass during peak season." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/best" className="hover:text-water transition">Best Ramps</Link><span>/</span>
        <span className="text-charcoal font-medium">Free Boat Ramps</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Free Boat Ramps in Oklahoma</h1>
      <p className="text-gray-500 mb-8">{free.length} free public boat ramps across Oklahoma — no launch fees required.</p>

      <div className="space-y-2 mb-10">
        {free.map((r) => {
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:border-water/40 transition">
              <div>
                <span className="font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                <span className="text-gray-400 text-xs ml-2">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</span>
              </div>
              <span className="text-xs font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-full">Free</span>
            </Link>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">Related</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/best/boat-ramps-with-restrooms" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Ramps with restrooms</Link>
          <Link href="/best/lighted-boat-ramps" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Lighted ramps</Link>
          <Link href="/lakes" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Browse by lake</Link>
        </div>
      </div>
    </div>
  );
}
