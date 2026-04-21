import Link from "next/link";
import { getBlogPostBySlug } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("what-size-truck-to-tow-a-boat")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "truck size to tow boat, towing capacity for boat, tow rating, GVWR, tongue weight, boat trailer hitch class",
  openGraph: { title: post.title, url: `https://www.rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://www.rampseeker.com/blog/${post.slug}` },
};

const faqs = [
  { q: "Can a half-ton pickup tow a bass boat?", a: "Yes — most half-ton trucks (F-150, Silverado 1500, Ram 1500) have 8,000-13,000 lb tow ratings, easily handling an 18-20 ft bass boat with trailer (combined ~3,500-5,000 lbs). The issue is usually tongue weight and brake requirements, not max capacity. Check your specific trim and engine — a V6 half-ton is rated much lower than a V8 or EcoBoost." },
  { q: "What's the difference between towing capacity and GCWR?", a: "Towing capacity is the max weight the truck can pull; GCWR (Gross Combined Weight Rating) is the max combined weight of the truck, its cargo, passengers, and the trailer together. You'll hit GCWR before towing capacity if you're loaded up with people and gear. Always calculate both." },
  { q: "Do I need trailer brakes for my boat?", a: "Federal guidance and most states require trailer brakes once combined trailer + boat weight exceeds 3,000 lbs (some states are 1,500 or 1,000 lbs). California requires brakes on any trailer over 1,500 lbs. If your rig is borderline, install them — even where not legally required, they dramatically improve stopping distance." },
  { q: "How do I find my truck's tow rating?", a: "Three reliable places: (1) the door jamb sticker on the driver's side, (2) the owner's manual under 'Towing' or 'Trailer,' (3) the manufacturer's VIN-specific build sheet online. Don't rely on generic 'Ford F-150 tow rating' articles — your specific trim, engine, axle ratio, and tow package matter enormously." },
  { q: "What hitch class do I need for my boat?", a: "Class 1-2 (up to 3,500 lbs): small boats like jon boats, 14-16 ft aluminum. Class 3 (up to 8,000 lbs): most bass boats, pontoons, 18-22 ft fiberglass. Class 4 (up to 10,000 lbs): center consoles, 22-25 ft cabin boats. Class 5 (up to 20,000 lbs): larger cabin cruisers, big sportfishers. Always match or exceed your trailer's coupler size (1-7/8\", 2\", 2-5/16\")." },
];

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-21", dateModified: "2026-04-21", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqs.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : null) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.rampseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "What Size Truck to Tow a Boat", item: `https://www.rampseeker.com/blog/${post.slug}` }] }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Truck Size to Tow a Boat</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">Updated April 21, 2026 &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>&quot;I want to buy a boat &mdash; what size truck do I need?&quot; is the most-asked question in every boating Facebook group. The short answer is: <strong className="text-charcoal">match the truck to your heaviest expected combined weight, with a safety margin of at least 20%.</strong> The longer answer requires understanding three numbers your truck&apos;s spec sheet lists, and the actual weights of the boats you&apos;re considering.</p>
        <p>This guide walks through the math in plain terms, lists typical boat weights, and gives specific truck recommendations for each boat class.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">The Three Numbers That Matter</h2>
        <p><strong className="text-charcoal">GVWR (Gross Vehicle Weight Rating)</strong> &mdash; max legal weight of your truck itself, fully loaded with people, fuel, and cargo. Not about what you&apos;re towing; it&apos;s about the truck.</p>
        <p><strong className="text-charcoal">Towing capacity</strong> &mdash; max weight the truck can pull. Published by the manufacturer per trim + engine + axle + tow-package combination. Varies by $5,000+ within the same model year.</p>
        <p><strong className="text-charcoal">Tongue weight (TW)</strong> &mdash; downward force the trailer exerts on the hitch ball. Typically 10-15% of trailer weight. Ignore this and you&apos;ll either sag the rear of the truck (tongue too heavy) or sway dangerously (tongue too light).</p>
        <p>All three are on the door-jamb sticker on the driver side. Check yours before believing any generic &quot;Ford F-150 tows 13,000 lbs&quot; article.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Typical Boat + Trailer Weights</h2>
        <p>Rough figures to set expectations. Weigh your specific rig at a CAT scale before committing to borderline tow vehicles.</p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 pr-4 font-bold text-charcoal">Boat Type</th>
                <th className="text-left py-2 pr-4 font-bold text-charcoal">Boat Weight</th>
                <th className="text-left py-2 pr-4 font-bold text-charcoal">Trailer Weight</th>
                <th className="text-left py-2 font-bold text-charcoal">Combined (loaded)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">14-16 ft jon boat</td><td className="py-2 pr-4">400-700 lbs</td><td className="py-2 pr-4">300-500 lbs</td><td className="py-2">~1,000-1,500 lbs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">16-18 ft aluminum fishing</td><td className="py-2 pr-4">1,000-1,600 lbs</td><td className="py-2 pr-4">500-800 lbs</td><td className="py-2">~2,500-3,500 lbs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">18-20 ft bass boat</td><td className="py-2 pr-4">1,800-2,500 lbs</td><td className="py-2 pr-4">700-1,000 lbs</td><td className="py-2">~3,500-4,500 lbs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">18-22 ft pontoon</td><td className="py-2 pr-4">1,800-2,800 lbs</td><td className="py-2 pr-4">900-1,400 lbs</td><td className="py-2">~3,500-5,500 lbs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">21-24 ft runabout</td><td className="py-2 pr-4">3,000-4,500 lbs</td><td className="py-2 pr-4">1,000-1,500 lbs</td><td className="py-2">~5,000-7,000 lbs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">22-26 ft center console</td><td className="py-2 pr-4">4,000-6,500 lbs</td><td className="py-2 pr-4">1,200-2,000 lbs</td><td className="py-2">~6,500-9,500 lbs</td></tr>
              <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-semibold">25-28 ft cabin cruiser</td><td className="py-2 pr-4">7,000-10,000 lbs</td><td className="py-2 pr-4">2,000-3,000 lbs</td><td className="py-2">~10,000-13,500 lbs</td></tr>
              <tr><td className="py-2 pr-4 font-semibold">28-32 ft cruiser / sportfisher</td><td className="py-2 pr-4">10,000-14,000 lbs</td><td className="py-2 pr-4">3,000-4,500 lbs</td><td className="py-2">~14,000-19,000 lbs</td></tr>
            </tbody>
          </table>
        </div>
        <p>Loaded weight = boat + trailer + fuel (6 lbs/gal, most boats hold 20-60 gal) + gear + motor oil + ice/coolers. Add 300-500 lbs over dry weight for a realistic towing number.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Truck Recommendations by Boat Size</h2>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-6">Small boats (under 3,500 lbs combined)</h3>
        <p><strong className="text-charcoal">Mid-size trucks work:</strong> Ford Maverick (towing pkg: 4,000 lbs), Ford Ranger, Chevy Colorado, Nissan Frontier, Toyota Tacoma. Even a properly-equipped Subaru Outback (2,700 lbs) handles a 14 ft jon. For trailers over 1,500 lbs you&apos;ll usually want trailer brakes regardless of what state says.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-6">Medium boats (3,500-7,000 lbs combined)</h3>
        <p><strong className="text-charcoal">Half-ton pickup or full-size SUV:</strong> F-150 (V6 EcoBoost or V8, with tow package, 8,000-13,000 lbs), Silverado 1500 (5.3L V8 or 6.2L, 9,000-13,000 lbs), Ram 1500 (V8 HEMI, 8,000-12,750 lbs), Tundra, Sequoia, Tahoe, Expedition. This is the sweet spot where most recreational boaters live.</p>
        <p>Critical: make sure the truck has a tow package (typically a $500-1,500 option) &mdash; includes heavier radiator, transmission cooler, and revised axle ratio. Without it, tow rating drops by $thousands of lbs.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-6">Large boats (7,000-10,000 lbs combined)</h3>
        <p><strong className="text-charcoal">Three-quarter ton or 1-ton pickup:</strong> F-250, Silverado 2500HD, Ram 2500. Diesel strongly recommended at this weight &mdash; better torque at low RPM, far better fuel economy under load, and the transmission is built for it. Plan on a weight-distributing hitch and sway control at 7,000+ lbs.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-6">Very large boats (10,000-20,000 lbs combined)</h3>
        <p><strong className="text-charcoal">One-ton diesel pickup or fifth-wheel setup:</strong> F-350 dually, Silverado 3500HD, Ram 3500. At this weight you&apos;re in commercial-truck territory. Gooseneck or fifth-wheel hitch is standard. Most cabin cruisers this size are slip-kept, not trailered; owners typically hire professional transport for seasonal moves.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">The 20% Safety Margin Rule</h2>
        <p>Manufacturer ratings are published under ideal conditions: flat road, mild weather, correctly-maintained truck, proper load distribution. Real-world towing involves hills, cross-winds, bad drivers, and hot summer days. Plan your rig at <strong className="text-charcoal">80% of published tow rating max</strong> to preserve margin.</p>
        <p>Example: F-150 rated at 10,000 lbs &rarr; plan on 8,000 lbs max combined weight for realistic long-term towing.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Hitch Classes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Class I</strong>: up to 2,000 lbs trailer, 200 lbs tongue. 1-1/4&quot; receiver. Cars and small SUVs.</li>
          <li><strong className="text-charcoal">Class II</strong>: up to 3,500 lbs trailer, 350 lbs tongue. 1-1/4&quot; receiver. Mid-size SUVs, small trucks.</li>
          <li><strong className="text-charcoal">Class III</strong>: up to 8,000 lbs trailer, 800 lbs tongue. 2&quot; receiver. Most half-ton trucks come standard.</li>
          <li><strong className="text-charcoal">Class IV</strong>: up to 10,000 lbs trailer, 1,000 lbs tongue. 2&quot; receiver. Half-ton with HD tow pkg, or three-quarter ton.</li>
          <li><strong className="text-charcoal">Class V</strong>: up to 20,000 lbs, 2,700 lbs tongue. 2-1/2&quot; receiver. One-ton and larger. Weight-distributing system usually required above 10,000 lbs.</li>
        </ul>
        <p>Always match the trailer coupler size (1-7/8&quot;, 2&quot;, or 2-5/16&quot;) to your hitch ball &mdash; mismatched couplers cause trailer detachment.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Common Mistakes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Buying the truck for max rating.</strong> Real-world towing should never hit the rating; it&apos;s a limit, not a target.</li>
          <li><strong className="text-charcoal">Forgetting the payload limit.</strong> Tongue weight + passengers + gear all count against payload (typically ~1,500-2,000 lbs on a half-ton). Easy to exceed.</li>
          <li><strong className="text-charcoal">Skipping the brake controller.</strong> Trailers over 3,000 lbs should have their own brakes, activated via an in-cab controller. $150 install.</li>
          <li><strong className="text-charcoal">Loading the boat wrong.</strong> Heavy gear forward = too much tongue weight (truck rear sags); heavy gear aft = trailer sway at highway speed.</li>
          <li><strong className="text-charcoal">Ignoring state-specific rules.</strong> California, New York, and a few others have stricter brake-weight thresholds and width/length limits. Research your routes.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-[Cabin] font-bold text-charcoal text-lg">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Related Reading</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">Boat Trailer Maintenance Checklist</Link></li>
          <li><Link href="/blog/backing-boat-trailer-beginner-guide" className="text-water hover:underline">How to Back a Boat Trailer</Link></li>
          <li><Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">How to Launch a Boat Safely</Link></li>
          <li><Link href="/blog/boat-ramp-parking-tips" className="text-water hover:underline">Boat Ramp Parking Rules</Link></li>
          <li><Link href="/" className="text-water hover:underline">Browse 27,000+ boat ramps nationwide</Link></li>
        </ul>
      </div>
    </article>
  );
}
