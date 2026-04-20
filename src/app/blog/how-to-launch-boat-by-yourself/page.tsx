import Link from "next/link";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("how-to-launch-boat-by-yourself")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: "Launching a boat by yourself, step by step. Rigging, tie-off, backing technique, and the tricks solo boaters use to avoid the ramp stare-down.",
  keywords: "solo boat launch tips, launch boat alone, single handed boat launch, solo boating",
  openGraph: { title: post.title, url: `https://www.rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://www.rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-20", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Solo Boat Launch", "item": `https://www.rampseeker.com/blog/${post.slug}` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Solo Boat Launch</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Launching a boat by yourself sounds intimidating the first time you try it. There&apos;s the fear of rolling into the water, the pressure of the line behind you, and the very real question of how you&apos;re going to hold the boat while parking the truck. <strong className="text-charcoal">Here&apos;s the truth: solo launching is a skill, not a stunt.</strong> Once you&apos;ve done it five or six times with the right setup, it&apos;s faster and less stressful than launching with a distracted passenger.</p>
        <p>This guide covers the gear, the sequence, and the mental model that makes solo launching routine. If you&apos;re new to launching in general, read our <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">boat launching guide</Link> first &mdash; this post builds on those fundamentals.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Before You Arrive</h2>
        <p>The single biggest factor in a successful solo launch is how much of the work you do before you ever back down the ramp. When you&apos;re alone, there&apos;s no one to hand you a line, hold the bow, or pull the truck forward. Every step has to happen in sequence, and if you show up unprepared, that sequence breaks down fast.</p>
        <p>At home or at a staging area away from the ramp, get the boat ramp-ready. Load gear, check the drain plug, trim the motor up, and double-check that every tie-down except the winch strap is off. If the ramp has a staging parking lot, use it &mdash; pull in, do your prep, and only then move to the backing lane.</p>
        <p>The goal: when you arrive at the top of the ramp, the only things left are backing in, releasing the winch, and tying off. That&apos;s a 90-second job if it&apos;s set up right.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">The Essential Gear for Solo Launches</h2>
        <p>A few pieces of gear transform solo launching from awkward to effortless:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">A long bow line.</strong> Fifteen to twenty feet. Long enough to walk the boat from the trailer to the courtesy dock without letting go. A short line means you&apos;re diving for it as the boat floats away.</li>
          <li><strong className="text-charcoal">A ramp runner or non-slip shoes.</strong> Wet algae-covered concrete is treacherous. Rubber-soled water shoes or purpose-made ramp shoes keep you upright while you handle lines.</li>
          <li><strong className="text-charcoal">Dock hooks or a boat hook.</strong> For pulling the boat to the dock without getting your feet wet.</li>
          <li><strong className="text-charcoal">A cleat knot you can tie fast.</strong> A cleat hitch takes three seconds once you know it. Practice in your driveway until it&apos;s automatic.</li>
          <li><strong className="text-charcoal">A kill switch lanyard that stays on the boat.</strong> When you step off, the engine stays off.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Step-by-Step Solo Launch</h2>
        <p>This sequence assumes you&apos;ve prepped the boat in the staging area and the courtesy dock is on one side of the ramp.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-charcoal">Tie the long bow line to the bow cleat.</strong> Run the free end down the side of the boat and loop it loosely over a cleat, gunwale, or the trailer fender &mdash; somewhere you can grab it from the dock side.</li>
          <li><strong className="text-charcoal">Back down the ramp</strong> until the bunks are submerged enough that the boat will float free. Set the parking brake. Put the truck in park.</li>
          <li><strong className="text-charcoal">Walk to the bow</strong> and release the winch strap and safety chain. Grab the free end of the bow line.</li>
          <li><strong className="text-charcoal">Give a gentle push.</strong> The boat slides off and floats. You&apos;re still holding the line.</li>
          <li><strong className="text-charcoal">Walk the boat to the courtesy dock</strong> with the bow line. Tie it off to a dock cleat with a cleat hitch.</li>
          <li><strong className="text-charcoal">Park the truck.</strong> Now the boat is secure and you have time.</li>
          <li><strong className="text-charcoal">Board the boat,</strong> start up, and head out.</li>
        </ol>
        <p>For retrieval you run the sequence in reverse: tie boat to dock, back trailer down, walk boat to trailer, winch on, drive out.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Common Solo Launch Mistakes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Short bow line.</strong> The boat floats away before you can grab it. You end up swimming. Use a 15-foot line minimum.</li>
          <li><strong className="text-charcoal">Forgetting to set the parking brake.</strong> Wet concrete + unattended truck = expensive news story. Always brake.</li>
          <li><strong className="text-charcoal">Skipping the staging area.</strong> Unstrapping, plugging in, and loading gear while on the ramp is the fastest way to earn dirty looks from the line behind you.</li>
          <li><strong className="text-charcoal">Launching in crosswind without a plan.</strong> Wind blowing off the dock pushes the boat away from you. Launch on the lee side of the ramp when you can.</li>
          <li><strong className="text-charcoal">Not practicing backing beforehand.</strong> If you can&apos;t reliably back a trailer solo, practice in an empty parking lot first. Our <Link href="/blog/how-to-back-trailer" className="text-water hover:underline">backing guide</Link> covers technique in detail.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Weather and Wind Considerations</h2>
        <p>Wind is the solo boater&apos;s biggest enemy at the ramp. Even a 10-knot crosswind can push a freshly-launched boat hard enough that retrieving it alone becomes a real workout. Before you launch, look at the wind direction relative to the ramp and courtesy dock.</p>
        <p>If the wind is blowing toward the dock, you&apos;re in luck &mdash; the boat drifts right where you want it. If it&apos;s blowing away from the dock, launch fast, grab the line short, and walk it firmly to the cleat. On days with gusts above 20 knots, consider whether the trip is worth it at all, especially if you&apos;re new to solo launching.</p>
        <p>Rain is a separate issue. Wet ramps are slick ramps. Move deliberately, stay off the very bottom of the submerged concrete, and wear grippy shoes.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Retrieve Solo</h2>
        <p>Retrieval is where most solo boaters get flustered, because the adrenaline of the launch is gone and the boat ramp is often busier at the end of the day.</p>
        <p>Tie the boat to the courtesy dock first. Walk back to the truck and back the trailer down to launching depth. Set the parking brake, walk to the dock, untie the boat, and walk it over to the trailer using your bow line. Center it on the bunks, hook the winch strap, crank it tight, and pull out.</p>
        <p>If your ramp is steep or the wind is pushing hard against you, it&apos;s fine to power-load the boat onto the trailer from the driver&apos;s seat &mdash; just check local rules first, because some states and many Florida ramps restrict power-loading due to sediment erosion. See our <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">boat ramp etiquette guide</Link> for more on that.</p>
        <p>If you launch before sunrise, our <Link href="/blog/night-launching-tips" className="text-water hover:underline">night launching tips</Link> cover the lighting and gear that make solo dark-launches manageable.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Practice Builds Confidence</h2>
        <p>Nobody solo-launches smoothly on their first try. Pick a quiet weekday morning at a ramp you know, run through the sequence twice, and it&apos;ll start feeling routine. After ten or twelve solo trips, you&apos;ll wonder why you ever thought it needed a second person.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Is it safe to launch a boat alone?", acceptedAnswer: { "@type": "Answer", text: "Yes, solo launching is safe once you have the technique down. The keys are setting the parking brake, using a long bow line to control the boat, and doing all prep work away from the ramp so you're not rushed. Thousands of boaters launch solo every day." } },
            { "@type": "Question", name: "What's the trick to solo boat launching?", acceptedAnswer: { "@type": "Answer", text: "The main trick is a long bow line — at least 15 feet — tied to the bow and run down the side of the boat so you can grab it from the dock side after the boat floats free. You walk the boat to the courtesy dock on the line, tie it off, then park the truck." } },
            { "@type": "Question", name: "Do I need a long bow line for solo launching?", acceptedAnswer: { "@type": "Answer", text: "Yes. A 15- to 20-foot bow line is the single most important piece of gear for solo launches. A short line means the boat floats away from the ramp before you can grab it. A long line lets you walk the boat to the courtesy dock and tie it off without getting wet." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Is it safe to launch a boat alone?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes, solo launching is safe once you have the technique down. The keys are setting the parking brake, using a long bow line to control the boat, and doing all prep work away from the ramp so you&apos;re not rushed. Thousands of boaters launch solo every day.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What&apos;s the trick to solo boat launching?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">The main trick is a long bow line &mdash; at least 15 feet &mdash; tied to the bow and run down the side of the boat so you can grab it from the dock side after the boat floats free. You walk the boat to the courtesy dock on the line, tie it off, then park the truck.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Do I need a long bow line for solo launching?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes. A 15- to 20-foot bow line is the single most important piece of gear for solo launches. A short line means the boat floats away from the ramp before you can grab it. A long line lets you walk the boat to the courtesy dock and tie it off without getting wet.</p>
          </details>
        </div>
      </section>

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
