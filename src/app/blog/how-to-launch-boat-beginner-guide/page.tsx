import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import GearRecommendation from "@/components/GearRecommendation";
import { blogPosts, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Launch a Boat: Complete Beginner's Guide for Oklahoma Ramps | RampSeeker",
  description: "Step-by-step guide to launching your boat at Oklahoma ramps. Pre-launch checklist, backing tips, loading tricks, ramp etiquette, and common mistakes to avoid.",
  keywords: "how to launch a boat, boat ramp tips, beginner boat launching, boat ramp etiquette",
  openGraph: { title: "How to Launch a Boat: Beginner's Guide", url: "https://rampseeker.com/blog/how-to-launch-boat-beginner-guide" },
  alternates: { canonical: "https://rampseeker.com/blog/how-to-launch-boat-beginner-guide" },
};

export default function LaunchPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "How to Launch a Boat: Complete Beginner's Guide for Oklahoma Ramps",
        datePublished: "2026-03-25", author: { "@type": "Organization", name: "RampSeeker Team" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" },
      }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: blogPosts[2].gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition">Home</Link><span>/</span>
            <Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span>
            <span className="text-white/80">Beginner Guide</span>
          </nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">Beginner Guide</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">How to Launch a Boat: Complete Beginner&apos;s Guide for Oklahoma Ramps</h1>
          <p className="text-white/60 text-sm mt-3">March 25, 2026 &middot; 7 min read &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>Your first time launching a boat can be intimidating. There&apos;s a line of trucks behind you, the ramp is steeper than it looked, and you&apos;re pretty sure everyone is watching. Take a breath. Every experienced boater was a beginner once. This guide walks you through the entire process so your first launch goes smoothly.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Before You Leave Home</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-charcoal">Check the drain plug.</strong> This is the #1 thing people forget. Put the drain plug IN before you get to the ramp. Forgetting it means your boat fills with water. Many experienced boaters tape a reminder to their steering wheel.</li>
          <li><strong className="text-charcoal">Check trailer lights and tires.</strong> Make sure brake lights and turn signals work. Check tire pressure.</li>
          <li><strong className="text-charcoal">Load gear at home.</strong> Don&apos;t load coolers, tackle, and gear at the ramp. Do it in your driveway.</li>
          <li><strong className="text-charcoal">Check the weather.</strong> Wind over 15 mph makes launching (and boating) significantly harder, especially for beginners.</li>
          <li><strong className="text-charcoal">Know your ramp.</strong> Check <Link href="/" className="text-water hover:underline">RampSeeker</Link> for ramp details — how many lanes, is there a courtesy dock, is it concrete or gravel.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">At the Ramp: Pre-Launch Prep</h2>
        <p>Before you back down the ramp, pull into the staging area (NOT on the ramp itself) and do these things:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Remove all tie-down straps (leave the winch strap connected)</li>
          <li>Remove the transom saver if you use one</li>
          <li>Raise the motor/outdrive so it clears the trailer rollers</li>
          <li>Put the key in the ignition</li>
          <li>Attach the kill switch lanyard</li>
          <li>Verify the drain plug is in (check again!)</li>
          <li>Load anything you need from the truck into the boat</li>
        </ul>
        <p>All of this should happen BEFORE you get in the ramp line. The ramp is for launching, not prepping.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Backing Down the Ramp</h2>
        <p>This is the part that terrifies beginners. Here&apos;s the secret: go slow and use your mirrors.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-charcoal">Line up straight.</strong> Before you start backing, get your truck and trailer lined up with the ramp lane.</li>
          <li><strong className="text-charcoal">Go slow.</strong> Idle speed. There&apos;s no rush.</li>
          <li><strong className="text-charcoal">Use your mirrors.</strong> The trailer goes the OPPOSITE direction of the bottom of your steering wheel. Turn the wheel right, the trailer goes left.</li>
          <li><strong className="text-charcoal">Small corrections.</strong> Don&apos;t crank the wheel. Slight adjustments keep you straight.</li>
          <li><strong className="text-charcoal">Back in until the trailer tires are at the water&apos;s edge.</strong> You don&apos;t need to submerge the whole trailer — just enough for the boat to float off the bunks.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Launching the Boat</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Set the parking brake firmly</li>
          <li>Release the winch strap</li>
          <li>Give the boat a push or let gravity slide it off the trailer</li>
          <li>If there&apos;s a courtesy dock, your partner walks the boat to the dock and ties it off</li>
          <li>If you&apos;re solo: tie a long line from the bow to the dock, then release the winch — the boat floats back on the line</li>
          <li>Pull your truck and trailer forward, out of the ramp, and park in the designated trailer parking area</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Loading the Boat (Coming Back In)</h2>
        <p>Loading is the reverse, but people struggle with it more because they&apos;re tired after a day on the water.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Idle your boat to the courtesy dock or shoreline near the ramp</li>
          <li>Tie it off. Go get your truck and trailer.</li>
          <li>Back the trailer into the water — same depth as when you launched</li>
          <li>Drive or winch the boat onto the trailer</li>
          <li>Attach the winch strap to the bow eye</li>
          <li>Pull forward out of the water. DO NOT stop on the ramp to drain, strap down, or organize gear.</li>
          <li>Pull into the staging area, then strap down, raise the motor, and drain the boat</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Common Mistakes</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-charcoal">Forgetting the drain plug</strong> — your boat will fill with water. Ask me how I know.</li>
          <li><strong className="text-charcoal">Prepping on the ramp</strong> — this blocks the ramp for everyone. Prep in the staging area.</li>
          <li><strong className="text-charcoal">Not setting the parking brake</strong> — trucks have rolled into the lake. It happens every year.</li>
          <li><strong className="text-charcoal">Backing in too deep</strong> — you don&apos;t need to submerge your truck. Just the trailer bunks/rollers.</li>
          <li><strong className="text-charcoal">Panicking when it&apos;s not perfect</strong> — pull forward, straighten out, and try again. Nobody cares.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Best Ramps for Beginners</h2>
        <p>Look for ramps with wide lanes, courtesy docks, and gentle slopes. On <Link href="/grand-lake" className="text-water hover:underline">Grand Lake</Link>, <Link href="/ramps/wolf-creek-park" className="text-water hover:underline">Wolf Creek Park</Link> has 6 wide lanes and courtesy docks. <Link href="/ramps/bernice-state-park" className="text-water hover:underline">Bernice State Park</Link> is family-friendly with a gentle approach. For a quieter experience, try <Link href="/ramps/honey-creek-state-park" className="text-water hover:underline">Honey Creek State Park</Link>.</p>
        <p>Use <Link href="/best/boat-ramps-with-courtesy-docks" className="text-water hover:underline">our list of ramps with courtesy docks</Link> to find the easiest launches in Oklahoma.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Find Your Ramp</h2>
        <p>Ready? <Link href="/" className="text-water hover:underline">Search 261+ Oklahoma boat ramps</Link> on RampSeeker. Filter by amenities like courtesy docks and restrooms to find the perfect launch for your first trip.</p>
        <GearRecommendation section="launch-gear" />
        <BlogCletusCallout />
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-4">More from the Blog</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getRelatedPosts("how-to-launch-boat-beginner-guide").map((p) => (
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
