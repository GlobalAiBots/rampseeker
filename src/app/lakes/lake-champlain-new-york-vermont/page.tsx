import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Champlain Boat Ramps — Launch Sites | RampSeeker",
  description: "Lake Champlain, NY/VT — 435 square miles and 587 miles of shoreline. Boat ramps, fishing, amenities, and local tips for 2026 anglers and visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-champlain-new-york-vermont" },
};

export default function LakeChamplainNewYorkVermontPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Champlain?", a: "Lake Champlain has dozens of public boat launches on both the New York and Vermont shores, managed by state agencies, municipalities, and private marinas. Popular launches include Plattsburgh City Marina, Burlington Waterfront, Ticonderoga, and the Vermont Fish & Wildlife access points up and down the Vermont shore. Most state-managed ramps are free or low-cost with paved launches." },
    { q: "What is the best time of year to fish Lake Champlain?", a: "Late spring through fall is the main fishing window. Smallmouth bass peak in June as fish finish spawning and feed hard, and the fall smallmouth bite is outstanding. Largemouth thrive in the weedy south-lake bays in summer. Ice fishing for perch, pike, and walleye is a major winter tradition on the broader bays." },
    { q: "Do I need a fishing license for Lake Champlain?", a: "Yes. You need either a New York or Vermont fishing license depending on which state&apos;s waters you fish. The two states have a reciprocal agreement on the lake, but anglers must comply with the rules of the state that issued their license. Quebec has separate rules in the northern reach. Check NYSDEC or Vermont Fish & Wildlife for current regulations." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Champlain", description: "Lake Champlain is a 435-square-mile lake on the New York-Vermont border extending into Quebec, famed for smallmouth and largemouth bass fishing.",
        geo: { "@type": "GeoCoordinates", latitude: 44.533, longitude: -73.333 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "New York", item: "https://www.rampseeker.com/new-york" },
          { "@type": "ListItem", position: 3, name: "Lake Champlain", item: "https://www.rampseeker.com/lakes/lake-champlain-new-york-vermont" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/new-york" className="hover:text-water transition">New York</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Champlain</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Champlain Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Champlain is a 435-square-mile natural lake on the New York-Vermont border, extending north into Quebec. Roughly 120 miles long and up to 12 miles wide, with about 587 miles of shoreline, Champlain sits between the Adirondack Mountains to the west and the Green Mountains to the east. <strong className="text-charcoal">Champlain is widely regarded as one of the best smallmouth and largemouth bass fisheries in North America</strong>, routinely producing top-tier tournament weights across professional circuits.</p>
        <p>The lake is divided by geography into distinct sections: the deep, cold main lake from Plattsburgh south to Burlington; the broad shallows of the South Lake toward Ticonderoga; and the Inland Sea and Missisquoi Bay on the Vermont north end. Each section holds a different character — smallmouth-dominant clear water on the main lake, weedy largemouth country in the south, and a mix of species in the north. Historic towns ring the shoreline: Plattsburgh, Burlington, Ticonderoga, and Crown Point.</p>
        <p>Beyond bass, Champlain supports walleye, northern pike, lake trout, Atlantic salmon, chain pickerel, perch, and bullhead. Ice fishing is a serious winter pursuit, with walleye and pike on the main lake and yellow perch in the bays. Champlain is also a major recreational boating and sailing destination — the lake is wide enough to kick up serious waves in a summer squall, so check forecasts before heading out.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Area", value: "435 sq mi" },
            { label: "Shoreline", value: "587 mi" },
            { label: "Max Depth", value: "400 ft" },
            { label: "States", value: "NY / VT (+ QC)" },
            { label: "Nearest Cities", value: "Burlington, Plattsburgh" },
            { label: "Length", value: "~120 mi" },
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
          <p><strong className="text-charcoal">Plattsburgh City Marina (NY):</strong> Northern New York access with a paved ramp, marina services, and large trailer lot. A common launch for smallmouth tournaments.</p>
          <p><strong className="text-charcoal">Burlington Waterfront (VT):</strong> Downtown Burlington launch with paved ramp and convenient access to the main lake.</p>
          <p><strong className="text-charcoal">Ticonderoga Ferry Landing Area (NY):</strong> South-lake access near Ticonderoga with public ramps serving the narrow southern section of the lake.</p>
          <p><strong className="text-charcoal">Port Henry Public Ramp (NY):</strong> Mid-lake New York access with paved multi-lane ramp, popular with anglers working the deeper water off the west shore.</p>
          <p><strong className="text-charcoal">Vermont Fish &amp; Wildlife access points:</strong> Dozens of free state-managed launches along the Vermont shore, including several on the Inland Sea and Missisquoi Bay.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> The marquee species. Post-spawn June and September-October are peak. Drop shots, tubes, and Ned rigs on rocky main-lake shoals routinely produce fish over four pounds.</p>
          <p><strong className="text-charcoal">Largemouth Bass:</strong> Weedy south-lake bays and the Inland Sea hold strong largemouth. Frogs, swim jigs, and Senkos on grass edges are standards in summer.</p>
          <p><strong className="text-charcoal">Northern Pike &amp; Walleye:</strong> Pike are widely distributed and aggressive on spinnerbaits and big jerkbaits in spring and fall. Walleye show up in the main lake and on the south lake with jig-and-minnow presentations.</p>
          <p><strong className="text-charcoal">Lake Trout &amp; Salmon:</strong> Cold deep water in the main lake holds lake trout and stocked Atlantic salmon. Downrigger trolling from late spring into summer is the classic approach.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">State access ramps are often free but fill early on summer weekends. Invasive species inspections and decontamination are mandatory in both states — plan an extra 10-15 minutes at launch. The lake is big water; the main-lake section can develop three- to four-foot chop in a summer thunderstorm, so monitor weather closely. For more regional options, see our <Link href="/new-york" className="text-water hover:underline">New York boat ramps directory</Link>.</p>
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
            { name: "Flathead Lake", href: "/lakes/flathead-lake-montana", info: "191 sq mi — MT" },
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
        <Link href="/new-york" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in New York &rarr;
        </Link>
      </div>
    </div>
  );
}
