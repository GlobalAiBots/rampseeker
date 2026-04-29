"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { lakes } from "@/data/lakes";
import rampTotals from "@/data/state-ramp-totals.json";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import NearMeButton from "@/components/NearMeButton";
import GearRecommendation from "@/components/GearRecommendation";
import SeasonalPicks from "@/components/SeasonalPicks";

const blogPosts = [
  { slug: "free-boat-ramps-how-to-find-them", title: "Free vs Paid Boat Ramps: How to Find Free Launch Sites", date: "Apr 4, 2026", img: "/images/blog-boat-ramp-free.jpg" },
  { slug: "boat-trailer-maintenance-checklist", title: "Boat Trailer Maintenance: The Pre-Season Checklist", date: "Mar 22, 2026", img: "/images/blog-trailer-maintenance.jpg" },
  { slug: "night-launching-tips", title: "Night Launching: How to Launch Your Boat in the Dark", date: "Mar 12, 2026", img: "/images/blog-night-launching.jpg" },
];

const stateList: { name: string; slug: string; code: string }[] = [
  { name: "Alabama", slug: "alabama", code: "AL" },
  { name: "Alaska", slug: "alaska", code: "AK" },
  { name: "Arizona", slug: "arizona", code: "AZ" },
  { name: "Arkansas", slug: "arkansas", code: "AR" },
  { name: "California", slug: "california", code: "CA" },
  { name: "Colorado", slug: "colorado", code: "CO" },
  { name: "Connecticut", slug: "connecticut", code: "CT" },
  { name: "Delaware", slug: "delaware", code: "DE" },
  { name: "Florida", slug: "florida", code: "FL" },
  { name: "Georgia", slug: "georgia", code: "GA" },
  { name: "Hawaii", slug: "hawaii", code: "HI" },
  { name: "Idaho", slug: "idaho", code: "ID" },
  { name: "Illinois", slug: "illinois", code: "IL" },
  { name: "Indiana", slug: "indiana", code: "IN" },
  { name: "Iowa", slug: "iowa", code: "IA" },
  { name: "Kansas", slug: "kansas", code: "KS" },
  { name: "Kentucky", slug: "kentucky", code: "KY" },
  { name: "Louisiana", slug: "louisiana", code: "LA" },
  { name: "Maine", slug: "maine", code: "ME" },
  { name: "Maryland", slug: "maryland", code: "MD" },
  { name: "Massachusetts", slug: "massachusetts", code: "MA" },
  { name: "Michigan", slug: "michigan", code: "MI" },
  { name: "Minnesota", slug: "minnesota", code: "MN" },
  { name: "Mississippi", slug: "mississippi", code: "MS" },
  { name: "Missouri", slug: "missouri", code: "MO" },
  { name: "Montana", slug: "montana", code: "MT" },
  { name: "Nebraska", slug: "nebraska", code: "NE" },
  { name: "New Hampshire", slug: "new-hampshire", code: "NH" },
  { name: "New Jersey", slug: "new-jersey", code: "NJ" },
  { name: "New Mexico", slug: "new-mexico", code: "NM" },
  { name: "New York", slug: "new-york", code: "NY" },
  { name: "North Carolina", slug: "north-carolina", code: "NC" },
  { name: "North Dakota", slug: "north-dakota", code: "ND" },
  { name: "Ohio", slug: "ohio", code: "OH" },
  { name: "Oklahoma", slug: "oklahoma", code: "OK" },
  { name: "Oregon", slug: "oregon", code: "OR" },
  { name: "Pennsylvania", slug: "pennsylvania", code: "PA" },
  { name: "South Carolina", slug: "south-carolina", code: "SC" },
  { name: "South Dakota", slug: "south-dakota", code: "SD" },
  { name: "Tennessee", slug: "tennessee", code: "TN" },
  { name: "Texas", slug: "texas", code: "TX" },
  { name: "Utah", slug: "utah", code: "UT" },
  { name: "Virginia", slug: "virginia", code: "VA" },
  { name: "Washington", slug: "washington", code: "WA" },
  { name: "West Virginia", slug: "west-virginia", code: "WV" },
  { name: "Wyoming", slug: "wyoming", code: "WY" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of unified) map[r.state] = (map[r.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(() =>
    stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).sort((a, b) => b.count - a.count),
  [stateCounts]);

  const showToggle = statesWithCounts.length > 15;

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    stateList.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 4).forEach((s) => {
      results.push({ type: "State", label: s.name, href: `/${s.slug}` });
    });
    lakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: l.name, href: l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}` });
    });
    unified.filter((r) => r.name.toLowerCase().includes(q)).slice(0, 5).forEach((r) => {
      results.push({ type: "Ramp", label: `${r.name} (${r.state})`, href: `/ramps/${r.id}` });
    });
    return results.slice(0, 8);
  }, [query]);

  const rampCount = ((rampTotals as Record<string, number>)._network || unified.length).toLocaleString();

  const faqItems = [
    { q: "Are most public boat ramps free to use?", a: "Most state and county boat ramps are free. Federal ramps (USACE, National Park Service) often charge $5-15 per launch or offer annual passes. Check the listing's amenity details on RampSeeker — fee information is included where verified." },
    { q: "Do I need a permit or registration to launch a boat?", a: "Boat registration is required in every state for motorized vessels above a certain horsepower (varies by state). Some states also require a launch permit or invasive species inspection sticker. Check your state's DNR or fish-and-wildlife agency before launching." },
    { q: "What's the difference between a public boat ramp and a marina?", a: "A public boat ramp is a launch point — you trailer in, launch, and leave. A marina offers slip rentals, fuel, services, and storage. Many marinas have public ramps adjacent to them but charge a fee for use. See MarinaSeeker for full marina listings." },
    { q: "How early should I arrive on busy weekends?", a: "On summer weekends at popular ramps, plan to arrive at sunrise. Holiday weekends — Memorial Day, July 4, Labor Day — often see parking lots full by 8 AM. RampSeeker's directory includes alternates nearby if your first choice is packed." },
    { q: "Is RampSeeker free to use?", a: "Yes, completely free. No login, no account, no paid tier. We're funded by display advertising and listing partnerships with shops and services. Find your ramp and go." },
  ];

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "RampSeeker", url: "https://www.rampseeker.com",
        description: `Find boat ramps across the United States. ${rampCount}+ ramps with GPS coordinates, amenities, and local tips.`,
        potentialAction: { "@type": "SearchAction", target: "https://www.rampseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com",
        description: "The most complete boat ramp directory in the United States.",
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "How to Find a Boat Ramp Near You: The Complete Guide",
        description: "Practical guide to finding and evaluating public boat ramps — water levels, launch fees, surface types, etiquette, and red flags worth knowing before you trailer.",
        author: { "@type": "Organization", name: "RampSeeker Editorial", url: "https://www.rampseeker.com" },
        publisher: { "@type": "Organization", name: "RampSeeker", url: "https://www.rampseeker.com" },
        datePublished: "2026-04-28",
        dateModified: "2026-04-28",
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.rampseeker.com" },
        articleSection: "Boating",
        keywords: ["how to find a boat ramp", "public boat ramps", "USACE boat ramps", "boat launch fees", "boat ramp etiquette", "ramp surface types", "boat ramp red flags"],
      }) }} />

      {/* HERO — Full-bleed dramatic */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/hero-boat-ramp-sunrise.jpg" alt={`Boat ramp at sunrise on a calm lake — find ${rampCount}+ boat ramps across America on RampSeeker`} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,30,51,0.85) 0%, rgba(11,30,51,0.4) 50%, transparent 100%)' }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-8">
          <p className="text-white/60 text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Boat Ramp Directory</p>
          <h1 className="font-[Cabin] text-5xl md:text-7xl font-bold text-white leading-tight">
            Every Boat Ramp<br />in America
          </h1>
          <p className="text-white/80 mt-4 max-w-lg mx-auto text-lg">
            {rampCount}+ launch sites across {stateList.length} states. GPS coordinates, amenities, and local tips &mdash; free forever.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by state, lake, city, or ramp name..."
              className="w-full px-5 py-4 rounded-xl bg-white text-charcoal outline-none focus:ring-2 focus:ring-water/40 transition shadow-2xl text-sm font-['Source_Sans_3']" />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                {suggestions.map((s, i) => (
                  <Link key={i} href={s.href} className="flex items-center gap-3 px-4 py-3 hover:bg-water/5 transition border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                    <span className="text-sm text-charcoal">{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <NearMeButton label="Find Ramps Near Me" color="#E67E22" />
          </div>

          {/* Top states quick links */}
          <div className="flex gap-2 justify-center mt-4 flex-wrap max-w-2xl mx-auto">
            {statesWithCounts.slice(0, 6).map((s) => (
              <Link key={s.code} href={`/${s.slug}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{s.name} ({s.count.toLocaleString()})</Link>
            ))}
          </div>
        </div>

        {/* Seasonal banner */}
        <div className="relative z-10 w-full mt-auto">
          <div className="bg-sunset/90 backdrop-blur-sm py-2.5 text-center">
            <Link href={(() => { const m = new Date().getMonth(); if (m >= 2 && m <= 4) return "/blog/spring-boat-prep"; if (m >= 5 && m <= 7) return "/blog/best-fishing-by-month"; if (m >= 8 && m <= 10) return "/blog/best-lakes-for-boating-by-state"; return "/blog/winterize-your-boat"; })()} className="text-white font-bold text-sm hover:underline transition">
              {(() => { const m = new Date().getMonth(); if (m >= 2 && m <= 4) return "🌱 Spring Boat Prep: Get Ready for the Season →"; if (m >= 5 && m <= 7) return "☀️ Best Fishing by Month: What to Catch Now →"; if (m >= 8 && m <= 10) return "🍂 Fall Fishing: Best Late-Season Spots →"; return "❄️ How to Winterize Your Boat →"; })()}
            </Link>
          </div>
          <div className="bg-navy/85 backdrop-blur-sm border-t border-white/10 py-6">
            <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              {[
                { value: rampCount, label: "Boat Ramps" },
                { value: "3,400+", label: "Marinas" },
                { value: "35,000+", label: "Fishing Piers" },
                { value: "50", label: "States" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-[Cabin] text-3xl md:text-4xl font-bold text-white">{s.value}</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUR COMPLETE BOATING HUB */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-[28px] md:text-[36px] font-extrabold text-charcoal text-center mb-3">Your Complete Boating Hub</h2>
        <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">Everything you need to get on the water &mdash; ramps, marinas, and fishing piers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link href="#browse-states" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #E8F4F8, #B3D9EB)', border: '2px solid rgba(30,96,145,0.2)' }}>
            <span className="text-5xl block mb-3">&#9981;</span>
            <h3 className="font-[Cabin] font-extrabold text-charcoal text-xl mb-1">Boat Ramps</h3>
            <p className="font-extrabold text-[28px] text-water leading-none mb-2">{rampCount}</p>
            <p className="text-gray-500 text-xs mb-4">Public launch sites with GPS, amenities, and directions.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #2980B9, #1E6091)', boxShadow: '0 4px 12px rgba(30,96,145,0.25)' }}>Find a Ramp &rarr;</span>
          </Link>
          <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #F0FFF4, #C6F6D5)', border: '2px solid rgba(45,106,79,0.2)' }}>
            <span className="text-5xl block mb-3">&#9875;</span>
            <h3 className="font-[Cabin] font-extrabold text-charcoal text-xl mb-1">Marinas</h3>
            <p className="font-extrabold text-[28px] text-forest leading-none mb-2">3,489</p>
            <p className="text-gray-500 text-xs mb-4">Slips, fuel, repair, and docking across the US.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #40916C, #2D6A4F)', boxShadow: '0 4px 12px rgba(45,106,79,0.25)' }}>Find a Marina &rarr;</span>
          </a>
          <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ background: 'linear-gradient(135deg, #FFF7ED, #FDE68A)', border: '2px solid rgba(231,111,81,0.2)' }}>
            <span className="text-5xl block mb-3">&#127907;</span>
            <h3 className="font-[Cabin] font-extrabold text-charcoal text-xl mb-1">Fishing Piers</h3>
            <p className="font-extrabold text-[28px] text-sunset leading-none mb-2">35,150</p>
            <p className="text-gray-500 text-xs mb-4">Public piers, jetties, and shore fishing spots.</p>
            <span className="inline-block text-white font-bold text-sm px-5 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #F59E0B, #E76F51)', boxShadow: '0 4px 12px rgba(231,111,81,0.25)' }}>Find a Pier &rarr;</span>
          </a>
        </div>
      </section>

      {/* ARTICLE HEADER */}
      <article id="ramp-guide" className="max-w-3xl mx-auto px-4 pt-12 pb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">How to Find a Boat Ramp Near You: The Complete Guide</h1>
        <div className="text-gray-700 leading-relaxed space-y-5">
          <p>Whether you&apos;re trailering a 16-foot bass boat to a Tuesday morning fishing spot or hauling a 25-foot cruiser to a holiday weekend on the lake, finding the right boat ramp is the difference between a great day on the water and a frustrating one spent circling parking lots. Not all ramps are equal &mdash; surface condition, courtesy dock availability, parking depth, and crowd levels vary dramatically from one launch to the next, even on the same body of water.</p>
          <p>RampSeeker tracks more than 21,000 public boat ramps across 46 states, with GPS coordinates, amenity details, and local notes for every launch we list. Our directory pulls from federal, state, and municipal sources &mdash; Army Corps of Engineers facilities, state DNR launches, county parks, and city-managed ramps &mdash; so you&apos;re seeing the same launches local boaters use, not just the ones marketed online.</p>
          <p>Below is RampSeeker&apos;s directory of boat ramps organized by state. Continue reading below the directory for the complete guide to evaluating ramp conditions, understanding launch fees and permits, choosing between concrete and gravel ramps, and reading the unwritten rules every experienced boater knows about ramp etiquette.</p>
        </div>
      </article>

      {/* BROWSE BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse by State</h2>
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 ${showToggle ? "mb-6" : "mb-0"}`}>
          {statesWithCounts.map((s, index) => {
            const hideThis = !expanded && index >= 15;
            return (
              <Link key={s.code} href={`/${s.slug}`} className={`group bg-white border border-gray-200 rounded-lg p-3 hover:bg-foam hover:border-water hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water${hideThis ? " hidden" : ""}`}>
                <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{s.name}</p>
                <span className="inline-block mt-1 text-xs font-semibold bg-water/10 text-water px-2 py-0.5 rounded">{s.count.toLocaleString()} ramps</span>
              </Link>
            );
          })}
        </div>
        {showToggle && (
          <div className="text-center">
            <button onClick={() => setExpanded(!expanded)} className="text-water hover:text-sunset font-semibold text-sm transition">
              {expanded ? "Show fewer ↑" : `Show all ${statesWithCounts.length} states ↓`}
            </button>
          </div>
        )}
      </section>

      {/* ARTICLE CONTINUATION */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="border-t border-water/30 pt-6 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-[Cabin]">Complete Guide Continues</p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Why Choosing the Right Boat Ramp Matters</h2>
          <p>Most boaters have a story about the wrong ramp. The one that looked fine on Google Maps but turned out to be a 30-degree concrete slab where a half-ton truck nearly slid into the water. The county launch with no courtesy dock that became a comedy of errors when the wind picked up. The state ramp that closed without warning during low water and left a 90-mile detour to the next nearest launch.</p>
          <p>Picking the right ramp is a small decision with outsized consequences. A bad ramp costs you the morning bite window, scratches a hull on submerged rebar, or chews up a lower unit on a too-shallow drop-off. A good one gets you on the water inside ten minutes with the trailer parked and the boat trimmed for the run out. Over a season &mdash; and especially over a holiday weekend when every popular launch is packed &mdash; knowing which ramps are reliable, which have backup capacity, and which to avoid in certain conditions saves more time than any rod-and-reel upgrade ever will.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Reading Ramp Conditions Before You Trailer</h2>
          <p>A 45-minute drive to a closed ramp is the boater&apos;s most preventable mistake. Before you hitch up, check three things: current water level, recent closures, and parking capacity for the time of day you plan to launch.</p>
          <p>Water level matters most on tailwater fisheries, USACE reservoirs, and any lake with active dam operations. A two-foot drop in 24 hours can turn a paved ramp into mudflats or expose obstacles that weren&apos;t there the last time you launched. State DNR sites and USACE lake pages publish daily readings; many have alerts for closures triggered by ice, debris, or maintenance. RampSeeker&apos;s amenity tags filter for courtesy docks, lighting, and known seasonal closures &mdash; use them as a first pass, then verify against the managing agency&apos;s current notices.</p>
          <p>Parking capacity is the variable that ruins more weekend launches than weather. Big-rig spaces (truck plus 25-foot trailer) at smaller county ramps fill up fast. If you&apos;re heading to a popular ramp on a Saturday, scout one alternate before you leave the driveway.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Understanding Launch Fees, Permits, and Annual Passes</h2>
          <p>Launch fees vary more than most boaters realize. State and county ramps are free in most cases. Federal ramps &mdash; Army Corps of Engineers, National Park Service, and some Bureau of Reclamation sites &mdash; typically charge $5&ndash;$15 per launch or sell annual passes in the $30&ndash;$100 range. Coastal ramps in tourist destinations can run higher, and a few private ramps with public access charge per-launch fees that exceed federal rates.</p>
          <p>Honor-box payment is still the norm at unstaffed ramps. Bring small bills and a pen &mdash; fee envelopes ask for vehicle plate and trailer plate, and a ranger will check. The USACE annual pass covers any USACE-managed launch nationally and pays for itself in three or four uses. State DNR permits are separate and typically cover all state-managed ramps within that state for the calendar year.</p>
          <p>Some states require an invasive species inspection sticker before you launch in certain bodies of water &mdash; check your destination state&apos;s rules, especially when crossing state lines with a trailer. Penalties for skipping the sticker run higher than the fee itself.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Concrete vs. Gravel vs. Carry-Down: What Surface Works for Your Boat</h2>
          <p>Concrete ramps are the workhorse of the public launch system and the only surface most trailerable boats should be using. They handle the weight of a tow rig, hold up to repeat use, and stay drivable when wet. Older concrete cracks and spalls &mdash; pay attention to surface condition, especially in northern states where freeze-thaw cycles take a toll. A concrete ramp with exposed rebar or large heaved sections is one to skip.</p>
          <p>Gravel ramps work for lightweight craft &mdash; small jon boats, aluminum 14-footers, and most trailered kayaks. They wash out in heavy rain and rut up under heavy use, so they&apos;re not the place for a fully loaded fishing rig. Maintenance is uneven; a gravel ramp that was fine in May can be unusable by August at high-traffic launches.</p>
          <p>Carry-down launches are paths or short ramps for canoes, kayaks, and paddleboards. No trailer should ever go down a carry-down &mdash; the surface is wrong, the grade is usually wrong, and the access is paddle-craft-specific. RampSeeker&apos;s listings call out surface type when known; default to concrete unless you&apos;re paddling.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Boat Ramp Etiquette: The Unwritten Rules</h2>
          <p>Every ramp has a rhythm, and experienced boaters can spot the rookie inside thirty seconds. The fastest way to look like you belong is to stay off the ramp until you&apos;re ready to launch.</p>
          <p>Prep in the staging area, not on the ramp. Drain plug in, gear loaded, straps off, lines and fenders ready. The ramp itself is for one job: backing the trailer in, releasing the boat, pulling out. People are waiting behind you &mdash; every minute on the ramp is a minute someone else can&apos;t launch.</p>
          <p>Back down straight. If you can&apos;t, practice in an empty parking lot before you bring an audience. Don&apos;t leave your trailer at the dock while you park &mdash; pull out, clear the area, then park. After the run, do the reverse: idle into the staging area, tie off briefly, walk back for the trailer, then load. When in doubt, watch the regulars. A ramp on a Tuesday morning has a half-dozen boaters who use it weekly. They&apos;ll show you exactly how a smooth launch looks.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Red Flags at a Boat Ramp (and When to Find Another)</h2>
          <p>Some ramps reveal themselves as bad ideas the moment you pull in. Cars parked across staging spaces with no one launching. A line of trucks-and-trailers stretching to the road with no pattern of who&apos;s next. Broken concrete with rebar visible at the waterline. No courtesy dock when a 15-knot crosswind is pushing every boat onto the rocks. A parking lot too small for tow rigs, or a ramp where the only &quot;parking&quot; is the shoulder of a public road.</p>
          <p>Suspicious activity is its own category. If the lot has shattered glass, a few sketchy parked cars, or a vibe that says no one is paying attention, you don&apos;t want to leave a trailer and tow vehicle there for eight hours. Trust your read of the place &mdash; boaters who launch every weekend learn to feel this within ten seconds of pulling in.</p>
          <p>When a ramp fails the eye test, leave. RampSeeker lists the closest alternates with parking, surface, and amenity details so you can re-route in minutes. A 20-minute detour beats a ruined day every time.</p>
        </div>
      </article>

      <AdSlot position="homepage-mid" />

      {/* WHY RAMPSEEKER */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-8">Why RampSeeker</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: "&#128205;", title: "GPS Coordinates", desc: "Exact location for every ramp. Never end up at a locked gate again." },
            { icon: "&#127959;", title: "Amenity Filters", desc: "Find ramps with restrooms, courtesy docks, lighting, or fuel." },
            { icon: "&#128172;", title: "Local Tips", desc: "Real advice from boaters who use these ramps every week." },
            { icon: "&#128274;", title: "Free Forever", desc: "No login. No account. No fees. Just find your ramp and go." },
            { icon: "&#128241;", title: "Mobile Friendly", desc: "Full GPS and directions on any phone. No app needed." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm text-center transition-all hover:shadow-md" style={{ borderTop: '3px solid #1E6091' }}>
              <div className="w-14 h-14 rounded-full bg-water/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl" dangerouslySetInnerHTML={{ __html: f.icon }} />
              </div>
              <h3 className="font-[Cabin] font-bold text-charcoal text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEASONAL PICKS (rotates by month) */}
      <section className="max-w-5xl mx-auto px-4 py-2">
        <SeasonalPicks />
      </section>

      {/* ESSENTIAL GEAR SECTIONS */}
      <section className="max-w-5xl mx-auto px-4 py-2">
        <GearRecommendation section="launch-gear" />
        <GearRecommendation section="water-essentials" />
        <GearRecommendation section="electronics" />
      </section>

      {/* FLOATING DOCKS & RAMPS CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 py-4">
        <Link href="/blog/floating-boat-ramps" className="block rounded-2xl overflow-hidden group" style={{ background: "linear-gradient(135deg, #0D9488 0%, #1E6091 100%)" }}>
          <div className="px-6 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-1">New Guide</p>
              <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-1">Floating Boat Ramps &amp; Portable Docks</h3>
              <p className="text-white/80 text-sm max-w-xl">Fluctuating water levels or no public ramp nearby? Compare modular floating docks, drive-on ramps, and DIY foam-float builds — plus top-rated products on Amazon.</p>
            </div>
            <span className="bg-white/20 group-hover:bg-white/30 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition whitespace-nowrap">Read the Guide &rarr;</span>
          </div>
        </Link>
      </section>

      {/* GEAR UP FOR THE WATER */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1E33 0%, #1E6091 60%, #2D6A4F 100%)" }}>
          <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Gear Up for the Water &#128674;</h3>
              <p className="text-white/80 text-sm max-w-md">Top-rated boating and fishing gear for every trip.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "https://www.amazon.com/dp/B001GQ2A6O?tag=babymydog03-20", label: "Life Jackets" },
                { href: "https://www.amazon.com/dp/B07X3YCXZK?tag=babymydog03-20", label: "Fish Finders" },
                { href: "https://www.amazon.com/dp/B0006MX56Y?tag=babymydog03-20", label: "Trailer Guides" },
                { href: "https://www.amazon.com/dp/B000ALQ7VO?tag=babymydog03-20", label: "Boat Fenders" },
              ].map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-2 rounded-lg transition">{p.label}</a>
              ))}
              <a href="https://www.amazon.com/dp/B08CXKQZJG?tag=babymydog03-20" target="_blank" rel="noopener noreferrer nofollow sponsored" className="bg-white text-[#1E6091] font-bold text-xs px-4 py-2 rounded-lg hover:shadow-lg transition">Ramp Sandals &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* DEEP DIVE: OKLAHOMA */}
      <section className="py-10" style={{ background: 'linear-gradient(135deg, #E8F4F8 0%, #F8FAFB 100%)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Deep Dive: Oklahoma</h2>
              <p className="text-gray-400 text-sm">Our most detailed state &mdash; hand-curated tips, nearby businesses, and insider knowledge for every ramp.</p>
            </div>
            <Link href="/oklahoma" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {lakes.slice(0, 6).map((l) => (
              <Link key={l.id} href={l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}`}
                className="group bg-white rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-sunset" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{l.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold bg-water/10 text-water px-2 py-0.5 rounded">{l.acres.toLocaleString()} acres</span>
                  <span className="text-gray-400 text-xs">&middot; {l.nearestTowns[0]}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Boating Guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition">All posts &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">{p.date}</p>
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot position="homepage-pre-faq" />

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">
                {f.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16" style={{ background: '#0B1E33' }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-white mb-2">Get Boating Updates &#128676;</h2>
          <p className="text-white/70 text-sm mb-6">New ramps, seasonal tips, and fishing reports delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-water transition" />
            <button className="bg-sunset hover:bg-sunset-dark text-white font-bold px-7 py-3.5 rounded-xl transition text-sm whitespace-nowrap">Subscribe Free</button>
          </div>
          <p className="text-white/30 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>

      {/* Submit */}
      <section id="submit" className="max-w-2xl mx-auto px-4 pb-20 pt-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-2">Know a ramp we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete ramp directory in America.</p>
          <a href="mailto:hello@rampseeker.com?subject=New%20Ramp%20Submission" className="bg-sunset hover:bg-sunset-dark text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Ramp</a>
        </div>
      </section>
    </div>
  );
}
