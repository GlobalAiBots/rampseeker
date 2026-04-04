import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("free-boat-ramps-how-to-find-them")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "free boat ramps, free boat launch near me, boat ramp fees, USACE boat ramps",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-04", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Free Boat Ramps</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Here&apos;s a fact that surprises a lot of new boaters: <strong className="text-charcoal">the majority of boat ramps in the United States are completely free to use.</strong> Public ramps operated by state parks, the U.S. Army Corps of Engineers, city governments, and other public agencies typically don&apos;t charge a dime for launching.</p>
        <p>The confusion comes from the small percentage of ramps that do charge — usually marina ramps, some county parks with parking fees, or state parks that require a day-use pass. If you know where to look, you can launch for free almost anywhere.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">The Four Types of Free Boat Ramps</h2>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">1. U.S. Army Corps of Engineers (USACE) Ramps</h3>
        <p>The Corps of Engineers manages over 400 lakes and reservoirs across the country, and the vast majority of their boat ramps are free. These are some of the best-maintained ramps you&apos;ll find — concrete, wide, with courtesy docks and restrooms. If you see a brown &quot;Corps of Engineers&quot; sign, you&apos;re almost always launching for free.</p>
        <p>Pro tip: The America the Beautiful annual pass ($80) covers day-use fees at all federal recreation areas, but most USACE ramps don&apos;t even require it — the pass is for areas that charge parking fees.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">2. State Park Ramps</h3>
        <p>State park ramps are generally free or included with a low-cost state park entry fee ($5-10/day or $25-40/year for an annual pass). In Oklahoma, all state park ramps are free. In Texas, state park entry is $5-7/day. Missouri and Arkansas state parks are mostly free. Kansas charges $5.50/day for vehicle entry at state parks.</p>
        <p>The annual state park pass is almost always worth it if you launch more than 3-4 times a year. In most states, it&apos;s under $40 for unlimited access to every state park ramp.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">3. City and County Ramps</h3>
        <p>Many cities and counties operate public boat ramps on local lakes and rivers. These are almost always free — funded by local taxes. They tend to be smaller (1-2 lanes) with fewer amenities, but they get you on the water without any fees. <Link href="/ramps/wolf-creek-park" className="text-water hover:underline">Wolf Creek Park</Link> in Grove, Oklahoma is a city-operated ramp with 6 lanes and full facilities — completely free.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">4. GRDA and Other Authority Ramps</h3>
        <p>Regional authorities like Oklahoma&apos;s GRDA (Grand River Dam Authority) operate ramps that are free to use. These are common on larger reservoirs managed by power companies or water authorities.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">When You Will Pay</h2>
        <p>Marina ramps are the most common paid launch sites. Marinas are private businesses, and they may charge $5-20 for ramp access if you&apos;re not a slip holder or fuel customer. Some offer free launching if you buy fuel. Always ask before backing down a marina ramp.</p>
        <p>Some counties charge a small parking fee ($3-5) at popular ramps during peak season. This isn&apos;t technically a launch fee — it&apos;s a parking fee. But it has the same effect on your wallet.</p>
        <p>A few states require a specific &quot;boat access&quot; stamp or fee in addition to your fishing license. Check your state&apos;s regulations.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Check Before You Go</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Check RampSeeker:</strong> We list fee information for every ramp in our database. <Link href="/best/free-boat-ramps-oklahoma" className="text-water hover:underline">Browse free ramps in Oklahoma</Link> or search any state.</li>
          <li><strong className="text-charcoal">Google Maps reviews:</strong> Other boaters often mention fees (or lack thereof) in their reviews.</li>
          <li><strong className="text-charcoal">State park websites:</strong> Check the specific park&apos;s page for day-use fees and ramp information.</li>
          <li><strong className="text-charcoal">Corps of Engineers websites:</strong> Search &quot;[lake name] USACE recreation areas&quot; for official information.</li>
          <li><strong className="text-charcoal">Call ahead:</strong> If you&apos;re unsure, call the park office. It takes 2 minutes and saves a surprise at the ramp.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Find Free Ramps on RampSeeker</h2>
        <p>RampSeeker lists 29,000+ boat ramps across the US. For our detailed states — <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/missouri" className="text-water hover:underline">Missouri</Link>, <Link href="/arkansas" className="text-water hover:underline">Arkansas</Link>, and <Link href="/kansas" className="text-water hover:underline">Kansas</Link> — we include fee information on every ramp. Filter by &quot;free&quot; to find launch sites that won&apos;t cost you anything.</p>

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
