import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("must-have-boat-trip-items")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "boat trip essentials, boating gear list, must have boat items, boat safety equipment, boating checklist",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-16", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Must-Have Boat Trip Items", "item": `https://rampseeker.com/blog/must-have-boat-trip-items` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Must-Have Boat Trip Items</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Every boater has driven halfway to the lake before realizing they forgot something important. Sometimes it&apos;s an inconvenience &mdash; no sunscreen means a miserable sunburn. Other times it&apos;s a safety issue &mdash; no life jackets means you&apos;re breaking federal law. <strong className="text-charcoal">The 10 items on this list aren&apos;t optional extras. They&apos;re the essentials that every boat should carry on every single trip.</strong></p>
        <p>Before you head out to the ramp, run through this list. If you&apos;re still working on your launch routine, check out our <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">step-by-step boat launch guide</Link> and our <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">boat ramp etiquette rules</Link> to make sure you&apos;re ready for the whole experience.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">1. Life Jackets (U.S. Coast Guard Approved)</h2>
        <p>This is non-negotiable. Federal law requires one properly fitting, U.S. Coast Guard-approved life jacket for every person on board. Children under 13 must wear theirs in most states. It doesn&apos;t matter if you&apos;re an Olympic swimmer &mdash; an unexpected fall into cold water can cause gasping, muscle cramps, and panic within seconds. Buy quality Type III PFDs that are comfortable enough that people will actually wear them, not just stuff them under a seat.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">2. First Aid Kit</h2>
        <p>Hooks in fingers, sliced hands on prop edges, jellyfish stings, rolled ankles on slippery ramps &mdash; minor injuries happen constantly on the water. A basic marine first aid kit should include bandages, antiseptic wipes, gauze, medical tape, pain relievers, seasickness medication, and tweezers. Keep it in a waterproof container and check the expiration dates at the start of every season. You can grab a solid <a href="https://www.amazon.com/s?k=marine+first+aid+kit&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-water hover:underline">marine first aid kit on Amazon</a> for under $30.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">3. Sunscreen (SPF 50+)</h2>
        <p>Water reflects UV rays, which means you&apos;re getting hit from above and below. A full day on the water without sun protection can result in second-degree burns that ruin your week. Apply SPF 50 or higher before you leave the dock, and reapply every two hours. Don&apos;t forget the tops of your ears, the back of your neck, and the tops of your feet. Spray sunscreen is convenient but apply it generously &mdash; most people don&apos;t use enough.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">4. Anchor</h2>
        <p>Whether you&apos;re fishing a calm cove, swimming at a sandbar, or dealing with a mechanical breakdown, you need a way to hold your position. A Danforth-style fluke anchor works for most inland boats. Match the anchor weight to your boat size &mdash; most 16-20 foot boats need a 10-15 pound anchor with at least 7:1 scope ratio of line to water depth. Don&apos;t forget adequate anchor line and a few feet of chain between the line and anchor to help it set.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">5. Throwable Flotation Device (Type IV PFD)</h2>
        <p>In addition to wearable life jackets, federal law requires boats 16 feet and longer to carry at least one Type IV throwable device &mdash; a ring buoy or seat cushion style. This is what you throw to someone who&apos;s fallen overboard when they&apos;re too far to reach by hand. Keep it accessible, not buried under gear. When seconds count, you don&apos;t want to be digging through a storage compartment.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">6. Basic Tool Kit</h2>
        <p>Things break on the water. A loose battery connection, a stuck throttle cable, a busted fuel line clamp &mdash; a basic tool kit can turn a tow-in situation into a 10-minute fix. Pack an adjustable wrench, pliers, a multi-bit screwdriver, electrical tape, zip ties, spare fuses, a knife, and a small roll of duct tape. A <a href="https://www.amazon.com/s?k=marine+tool+kit+boat&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-water hover:underline">compact marine tool kit</a> covers most of these in one bag.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">7. Fire Extinguisher</h2>
        <p>Most boats with enclosed fuel compartments, engine compartments, or enclosed living spaces are required by law to carry a fire extinguisher. Even if your boat is exempt, carry one anyway. Fuel vapors, electrical shorts, and engine overheating can all spark a fire. A B-1 marine-rated dry chemical extinguisher is the standard for boats under 26 feet. Mount it where you can grab it in seconds, and check the gauge every trip to make sure it&apos;s still charged.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">8. Navigation Lights</h2>
        <p>If there&apos;s any chance you&apos;ll be on the water between sunset and sunrise, you need working navigation lights. Red and green bow lights plus a white stern light are the minimum for most powerboats. Check them before every trip &mdash; a burned-out bulb is easy to miss during the day, but another boater won&apos;t see you at dusk. States like <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, and <Link href="/alabama" className="text-water hover:underline">Alabama</Link> actively enforce navigation light requirements.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">9. VHF Radio</h2>
        <p>Cell phones lose signal on the water all the time. A VHF marine radio is your reliable connection to the Coast Guard (Channel 16), other boaters, and marine weather updates. Handheld units are affordable, waterproof, and don&apos;t require a license for recreational use in the U.S. Even if you&apos;re on an inland lake in <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link> or <Link href="/michigan" className="text-water hover:underline">Michigan</Link>, a VHF radio gives you a communication backup that your phone can&apos;t match.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">10. Waterproof Phone Case</h2>
        <p>Your phone is your camera, GPS, weather app, and emergency contact device. One splash and it&apos;s done. A quality <a href="https://www.amazon.com/s?k=waterproof+phone+case+boating&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-water hover:underline">waterproof phone case or pouch</a> costs under $15 and protects a $1,000 device. Get one that floats &mdash; if the phone goes overboard inside a floating case, you can actually retrieve it. Most modern waterproof cases still allow touchscreen use and camera access through the clear window.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Build Your Checklist and Stick to It</h2>
        <p>The best boaters are the ones who never leave the driveway without checking their gear. Print this list, tape it inside your truck console, and run through it before every trip. It takes two minutes and can save your day &mdash; or your life.</p>
        <p>Ready to find your next ramp? RampSeeker lists boat ramp details, amenities, and conditions across <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, <Link href="/california" className="text-water hover:underline">California</Link>, <Link href="/tennessee" className="text-water hover:underline">Tennessee</Link>, and all 50 states. And once you&apos;re packed, make sure you know <Link href="/blog/how-to-back-trailer" className="text-water hover:underline">how to back your trailer like a pro</Link>.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What safety items are legally required on a boat?", acceptedAnswer: { "@type": "Answer", text: "Federal law requires one U.S. Coast Guard-approved life jacket per person on board, a throwable Type IV flotation device for boats 16 feet and longer, a fire extinguisher for boats with enclosed compartments, and navigation lights for operation between sunset and sunrise. State requirements may add additional items like whistles, flares, or visual distress signals." } },
            { "@type": "Question", name: "How much does it cost to equip a boat with all essential gear?", acceptedAnswer: { "@type": "Answer", text: "You can equip a boat with all 10 essential items for roughly $200-$400 total. Life jackets run $25-60 each, a first aid kit is $15-30, and most other items like a tool kit, fire extinguisher, and waterproof phone case are under $30 each. A VHF radio is the most expensive single item at $50-150 for a handheld unit." } },
            { "@type": "Question", name: "Should I carry a first aid kit on a small fishing boat?", acceptedAnswer: { "@type": "Answer", text: "Yes. Hook injuries, cuts from tackle and prop edges, and sunburn happen on boats of all sizes. A compact waterproof first aid kit takes up minimal space and covers the most common injuries. At a minimum, include bandages, antiseptic, pain relievers, seasickness medication, and tweezers for hook removal." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What safety items are legally required on a boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Federal law requires one U.S. Coast Guard-approved life jacket per person on board, a throwable Type IV flotation device for boats 16 feet and longer, a fire extinguisher for boats with enclosed compartments, and navigation lights for operation between sunset and sunrise. State requirements may add additional items like whistles, flares, or visual distress signals.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How much does it cost to equip a boat with all essential gear?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">You can equip a boat with all 10 essential items for roughly $200-$400 total. Life jackets run $25-60 each, a first aid kit is $15-30, and most other items like a tool kit, fire extinguisher, and waterproof phone case are under $30 each. A VHF radio is the most expensive single item at $50-150 for a handheld unit.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Should I carry a first aid kit on a small fishing boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes. Hook injuries, cuts from tackle and prop edges, and sunburn happen on boats of all sizes. A compact waterproof first aid kit takes up minimal space and covers the most common injuries. At a minimum, include bandages, antiseptic, pain relievers, seasickness medication, and tweezers for hook removal.</p>
          </details>
        </div>
      </section>

      <BlogCletusCallout />

      {related.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{r.category}</span>
                <p className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition mt-2 text-sm">{r.title}</p>
                <p className="text-gray-400 text-xs mt-1">{r.readTime}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
