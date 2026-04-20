import Link from "next/link";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("winter-boat-storage-tips")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: "How to store your boat for winter — indoor vs outdoor, shrink-wrap vs canvas, trailer tips, and what to check monthly during storage.",
  keywords: "winter boat storage, shrink wrap boat, indoor boat storage, dry stack storage",
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
          { "@type": "ListItem", "position": 3, "name": "Winter Boat Storage", "item": `https://www.rampseeker.com/blog/${post.slug}` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Winter Boat Storage</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Storing a boat for winter is not the same as winterizing one. Winterization is the mechanical work &mdash; fogging the engine, draining water, adding stabilizer. Storage is the physical side: where the boat sits, how it&apos;s covered, and what protects it from ice, wind, mice, and UV damage over four to six months of not being used. <strong className="text-charcoal">Get storage wrong and even a perfectly winterized boat shows up to spring with cracked gel coat, rotted upholstery, or a critter problem.</strong></p>
        <p>This guide walks through your storage options, the cover choices, and the monthly checks that keep a boat ready for the first warm weekend. If you haven&apos;t done the mechanical winterization yet, read our <Link href="/blog/winterize-your-boat" className="text-water hover:underline">winterization checklist</Link> first.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Indoor vs Outdoor Storage</h2>
        <p>The single biggest decision is whether the boat spends the winter under a roof or in the open. Both work. The tradeoffs are cost, convenience, and how much the local climate abuses your equipment.</p>
        <p><strong className="text-charcoal">Indoor storage</strong> runs $150 to $500 per month depending on region and whether the facility is heated. It&apos;s the premium option: no UV damage, no hail risk, no snow load on the cover, no freeze-thaw stress on the hull. If you&apos;re storing anything with a soft top or lots of teak trim, indoor pays for itself in preserved gel coat and fabric.</p>
        <p><strong className="text-charcoal">Outdoor storage</strong> &mdash; in your driveway, a boat yard, or a long-term lot &mdash; runs free to $75 per month. It&apos;s the practical choice for most trailered boats, as long as you cover the boat properly and choose a location that doesn&apos;t pool water. A bare boat sitting outside all winter will see the gel coat chalked and the upholstery faded by spring.</p>
        <p>In regions that get real winter (Midwest, Northeast, Mountain West), indoor is worth the premium for anything over about 20 feet. In milder climates (the Southeast, Gulf Coast, California), outdoor with a good cover is fine.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Shrink Wrap vs Canvas vs Tarp</h2>
        <p>If you&apos;re storing outdoors, the cover is everything. Three options dominate:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Shrink wrap.</strong> A white plastic film heat-shrunk over a wooden or metal frame. $15 to $25 per foot of boat length, professionally installed. Sheds snow and water completely, vents moisture through built-in vents, and lasts one season. The gold standard for outdoor storage. Disposed of in spring.</li>
          <li><strong className="text-charcoal">Custom canvas cover.</strong> Reusable fitted cover in marine-grade fabric. $500 to $2,500 depending on boat size. Lasts 5 to 10 years, breathes better than plastic, easier to remove for mid-winter work. The best long-term value if you&apos;ll use it for several seasons.</li>
          <li><strong className="text-charcoal">Generic tarp.</strong> $50 to $200 at a hardware store. The cheap option, and the riskiest &mdash; tarps trap moisture, flap in the wind, abrade the gel coat, and collapse under snow. Only use a tarp if you&apos;re building a proper frame under it and accept that it won&apos;t last.</li>
        </ul>
        <p>Whichever you choose, build enough frame support that the cover sheds water and snow. A flat cover pools water, rips, and funnels rain directly into the cockpit.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Trailer Storage Prep</h2>
        <p>The trailer takes as much abuse as the boat during a cold winter. A few simple steps prevent surprises in spring:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Check tire pressure and cover the tires.</strong> UV destroys tire sidewalls. Tire covers are cheap insurance. See our <Link href="/blog/boat-trailer-tire-guide" className="text-water hover:underline">trailer tire guide</Link> for replacement timing.</li>
          <li><strong className="text-charcoal">Pull the battery.</strong> Store it indoors on a trickle charger. A battery left connected in freezing weather can crack its case.</li>
          <li><strong className="text-charcoal">Block the trailer.</strong> Jack stands or wheel chocks keep the trailer from rolling and reduce flat-spotting on tires sitting in one spot all winter.</li>
          <li><strong className="text-charcoal">Drain the bilge and vent the boat.</strong> Standing water in the bilge freezes and cracks. Leave the drain plug out all winter.</li>
          <li><strong className="text-charcoal">Raise the bow slightly.</strong> Tilt the trailer so water drains toward the stern and out through the plug. A 2- to 4-inch block under the jack works.</li>
        </ul>
        <p>For a full pre-season rundown, read our <Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">trailer maintenance checklist</Link> before you launch in spring.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Dry Stack Storage</h2>
        <p>Dry stack storage is the modern option for boats up to about 30 feet. The marina stores your boat on a heavy-duty rack inside a big metal building, and when you want to go out, a forklift operator pulls it down and puts it in the water for you. When you&apos;re done, they pull it out, rinse it, and stack it again.</p>
        <p>The upside: clean, climate-stable, and no ramp hassle. Never a line at the ramp, because the marina launches you directly. Boats stay cleaner and last longer.</p>
        <p>The downside: $200 to $600 per month depending on boat size and region, and you have to schedule launches in advance in some marinas. If your schedule is flexible and your boat is under 30 feet, dry stack is often the best experience money can buy.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Monthly Winter Checks</h2>
        <p>Don&apos;t just cover the boat in November and forget it until April. A 15-minute monthly check catches small problems before they become spring disasters.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Look under the cover.</strong> Is there pooling water? Any sign of rodents? Any new musty smell?</li>
          <li><strong className="text-charcoal">Check for snow load.</strong> After big storms, clear snow off a canvas cover. Shrink wrap usually sheds snow on its own.</li>
          <li><strong className="text-charcoal">Inspect the cover seams and frame.</strong> Wind chafes cover fabric and loosens frame joints. Fix small tears before they become big ones.</li>
          <li><strong className="text-charcoal">Verify drain plugs are still out.</strong> Some plugs work loose in wind or get bumped back in when you&apos;re moving things around the boat.</li>
          <li><strong className="text-charcoal">Set mouse traps or rodent-proof.</strong> Mice find every boat eventually. A trap or two in the bilge saves your upholstery from nesting damage.</li>
          <li><strong className="text-charcoal">Top off the battery charger.</strong> If you left the battery in the garage on a trickle, confirm it&apos;s still hooked up and charging.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">When to Pull Your Boat</h2>
        <p>The short answer: before the first hard freeze. A hard freeze (temperatures in the low 20s Fahrenheit or below for several consecutive hours) can crack engine blocks, burst hoses, and freeze bilge water into ice that destroys fiberglass.</p>
        <p>In the upper Midwest and Northeast, that&apos;s typically mid-October to early November. In the mid-Atlantic and southern Midwest, late November. In the Southeast and Gulf Coast, many boats never come out of the water at all, though a brief cold snap still warrants basic winterization.</p>
        <p>Watch your local 10-day forecast in fall. Pull the boat a week before the first forecasted freeze, not the day before. For the spring side of the routine, our <Link href="/blog/spring-boat-prep" className="text-water hover:underline">spring prep guide</Link> covers what to do when the weather turns warm again.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How much does winter boat storage cost?", acceptedAnswer: { "@type": "Answer", text: "Outdoor lot storage runs roughly $25 to $75 per month. Indoor unheated storage is $150 to $300 per month. Indoor heated and dry stack storage run $200 to $600 per month. Cost varies a lot by region — marinas in the Northeast and West Coast cost more than the Midwest or Southeast." } },
            { "@type": "Question", name: "Can I leave my boat outside in winter?", acceptedAnswer: { "@type": "Answer", text: "Yes, most trailered boats winter outdoors fine with proper covers and winterization. Shrink wrap or a well-fitted canvas cover keeps out snow, ice, and UV. The key is draining all water from the engine and bilge before the first hard freeze, and leaving the drain plug out all winter." } },
            { "@type": "Question", name: "Do I need to shrink-wrap my boat for winter storage?", acceptedAnswer: { "@type": "Answer", text: "Shrink wrap isn't strictly required, but it's the most reliable outdoor storage cover. Alternatives are a fitted canvas cover or a tarp over a proper frame. Shrink wrap sheds snow and water completely and lasts one season. A quality canvas cover is more expensive up front but lasts 5 to 10 years." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How much does winter boat storage cost?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Outdoor lot storage runs roughly $25 to $75 per month. Indoor unheated storage is $150 to $300 per month. Indoor heated and dry stack storage run $200 to $600 per month. Cost varies a lot by region &mdash; marinas in the Northeast and West Coast cost more than the Midwest or Southeast.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can I leave my boat outside in winter?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes, most trailered boats winter outdoors fine with proper covers and winterization. Shrink wrap or a well-fitted canvas cover keeps out snow, ice, and UV. The key is draining all water from the engine and bilge before the first hard freeze, and leaving the drain plug out all winter.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Do I need to shrink-wrap my boat for winter storage?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Shrink wrap isn&apos;t strictly required, but it&apos;s the most reliable outdoor storage cover. Alternatives are a fitted canvas cover or a tarp over a proper frame. Shrink wrap sheds snow and water completely and lasts one season. A quality canvas cover is more expensive up front but lasts 5 to 10 years.</p>
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
