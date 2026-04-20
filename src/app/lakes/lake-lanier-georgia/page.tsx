import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Lanier Boat Ramps — Launch Sites | RampSeeker",
  description: "Lake Lanier, GA — 38,000 acres north of Atlanta. Boat ramps, fishing for striped and spotted bass, amenities, and local tips for 2026 visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-lanier-georgia" },
};

export default function LakeLanierGeorgiaPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Lanier?", a: "Lake Lanier has more than 40 public boat ramps operated by the U.S. Army Corps of Engineers plus several county and private ramps. Popular options include Van Pugh Park, Aqualand Marina, and Lake Lanier Olympic Park. Most Corps ramps charge a small day-use fee and include paved launches, courtesy docks, and trailer parking." },
    { q: "What is the best time of year to fish Lake Lanier?", a: "Spring (March through May) is strong for spotted bass moving to shallow points and secondary creek arms. Striped bass fishing peaks late fall through early spring when fish school in the main river channels. Summer nights produce steady striper action on live herring around deep brush and humps." },
    { q: "Do I need a fishing license for Lake Lanier?", a: "Yes. Anglers 16 and older need a valid Georgia fishing license. Lake Lanier follows statewide regulations for bass and striped bass — check the Georgia DNR website before your trip for current length and bag limits." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Lanier", description: "Lake Lanier is a 38,000-acre Corps of Engineers reservoir in north Georgia, created by Buford Dam on the Chattahoochee River.",
        geo: { "@type": "GeoCoordinates", latitude: 34.217, longitude: -83.941 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Georgia", item: "https://www.rampseeker.com/georgia" },
          { "@type": "ListItem", position: 3, name: "Lake Lanier", item: "https://www.rampseeker.com/lakes/lake-lanier-georgia" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/georgia" className="hover:text-water transition">Georgia</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Lanier</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Lanier Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Lanier is a 38,000-acre reservoir about an hour north of Atlanta, created when the U.S. Army Corps of Engineers completed Buford Dam on the Chattahoochee River in 1956. The lake sits primarily in Hall and Forsyth counties and serves as the water supply for metro Atlanta, as well as one of the most heavily used recreational lakes in the Southeast. <strong className="text-charcoal">Lanier consistently ranks among the most visited Corps lakes in the country</strong>, thanks to its mix of clear water, deep coves, and proximity to one of the largest metro areas in the South.</p>
        <p>The lake has 692 miles of shoreline winding through the southern Appalachian foothills. Shoreline development is heavy in spots — the south end near Buford is dense with docks and marinas — but the upper Chattahoochee and Chestatee river arms remain forested and relatively quiet. The 1996 Olympics held rowing and canoeing events here, and the venue is still in use as a public park.</p>
        <p>Lanier is famous for two signature fisheries: spotted bass and striped bass. The spotted bass population is widely regarded as one of the strongest in the country, and the stocked striper fishery offers year-round action. Crappie, catfish, and walleye round out the catch. Between the fishing, the ski boats, and the weekend cruisers, Lanier can feel busy on summer afternoons — but early mornings and weekday trips still deliver classic Georgia lake country.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "38,000" },
            { label: "Shoreline", value: "692 mi" },
            { label: "Max Depth", value: "156 ft" },
            { label: "State", value: "Georgia" },
            { label: "Nearest Towns", value: "Gainesville, Buford, Cumming" },
            { label: "River System", value: "Chattahoochee" },
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
          <p><strong className="text-charcoal">Van Pugh Park:</strong> A Corps park on the south end with a paved multi-lane ramp, courtesy docks, and a large trailer lot. One of the most convenient ramps for anglers working the dam area.</p>
          <p><strong className="text-charcoal">Aqualand Marina Public Ramp:</strong> Adjacent to the full-service marina on the south end. Paved ramp with fuel, bait, and service nearby — a good option when you want amenities.</p>
          <p><strong className="text-charcoal">Lake Lanier Olympic Park:</strong> Hosts the 1996 Olympic rowing venue with a public ramp on the west side of the south basin. Well maintained and easy to find.</p>
          <p><strong className="text-charcoal">Bolding Mill Park:</strong> Corps ramp on the north end near the Chestatee arm. Great access to the river-channel striper water and the upper lake spotted-bass flats.</p>
          <p><strong className="text-charcoal">Little Hall Park:</strong> Mid-lake Corps ramp with paved multi-lane access, picnic areas, and a swim beach — a solid all-purpose launch.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Spotted Bass:</strong> The lake&apos;s signature species. Use jerkbaits and underspins in cold months, shaky heads and drop shots year-round, and topwater walking baits in summer. Main-lake points and brush piles in 15-40 feet consistently produce.</p>
          <p><strong className="text-charcoal">Striped Bass:</strong> Stocked by the state; fish can reach 30 pounds and more. Fall through spring is prime for live herring fished around bait schools and deep channel bends. Summer nights on the points are reliable.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Spring crappie fishing around brush piles in the creek arms is excellent. Long-lining jigs in summer also produces.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Channel cats are widespread; flathead and blue catfish give up the biggest fish, typically on cut bait after dark in the river arms.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Corps parks charge a day-use fee (roughly $5-$10); America the Beautiful passes are accepted. Summer weekends are genuinely crowded — ramps back up, and the main lake fills with wake boats by mid-morning. Anglers should launch before sunrise and plan to be off the main lake by 10 a.m. on weekends. Idle zones are enforced near marinas and no-wake buoys. For more options across the state, see our <Link href="/georgia" className="text-water hover:underline">Georgia boat ramps directory</Link>.</p>
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
            { name: "Lake Murray", href: "/lakes/lake-murray-south-carolina", info: "50,000 acres — SC" },
            { name: "Lake Cumberland", href: "/lakes/lake-cumberland-kentucky", info: "65,530 acres — KY" },
            { name: "Norris Lake", href: "/lakes/norris-lake-tennessee", info: "33,840 acres — TN" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{l.info}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="text-center mt-12">
        <Link href="/georgia" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Georgia &rarr;
        </Link>
      </div>
    </div>
  );
}
