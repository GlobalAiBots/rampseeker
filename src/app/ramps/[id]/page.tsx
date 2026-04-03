import Link from "next/link";
import { notFound } from "next/navigation";
import { ramps, getRampById, amenityLabels } from "@/data/ramps";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ramps.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const ramp = getRampById(id);
  if (!ramp) return { title: "Ramp Not Found" };
  return {
    title: `${ramp.name} Boat Ramp — Grand Lake Oklahoma | RampSeeker`,
    description: `${ramp.name} boat ramp in ${ramp.city}, OK. ${ramp.rampCount} ramp${ramp.rampCount > 1 ? "s" : ""}, ${ramp.surface} surface, ${ramp.fee}. GPS: ${ramp.latitude}, ${ramp.longitude}. ${ramp.tips}`,
    openGraph: {
      title: `${ramp.name} — Grand Lake Boat Ramp`,
      description: `${ramp.description}`,
      url: `https://rampseeker.com/ramps/${ramp.id}`,
      siteName: "RampSeeker",
      type: "article",
    },
    alternates: { canonical: `https://rampseeker.com/ramps/${ramp.id}` },
  };
}

export default async function RampPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ramp = getRampById(id);
  if (!ramp) notFound();

  const nearby = ramps.filter((r) => r.id !== ramp.id).sort((a, b) => {
    const distA = Math.abs(a.latitude - ramp.latitude) + Math.abs(a.longitude - ramp.longitude);
    const distB = Math.abs(b.latitude - ramp.latitude) + Math.abs(b.longitude - ramp.longitude);
    return distA - distB;
  }).slice(0, 4);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${ramp.latitude},${ramp.longitude}`;
  const embedUrl = `https://www.google.com/maps?q=${ramp.latitude},${ramp.longitude}&z=14&output=embed`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: ramp.name,
    description: ramp.description,
    geo: { "@type": "GeoCoordinates", latitude: ramp.latitude, longitude: ramp.longitude },
    address: { "@type": "PostalAddress", streetAddress: ramp.address, addressLocality: ramp.city, addressRegion: ramp.state, postalCode: ramp.zip },
    amenityFeature: ramp.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: amenityLabels[a]?.label || a })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link>
        <span>/</span>
        <span className="text-gray-500">Grand Lake</span>
        <span>/</span>
        <span className="text-charcoal font-medium">{ramp.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal">{ramp.name}</h1>
          <span className="text-xs font-bold text-water bg-water/10 px-2.5 py-1 rounded-full">{ramp.rampCount} ramp{ramp.rampCount > 1 ? "s" : ""}</span>
        </div>
        <p className="text-gray-500">{ramp.city}, {ramp.state} &middot; Operated by {ramp.operatedBy}</p>
        <div className="flex items-center gap-0.5 mt-2">
          {[1,2,3,4,5].map((s) => <span key={s} className={s <= ramp.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 18 }}>&#9733;</span>)}
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8" style={{ height: 350 }}>
        <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map of ${ramp.name}`} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-5 py-2.5 rounded-lg transition shadow-sm flex items-center gap-2">
          Get Directions
        </a>
        <span className="bg-gray-100 border border-gray-200 text-charcoal font-medium px-5 py-2.5 rounded-lg select-all cursor-text font-mono text-sm">
          {ramp.latitude}, {ramp.longitude}
        </span>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <p className="text-gray-600 leading-relaxed">{ramp.description}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-400">Surface</dt><dd className="text-charcoal capitalize font-medium">{ramp.surface}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Fee</dt><dd className="text-charcoal capitalize font-medium">{ramp.fee}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Ramps</dt><dd className="text-charcoal font-medium">{ramp.rampCount}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Operator</dt><dd className="text-charcoal font-medium">{ramp.operatedBy}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Water Body</dt><dd className="text-charcoal font-medium">{ramp.waterBody}</dd></div>
          </dl>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Address</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{ramp.address}<br />{ramp.city}, {ramp.state} {ramp.zip}</p>
          <p className="text-gray-400 text-xs mt-3 font-mono">GPS: {ramp.latitude}, {ramp.longitude}</p>
          {ramp.nearbyLandmarks && <p className="text-gray-400 text-xs mt-1">Near: {ramp.nearbyLandmarks}</p>}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {ramp.amenities.map((a) => (
            <span key={a} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">
              {amenityLabels[a]?.icon} {amenityLabels[a]?.label}
            </span>
          ))}
          {ramp.amenities.length === 0 && <span className="text-gray-400 text-sm">No amenities listed</span>}
        </div>
      </div>

      {/* Local Tip */}
      {ramp.tips && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h3 className="font-[Cabin] font-bold text-water mb-2">Local Tip</h3>
          <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{ramp.tips}&rdquo;</p>
        </div>
      )}

      {/* Nearby Ramps */}
      <div className="mt-12">
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby Ramps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nearby.map((n) => (
            <Link key={n.id} href={`/ramps/${n.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{n.name}</p>
              <p className="text-gray-500 text-sm">{n.city}, {n.state} &middot; {n.rampCount} ramp{n.rampCount > 1 ? "s" : ""}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
