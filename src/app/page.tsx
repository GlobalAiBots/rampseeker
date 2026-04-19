"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { lakes } from "@/data/lakes";
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

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of unified) map[r.state] = (map[r.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(() =>
    stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).sort((a, b) => b.count - a.count),
  [stateCounts]);

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

  const rampCount = unified.length.toLocaleString();

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "RampSeeker", url: "https://rampseeker.com",
        description: `Find boat ramps across the United States. ${rampCount}+ ramps with GPS coordinates, amenities, and local tips.`,
        potentialAction: { "@type": "SearchAction", target: "https://rampseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com",
        description: "The most complete boat ramp directory in the United States.",
      }) }} />

      {/* HERO — Full-bleed dramatic */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/hero-boat-ramp-sunrise.jpg" alt="Boat ramp at sunrise on a calm lake — find 29,500+ boat ramps across America on RampSeeker" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
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

      {/* BROWSE BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {statesWithCounts.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:bg-foam hover:border-water hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{s.name}</p>
              <span className="inline-block mt-1 text-xs font-semibold bg-water/10 text-water px-2 py-0.5 rounded">{s.count.toLocaleString()} ramps</span>
            </Link>
          ))}
        </div>
      </section>

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
          mainEntity: [
            { "@type": "Question", name: "How many boat ramps does RampSeeker cover?", acceptedAnswer: { "@type": "Answer", text: `We have data on ${rampCount}+ boat ramps across ${stateList.length} states.` } },
            { "@type": "Question", name: "Is RampSeeker free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No login, no account, no fees. Just find your ramp and go." } },
            { "@type": "Question", name: "How do I find a boat ramp near me?", acceptedAnswer: { "@type": "Answer", text: `Use the search bar to search by state, lake, city, or ramp name. We cover ${stateList.length} states with detailed boat ramp directories.` } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps does RampSeeker cover?", a: `We have data on ${rampCount}+ boat ramps across ${stateList.length} states with GPS coordinates, amenities, and local tips.` },
            { q: "Is RampSeeker free?", a: "Yes, completely free. No login, no account needed. Just find your ramp and go." },
            { q: "How do I find a boat ramp near me?", a: `Use the search bar or browse by state. We cover ${stateList.length} states with detailed boat ramp directories.` },
            { q: "Can I submit a ramp you're missing?", a: "Yes! Email hello@rampseeker.com with the ramp name and location. We'll add it to the directory." },
          ].map((f, i) => (
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
