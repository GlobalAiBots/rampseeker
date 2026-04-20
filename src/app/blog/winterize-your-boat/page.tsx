import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("winterize-your-boat")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "winterize boat, boat winterization, boat winter storage, boat winterization checklist",
  openGraph: { title: post.title, url: `https://www.rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://www.rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-15", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Winterize Your Boat", "item": `https://www.rampseeker.com/blog/winterize-your-boat` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Winterize Your Boat</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Skipping winterization is one of the most expensive mistakes a boat owner can make. A single freeze can crack an engine block, split water lines, and destroy raw-water pumps &mdash; repairs that easily run into the thousands. <strong className="text-charcoal">Proper winterization takes a few hours in the fall and saves you from catastrophic damage in the spring.</strong> This checklist covers every step, from the engine to the trailer, so nothing gets overlooked.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">1. Fog the Engine</h2>
        <p><a href="https://www.amazon.com/s?k=marine+fogging+oil+spray&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">Fogging oil (Our Pick on Amazon)</a> coats the internal components of your engine &mdash; cylinders, pistons, and valves &mdash; with a protective film that prevents corrosion during months of inactivity. For outboard and sterndrive engines, remove the air filter or flame arrestor, start the engine, and spray fogging oil into the carburetor or throttle body while the engine is running until it stalls. For fuel-injected engines, use the fogging oil port if your engine has one, or follow your manufacturer&apos;s specific procedure. This step alone prevents the most common form of winter engine damage: internal rust on cylinder walls from condensation.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">2. Stabilize the Fuel</h2>
        <p>Untreated fuel breaks down over winter, leaving varnish and gum deposits in your fuel system that clog injectors and carburetor jets. Add a marine-grade <a href="https://www.amazon.com/s?k=marine+fuel+stabilizer+ethanol&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">fuel stabilizer (Our Pick on Amazon)</a> to a full tank of fuel &mdash; filling the tank reduces the air space where condensation can form. Run the engine for 10 to 15 minutes after adding stabilizer so treated fuel circulates through the entire fuel system, including the lines, filter, and injectors. Ethanol-blended fuel is especially prone to phase separation in cold temperatures, making stabilizer essential rather than optional.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">3. Drain All Water Systems</h2>
        <p>Water expands when it freezes, and any water left in your boat&apos;s systems will find the weakest point and crack it. Drain the engine cooling system completely. On raw-water-cooled engines, disconnect the hoses and let them drain. On closed-cooling systems, drain both the raw-water side and check the coolant level and condition on the closed side. Drain the livewell, washdown system, freshwater tank, hot water heater, and all associated lines. Open every drain plug and petcock. For lines that cannot be fully drained, pump non-toxic <a href="https://www.amazon.com/s?k=marine+antifreeze+propylene+glycol+pink&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">marine antifreeze (Our Pick on Amazon)</a> (propylene glycol, not automotive ethylene glycol) through the system until it runs out the other end.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">4. Remove and Store the Battery</h2>
        <p>Batteries left in a cold, unheated boat will slowly discharge and can freeze in extreme temperatures. A fully charged battery won&apos;t freeze until roughly minus 75 degrees, but a partially discharged battery can freeze at just 20 degrees &mdash; and a frozen battery is a destroyed battery. Disconnect the battery terminals (negative first), remove the batteries from the boat, and store them in a cool, dry location like a garage. Connect each battery to a quality trickle charger or <a href="https://www.amazon.com/s?k=marine+battery+maintainer+trickle+charger&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-water hover:underline font-semibold">battery maintainer (Our Pick on Amazon)</a> for the duration of winter. Check electrolyte levels in flooded batteries and top off with distilled water if needed before storage.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">5. Service the Trailer</h2>
        <p>Your trailer sits exposed to the elements all winter, and spring is a terrible time to discover that your bearings seized or your tires dry-rotted. Before storage, inspect wheel bearings and repack or replace them if they show any signs of wear, roughness, or contamination. Check tire pressure and inspect sidewalls for cracking. If the trailer will sit on pavement or concrete, place the tires on plywood or use jack stands to take the weight off the tires and prevent flat-spotting. Inspect the lights, wiring, and brake system. Apply grease to the coupler and winch gear. For more on keeping your trailer in top shape, see our <Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">trailer maintenance checklist</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">6. Cover or Shrink-Wrap the Boat</h2>
        <p>A quality boat cover or professional shrink-wrap job protects your boat from snow, ice, rain, UV damage, and animal intrusion throughout the winter. If you use a fitted cover, make sure it&apos;s supported by a frame or support poles so water and snow don&apos;t pool on top and collapse the cover onto the boat. If you use shrink-wrap, ensure the installer includes ventilation openings to prevent moisture buildup and mold growth inside the wrap. Leave the drain plug out so any water that gets inside can escape rather than pooling in the bilge.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">7. Indoor vs. Outdoor Storage</h2>
        <p>Indoor storage in a heated or climate-controlled facility provides the best protection but comes at a premium &mdash; expect to pay $30 to $60 per foot for the season depending on your area. Unheated indoor storage is more affordable and still shields the boat from precipitation, UV, and wind. Outdoor storage on a trailer in your yard or at a storage lot is the most economical option but exposes the boat to the full force of winter weather. If storing outdoors, invest in quality shrink-wrap and choose a location with good drainage so the trailer doesn&apos;t sit in standing water all winter.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Don&apos;t Skip the Details</h2>
        <p>A few additional steps round out a thorough winterization. Remove all valuables, electronics, and life jackets from the boat. Clean the interior thoroughly to prevent mold and mildew during storage. Spray exposed metal surfaces &mdash; throttle and shift cables, hinges, and hardware &mdash; with a corrosion inhibitor. Close all seacocks. And make a checklist of everything you removed or disconnected so spring recommissioning goes smoothly. When spring arrives, our <Link href="/blog/spring-boat-prep" className="text-water hover:underline">spring boat prep guide</Link> walks you through every step to get back on the water safely.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "When should I winterize my boat?", acceptedAnswer: { "@type": "Answer", text: "Winterize your boat before the first hard freeze in your area. For most northern states, this means October or early November. Do not wait for the first freeze to happen — by then, damage may have already occurred. Southern boaters in states that rarely freeze may not need full winterization but should still stabilize fuel and maintain the battery if the boat will sit unused for extended periods." } },
            { "@type": "Question", name: "Can I winterize my boat myself?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most winterization steps — fogging the engine, adding fuel stabilizer, draining water systems, removing the battery, and covering the boat — are straightforward and require no special tools. The most important thing is following a complete checklist so nothing gets missed. If you are uncomfortable working on the engine or lower unit, a marine mechanic can handle those steps while you take care of the rest." } },
            { "@type": "Question", name: "What happens if I don't winterize my boat?", acceptedAnswer: { "@type": "Answer", text: "Failing to winterize can result in cracked engine blocks, split water lines, destroyed water pumps, corroded cylinders, dead batteries, and fuel system clogs from degraded gasoline. These repairs can cost thousands of dollars and delay your spring launch by weeks. Proper winterization takes a few hours and costs under $100 in materials — far less than a single freeze-related repair." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">When should I winterize my boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Winterize your boat before the first hard freeze in your area. For most northern states, this means October or early November. Don&apos;t wait for the first freeze to happen &mdash; by then, damage may have already occurred. Southern boaters in states that rarely freeze may not need full winterization but should still stabilize fuel and maintain the battery if the boat will sit unused for extended periods.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can I winterize my boat myself?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Yes. Most winterization steps &mdash; fogging the engine, adding fuel stabilizer, draining water systems, removing the battery, and covering the boat &mdash; are straightforward and require no special tools. The most important thing is following a complete checklist so nothing gets missed. If you&apos;re uncomfortable working on the engine or lower unit, a marine mechanic can handle those steps while you take care of the rest.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What happens if I don&apos;t winterize my boat?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Failing to winterize can result in cracked engine blocks, split water lines, destroyed water pumps, corroded cylinders, dead batteries, and fuel system clogs from degraded gasoline. These repairs can cost thousands of dollars and delay your spring launch by weeks. Proper winterization takes a few hours and costs under $100 in materials &mdash; far less than a single freeze-related repair.</p>
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
