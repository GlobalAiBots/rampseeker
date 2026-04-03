import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, getUnifiedRampById, amenityLabels, type UnifiedRamp } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import type { Metadata } from "next";

export function generateStaticParams() {
  return unified.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const ramp = getUnifiedRampById(id);
  if (!ramp) return { title: "Ramp Not Found" };
  const county = ramp.county ? `${ramp.county} County, ` : "";
  return {
    title: `${ramp.name} Boat Ramp — ${county}Oklahoma | RampSeeker`,
    description: `${ramp.name} boat ramp near ${ramp.city}, Oklahoma. GPS: ${ramp.latitude.toFixed(4)}, ${ramp.longitude.toFixed(4)}. ${ramp.description.substring(0, 120)}`,
    openGraph: {
      title: `${ramp.name} — Oklahoma Boat Ramp`,
      description: ramp.description,
      url: `https://rampseeker.com/ramps/${ramp.id}`,
      siteName: "RampSeeker",
      type: "article",
    },
    alternates: { canonical: `https://rampseeker.com/ramps/${ramp.id}` },
  };
}

function buildFaqs(ramp: UnifiedRamp) {
  const gl = ramp.grandLakeData;
  const faqs = [];
  if (gl) {
    faqs.push({ q: `Is ${ramp.name} free to use?`, a: gl.fee === "free" ? `Yes, ${ramp.name} is completely free to use with no launch fees.` : `${ramp.name} has the following fee structure: ${gl.fee}. Check with the operator for current rates.` });
    faqs.push({ q: `Does ${ramp.name} have restrooms?`, a: gl.amenities.includes("restrooms") ? `Yes, ${ramp.name} has restroom facilities on site.` : `No, ${ramp.name} does not have restroom facilities. Plan accordingly.` });
    faqs.push({ q: `How many boat ramps are at ${ramp.name}?`, a: `${ramp.name} has ${gl.rampCount} concrete boat ramp${gl.rampCount > 1 ? "s" : ""}.` });
    faqs.push({ q: `What type of surface does ${ramp.name} have?`, a: `The ramp at ${ramp.name} is ${gl.surface}.` });
    faqs.push({ q: `Who operates ${ramp.name}?`, a: `${ramp.name} is operated by ${gl.operatedBy}.` });
  } else {
    faqs.push({ q: `Where is ${ramp.name} located?`, a: `${ramp.name} is located near ${ramp.city}, Oklahoma. GPS coordinates: ${ramp.latitude.toFixed(4)}, ${ramp.longitude.toFixed(4)}.` });
    faqs.push({ q: `How do I get directions to ${ramp.name}?`, a: `Click the "Get Directions" button above to open Google Maps with turn-by-turn directions to ${ramp.name}.` });
    if (ramp.rating > 0) {
      faqs.push({ q: `What is the rating for ${ramp.name}?`, a: `${ramp.name} has a ${ramp.rating}/5 rating based on ${ramp.totalRatings} Google review${ramp.totalRatings !== 1 ? "s" : ""}.` });
    }
  }
  return faqs;
}

