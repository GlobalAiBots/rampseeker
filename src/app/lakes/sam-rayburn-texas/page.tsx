import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sam Rayburn Reservoir Boat Ramps — Launch Sites | RampSeeker",
  description: "Sam Rayburn Reservoir, TX — 114,500 acres of legendary bass fishing. Boat ramps, fishing, amenities, and local tips for 2026 anglers and visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/sam-rayburn-texas" },
};

export default function SamRayburnTexasPage() {
  const faqs = [
    { q: "How many boat ramps are on Sam Rayburn?", a: "Sam Rayburn Reservoir has more than 15 public boat ramps operated by the U.S. Army Corps of Engineers, Texas Parks & Wildlife, and private marinas. The most popular launches include Twin Dikes, Powell Park, and Rayburn Park. Most Corps ramps are paved, free or low-cost, and include trailer parking and courtesy docks." },
    { q: "What is the best time of year to fish Sam Rayburn?", a: "Spring (March through May) is prime time for largemouth bass as fish move shallow to spawn around hydrilla flats and creek pockets. Fall (October through November) delivers strong schooling action on shad. Summer nights and early mornings produce consistent catches on deep points and ledges." },
    { q: "Do I need a fishing license for Sam Rayburn?", a: "Yes. All anglers 17 and older need a valid Texas fishing license with a freshwater endorsement. Sam Rayburn follows statewide bass regulations — a 14-inch minimum length and a five-fish daily bag. Check Texas Parks & Wildlife for current rules before your trip." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Sam Rayburn Reservoir", description: "Sam Rayburn Reservoir is a 114,500-acre impoundment of the Angelina River in deep east Texas, widely considered one of the best bass fisheries in America.",
        geo: { "@type": "GeoCoordinates", latitude: 31.065, longitude: -94.105 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Texas", item: "https://www.rampseeker.com/texas" },
          { "@type": "ListItem", position: 3, name: "Sam Rayburn Reservoir", item: "https://www.rampseeker.com/lakes/sam-rayburn-texas" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/texas" className="hover:text-water transition">Texas</Link><span>/</span>
        <span className="text-charcoal font-medium">Sam Rayburn Reservoir</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Sam Rayburn Reservoir Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Sam Rayburn Reservoir is the largest lake contained entirely within Texas, sprawling across roughly 114,500 acres in the Piney Woods of east Texas. The reservoir was built in the 1960s on the Angelina River, part of the Neches River drainage, and is operated by the U.S. Army Corps of Engineers. The lake sits south of Nacogdoches and east of Lufkin, ringed by Sabine National Forest on much of its eastern shore. <strong className="text-charcoal">&quot;Big Sam&quot; is considered one of the most productive bass fisheries in the United States</strong> and has hosted Bassmaster Elite Series and FLW tour events for decades.</p>
        <p>The lake&apos;s 560-plus miles of shoreline hold an extraordinary mix of habitat: standing timber, submerged creek channels, hydrilla, and brush piles. Small towns like Jasper, Broaddus, Zavalla, and Pineland bookend the lake and support a deep network of tackle shops, fish camps, and guide services. Development is modest relative to lakes near major metros, which keeps water quality strong and shoreline structure intact.</p>
        <p>Beyond bass, Sam Rayburn produces excellent white and black crappie, blue and channel catfish, and bream. The lake&apos;s size means weekend crowds rarely feel heavy once you&apos;re away from the ramps. Public access is abundant, camping is plentiful, and the east Texas setting delivers quiet coves and long timbered creek arms that feel a world away from the city.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "114,500" },
            { label: "Shoreline", value: "560+ mi" },
            { label: "Max Depth", value: "80 ft" },
            { label: "State", value: "Texas" },
            { label: "Nearest Towns", value: "Jasper, Lufkin, Broaddus" },
            { label: "River System", value: "Angelina / Neches" },
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
          <p><strong className="text-charcoal">Twin Dikes Park:</strong> A Corps of Engineers park near the dam on the south end. Paved multi-lane ramp, courtesy docks, ample trailer parking, and a campground. A reliable choice in most water levels.</p>
          <p><strong className="text-charcoal">Powell Park:</strong> On the north side of the lake near Broaddus. Large paved ramp, clean facilities, and good access to the mid-lake timber and creek arms that hold springtime bass.</p>
          <p><strong className="text-charcoal">Rayburn Park:</strong> Another Corps park on the southeast shore. Multi-lane ramp with camping and a short run to productive main-lake points.</p>
          <p><strong className="text-charcoal">Lakeview Marina &amp; Ramp:</strong> Private marina access on the north end with fuel, bait, and a solid paved ramp. Handy when you want services along with launching.</p>
          <p><strong className="text-charcoal">Ebenezer Park:</strong> A smaller Corps ramp on the east side — quieter on weekends and a good option if the big ramps are packed during spring tournaments.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Largemouth Bass:</strong> Sam Rayburn is a bass lake first. Pre-spawn and spawn (late February through April) bring fish shallow to hydrilla edges and spawning flats. Flipping creature baits, Texas-rigged worms, and lipless crankbaits are staples. Summer fish move to deep ledges and humps; fall brings topwater schooling action as bass chase shad.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Strong spring and fall bite around brush piles and standing timber in 10-20 feet. Minnows and small jigs under a slip float cover most situations.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Blue and channel catfish are abundant. Drifting cut shad over main-lake flats works well in summer; winter blues stack up on deep channel breaks.</p>
          <p><strong className="text-charcoal">Bream:</strong> Bluegill and redear thrive along shoreline cover spring through fall and are a great option for families.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Corps ramps generally charge a small day-use fee; bring cash or a valid America the Beautiful pass. Spring tournament weekends fill the best ramps before sunrise — plan to be rigged and ready by 5:30 a.m. if you want a close parking spot. Summer afternoons bring strong south winds on the main lake, so keep an eye on weather. For a broader look at public access across the state, browse our <Link href="/texas" className="text-water hover:underline">Texas boat ramps directory</Link>.</p>
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
            { name: "Lake Fork", href: "/lakes/lake-fork-texas", info: "27,690 acres — TX" },
            { name: "Toledo Bend", href: "/lakes/toledo-bend-texas-louisiana", info: "181,600 acres — TX/LA" },
            { name: "Lake Cumberland", href: "/lakes/lake-cumberland-kentucky", info: "65,530 acres — KY" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{l.info}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="text-center mt-12">
        <Link href="/texas" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Texas &rarr;
        </Link>
      </div>
    </div>
  );
}
