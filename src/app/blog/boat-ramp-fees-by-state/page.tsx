import Link from "next/link";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("boat-ramp-fees-by-state")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: "Boat ramp fees by state in 2026. Free public ramps, paid state parks, marina launch fees, and annual passes that save money for frequent boaters.",
  keywords: "how much does a boat ramp cost, boat ramp fees, boat launch fees by state, annual boat ramp pass",
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
          { "@type": "ListItem", "position": 3, "name": "Boat Ramp Fees by State", "item": `https://www.rampseeker.com/blog/${post.slug}` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Boat Ramp Fees by State</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>If you&apos;ve boated in more than a couple of states, you&apos;ve noticed that ramp fees are all over the map. One state puts an iron ranger at every ramp and charges $7 per launch. Another runs hundreds of ramps and charges nothing. A third charges a flat park-entry fee that covers launching as a side benefit. <strong className="text-charcoal">Understanding how ramp fees work where you boat can save you real money, especially if you launch more than a few times a year.</strong></p>
        <p>This guide breaks down the fee ranges, the payment methods, and the annual passes that turn occasional expense into no expense.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Are Boat Ramps Free?</h2>
        <p>The surprising truth is that the majority of public boat ramps in the United States are free. U.S. Army Corps of Engineers ramps are almost universally free. Most state-agency fishing-access ramps are free. Many city and county ramps are free. Our guide to <Link href="/blog/free-boat-ramps-how-to-find-them" className="text-water hover:underline">finding free boat ramps</Link> covers which agencies manage free launches and how to identify them.</p>
        <p>Paid ramps fall into a few predictable buckets: state parks that charge a per-launch or per-vehicle fee, marina ramps operated as private businesses, and a small number of high-traffic county ramps with parking fees.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Typical Fee Ranges by Fee Type</h2>
        <p>Most boat ramp fees in 2026 fall into three categories:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Per-launch fee: $3 to $15.</strong> A one-time charge paid at the ramp, usually via iron ranger or self-pay envelope. Common at state park ramps and some county-managed launches.</li>
          <li><strong className="text-charcoal">Annual pass: $25 to $150.</strong> A sticker or paper pass that covers unlimited launches at a state&apos;s ramps for the calendar year. The better deal if you launch more than five or six times a year.</li>
          <li><strong className="text-charcoal">Marina launch fee: $10 to $25.</strong> Charged by private marinas, sometimes waived with a fuel purchase or slip rental. Cash only is still common at smaller marinas.</li>
        </ul>
        <p>Some states layer a vehicle day-use fee on top (or instead): $5 to $10 per car, which covers launching as part of the park entrance. For frequent boaters this is usually a better structure than per-launch charging.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">State-by-State Summary</h2>
        <p>Rather than list every state, here&apos;s how fee structures group by region. Exact fees change year to year, so always verify with the state wildlife or parks agency before a trip.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">The South: Mostly Free</h3>
        <p>Alabama, Mississippi, Louisiana, and Georgia lean free at most public ramps. Tennessee ramps are largely free, including the many TVA launches. Oklahoma and Arkansas state park ramps are typically free &mdash; our <Link href="/oklahoma" className="text-water hover:underline">Oklahoma directory</Link> flags fees where they exist. South Carolina and North Carolina have a mix: coastal ramps often have small parking fees, inland ramps are largely free.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Florida: Mostly Free</h3>
        <p>Florida&apos;s FWC ramps are free, county and city ramps are mostly free, and state park ramps charge only the park entrance fee (typically $4 to $6 per vehicle). A few county ramps in South Florida charge a $5 to $10 parking fee. See our <Link href="/florida" className="text-water hover:underline">Florida directory</Link> for specifics.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">The Midwest: Free to Low-Cost</h3>
        <p>Most Midwest states &mdash; Missouri, Illinois, Indiana, Ohio, Michigan, Wisconsin, Minnesota &mdash; run a mix of free state-agency ramps and low-cost state park ramps. Michigan requires a state park recreation passport ($14 per vehicle/year for residents, free for in-state registered vehicles in some cases). Minnesota has a mix of free access points and a few paid ramps.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Texas and the Plains: Mostly Free, Some Paid Parks</h3>
        <p>Texas state park ramps charge the park entrance fee ($5 to $7 per person per day), not a separate launch fee. Corps of Engineers ramps on Texas reservoirs (there are many) are free. Our <Link href="/texas" className="text-water hover:underline">Texas directory</Link> lists them. Kansas, Nebraska, and Oklahoma follow similar patterns.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">The Northwest and West: More Paid Ramps</h3>
        <p>Washington, Oregon, Idaho, and Montana tend to charge more for ramp access than the South or Midwest. Washington has a Discover Pass requirement ($35/year) that covers most state-managed ramps. Oregon has a similar state park pass system. California has paid state park ramps ($10 to $15 per vehicle) with some free river and delta access points. Nevada charges launch fees at most state parks.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">The Northeast: Mix of Free and Paid</h3>
        <p>New York, Pennsylvania, New Jersey, and New England states vary widely. DEC ramps in New York are free. Pennsylvania Fish and Boat Commission ramps are free with a launch permit requirement. Massachusetts and Connecticut have paid state park ramps alongside free town ramps.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Annual Pass Programs That Save Money</h2>
        <p>If you launch more than four or five times a year in a state that charges, the annual pass almost always pays for itself. A few worth knowing:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">America the Beautiful Pass ($80/year).</strong> Covers all federal sites including National Parks and some Corps of Engineers day-use areas. Most Corps ramps are free regardless, but the pass covers parking fees where they exist.</li>
          <li><strong className="text-charcoal">State park annual passes ($25 to $80).</strong> Every state offers one. Worth it if you use state park ramps regularly.</li>
          <li><strong className="text-charcoal">Washington Discover Pass ($35/year).</strong> Covers most state-managed ramps and trailheads.</li>
          <li><strong className="text-charcoal">Oregon State Park annual pass ($30/year).</strong> Covers day-use and ramp access at state parks.</li>
          <li><strong className="text-charcoal">Pennsylvania launch permit ($10-20/year for residents).</strong> Required on most PFBC ramps and included with fishing license purchases.</li>
        </ul>
        <p>Browse our <Link href="/blog/best-lakes-for-boating-by-state" className="text-water hover:underline">best lakes by state guide</Link> for more on where annual passes pay off in specific regions.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Payment Methods at Ramps</h2>
        <p>Even in 2026, most paid ramps still use one of three old-school systems:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Iron ranger.</strong> A steel pipe with a slot. Slide cash in an envelope into the pipe. Keep small bills in the glovebox.</li>
          <li><strong className="text-charcoal">Self-pay envelope.</strong> Fill out an envelope with your plate number, drop it in the box, and keep the tear-off stub on your dash.</li>
          <li><strong className="text-charcoal">Card reader.</strong> Becoming more common at high-traffic ramps. Expect intermittent connectivity issues, especially at rural ramps.</li>
          <li><strong className="text-charcoal">Staffed booth.</strong> Only at the biggest state parks. Pay cash or card at the entrance.</li>
        </ul>
        <p>The practical rule: keep $20 in small bills in your truck for ramps with iron rangers. It has saved a lot of trips.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Find Free Ramps</h2>
        <p>If cost is a concern, filter for free ramps. The four big categories of free public ramps are USACE (Corps of Engineers), state wildlife or fishing-access agency ramps, city and county ramps, and regional authority ramps. Our <Link href="/blog/free-boat-ramps-how-to-find-them" className="text-water hover:underline">free ramp guide</Link> and our <Link href="/blog/public-vs-private-boat-ramps" className="text-water hover:underline">public vs private ramps guide</Link> both cover how to identify free ramps quickly.</p>
        <p>On RampSeeker, every listing marks fee status where we have it. Free, paid, or unknown &mdash; you&apos;ll see it before you drive there.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How much does it cost to launch a boat?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps in the US are free. When fees do apply, they typically run $3 to $15 per launch at state parks, or $10 to $25 at marinas. Annual passes that cover unlimited launches run $25 to $150 depending on the state." } },
            { "@type": "Question", name: "Are state park boat ramps free?", acceptedAnswer: { "@type": "Answer", text: "It depends on the state. Oklahoma, Arkansas, Missouri, and Florida state park ramps are free or included with a modest vehicle entry fee. Washington, Oregon, California, and some Northeast states charge per-launch or require a state park pass. Check the specific state's parks agency website before you go." } },
            { "@type": "Question", name: "What is an annual boat ramp pass?", acceptedAnswer: { "@type": "Answer", text: "An annual pass is a sticker or card that covers unlimited launches at a state or federal agency's ramps for the calendar year. Costs range from $25 to $150. If you launch more than four or five times a year in a state that charges per-launch, the annual pass usually pays for itself." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How much does it cost to launch a boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Most public boat ramps in the US are free. When fees do apply, they typically run $3 to $15 per launch at state parks, or $10 to $25 at marinas. Annual passes that cover unlimited launches run $25 to $150 depending on the state.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Are state park boat ramps free?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">It depends on the state. Oklahoma, Arkansas, Missouri, and Florida state park ramps are free or included with a modest vehicle entry fee. Washington, Oregon, California, and some Northeast states charge per-launch or require a state park pass. Check the specific state&apos;s parks agency website before you go.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What is an annual boat ramp pass?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">An annual pass is a sticker or card that covers unlimited launches at a state or federal agency&apos;s ramps for the calendar year. Costs range from $25 to $150. If you launch more than four or five times a year in a state that charges per-launch, the annual pass usually pays for itself.</p>
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
