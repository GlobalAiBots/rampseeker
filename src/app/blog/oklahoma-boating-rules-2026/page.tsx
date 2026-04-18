import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { blogPosts, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oklahoma Boating Rules & Regulations You Need to Know (2026) | RampSeeker",
  description: "Complete guide to Oklahoma boating laws: registration, safety equipment, age requirements, BUI laws, GRDA rules for Grand Lake, and no-wake zones.",
  keywords: "Oklahoma boating rules, Oklahoma boat registration, GRDA lake rules, Oklahoma boating laws 2026",
  openGraph: { title: "Oklahoma Boating Rules & Regulations (2026)", url: "https://rampseeker.com/blog/oklahoma-boating-rules-2026" },
  alternates: { canonical: "https://rampseeker.com/blog/oklahoma-boating-rules-2026" },
};

export default function RulesPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Oklahoma Boating Rules & Regulations You Need to Know (2026)",
        datePublished: "2026-03-28", author: { "@type": "Organization", name: "RampSeeker Team" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" },
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: blogPosts[1].gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition">Home</Link><span>/</span>
            <Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span>
            <span className="text-white/80">Boating Rules</span>
          </nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">Regulations</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">Oklahoma Boating Rules &amp; Regulations You Need to Know (2026)</h1>
          <p className="text-white/60 text-sm mt-3">March 28, 2026 &middot; 6 min read &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Whether you&apos;re a lifelong Oklahoma boater or launching for the first time, knowing the state&apos;s boating regulations keeps you legal, safe, and out of trouble. Here&apos;s what you need to know for 2026.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Boat Registration</h2>
        <p>All motorized boats operating on Oklahoma waters must be registered with the Oklahoma Tax Commission. Registration is required regardless of the boat&apos;s size. Registration numbers must be displayed on both sides of the bow in at least 3-inch block letters. Registration must be renewed annually, and the current decal must be visible. Out-of-state boats are allowed for up to 60 days before requiring Oklahoma registration.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Required Safety Equipment</h2>
        <p>Oklahoma law requires:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-charcoal">Life jackets (PFDs):</strong> One USCG-approved life jacket for each person on board. Children 12 and under must wear a PFD at all times while the boat is underway.</li>
          <li><strong className="text-charcoal">Fire extinguisher:</strong> Required on all motorized boats with enclosed fuel compartments or enclosed living spaces.</li>
          <li><strong className="text-charcoal">Navigation lights:</strong> Required for operation between sunset and sunrise.</li>
          <li><strong className="text-charcoal">Sound-producing device:</strong> A whistle or horn is required on boats 16 feet and longer.</li>
          <li><strong className="text-charcoal">Engine cut-off switch:</strong> Required on boats manufactured after 2020 with motors 115 HP or more.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Age Requirements</h2>
        <p>In Oklahoma, anyone born after January 1, 1986 must complete an approved boater education course to operate a motorized boat. Children under 12 may not operate a boat with more than 10 horsepower. Children 12-15 may operate a boat with more than 10 HP only if they have completed a boater education course.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Boating Under the Influence (BUI)</h2>
        <p>Oklahoma&apos;s BUI laws mirror DUI laws. The legal blood alcohol limit for boat operators is 0.08%. Penalties include fines, jail time, and loss of boating privileges. Law enforcement actively patrols Oklahoma lakes, especially on holiday weekends. If you&apos;re drinking on the water, have a designated operator.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">GRDA Rules for Grand Lake</h2>
        <p><Link href="/grand-lake" className="text-water hover:underline">Grand Lake</Link> has additional rules enforced by GRDA (Grand River Dam Authority) Police:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Idle speed within 150 feet of any dock, bridge, pier, or swim area</li>
          <li>All boats must have current Oklahoma registration displayed</li>
          <li>No wake zones are posted at bridge abutments and narrow channels</li>
          <li>GRDA Police conduct free safety inspections and can issue citations</li>
          <li>Pensacola Dam is a restricted area — maintain a safe distance</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">No-Wake Zones and Speed Limits</h2>
        <p>Oklahoma has no statewide speed limit for boats, but no-wake zones are enforced within 150 feet of docks, piers, bridges, swimming areas, and anchored vessels. Many coves and marinas have posted no-wake buoys. Always slow down near boat ramps — other boaters are loading and unloading.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Fishing License</h2>
        <p>If you&apos;re fishing from your boat, you need an Oklahoma fishing license (anyone 16 and older). Annual resident licenses are approximately $25. You can purchase online at wildlifedepartment.com, at Walmart, or at most bait shops around the lake.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Ramp Etiquette</h2>
        <p>While not law, following ramp etiquette keeps everyone happy:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Prepare your boat BEFORE backing down the ramp (remove straps, insert drain plug, load gear)</li>
          <li>Launch quickly and move to the courtesy dock</li>
          <li>Don&apos;t block the ramp while parking your trailer</li>
          <li>When loading, pull your boat to the dock first, then get your trailer</li>
        </ul>
        <p>For a complete guide, read our <Link href="/blog/how-to-launch-boat-beginner-guide" className="text-water hover:underline">beginner&apos;s guide to launching a boat</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Find Your Ramp</h2>
        <p>Ready to get on the water? <Link href="/" className="text-water hover:underline">Search 261+ Oklahoma boat ramps</Link> on RampSeeker with GPS coordinates, amenities, and directions to every launch point in the state.</p>
        <GearRecommendation section="water-essentials" />
        <BlogCletusCallout />
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-4">More from the Blog</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getRelatedPosts("oklahoma-boating-rules-2026").map((p) => (
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
