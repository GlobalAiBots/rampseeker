import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { amenityLabels } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import AdSlot from "@/components/AdSlot";
import { getCountyForCity } from "@/data/counties";
import type { Metadata } from "next";

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
    openGraph: { title: `Boat Ramps near ${city.name}, ${city.stateName}`, url: `https://rampseeker.com/cities/${city.slug}` },
    twitter: { card: "summary", title: `Boat Ramps near ${city.name}, ${city.stateName} | RampSeeker` },
    alternates: { canonical: `https://rampseeker.com/cities/${city.slug}` },
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
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: city.stateName, item: `https://rampseeker.com/${city.stateSlug}` },
          { "@type": "ListItem", position: 3, name: city.name, item: `https://rampseeker.com/cities/${city.slug}` },
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
    </div>
  );
}
