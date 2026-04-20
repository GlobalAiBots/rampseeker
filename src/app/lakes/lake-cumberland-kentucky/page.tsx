import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Cumberland Boat Ramps — Launch Sites | RampSeeker",
  description: "Lake Cumberland, KY — 65,530 acres, houseboat capital of the world. Boat ramps, fishing, amenities, and local tips for 2026 anglers and visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-cumberland-kentucky" },
};

export default function LakeCumberlandKentuckyPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Cumberland?", a: "Lake Cumberland has roughly 20 public boat ramps operated by the U.S. Army Corps of Engineers and the Kentucky Department of Fish & Wildlife, along with marina ramps. Popular launches include Jamestown, Grider Hill, and the Wolf Creek Dam tailwater area. Most Corps ramps charge a small day-use fee and include paved launches and trailer parking." },
    { q: "What is the best time of year to fish Lake Cumberland?", a: "Spring (April through May) is prime time for striped bass and walleye on the main lake and in the major tributaries. Summer produces strong striper action on live shad at night. Fall brings aggressive smallmouth fishing on rocky points, and winter is reliable for deep-water stripers." },
    { q: "Do I need a fishing license for Lake Cumberland?", a: "Yes. Anglers 16 and older need a valid Kentucky fishing license. Striped bass anglers should also be aware of the lake&apos;s specific trophy striper regulations. Check Kentucky Fish & Wildlife for current length and creel limits." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Cumberland", description: "Lake Cumberland is a 65,530-acre Corps of Engineers reservoir on the Cumberland River in south-central Kentucky, often called the Houseboat Capital of the World.",
        geo: { "@type": "GeoCoordinates", latitude: 36.892, longitude: -85.148 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Kentucky", item: "https://www.rampseeker.com/kentucky" },
          { "@type": "ListItem", position: 3, name: "Lake Cumberland", item: "https://www.rampseeker.com/lakes/lake-cumberland-kentucky" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/kentucky" className="hover:text-water transition">Kentucky</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Cumberland</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Cumberland Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Cumberland is a 65,530-acre reservoir in south-central Kentucky, impounded by Wolf Creek Dam on the Cumberland River. Completed by the U.S. Army Corps of Engineers in 1952, the lake has roughly 1,255 miles of shoreline — more than the entire Pacific coast of California. <strong className="text-charcoal">Lake Cumberland is widely known as the &quot;Houseboat Capital of the World,&quot;</strong> with one of the largest houseboat rental fleets in North America based at its marinas.</p>
        <p>The lake threads through Russell, Wayne, Pulaski, Clinton, and McCreary counties. The surrounding terrain is classic Cumberland Plateau: steep wooded hillsides, sandstone cliffs, and deep, clear water. Most of the shoreline is undeveloped Corps land, which gives the lake an almost wilderness feel compared to more developed reservoirs. The lake is long and narrow, with dozens of major tributaries creating sheltered coves and bays.</p>
        <p>Fisheries management has been strong here for decades. Lake Cumberland is the birthplace of the modern striped bass fishery in inland reservoirs — stocked stripers here helped establish the practice across the Southeast. Walleye, smallmouth bass, trout in the tailwater, and a healthy crappie population round out the offerings. Between the houseboat vacations, the cliff jumping at Beaver Creek, and the tailwater trout fishing, Cumberland draws visitors from far beyond Kentucky.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "65,530" },
            { label: "Shoreline", value: "1,255 mi" },
            { label: "Max Depth", value: "~200 ft" },
            { label: "State", value: "Kentucky" },
            { label: "Nearest Towns", value: "Jamestown, Somerset, Burnside" },
            { label: "River System", value: "Cumberland" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-water font-[Cabin]">{s.value}</p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Notable Boat Ramps</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Jamestown Ramp:</strong> A Corps ramp on the north side of the lake near State Dock. Paved multi-lane access with courtesy docks and large trailer parking — one of the busiest launches during summer.</p>
          <p><strong className="text-charcoal">Grider Hill:</strong> Corps park and ramp near a full-service marina on the upper lake. Good access to the Illwill and Indian Creek arms and the striper water above.</p>
          <p><strong className="text-charcoal">Wolf Creek Dam tailwater access:</strong> For anglers targeting the trophy trout tailwater below the dam — boat and bank access are both available through Corps-managed points.</p>
          <p><strong className="text-charcoal">Burnside Island State Park:</strong> On the Big South Fork arm. Paved ramp, camping, and a quieter side of the lake.</p>
          <p><strong className="text-charcoal">Conley Bottom (public access):</strong> Popular ramp on the mid-lake with a marina alongside; fuel and bait available.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Striped Bass:</strong> Lake Cumberland is one of the most storied striper fisheries in the country. Live shad fished on planer boards and down-rods is the standard rig. Best action runs spring through early summer, then nighttime live-bait setups in mid-summer.</p>
          <p><strong className="text-charcoal">Walleye:</strong> Native Cumberland-strain walleye are making a strong return. Spring is prime, with fish staging in the river arms before moving to main-lake points in summer.</p>
          <p><strong className="text-charcoal">Smallmouth &amp; Largemouth Bass:</strong> Smallmouth thrive on the rocky main-lake structure; largemouth hold in the timbered creek backs. Spring and fall are the most productive.</p>
          <p><strong className="text-charcoal">Trout (tailwater):</strong> The Cumberland River tailwater below Wolf Creek Dam holds rainbow, brown, and brook trout and is managed as a world-class trout fishery.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Corps ramps typically charge a day-use fee; America the Beautiful passes are honored. Summer draws heavy houseboat and ski-boat traffic — mornings are quieter and cooler. The lake can drop noticeably during late summer drawdowns, so check current elevation before you trailer a big boat to a smaller ramp. For more launch options across the state, see our <Link href="/kentucky" className="text-water hover:underline">Kentucky boat ramps directory</Link>.</p>
      </section>

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

      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Related Lakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Dale Hollow Lake", href: "/lakes/dale-hollow-lake-tennessee-kentucky", info: "27,700 acres — TN/KY" },
            { name: "Norris Lake", href: "/lakes/norris-lake-tennessee", info: "33,840 acres — TN" },
            { name: "Lake Lanier", href: "/lakes/lake-lanier-georgia", info: "38,000 acres — GA" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{l.info}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="text-center mt-12">
        <Link href="/kentucky" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Kentucky &rarr;
        </Link>
      </div>
    </div>
  );
}