export default async function RampPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ramp = getUnifiedRampById(id);
  if (!ramp) notFound();

  const gl = ramp.grandLakeData;
  const lake = getLakeForRamp(ramp.latitude, ramp.longitude);
  const nearby = unified.filter((r) => r.id !== ramp.id).sort((a, b) => {
    const distA = Math.abs(a.latitude - ramp.latitude) + Math.abs(a.longitude - ramp.longitude);
    const distB = Math.abs(b.latitude - ramp.latitude) + Math.abs(b.longitude - ramp.longitude);
    return distA - distB;
  }).slice(0, 4);

  const faqs = buildFaqs(ramp);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${ramp.latitude},${ramp.longitude}`;
  const embedUrl = `https://www.google.com/maps?q=${ramp.latitude},${ramp.longitude}&z=14&output=embed`;

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: ramp.name,
    description: ramp.description,
    geo: { "@type": "GeoCoordinates", latitude: ramp.latitude, longitude: ramp.longitude },
    address: { "@type": "PostalAddress", addressLocality: ramp.city, addressRegion: "OK", addressCountry: "US" },
    publicAccess: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
      { "@type": "ListItem", position: 2, name: "Oklahoma", item: "https://rampseeker.com/oklahoma" },
      { "@type": "ListItem", position: 3, name: ramp.name, item: `https://rampseeker.com/ramps/${ramp.id}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/oklahoma" className="hover:text-water transition">Oklahoma</Link><span>/</span>
        {ramp.featured && <><Link href="/grand-lake" className="hover:text-water transition">Grand Lake</Link><span>/</span></>}
        <span className="text-charcoal font-medium">{ramp.name}</span>
      </nav>

      {/* Lake / Featured badge */}
      <div className="flex flex-wrap gap-2 mb-3">
        {ramp.featured && (
          <span className="inline-block bg-sunset/10 text-sunset text-xs font-bold px-3 py-1 rounded-full">Featured — Grand Lake</span>
        )}
        {lake && !ramp.featured && (
          <Link href={lake.id === "grand-lake" ? "/grand-lake" : `/lakes/${lake.id}`} className="inline-block bg-water/10 text-water text-xs font-bold px-3 py-1 rounded-full hover:bg-water/20 transition">
            {lake.name}
          </Link>
        )}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal">{ramp.name}</h1>
        <p className="text-gray-500 mt-1">{ramp.city}, Oklahoma{gl ? ` \u00b7 Operated by ${gl.operatedBy}` : ""}</p>
        {(ramp.rating > 0) && (
          <div className="flex items-center gap-0.5 mt-2">
            {[1,2,3,4,5].map((s) => <span key={s} className={s <= ramp.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 18 }}>&#9733;</span>)}
            {ramp.totalRatings > 0 && <span className="text-gray-400 text-xs ml-1">({ramp.totalRatings})</span>}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8" style={{ height: 350 }}>
        <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map of ${ramp.name}`} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-5 py-2.5 rounded-lg transition shadow-sm">Get Directions</a>
        <span className="bg-gray-100 border border-gray-200 text-charcoal font-medium px-5 py-2.5 rounded-lg select-all cursor-text font-mono text-sm">
          {ramp.latitude.toFixed(4)}, {ramp.longitude.toFixed(4)}
        </span>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <p className="text-gray-600 leading-relaxed">{ramp.description}</p>
      </div>

      {/* === FEATURED (Grand Lake) CONTENT === */}
      {gl && (
        <>
          {/* Details + Address grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-400">Surface</dt><dd className="text-charcoal capitalize font-medium">{gl.surface}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-400">Fee</dt><dd className="text-charcoal capitalize font-medium">{gl.fee}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-400">Ramps</dt><dd className="text-charcoal font-medium">{gl.rampCount}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-400">Operator</dt><dd className="text-charcoal font-medium">{gl.operatedBy}</dd></div>
              </dl>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Address</h3>
              <p className="text-gray-600 text-sm">{gl.address}<br />{gl.city}, {gl.state} {gl.zip}</p>
              <p className="text-gray-400 text-xs mt-3 font-mono">GPS: {gl.latitude}, {gl.longitude}</p>
              {gl.nearbyLandmarks && <p className="text-gray-400 text-xs mt-1">Near: {gl.nearbyLandmarks}</p>}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
            <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {gl.amenities.map((a) => (
                <span key={a} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">
                  {amenityLabels[a]?.icon} {amenityLabels[a]?.label}
                </span>
              ))}
              {gl.amenities.length === 0 && <span className="text-gray-400 text-sm">No amenities listed</span>}
            </div>
          </div>

          {/* Local Tip */}
          {gl.tips && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
              <h3 className="font-[Cabin] font-bold text-water mb-2">Local Tip</h3>
              <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{gl.tips}&rdquo;</p>
            </div>
          )}

          {/* Long Description */}
          {gl.longDescription && gl.longDescription !== gl.description && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">What to Know About {ramp.name}</h3>
              {gl.longDescription.split("\n\n").map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </div>
          )}

          {/* Nearby Businesses */}
          {gl.nearbyBusinesses && gl.nearbyBusinesses.length > 0 && (
            <div className="mb-8">
              <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gl.nearbyBusinesses.map((b) => (
                  <div key={b.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-charcoal text-sm">{b.name}</p>
                      <span className="text-xs font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-full">{b.type}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{b.distance} &middot; {b.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* === BASIC (non-Grand Lake) CONTENT === */}
      {!gl && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-sm">
          <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Location Details</h3>
          <p className="text-gray-600 text-sm mb-2">{ramp.address}</p>
          <p className="text-gray-400 text-xs font-mono">GPS: {ramp.latitude.toFixed(4)}, {ramp.longitude.toFixed(4)}</p>
          {ramp.county && <p className="text-gray-400 text-xs mt-1">County: {ramp.county}</p>}
        </div>
      )}

      {/* FAQ Section */}
      <div className="mb-12">
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
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
      </div>

      {/* Nearby Ramps */}
      <div>
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby Ramps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nearby.map((n) => (
            <Link key={n.id} href={`/ramps/${n.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{n.name}</p>
              <p className="text-gray-500 text-sm">{n.city}, OK{n.featured ? " \u00b7 Featured" : ""}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* People Also Search For */}
      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">People Also Search For</h3>
        <div className="flex flex-wrap gap-2">
          <Link href={`/find/${ramp.city.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Boat ramps near {ramp.city}</Link>
          {lake && (
            <Link href={lake.id === "grand-lake" ? "/grand-lake" : `/lakes/${lake.id}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">{lake.name} boat ramps</Link>
          )}
          <Link href="/best/free-boat-ramps-oklahoma" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Free boat ramps in Oklahoma</Link>
          <Link href={`/find/${ramp.city.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Where to launch near {ramp.city} OK</Link>
        </div>
      </div>
    </div>
  );
}
