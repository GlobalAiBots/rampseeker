import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { amenityLabels } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import AdSlot from "@/components/AdSlot";
import FeaturedArticle from "@/components/FeaturedArticle";
import { getCountyForCity } from "@/data/counties";
import type { Metadata } from "next";

const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

const eligibleCities = cities.filter((c) => c.ramps.length >= 2);

export function generateStaticParams() {
  return eligibleCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Not Found" };
  return {
    title: `Boat Ramps near ${city.name}, ${city.stateName} | RampSeeker`,
    description: `Find all ${city.ramps.length} boat ramps near ${city.name}, ${city.state}. GPS coordinates, amenities, directions, and local tips for every launch site.`,
    openGraph: { title: `Boat Ramps near ${city.name}, ${city.stateName}`, url: `https://www.rampseeker.com/cities/${city.slug}` },
    twitter: { card: "summary", title: `Boat Ramps near ${city.name}, ${city.stateName} | RampSeeker` },
    alternates: { canonical: `https://www.rampseeker.com/cities/${city.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city || city.ramps.length < 2) notFound();
  const county = getCountyForCity(city.name);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: city.stateName, item: `https://www.rampseeker.com/${city.stateSlug}` },
          { "@type": "ListItem", position: 3, name: city.name, item: `https://www.rampseeker.com/cities/${city.slug}` },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many boat ramps are near ${city.name}?`, acceptedAnswer: { "@type": "Answer", text: `There are ${city.ramps.length} boat ramps near ${city.name}, ${city.stateName}.` } },
          { "@type": "Question", name: `Where can I launch a boat near ${city.name}, ${city.state}?`, acceptedAnswer: { "@type": "Answer", text: `RampSeeker lists ${city.ramps.length} launch sites near ${city.name}. Visit rampseeker.com/cities/${city.slug} for GPS coordinates and directions.` } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href={`/${city.stateSlug}`} className="hover:text-water transition">{city.stateName}</Link><span>/</span>
        {county && <><Link href={`/counties/${county.toLowerCase()}`} className="hover:text-water transition">{county} County</Link><span>/</span></>}
        <span className="text-charcoal font-medium">{city.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Boat Ramps near {city.name}, {city.stateName}</h1>
      <p className="text-gray-500 mb-8">{city.ramps.length} boat ramp{city.ramps.length !== 1 ? "s" : ""} near {city.name}{county ? `, ${county} County` : ""}, {city.stateName}</p>

      {city.ramps.length > 0 && (() => {
        const mapRamps = city.ramps.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = [city.ramps.reduce((s, r) => s + r.latitude, 0) / city.ramps.length, city.ramps.reduce((s, r) => s + r.longitude, 0) / city.ramps.length];
        return <RampMap ramps={mapRamps} center={center} zoom={12} height="350px" className="mb-8" />;
      })()}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {city.ramps.map((r) => {
          const gl = r.grandLakeData;
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition mb-1">{r.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{r.city}, {r.state}{lake ? ` \u00b7 ${lake.name}` : ""}</p>
              {gl && gl.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {gl.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                  ))}
                </div>
              )}
              <span className="text-sm font-semibold text-sunset">View Details &rarr;</span>
            </Link>
          );
        })}
      </div>
      <AdSlot position="city-below-ramps" />

      {/* Intro */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Boating near {city.name}, {city.stateName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {city.name}, {city.stateName} offers {city.ramps.length} public boat ramp{city.ramps.length !== 1 ? "s" : ""} for local boaters and visitors.{county ? ` Located in ${county} County,` : ""} {city.name} provides access to nearby lakes, rivers, and waterways. Browse all launch points above with GPS coordinates and directions.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Launching near {city.name}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Arrive early on weekends &mdash; popular ramps near {city.name} fill up fast.</li>
          <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Check local water conditions and weather before launching.</li>
          <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps in {city.stateName} require a state boat registration.</li>
        </ul>
      </div>

      {/* Visible FAQ */}
      <div className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many boat ramps are near ${city.name}, ${city.stateName}?`, a: `There are ${city.ramps.length} boat ramps near ${city.name}, ${city.stateName} listed on RampSeeker. Each listing includes GPS coordinates, amenities, and directions.` },
            { q: `Are boat ramps near ${city.name} free?`, a: `Many boat ramps near ${city.name} are free, especially those managed by state parks or public agencies. Some may charge a small launch fee.` },
            { q: `How do I get directions to a boat ramp near ${city.name}?`, a: `Click any ramp listing above to see its detail page with a map and a "Get Directions" button that opens Google Maps.` },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <FeaturedArticle listingSlug={`city-${city.slug}`} />

      {/* Nearby Cities */}
      {(() => {
        const nearby = cities
          .filter(c => c.slug !== city.slug && c.state === city.state && c.ramps.length >= 2)
          .map(c => ({ ...c, dist: Math.sqrt(Math.pow(c.lat - city.lat, 2) + Math.pow(c.lng - city.lng, 2)) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 5);
        if (nearby.length === 0) return null;
        return (
          <div className="mb-8">
            <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Nearby Cities with Boat Ramps</h3>
            <div className="flex flex-wrap gap-2">
              {nearby.map(c => (
                <Link key={c.slug} href={`/cities/${c.slug}`} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:text-water hover:border-water transition">
                  {c.name}, {c.state} ({c.ramps.length})
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Back to state */}
      <div className="text-center pt-4 pb-8">
        <Link href={`/${city.stateSlug}`} className="text-water hover:underline font-semibold text-sm">
          Browse all {city.stateName} boat ramps &rarr;
        </Link>
      </div>
    </div>
  );
}
