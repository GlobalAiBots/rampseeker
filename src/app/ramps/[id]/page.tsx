import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 400 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });
import { unified, getUnifiedRampById, amenityLabels, type UnifiedRamp } from "@/data/all-ramps";
import { getLakeForRamp } from "@/data/lakes";
import { getTexasLakeForRamp } from "@/data/texas-lakes";
import { getMissouriLakeForRamp } from "@/data/missouri-lakes";
import { getArkansasLakeForRamp } from "@/data/arkansas-lakes";
import { getKansasLakeForRamp } from "@/data/kansas-lakes";
import { getFloridaLakeForRamp } from "@/data/florida-lakes";
import { getCountyForCity } from "@/data/counties";
import { cities as allCityPages } from "@/data/cities";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import GearRecommendation from "@/components/GearRecommendation";
import FeaturedArticle from "@/components/FeaturedArticle";
import type { Metadata } from "next";

// Too many ramps (~29,500) to pre-render within Vercel build memory limits.
// Render on-demand (ISR): first visit builds + caches at the edge.
export function generateStaticParams() { return []; }
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const ramp = getUnifiedRampById(id);
  if (!ramp) return { title: "Ramp Not Found" };
  const stNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
  const metaState = stNames[ramp.state] || ramp.state || "USA";
  const county = ramp.county ? `${ramp.county} County, ` : "";
  return {
    title: `${ramp.name} Boat Ramp — ${county}${metaState} | RampSeeker`,
    description: `${ramp.name} boat ramp in ${ramp.city ? ramp.city + ", " : ""}${metaState}. GPS coordinates, directions, amenities, and local tips. Find boat ramps near you on RampSeeker.`,
    openGraph: {
      title: `${ramp.name} — ${metaState} Boat Ramp`,
      description: ramp.description,
      url: `https://www.rampseeker.com/ramps/${ramp.id}`,
      siteName: "RampSeeker",
      type: "article",
    },
    twitter: { card: "summary", title: `${ramp.name} Boat Ramp | RampSeeker` },
    alternates: { canonical: `https://www.rampseeker.com/ramps/${ramp.id}` },
  };
}

