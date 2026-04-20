import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Fork Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Lake Fork, Texas. 27,690 acres of legendary bass fishing with GPS coordinates, amenities, and local tips.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-fork-texas" },
};

export default function LakeForkTexasPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Fork?", a: "Lake Fork has more than a dozen public boat ramps operated by the Sabine River Authority and Texas Parks & Wildlife. Most are free, paved, and offer courtesy docks. The busiest ramps include Lake Fork Marina, Minnow Bucket Marina, and the SRA ramps off Highway 154." },
    { q: "What is the best time of year to fish Lake Fork?", a: "Spring (March through May) is prime time for trophy largemouth bass as they move shallow to spawn. Fall (October through November) produces excellent crappie fishing and aggressive bass feeding before winter. Winter can be productive for big bass using slow-moving jigs and suspending jerkbaits." },
    { q: "Do I need a fishing license for Lake Fork?", a: "Yes. All anglers 17 and older need a valid Texas fishing license with a freshwater endorsement. Lake Fork also has special regulations including a slot limit on largemouth bass — fish between 16 and 24 inches must be released. Check Texas Parks & Wildlife for current rules." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Fork", description: "Lake Fork is a 27,690-acre reservoir in northeast Texas, widely regarded as the best trophy bass lake in America.",
        geo: { "@type": "GeoCoordinates", latitude: 32.882, longitude: -95.574 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Texas", item: "https://www.rampseeker.com/texas" },
          { "@type": "ListItem", position: 3, name: "Lake Fork", item: "https://www.rampseeker.com/lakes/lake-fork-texas" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/texas" className="hover:text-water transition">Texas</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Fork</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Fork Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Fork is a 27,690-acre reservoir in northeast Texas, impounded on Lake Fork Creek — a tributary of the Sabine River — in 1980. Built by the Sabine River Authority for water supply, the lake quickly became one of the most celebrated bass fisheries in the world. <strong className="text-charcoal">More than 60 percent of the Texas ShareLunker entries — bass weighing 13 pounds or more — have come from Lake Fork.</strong> The lake&apos;s slot limit, which requires the release of bass between 16 and 24 inches, has fueled decades of trophy-class growth.</p>
        <p>The reservoir sits in Wood, Rains, and Hopkins counties, surrounded by the small towns of Emory, Alba, and Quitman. Development along the shoreline is modest compared to many Texas lakes, which helps maintain water clarity and shoreline structure. Standing timber, creek channels, and hydrilla beds provide the complex habitat that largemouth bass need to reach double-digit weights. Lake Fork consistently ranks as one of the top five bass fishing destinations in America.</p>
        <p>Beyond bass, Lake Fork supports excellent crappie fishing — especially in spring around submerged brush piles — along with channel catfish, blue catfish, and various sunfish species. The lake draws tournament anglers from across the country, with major events running from February through November. Whether you&apos;re chasing a personal-best largemouth or filling a cooler with crappie, Lake Fork delivers year after year. The relatively rural setting, affordable lakeside lodging, and well-maintained public ramps make it one of the most accessible trophy fisheries in the South.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "27,690" },
            { label: "Shoreline", value: "315 mi" },
            { label: "Max Depth", value: "70 ft" },
            { label: "State", value: "Texas" },
            { label: "Nearest Towns", value: "Emory, Alba, Quitman" },
            { label: "Counties", value: "Wood, Rains, Hopkins" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Lake Fork</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass (Trophy):</strong> Lake Fork is synonymous with big bass. Spring spawning season (March-May) is peak time for fish over 10 pounds. Target shallow flats with soft plastics, spinnerbaits, and jigs. In summer, move to deeper timber and ledges with crankbaits and Carolina rigs. Fall produces aggressive topwater bites along creek channels.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Excellent spring crappie fishing around submerged brush piles and standing timber in 10-20 feet of water. Use minnows or small jigs. Fall crappie fishing can be equally productive as fish school up before winter.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Channel and blue catfish are abundant. Night fishing with cut shad or prepared bait along creek channels produces consistent catches year-round. Spring and summer are the most productive seasons.</p>
          <p><strong className="text-charcoal">Sunfish:</strong> Bluegill and other sunfish species thrive in shallow coves and along the shoreline. Great for family fishing with worms and crickets, especially May through September.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Lake Fork</h2>
        <p className="text-gray-600 leading-relaxed">Lake Fork has numerous public boat ramps maintained by the Sabine River Authority and Texas Parks &amp; Wildlife. Most ramps are free, paved, and include courtesy docks and trailer parking. Browse all available ramps across the state on our <Link href="/texas" className="text-water hover:underline">Texas boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals near Lake Fork? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Lake Fork area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Lake Fork</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Heading to Lake Fork? Here are a few essentials:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Strike King KVD Jerkbait</a> — a go-to for trophy bass in cooler water</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Garmin Striker Vivid Fish Finder</a> — locate submerged timber and brush piles</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B001FWYGNA?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">YUM Dinger Worm (5-inch)</a> — the most productive soft plastic on Lake Fork</li>
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
            { name: "Lake Okeechobee", href: "/lakes/lake-okeechobee-florida", info: "467,200 acres — FL" },
            { name: "Kentucky Lake", href: "/lakes/kentucky-lake-tennessee", info: "160,000 acres — TN/KY" },
            { name: "Lake of the Ozarks", href: "/lakes/lake-of-the-ozarks-missouri", info: "54,000 acres — MO" },
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
        <Link href="/texas" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Texas &rarr;
        </Link>
      </div>
    </div>
  );
}
