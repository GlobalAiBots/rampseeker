import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Powell Boat Ramps — Launch Sites | RampSeeker",
  description: "Lake Powell, UT/AZ — up to 161,000 acres of red-rock canyon reservoir. Boat ramps, fishing, amenities, and local tips for 2026 anglers and visitors.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-powell-utah-arizona" },
};

export default function LakePowellUtahArizonaPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Powell?", a: "Lake Powell has a small number of major launch points — primarily at Wahweap, Bullfrog, and Halls Crossing marinas, plus occasional seasonal launches. Ramp availability changes with water level; during extended low-water periods some historic ramps have been closed or extended. Always check current National Park Service conditions before towing a boat." },
    { q: "What is the best time of year to fish Lake Powell?", a: "Spring (April through May) and fall (September through October) are prime for striped bass and smallmouth as water temperatures are comfortable and fish are aggressive. Summer offers hot topwater action early and late, with striper boils a Powell signature. Winter fishing is slower but can produce quality fish on vertical jigs." },
    { q: "Do I need a fishing license for Lake Powell?", a: "Yes. Lake Powell crosses the Utah-Arizona line, and the two states recognize each other&apos;s licenses on most of the lake under a reciprocal agreement. You&apos;ll still need a valid license from one state. Check Utah DWR or Arizona Game & Fish for current rules and any required stamps." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Powell", description: "Lake Powell is a reservoir on the Colorado River straddling the Utah-Arizona border, with a full-pool surface area of roughly 161,000 acres within Glen Canyon National Recreation Area.",
        geo: { "@type": "GeoCoordinates", latitude: 37.068, longitude: -111.239 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Utah", item: "https://www.rampseeker.com/utah" },
          { "@type": "ListItem", position: 3, name: "Lake Powell", item: "https://www.rampseeker.com/lakes/lake-powell-utah-arizona" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/utah" className="hover:text-water transition">Utah</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Powell</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Powell Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Powell is a reservoir on the Colorado River within Glen Canyon National Recreation Area, straddling the border of southern Utah and northern Arizona. At full pool the lake covers roughly 161,000 acres, making it one of the largest reservoirs in the United States. Created by Glen Canyon Dam in 1963, Powell is a defining feature of the Colorado Plateau — nearly 2,000 miles of sandstone shoreline, hidden side canyons, and red-rock mesas that stretch to the horizon. <strong className="text-charcoal">Lake Powell is unlike any other U.S. reservoir in terms of scenery, and remains one of the most photographed stretches of water in the country.</strong></p>
        <p>The lake has been in extended drought-driven decline for much of the last two decades. Water levels have sat well below full pool, and several historic launch ramps — Hite, Dangling Rope, and others — have faced closures or extensions as the shoreline receded. The National Park Service has actively extended primary ramps to maintain access. Anyone trailering a boat to Powell should check current NPS conditions and the lake-level forecast before leaving home.</p>
        <p>Despite the low water, Powell remains a remarkable fishery. Striped bass, smallmouth bass, largemouth bass, walleye, and channel catfish all thrive in the clear, deep water. Houseboat rentals, kayak and stand-up paddle trips, and camping on sand beaches in side canyons are all part of the Powell experience. Summer temperatures are intense — triple digits are routine — so early-morning launches and shaded canyons are the local rhythm.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Acres (full)", value: "~161,000" },
            { label: "Shoreline (full)", value: "~2,000 mi" },
            { label: "Max Depth", value: "~560 ft" },
            { label: "States", value: "UT / AZ" },
            { label: "Nearest Towns", value: "Page, Bullfrog, Hanksville" },
            { label: "Management", value: "NPS — Glen Canyon NRA" },
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
          <p><strong className="text-charcoal">Wahweap Marina (AZ):</strong> The primary south-end launch near Page, Arizona, just upstream of Glen Canyon Dam. Extended concrete ramp, large trailer parking, fuel, and a full-service marina. The most reliable launch during low-water periods.</p>
          <p><strong className="text-charcoal">Bullfrog Marina (UT):</strong> Main north-end launch on the Utah side with full marina services, houseboat rentals, and a paved ramp. Accessed via UT-276.</p>
          <p><strong className="text-charcoal">Halls Crossing (UT):</strong> Across the lake from Bullfrog (connected by ferry). Paved ramp, marina services, and a quieter overall atmosphere than Bullfrog or Wahweap.</p>
          <p><strong className="text-charcoal">Stateline Launch (UT/AZ):</strong> Secondary launch near Wahweap used as water levels fluctuate. Status changes with lake elevation — confirm with NPS before towing.</p>
          <p><strong className="text-charcoal">Hite (UT) and other seasonal access:</strong> Historically a primary upper-lake ramp, Hite has been closed or restricted during extended drought. Check current NPS conditions for any seasonal or emergency access points.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Striped Bass:</strong> The signature gamefish at Powell. Summer topwater boils in the side canyons are a Powell hallmark — cast surface lures into schooling fish. Anchovies fished on deep structure produce year-round.</p>
          <p><strong className="text-charcoal">Smallmouth Bass:</strong> Abundant on the rocky shoreline throughout the lake. Tubes, grubs, and drop-shot rigs work in almost every season.</p>
          <p><strong className="text-charcoal">Largemouth Bass:</strong> Present in the back of side canyons with cover. Spring spawning action is good in the protected backs of major arms.</p>
          <p><strong className="text-charcoal">Walleye &amp; Catfish:</strong> Walleye continue to expand on the lake; channel catfish are widely distributed and take cut bait and nightcrawlers readily.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Lake Powell is a National Recreation Area — expect an entrance fee or valid federal pass at the gate. Cell service is spotty to nonexistent in the side canyons, so download offline maps and check in with someone before long trips. Summer heat is serious; carry more water than you think you need. Quagga mussels are a major issue — decontamination is required if you&apos;re moving your boat in or out of the lake. For more regional options, see our <Link href="/utah" className="text-water hover:underline">Utah boat ramps directory</Link>.</p>
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
            { name: "Lake Mead", href: "/lakes/lake-mead-nevada-arizona", info: "NV/AZ — Colorado River" },
            { name: "Flathead Lake", href: "/lakes/flathead-lake-montana", info: "191 sq mi — MT" },
            { name: "Lake Champlain", href: "/lakes/lake-champlain-new-york-vermont", info: "435 sq mi — NY/VT" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{l.info}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="text-center mt-12">
        <Link href="/utah" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Utah &rarr;
        </Link>
      </div>
    </div>
  );
}
