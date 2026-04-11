import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("public-vs-private-boat-ramps")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "public boat ramp, private boat ramp, boat ramp fees, public vs private boat launch",
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
          { "@type": "ListItem", "position": 3, "name": "Public vs Private Boat Ramps", "item": `https://rampseeker.com/blog/public-vs-private-boat-ramps` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Public vs Private Boat Ramps</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>When you&apos;re looking for a place to launch, you&apos;ll find two basic types of boat ramps: public and private. <strong className="text-charcoal">The differences between them affect your wallet, your wait time, and your overall experience on the water.</strong> Understanding what each type offers helps you pick the right ramp for the right trip.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Public Boat Ramps: The Basics</h2>
        <p>Public boat ramps are owned and operated by government agencies &mdash; city parks departments, county governments, state parks, the U.S. Army Corps of Engineers (USACE), or state wildlife agencies. They&apos;re funded by taxes, license fees, and federal grants, which means most of them are <strong className="text-charcoal">free or very low cost</strong> to use.</p>
        <p>The vast majority of boat ramps in the United States are public. USACE alone operates ramps on over 400 lakes and reservoirs nationwide. State wildlife agencies maintain thousands more on rivers, lakes, and coastal waterways. For a deeper look at finding free launch sites, check out our guide on <Link href="/blog/free-boat-ramps-how-to-find-them" className="text-water hover:underline">how to find free boat ramps</Link>.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Pros of Public Ramps</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Cost:</strong> Most are free. Some state parks charge a small day-use fee ($5-10), and a few require an annual pass. But the ramp itself is almost never gated or metered.</li>
          <li><strong className="text-charcoal">Access:</strong> Open to everyone. No membership, no reservation, no marina relationship required. Show up, back in, launch.</li>
          <li><strong className="text-charcoal">Availability:</strong> Public ramps exist on nearly every navigable body of water in the country. If there&apos;s a lake, there&apos;s usually a public ramp on it somewhere.</li>
          <li><strong className="text-charcoal">Hours:</strong> Many public ramps are open 24/7. USACE ramps and state wildlife access ramps rarely have gates or closing times.</li>
        </ul>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Cons of Public Ramps</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Crowding:</strong> On summer weekends and holidays, popular public ramps can have 30-minute wait times. Ramps in <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, and <Link href="/michigan" className="text-water hover:underline">Michigan</Link> are especially busy May through September.</li>
          <li><strong className="text-charcoal">Maintenance:</strong> Budget constraints mean some public ramps have cracked concrete, missing dock boards, or no lighting. Maintenance varies widely by agency and location.</li>
          <li><strong className="text-charcoal">Amenities:</strong> Basic public ramps may have nothing more than a concrete slab and a gravel parking lot. No restrooms, no fish cleaning stations, no fuel.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Private Boat Ramps: The Basics</h2>
        <p>Private boat ramps are owned by marinas, HOAs, resorts, RV parks, or private landowners. Access is restricted &mdash; you typically need to be a marina customer, a property owner in the community, or pay a launch fee.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Pros of Private Ramps</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Less crowding:</strong> Restricted access means fewer boats. You&apos;re unlikely to wait in line at a private marina ramp, even on a holiday weekend.</li>
          <li><strong className="text-charcoal">Better amenities:</strong> Private ramps often come with well-maintained courtesy docks, fuel docks, fish cleaning stations, restrooms, and on-site staff. Some marinas offer valet launching.</li>
          <li><strong className="text-charcoal">Maintenance:</strong> Private operators have a financial incentive to keep their ramps in top condition. Cracked concrete and broken docks are bad for business.</li>
        </ul>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Cons of Private Ramps</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Cost:</strong> Launch fees range from $5 to $25 per use. Some marinas offer free launching if you purchase fuel. Annual launch passes at marinas can run $100-300.</li>
          <li><strong className="text-charcoal">Access restrictions:</strong> Many private ramps require membership, a slip rental, or property ownership. You can&apos;t just show up and launch at an HOA ramp if you don&apos;t live in the neighborhood.</li>
          <li><strong className="text-charcoal">Limited hours:</strong> Marina ramps may only be open during business hours. Some lock their gates at sunset.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Which Should You Use?</h2>
        <p>For most boaters, public ramps are the go-to choice. They&apos;re free, accessible, and available everywhere. If you&apos;re fishing a new lake in <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link> or exploring a river in <Link href="/arkansas" className="text-water hover:underline">Arkansas</Link>, a public ramp is almost always the simplest option.</p>
        <p>Private ramps make sense in specific situations: when the nearest public ramp is too crowded, when you need fuel or other marina services, or when you want a premium experience without the hassle. They&apos;re also common in lakeside communities where public access is limited.</p>
        <p>Many experienced boaters use both. Public ramp for the Tuesday afternoon solo trip; marina ramp on the Fourth of July when the public ramp has a line wrapped around the parking lot.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Find the Right Ramp on RampSeeker</h2>
        <p>RampSeeker lists both public and private ramps across all 50 states. Filter by <Link href="/category/free-ramps" className="text-water hover:underline">free ramps</Link> to find no-cost public launches, or browse by state to see every option available. Each listing includes ownership type, fees, amenities, lane count, and user reviews so you know exactly what to expect before you arrive.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Are public boat ramps free to use?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps are free. Ramps operated by the U.S. Army Corps of Engineers, state wildlife agencies, and city/county parks are typically free. Some state parks charge a small day-use fee of $5-10 or require an annual park pass." } },
            { "@type": "Question", name: "How much does it cost to launch at a private boat ramp?", acceptedAnswer: { "@type": "Answer", text: "Private boat ramp fees typically range from $5 to $25 per launch. Some marinas offer free launching if you purchase fuel. Annual launch passes at marinas usually cost $100-300. HOA and resort ramps are generally restricted to members or guests only." } },
            { "@type": "Question", name: "Can anyone use a private boat ramp?", acceptedAnswer: { "@type": "Answer", text: "Not always. Marina ramps are usually open to the public for a fee, but HOA ramps, resort ramps, and private community ramps are typically restricted to property owners, members, or registered guests. Always check access requirements before driving to a private ramp." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Are public boat ramps free to use?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Most public boat ramps are free. Ramps operated by the U.S. Army Corps of Engineers, state wildlife agencies, and city/county parks are typically free. Some state parks charge a small day-use fee of $5-10 or require an annual park pass.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How much does it cost to launch at a private boat ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Private boat ramp fees typically range from $5 to $25 per launch. Some marinas offer free launching if you purchase fuel. Annual launch passes at marinas usually cost $100-300. HOA and resort ramps are generally restricted to members or guests only.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can anyone use a private boat ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Not always. Marina ramps are usually open to the public for a fee, but HOA ramps, resort ramps, and private community ramps are typically restricted to property owners, members, or registered guests. Always check access requirements before driving to a private ramp.</p>
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
