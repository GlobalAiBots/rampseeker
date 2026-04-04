import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("boat-trailer-maintenance-checklist")!;
export const metadata: Metadata = { title: `${post.title} | RampSeeker`, description: post.excerpt, keywords: "boat trailer maintenance, pre-season boat trailer checklist, boat trailer inspection", openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` }, alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` } };

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-03-22", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />
      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}><div className="px-6 py-10 md:py-14"><nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Trailer Maintenance</span></nav><span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span><h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1><p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p></div></div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Your boat trailer is the most neglected piece of equipment in your fishing arsenal. It sits in the driveway through winter, gets dunked in saltwater or lake water every trip, and only gets attention when something breaks — usually at the worst possible time, like when you&apos;re blocking the ramp with 10 trucks behind you.</p>
        <p>This pre-season checklist takes about an hour and can prevent the most common trailer failures. Do it once before your first launch of the season, and you&apos;ll be good for months.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">1. Wheel Bearings — The #1 Failure Point</h2>
        <p>Wheel bearing failure is the single most common trailer breakdown. When bearings overheat, the wheel can literally fall off the axle — on the highway or at the ramp. Every boater has either experienced this or knows someone who has.</p>
        <p><strong className="text-charcoal">What to check:</strong> Jack up each wheel and spin it. It should spin freely with no grinding, clicking, or rough spots. Grab the tire at 12 and 6 o&apos;clock and try to rock it — any play means the bearings need attention. Check for grease leaking from the hub seals.</p>
        <p><strong className="text-charcoal">What to do:</strong> If bearings have more than 20-30 launches on them, repack with marine-grade grease. If they show any roughness, replace them — a bearing kit costs $15-30 and takes 30 minutes per wheel. If you have Bearing Buddy caps, pump fresh grease through them before the season.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">2. Tires — Age Matters More Than Tread</h2>
        <p>Trailer tires fail from age and UV damage, not from wear. A trailer tire that looks brand new can blow out if it&apos;s more than 5 years old. Check the date code on the sidewall — the last four digits are the week and year of manufacture (e.g., &quot;2521&quot; means week 25 of 2021).</p>
        <p><strong className="text-charcoal">What to check:</strong> Look for cracks in the sidewall (weather checking), bulges, or flat spots. Check tread depth. Inflate to the PSI listed on the sidewall — trailer tires typically run 50-65 PSI, higher than car tires. Check your spare too.</p>
        <p><strong className="text-charcoal">What to do:</strong> Replace any tire older than 5 years, regardless of tread. Replace tires with visible sidewall cracking. Always carry a properly inflated spare. Consider upgrading to radial trailer tires — they run cooler and last longer than bias-ply.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">3. Lights — The Ticket Magnet</h2>
        <p>Broken trailer lights are the fastest way to get pulled over. They also make you invisible when launching or loading in low light — dangerous at busy ramps.</p>
        <p><strong className="text-charcoal">What to check:</strong> Test every light: brake lights, turn signals, running lights, license plate light, side markers. Have someone stand behind the trailer while you work through each function. Check all wiring connections for corrosion, especially the plug.</p>
        <p><strong className="text-charcoal">What to do:</strong> Clean corroded connections with electrical contact cleaner and apply dielectric grease. If bulbs keep burning out from water exposure, upgrade to sealed LED lights — they&apos;re waterproof, brighter, last longer, and draw less power. A full LED conversion kit costs $30-60 and takes an hour to install.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">4. Winch Strap and Bow Safety Chain</h2>
        <p>The winch strap is what holds your boat on the trailer. If it frays and snaps on the highway, your boat slides off the back into traffic. This has happened. Don&apos;t let it happen to you.</p>
        <p><strong className="text-charcoal">What to check:</strong> Inspect the entire length of the strap for fraying, cuts, or UV damage. Check the hook and ratchet mechanism. Check the bow safety chain — it should be your backup if the strap fails. Test the winch — it should ratchet smoothly and hold under load.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">5. Bunks, Rollers, and Guides</h2>
        <p><strong className="text-charcoal">What to check:</strong> Inspect bunk carpet for wear-through or peeling. Check rollers for flat spots, cracking, or seized bearings. Make sure guide posts are tight and straight — bent guides make loading a nightmare.</p>
        <p><strong className="text-charcoal">What to do:</strong> Replace bunk carpet that&apos;s worn through — bare wood scratches gel coat. Replace cracked or flat-spotted rollers. Grease roller axles. Tighten guide post bolts.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">6. Coupler, Safety Chains, and Jack</h2>
        <p><strong className="text-charcoal">Coupler:</strong> Open and close it several times. Lubricate with white lithium grease. Check for cracks around the latch. Make sure it locks securely on the hitch ball. <strong className="text-charcoal">Safety chains:</strong> Inspect every link for cracks or thin spots. Cross chains under the coupler when towing. <strong className="text-charcoal">Jack:</strong> Extend and retract fully. Grease the screw mechanism. Make sure the wheel rolls and swivels freely.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">7. Brakes (If Equipped)</h2>
        <p>Surge brakes (the most common on boat trailers) require specific maintenance. Check the brake fluid reservoir in the surge coupler — top off with DOT 3 fluid. Check brake pads for wear. Test the brakes by towing the trailer at low speed and applying the tow vehicle brakes firmly — you should feel the trailer brakes engage.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">The Bottom Line</h2>
        <p>An hour of maintenance in the driveway prevents hours of headache at the ramp. The most common failures — bearings, tires, lights, and winch straps — are all cheap and easy to fix preventively. They&apos;re expensive and embarrassing to fix on the side of the road or blocking a busy ramp.</p>
        <p>Need to find your next launch? <Link href="/" className="text-water hover:underline">Search boat ramps</Link> across <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/missouri" className="text-water hover:underline">Missouri</Link>, <Link href="/arkansas" className="text-water hover:underline">Arkansas</Link>, and <Link href="/kansas" className="text-water hover:underline">Kansas</Link> on RampSeeker.</p>
        <BlogCletusCallout />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200"><h3 className="font-[Cabin] font-bold text-charcoal mb-4">More from the Blog</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{related.map((p) => (<Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><div className="h-20" style={{ background: p.gradient }} /><div className="p-4"><span className="text-[10px] font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{p.category}</span><h4 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm mt-2 line-clamp-2">{p.title}</h4><p className="text-gray-400 text-xs mt-1">{p.readTime}</p></div></Link>))}</div></div>
    </article>
  );
}
