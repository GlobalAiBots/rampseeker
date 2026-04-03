import Link from "next/link";
import { notFound } from "next/navigation";
import { lakes, getLakeById, getLakeForRamp } from "@/data/lakes";
import { unified, amenityLabels } from "@/data/all-ramps";
import type { Metadata } from "next";

export function generateStaticParams() {
  return lakes.filter((l) => l.id !== "grand-lake").map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lake = getLakeById(id);
  if (!lake) return { title: "Lake Not Found" };
  return {
    title: `${lake.name} Boat Ramps — Launch Sites & Access Points | RampSeeker`,
    description: `Every boat ramp on ${lake.name}, Oklahoma. ${lake.acres.toLocaleString()} acres, ${lake.shorelineMiles} miles of shoreline. GPS coordinates, amenities, and local tips.`,
    openGraph: { title: `${lake.name} Boat Ramps`, url: `https://rampseeker.com/lakes/${lake.id}` },
    alternates: { canonical: `https://rampseeker.com/lakes/${lake.id}` },
  };
}

export default async function LakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === "grand-lake") notFound();
  const lake = getLakeById(id);
  if (!lake) notFound();

  const lakeRamps = unified.filter((r) => getLakeForRamp(r.latitude, r.longitude)?.id === lake.id);
  const otherLakes = lakes.filter((l) => l.id !== lake.id && l.id !== "grand-lake").slice(0, 6);

  const faqs = [
    { q: `How many boat ramps are on ${lake.name}?`, a: `RampSeeker lists ${lakeRamps.length} boat ramp${lakeRamps.length !== 1 ? "s" : ""} on ${lake.name}.` },
    { q: `Is it free to launch a boat on ${lake.name}?`, a: `Most public boat ramps on ${lake.name} are free. Some marina ramps may charge a fee.` },
    { q: `What fish are in ${lake.name}?`, a: `${lake.name} supports ${lake.fishSpecies.join(", ")}.` },
    { q: `How big is ${lake.name}?`, a: `${lake.name} covers ${lake.acres.toLocaleString()} surface acres with ${lake.shorelineMiles} miles of shoreline and a maximum depth of ${lake.maxDepth} feet.` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater", name: lake.name,
        description: lake.description.split("\n\n")[0],
        geo: { "@type": "GeoCoordinates", latitude: lake.lat, longitude: lake.lng },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Lakes", item: "https://rampseeker.com/lakes" },
          { "@type": "ListItem", position: 3, name: lake.name, item: `https://rampseeker.com/lakes/${lake.id}` },
        ],
      }) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/lakes" className="hover:text-water transition">Lakes</Link><span>/</span>
        <span className="text-charcoal font-medium">{lake.name}</span>
      </nav>

      {/* Hero */}
      <section className="mb-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Every Boat Ramp on {lake.name}</h1>
        <p className="text-gray-500">{lakeRamps.length} boat ramp{lakeRamps.length !== 1 ? "s" : ""} with GPS coordinates, amenities, and local tips</p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Surface Acres", value: lake.acres.toLocaleString() },
          { label: "Shoreline", value: `${lake.shorelineMiles} mi` },
          { label: "Max Depth", value: `${lake.maxDepth} ft` },
          { label: "Boat Ramps", value: String(lakeRamps.length) },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-water font-[Cabin]">{s.value}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Fish Species */}
      <div className="flex flex-wrap gap-2 mb-10">
        {lake.fishSpecies.map((s) => (
          <span key={s} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">{s}</span>
        ))}
      </div>

      {/* Ramp Cards — Featured style */}
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Boat Ramps on {lake.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {lakeRamps.map((r) => {
          const gl = r.grandLakeData;
          return (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                {gl && <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full whitespace-nowrap">{gl.rampCount} ramp{gl.rampCount > 1 ? "s" : ""}</span>}
              </div>
              <p className="text-gray-500 text-sm mb-2">{r.city}, OK{gl ? ` \u00b7 ${gl.fee === "free" ? "Free" : gl.fee}` : ""}</p>
              {gl && gl.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {gl.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                  ))}
                </div>
              )}
              {r.rating > 0 && (
                <div className="flex items-center gap-0.5 mb-2">
                  {[1,2,3,4,5].map((s) => <span key={s} className={s <= r.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 13 }}>&#9733;</span>)}
                  {r.totalRatings > 0 && <span className="text-gray-400 text-xs ml-1">({r.totalRatings})</span>}
                </div>
              )}
              <span className="text-sm font-semibold text-sunset group-hover:text-sunset-dark transition">View Details &rarr;</span>
            </Link>
          );
        })}
        {lakeRamps.length === 0 && <p className="text-gray-400 col-span-3">No ramps found for this lake yet. <a href="mailto:hello@rampseeker.com" className="text-water">Know one? Submit it.</a></p>}
      </div>

      {/* About */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About {lake.name}</h2>
        {lake.description.split("\n\n").map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>
        ))}
        <p className="text-gray-400 text-sm mt-4">Counties: {lake.counties.join(", ")} &middot; Nearest towns: {lake.nearestTowns.join(", ")}</p>
      </div>

      {/* FAQ */}
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2 mb-12">
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

      {/* Other Lakes */}
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Other Oklahoma Lakes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {otherLakes.map((l) => {
          const cnt = unified.filter((r) => getLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
          return (
            <Link key={l.id} href={`/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{cnt} ramps &middot; {l.acres.toLocaleString()} acres</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
