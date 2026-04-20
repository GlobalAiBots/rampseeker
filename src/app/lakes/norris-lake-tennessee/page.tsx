import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Norris Lake Boat Ramps — Launch Sites | RampSeeker",
  description: "Norris Lake, TN — 33,840 acres of clear mountain water on the Clinch and Powell rivers. Boat ramps, fishing, amenities, and local tips for 2026 visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/norris-lake-tennessee" },
};

export default function NorrisLakeTennesseePage() {
  const faqs = [
    { q: "How many boat ramps are on Norris Lake?", a: "Norris Lake has more than 15 public boat ramps operated by the Tennessee Valley Authority, Tennessee Wildlife Resources Agency, and state parks, along with marina ramps. Popular options include Big Ridge State Park, Loyston Point, and the Norris Dam tailwater area. Most TVA and state ramps are free or low-cost with paved launches." },
    { q: "What is the best time of year to fish Norris Lake?", a: "Spring (April through May) brings the strongest smallmouth bass action as fish move shallow onto rocky points and secondary creek arms. Striped bass fishing peaks in fall and early spring when schools chase bait on the main lake. Summer walleye fishing is steady on deep main-lake humps and channel breaks." },
    { q: "Do I need a fishing license for Norris Lake?", a: "Yes. Anglers 13 and older need a valid Tennessee fishing license. Norris Lake follows statewide regulations for bass, striped bass, and walleye — check Tennessee Wildlife Resources Agency for current length and bag limits." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Norris Lake", description: "Norris Lake is a 33,840-acre TVA reservoir on the Clinch and Powell rivers in east Tennessee, known for clear water and excellent smallmouth and striper fishing.",
        geo: { "@type": "GeoCoordinates", latitude: 36.294, longitude: -83.927 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Tennessee", item: "https://www.rampseeker.com/tennessee" },
          { "@type": "ListItem", position: 3, name: "Norris Lake", item: "https://www.rampseeker.com/lakes/norris-lake-tennessee" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/tennessee" className="hover:text-water transition">Tennessee</Link><span>/</span>
        <span className="text-charcoal font-medium">Norris Lake</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Norris Lake Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Norris Lake is a 33,840-acre reservoir in east Tennessee, formed by the Tennessee Valley Authority&apos;s Norris Dam on the Clinch River at its confluence with the Powell River. Completed in 1936 as the TVA&apos;s first project, Norris set the template for the entire TVA reservoir system. <strong className="text-charcoal">The lake is widely regarded as one of the cleanest and clearest reservoirs in the Southeast</strong> — a big reason it has become a weekend destination for boaters and anglers from Knoxville, the Tri-Cities, and beyond.</p>
        <p>The lake has about 800 miles of shoreline and sprawls across Anderson, Campbell, Claiborne, Grainger, and Union counties, with steep wooded ridges dropping straight into deep water. Shoreline development is moderate, concentrated around a handful of marinas, with large stretches of TVA land keeping the backdrop forested. Water clarity regularly stretches 15 feet or more, a rarity east of the Mississippi.</p>
        <p>Fishing is the marquee draw. Norris produced a Tennessee state record smallmouth bass and is a consistent top-tier smallmouth destination. Striped bass were introduced decades ago and the lake now supports a well-known trophy striper fishery. Walleye — both native and stocked — round out the gamefish, along with crappie, channel catfish, and bluegill. Houseboat rentals and lakeside cabins make multi-day trips easy.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "33,840" },
            { label: "Shoreline", value: "~800 mi" },
            { label: "Max Depth", value: "210 ft" },
            { label: "State", value: "Tennessee" },
            { label: "Nearest Towns", value: "Lafollette, Maynardville, Norris" },
            { label: "Rivers", value: "Clinch / Powell" },
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
          <p><strong className="text-charcoal">Big Ridge State Park:</strong> Mid-lake state park ramp with paved multi-lane access, camping, cabins, and swimming. A popular family base.</p>
          <p><strong className="text-charcoal">Loyston Point:</strong> TVA-managed paved ramp with ample parking on the mid-lake. Quick access to main-lake smallmouth structure.</p>
          <p><strong className="text-charcoal">Norris Dam State Park (Clinch River side):</strong> Access near the dam for the lower lake, plus tailwater access for trout below the dam.</p>
          <p><strong className="text-charcoal">Powell River arm public access:</strong> Several TWRA and TVA ramps serve the upper Powell arm, ideal for striper anglers following bait upriver in summer.</p>
          <p><strong className="text-charcoal">Marina ramps:</strong> Multiple full-service marinas around the lake offer paved public ramps alongside fuel, bait, and slip rentals.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> Norris is a destination-tier smallmouth lake. Spring shallow patterns with jerkbaits and swimbaits are lights-out; summer fish slide to deep main-lake points where drop shots and tubes excel.</p>
          <p><strong className="text-charcoal">Striped Bass:</strong> Trophy stripers roam both river arms. Live shad and alewives fished on planer boards in fall and spring produce the biggest fish; summer nights on deep points are reliable.</p>
          <p><strong className="text-charcoal">Walleye:</strong> Spring run fish move up the Clinch and Powell; summer fish suspend on deep structure. Bottom-bouncing spinners and trolling crankbaits are standard tactics.</p>
          <p><strong className="text-charcoal">Crappie &amp; Catfish:</strong> Crappie fish well around brush piles and dock cables. Channel catfish are abundant and willing year-round.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">TVA ramps are generally free; state park ramps and some county ramps charge a small fee. Water levels vary with TVA&apos;s drawdown schedule — the lake sits several feet lower in late fall and winter, so a few smaller ramps become unusable. Summer weekends bring houseboat traffic, but the lake is big enough to find quiet coves. For more access points across the state, see our <Link href="/tennessee" className="text-water hover:underline">Tennessee boat ramps directory</Link>.</p>
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
            { name: "Lake Cumberland", href: "/lakes/lake-cumberland-kentucky", info: "65,530 acres — KY" },
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
        <Link href="/tennessee" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Tennessee &rarr;
        </Link>
      </div>
    </div>
  );
}
