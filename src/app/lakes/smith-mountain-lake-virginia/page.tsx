import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smith Mountain Lake Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Smith Mountain Lake, Virginia. 20,600 acres known as the 'Jewel of the Blue Ridge' with excellent striped bass fishing.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/smith-mountain-lake-virginia" },
};

export default function SmithMountainLakeVirginiaPage() {
  const faqs = [
    { q: "What is Smith Mountain Lake known for?", a: "Smith Mountain Lake is known as the 'Jewel of the Blue Ridge' and is Virginia's second-largest body of fresh water. The lake is famous for its striped bass (striper) fishing, scenic Blue Ridge Mountain setting, and thriving lakeside communities. It is one of the most popular recreational lakes on the East Coast." },
    { q: "How deep is Smith Mountain Lake?", a: "Smith Mountain Lake has a maximum depth of approximately 220 feet near the dam. The average depth is about 55 feet. The deep, clear water in the main channel supports cold-water species like striped bass year-round, while the shallower coves and creek arms provide excellent habitat for largemouth bass and crappie." },
    { q: "Can you swim at Smith Mountain Lake boat ramps?", a: "While swimming is permitted in Smith Mountain Lake, it is not advisable to swim at active boat ramps due to boat traffic. The lake has several designated swim beaches and many private docks used for swimming. Smith Mountain Lake State Park has a public swim beach with lifeguards during summer months." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Smith Mountain Lake", description: "Smith Mountain Lake is a 20,600-acre reservoir in Virginia's Blue Ridge Mountains, known as the 'Jewel of the Blue Ridge' and famous for striped bass fishing.",
        geo: { "@type": "GeoCoordinates", latitude: 37.065, longitude: -79.568 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Virginia", item: "https://www.rampseeker.com/virginia" },
          { "@type": "ListItem", position: 3, name: "Smith Mountain Lake", item: "https://www.rampseeker.com/lakes/smith-mountain-lake-virginia" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/virginia" className="hover:text-water transition">Virginia</Link><span>/</span>
        <span className="text-charcoal font-medium">Smith Mountain Lake</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Smith Mountain Lake Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Smith Mountain Lake — known as the &quot;Jewel of the Blue Ridge&quot; — is a 20,600-acre reservoir nestled in the Blue Ridge Mountains of southwest Virginia. Created in 1966 by Appalachian Power Company&apos;s Smith Mountain Dam on the Roanoke River, the lake stretches across Bedford, Franklin, and Pittsylvania counties with 500 miles of heavily developed shoreline. <strong className="text-charcoal">Smith Mountain Lake is Virginia&apos;s second-largest body of fresh water and one of the most popular recreational lakes on the East Coast.</strong></p>
        <p>The lake&apos;s setting is its greatest asset — surrounded by the rolling foothills of the Blue Ridge Mountains, the views from the water are stunning in every season, with fall foliage drawing visitors from across the mid-Atlantic. The communities of Moneta, Huddleston, Hardy, and Penhook ring the shoreline, supporting a thriving tourism economy built around boating, fishing, and lakeside living. The lake is within easy reach of Roanoke, Lynchburg, and the Roanoke Valley, making it a popular weekend destination for millions of Virginians.</p>
        <p>Smith Mountain Lake&apos;s deep, clear water creates an exceptional multi-species fishery. The lake is best known for its landlocked striped bass population, which has produced fish exceeding 40 pounds. Largemouth and smallmouth bass provide excellent fishing in the shallower arms and along rocky shoreline, while crappie and catfish offer year-round opportunities. The Virginia Department of Wildlife Resources actively manages the fishery through stocking programs and habitat improvement. Public boat ramps are maintained by Appalachian Power, Virginia DGIF, and local counties, providing access points distributed around the lake&apos;s perimeter. Whether you&apos;re trolling for trophy stripers in the main channel or casting for largemouth in a quiet cove, Smith Mountain Lake delivers a premier Virginia fishing experience.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "20,600" },
            { label: "Shoreline", value: "500 mi" },
            { label: "Max Depth", value: "220 ft" },
            { label: "State", value: "Virginia" },
            { label: "Nearest Towns", value: "Moneta, Huddleston, Hardy" },
            { label: "Counties", value: "Bedford, Franklin, Pittsylvania" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Smith Mountain Lake</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Striped Bass:</strong> Smith Mountain Lake is one of the top striper lakes on the East Coast. Trophy fish exceeding 30 pounds are caught annually. Live bait (gizzard shad and herring) fished in the main channel during summer is the most productive method. Spring and fall produce excellent topwater striper action as fish chase baitfish schools near the surface.</p>
          <p><strong className="text-charcoal">Largemouth Bass:</strong> The lake&apos;s coves and creek arms hold excellent largemouth populations. Target shallow wood cover and docks in spring with jigs and soft plastics. Summer fish move to deeper brush piles and ledges. Fall provides aggressive feeding along the shoreline as bass prepare for winter.</p>
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> Rocky main-lake points and bluff walls hold good numbers of smallmouth. Drop-shot rigs, tube jigs, and small crankbaits are productive. Spring and fall are peak seasons, with fish often exceeding 3-4 pounds.</p>
          <p><strong className="text-charcoal">Crappie &amp; Catfish:</strong> Crappie fishing is excellent around standing timber and brush piles in 15-25 feet, especially in spring. Catfish are abundant and targeted with cut bait along the channel. Night fishing for catfish from the bank is a popular summer activity.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Smith Mountain Lake</h2>
        <p className="text-gray-600 leading-relaxed">Smith Mountain Lake has public boat ramps operated by Appalachian Power, Virginia DGIF, and local counties. Most are free and include paved lanes and trailer parking. Smith Mountain Lake State Park offers a well-maintained ramp with additional facilities. Browse all available ramps on our <Link href="/virginia" className="text-water hover:underline">Virginia boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals on Smith Mountain Lake? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Smith Mountain Lake area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Smith Mountain Lake</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Top gear picks for SML:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B0084BNGEK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Striper Umbrella Rig</a> — the go-to presentation for trophy striped bass in open water</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Strike King 6XD Deep Crankbait</a> — reaches the ledges where summer bass hold</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Garmin Striker Vivid Fish Finder</a> — locate striper schools in the deep main channel</li>
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
            { name: "Lake Erie", href: "/lakes/lake-erie-ohio", info: "9,910 sq mi — Great Lake" },
            { name: "Kentucky Lake", href: "/lakes/kentucky-lake-tennessee", info: "160,000 acres — TN/KY" },
            { name: "Table Rock Lake", href: "/lakes/table-rock-lake-missouri", info: "43,100 acres — MO" },
            { name: "Lake Okeechobee", href: "/lakes/lake-okeechobee-florida", info: "467,200 acres — FL" },
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
        <Link href="/virginia" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Virginia &rarr;
        </Link>
      </div>
    </div>
  );
}
