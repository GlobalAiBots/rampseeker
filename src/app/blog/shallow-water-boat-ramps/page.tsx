import Link from "next/link";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("shallow-water-boat-ramps")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: "Shallow water boat ramps — how to launch in low water, which ramps handle drought conditions, and trailer extensions that save the day.",
  keywords: "shallow draft boat ramps, low water boat ramp, trailer tongue extension, launch in low water",
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
          { "@type": "ListItem", "position": 3, "name": "Shallow Water Boat Ramps", "item": `https://www.rampseeker.com/blog/${post.slug}` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Shallow Water Boat Ramps</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Drought, drawdown, and late-season low water can turn a familiar boat ramp into an unusable pile of concrete and mud. The ramp you&apos;ve used for years sits 20 feet from the water&apos;s edge. The one next to it drops steeply into three inches of muck. <strong className="text-charcoal">Launching in shallow water is a skill that matters more every year as reservoirs run lower during dry summers.</strong></p>
        <p>This guide covers how to identify a shallow-friendly ramp, the trailer tricks that make low-water launches work, and when to call it and come back another day.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Why Water Levels Matter</h2>
        <p>Launching a boat requires enough water depth for three things to happen: the trailer bunks need to be submerged enough that the boat floats free, your tow vehicle&apos;s rear tires need to stay on paved ramp surface (not mud), and the outboard or outdrive needs clearance to start and maneuver without hitting bottom.</p>
        <p>In normal water, none of that is a concern. Most ramps are built to reach water even at seasonal low pool. But when a lake drops 10, 20, or 30 feet below normal &mdash; which has happened at reservoirs across the western U.S. in recent years &mdash; many ramps stop reaching the water entirely.</p>
        <p>If your ramp is high and dry, you have three options: find a different ramp at the same lake, drive to a different lake, or wait for water to come back up. Forcing a launch on a ramp that&apos;s out of water ends in a stuck trailer and a call to the tow truck.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Identifying a Shallow-Water-Friendly Ramp</h2>
        <p>Some ramps handle low water well. Others fall off a cliff the minute the lake drops below normal pool. The shallow-water-friendly ramps share a few traits:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Long ramp extension into the lake.</strong> A ramp that extends 50+ feet into the water at normal pool will still reach water when the lake is down five to ten feet. Short ramps run out of concrete fast.</li>
          <li><strong className="text-charcoal">Low grade.</strong> A gentle slope (5-10% grade) extends more usable ramp length per foot of water drop than a steep grade. Steep ramps lose their water quickly.</li>
          <li><strong className="text-charcoal">Floating courtesy dock.</strong> Floating docks rise and fall with the water level. Fixed docks become unusable when the water drops below them. Floating dock ramps stay functional much longer.</li>
          <li><strong className="text-charcoal">Designated low-water ramp at the lake.</strong> Many large reservoirs have one or two ramps specifically engineered for drought conditions. Local marinas and the managing agency know which ones. Ask.</li>
        </ul>
        <p>Our <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">boat launch guide</Link> covers the general fundamentals. In shallow conditions, all those fundamentals still apply &mdash; you just need more runway.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Trailer Extensions and Drop-Down Tongues</h2>
        <p>The single best investment for a regular shallow-water boater is a trailer with a drop-down or removable tongue extension. These let you extend the trailer an extra 4 to 8 feet into the water without backing your truck any farther.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Drop-down tongue.</strong> A hinged or telescoping trailer tongue that extends with a pin release. Some are built into the trailer; some are aftermarket bolt-on kits.</li>
          <li><strong className="text-charcoal">Removable tongue extension.</strong> A short receiver tube that attaches between the ball and the trailer coupler, adding 4-6 feet of length. Less expensive than a drop-down but slower to install.</li>
          <li><strong className="text-charcoal">Strap extension.</strong> A simple long strap attached to the winch post that lets you float the boat backward off the trailer without the trailer itself moving farther.</li>
        </ul>
        <p>A drop-down tongue solves low-water launches at most reservoir ramps. It&apos;s one of the highest-value upgrades for anyone boating in the West or on any reservoir prone to drawdown.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Launch in Low Water</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-charcoal">Scout the ramp first.</strong> Walk down before you back in. How far is the water from the end of the concrete? Is there mud or just exposed concrete? Is the transition slippery?</li>
          <li><strong className="text-charcoal">Back farther than usual.</strong> You need deeper-than-normal submersion to get the bunks low enough. Watch your tailpipe &mdash; if water is within 6 inches of the exhaust, stop.</li>
          <li><strong className="text-charcoal">Use the float-off technique.</strong> With the trailer at depth, release the winch strap and gently push the boat rearward. If the bunks are wet enough, it floats off. If not, you need to go deeper &mdash; or use your tongue extension.</li>
          <li><strong className="text-charcoal">Trim the motor strategically.</strong> In shallow water, trim up to keep the prop and skeg off the bottom. Start the engine only once you&apos;re clearly in floating water.</li>
          <li><strong className="text-charcoal">Idle out carefully.</strong> Shallow ramps are often surrounded by shallow flats full of rocks, stumps, and silt. Take the most direct route to deep water at low speed.</li>
        </ol>
        <p>If your engine skeg hits bottom on the way out, that&apos;s a sign the ramp is borderline. Don&apos;t launch there at lower water.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Regional Low-Water Situations</h2>
        <p>A handful of major reservoirs have seen extensive low-water conditions in recent years, and knowing which ones require extra planning saves trips:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Lake Mead (Nevada/Arizona).</strong> Decades of drought have dropped the lake dramatically below historic levels. Several ramps have closed or been extended. Before planning a trip, check current launch status with the National Park Service. Our <Link href="/arizona" className="text-water hover:underline">Arizona ramp directory</Link> includes nearby alternatives.</li>
          <li><strong className="text-charcoal">Lake Powell (Utah/Arizona).</strong> Similar situation. Major ramps have closed as water levels fell, and those that remain open have been extended significantly. Always verify current launch conditions. Our <Link href="/utah" className="text-water hover:underline">Utah directory</Link> lists options in the region.</li>
          <li><strong className="text-charcoal">West Texas reservoirs.</strong> Many central and west Texas lakes see substantial seasonal drawdown in dry years. Check lake levels before a trip. Our <Link href="/texas" className="text-water hover:underline">Texas directory</Link> covers the area.</li>
          <li><strong className="text-charcoal">California reservoirs.</strong> Drought cycles affect Shasta, Oroville, and dozens of smaller lakes. Conditions can change month to month.</li>
        </ul>
        <p>Before any trip to a drought-affected lake, call the marina or park office. They know which ramps are usable today.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">When the Ramp Is Too Shallow to Use</h2>
        <p>Sometimes the right answer is to turn around. If the water is below the end of the ramp concrete, if there&apos;s visible mud or silt where the ramp should meet water, or if you&apos;re going to have to back your truck into soft bottom to get the bunks wet &mdash; don&apos;t. A stuck trailer in a muddy lakebed is expensive and embarrassing.</p>
        <p>Try a different ramp at the same lake, drive to a different lake, or reschedule. Our <Link href="/blog/what-to-do-boat-ramp-closed" className="text-water hover:underline">guide to closed and damaged ramps</Link> covers how to find alternatives when your first choice isn&apos;t usable.</p>
        <p>The one exception: if you have a drop-down tongue extension, that often closes the gap. If you don&apos;t, don&apos;t force it.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Check Current Conditions</h2>
        <p>Before any low-water launch, check the managing agency&apos;s current water-level readout and recent Google reviews. A week-old photo from another boater is worth more than any forecast. If the lake is at or near normal pool, any ramp works. If it&apos;s down, plan ahead.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How shallow is too shallow for a boat ramp?", acceptedAnswer: { "@type": "Answer", text: "If your trailer bunks won't submerge enough for the boat to float free without backing your tow vehicle into mud or soft bottom, the ramp is too shallow. Most ramps need at least 18-24 inches of water depth at the end of the concrete to be usable. Below that, use a tongue extension or find another ramp." } },
            { "@type": "Question", name: "What is a drop-down tongue on a trailer?", acceptedAnswer: { "@type": "Answer", text: "A drop-down or extending trailer tongue is a hinged or telescoping section that lets you add 4 to 8 feet of length to the trailer temporarily, so the boat sits deeper in the water without backing the tow vehicle farther. It's one of the most valuable upgrades for shallow-water boaters." } },
            { "@type": "Question", name: "Can I extend my boat trailer for shallow water?", acceptedAnswer: { "@type": "Answer", text: "Yes. Aftermarket tongue extensions, drop-down tongues, and strap extensions all add effective trailer length for shallow launches. A removable tongue extension is the least expensive option; a drop-down tongue is faster to deploy. Most trailer shops can install either." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How shallow is too shallow for a boat ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">If your trailer bunks won&apos;t submerge enough for the boat to float free without backing your tow vehicle into mud or soft bottom, the ramp is too shallow. Most ramps need at least 18-24 inches of water depth at the end of the concrete to be usable. Below that, use a tongue extension or find another ramp.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What is a drop-down tongue on a trailer?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">A drop-down or extending trailer tongue is a hinged or telescoping section that lets you add 4 to 8 feet of length to the trailer temporarily, so the boat sits deeper in the water without backing the tow vehicle farther. It&apos;s one of the most valuable upgrades for shallow-water boaters.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can I extend my boat trailer for shallow water?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes. Aftermarket tongue extensions, drop-down tongues, and strap extensions all add effective trailer length for shallow launches. A removable tongue extension is the least expensive option; a drop-down tongue is faster to deploy. Most trailer shops can install either.</p>
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
