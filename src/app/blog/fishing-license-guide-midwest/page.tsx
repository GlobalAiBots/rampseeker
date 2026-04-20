import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("fishing-license-guide-midwest")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "fishing license Oklahoma, fishing license Texas, fishing license cost by state",
  openGraph: { title: post.title, url: `https://www.rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://www.rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-03-08", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" } }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Fishing Licenses</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Before you back the boat down the ramp, there&apos;s one thing you absolutely need to have sorted: <strong className="text-charcoal">your fishing license.</strong> Game wardens check licenses regularly at boat ramps, and getting caught without one means a fine that costs far more than the license itself. The good news is that fishing licenses in the Midwest are affordable, easy to buy, and can usually be purchased online in five minutes from your phone — even while sitting in the ramp parking lot.</p>
        <p>Here&apos;s the complete breakdown for all five states we cover at RampSeeker: Oklahoma, Texas, Missouri, Arkansas, and Kansas.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Oklahoma Fishing License</h2>
        <p><Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link> requires a fishing license for anyone age 16 and older. Children 15 and under fish free with a licensed adult. Senior residents (65+) can get a lifetime license at a reduced rate.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Resident annual fishing license:</strong> $25</li>
          <li><strong className="text-charcoal">Non-resident annual fishing license:</strong> $55</li>
          <li><strong className="text-charcoal">Non-resident 5-day trip license:</strong> $26</li>
          <li><strong className="text-charcoal">Combo hunting/fishing license:</strong> $42 (resident)</li>
        </ul>
        <p>Oklahoma also requires a free &quot;Paddlefish Permit&quot; if you plan to snag paddlefish on <Link href="/grand-lake" className="text-water hover:underline">Grand Lake</Link> or the Neosho River. A separate trout stamp is not required — trout fishing is included with the standard fishing license.</p>
        <p><strong className="text-charcoal">Where to buy:</strong> Online at <a href="https://wildlifedepartment.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">wildlifedepartment.com</a>, at Walmart sporting goods counters, bait shops, and most outdoor retailers across the state. The online license is valid immediately — you&apos;ll get a confirmation email that serves as your temporary license until the physical card arrives.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Texas Fishing License</h2>
        <p><Link href="/texas" className="text-water hover:underline">Texas</Link> requires a fishing license for anyone age 17 and older. Texas offers separate freshwater and saltwater packages, but most lake anglers only need the freshwater license.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Resident freshwater fishing license:</strong> $30</li>
          <li><strong className="text-charcoal">Non-resident freshwater fishing license:</strong> $58</li>
          <li><strong className="text-charcoal">All-water (fresh + salt) resident:</strong> $40</li>
          <li><strong className="text-charcoal">One-day fishing license (all anglers):</strong> $11</li>
        </ul>
        <p>Texas licenses run on a September 1 to August 31 cycle, which is different from most states. If you buy a license in August, it expires the next day — wait until September 1 for a full year. Texas also has a freshwater stamp requirement for certain species like trout ($5 additional).</p>
        <p><strong className="text-charcoal">Where to buy:</strong> Online at <a href="https://tpwd.texas.gov" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">tpwd.texas.gov</a>, at Walmart, Academy Sports, Bass Pro, Cabela&apos;s, and most bait shops and convenience stores near popular fishing areas. You can also buy by phone at 1-800-895-4248.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Missouri Fishing License</h2>
        <p><Link href="/missouri" className="text-water hover:underline">Missouri</Link> is one of the most affordable states for fishing. A resident annual fishing license is a bargain, and Missouri offers a number of free fishing days throughout the year when no license is required for anyone.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Resident annual fishing license:</strong> $12</li>
          <li><strong className="text-charcoal">Non-resident annual fishing license:</strong> $49</li>
          <li><strong className="text-charcoal">Non-resident daily fishing permit:</strong> $7/day</li>
          <li><strong className="text-charcoal">Trout permit (additional, required for trout):</strong> $7</li>
        </ul>
        <p>Missouri residents age 65 and older can purchase a lifetime fishing license for $10. That&apos;s one of the best deals in the country. The state also offers a &quot;Conservation Order&quot; that allows landowners to fish on their own property without a license.</p>
        <p><strong className="text-charcoal">Where to buy:</strong> Online at <a href="https://mdc.mo.gov" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">mdc.mo.gov</a>, at Walmart, sporting goods stores, and many gas stations and convenience stores throughout the state. The Missouri Department of Conservation offices also sell licenses in person.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Arkansas Fishing License</h2>
        <p><Link href="/arkansas" className="text-water hover:underline">Arkansas</Link> offers some of the best fishing in the region — <Link href="/arkansas/lakes/beaver-lake" className="text-water hover:underline">Beaver Lake</Link>, Bull Shoals, Norfork, and the White River system are world-class. The license fees are among the lowest in the country.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Resident annual fishing license:</strong> $10.50</li>
          <li><strong className="text-charcoal">Non-resident annual fishing license:</strong> $50</li>
          <li><strong className="text-charcoal">Non-resident 3-day trip license:</strong> $16</li>
          <li><strong className="text-charcoal">Trout permit (additional, required for trout):</strong> $5</li>
        </ul>
        <p>Arkansas requires the trout permit in addition to the regular fishing license if you fish in any of the state&apos;s designated trout waters — including the famous White and Norfork River tailwaters. The regular fishing license alone is not sufficient for trout.</p>
        <p><strong className="text-charcoal">Where to buy:</strong> Online at <a href="https://agfc.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">agfc.com</a>, at Walmart, local bait shops, sporting goods stores, and AGFC regional offices. Online purchases are valid immediately.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Kansas Fishing License</h2>
        <p><Link href="/kansas" className="text-water hover:underline">Kansas</Link> has excellent reservoir fishing — Milford, Tuttle Creek, El Dorado, and many others — plus good river fishing on the Kansas and Arkansas Rivers.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Resident annual fishing license:</strong> $27.50</li>
          <li><strong className="text-charcoal">Non-resident annual fishing license:</strong> $52.50</li>
          <li><strong className="text-charcoal">Non-resident 24-hour license:</strong> $7.50</li>
          <li><strong className="text-charcoal">Non-resident 5-day trip license:</strong> $27.50</li>
        </ul>
        <p>Kansas also requires a separate $14.50 state park vehicle permit if you&apos;re launching at a state park ramp. This is not a fishing fee — it&apos;s a park entry fee — but it catches a lot of out-of-state visitors off guard. The annual park permit ($25) is worth it if you visit multiple times per year.</p>
        <p><strong className="text-charcoal">Where to buy:</strong> Online at <a href="https://ksoutdoors.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">ksoutdoors.com</a>, at Walmart, sporting goods stores, and select bait shops. Kansas Wildlife, Parks & Tourism offices also sell licenses.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Reciprocal Agreements on Border Lakes</h2>
        <p>Border lakes create a unique licensing situation. When a lake straddles two states, which license do you need? In most cases, <strong className="text-charcoal">you need a license from the state where you&apos;re fishing, not where you launched.</strong> But several border lakes have reciprocal agreements that make things easier:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Lake Texoma (Oklahoma/Texas):</strong> This is the most well-known reciprocal agreement in the region. A valid Oklahoma OR Texas fishing license allows you to fish anywhere on Lake Texoma, regardless of which side of the state line you&apos;re on. You do not need both licenses. This applies to Texoma only — it does not extend to other waters in either state.</li>
          <li><strong className="text-charcoal">Grand Lake / Neosho River (Oklahoma/Kansas):</strong> The upper end of <Link href="/grand-lake" className="text-water hover:underline">Grand Lake</Link> extends into Kansas. An Oklahoma license covers you on the entire lake, including the Kansas portion. However, if you fish the Neosho River above the lake in Kansas, you need a Kansas license.</li>
          <li><strong className="text-charcoal">Bull Shoals / Norfork (Arkansas/Missouri):</strong> Bull Shoals Lake straddles the Arkansas-Missouri border. An Arkansas license covers the Arkansas portion, and a Missouri license covers the Missouri portion. There is no full reciprocal agreement — if you cross the state line on the water, technically you need both. In practice, game wardens focus on the shoreline and ramp you launched from, but carrying both licenses is the safe move.</li>
        </ul>
        <p>When in doubt, buy the license for the state you&apos;re launching in. If you plan to fish across a state line, check the specific lake&apos;s regulations or carry licenses for both states.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Where to Buy: The Quick Options</h2>
        <p>Every state now offers online license purchases, and most are valid immediately. Here&apos;s the fastest way to get legal in each state:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Walmart:</strong> Every Walmart with a sporting goods counter sells fishing licenses for the state it&apos;s located in. Walk up, show your ID, and walk out with a printed license in under 5 minutes. This is the most popular option for out-of-state visitors.</li>
          <li><strong className="text-charcoal">Online:</strong> Each state&apos;s wildlife agency website sells licenses 24/7. Buy from your phone in the truck at the ramp if you forgot. The electronic confirmation is legally valid in all five states.</li>
          <li><strong className="text-charcoal">Bait shops:</strong> Local bait shops near popular lakes almost always sell licenses. You&apos;ll also get current fishing reports and local knowledge — worth the stop.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Penalties for Fishing Without a License</h2>
        <p>The fines vary by state, but they&apos;re universally more expensive than the license itself:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Oklahoma:</strong> $100-$250 fine plus court costs</li>
          <li><strong className="text-charcoal">Texas:</strong> $25-$500 fine (Class C misdemeanor)</li>
          <li><strong className="text-charcoal">Missouri:</strong> Up to $500 fine plus court costs</li>
          <li><strong className="text-charcoal">Arkansas:</strong> $100-$500 fine</li>
          <li><strong className="text-charcoal">Kansas:</strong> $100+ fine plus court costs</li>
        </ul>
        <p>Game wardens are most active at boat ramps during weekends and holidays. They check licenses at the ramp, on the water, and at bank fishing access points. A $12-$30 license is a lot cheaper than a $200+ fine. Don&apos;t risk it.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Get Licensed, Get on the Water</h2>
        <p>Buying a fishing license takes five minutes and costs less than a tank of gas. Every dollar goes directly to fish and wildlife conservation — stocking programs, habitat improvement, lake management, and access point maintenance. When you buy a license, you&apos;re funding the lakes and ramps you use.</p>
        <p>Once you&apos;re legal, find your next ramp on RampSeeker. Browse ramps in <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/missouri" className="text-water hover:underline">Missouri</Link>, <Link href="/arkansas" className="text-water hover:underline">Arkansas</Link>, and <Link href="/kansas" className="text-water hover:underline">Kansas</Link> — all 29,000+ of them.</p>

        <GearRecommendation section="electronics" />

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
