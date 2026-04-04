"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";
import { lakes } from "@/data/lakes";
import { texasLakes } from "@/data/texas-lakes";
import { missouriLakes } from "@/data/missouri-lakes";
import { arkansasLakes } from "@/data/arkansas-lakes";
import { kansasLakes } from "@/data/kansas-lakes";
import AdSlot from "@/components/AdSlot";
import EmailCapture from "@/components/EmailCapture";

const blogPosts = [
  { slug: "best-bass-fishing-lakes-oklahoma", title: "The 7 Best Bass Fishing Lakes in Oklahoma", date: "Apr 1, 2026" },
  { slug: "oklahoma-boating-rules-2026", title: "Oklahoma Boating Rules & Regulations (2026)", date: "Mar 28, 2026" },
  { slug: "how-to-launch-boat-beginner-guide", title: "How to Launch a Boat: Beginner's Guide", date: "Mar 25, 2026" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const okCount = useMemo(() => unified.filter((r) => r.state === "OK").length, []);
  const txCount = useMemo(() => unified.filter((r) => r.state === "TX").length, []);
  const moCount = useMemo(() => unified.filter((r) => r.state === "MO").length, []);
  const arCount = useMemo(() => unified.filter((r) => r.state === "AR").length, []);
  const ksCount = useMemo(() => unified.filter((r) => r.state === "KS").length, []);

  // Search suggestions
  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    // States
    if ("oklahoma".includes(q)) results.push({ type: "State", label: "Oklahoma", href: "/oklahoma" });
    if ("texas".includes(q)) results.push({ type: "State", label: "Texas", href: "/texas" });
    if ("missouri".includes(q)) results.push({ type: "State", label: "Missouri", href: "/missouri" });
    if ("arkansas".includes(q)) results.push({ type: "State", label: "Arkansas", href: "/arkansas" });
    if ("kansas".includes(q)) results.push({ type: "State", label: "Kansas", href: "/kansas" });
    arkansasLakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: `${l.name} (AR)`, href: `/arkansas/lakes/${l.id}` });
    });
    kansasLakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: `${l.name} (KS)`, href: `/kansas/lakes/${l.id}` });
    });
    // MO lakes
    missouriLakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: `${l.name} (MO)`, href: `/missouri/lakes/${l.id}` });
    });
    // OK lakes
    lakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: l.name, href: l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}` });
    });
    // TX lakes
    texasLakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: `${l.name} (TX)`, href: `/texas/lakes/${l.id}` });
    });
    // Ramps (top 5)
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
        description: "Find boat ramps across the United States. 29,000+ ramps with GPS coordinates, amenities, and local tips.",
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
          29,000+ boat ramps across the United States. Find your launch point.
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

        {/* Quick links */}
        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          <Link href="/oklahoma" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-5 py-2.5 rounded-lg transition shadow-sm text-sm">Oklahoma ({okCount}+)</Link>
          <Link href="/texas" className="bg-water hover:bg-water-light text-white font-bold px-5 py-2.5 rounded-lg transition shadow-sm text-sm">Texas ({txCount})</Link>
          <Link href="/missouri" className="bg-forest hover:bg-forest-light text-white font-bold px-5 py-2.5 rounded-lg transition shadow-sm text-sm">Missouri ({moCount})</Link>
          <Link href="/arkansas" className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-bold px-5 py-2.5 rounded-lg transition text-sm">Arkansas ({arCount})</Link>
          <Link href="/kansas" className="border-2 border-gray-400 text-gray-500 hover:bg-gray-500 hover:text-white font-bold px-5 py-2.5 rounded-lg transition text-sm">Kansas ({ksCount})</Link>
          <span className="text-gray-400 font-medium px-5 py-2.5 text-sm">More states coming</span>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-y border-gray-200 py-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { value: "29,000+", label: "Boat Ramps" },
            { value: "46", label: "States" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { name: "Oklahoma", href: "/oklahoma", count: okCount, suffix: "+", lakes: `Grand Lake, Tenkiller, Eufaula, Keystone, and ${lakes.length - 4}+ more` },
            { name: "Texas", href: "/texas", count: txCount, suffix: "", lakes: `Lake Fork, Sam Rayburn, Lake Travis, Texoma, and ${texasLakes.length - 4}+ more` },
            { name: "Missouri", href: "/missouri", count: moCount, suffix: "", lakes: `Lake of the Ozarks, Table Rock, Stockton, Truman, and ${missouriLakes.length - 4}+ more` },
            { name: "Arkansas", href: "/arkansas", count: arCount, suffix: "", lakes: `Beaver Lake, Bull Shoals, Greers Ferry, Ouachita, and ${arkansasLakes.length - 4}+ more` },
            { name: "Kansas", href: "/kansas", count: ksCount, suffix: "", lakes: `Milford, Tuttle Creek, Clinton, Perry, Cheney, and ${kansasLakes.length - 5}+ more` },
          ].map((s) => (
            <Link key={s.name} href={s.href} className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-[Cabin] text-xl font-bold text-charcoal group-hover:text-water transition">{s.name}</h3>
                <span className="text-xs font-bold text-water bg-water/10 px-2.5 py-1 rounded-full">{s.count}{s.suffix} ramps</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">{s.lakes}</p>
              <span className="text-sm font-semibold text-water group-hover:text-water-light transition">Explore {s.name} &rarr;</span>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p className="font-[Cabin] font-bold text-charcoal text-sm mb-3">Coming Soon</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { state: "Louisiana", count: 458 },
              { state: "Colorado", count: 321 },
              { state: "Florida", count: 1411 },
              { state: "Michigan", count: 3411 },
            ].map((s) => (
              <div key={s.state} className="bg-white border border-gray-200 rounded-lg p-2.5 text-center opacity-60">
                <p className="font-bold text-charcoal text-sm">{s.state}</p>
                <p className="text-gray-400 text-xs">{s.count.toLocaleString()}</p>
              </div>
            ))}
          </div>
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
            { "@type": "Question", name: "How many boat ramps does RampSeeker cover?", acceptedAnswer: { "@type": "Answer", text: `We have data on 29,000+ boat ramps across 46 states, with detailed coverage currently live for Oklahoma (${okCount}+ ramps) and Texas (${txCount} ramps). More states are being added.` } },
            { "@type": "Question", name: "Is RampSeeker free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No login, no account, no fees. Just find your ramp and go." } },
            { "@type": "Question", name: "How do I find a boat ramp near me?", acceptedAnswer: { "@type": "Answer", text: "Use the search bar to search by state, lake, city, or ramp name. Or browse by state — currently Oklahoma and Texas are live with full coverage." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps does RampSeeker cover?", a: `We have data on 29,000+ boat ramps across 46 states, with detailed coverage currently live for Oklahoma (${okCount}+ ramps) and Texas (${txCount} ramps). More states coming soon.` },
            { q: "Is RampSeeker free?", a: "Yes, completely free. No login, no account needed. Just find your ramp and go." },
            { q: "How do I find a boat ramp near me?", a: "Use the search bar or browse by state. Currently Oklahoma and Texas are live with full coverage." },
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
