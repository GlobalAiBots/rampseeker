import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kentucky Lake Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Kentucky Lake, TN/KY. 160,000 acres — the largest TVA reservoir with excellent crappie and bass fishing.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/kentucky-lake-tennessee" },
};

export default function KentuckyLakeTennesseePage() {
  const faqs = [
    { q: "How big is Kentucky Lake?", a: "Kentucky Lake covers approximately 160,000 acres (250 square miles) with 2,064 miles of shoreline. It stretches 184 miles from near Gilbertsville, Kentucky to Pickwick Dam in Tennessee, making it the largest reservoir east of the Mississippi River and the largest TVA reservoir by surface area." },
    { q: "What is the best fishing on Kentucky Lake?", a: "Kentucky Lake is best known for its crappie fishing, which is among the best in the country. The lake also supports excellent largemouth and smallmouth bass populations, particularly around the Paris Landing area and the Blood River embayment. Catfish and sauger round out the year-round fishing opportunities." },
    { q: "Is Kentucky Lake in Tennessee or Kentucky?", a: "Kentucky Lake spans both states. The southern portion lies in Tennessee (Henry, Benton, Decatur, and Hardin counties), while the northern section is in Kentucky (Marshall, Calloway, Trigg, and Livingston counties). The dam is located near Gilbertsville, Kentucky. Anglers need the appropriate state license for the waters they fish." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Kentucky Lake", description: "Kentucky Lake is a 160,000-acre TVA reservoir on the Tennessee River spanning Tennessee and Kentucky, the largest reservoir east of the Mississippi.",
        geo: { "@type": "GeoCoordinates", latitude: 36.504, longitude: -88.069 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Tennessee", item: "https://www.rampseeker.com/tennessee" },
          { "@type": "ListItem", position: 3, name: "Kentucky Lake", item: "https://www.rampseeker.com/lakes/kentucky-lake-tennessee" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/tennessee" className="hover:text-water transition">Tennessee</Link><span>/</span>
        <span className="text-charcoal font-medium">Kentucky Lake</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Kentucky Lake Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Kentucky Lake is a 160,000-acre reservoir on the Tennessee River, created by Kentucky Dam near Gilbertsville, Kentucky — the largest dam in the Tennessee Valley Authority (TVA) system. Completed in 1944 as part of the TVA&apos;s comprehensive flood control and navigation program, the lake stretches 184 miles from the dam south to Pickwick Dam in Tennessee, with 2,064 miles of shoreline spanning both states. <strong className="text-charcoal">Kentucky Lake is the largest reservoir east of the Mississippi River and one of the most popular fishing and recreation destinations in the entire Southeast.</strong></p>
        <p>The lake&apos;s western Tennessee section, anchored by the Paris Landing area in Henry County, is the heart of the fishery. Massive embayments like Blood River, Big Sandy, and the West Sandy provide thousands of acres of shallow, protected water ideal for crappie and bass. The Kentucky side features the Land Between the Lakes National Recreation Area — a 170,000-acre peninsula separating Kentucky Lake from neighboring Lake Barkley — offering unmatched public access to hunting, camping, and shoreline fishing.</p>
        <p>Kentucky Lake is perhaps best known as a crappie fishing destination, producing some of the biggest crappie tournaments in the country. But the lake&apos;s bass fishing is equally impressive — both largemouth and smallmouth bass thrive in the lake&apos;s diverse habitat of ledges, flats, timber, and riprap. Catfish grow to trophy sizes in the deep river channel, and sauger provide excellent winter fishing below the dams. The TVA, Army Corps of Engineers, and state agencies on both sides maintain an extensive network of public boat ramps, making Kentucky Lake one of the most accessible large reservoirs in America. Whether you&apos;re spider-rigging for crappie in a quiet embayment or ledge fishing for summer bass in the main channel, Kentucky Lake offers a world-class experience on a massive scale.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "160,000" },
            { label: "Shoreline", value: "2,064 mi" },
            { label: "Max Depth", value: "75 ft" },
            { label: "States", value: "Tennessee / Kentucky" },
            { label: "Key Areas", value: "Paris Landing, Blood River, LBL" },
            { label: "Length", value: "184 mi" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Kentucky Lake</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass:</strong> Kentucky Lake&apos;s shallow embayments and flooded timber provide excellent largemouth habitat. Spring spawning runs in March-April produce big fish in the Blood River and Big Sandy areas. Summer ledge fishing along the main Tennessee River channel is a regional specialty, with crankbaits and big worms targeting schools of bass on offshore structure.</p>
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> Main-lake points, riprap, and rocky shorelines hold smallmouth throughout the year. Drop-shot rigs, tube jigs, and crankbaits are productive. Fall is peak season as smallmouth feed aggressively on shad schools along the main channel.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Kentucky Lake is one of the premier crappie fisheries in America. Spider-rigging with minnows or jigs over submerged brush and stakebeds produces consistent catches from October through May. The Paris Landing area and Blood River embayment are legendary crappie destinations.</p>
          <p><strong className="text-charcoal">Catfish &amp; Sauger:</strong> Blue and channel catfish grow large in the river channel. Sauger fishing below Kentucky Dam and Pickwick Dam is excellent from November through March, with vertical jigging and live minnows being the most productive methods.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Kentucky Lake</h2>
        <p className="text-gray-600 leading-relaxed">Kentucky Lake has dozens of public boat ramps on both the Tennessee and Kentucky sides, operated by TVA, the Army Corps of Engineers, state parks, and county governments. Most are free with paved lanes and trailer parking. Browse all available ramps on our <Link href="/tennessee" className="text-water hover:underline">Tennessee boat ramps page</Link> and <Link href="/kentucky" className="text-water hover:underline">Kentucky boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals on Kentucky Lake? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Kentucky Lake area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Kentucky Lake</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Must-haves for Kentucky Lake:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B0084BNGEK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Bandit 300 Series Crankbait</a> — the ledge-fishing standard for summer bass on the Tennessee River</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">B&apos;n&apos;M Buck&apos;s Graphite Crappie Rod</a> — purpose-built for spider-rigging in Kentucky Lake&apos;s embayments</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Humminbird Helix Fish Finder</a> — locate ledges, brush piles, and crappie schools</li>
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
            { name: "Toledo Bend", href: "/lakes/toledo-bend-texas-louisiana", info: "181,600 acres — TX/LA" },
            { name: "Lake Fork", href: "/lakes/lake-fork-texas", info: "27,690 acres — TX" },
            { name: "Lake of the Ozarks", href: "/lakes/lake-of-the-ozarks-missouri", info: "54,000 acres — MO" },
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
        <Link href="/tennessee" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Tennessee &rarr;
        </Link>
      </div>
    </div>
  );
}
