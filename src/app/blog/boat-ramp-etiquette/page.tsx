import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("boat-ramp-etiquette")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "boat ramp etiquette, boat ramp rules, boat launch etiquette, ramp manners",
  openGraph: { title: post.title, url: `https://www.rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://www.rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-11", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Boat Ramp Etiquette", "item": `https://www.rampseeker.com/blog/boat-ramp-etiquette` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Boat Ramp Etiquette</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Nobody posts the rules at the boat ramp. There&apos;s no sign that says &quot;prep your boat before backing in&quot; or &quot;don&apos;t take 20 minutes loading your cooler on the ramp.&quot; <strong className="text-charcoal">But these unwritten rules exist, and every experienced boater knows them.</strong> Break them, and you&apos;ll get dirty looks at best &mdash; or a real confrontation at a crowded ramp on a holiday weekend.</p>
        <p>Whether you&apos;re new to boating or just need a refresher, here are the 10 rules that will make you a welcome face at any ramp. For a full walkthrough of the actual launch process, check out our <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">step-by-step launch guide</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">1. Prep in the Parking Lot, Not on the Ramp</h2>
        <p>This is the number one rule and the one that gets broken the most. Remove your tie-down straps, load your gear, install the drain plug, disconnect trailer lights, and do everything else in the staging area. The ramp is for backing in and launching &mdash; nothing else. Every minute you spend prepping on the ramp is a minute someone else is waiting in line behind you.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">2. Don&apos;t Block the Ramp</h2>
        <p>Once your boat is in the water and floating free, move your truck and trailer to the parking lot immediately. Don&apos;t sit on the ramp tying up fishing rods, sorting tackle, or waiting for your buddy to show up. Tie the boat to the courtesy dock, pull your vehicle out, park, and then finish whatever you need to do at the dock on foot.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">3. Have Your Lines Ready</h2>
        <p>Before you launch, attach a bow line and a stern line to the boat. When the boat slides off the trailer, someone needs to grab it and secure it to the courtesy dock. A boat floating loose at a busy ramp is a hazard &mdash; it can drift into other boats, into the dock, or into the ramp lane. <strong className="text-charcoal">If you&apos;re solo, cleat the bow line to the dock before releasing the winch strap.</strong></p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">4. Wait Your Turn</h2>
        <p>If there&apos;s a line, take your place at the back of it. Don&apos;t cut in because you &quot;just need to load real quick.&quot; Launch and load lines are first-come, first-served. If the ramp has multiple lanes, use the one that&apos;s open &mdash; don&apos;t force a double-wide launch on a busy day.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">5. Yield to Those Loading</h2>
        <p>Loading a boat (pulling it out) generally takes longer than launching. If someone is in the process of winching their boat onto the trailer, give them time. Don&apos;t honk, don&apos;t rev your engine, and don&apos;t inch your truck forward to pressure them. We&apos;ve all had a bad loading day &mdash; the winch jams, the boat doesn&apos;t line up, the motor won&apos;t trim. Be patient.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">6. Keep Your Music Down</h2>
        <p>This one seems minor but matters a lot at 5:00 AM. Not everyone at the ramp wants to hear your playlist at full volume. Keep music low or use headphones, especially in the early morning and late evening when sound carries across the water. The same applies once you&apos;re on the lake near the ramp &mdash; people on the dock can hear everything.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">7. Control Your Wake Near the Ramp</h2>
        <p>Slow down to no-wake speed well before you reach the ramp area. Your wake rocks every boat at the dock, makes loading harder for others, and can knock gear off the courtesy dock. Most states require no-wake within 150-200 feet of a dock or ramp. It&apos;s the law, but more importantly, it&apos;s basic courtesy.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">8. Clean Up After Yourself</h2>
        <p>Pick up your trash, your bait containers, your cut fishing line, and your empty oil bottles. Leave the ramp area cleaner than you found it. If the trash can is full, take your garbage with you. Dirty ramps lead to closures &mdash; local governments shut down ramps that become dumping grounds. Nobody wants that.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">9. Don&apos;t Park in the Launch Lane</h2>
        <p>The paved area leading to the ramp is for active launching and loading only. Don&apos;t park your truck there while you fish. Don&apos;t leave your trailer unhooked in the lane while you &quot;run to get something.&quot; Park in designated trailer parking spots. If the lot is full, wait &mdash; don&apos;t improvise by blocking access lanes.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">10. Offer a Hand</h2>
        <p>If you see someone struggling &mdash; a first-timer backing crooked, a solo boater trying to launch without a dock hand, or someone with a stuck winch &mdash; offer to help. The boating community is built on this kind of courtesy, and you&apos;ll be the one who needs help someday. A simple &quot;need a hand?&quot; goes a long way.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">It All Comes Down to Awareness</h2>
        <p>Good ramp etiquette isn&apos;t complicated. It boils down to being aware of the people around you, being prepared before you hit the ramp, and respecting shared public space. The boaters who follow these rules are the ones who get waves and nods at the ramp &mdash; and the ones who don&apos;t are the ones everyone talks about on the ride home.</p>
        <p>For more on the mechanics of safe launching and loading, check out our <Link href="/blog/how-to-launch-boat-beginner-guide" className="text-water hover:underline">beginner&apos;s launch guide</Link>. And find your next ramp on RampSeeker &mdash; we list ramp details, amenities, and conditions for thousands of ramps across <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/michigan" className="text-water hover:underline">Michigan</Link>, and all 50 states.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What is the most important rule of boat ramp etiquette?", acceptedAnswer: { "@type": "Answer", text: "Prepare your boat in the parking lot or staging area, not on the ramp. Remove straps, load gear, install the drain plug, and have your lines ready before you back down. The ramp should only be used for the actual launch and retrieval." } },
            { "@type": "Question", name: "Is it rude to power-load a boat at the ramp?", acceptedAnswer: { "@type": "Answer", text: "Power-loading (using engine thrust to push the boat onto the trailer) is common but can erode sediment around the ramp. Some ramps have signs prohibiting it. If allowed, use minimal throttle. Many experienced boaters prefer winching the boat on to avoid damaging the ramp." } },
            { "@type": "Question", name: "How long should it take to launch or load a boat?", acceptedAnswer: { "@type": "Answer", text: "An experienced boater can launch in 3-5 minutes and load in 5-7 minutes. If you're taking longer than 10 minutes on the ramp, you're likely doing prep work that should have been done in the parking lot. Practice your routine and it will get faster every trip." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What is the most important rule of boat ramp etiquette?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Prepare your boat in the parking lot or staging area, not on the ramp. Remove straps, load gear, install the drain plug, and have your lines ready before you back down. The ramp should only be used for the actual launch and retrieval.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Is it rude to power-load a boat at the ramp?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Power-loading (using engine thrust to push the boat onto the trailer) is common but can erode sediment around the ramp. Some ramps have signs prohibiting it. If allowed, use minimal throttle. Many experienced boaters prefer winching the boat on to avoid damaging the ramp.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How long should it take to launch or load a boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">An experienced boater can launch in 3-5 minutes and load in 5-7 minutes. If you&apos;re taking longer than 10 minutes on the ramp, you&apos;re likely doing prep work that should have been done in the parking lot. Practice your routine and it will get faster every trip.</p>
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
