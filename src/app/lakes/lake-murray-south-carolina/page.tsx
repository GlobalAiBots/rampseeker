import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Murray Boat Ramps — Launch Sites | RampSeeker",
  description: "Lake Murray, SC — 50,000 acres of striped bass and crappie country. Boat ramps, fishing, amenities, and local tips for 2026 anglers and visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-murray-south-carolina" },
};

export default function LakeMurraySouthCarolinaPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Murray?", a: "Lake Murray has more than 20 public boat ramps operated by Dominion Energy, the South Carolina Department of Natural Resources, and county parks. Popular options include Dreher Island State Park, Lake Murray State Park, and Dominion-maintained ramps around the perimeter. Most are paved, free or low-cost, and include trailer parking." },
    { q: "What is the best time of year to fish Lake Murray?", a: "Spring (March through May) is prime time for striped bass schooling on the main lake and for largemouth moving shallow to spawn. Crappie fishing peaks in April around brush piles. Summer nights produce strong striper action on live herring, and fall brings aggressive topwater blow-ups when shad migrate into the creek arms." },
    { q: "Do I need a fishing license for Lake Murray?", a: "Yes. Anglers 16 and older need a valid South Carolina fishing license. Lake Murray follows statewide striped bass and black bass regulations — check SCDNR for current length and bag limits before your trip." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Murray", description: "Lake Murray is a 50,000-acre reservoir on the Saluda River in central South Carolina, famous for striped bass and crappie fishing.",
        geo: { "@type": "GeoCoordinates", latitude: 34.087, longitude: -81.315 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "South Carolina", item: "https://www.rampseeker.com/south-carolina" },
          { "@type": "ListItem", position: 3, name: "Lake Murray", item: "https://www.rampseeker.com/lakes/lake-murray-south-carolina" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/south-carolina" className="hover:text-water transition">South Carolina</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Murray</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Murray Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Murray is a 50,000-acre reservoir just west of Columbia, South Carolina, impounded on the Saluda River in 1930 when what was then the world&apos;s largest earthen dam was completed. Today the lake is managed by Dominion Energy and serves as a regional power, water, and recreation hub. <strong className="text-charcoal">Known locally as the &quot;Jewel of South Carolina,&quot;</strong> Lake Murray is one of the most popular fishing and boating destinations in the state.</p>
        <p>The lake runs roughly 41 miles long with about 650 miles of shoreline across Lexington, Saluda, Newberry, and Richland counties. Clear water, deep main-lake structure, and long creek arms make it an ideal mixed fishery. The dam area and the town of Chapin are heavily developed, while the upper end toward Little Mountain and the Saluda River remains more rural.</p>
        <p>Lake Murray is best known for striped bass, a population that sustained itself naturally after the dam was built and is now supplemented by stocking. Crappie, largemouth bass, and catfish round out the angling menu. The lake is also famous for Purple Martin Island, where hundreds of thousands of martins roost in summer — a genuinely remarkable sight at dusk from late June into August.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres", value: "50,000" },
            { label: "Shoreline", value: "~650 mi" },
            { label: "Max Depth", value: "200 ft" },
            { label: "State", value: "South Carolina" },
            { label: "Nearest Towns", value: "Columbia, Chapin, Lexington" },
            { label: "River System", value: "Saluda" },
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
          <p><strong className="text-charcoal">Dreher Island State Park:</strong> Three connected islands on the mid-lake with a paved multi-lane ramp, courtesy docks, camping, and cabins. A popular base for multi-day trips.</p>
          <p><strong className="text-charcoal">Lake Murray State Park (Dominion Beach):</strong> Near the dam on the east side. Paved ramp with ample parking and easy access to the lower lake.</p>
          <p><strong className="text-charcoal">Higgins Bridge Landing:</strong> SCDNR ramp on the upper lake, convenient for anglers targeting the Saluda River arm and the bigger stripers that hold upriver in summer.</p>
          <p><strong className="text-charcoal">Billy Dreher Island Ramp:</strong> Adjacent to the state park, a second paved ramp that reduces congestion on busy weekends.</p>
          <p><strong className="text-charcoal">Public access landings:</strong> Dominion Energy maintains numerous smaller paved landings around the perimeter; most are free and open dawn to dusk.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Striped Bass:</strong> The headline species. Live herring fished on down-rods around schooling fish is the local standard. Best action runs late fall through spring on the main lake and in summer on the upper Saluda River arm.</p>
          <p><strong className="text-charcoal">Crappie:</strong> Spring crappie fishing is outstanding, with fish staging on brush piles and standing timber. Long-lining small jigs covers water quickly in summer.</p>
          <p><strong className="text-charcoal">Largemouth Bass:</strong> Solid year-round bass fishery. Shaky heads and jigs on rocky points produce through the cooler months; topwater and swim jigs shine in spring and fall.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Channel, flathead, and blue catfish are all present. Fish cut bait along river channels and deep flats after dark for best results.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">State park ramps charge a small fee; SCDNR landings are generally free. Summer weekends see heavy recreational traffic — bass boats and ski boats share the same water, so anchor well off main channels. Summer thunderstorms build fast over the lake; keep an eye on radar. For more access points across the state, see our <Link href="/south-carolina" className="text-water hover:underline">South Carolina boat ramps directory</Link>.</p>
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
            { name: "Lake Lanier", href: "/lakes/lake-lanier-georgia", info: "38,000 acres — GA" },
            { name: "Norris Lake", href: "/lakes/norris-lake-tennessee", info: "33,840 acres — TN" },
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
        <Link href="/south-carolina" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in South Carolina &rarr;
        </Link>
      </div>
    </div>
  );
}