function buildFaqs(ramp: UnifiedRamp) {
  const gl = ramp.grandLakeData;
  const stateNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
  const faqState = stateNames[ramp.state] || ramp.state || "the area";
  const faqs = [];
  if (gl) {
    faqs.push({ q: `Is ${ramp.name} free to use?`, a: gl.fee === "free" ? `Yes, ${ramp.name} is completely free to use with no launch fees.` : `${ramp.name} has the following fee structure: ${gl.fee}. Check with the operator for current rates.` });
    faqs.push({ q: `Does ${ramp.name} have restrooms?`, a: gl.amenities.includes("restrooms") ? `Yes, ${ramp.name} has restroom facilities on site.` : `No, ${ramp.name} does not have restroom facilities. Plan accordingly.` });
    faqs.push({ q: `How many boat ramps are at ${ramp.name}?`, a: `${ramp.name} has ${gl.rampCount} concrete boat ramp${gl.rampCount > 1 ? "s" : ""}.` });
    faqs.push({ q: `What type of surface does ${ramp.name} have?`, a: `The ramp at ${ramp.name} is ${gl.surface}.` });
    faqs.push({ q: `Who operates ${ramp.name}?`, a: `${ramp.name} is operated by ${gl.operatedBy}.` });
  } else {
    faqs.push({ q: `Where is ${ramp.name} located?`, a: `${ramp.name} is located near ${ramp.city}, ${faqState}. GPS coordinates: ${ramp.latitude.toFixed(4)}, ${ramp.longitude.toFixed(4)}.` });
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
  const lake = getLakeForRamp(ramp.latitude, ramp.longitude) || (ramp.state === "TX" ? getTexasLakeForRamp(ramp.latitude, ramp.longitude) : undefined) || (ramp.state === "MO" ? getMissouriLakeForRamp(ramp.latitude, ramp.longitude) : undefined) || (ramp.state === "AR" ? getArkansasLakeForRamp(ramp.latitude, ramp.longitude) : undefined) || (ramp.state === "KS" ? getKansasLakeForRamp(ramp.latitude, ramp.longitude) : undefined) || (ramp.state === "FL" ? getFloridaLakeForRamp(ramp.latitude, ramp.longitude) : undefined);
  const county = getCountyForCity(ramp.city);
  const citySlug = ramp.city.toLowerCase().replace(/\s+/g, "-");
  // Use precomputed nearby data
  const nearbyData = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const data = require("@/data/nearby.json");
      return (data[ramp.id] || []).slice(0, 5);
    } catch { return []; }
  })();
  const nearby = nearbyData.length > 0
    ? nearbyData.map((n: { id: string; name: string; distance: number; city: string; state: string }) => {
        const found = unified.find((r) => r.id === n.id);
        return found ? { ...found, distanceMiles: n.distance } : null;
      }).filter(Boolean).slice(0, 4)
    : unified.filter((r) => r.id !== ramp.id && r.state === ramp.state).slice(0, 4);

  const faqs = buildFaqs(ramp);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${ramp.latitude},${ramp.longitude}`;
  const mapRamps = [{ id: ramp.id, name: ramp.name, latitude: ramp.latitude, longitude: ramp.longitude, city: ramp.city, lake: lake?.name }];

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "CivicStructure",
    name: ramp.name,
    description: ramp.description,
    geo: { "@type": "GeoCoordinates", latitude: ramp.latitude, longitude: ramp.longitude },
    address: { "@type": "PostalAddress", addressLocality: ramp.city, addressRegion: ramp.state || "US", addressCountry: "US" },
    publicAccess: true,
    url: `https://www.rampseeker.com/ramps/${ramp.id}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const stateSlugMap: Record<string, string> = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};
  const stateNameMap: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
  const bcState = stateNameMap[ramp.state] || ramp.state;
  const bcStateSlug = stateSlugMap[ramp.state] || ramp.state.toLowerCase();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
      { "@type": "ListItem", position: 2, name: bcState, item: `https://www.rampseeker.com/${bcStateSlug}` },
      ...(ramp.city ? [{ "@type": "ListItem", position: 3, name: ramp.city, item: `https://www.rampseeker.com/cities/${ramp.city.toLowerCase().replace(/\s+/g, "-")}` }] : []),
      { "@type": "ListItem", position: ramp.city ? 4 : 3, name: ramp.name, item: `https://www.rampseeker.com/ramps/${ramp.id}` },
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
        <Link href={`/${bcStateSlug}`} className="hover:text-water transition">{bcState}</Link><span>/</span>
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
        <p className="text-gray-500 mt-1">{ramp.city}, {bcState}{gl ? ` \u00b7 Operated by ${gl.operatedBy}` : ""}</p>
        {(ramp.rating > 0) && (
          <div className="flex items-center gap-0.5 mt-2">
            {[1,2,3,4,5].map((s) => <span key={s} className={s <= ramp.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 18 }}>&#9733;</span>)}
            {ramp.totalRatings > 0 && <span className="text-gray-400 text-xs ml-1">({ramp.totalRatings})</span>}
          </div>
        )}
      </div>

      {/* Map */}
      <RampMap ramps={mapRamps} center={[ramp.latitude, ramp.longitude]} zoom={14} height="400px" className="mb-8" />

      <AdSlot position="ramp-below-map" />

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
              <p className="text-gray-400 text-xs mt-3">
                <a href="mailto:hello@rampseeker.com?subject=Premium%20Listing%20Inquiry" className="text-water hover:underline">Want your business listed here?</a>
              </p>
              </div>
            </div>
          )}

          {/* Gear for featured ramps */}
          <GearRecommendation />
        </>
      )}

      {/* === BASIC (non-Grand Lake) CONTENT === */}
      {!gl && (() => {
        const stateRampCount = unified.filter(r => r.state === ramp.state).length;
        const waterBody = lake ? lake.name : ramp.description.match(/on\s+([\w\s]+(?:Lake|River|Creek|Reservoir|Bay|Sound|Harbor|Inlet))/i)?.[1] || null;
        return (
          <>
            {/* Location Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Location Details</h3>
              <p className="text-gray-600 text-sm mb-2">{ramp.address}</p>
              <p className="text-gray-400 text-xs font-mono">GPS: {ramp.latitude.toFixed(4)}, {ramp.longitude.toFixed(4)}</p>
              {ramp.county && <p className="text-gray-400 text-xs mt-1">County: {ramp.county}</p>}
            </div>

            {/* About This Ramp — unique generated description */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">About {ramp.name}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {ramp.name} is a public boat ramp located {ramp.city ? `in ${ramp.city}, ` : "in "}{bcState}{waterBody ? `, providing access to ${waterBody}` : ""}. This launch site is used by local boaters, anglers, and outdoor enthusiasts{ramp.rating > 3.5 ? " and is well-regarded by visitors" : ""}. GPS coordinates for navigation are {ramp.latitude.toFixed(4)}, {ramp.longitude.toFixed(4)}.
              </p>
              {ramp.rating > 0 && (
                <p className="text-gray-600 leading-relaxed text-sm mt-3">
                  Based on {ramp.totalRatings} Google review{ramp.totalRatings !== 1 ? "s" : ""}, {ramp.name} has earned a {ramp.rating}/5 star rating. {ramp.rating >= 4 ? "Visitors consistently praise this location as a solid launch point." : ramp.rating >= 3 ? "Reviews are generally positive with some room for improvement." : "Some visitors have noted areas for improvement — check recent reviews before heading out."}
                </p>
              )}
            </div>

            {/* What to Know */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <h3 className="font-[Cabin] font-bold text-water mb-3">What to Know Before You Go</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> {bcState} requires all motorized boats to be registered before launching at any public ramp.</li>
                <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public boat ramps in {bcState} are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
                <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Always check local water conditions and weather forecasts before heading to {ramp.name}.</li>
                <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep your boat in the parking area, not on the ramp.</li>
              </ul>
            </div>

            {/* Boating in [State] */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Boating in {bcState}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {bcState} offers {stateRampCount.toLocaleString()} boat ramps across the state, making it {stateRampCount > 1000 ? "one of the best states in America for boating access" : stateRampCount > 500 ? "a great state for boaters with plenty of launch options" : "home to a solid selection of boat launches"}. Whether you&apos;re fishing, skiing, or just cruising, {bcState} has something for every boater. <Link href={`/${bcStateSlug}`} className="text-water hover:underline">Browse all {stateRampCount.toLocaleString()} boat ramps in {bcState}</Link>.
              </p>
            </div>

            {/* Related Guides */}
            <div className="mb-6">
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Related Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/blog/how-to-launch-a-boat-safely", title: "How to Launch a Boat Safely", desc: "Step-by-step guide for beginners" },
                  { href: "/blog/boat-ramp-etiquette", title: "Boat Ramp Etiquette", desc: "10 unwritten rules every boater should know" },
                  { href: "/blog/public-vs-private-boat-ramps", title: "Public vs Private Ramps", desc: "Cost, access, and amenity differences" },
                ].map((g) => (
                  <Link key={g.href} href={g.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <p className="font-bold text-charcoal group-hover:text-water transition text-sm">{g.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{g.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Nearby Cities */}
            {ramp.city && (() => {
              const citiesInState = allCityPages.filter(c => c.state === ramp.state && c.name !== ramp.city).slice(0, 6);
              if (citiesInState.length === 0) return null;
              return (
                <div className="mb-6">
                  <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Nearby Cities with Boat Ramps</h3>
                  <div className="flex flex-wrap gap-2">
                    {citiesInState.map(c => (
                      <Link key={c.slug} href={`/cities/${c.slug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">
                        {c.name}, {c.state}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}
          </>
        );
      })()}

      {/* Trip Essentials Strip */}
      <div className="mb-10 bg-cream border border-gray-200 rounded-xl p-5">
        <p className="font-[Cabin] font-bold text-charcoal text-sm mb-3">Heading to the ramp? Don&apos;t forget:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: "Drain Plug", hook: "The one thing everyone forgets", q: "universal boat drain plug" },
            { name: "Floating Keychain", hook: "Because dropping keys ends the trip", q: "floating keychain boat" },
            { name: "Life Jacket", hook: "Required by law in most states", q: "type iii life jacket adult" },
          ].map((p) => (
            <a key={p.name} href={`https://www.amazon.com/s?k=${encodeURIComponent(p.q)}&tag=babymydog03-20`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-sunset hover:shadow-sm transition">
              <p className="font-bold text-charcoal text-sm">{p.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{p.hook}</p>
              <p className="text-sunset text-xs font-semibold mt-1">&#9733; Our Pick &mdash; Shop on Amazon</p>
            </a>
          ))}
        </div>
      </div>

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

      <FeaturedArticle listingSlug={ramp.id} />

      <AdSlot position="ramp-below-faq" />
      <CletusAd />

      {/* Nearby Ramps */}
      <div>
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby Ramps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nearby.map((n: { id: string; name: string; city: string; state: string; distanceMiles?: number }) => (
            <Link key={n.id} href={`/ramps/${n.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{n.name}</p>
              <p className="text-gray-500 text-sm">{n.city}, {n.state}{n.distanceMiles ? ` \u00b7 ${n.distanceMiles} mi` : ""}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* People Also Search For */}
      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">People Also Search For</h3>
        <div className="flex flex-wrap gap-2">
          <Link href={`/find/${citySlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Boat ramps near {ramp.city}</Link>
          {lake && (
            <Link href={lake.id === "grand-lake" ? "/grand-lake" : `/lakes/${lake.id}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">{lake.name} boat ramps</Link>
          )}
          {county && (
            <Link href={`/counties/${county.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">{county} County boat ramps</Link>
          )}
          <Link href={`/${bcStateSlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-water hover:border-water transition">Boat ramps in {bcState}</Link>
        </div>
      </div>

      <section className="mt-8 rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl leading-none">&#11088;</div>
          <div className="flex-1">
            <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-1">Manage or operate this ramp?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Claim your listing free, or upgrade to Featured for priority placement, photos, a customer message form, and a monthly performance report. <Link href="/pricing" className="text-water underline hover:text-water-light">See pricing</Link>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/claim?ramp=${encodeURIComponent(ramp.id)}&name=${encodeURIComponent(ramp.name)}`} className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-lg transition text-sm">
                Claim Free Listing
              </Link>
              <a href="https://buy.stripe.com/cNieVd9I96K3de9dDCcZa00" target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-lg transition text-sm">
                &#11088; Upgrade to Featured &mdash; $49.95/mo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
