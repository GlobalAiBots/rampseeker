import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Erie Boat Ramps — Launch Sites | RampSeeker",
  description: "Find boat ramps and launch sites on Lake Erie, Ohio. The 'Walleye Capital of the World' with 312 miles of Ohio shoreline and world-class fishing.",
  alternates: { canonical: "https://rampseeker.com/lakes/lake-erie-ohio" },
};

export default function LakeErieOhioPage() {
  const faqs = [
    { q: "What is Lake Erie best known for fishing?", a: "Lake Erie is widely known as the 'Walleye Capital of the World.' The western basin, particularly the waters around Port Clinton, the Bass Islands, and the reef complex, supports the largest walleye population of any body of water in the world. The lake also offers world-class smallmouth bass, yellow perch, and steelhead fishing." },
    { q: "Do I need a special license to fish Lake Erie from Ohio?", a: "You need an Ohio fishing license with a Lake Erie permit endorsement. The Lake Erie permit covers both the lake and its tributaries up to the first dam or barrier. Non-resident licenses and permits are available. Check the Ohio Department of Natural Resources for current pricing and regulations." },
    { q: "What is the best time to fish Lake Erie for walleye?", a: "May and June are prime months for walleye in the western basin, with trolling crankbaits and harnesses being the most productive methods. The fall 'jig bite' from September through November produces big walleye in shallow reef areas. Ice fishing for walleye is also popular in the western basin when conditions allow." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Erie", description: "Lake Erie is the fourth-largest Great Lake by surface area and the shallowest, known worldwide as the 'Walleye Capital of the World.'",
        geo: { "@type": "GeoCoordinates", latitude: 41.684, longitude: -81.962 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Ohio", item: "https://rampseeker.com/ohio" },
          { "@type": "ListItem", position: 3, name: "Lake Erie", item: "https://rampseeker.com/lakes/lake-erie-ohio" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/ohio" className="hover:text-water transition">Ohio</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Erie</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Erie Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Erie is the fourth-largest of the five Great Lakes by surface area and the shallowest, covering approximately 9,910 square miles across parts of Ohio, Michigan, Pennsylvania, New York, and Ontario. Ohio&apos;s 312-mile northern shoreline provides the most accessible fishing waters on the lake, with major launch points at Port Clinton, Sandusky, Huron, Lorain, Cleveland, Fairport Harbor, and Ashtabula. <strong className="text-charcoal">Lake Erie&apos;s western basin is universally regarded as the Walleye Capital of the World, producing more walleye annually than any other body of water on earth.</strong></p>
        <p>The lake&apos;s three distinct basins — western, central, and eastern — each offer different fishing experiences. The shallow western basin (average depth 24 feet) holds the massive walleye spawning reefs that drive the fishery. The central basin deepens to 60 feet and supports excellent perch and walleye populations. The eastern basin reaches 210 feet and produces trophy smallmouth bass and steelhead. This diversity makes Lake Erie a year-round fishing destination, with something biting in every season from every port along Ohio&apos;s north coast.</p>
        <p>Beyond walleye, Lake Erie supports one of the most diverse freshwater fisheries in North America. Smallmouth bass fishing along the rocky central basin shoreline and around Kelleys Island is world-class, with fish routinely exceeding 5 pounds. Yellow perch provide outstanding fall and winter action, especially in the western basin. Steelhead trout run Lake Erie&apos;s tributaries from October through April, creating a unique river fishery fed by the Great Lake. Channel catfish, white bass, and freshwater drum round out the species list. Ohio&apos;s extensive network of public boat ramps — maintained by ODNR, city governments, and port authorities — makes Lake Erie one of the most accessible Great Lakes fisheries in the country.</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Total Area", value: "9,910 sq mi" },
            { label: "OH Shoreline", value: "312 mi" },
            { label: "Max Depth", value: "210 ft" },
            { label: "State (focus)", value: "Ohio" },
            { label: "Key Ports", value: "Port Clinton, Sandusky, Cleveland" },
            { label: "Type", value: "Great Lake" },
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
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Best Fishing at Lake Erie</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Walleye:</strong> The western basin walleye fishery is legendary. Spring trolling (May-June) with crankbaits and worm harnesses over the reef complex produces limits of eating-size fish. Fall jigging (September-November) around the islands targets trophy walleye exceeding 10 pounds. Drift-and-cast with blade baits is deadly in late fall.</p>
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> Lake Erie smallmouth are among the biggest in North America. Target rocky points, breakwalls, and island shorelines with drop-shot rigs, tube jigs, and ned rigs. May through October is prime, with fish commonly exceeding 4-5 pounds in the central basin.</p>
          <p><strong className="text-charcoal">Yellow Perch:</strong> Fall and early winter produce the best perch fishing, with spreader rigs tipped with minnows or shiners fished on the bottom in 25-40 feet. The western basin and Huron area are top perch destinations. Ice fishing for perch is a winter tradition when the lake freezes.</p>
          <p><strong className="text-charcoal">Steelhead &amp; Channel Catfish:</strong> Steelhead trout run the tributaries (Rocky River, Grand River, Conneaut Creek) from October through April. Channel catfish are caught throughout the lake on cut bait and nightcrawlers, with shore fishing near river mouths being especially productive in summer.</p>
        </div>
      </section>

      {/* Finding Boat Ramps */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Finding Boat Ramps on Lake Erie</h2>
        <p className="text-gray-600 leading-relaxed">Ohio&apos;s Lake Erie shoreline has dozens of public boat ramps operated by ODNR, city governments, and port authorities. Many are free or charge a nominal fee. Key ramp locations include Port Clinton, Catawba Island, Sandusky, Huron, Lorain, and Cleveland. Browse all available ramps on our <Link href="/ohio" className="text-water hover:underline">Ohio boat ramps page</Link>.</p>
      </section>

      {/* Nearby Marinas */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Nearby Marinas</h2>
        <p className="text-gray-600 leading-relaxed">Looking for marina services, fuel, or charter boats on Lake Erie? Check out <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeekerfor marina listings along Ohio&apos;s Lake Erie shoreline.</a></p>
      </section>

      {/* Gear */}
      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Gear for Lake Erie</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Essential gear for Lake Erie fishing:</p>
        <ul className="space-y-2 text-gray-600">
          <li>&bull; <a href="https://www.amazon.com/dp/B0084BNGEK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Rapala Husky Jerk (Glass Perch)</a> — the classic Lake Erie walleye trolling bait</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B07YJBMGPK?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Erie Dearie Spinner</a> — time-tested weight-forward spinner for walleye and perch</li>
          <li>&bull; <a href="https://www.amazon.com/dp/B08R7JXP1L?tag=babymydog03-20" target="_blank" rel="noopener noreferrer sponsored" className="text-water hover:underline">Garmin LiveScope Transducer</a> — real-time sonar for locating walleye schools on the reefs</li>
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
            { name: "Kentucky Lake", href: "/lakes/kentucky-lake-tennessee", info: "160,000 acres — TN/KY" },
            { name: "Lake of the Ozarks", href: "/lakes/lake-of-the-ozarks-missouri", info: "54,000 acres — MO" },
            { name: "Smith Mountain Lake", href: "/lakes/smith-mountain-lake-virginia", info: "20,600 acres — VA" },
            { name: "Table Rock Lake", href: "/lakes/table-rock-lake-missouri", info: "43,100 acres — MO" },
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
        <Link href="/ohio" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Ohio &rarr;
        </Link>
      </div>
    </div>
  );
}
