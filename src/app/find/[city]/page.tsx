import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug, getRampsNearCity } from "@/data/cities";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Not Found" };
  return {
    title: `Boat Ramps Near ${city.name}, Oklahoma — Find the Closest Launch | RampSeeker`,
    description: `Find the closest boat ramps near ${city.name}, OK. ${city.ramps.length} ramps in the area with GPS coordinates, directions, and amenities. Free and paid launch sites.`,
    openGraph: { title: `Boat Ramps Near ${city.name}, Oklahoma`, url: `https://rampseeker.com/find/${city.slug}` },
    twitter: { card: "summary", title: `Boat Ramps Near ${city.name} | RampSeeker` },
    alternates: { canonical: `https://rampseeker.com/find/${city.slug}` },
  };
}

export default async function NearCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const nearby = getRampsNearCity(slug, 20);
  const faqs = [
    { q: `Where can I launch a boat near ${city.name}?`, a: `There are ${nearby.length} boat ramps near ${city.name}, Oklahoma. The closest is ${nearby[0]?.name || "listed below"}, ${nearby[0]?.distanceMiles || "a short drive"} miles away.` },
    { q: `What is the closest boat ramp to ${city.name} OK?`, a: nearby[0] ? `${nearby[0].name} is the closest boat ramp to ${city.name} at approximately ${nearby[0].distanceMiles} miles. GPS: ${nearby[0].latitude.toFixed(4)}, ${nearby[0].longitude.toFixed(4)}.` : `Check the list below for the closest ramps.` },
    { q: `Are there free boat ramps near ${city.name}?`, a: `Yes, most public boat ramps near ${city.name} are free to use. Some marina ramps may charge a fee.` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Oklahoma", item: "https://rampseeker.com/oklahoma" },
          { "@type": "ListItem", position: 3, name: `Near ${city.name}`, item: `https://rampseeker.com/find/${city.slug}` },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/oklahoma" className="hover:text-water transition">Oklahoma</Link><span>/</span>
        <span className="text-charcoal font-medium">Near {city.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Boat Ramps Near {city.name}, Oklahoma</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Looking for a boat ramp near {city.name}, Oklahoma? Here are the {nearby.length} closest boat launch points, sorted by distance. Whether you need a free public ramp or a marina with fuel and courtesy docks, we&apos;ve got you covered.
      </p>

      <div className="space-y-3 mb-10">
        {nearby.map((r) => {
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal group-hover:text-water transition">{r.name}</span>
                  {r.featured && <span className="text-[10px] font-bold text-sunset bg-sunset/10 px-1.5 py-0.5 rounded-full">Featured</span>}
                </div>
                <p className="text-gray-500 text-sm">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <span className="text-water font-bold text-sm">{r.distanceMiles} mi</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* FAQ */}
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2 mb-10">
        {faqs.map((f, i) => (
          <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
            <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">
              {f.q}
              <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>

      {/* Related */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">People Also Search For</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/best/free-boat-ramps-oklahoma" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Free boat ramps in Oklahoma</Link>
          <Link href="/best/boat-ramps-with-restrooms" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Ramps with restrooms</Link>
          <Link href="/lakes" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Browse by lake</Link>
        </div>
      </div>
    </div>
  );
}
