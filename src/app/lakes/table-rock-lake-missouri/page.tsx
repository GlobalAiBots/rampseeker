import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table Rock Lake Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Table Rock Lake, Missouri. 43,100 acres of crystal-clear water near Branson with excellent smallmouth bass fishing.",
  alternates: { canonical: "https://rampseeker.com/lakes/table-rock-lake-missouri" },
};

export default function TableRockLakeMissouriPage() {
  const faqs = [
    { q: "Why is Table Rock Lake so clear?", a: "Table Rock Lake's exceptional water clarity comes from its Ozark limestone geology. The rocky substrate filters sediment naturally, and the lake's deep profile (up to 220 feet) allows suspended particles to settle. The clear water supports excellent populations of smallmouth bass and makes Table Rock a popular destination for scuba diving and swimming." },
    { q: "What is Table Rock Lake best known for?", a: "Table Rock Lake is best known for its crystal-clear water, excellent smallmouth bass fishing, and proximity to Branson, Missouri. The lake is one of the top smallmouth bass fisheries in the country, and its scenic Ozark setting attracts millions of visitors annually for boating, fishing, swimming, and water sports." },
    { q: "Can you camp near Table Rock Lake boat ramps?", a: "Yes. The Army Corps of Engineers operates several campgrounds around Table Rock Lake with sites near boat ramps. Popular options include Indian Point, Baxter, and Viney Creek campgrounds. Missouri State Parks also operates Table Rock State Park with camping facilities. Reservations are recommended during summer months." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Table Rock Lake", description: "Table Rock Lake is a 43,100-acre reservoir in southwest Missouri near Branson, known for crystal-clear water and excellent smallmouth bass fishing.",
        geo: { "@type": "GeoCoordinates", latitude: 36.601, longitude: -93.310 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Missouri", item: "https://rampseeker.com/missouri" },
          { "@type": "ListItem", position: 3, name: "Table Rock Lake", item: "https://rampseeker.com/lakes/table-rock-lake-missouri" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/missouri" className="hover:text-water transition">Missouri</Link><span>/</span>
        <span className="text-charcoal font-medium">Table Rock Lake</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Table Rock Lake Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Table Rock Lake is a 43,100-acre reservoir in southwest Missouri, created in 1958 by the impoundment of the White River by Table Rock Dam. Located just minutes from Branson, the lake stretches across Taney, Stone, and Barry counties with 745 miles of winding Ozark shoreline. <strong className="text-charcoal">Table Rock&apos;s crystal-clear water and deep limestone bluffs make it one of the most scenic — and productive — fishing lakes in the central United States.</strong></p>
        <p>The lake is part of a chain of three Army Corps of Engineers reservoirs along the White River, sitting upstream of Lake Taneycomo and Bull Shoals Lake. This chain creates a unique fishery corridor that supports both warm-water and cold-water species. Table Rock&apos;s depth is its defining feature — the lake reaches 220 feet near the dam, with vast expanses of 40 to 80-foot water in the main channel. The clear water and rocky structure are ideal for smallmouth bass, which have made Table Rock one of the premier smallmouth fisheries in the country.</p>
        <p>Beyond fishing, Table Rock Lake is a major recreational destination. The Branson area draws millions of tourists annually for entertainment, and the lake serves as the outdoor centerpiece of the region. Boating, swimming, scuba diving, and water sports are popular throughout the summer. Silver Dollar City, one of the Midwest&apos;s largest theme parks, sits within minutes of the lake. The Army Corps of Engineers maintains numerous public boat ramps, swim beaches, and campgrounds around the shoreline, making Table Rock one of the most accessible major lakes in Missouri. Whether you&apos;re casting for smallmouth along a bluff wall or cruising the open main channel, Table Rock Lake delivers a world-class experience.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "43,100" },
            { label: "Shoreline", value: "745 mi" },
            { label: "Max Depth", value: "220 ft" },
            { label: "State", value: "Missouri" },
            { label: "Nearest Towns", value: "Branson, Kimberling City, Shell Knob" },
            { label: "Counties", value: "Taney, Stone, Barry" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Table Rock Lake</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass:</strong> Target largemouth in the stained-water upper arms where cover is more abundant. Spring brings fish shallow for spawning along gravel banks and brush. Jigs, spinnerbaits, and crankbaits produce throughout the season. Summer fish relate to deep docks and brush piles in 15-25 feet.</p>
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> Table Rock is a top-tier smallmouth fishery. Fish bluff walls, rocky points, and main-lake structure with drop-shot rigs, ned rigs, and small crankbaits. Spring and fall are peak seasons, with fish often exceeding 4 pounds. The clear water demands light line and finesse presentations.</p>
          <p><strong className="text-charcoal">White Bass:</strong> White bass make aggressive spawning runs up the James River and Long Creek arms in March and April. Small in-line spinners, grubs, and slabs produce fast action. Schooling white bass in open water during summer provide exciting topwater fishing.</p>
          <p><strong className="text-charcoal">Crappie &amp; Walleye:</strong> Crappie hold around brush piles and standing timber in 15-30 feet. Walleye are targeted by trolling nightcrawler harnesses and deep crankbaits along the main channel. Both species are best in spring and fall.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Table Rock Lake</h2>
        <p className="text-gray-600 leading-relaxed">Table Rock Lake has numerous public boat ramps operated by the Army Corps of Engineers. Most are free, well-maintained, and include paved lanes, courtesy docks, and trailer parking. Browse all available ramps on our <Link href="/missouri" className="text-water hover:underline">Missouri boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals near Table Rock Lake? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Table Rock Lake area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Table Rock Lake</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Must-haves for Table Rock&apos;s clear water:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B07KW3LMYC?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Z-Man Ned Rig Kit</a> — the go-to finesse presentation for clear-water smallmouth</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Seaguar Fluorocarbon Line (6lb)</a> — invisible line is essential in Table Rock&apos;s clear water</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Rapala DT-6 Crankbait (Shad pattern)</a> — match the hatch for smallmouth and white bass</li>
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
            { name: "Lake of the Ozarks", href: "/lakes/lake-of-the-ozarks-missouri", info: "54,000 acres — MO" },
            { name: "Smith Mountain Lake", href: "/lakes/smith-mountain-lake-virginia", info: "20,600 acres — VA" },
            { name: "Lake Fork", href: "/lakes/lake-fork-texas", info: "27,690 acres — TX" },
            { name: "Kentucky Lake", href: "/lakes/kentucky-lake-tennessee", info: "160,000 acres — TN/KY" },
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
