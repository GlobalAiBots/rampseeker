import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flathead Lake Boat Ramps — Launch Sites | RampSeeker",
  description: "Flathead Lake, MT — 191 sq mi, the largest natural freshwater lake west of the Mississippi. Boat ramps, fishing, amenities, and local tips for 2026.",
  alternates: { canonical: "https://www.rampseeker.com/lakes/flathead-lake-montana" },
};

export default function FlatheadLakeMontanaPage() {
  const faqs = [
    { q: "How many boat ramps are on Flathead Lake?", a: "Flathead Lake has numerous public boat ramps managed by Montana State Parks, the Confederated Salish and Kootenai Tribes, and private marinas. Popular launches include Polson, Big Arm State Park, Wayfarers State Park near Bigfork, and West Shore State Park. Most state-park ramps include paved launches, courtesy docks, and trailer parking." },
    { q: "What is the best time of year to fish Flathead Lake?", a: "Summer and fall (June through October) are the main open-water fishing seasons. Lake trout are the primary target and can be caught year-round, with excellent jigging in deep water in summer and fall. Yellow perch fishing picks up through summer, and cutthroat trout show up on the surface in spring and early summer." },
    { q: "Do I need a fishing license for Flathead Lake?", a: "Yes. The southern half of Flathead Lake is on the Flathead Indian Reservation and requires a Tribal permit in addition to (or in place of) a Montana state license depending on where you fish. The northern half falls under standard Montana Fish, Wildlife & Parks regulations. Always check current rules before heading out." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "LakeBodyOfWater",
        name: "Flathead Lake", description: "Flathead Lake is a 191-square-mile natural lake in northwestern Montana — the largest natural freshwater lake west of the Mississippi.",
        geo: { "@type": "GeoCoordinates", latitude: 47.872, longitude: -114.106 },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Montana", item: "https://www.rampseeker.com/montana" },
          { "@type": "ListItem", position: 3, name: "Flathead Lake", item: "https://www.rampseeker.com/lakes/flathead-lake-montana" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <Link href="/montana" className="hover:text-water transition">Montana</Link><span>/</span>
        <span className="text-charcoal font-medium">Flathead Lake</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Flathead Lake Boat Ramps &amp; Launch Sites</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        <p>Flathead Lake covers roughly 191 square miles in the Flathead Valley of northwestern Montana, making it the largest natural freshwater lake west of the Mississippi River. The lake is a remnant of glacial Lake Missoula, held today by a modest dam at its south end but still essentially a natural basin. <strong className="text-charcoal">Flathead is famous for exceptionally clear, cold water</strong> — visibility routinely runs 25 feet or more on calm days, and the lake is considered one of the cleanest big lakes in the United States.</p>
        <p>The lake stretches nearly 30 miles north-to-south and up to 15 miles wide, with about 185 miles of shoreline. The Mission Mountains rise sharply to the east and the Salish Mountains to the west. The southern half of the lake sits within the Flathead Indian Reservation, home to the Confederated Salish and Kootenai Tribes, which means permits and regulations differ between the north and south halves. Towns like Polson, Bigfork, Somers, and Lakeside ring the lake and support a strong cherry-orchard and outdoor-recreation economy.</p>
        <p>Flathead&apos;s fishery is dominated by non-native lake trout, which the state and tribes actively manage due to their impact on native cutthroat and bull trout. Yellow perch, kokanee salmon (historically), whitefish, and largemouth bass in some warmer bays round out the mix. The lake also hosts sailing regattas, sea-kayak trips to the wild islands, and summer cherry stands along US-93. Weather changes fast in the Rockies, and Flathead can produce dangerous chop in afternoon thunderstorms.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Surface Area", value: "~191 sq mi" },
            { label: "Shoreline", value: "~185 mi" },
            { label: "Max Depth", value: "~370 ft" },
            { label: "State", value: "Montana" },
            { label: "Nearest Towns", value: "Polson, Bigfork, Kalispell" },
            { label: "Length", value: "~27 mi" },
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
          <p><strong className="text-charcoal">Polson Ramp (South end):</strong> Paved multi-lane launch near the town of Polson with trailer parking and nearby services. A common base for south-end fishing.</p>
          <p><strong className="text-charcoal">Big Arm State Park:</strong> West-shore state park with a paved ramp, campground, and access to Wild Horse Island State Park across the water.</p>
          <p><strong className="text-charcoal">Wayfarers State Park (Bigfork):</strong> East-shore launch near Bigfork with paved ramp, courtesy dock, and views of the Swan Range.</p>
          <p><strong className="text-charcoal">West Shore State Park:</strong> Mid-lake west-shore ramp with camping, paved launch, and quiet shoreline access.</p>
          <p><strong className="text-charcoal">Somers Bay / Yellow Bay access:</strong> Additional state park and public ramps on the north and east shores; ideal for shorter runs to cold-water lake trout structure.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Fishing — Species and Seasons</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong className="text-charcoal">Lake Trout:</strong> The primary gamefish. Vertical jigging with heavy spoons and jigs in 100-250 feet of water is the standard technique. Summer through fall is prime, but winter jigging (open water) also produces.</p>
          <p><strong className="text-charcoal">Yellow Perch:</strong> Abundant in shallower bays and weedy flats. Small jigs tipped with maggots or minnows are the local go-to, especially in summer.</p>
          <p><strong className="text-charcoal">Cutthroat Trout:</strong> Native westslope cutthroat are present but protected in many areas. Check regulations carefully — catch-and-release rules often apply.</p>
          <p><strong className="text-charcoal">Whitefish &amp; Other:</strong> Mountain whitefish, northern pikeminnow, and some largemouth in the warmer southern bays round out the mix.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Tips for First-Time Visitors</h2>
        <p className="text-gray-600 leading-relaxed">Water is cold year-round — even in mid-summer the main lake runs in the 60s. A drysuit or at minimum a good PFD is smart for kayakers. If you&apos;re fishing on the south half of the lake (south of roughly Woods Bay/Yellow Bay), a Tribal fishing and recreation permit is required in addition to a Montana license. Aquatic invasive species inspections are mandatory. Afternoon thunderstorms build quickly; watch the sky and the Mission Mountains to the east. For more regional options, see our <Link href="/montana" className="text-water hover:underline">Montana boat ramps directory</Link>.</p>
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
            { name: "Lake Champlain", href: "/lakes/lake-champlain-new-york-vermont", info: "435 sq mi — NY/VT" },
            { name: "Lake Powell", href: "/lakes/lake-powell-utah-arizona", info: "~161,000 acres — UT/AZ" },
            { name: "Lake Mead", href: "/lakes/lake-mead-nevada-arizona", info: "NV/AZ — Colorado River" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p>
              <p className="text-gray-500 text-sm">{l.info}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="text-center mt-12">
        <Link href="/montana" className="inline-block bg-water text-white font-[Cabin] font-bold px-8 py-3 rounded-xl hover:bg-water/90 transition">
          Find More Ramps in Montana &rarr;
        </Link>
      </div>
    </div>
  );
}
