import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("kayak-launch-sites")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "kayak launch sites, kayak put-ins, kayak access points, kayak fishing launch, canoe launch",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-17", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Kayak Launch Sites", "item": `https://rampseeker.com/blog/kayak-launch-sites` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Kayak Launch Sites</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Kayaking is one of the fastest-growing segments of boating in America, but finding a good place to launch isn&apos;t always straightforward. Unlike trailered boats that need a concrete ramp, kayaks and canoes can launch from almost anywhere — <strong className="text-charcoal">but &quot;almost anywhere&quot; doesn&apos;t mean everywhere is a good idea.</strong> The best kayak launch sites share a few key traits: easy water access, safe parking, manageable terrain, and legal public access. Here&apos;s how to find them.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">What Makes a Good Kayak Launch Site?</h2>
        <p>A great kayak put-in has five things: <strong className="text-charcoal">gradual entry into the water</strong> (no steep drops or high banks), <strong className="text-charcoal">stable footing</strong> (sand, gravel, or a low dock — not slippery mud), <strong className="text-charcoal">nearby parking</strong> (carrying a kayak more than 100 yards gets old fast), <strong className="text-charcoal">shelter from wind and current</strong> (a protected cove or inlet is ideal), and <strong className="text-charcoal">legal public access</strong> (trespassing on private land is never worth it).</p>
        <p>The ideal launch is a gentle, sandy or gravel slope where you can set your kayak at the water&apos;s edge, step in, and push off. Many public boat ramps work well for kayaks too — just stay to the side and out of the way of trailered boats. Some parks and wildlife areas have dedicated kayak launches with low docks or beach-style entry points specifically designed for paddle craft.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Types of Kayak Put-Ins</h2>
        <p><strong className="text-charcoal">Public boat ramps:</strong> The most common option. Most states maintain hundreds of public ramps that are open to all watercraft, including kayaks. Use the side of the ramp or a courtesy dock to launch — don&apos;t block the main ramp lane. These typically offer the best parking and facilities.</p>
        <p><strong className="text-charcoal">Dedicated kayak launches:</strong> Increasingly common at state parks, wildlife management areas, and municipal waterfronts. These feature low-profile docks, ADA-accessible launch platforms, or groomed beach entry points. They&apos;re designed for non-motorized craft and eliminate conflicts with powerboat traffic.</p>
        <p><strong className="text-charcoal">Bridge access points:</strong> County and state road bridges over rivers and creeks often have informal put-in areas on the right-of-way. These are especially useful for river kayaking and float trips. Check local regulations — access is usually legal on public road right-of-way below the ordinary high-water mark.</p>
        <p><strong className="text-charcoal">Park and wildlife area shorelines:</strong> State parks, national forests, and wildlife management areas frequently offer undeveloped shoreline access. Look for trails leading to the water, cleared areas, or maintained access paths. These tend to be less crowded but may require longer carries.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Find Kayak Launch Sites Near You</h2>
        <p>Start with RampSeeker — we list thousands of public boat ramps across all 50 states, many of which are suitable for kayak launching. Browse by state to find ramps near your target water: <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, <Link href="/michigan" className="text-water hover:underline">Michigan</Link>, <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/ohio" className="text-water hover:underline">Ohio</Link>, or any other state. Look for ramps marked with amenities like &quot;carry-in access&quot; or &quot;non-motorized.&quot;</p>
        <p>Your state&apos;s Department of Natural Resources or Parks &amp; Wildlife website is another excellent resource. Many states maintain dedicated paddling trail maps and kayak access point databases. Local kayak clubs and social media groups are invaluable for discovering informal put-ins that don&apos;t appear on official maps.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Safety at Kayak Launch Sites</h2>
        <p>Launching a kayak is generally low-risk, but a few precautions matter. <strong className="text-charcoal">Always wear your PFD</strong> — put it on before you get in the kayak, not after. Check the current and wind conditions before launching, especially on rivers and large open lakes. Tell someone where you&apos;re going and when you expect to return. In cold water (below 60&deg;F), dress for immersion — cold water shock kills more paddlers than any other hazard.</p>
        <p>At shared boat ramps, stay aware of powerboat traffic. Launch quickly and move away from the ramp area. Don&apos;t linger in the launch lane or tie up to the courtesy dock for extended periods. Most boaters are courteous to kayakers, but congestion at a busy ramp on a Saturday morning is no place for a leisurely paddle start.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Essential Gear for Kayak Launching</h2>
        <p>Beyond your kayak, paddle, and PFD, a few items make launching easier. A <strong className="text-charcoal">kayak cart or wheel system</strong> makes the carry from parking lot to water manageable, especially for heavier fishing kayaks. <strong className="text-charcoal">Dry bags</strong> protect your phone, keys, and wallet. A <strong className="text-charcoal">paddle leash</strong> prevents losing your paddle if you capsize. And a <strong className="text-charcoal">bilge pump or sponge</strong> keeps water out of your cockpit. Check out our <Link href="/checklist" className="text-water hover:underline">complete boating checklist</Link> for more gear recommendations.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Bottom Line</h2>
        <p>Finding a good kayak launch site is easier than most new paddlers think. Public boat ramps, dedicated kayak launches, bridge access points, and park shorelines provide thousands of legal, accessible put-ins across every state. Start with RampSeeker to find ramps near your target water, check your state&apos;s paddling resources, and always prioritize safety over convenience. The best launch site is the one that gets you on the water safely — and gets you back to your car when you&apos;re done.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Can I launch a kayak at a regular boat ramp?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most public boat ramps are open to all watercraft, including kayaks and canoes. Launch from the side of the ramp or use the courtesy dock to avoid blocking the main lane for trailered boats. Be courteous, launch quickly, and move away from the ramp area promptly." } },
            { "@type": "Question", name: "Do I need a permit to launch a kayak?", acceptedAnswer: { "@type": "Answer", text: "It depends on the location. Most public boat ramps are free for kayaks or charge a small day-use fee. Some state parks require a vehicle entrance fee. A few states require kayak registration for motorized kayaks (those with trolling motors). Check your state's regulations — most non-motorized kayaks do not require registration." } },
            { "@type": "Question", name: "What is the easiest way to launch a kayak?", acceptedAnswer: { "@type": "Answer", text: "The easiest method is a shallow beach or ramp entry: place your kayak at the water's edge parallel to the shore, sit down in the seat, use your hands or paddle to push off, and swing your legs in. A low dock with a kayak launch platform is even easier — you sit on the dock edge, lower yourself into the seat, and push off. Avoid steep banks and deep mud." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can I launch a kayak at a regular boat ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes. Most public boat ramps are open to all watercraft, including kayaks and canoes. Launch from the side of the ramp or use the courtesy dock to avoid blocking the main lane for trailered boats. Be courteous, launch quickly, and move away from the ramp area promptly.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Do I need a permit to launch a kayak?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">It depends on the location. Most public boat ramps are free for kayaks or charge a small day-use fee. Some state parks require a vehicle entrance fee. A few states require kayak registration for motorized kayaks (those with trolling motors). Check your state&apos;s regulations — most non-motorized kayaks do not require registration.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What is the easiest way to launch a kayak?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">The easiest method is a shallow beach or ramp entry: place your kayak at the water&apos;s edge parallel to the shore, sit down in the seat, use your hands or paddle to push off, and swing your legs in. A low dock with a kayak launch platform is even easier — you sit on the dock edge, lower yourself into the seat, and push off. Avoid steep banks and deep mud.</p>
          </details>
        </div>
      </section>

      <GearRecommendation section="water-essentials" />

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
