import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("spring-boat-prep")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "spring boat prep, spring boat maintenance, boat commissioning, get boat ready for spring",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-15", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Spring Boat Prep", "item": `https://rampseeker.com/blog/spring-boat-prep` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Spring Boat Prep</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>The first warm weekend of spring is not the time to discover that your boat won&apos;t start, your battery is dead, or your trailer bearings are shot. <strong className="text-charcoal">Spring commissioning is about undoing winter and catching problems before they ruin your first trip.</strong> If you <Link href="/blog/winterize-your-boat" className="text-water hover:underline">winterized properly</Link>, most of this process is straightforward. If you didn&apos;t winterize at all, pay extra attention to every step &mdash; you may be dealing with damage you don&apos;t know about yet.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">1. Reconnect and Test the Battery</h2>
        <p>Start with the battery because everything else depends on it. If you stored your batteries on a maintainer over winter, they should be at full charge. If not, charge them fully before reinstalling. Clean the terminal posts and cable ends with a wire brush or battery terminal cleaner. Apply a thin coat of dielectric grease or terminal protector to prevent corrosion. Reinstall the batteries (positive terminal first, then negative) and test voltage with a multimeter &mdash; you want to see 12.6 volts or higher for a fully charged 12-volt battery. Turn on the electronics, check the bilge pump, and verify that all switches and gauges respond. A battery that won&apos;t hold a charge after a full overnight charge cycle needs to be replaced before you hit the water.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">2. Change the Oil and Filter</h2>
        <p>If you didn&apos;t change the oil before winterization, do it now. Old oil contains acids, combustion byproducts, and moisture that corrode internal engine components. Warm the engine briefly (if possible) to thin the oil and suspend contaminants, then drain completely. Replace the oil filter and refill with the manufacturer&apos;s recommended oil weight and quantity. For sterndrive and inboard engines, also check the transmission or outdrive fluid level and condition. Milky or discolored fluid indicates water contamination and needs to be addressed before you run the engine under load.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">3. Inspect Safety Gear</h2>
        <p>Safety equipment doesn&apos;t take a season off, but it does deteriorate over time. Check the expiration dates on your fire extinguishers and visual distress signals (flares). Inflate and inspect your life jackets &mdash; automatic inflatable PFDs need their CO2 cartridges and bobbin indicators checked annually. Verify that your throwable flotation device (Type IV) is in good condition and easily accessible. Test your horn or whistle. Check your navigation lights by turning on each one individually. Replace any expired or non-functional safety equipment before your first trip. Coast Guard boarding inspections happen more frequently in spring, and expired safety gear is the most common citation.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">4. Check Registration and Insurance</h2>
        <p>Boat registration renewals sneak up on people every year. Verify that your registration is current and your decals are up to date before launching. Expired registration is an easy citation to avoid, and it can result in being pulled off the water. While you&apos;re at it, review your boat insurance policy. Confirm that your coverage limits are adequate, your vessel information is accurate, and the policy hasn&apos;t lapsed during the off-season. If you made upgrades like new electronics or a new motor, your policy may need to be updated to reflect the increased value.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">5. Inspect the Hull and Hardware</h2>
        <p>With the boat on the trailer, walk around and inspect the hull from bow to stern. Look for cracks, blisters, gel coat chips, and any signs of impact damage. Check the drain plug and make sure the O-ring is in good shape &mdash; a leaking drain plug can sink a boat at the ramp faster than you&apos;d think. Inspect through-hull fittings, the transducer, and the trim tabs for damage or corrosion. If your boat has bottom paint, assess whether it needs a fresh coat. Open all hatches and compartments and inspect for mold, mildew, rodent damage, and standing water. A thorough visual inspection now catches small problems before they become big ones on the water.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">6. Service the Trailer</h2>
        <p>Your trailer has been sitting for months, and a few minutes of inspection can prevent a roadside breakdown on the way to the ramp. Check tire pressure against the recommended PSI on the sidewall &mdash; tires lose pressure during storage. Inspect for dry rot, cracking, and uneven wear. Spin each wheel by hand and listen for grinding or roughness in the bearings. If you didn&apos;t repack bearings in the fall, do it now or have them checked by a shop. Test all trailer lights, including brake lights and turn signals, by plugging into your tow vehicle. Check the winch strap, safety chains, and tie-down straps for fraying or damage. For the full rundown, see our <Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">trailer maintenance checklist</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">7. Test Launch</h2>
        <p>Before you plan your first real fishing or boating trip, do a test launch close to home at a familiar ramp. The purpose of a test launch is to identify problems in a low-pressure environment where you can fix them without ruining a planned outing. Run the engine at idle and check for cooling water flow, oil pressure, and unusual noises. Test the trim and tilt system. Shift through forward and reverse. Check the steering for smooth operation. Run the bilge pump. If everything checks out, take a short run at various speeds and watch your gauges. A 30-minute test launch gives you confidence that everything works and catches issues that only show up on the water. For tips on making the launch itself go smoothly, see our guide on <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">how to launch a boat safely</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Get Out There</h2>
        <p>Spring prep isn&apos;t glamorous, but it&apos;s the foundation of every good day on the water for the rest of the season. Tackle this checklist methodically, fix what needs fixing, replace what&apos;s worn out, and your first real trip of the year will be about fishing &mdash; not troubleshooting. The ramps are waiting, and the fish have been undisturbed all winter. Time to change that.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How long does spring boat commissioning take?", acceptedAnswer: { "@type": "Answer", text: "For a typical recreational boat, spring commissioning takes 4 to 8 hours spread across a weekend. The battery, oil change, and safety gear checks take about 2 hours. Hull and trailer inspection adds another 1 to 2 hours. A test launch rounds out the process at 1 to 2 hours. If you discover issues that need repair, add time accordingly." } },
            { "@type": "Question", name: "Do I need to change the oil every spring?", acceptedAnswer: { "@type": "Answer", text: "Yes. Even if your engine has low hours, oil degrades over time and absorbs moisture and acids during storage. Changing the oil and filter every spring — or every 100 hours of operation, whichever comes first — is the single most important maintenance task for engine longevity. Use the oil weight and type recommended by your engine manufacturer." } },
            { "@type": "Question", name: "What if my boat won't start after winter storage?", acceptedAnswer: { "@type": "Answer", text: "Start with the most common causes: a dead or weak battery, corroded battery terminals, old or degraded fuel, or a fuel line issue. Charge and test the battery first. If the engine cranks but won't start, the fuel system is the most likely culprit — especially if the fuel was not stabilized before storage. Drain old fuel, replace the fuel filter, and try fresh fuel. If the engine still won't start, a marine mechanic can diagnose deeper issues like a fouled spark plug or a stuck valve." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How long does spring boat commissioning take?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">For a typical recreational boat, spring commissioning takes 4 to 8 hours spread across a weekend. The battery, oil change, and safety gear checks take about 2 hours. Hull and trailer inspection adds another 1 to 2 hours. A test launch rounds out the process at 1 to 2 hours. If you discover issues that need repair, add time accordingly.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Do I need to change the oil every spring?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes. Even if your engine has low hours, oil degrades over time and absorbs moisture and acids during storage. Changing the oil and filter every spring &mdash; or every 100 hours of operation, whichever comes first &mdash; is the single most important maintenance task for engine longevity. Use the oil weight and type recommended by your engine manufacturer.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What if my boat won&apos;t start after winter storage?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Start with the most common causes: a dead or weak battery, corroded battery terminals, old or degraded fuel, or a fuel line issue. Charge and test the battery first. If the engine cranks but won&apos;t start, the fuel system is the most likely culprit &mdash; especially if the fuel was not stabilized before storage. Drain old fuel, replace the fuel filter, and try fresh fuel. If the engine still won&apos;t start, a marine mechanic can diagnose deeper issues like a fouled spark plug or a stuck valve.</p>
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
