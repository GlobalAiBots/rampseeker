import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("how-to-launch-a-boat-safely")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "how to launch a boat, boat launch safety, boat ramp guide, launching a boat for the first time",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-11", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "How to Launch a Boat Safely", "item": `https://rampseeker.com/blog/how-to-launch-a-boat-safely` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">How to Launch a Boat Safely</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Every boater remembers their first time at the ramp. The line of trucks behind you, the pressure to move fast, the sudden realization that backing a trailer isn&apos;t as easy as it looks. <strong className="text-charcoal">Launching a boat safely is a skill that takes practice, but it starts with knowing the right steps before you ever back down the ramp.</strong></p>
        <p>Whether you&apos;re launching for the first time or just want to tighten up your routine, this guide covers everything from your driveway to the water and back again. If you&apos;re brand new, check out our <Link href="/blog/how-to-launch-boat-beginner-guide" className="text-water hover:underline">complete beginner&apos;s guide</Link> for even more detail.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">The Pre-Launch Checklist</h2>
        <p>Smart boaters do most of their prep in the parking lot, not on the ramp. This is the single biggest thing you can do to launch safely and avoid holding up the line. Pull into the staging area &mdash; the flat parking lot near the ramp &mdash; and work through this list before you ever get in the backing lane.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Remove all tie-down straps and transom straps.</strong> Leave only the winch strap attached to the bow eye. Forgetting a strap is the #1 cause of failed launches &mdash; the boat won&apos;t slide off the trailer, and you&apos;re stuck on the ramp trying to figure out why.</li>
          <li><strong className="text-charcoal">Insert the <a href="https://www.amazon.com/s?k=boat+drain+plug+brass&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">drain plug (Our Pick on Amazon)</a>.</strong> This sounds obvious, but every ramp regular has watched a boat fill with water because someone forgot the plug. Check it twice. Make it part of your muscle memory.</li>
          <li><strong className="text-charcoal">Load your gear.</strong> Coolers, tackle boxes, rods, <a href="https://www.amazon.com/s?k=coast+guard+approved+life+jacket+adult&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">life jackets (Our Pick on Amazon)</a> &mdash; load everything while you&apos;re in the parking lot. Don&apos;t do it on the ramp while others are waiting.</li>
          <li><strong className="text-charcoal">Trim the motor up.</strong> Tilt or trim your outboard or outdrive fully up so it doesn&apos;t hit the ramp concrete. Lower it only after the boat is floating in deep enough water.</li>
          <li><strong className="text-charcoal">Connect the battery and check electronics.</strong> Turn on the key, confirm your fish finder powers up, and check your fuel gauge. Better to find a dead battery in the parking lot than on the ramp.</li>
          <li><strong className="text-charcoal">Attach your bow and stern lines.</strong> Have <a href="https://www.amazon.com/s?k=marine+dock+lines+braided+nylon&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">dock lines (Our Pick on Amazon)</a> ready to tie off at the courtesy dock as soon as the boat is in the water.</li>
        </ul>
        <p>For trailer-specific prep, our <Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">trailer maintenance checklist</Link> covers bearings, tires, lights, and everything else that can go wrong between the parking lot and the water.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Backing Down the Ramp</h2>
        <p>This is the part that intimidates new boaters the most. The good news: it gets dramatically easier with practice, and most ramps are more forgiving than you think.</p>
        <p><strong className="text-charcoal">Use your side mirrors.</strong> Forget the rearview mirror &mdash; you can&apos;t see past the boat. Your driver-side mirror shows you the left trailer fender, and the passenger-side mirror shows the right. When both fenders are equidistant from the ramp edges, you&apos;re straight.</p>
        <p><strong className="text-charcoal">Go slow and make small corrections.</strong> The biggest mistake beginners make is oversteering. If the trailer starts drifting left, turn the wheel slightly right &mdash; then straighten out. Small inputs. If you get way off track, pull forward and start over. Nobody at the ramp will judge you for resetting; they will judge you for jackknifing.</p>
        <p><strong className="text-charcoal">Back in until the trailer bunks or rollers are submerged.</strong> You want enough of the trailer underwater that the boat will float off when you release the winch strap, but not so deep that water reaches your vehicle&apos;s tailpipe. On most trailers, this means the fender is just above the waterline.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Getting the Boat Off the Trailer</h2>
        <p>With the trailer at the right depth, set your parking brake and put the truck in park. Walk to the bow and release the winch strap. On a roller trailer, the boat should slide right off with a gentle push. On a bunk trailer, you may need to give the boat a firmer shove or use the engine to power off &mdash; just make sure the motor is trimmed down into the water first.</p>
        <p>Have someone at the courtesy dock ready to grab the bow line, or cleat your line before releasing the boat. A boat floating free with no line and no one aboard is a disaster waiting to happen &mdash; wind or current can push it into another boat or into the dock pilings within seconds.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Loading: Getting the Boat Back On</h2>
        <p>Loading is the reverse of launching, but it has its own challenges &mdash; especially when you&apos;re tired after a long day on the water. Back the trailer down to the same depth as launching. Idle the boat slowly toward the trailer, aiming for the center of the bunks or rollers. <strong className="text-charcoal">Power-loading</strong> (using the engine to drive the boat onto the trailer) is common but controversial &mdash; it&apos;s fast and effective, but the prop wash erodes sediment around the ramp. Many ramps in <Link href="/florida" className="text-water hover:underline">Florida</Link> and <Link href="/texas" className="text-water hover:underline">Texas</Link> have signs prohibiting it.</p>
        <p>Once the bow is seated against the winch post, attach the winch strap and hook the safety chain. Then pull forward out of the water, reattach your transom straps in the parking lot, and you&apos;re done.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Ramp Etiquette and Common Courtesy</h2>
        <p>Boat ramps are shared spaces, and the unwritten rules exist for good reason. The golden rule is simple: <strong className="text-charcoal">don&apos;t block the ramp.</strong> Do your prep in the parking lot, launch quickly, and pull your truck and trailer out as soon as the boat is floating. For the full list of ramp dos and don&apos;ts, read our <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">boat ramp etiquette guide</Link>.</p>
        <p>If you&apos;re launching in the dark for early-morning fishing, our <Link href="/blog/night-launching-tips" className="text-water hover:underline">night launching tips</Link> cover gear, lighting, and techniques for safe pre-dawn trips.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Common Mistakes to Avoid</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Forgetting the drain plug.</strong> Tape a reminder to your steering wheel or key fob until it becomes habit.</li>
          <li><strong className="text-charcoal">Leaving straps on.</strong> Walk the full length of the trailer and visually confirm every strap is removed before backing in.</li>
          <li><strong className="text-charcoal">Backing in too deep.</strong> If water reaches your truck&apos;s exhaust pipe, you&apos;re too deep. On steep ramps, this can happen fast.</li>
          <li><strong className="text-charcoal">Not setting the parking brake.</strong> Wet ramps are slick. Trucks have rolled into the lake because the driver relied on &quot;park&quot; instead of the parking brake.</li>
          <li><strong className="text-charcoal">Prepping on the ramp.</strong> Loading coolers, rigging rods, and untying straps while on the ramp creates a long line behind you. Do it all in the staging area.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Find a Ramp and Get on the Water</h2>
        <p>Ready to put this into practice? RampSeeker lists over 29,000 boat ramps across the US. Find ramps near you in <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/michigan" className="text-water hover:underline">Michigan</Link>, and every other state. Every listing includes ramp type, lane count, amenities, and user reviews so you know exactly what to expect before you arrive.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How deep should I back my trailer into the water?", acceptedAnswer: { "@type": "Answer", text: "Back in until the trailer bunks or rollers are fully submerged and the fenders are just above the waterline. The boat should float off the trailer when you release the winch strap. Avoid backing in so deep that water reaches your truck's exhaust pipe." } },
            { "@type": "Question", name: "What is the most common mistake when launching a boat?", acceptedAnswer: { "@type": "Answer", text: "Forgetting to remove the transom tie-down straps before backing into the water. The boat won't slide off the trailer with straps still attached, and you'll be stuck on the ramp trying to figure out why. Always do a full walk-around check in the staging area." } },
            { "@type": "Question", name: "Should I use the parking brake on a boat ramp?", acceptedAnswer: { "@type": "Answer", text: "Always set the parking brake when your vehicle is on the ramp. Wet concrete is slippery, and relying on the transmission alone is not safe. Trucks have rolled into the water because the driver only put the vehicle in park without engaging the parking brake." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How deep should I back my trailer into the water?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Back in until the trailer bunks or rollers are fully submerged and the fenders are just above the waterline. The boat should float off the trailer when you release the winch strap. Avoid backing in so deep that water reaches your truck&apos;s exhaust pipe.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What is the most common mistake when launching a boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Forgetting to remove the transom tie-down straps before backing into the water. The boat won&apos;t slide off the trailer with straps still attached, and you&apos;ll be stuck on the ramp trying to figure out why. Always do a full walk-around check in the staging area.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Should I use the parking brake on a boat ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Always set the parking brake when your vehicle is on the ramp. Wet concrete is slippery, and relying on the transmission alone is not safe. Trucks have rolled into the water because the driver only put the vehicle in park without engaging the parking brake.</p>
          </details>
        </div>
      </section>

      <GearRecommendation section="launch-gear" />

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
