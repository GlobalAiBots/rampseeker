import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toledo Bend Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Toledo Bend Reservoir, TX/LA. 181,600 acres — the largest man-made lake in the South with trophy bass fishing.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/toledo-bend-texas-louisiana" },
};

export default function ToledoBendTexasLouisianaPage() {
  const faqs = [
    { q: "How big is Toledo Bend Reservoir?", a: "Toledo Bend Reservoir covers 181,600 acres (approximately 284 square miles) with 1,200 miles of shoreline. It straddles the Texas-Louisiana border along the Sabine River, making it the largest man-made body of water in the South and one of the largest reservoirs in the United States." },
    { q: "Do I need a Texas or Louisiana license to fish Toledo Bend?", a: "It depends on which side you fish. If you stay on the Texas side, you need a Texas fishing license. If you fish the Louisiana side, you need a Louisiana license. A reciprocal agreement allows anglers to fish anywhere on the lake with a license from either state as long as they are in a boat — but shore fishing requires the license from the state you're standing in." },
    { q: "What is the best bait for bass on Toledo Bend?", a: "Soft plastics (Texas-rigged worms, creature baits, and flukes) are consistently productive year-round. In spring, spinnerbaits and squarebill crankbaits fished in shallow timber produce big fish. Summer and fall call for deep-diving crankbaits, Carolina rigs, and football jigs along offshore structure. Topwater frogs and buzzbaits are excellent over vegetation in warmer months." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Toledo Bend Reservoir", description: "Toledo Bend Reservoir is a 181,600-acre impoundment on the Sabine River straddling the Texas-Louisiana border, the largest man-made lake in the South.",
        geo: { "@type": "GeoCoordinates", latitude: 31.180, longitude: -93.564 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Texas", item: "https://www.rampseeker.com/texas" },
          { "@type": "ListItem", position: 3, name: "Toledo Bend", item: "https://www.rampseeker.com/lakes/toledo-bend-texas-louisiana" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/texas" className="hover:text-water transition">Texas</Link><span>/</span>
        <span className="text-charcoal font-medium">Toledo Bend</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Toledo Bend Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Toledo Bend Reservoir is a massive 181,600-acre impoundment on the Sabine River, straddling the border between Texas and Louisiana. Completed in 1966 as a joint project between the two states, the reservoir stretches approximately 65 miles north to south with 1,200 miles of winding shoreline. <strong className="text-charcoal">Toledo Bend is the largest man-made body of water in the South and consistently ranks among the top bass fishing lakes in America, with Bassmaster Magazine naming it the number-one bass lake in the country multiple times.</strong></p>
        <p>The reservoir was built primarily for hydroelectric power generation and water supply, but its exceptional fishery quickly became its defining feature. Toledo Bend&apos;s vast acreage encompasses an incredible diversity of habitat — flooded timber, creek channels, underwater ridges, grass beds, and miles of undeveloped shoreline. The Texas side of the lake is bordered by Newton, Sabine, and Shelby counties, while the Louisiana side spans Sabine and DeSoto parishes. Communities on both sides of the border, including Hemphill, Milam, Zwolle, and Many, serve as gateways to the lake.</p>
        <p>Toledo Bend&apos;s bass fishing reputation is built on consistent production of trophy largemouth. The lake&apos;s standing timber and abundant forage (shad, crawfish, and sunfish) create ideal growing conditions, and fish exceeding 10 pounds are caught regularly throughout the year. But Toledo Bend is more than a bass lake — the reservoir supports outstanding crappie fishing in its flooded timber, trophy catfish in the deep river channel, and respectable striped bass populations near the dam. The sheer size of the lake means there is always room to spread out, even on busy tournament weekends. Public boat ramps on both sides of the lake provide abundant access, with many offering paved lanes, courtesy docks, and ample parking.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "181,600" },
            { label: "Shoreline", value: "1,200 mi" },
            { label: "Max Depth", value: "110 ft" },
            { label: "States", value: "Texas / Louisiana" },
            { label: "Nearest Towns", value: "Hemphill, Milam, Many" },
            { label: "Length", value: "~65 mi N-S" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Toledo Bend</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass (Trophy):</strong> Toledo Bend is a bass angler&apos;s paradise. Spring (February-April) is prime for trophy fish as bass move shallow to spawn around flooded timber and creek mouths. Spinnerbaits, squarebill crankbaits, and Texas-rigged soft plastics are top producers. Summer and fall bring deep-structure patterns along creek channels and underwater ridges. Fish exceeding 10 pounds are realistic targets year-round.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Toledo Bend&apos;s standing timber creates world-class crappie habitat. Fish congregate around submerged trees in 12-20 feet from November through March. Minnows and small jigs fished with spider rigs are the standard approach. Spring spawning pushes crappie into shallow brush, providing excellent bank-accessible fishing.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Blue and channel catfish grow to impressive sizes in the deep river channel. Cut shad and live perch are top baits. Limb-lining and trotlining are popular methods on the lake. Trophy blue catfish exceeding 50 pounds are caught annually near the dam.</p>
          <p><strong className="text-charcoal">Striped Bass:</strong> Stocked striped bass provide fast action near the dam and in open water. Trolling live shad or deep-diving crankbaits along the old river channel is the primary method. Fall and winter are peak seasons as stripers chase schools of threadfin shad.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Toledo Bend</h2>
        <p className="text-gray-600 leading-relaxed">Toledo Bend has public boat ramps on both the Texas and Louisiana sides, operated by state agencies, counties, and the Sabine River Authority. Most are free with paved lanes and trailer parking. Browse ramps on our <Link href="/texas" className="text-water hover:underline">Texas boat ramps page</Link> and <Link href="/louisiana" className="text-water hover:underline">Louisiana boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or boat rentals on Toledo Bend? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings in the Toledo Bend area.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Toledo Bend</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Essentials for fishing Toledo Bend:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B001FWYGNA?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Zoom Brush Hog (6-inch)</a> — the ultimate Texas-rig bait for flipping into timber</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Strike King Red Eye Shad</a> — lipless crankbait for ripping through grass and around timber</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Garmin Striker Vivid Fish Finder</a> — navigate the flooded timber and locate creek channels</li>
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
