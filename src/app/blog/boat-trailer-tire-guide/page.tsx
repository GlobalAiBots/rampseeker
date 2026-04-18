import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("boat-trailer-tire-guide")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "boat trailer tires, trailer tire replacement, trailer tire maintenance, boat trailer bearings, trailer tire pressure",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-04-16", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rampseeker.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rampseeker.com/blog" },
          { "@type": "ListItem", "position": 3, "name": "Boat Trailer Tire Guide", "item": `https://rampseeker.com/blog/boat-trailer-tire-guide` },
        ],
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Boat Trailer Tire Guide</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Boat trailer tires are the most neglected part of any tow rig. They sit in the sun for months, carry heavy loads at highway speeds, get submerged in lake water, and rarely get inspected until something goes wrong. <strong className="text-charcoal">A blown trailer tire at 65 mph with a 5,000-pound boat behind you is one of the most dangerous situations you can face on the road.</strong> The fix is simple: understand when to replace them, how to maintain them, and what to look for before every trip.</p>
        <p>If you&apos;re doing a full pre-season check, pair this guide with our <Link href="/blog/boat-trailer-maintenance-checklist" className="text-water hover:underline">complete trailer maintenance checklist</Link> and our <Link href="/blog/spring-boat-prep" className="text-water hover:underline">spring boat prep guide</Link>.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Replace Every 3-5 Years, Regardless of Tread</h2>
        <p>This is the rule most boaters don&apos;t know. Trailer tires degrade from age and UV exposure, not just mileage. A trailer tire that&apos;s been sitting in your driveway for four years with plenty of tread left can still blow out because the rubber has dried and cracked internally. <strong className="text-charcoal">The industry standard is to replace trailer tires every 3-5 years from the date of manufacture, regardless of how they look.</strong></p>
        <p>To find the manufacture date, look for the DOT code on the sidewall. The last four digits tell you the week and year. For example, &quot;2423&quot; means the tire was made in the 24th week of 2023. If your tires are older than five years, replace them before your next trip. No exceptions.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Tire Pressure: Check Before Every Trip</h2>
        <p>Trailer tires are typically inflated to higher pressures than car tires &mdash; most boat trailer tires require 50-65 PSI depending on load rating. Check the sidewall of the tire for the maximum pressure rating and inflate to that number. <strong className="text-charcoal">Always check pressure when the tires are cold</strong> (before driving, not after). A good digital <a href="https://www.amazon.com/s?k=digital+tire+pressure+gauge&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-water hover:underline">tire pressure gauge</a> is a $10 investment that prevents blowouts.</p>
        <p>Underinflation is the leading cause of trailer tire failure. A tire running 10 PSI low generates significantly more heat at highway speeds, and heat is what destroys trailer tires. Unlike your truck, trailer tires don&apos;t have a TPMS warning light &mdash; you won&apos;t know they&apos;re low unless you check manually.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">UV Damage and Dry Rot</h2>
        <p>If your trailer sits outside between trips, the sun is slowly killing your tires. UV radiation breaks down rubber compounds and causes sidewall cracking (dry rot). Look for small cracks in the sidewall, especially between the tread blocks and along the lower sidewall near the rim. Any visible cracking means the tire needs to be replaced immediately &mdash; it doesn&apos;t matter how much tread is left.</p>
        <p>To slow UV damage, use tire covers when the trailer is stored. If you don&apos;t have covers, park the trailer in shade or at least move it periodically so the same tire sections aren&apos;t facing the sun for months. A UV protectant spray can help, but it&apos;s no substitute for covers on long-term storage.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Wheel Bearing Maintenance</h2>
        <p>Wheel bearings are directly connected to tire safety. A failed bearing can cause the wheel to lock up, overheat, or come off entirely at highway speed. <strong className="text-charcoal">Bearings should be inspected and repacked with marine-grade grease at least once a year, or every 2,000-3,000 miles.</strong></p>
        <p>Signs of failing bearings include a grinding or humming noise while towing, a wheel that feels hot to the touch after a short drive, or visible grease leaking from the hub. A <a href="https://www.amazon.com/s?k=boat+trailer+bearing+kit&tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow" className="text-water hover:underline">trailer bearing kit</a> with a bearing buddy costs around $25-40 and is one of the best investments you can make. Bearing buddies keep water out and grease in, especially important when you&apos;re submerging the hubs at the ramp.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Always Carry a Spare</h2>
        <p>This sounds obvious, but a surprising number of boat trailers don&apos;t have a spare tire. And of those that do, many have a spare that&apos;s flat, dry-rotted, or the wrong size. <strong className="text-charcoal">Your spare tire needs the same maintenance as your road tires.</strong> Check its pressure before every trip. Inspect it for cracks. Make sure you have a lug wrench that fits your trailer lug nuts (they&apos;re often a different size than your truck&apos;s).</p>
        <p>Mount the spare on the trailer tongue or frame with a proper spare tire carrier. Don&apos;t throw it in the boat &mdash; if you need to change a tire on the highway shoulder, you don&apos;t want to be unloading a boat full of gear to reach it.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Load Ratings Matter</h2>
        <p>Every trailer tire has a load rating stamped on the sidewall, expressed as a letter (Load Range B, C, D, or E). This tells you the maximum weight each tire can safely carry at its maximum inflation pressure. <strong className="text-charcoal">Add up the load ratings of all tires on the trailer and make sure the total exceeds the combined weight of the trailer and boat.</strong></p>
        <p>Load Range C tires (1,820 lbs each at 50 PSI) are common on lighter trailers. Heavier boats need Load Range D (2,540 lbs each at 65 PSI) or E tires. Never downgrade from the tire size and load rating that came on your trailer. If you&apos;re upgrading to a heavier boat, you may need to upgrade your tires too.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">ST vs LT Tires: Use the Right Type</h2>
        <p>Trailer tires are designated ST (Special Trailer). They&apos;re designed differently from LT (Light Truck) tires. ST tires have stiffer sidewalls to reduce sway, higher load capacities for their size, and are built to handle the lateral stresses of towing. <strong className="text-charcoal">Never put passenger car tires on a boat trailer.</strong> And while LT tires can work in a pinch, ST tires are the correct choice for trailer use. They&apos;re designed for the job.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Pre-Trip Tire Inspection Checklist</h2>
        <p>Before every trip, take 60 seconds to check your trailer tires. Here&apos;s what to look for:</p>
        <p><strong className="text-charcoal">Pressure:</strong> Check all tires including the spare with a gauge. Inflate to the sidewall-rated pressure. <strong className="text-charcoal">Tread:</strong> Look for uneven wear patterns that indicate alignment or bearing issues. <strong className="text-charcoal">Sidewalls:</strong> Check for cracks, bulges, or cuts. Any bulge means immediate replacement. <strong className="text-charcoal">Lug nuts:</strong> Make sure all are present and tight. Re-torque after the first 50 miles of a new tire. <strong className="text-charcoal">Age:</strong> Check the DOT date code. Replace if over 5 years old.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Don&apos;t Let Tires Ruin Your Trip</h2>
        <p>A blown trailer tire turns a fun weekend at the lake into a stressful, expensive roadside ordeal. The maintenance is simple, the inspections take a minute, and replacement tires are cheap compared to the cost of a tow truck on the highway. Take care of your tires and they&apos;ll take care of you.</p>
        <p>Ready to hit the ramp? Find boat ramp details across <Link href="/texas" className="text-water hover:underline">Texas</Link>, <Link href="/florida" className="text-water hover:underline">Florida</Link>, <Link href="/oklahoma" className="text-water hover:underline">Oklahoma</Link>, <Link href="/michigan" className="text-water hover:underline">Michigan</Link>, and all 50 states on RampSeeker. And make sure you know <Link href="/blog/how-to-back-trailer" className="text-water hover:underline">how to back your trailer</Link> before you get to the ramp.</p>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How often should I replace boat trailer tires?", acceptedAnswer: { "@type": "Answer", text: "Replace boat trailer tires every 3-5 years from the date of manufacture, regardless of tread depth. Trailer tires degrade from UV exposure and age even when not in use. Check the DOT date code on the sidewall — the last four digits indicate the week and year of manufacture. Tires older than 5 years should be replaced immediately." } },
            { "@type": "Question", name: "What PSI should boat trailer tires be?", acceptedAnswer: { "@type": "Answer", text: "Most boat trailer tires require 50-65 PSI depending on the load range. Check the maximum pressure rating printed on the tire sidewall and inflate to that number. Always check pressure when tires are cold (before driving). Underinflation is the leading cause of trailer tire blowouts because it generates excess heat at highway speeds." } },
            { "@type": "Question", name: "Can I use regular truck tires on a boat trailer?", acceptedAnswer: { "@type": "Answer", text: "No. Boat trailers should use ST (Special Trailer) tires, not passenger car or light truck tires. ST tires have stiffer sidewalls to reduce trailer sway, higher load capacities for their size, and are engineered for the lateral stresses of towing. LT tires can work temporarily in an emergency, but ST tires are the correct long-term choice." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">How often should I replace boat trailer tires?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Replace boat trailer tires every 3-5 years from the date of manufacture, regardless of tread depth. Trailer tires degrade from UV exposure and age even when not in use. Check the DOT date code on the sidewall &mdash; the last four digits indicate the week and year of manufacture. Tires older than 5 years should be replaced immediately.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">What PSI should boat trailer tires be?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">Most boat trailer tires require 50-65 PSI depending on the load range. Check the maximum pressure rating printed on the tire sidewall and inflate to that number. Always check pressure when tires are cold (before driving). Underinflation is the leading cause of trailer tire blowouts because it generates excess heat at highway speeds.</p>
          </details>
          <details className="group bg-gray-50 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-[Cabin] font-bold text-charcoal text-sm">Can I use regular truck tires on a boat trailer?</summary>
            <p className="px-4 pb-3 text-gray-600 text-sm">No. Boat trailers should use ST (Special Trailer) tires, not passenger car or light truck tires. ST tires have stiffer sidewalls to reduce trailer sway, higher load capacities for their size, and are engineered for the lateral stresses of towing. LT tires can work temporarily in an emergency, but ST tires are the correct long-term choice.</p>
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
