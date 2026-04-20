import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dale Hollow Lake Boat Ramps — Launch Sites | RampSeeker",
  description: "Dale Hollow Lake, TN/KY — 27,700 acres of clear water and world-record smallmouth. Boat ramps, fishing, amenities, and local tips for 2026 visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/dale-hollow-lake-tennessee-kentucky" },
};

export default function DaleHollowLakeTennesseeKentuckyPage() {
  const faqs = [
    { q: "How many boat ramps are on Dale Hollow Lake?", a: "Dale Hollow Lake has more than a dozen public boat ramps operated by the U.S. Army Corps of Engineers and several marina ramps. Notable launches include Dale Hollow Dam, Lillydale, and Willow Grove. Most Corps ramps charge a small day-use fee and include paved multi-lane launches with trailer parking." },
    { q: "What is the best time of year to fish Dale Hollow Lake?", a: "Spring (April through June) is the classic smallmouth bass window, with trophy fish holding on rocky points and bluff transitions. Fall brings steady smallmouth and walleye action as water cools. Summer nights on main-lake humps produce quality fish, and winter jerkbait fishing can be outstanding for trophy smallmouth." },
    { q: "Do I need a fishing license for Dale Hollow Lake?", a: "Yes. You need either a Tennessee or Kentucky fishing license depending on which part of the lake you fish — each state honors the other&apos;s license on most of the open water under a reciprocal agreement, but always check current rules. Dale Hollow has specific slot and length regulations for smallmouth bass." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Dale Hollow Lake", description: "Dale Hollow Lake is a 27,700-acre Corps of Engineers reservoir on the Tennessee-Kentucky border, world-famous for trophy smallmouth bass.",
        geo: { "@type": "GeoCoordinates", latitude: 36.553, longitude: -85.362 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Tennessee", item: "https://www.rampseeker.com/tennessee" },
          { "@type": "ListItem", position: 3, name: "Dale Hollow Lake", item: "https://www.rampseeker.com/lakes/dale-hollow-lake-tennessee-kentucky" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/tennessee" className="hover:text-water transition">Tennessee</Link><span>/</span>
        <span className="text-charcoal font-medium">Dale Hollow Lake</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Dale Hollow Lake Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Dale Hollow Lake is a 27,700-acre reservoir straddling the Tennessee-Kentucky border, impounded on the Obey River by the U.S. Army Corps of Engineers in 1943. The lake sits in the highland rim country, ringed by steep hardwood ridges and limestone bluffs. <strong className="text-charcoal">Dale Hollow produced the world-record smallmouth bass in 1955 — an 11-pound, 15-ounce giant</strong> — and it remains one of the most respected smallmouth fisheries on earth.</p>
        <p>The lake has roughly 620 miles of shoreline and is largely surrounded by Corps-owned undeveloped land. Water clarity is exceptional, often 20 feet or more on the main lake. Shoreline development is concentrated at a handful of marinas, with the rest of the lake feeling genuinely remote. That mix of scenery, water clarity, and deep structure is what keeps anglers, divers, and houseboat vacationers coming back year after year.</p>
        <p>Beyond the legendary smallmouth, Dale Hollow supports strong populations of walleye, muskie, striped bass, and lake trout — a somewhat unusual mix that reflects the cold, clear water. Crappie, bluegill, and catfish are also available. The lake is quieter than its TVA neighbors, and weekday trips in spring and fall can feel like you have a major fishery to yourself.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "27,700" },
            { label: "Shoreline", value: "~620 mi" },
            { label: "Max Depth", value: "~150 ft" },
            { label: "States", value: "TN / KY" },
            { label: "Nearest Towns", value: "Celina, Byrdstown, Albany" },
            { label: "River System", value: "Obey / Cumberland" },
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
          <p><strong className="text-charcoal">Dale Hollow Dam access:</strong> Corps ramp near the dam on the lower lake. Paved multi-lane launch, courtesy docks, and quick access to the lower-lake bluffs that hold big winter smallmouth.</p>
          <p><strong className="text-charcoal">Lillydale Campground &amp; Ramp:</strong> Corps park on the north side with paved ramp, campground, and trailer parking — a long-running favorite for multi-day trips.</p>
          <p><strong className="text-charcoal">Willow Grove:</strong> Mid-lake Corps ramp with marina service nearby. Strategic launch for the Obey and Wolf River arms.</p>
          <p><strong className="text-charcoal">Obey River Park:</strong> Upper-lake Corps ramp that&apos;s quieter on weekends and positions anglers well for spring smallmouth in the river arm.</p>
          <p><strong className="text-charcoal">Marina ramps:</strong> Several full-service marinas on the Tennessee and Kentucky sides offer public paved ramps with fuel, bait, and service.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> The main event. Float-and-fly rigs in winter are a local tradition and produce trophy fish. Spring brings jerkbaits and tubes to rocky points; summer smallmouth hold deep on main-lake humps.</p>
          <p><strong className="text-charcoal">Walleye:</strong> Strong spring run up the Obey. Trolling crankbaits and bottom bouncers along main-lake channel edges works through summer.</p>
          <p><strong className="text-charcoal">Muskie &amp; Striped Bass:</strong> Muskie are present but relatively low density — patient anglers hunt them with big baits in spring and fall. Stripers show up around schools of bait year-round.</p>
          <p><strong className="text-charcoal">Lake Trout &amp; Other:</strong> Dale Hollow has a small but established lake trout population. Crappie, bluegill, and channel catfish round out the fishery.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Corps ramps charge day-use fees; America the Beautiful passes are accepted. Because the lake crosses state lines, carry the license for the state where you launch and understand the reciprocal agreement for open water. Smallmouth bass regulations are specific here — check current slot limits before keeping fish. Morning fog on cool-water mornings is common; bring a GPS or chartplotter. For more access points across the state, see our <Link href="/tennessee" className="text-water hover:underline">Tennessee boat ramps directory</Link>.</p>
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
            { name: "Norris Lake", href: "/lakes/norris-lake-tennessee", info: "33,840 acres — TN" },
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
