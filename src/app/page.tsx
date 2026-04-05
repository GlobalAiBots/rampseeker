"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { lakes } from "@/data/lakes";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import EmailCapture from "@/components/EmailCapture";

const blogPosts = [
  { slug: "best-bass-fishing-lakes-oklahoma", title: "The 7 Best Bass Fishing Lakes in Oklahoma", date: "Apr 1, 2026" },
  { slug: "oklahoma-boating-rules-2026", title: "Oklahoma Boating Rules & Regulations (2026)", date: "Mar 28, 2026" },
  { slug: "how-to-launch-boat-beginner-guide", title: "How to Launch a Boat: Beginner's Guide", date: "Mar 25, 2026" },
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
    // OK lakes
    lakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: l.name, href: l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}` });
    });
    // Ramps
    unified.filter((r) => r.name.toLowerCase().includes(q)).slice(0, 5).forEach((r) => {
      results.push({ type: "Ramp", label: `${r.name} (${r.state})`, href: `/ramps/${r.id}` });
    });
    return results.slice(0, 8);
  }, [query]);

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "RampSeeker", url: "https://rampseeker.com",
        description: `Find boat ramps across the United States. ${unified.length.toLocaleString()}+ ramps with GPS coordinates, amenities, and local tips.`,
        potentialAction: { "@type": "SearchAction", target: "https://rampseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com",
        description: "The most complete boat ramp directory in the United States.",
      }) }} />

      {/* HERO */}
      <section className="relative py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,106,79,0.05) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-6xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          Every Boat Ramp in America
        </h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
          {unified.length.toLocaleString()}+ boat ramps across {stateList.length} states. Find your launch point.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by state, lake, city, or ramp name..."
            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 text-charcoal outline-none focus:border-water focus:ring-2 focus:ring-water/20 transition shadow-lg text-sm font-['Source_Sans_3']" />
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

        {/* Top states quick links */}
        <div className="flex gap-2 justify-center mt-6 flex-wrap max-w-3xl mx-auto">
          {statesWithCounts.slice(0, 12).map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="bg-water/90 hover:bg-water text-white font-bold px-4 py-2 rounded-lg transition shadow-sm text-xs">{s.name} ({s.count.toLocaleString()})</Link>
          ))}
          <span className="text-gray-400 font-medium px-4 py-2 text-xs">+ {stateList.length - 12} more states</span>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-y border-gray-200 py-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { value: unified.length.toLocaleString(), label: "Boat Ramps" },
            { value: String(stateList.length), label: "States" },
            { value: "Free", label: "& Updated" },
            { value: "GPS", label: "Verified" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-[Cabin] text-2xl font-bold text-charcoal">{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE BY STATE */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {statesWithCounts.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition">
              <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{s.name}</p>
              <p className="text-gray-400 text-xs">{s.count.toLocaleString()} ramps</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot position="homepage-mid" />

      {/* WHY RAMPSEEKER */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-8">Why RampSeeker</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "&#128205;", title: "GPS Coordinates", desc: "Exact location for every ramp. Never end up at a locked gate again." },
            { icon: "&#127959;", title: "Amenity Filters", desc: "Find ramps with restrooms, courtesy docks, lighting, or fuel." },
            { icon: "&#128172;", title: "Local Tips", desc: "Real advice from boaters who use these ramps every week." },
            { icon: "&#128274;", title: "Free Forever", desc: "No login. No account. No fees. Just find your ramp and go." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
              <p className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: f.icon }} />
              <h3 className="font-[Cabin] font-bold text-charcoal text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED: OKLAHOMA */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: Oklahoma Lakes</h2>
            <p className="text-gray-400 text-sm">Our most detailed state — local tips, nearby businesses, insider knowledge</p>
          </div>
          <Link href="/oklahoma" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lakes.slice(0, 6).map((l) => (
            <Link key={l.id} href={l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}`}
              className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-sunset">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{l.name}</h3>
              <p className="text-gray-400 text-xs mt-1">{l.acres.toLocaleString()} acres &middot; {l.nearestTowns[0]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Boating Guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition">All posts &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {blogPosts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="text-gray-400 text-xs mb-1">{p.date}</p>
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{p.title}</h3>
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
            { "@type": "Question", name: "How many boat ramps does RampSeeker cover?", acceptedAnswer: { "@type": "Answer", text: `We have data on ${unified.length.toLocaleString()}+ boat ramps across ${stateList.length} states.` } },
            { "@type": "Question", name: "Is RampSeeker free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No login, no account, no fees. Just find your ramp and go." } },
            { "@type": "Question", name: "How do I find a boat ramp near me?", acceptedAnswer: { "@type": "Answer", text: `Use the search bar to search by state, lake, city, or ramp name. We cover ${stateList.length} states with detailed boat ramp directories.` } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps does RampSeeker cover?", a: `We have data on ${unified.length.toLocaleString()}+ boat ramps across ${stateList.length} states with GPS coordinates, amenities, and local tips.` },
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

      <EmailCapture />

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>

      {/* Submit */}
      <section id="submit" className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-2">Know a ramp we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete ramp directory in America.</p>
          <a href="mailto:hello@rampseeker.com?subject=New%20Ramp%20Submission" className="bg-sunset hover:bg-sunset-dark text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Ramp</a>
        </div>
      </section>
    </div>
  );
}
