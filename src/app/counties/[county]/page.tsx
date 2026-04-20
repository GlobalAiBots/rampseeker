import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountyBySlug } from "@/data/counties";
import { amenityLabels } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import AdSlot from "@/components/AdSlot";
import type { Metadata } from "next";

// Render on-demand (ISR) to keep build memory down; first visit caches at the edge.
export function generateStaticParams() { return []; }
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ county: string }> }): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) return { title: "Not Found" };
  return {
    title: `Boat Ramps in ${county.name} County, Oklahoma | RampSeeker`,
    description: `Find all ${county.ramps.length} boat ramps in ${county.name} County, Oklahoma. GPS coordinates, amenities, directions, and local tips.`,
    openGraph: { title: `${county.name} County Boat Ramps`, url: `https://www.rampseeker.com/counties/${county.slug}` },
    twitter: { card: "summary", title: `${county.name} County Boat Ramps | RampSeeker` },
    alternates: { canonical: `https://www.rampseeker.com/counties/${county.slug}` },
  };
}

export default async function CountyPage({ params }: { params: Promise<{ county: string }> }) {
  const { county: slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Oklahoma", item: "https://www.rampseeker.com/oklahoma" },
          { "@type": "ListItem", position: 3, name: `${county.name} County`, item: `https://www.rampseeker.com/counties/${county.slug}` },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many boat ramps are in ${county.name} County?`, acceptedAnswer: { "@type": "Answer", text: `RampSeeker lists ${county.ramps.length} boat ramps in ${county.name} County, Oklahoma.` } },
          { "@type": "Question", name: `Are boat ramps in ${county.name} County free?`, acceptedAnswer: { "@type": "Answer", text: `Most public boat ramps in ${county.name} County are free. Some marina ramps may charge a fee.` } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/oklahoma" className="hover:text-water transition">Oklahoma</Link><span>/</span>
        <span className="text-charcoal font-medium">{county.name} County</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Boat Ramps in {county.name} County, Oklahoma</h1>
      <p className="text-gray-500 mb-8">{county.ramps.length} boat ramp{county.ramps.length !== 1 ? "s" : ""} in {county.name} County</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {county.ramps.map((r) => {
          const gl = r.grandLakeData;
          const lake = getLakeForRamp(r.latitude, r.longitude);
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition mb-1">{r.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{r.city}, OK{lake ? ` \u00b7 ${lake.name}` : ""}</p>
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
      <AdSlot position="county-below-ramps" />
    </div>
  );
}
