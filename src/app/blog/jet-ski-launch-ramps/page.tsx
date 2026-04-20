import Link from "next/link";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("jet-ski-launch-ramps")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: "Jet ski launch ramps explained. Which ramps work for PWCs, which to avoid, launching etiquette, and the rules that apply to personal watercraft.",
  keywords: "jet ski ramp near me, pwc launch ramp, jet ski launch, personal watercraft ramp",
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
          { "@type": "ListItem", "position": 3, "name": "Jet Ski Launch Ramps", "item": `https://www.rampseeker.com/blog/${post.slug}` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Jet Ski Launch Ramps</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>If you&apos;ve ever shown up at a boat ramp with a jet ski on a single-axle trailer and wondered if you belonged there, you&apos;re not alone. The short answer is yes &mdash; the long answer has a few more details. <strong className="text-charcoal">Personal watercraft (PWCs) can launch at almost any public boat ramp, but ramp choice, etiquette, and local rules still matter.</strong></p>
        <p>This guide covers what makes a good PWC ramp, which ramps to skip, and the rules that apply specifically to jet ski riders.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Can You Launch a Jet Ski at Any Boat Ramp?</h2>
        <p>In almost every state, yes. Public boat ramps are open to all watercraft that the managing agency permits &mdash; and that almost always includes PWCs. The exceptions are rare: a handful of tournament-only ramps, some HOA-restricted ramps, and the occasional state park ramp that bans PWCs during peak swimming hours.</p>
        <p>Always check posted signs before launching. A &quot;No PWC&quot; sign is unusual but does exist, especially in quieter lakes or ecologically sensitive areas. If a ramp allows motorized boats, it generally allows jet skis.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">What Makes a Good PWC Ramp</h2>
        <p>Not every ramp is ideal for jet skis, even when they&apos;re allowed. The best PWC launches share a few traits:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Shallow entry angle.</strong> A gentle-grade ramp keeps your small trailer stable. Steep ramps work, but they make for an awkward launch with a single-axle PWC trailer.</li>
          <li><strong className="text-charcoal">Floating courtesy dock.</strong> Jet skis sit low. A floating dock puts the gunwale at a reachable height; a high fixed pier leaves you reaching up.</li>
          <li><strong className="text-charcoal">Small-trailer parking.</strong> PWC trailers are short, so ramps that reserve only big spaces for trucks and boat trailers sometimes make parking awkward. Look for mixed-size lots.</li>
          <li><strong className="text-charcoal">Low-traffic times available.</strong> Because PWCs are fast to launch, you can slot into gaps &mdash; but if the ramp has a permanent line, even a two-minute launch feels stressful.</li>
        </ul>
        <p>A ramp that also works for kayaks is almost always a good PWC ramp too. See our <Link href="/blog/kayak-launch-sites" className="text-water hover:underline">kayak launch guide</Link> for overlap on shallow-entry access points.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Ramps to Avoid</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Steep boat ramps.</strong> A short PWC trailer on a steep concrete pitch can let the ski slide off before you&apos;re ready. Find a gentler ramp if one&apos;s available.</li>
          <li><strong className="text-charcoal">High fixed-pier ramps.</strong> Your jet ski sits a foot above the water. A dock that&apos;s four feet above that water is too high to hop off safely &mdash; you&apos;ll struggle to tie off.</li>
          <li><strong className="text-charcoal">Tournament-weekend ramps.</strong> If there&apos;s a bass tournament running, don&apos;t show up on a jet ski and add to the chaos. Find another launch that day.</li>
          <li><strong className="text-charcoal">Single-lane ramps on busy weekends.</strong> Even though you can launch in two minutes, the queue behind you adds up fast. A multi-lane ramp is better for everyone.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">PWC-Specific Launch Etiquette</h2>
        <p>The golden rule for jet skis at boat ramps: <strong className="text-charcoal">you&apos;re faster than boats, so move out of the way faster.</strong> A PWC can launch, tie off, and idle out of the way in 90 seconds. A 20-foot bass boat can&apos;t. Use that speed advantage to keep the ramp clear.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Never idle in front of the ramp.</strong> Clear the launching area immediately. Go tie off at a dock or motor out past the no-wake zone before you stop to check gear.</li>
          <li><strong className="text-charcoal">Wake discipline matters.</strong> PWCs throw wake that can bounce a boat still on the trailer. Idle past the ramp at no-wake speeds.</li>
          <li><strong className="text-charcoal">Don&apos;t hover at the launch.</strong> Finished riding? Back the trailer in, load up, pull out. Same etiquette as boats, just faster.</li>
          <li><strong className="text-charcoal">Tie down before you leave the ramp area.</strong> Loading a ski onto a trailer without safety straps and then trying to rig straps in the parking lot slows down everyone.</li>
        </ul>
        <p>Our <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette guide</Link> covers the universal rules that apply whether you&apos;re on a jet ski or a 30-foot cruiser.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Trailer Sizing and Tie-Downs for PWCs</h2>
        <p>Most jet ski trailers are single-axle with 12-inch or 13-inch wheels, which means two practical consequences. First, the tires wear faster and fail more often than boat-trailer tires, so inspect them religiously. Second, a short trailer is harder to back in the dark &mdash; the shorter the trailer, the more sensitive it is to steering inputs. Practice in an empty parking lot if you&apos;re new to backing one.</p>
        <p>For tie-downs, use bow strap plus transom straps, the same as a boat. Bungee-style tie-downs alone are not enough for highway travel. Before launching, walk the trailer and confirm every strap is off except the winch strap &mdash; same rule as boats, with the same consequences if you forget.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">State Rules That Apply</h2>
        <p>PWCs are regulated more tightly than boats in most states. The specific rules vary, but the patterns are consistent:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Registration.</strong> Almost every state requires PWCs to be registered, just like boats. Numbers must be displayed on the hull.</li>
          <li><strong className="text-charcoal">Minimum age.</strong> Most states set a minimum operator age of 14, 15, or 16. Some require the operator to be 18 to rent a PWC.</li>
          <li><strong className="text-charcoal">Boater safety certificate.</strong> A majority of states require a boating safety certificate for PWC operators, sometimes with stricter enforcement than for boats. Check your state&apos;s specific rule.</li>
          <li><strong className="text-charcoal">Life jacket requirement.</strong> All operators and passengers on a PWC must wear a Coast Guard-approved life jacket, at all times, while under way. This is stricter than the boat rule in most states.</li>
          <li><strong className="text-charcoal">Daylight-only operation.</strong> Many states prohibit PWC operation from sunset to sunrise. A few allow extended hours with specific lighting.</li>
          <li><strong className="text-charcoal">Distance and speed rules.</strong> Stay-back distance from shore, swimmers, and other boats varies by state &mdash; typically 50 to 200 feet at no-wake speed.</li>
        </ul>
        <p>Before you ride in a new state, search &quot;[state] PWC laws&quot; and read the official wildlife-agency summary. For a general launching refresher, our <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">boat launch guide</Link> covers the fundamentals that apply to PWCs too.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Find a PWC-Friendly Ramp</h2>
        <p>RampSeeker lists every public ramp in our database with amenity information. Filter for floating docks, shallow-entry ramps, and kayak-friendly launches to find the best options for your jet ski. Most boat ramps work; the best ones make your life easier.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Can I launch a jet ski at any boat ramp?", acceptedAnswer: { "@type": "Answer", text: "In most cases, yes. Public boat ramps generally allow PWCs alongside boats. A few ramps post 'No PWC' signs, and some HOA or tournament-restricted ramps limit access, but the overwhelming majority of public launches welcome jet skis. Always check posted signs before you back in." } },
            { "@type": "Question", name: "Do I need a boating license for a jet ski?", acceptedAnswer: { "@type": "Answer", text: "Most states require a boating safety certificate for PWC operators, often with stricter rules than for boats. Minimum operator ages are typically 14 to 16. Check your specific state's requirements — search '[state] PWC laws' for official guidance." } },
            { "@type": "Question", name: "Is there a separate ramp for jet skis?", acceptedAnswer: { "@type": "Answer", text: "Usually no. Most public facilities have one ramp for all motorized watercraft, including PWCs. A handful of large parks have dedicated PWC-only launches, and some beach-entry parks have sand launches used by jet skis specifically, but the standard setup is shared ramps." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can I launch a jet ski at any boat ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">In most cases, yes. Public boat ramps generally allow PWCs alongside boats. A few ramps post &quot;No PWC&quot; signs, and some HOA or tournament-restricted ramps limit access, but the overwhelming majority of public launches welcome jet skis. Always check posted signs before you back in.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Do I need a boating license for a jet ski?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Most states require a boating safety certificate for PWC operators, often with stricter rules than for boats. Minimum operator ages are typically 14 to 16. Check your specific state&apos;s requirements &mdash; search &quot;[state] PWC laws&quot; for official guidance.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Is there a separate ramp for jet skis?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Usually no. Most public facilities have one ramp for all motorized watercraft, including PWCs. A handful of large parks have dedicated PWC-only launches, and some beach-entry parks have sand launches used by jet skis specifically, but the standard setup is shared ramps.</p>
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
