import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake of the Ozarks Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Lake of the Ozarks, Missouri. 54,000 acres with 1,150 miles of shoreline — more than the California coast.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-of-the-ozarks-missouri" },
};

export default function LakeOfTheOzarksMissouriPage() {
  const faqs = [
    { q: "How many miles of shoreline does Lake of the Ozarks have?", a: "Lake of the Ozarks has approximately 1,150 miles of shoreline — more than the entire coast of California. This massive shoreline is the result of the lake's winding, serpentine shape created by flooding the Osage River valley and its many tributary arms." },
    { q: "Is Lake of the Ozarks good for fishing?", a: "Absolutely. Lake of the Ozarks supports excellent populations of largemouth bass, crappie, catfish, white bass, and walleye. The lake's diverse structure — including bluffs, docks, brush piles, and creek channels — provides year-round fishing opportunities. Spring and fall are peak seasons for bass and crappie." },
    { q: "Do you need a boat to fish Lake of the Ozarks?", a: "While a boat gives you the most access, several public areas offer bank fishing, fishing docks, and wade-accessible coves. The state park at the lake's east end has a public fishing dock. Many resorts and marinas also offer fishing boat rentals for visitors without their own watercraft." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake of the Ozarks", description: "Lake of the Ozarks is a 54,000-acre reservoir in central Missouri with 1,150 miles of shoreline, known as 'The Magic Dragon.'",
        geo: { "@type": "GeoCoordinates", latitude: 38.115, longitude: -92.680 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Missouri", item: "https://www.rampseeker.com/missouri" },
          { "@type": "ListItem", position: 3, name: "Lake of the Ozarks", item: "https://www.rampseeker.com/lakes/lake-of-the-ozarks-missouri" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/missouri" className="hover:text-water transition">Missouri</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake of the Ozarks</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake of the Ozarks Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake of the Ozarks — often called &quot;The Magic Dragon&quot; for its winding, serpentine shape — is a 54,000-acre reservoir in central Missouri created by the impoundment of the Osage River in 1931. Bagnell Dam, one of the largest hydroelectric dams in the world at the time of its completion, backs up water for 92 miles through the Ozark hills. <strong className="text-charcoal">The result is 1,150 miles of shoreline — more than the entire coast of California — making it one of the most developed recreational lakes in the Midwest.</strong></p>
        <p>The lake is anchored by the communities of Osage Beach and Lake Ozark, which serve as the commercial and entertainment hubs of the region. The lake&apos;s long, narrow arms reach deep into Camden, Miller, Morgan, and Benton counties, creating an almost endless supply of coves, points, and bluff walls. Lakeside development includes thousands of private docks, hundreds of resorts and restaurants, and a vibrant summer tourism economy that draws millions of visitors annually from Kansas City, St. Louis, and beyond.</p>
        <p>For anglers, Lake of the Ozarks is a year-round fishery with diverse opportunities. Largemouth bass thrive in the dock-heavy upper lake and stained-water arms. Crappie congregate around brush piles and standing timber, especially in spring. Channel and blue catfish grow to impressive sizes in the main channel, while white bass and walleye provide fast action during their spring spawning runs. The lake&apos;s depth — reaching 130 feet near the dam — creates distinct seasonal patterns that keep experienced anglers coming back. Public boat ramps are scattered along the lake&apos;s length, with some of the best-maintained facilities operated by Missouri State Parks.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "54,000" },
            { label: "Shoreline", value: "1,150 mi" },
            { label: "Max Depth", value: "130 ft" },
            { label: "State", value: "Missouri" },
            { label: "Nearest Towns", value: "Osage Beach, Lake Ozark" },
            { label: "Counties", value: "Camden, Miller, Morgan, Benton" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Lake of the Ozarks</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass:</strong> The lake&apos;s thousands of boat docks create ideal bass habitat. Target docks with jigs, shaky heads, and soft plastics in spring and summer. Fall brings topwater action along secondary points and creek mouths. The upper lake arms tend to hold more and bigger bass due to stained water and abundant cover.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Spring (March-April) is prime time for crappie around brush piles in 8-15 feet of water. Local anglers maintain extensive brush pile maps. Minnows and tube jigs are the top presentations. Fall crappie fishing in the main lake arms can be outstanding.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Channel and blue catfish thrive in the deep main channel. Cut shad, chicken liver, and prepared baits fished on the bottom produce consistent catches. Trophy blues exceeding 40 pounds are caught annually near the dam.</p>
          <p><strong className="text-charcoal">White Bass &amp; Walleye:</strong> Both species make spawning runs up tributary arms in March and April. White bass provide fast action on small crankbaits and in-line spinners. Walleye are less abundant but targeted by trolling deep-diving crankbaits along the main channel ledges.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Lake of the Ozarks</h2>
        <p className="text-gray-600 leading-relaxed">Lake of the Ozarks has numerous public boat ramps operated by Missouri State Parks, the Army Corps of Engineers, and county governments. Many are free, though some charge a small launch fee during peak season. Browse all available ramps on our <Link href="/missouri" className="text-water hover:underline">Missouri boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals near Lake of the Ozarks? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Lake of the Ozarks area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Lake of the Ozarks</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Top picks for fishing the Ozarks:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B0084BNGEK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Strike King Bitsy Bug Jig</a> — dock-skipping jig perfect for the lake&apos;s endless boat docks</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Rapala Shad Rap</a> — crankbait for targeting crappie and white bass in the arms</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Humminbird Helix Fish Finder</a> — essential for locating brush piles and channel ledges</li>
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
            { name: "Table Rock Lake", href: "/lakes/table-rock-lake-missouri", info: "43,100 acres — MO" },
            { name: "Kentucky Lake", href: "/lakes/kentucky-lake-tennessee", info: "160,000 acres — TN/KY" },
            { name: "Lake Erie", href: "/lakes/lake-erie-ohio", info: "9,910 sq mi — Great Lake" },
            { name: "Smith Mountain Lake", href: "/lakes/smith-mountain-lake-virginia", info: "20,600 acres — VA" },
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
        <Link href="/missouri" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Missouri &rarr;
        </Link>
      </div>
    </div>
  );
}
