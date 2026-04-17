import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Okeechobee Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Lake Okeechobee, Florida. 467,200 acres of legendary bass fishing — the largest lake in Florida.",
  alternates: { canonical: "https://rampseeker.com/lakes/lake-okeechobee-florida" },
};

export default function LakeOkeechobeeFloridaPage() {
  const faqs = [
    { q: "How big is Lake Okeechobee?", a: "Lake Okeechobee covers approximately 730 square miles (467,200 acres), making it the largest freshwater lake in Florida and the seventh-largest natural lake in the United States. Despite its massive surface area, the lake is remarkably shallow with a maximum depth of only 12 feet." },
    { q: "What is the best season to fish Lake Okeechobee?", a: "Fall and winter (October through February) are the prime seasons for largemouth bass on Lake Okeechobee. The cooler water pushes bass into predictable patterns around vegetation lines and shell beds. Spring is excellent for spawning bass in shallow emergent grass. Summer can be productive early and late in the day." },
    { q: "Are there alligators in Lake Okeechobee?", a: "Yes, American alligators are common in and around Lake Okeechobee. Use caution when wading, fishing from shore, or handling fish near the water's edge. Keep pets and small children away from the shoreline. Alligators are generally not aggressive but should always be respected." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Okeechobee", description: "Lake Okeechobee is the largest freshwater lake in Florida, covering 730 square miles. Known as 'The Big O,' it is one of the premier bass fishing destinations in the United States.",
        geo: { "@type": "GeoCoordinates", latitude: 26.946, longitude: -80.830 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Florida", item: "https://rampseeker.com/florida" },
          { "@type": "ListItem", position: 3, name: "Lake Okeechobee", item: "https://rampseeker.com/lakes/lake-okeechobee-florida" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/florida" className="hover:text-water transition">Florida</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Okeechobee</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Okeechobee Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Okeechobee — known to locals and anglers everywhere as &quot;The Big O&quot; — is the largest freshwater lake in Florida and one of the most iconic bass fishing destinations in the world. Covering approximately 730 square miles in south-central Florida, the lake is encircled by the Herbert Hoover Dike and bordered by communities including Clewiston, Okeechobee, Belle Glade, and Pahokee. <strong className="text-charcoal">The Big O has produced more tournament-winning bass catches than virtually any other lake in America.</strong></p>
        <p>Despite its enormous surface area, Lake Okeechobee is remarkably shallow — the maximum depth is only about 12 feet, and much of the lake averages 6 to 9 feet. This shallow profile, combined with a subtropical climate and vast expanses of emergent and submersed vegetation, creates ideal habitat for largemouth bass, crappie (locally called speckled perch), bluegill, and catfish. The lake&apos;s famous &quot;grass lines&quot; — edges where cattails, bulrush, and kissimmee grass meet open water — are the primary targets for bass anglers.</p>
        <p>Lake Okeechobee&apos;s history is deeply intertwined with the Everglades ecosystem and South Florida water management. The lake serves as a critical component of the Central and Southern Florida Flood Control Project, and water levels are managed by the Army Corps of Engineers. Fishing guides have worked these waters for generations, and the local knowledge base is unmatched. The lake supports a thriving guide industry, multiple marinas, and hosts dozens of bass tournaments annually. Whether you&apos;re flipping jigs into thick vegetation or drifting shiners along the outside grass edge, Lake Okeechobee rewards anglers who understand its shallow, vegetation-rich character.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "467,200" },
            { label: "Shoreline", value: "135 mi" },
            { label: "Max Depth", value: "12 ft" },
            { label: "State", value: "Florida" },
            { label: "Nearest Towns", value: "Clewiston, Okeechobee, Belle Glade" },
            { label: "Area", value: "730 sq mi" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-water font-[Cabin]">{s.value}</p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Fishing */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Lake Okeechobee</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass:</strong> The Big O is a bass factory. Fall and winter are prime, with fish stacking up along vegetation edges. Flip jigs and soft plastics into thick grass, or fish wild shiners along the outside grass lines. Spring spawning produces big females on beds in 2-4 feet of water.</p>
          <p><strong className="text-charcoal">Crappie (Speckled Perch):</strong> Winter is crappie season on Okeechobee. Fish move into brush piles and emergent vegetation in December through February. Minnows fished under corks or small jigs produce limits of slab crappie, often exceeding 2 pounds.</p>
          <p><strong className="text-charcoal">Bluegill:</strong> Abundant throughout the lake, especially in spring and summer. Crickets and red worms fished near shoreline vegetation produce excellent catches. Great for family fishing trips.</p>
          <p><strong className="text-charcoal">Catfish &amp; Bowfin:</strong> Channel catfish and mudfish (bowfin) are plentiful. Cut bait fished on the bottom along the rim canal is the standard approach. Bowfin are aggressive and provide strong fights on light tackle.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Lake Okeechobee</h2>
        <p className="text-gray-600 leading-relaxed">Lake Okeechobee has public boat ramps at several locations around its perimeter, including facilities at Clewiston, Okeechobee, Belle Glade, and Pahokee. Most are maintained by county or state agencies. Browse all available ramps on our <Link href="/florida" className="text-water hover:underline">Florida boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals near Lake Okeechobee? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Lake Okeechobee area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Lake Okeechobee</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Essentials for fishing The Big O:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B0BSHTRM3Z?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Booyah Pad Crasher Frog</a> — topwater frog for fishing over thick vegetation mats</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B001FWYGNA?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Zoom Magnum Trick Worm</a> — versatile soft plastic for flipping into grass</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Strike King Hack Attack Jig</a> — heavy-cover jig built for punching through vegetation</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-gray-50 rounded-lg">
              <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">{f.q}</summary>
              <p className="px-4 pb-3 text-gray-600 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Lakes */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Related Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Lake Fork", href: "/lakes/lake-fork-texas", info: "27,690 acres — TX" },
            { name: "Toledo Bend", href: "/lakes/toledo-bend-texas-louisiana", info: "181,600 acres — TX/LA" },
            { name: "Kentucky Lake", href: "/lakes/kentucky-lake-tennessee", info: "160,000 acres — TN/KY" },
            { name: "Lake Erie", href: "/lakes/lake-erie-ohio", info: "9,910 sq mi — Great Lake" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{l.info}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link href="/florida" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Florida &rarr;
        </Link>
      </div>
    </div>
  );
}
