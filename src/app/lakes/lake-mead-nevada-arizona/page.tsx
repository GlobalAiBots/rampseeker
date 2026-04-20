import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Mead Boat Ramps — Launch Sites | RampSeeker",
  description: "Lake Mead, NV/AZ — the largest US reservoir by capacity, now at historic lows. Boat ramps, fishing, amenities, and local tips for 2026 anglers.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/lake-mead-nevada-arizona" },
};

export default function LakeMeadNevadaArizonaPage() {
  const faqs = [
    { q: "How many boat ramps are on Lake Mead?", a: "Lake Mead&apos;s active ramp count changes with water level. Primary launches include Las Vegas Boat Harbor/Hemenway Harbor, Callville Bay, and Temple Bar, with additional access points that have opened and closed over the years as the lake has fallen. Always check the current National Park Service status before towing." },
    { q: "What is the best time of year to fish Lake Mead?", a: "Spring (March through May) and fall (October through November) are the most comfortable and productive windows for striped bass and largemouth. Summer is extremely hot; early mornings and nights on the water are the only practical approach. Winter striper fishing around schools of shad can be excellent." },
    { q: "Do I need a fishing license for Lake Mead?", a: "Yes. The lake crosses Nevada and Arizona. Nevada and Arizona honor each other&apos;s licenses on most of the lake under a reciprocal agreement, but you must still hold a valid license from one state. Check Nevada Department of Wildlife or Arizona Game & Fish for current rules and any special stamps." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Lake Mead", description: "Lake Mead is a reservoir on the Colorado River behind Hoover Dam, spanning Nevada and Arizona. Once the largest US reservoir by capacity, it has been at historic lows in recent years.",
        geo: { "@type": "GeoCoordinates", latitude: 36.131, longitude: -114.368 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Nevada", item: "https://www.rampseeker.com/nevada" },
          { "@type": "ListItem", position: 3, name: "Lake Mead", item: "https://www.rampseeker.com/lakes/lake-mead-nevada-arizona" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/nevada" className="hover:text-water transition">Nevada</Link><span>/</span>
        <span className="text-charcoal font-medium">Lake Mead</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Lake Mead Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Lake Mead is a reservoir on the Colorado River behind Hoover Dam, lying across the Nevada-Arizona border just east of Las Vegas. When completed in 1935, it became the largest reservoir in the United States by capacity, a distinction it held for decades. The lake is the centerpiece of Lake Mead National Recreation Area, the country&apos;s first such designated area. <strong className="text-charcoal">Mead has been at historic low levels in recent years as the Colorado River system has struggled through extended drought</strong>, exposing long-submerged shorelines and forcing extensive ramp modifications.</p>
        <p>The lake is set in stark Mojave Desert terrain — sun-baked mountains, rocky coves, and long open basins. Shoreline length varies with water level but historically exceeds 700 miles. The lake sits within a short drive of Las Vegas, making it one of the most accessible big-water fisheries in the West. Boulder Basin, Overton Arm, and the Virgin and Muddy River arms each have their own character — from busy near-Vegas launches to quiet Overton coves.</p>
        <p>Despite the low water, Mead continues to support a productive multi-species fishery. Striped bass, largemouth bass, smallmouth bass, channel catfish, and crappie all live in the lake. Summer water temperatures push fish deep and reduce daytime fishing; night trips are a local tradition. Non-fishing visitors come for houseboat rentals, kayaking, and the simple drama of standing at a ramp where the waterline was a hundred feet above your head a generation ago.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Capacity (full)", value: "~28.9 MAF" },
            { label: "Shoreline (full)", value: "~759 mi" },
            { label: "Max Depth (full)", value: "~532 ft" },
            { label: "States", value: "NV / AZ" },
            { label: "Nearest Cities", value: "Las Vegas, Boulder City" },
            { label: "Management", value: "NPS — Lake Mead NRA" },
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
          <p><strong className="text-charcoal">Hemenway Harbor / Las Vegas Boat Harbor:</strong> The closest full-service launch to Las Vegas, with a paved extended ramp, rental fleet, and marina. The most reliable option through the drought period.</p>
          <p><strong className="text-charcoal">Callville Bay:</strong> Located in Boulder Basin with a paved ramp, store, houseboat rentals, and fuel. A popular base for multi-day trips.</p>
          <p><strong className="text-charcoal">Temple Bar Marina (AZ):</strong> Arizona-side launch with a paved ramp and basic services — a quieter alternative to the Nevada-side ramps.</p>
          <p><strong className="text-charcoal">Boulder Harbor:</strong> Historically a primary Boulder Basin launch; status has changed repeatedly with lake level. Check NPS conditions before arriving.</p>
          <p><strong className="text-charcoal">Echo Bay / Overton Beach area:</strong> Northern access points that have opened, closed, and relocated as the Overton Arm water line has changed. Confirm current access with the National Park Service.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Striped Bass:</strong> The numbers fishery at Mead. Anchovies and cut bait fished around deep structure produce year-round; schooling action on shad can be dramatic in spring and fall.</p>
          <p><strong className="text-charcoal">Largemouth &amp; Smallmouth Bass:</strong> Both species hold on rocky shorelines. Drop shots, tubes, and swimbaits cover the most water. Early morning and evening shifts beat the summer heat.</p>
          <p><strong className="text-charcoal">Catfish:</strong> Channel catfish are widespread and bite readily on cut bait or nightcrawlers. Nights in summer are prime.</p>
          <p><strong className="text-charcoal">Crappie &amp; Sunfish:</strong> Crappie hold around brush and structure in the backs of coves in spring. Bluegill and redear round out family-friendly shoreline fishing.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Lake Mead NRA charges an entrance fee; federal passes are accepted. Summer heat is extreme — carry far more water than you think you need and plan boating around dawn and dusk. Quagga mussels are established at Mead, so inter-lake boats face strict decontamination rules when leaving. Always check current ramp status with the National Park Service before you tow. For more regional options, see our <Link href="/nevada" className="text-water hover:underline">Nevada boat ramps directory</Link>.</p>
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
            { name: "Lake Powell", href: "/lakes/lake-powell-utah-arizona", info: "~161,000 acres — UT/AZ" },
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
        <Link href="/nevada" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Nevada &rarr;
        </Link>
      </div>
    </div>
  );
}
