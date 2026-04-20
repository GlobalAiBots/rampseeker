import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("floating-boat-ramps")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: "Find floating boat ramps, portable docks, and modular dock systems. Compare top-rated products, installation tips, and costs from $500 to $5,000+.",
  keywords: "floating boat ramp, portable boat ramp, floating dock for boat launch, modular floating dock, drive-on floating dock, roll-in dock",
  openGraph: { title: post.title, url: `https://www.rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://www.rampseeker.com/blog/${post.slug}` },
};

const AMAZON_TAG = "babymydog03-20";
const amazonSearch = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}`;

const products = [
  { name: "Tommy Docks 8x10 Floating Dock Kit", desc: "Pre-engineered modular floating dock kit. Polyethylene decking, aluminum frame, and foam-filled floats. Scalable from a single 8x10 platform to a full marina-style layout.", query: "Tommy Docks floating dock kit" },
  { name: "Dock Edge Floating Dock Corner Section", desc: "Modular corner section built to connect with most floating dock systems. Great for L-shapes and T-shapes around a boat lift.", query: "Dock Edge floating dock corner section" },
  { name: "Foam Dock Floats (2-Pack Billets)", desc: "Foam-filled polyethylene floats for DIY builds. Typically 1,000 to 1,500 lbs buoyancy per billet. The backbone of any custom floating dock.", query: "foam dock floats billets pair" },
  { name: "Galvanized Dock Hardware Kit", desc: "Through-bolts, bracing, brackets, and fasteners rated for fresh or saltwater. Whatever dock kit you buy, plan on upgrading the hardware.", query: "galvanized dock hardware kit" },
  { name: "Non-Slip Dock Matting", desc: "Ridged rubber matting that drains and grips. Turns slick polyethylene decking into a safe walking surface in the rain.", query: "non slip dock matting" },
  { name: "Solar Dock Light", desc: "Auto-on marine-grade dock light. No wiring, no battery changes — essential for night boaters and for marking the dock edge.", query: "solar dock light marine" },
];

const faqs = [
  { q: "How much does a floating boat ramp cost?", a: "A basic 4x8 foot floating dock section starts around $500, a modular 8x10 residential kit runs $1,500 to $3,000, and a full drive-on floating boat ramp from brands like Jet Dock or EZ Dock typically costs $4,000 to $10,000 depending on boat size. DIY builds using foam billets and treated lumber can be done for $700 to $1,500 but require more labor." },
  { q: "Can I install a floating dock myself?", a: "Yes, most residential modular floating docks are designed for DIY assembly in one weekend with basic tools. A typical 8x10 section weighs 200 to 400 lbs and assembles in two to four hours with two people. Connection to shore usually requires a gangway or ramp, and anchoring to the lake bottom or shoreline needs some planning. Drive-on ramps for larger boats often benefit from professional installation." },
  { q: "What weight can a floating dock hold?", a: "Weight capacity depends on the float size and decking. A single 4x8 foot residential float typically supports 1,500 to 2,500 lbs of distributed load (people, boat, gear) while maintaining freeboard. Commercial systems like EZ Dock rate individual sections up to 3,500 lbs. A dedicated drive-on floating boat ramp is typically rated to hold the full weight of a 2,000 to 5,000 lb boat plus riders." },
  { q: "Do I need a permit for a floating dock?", a: "In most states yes — you need a permit from your state environmental agency, the Army Corps of Engineers, or a lake authority before installing any dock. Requirements vary by waterbody. Private docks on smaller private lakes may be exempt, but public lakes, navigable waters, and reservoirs almost always require written approval. Check with your state's Department of Natural Resources or the lake's managing agency first." },
  { q: "How long do floating docks last?", a: "A quality modular floating dock with foam-filled polyethylene floats and galvanized or aluminum hardware will last 20 to 30 years with minimal maintenance. Wooden decking typically needs replacement every 8 to 12 years. In saltwater, expect hardware to corrode faster — plan on stainless steel fasteners and annual rinsing." },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  datePublished: "2026-04-18",
  author: { "@type": "Organization", name: "RampSeeker Team" },
  publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.rampseeker.com/blog" },
    { "@type": "ListItem", position: 3, name: post.title, item: `https://www.rampseeker.com/blog/${post.slug}` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <span>/</span>
            <span className="text-white/80">Floating Boat Ramps</span>
          </nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Not every waterfront works with a concrete boat ramp. Water levels swing. Lake bottoms slope too steep or too shallow. The nearest public ramp might be a 30-minute drive, or there might not be one at all. Private lakefront owners, seasonal boaters, and anyone launching from a remote put-in all run into the same question: is there a better way to get a boat in the water? For a lot of situations, the answer is a floating boat ramp or portable dock system.</p>
        <p>This guide covers what floating ramps actually are, when they make sense, the main types on the market, what to look for when buying, and how much you should expect to spend. We also pulled together a short list of top-rated products for both turnkey buyers and DIY builders.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Floating Ramp vs. Fixed Ramp: What&apos;s the Difference?</h2>
        <p>A fixed boat ramp is a concrete or asphalt slab sloped from the parking area down under the waterline. It is attached to the shore and does not move. When the lake drops six feet, a fixed ramp can leave your trailer stranded with its tires on dry concrete and the back end hanging over bare mud.</p>
        <p>A floating boat ramp (also called a floating dock launch or drive-on floating dock) sits on the water itself. Foam-filled floats or air-filled pontoons give it buoyancy, and it rises and falls with the water level. Some floating ramps are low-profile drive-on platforms built specifically for launching small boats and jet skis. Others are modular dock systems that serve as a combination dock, boat slip, and launching surface. Either way, the key feature is that the water level never catches you by surprise.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">When You Actually Need One</h2>
        <p><strong className="text-charcoal">Fluctuating water levels.</strong> Reservoirs that draw down 10 to 30 feet through the summer wreck most fixed ramps. A floating system follows the water.</p>
        <p><strong className="text-charcoal">No public ramp nearby.</strong> If the closest <Link href="/" className="text-water hover:underline">public boat ramp</Link> is an hour away, a portable ramp at your own property saves hours every weekend.</p>
        <p><strong className="text-charcoal">Private lakefront property.</strong> On a small private lake or pond, a modular floating dock gives you a launch point, a swim platform, and a boat slip all in one structure.</p>
        <p><strong className="text-charcoal">Seasonal use.</strong> Floating systems can be pulled out at the end of the season, stored on shore through winter, and redeployed in spring. Much easier than the annual fight with a fixed dock that froze in the ice.</p>
        <p><strong className="text-charcoal">Shallow or muddy shoreline.</strong> Places where a truck and trailer cannot safely reach deep water are natural fits for a floating drive-on platform.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Types of Floating Ramps and Docks</h2>
        <p><strong className="text-charcoal">Modular floating docks.</strong> Systems like Tommy Docks and EZ Dock use individual 4x8 or 8x10 sections that bolt together. You start with one platform and add sections over time. Great for residential use, medium-sized boats, and any layout that needs to change.</p>
        <p><strong className="text-charcoal">Roll-in docks.</strong> Aluminum-frame docks on wheels that you roll into the water in spring and back out in fall. PlayStar and ShoreMaster dominate this category. Best on sandy lake bottoms where a firm roll path exists.</p>
        <p><strong className="text-charcoal">Drive-on floating docks.</strong> Jet Dock and similar systems are built to launch and store a single boat or jet ski directly on the floating platform. You drive the boat onto the ramp, it sits above the waterline, and you drive it off when you leave.</p>
        <p><strong className="text-charcoal">Portable / inflatable ramps.</strong> Lightweight options that roll up or deflate for transport. Useful for kayaks, canoes, and very small outboards but not for full-size fishing boats.</p>
        <p><strong className="text-charcoal">DIY foam-billet docks.</strong> For the handy owner, a set of polyethylene foam billets plus pressure-treated lumber can produce a sturdy floating dock at roughly a third of the kit price. Expect a full weekend of building, plus additional time to anchor and connect to shore.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Choose</h2>
        <p><strong className="text-charcoal">Weight capacity.</strong> Add up the heaviest load the dock will ever see: your boat on a drive-on section, plus people, plus gear. Buy for the peak load, not the average.</p>
        <p><strong className="text-charcoal">Boat size.</strong> A 14-foot jon boat has very different requirements than a 22-foot bass boat. Drive-on ramps in particular are rated for specific hull sizes — match the product to your boat, not your budget.</p>
        <p><strong className="text-charcoal">Water conditions.</strong> Protected coves tolerate light-duty systems. Open lakes with wind fetch, current, or boat wakes need heavier floats, larger anchors, and reinforced connectors. Saltwater requires stainless steel or bronze hardware and more frequent maintenance.</p>
        <p><strong className="text-charcoal">Decking material.</strong> Polyethylene decking never rots, barely fades, and requires no sealing. It costs more up front than treated lumber but pays for itself in 10 to 15 years of no maintenance.</p>
        <p><strong className="text-charcoal">Anchoring system.</strong> Pipe anchors, auger anchors, or chain-and-weight moorings each suit different bottom conditions. Sand takes augers well, rocky bottoms need chain and weights, and soft muck calls for oversized pipe anchors driven deep.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Top-Rated Products on Amazon</h2>
        <p className="text-gray-400 text-xs">As an Amazon Associate we earn from qualifying purchases.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose mt-4">
          {products.map((p) => (
            <div key={p.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
              <p className="font-bold text-charcoal text-sm">{p.name}</p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{p.desc}</p>
              <a
                href={amazonSearch(p.query)}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="inline-block mt-3 text-xs font-semibold text-sunset hover:text-sunset-dark transition"
              >
                &#9733; Our Pick &mdash; View on Amazon
              </a>
            </div>
          ))}
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Installation Tips</h2>
        <p><strong className="text-charcoal">Start with a dry-run on shore.</strong> Bolt the whole dock together on the beach or driveway before you put it in the water. Mis-fitting connectors are much easier to diagnose on dry land.</p>
        <p><strong className="text-charcoal">Upgrade the hardware.</strong> Most kits ship with middling fasteners. Replacing them with hot-dip galvanized (freshwater) or 316 stainless (saltwater) before first launch adds years to the life of the dock.</p>
        <p><strong className="text-charcoal">Build the gangway last.</strong> Your dock will settle and shift slightly after the first few days on the water. Wait to lock in the gangway (the ramp from shore to dock) until everything has reached its natural position.</p>
        <p><strong className="text-charcoal">Anchor generously.</strong> The first storm of the year is when undersized anchors fail. Buy one size up from what the manufacturer recommends. A replacement dock costs far more than extra anchors.</p>
        <p><strong className="text-charcoal">Think about the ramp surface.</strong> Bare polyethylene decking gets slick when wet. Non-slip matting or adhesive grip strips along the main walking path are worth adding before your first wet feet.</p>
        <p>For a full pre-season walkthrough on anything with wheels, read our <Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">boat trailer maintenance checklist</Link>. If you pull the dock for winter, our <Link href="/blog/winterize-your-boat" className="text-water hover:underline">winterization guide</Link> covers how to store floats and hardware through freeze-thaw. Getting ready to deploy in spring? See our <Link href="/blog/spring-boat-prep" className="text-water hover:underline">spring boat prep</Link> post.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Cost Comparison</h2>
        <p><strong className="text-charcoal">$500 to $1,000</strong> gets you a single 4x8 residential dock section or a small roll-in dock suitable for kayaks and jon boats.</p>
        <p><strong className="text-charcoal">$1,500 to $3,000</strong> buys a full 8x10 modular platform kit, or a basic drive-on floating ramp for PWCs and small boats.</p>
        <p><strong className="text-charcoal">$3,500 to $5,500</strong> covers a mid-size residential system — an 8x16 dock plus a gangway plus entry-level anchoring.</p>
        <p><strong className="text-charcoal">$5,500 to $10,000+</strong> is the range for a drive-on floating dock rated for a full-size bass boat or center console, or a commercial-grade modular system like EZ Dock with multiple slips.</p>
        <p>Compare those numbers against the cost of years of launching at pay ramps ($10 to $20 per launch, twice a week, for a season, is $1,000 to $3,000), plus drive time, and the math can tilt toward a permanent floating setup faster than you&apos;d think.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Where Floating Systems Fall Short</h2>
        <p>They are not for every situation. If you have a public ramp five minutes away, a floating dock on your shoreline is nice-to-have rather than essential. If your lake freezes solid and your water level only moves a foot or two, a fixed dock is cheaper, lower maintenance, and often more rigid underfoot. And if you trailer your boat to different lakes every weekend, a home-installed floating ramp does not help — you still need public ramps at the destinations.</p>
        <p>Use our directory to <Link href="/" className="text-water hover:underline">find public ramps near you</Link> in every state, or see our guide to <Link href="/blog/free-boat-ramps-how-to-find-them" className="text-water hover:underline">free vs paid ramps</Link>. If you keep your boat in a slip rather than on a trailer, browse marinas with floating docks on our sister site <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">MarinaSeeker</a>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Frequently Asked Questions</h2>
        <div className="space-y-3 not-prose mt-4">
          {faqs.map((f) => (
            <details key={f.q} className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">
                {f.q}
                <span className="text-water ml-2 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>

        <BlogCletusCallout />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-4">More from the Blog</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-20" style={{ background: p.gradient }} />
              <div className="p-4">
                <span className="text-[10px] font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{p.category}</span>
                <h4 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm mt-2 line-clamp-2">{p.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{p.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
