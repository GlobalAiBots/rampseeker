"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels } from "@/data/all-ramps";
import { lakes, getLakeForRamp } from "@/data/lakes";
import { cities } from "@/data/cities";
import { counties } from "@/data/counties";

const amenityKeys = ["restrooms", "courtesy-dock", "lighting", "fuel-nearby", "parking", "picnic-area"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [lakeFilter, setLakeFilter] = useState("");
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Compute lake ramp counts once
  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of lakes) {
      map[l.id] = l.id === "grand-lake"
        ? unified.filter((r) => r.featured).length
        : unified.filter((r) => getLakeForRamp(r.latitude, r.longitude)?.id === l.id).length;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    return unified.filter((r) => {
      // Text search — matches name, city, lake name
      if (query.length > 1) {
        const q = query.toLowerCase();
        const lake = getLakeForRamp(r.latitude, r.longitude);
        const haystack = `${r.name} ${r.city} ${lake?.name || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Lake filter
      if (lakeFilter) {
        const lake = getLakeForRamp(r.latitude, r.longitude);
        if (lakeFilter === "grand-lake") { if (!r.featured) return false; }
        else if (!lake || lake.id !== lakeFilter) return false;
      }
      // Amenity filter
      if (amenityFilter.length > 0) {
        const gl = r.grandLakeData;
        if (!gl) return false;
        if (!amenityFilter.every((a) => gl.amenities.includes(a))) return false;
      }
      return true;
    });
  }, [query, lakeFilter, amenityFilter]);

  const displayRamps = showAll ? filtered : filtered.slice(0, 36);
  const isFiltering = query.length > 1 || lakeFilter || amenityFilter.length > 0;

  // Autocomplete suggestions for search
  const searchSuggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    // Lakes
    lakes.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 3).forEach((l) => {
      results.push({ type: "Lake", label: l.name, href: l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}` });
    });
    // Cities
    cities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4).forEach((c) => {
      results.push({ type: "City", label: `${c.name}, OK`, href: `/find/${c.slug}` });
    });
    return results;
  }, [query]);

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "RampSeeker", url: "https://rampseeker.com",
        description: `The most complete boat ramp directory for Oklahoma. ${unified.length}+ ramps across ${lakes.length} lakes.`,
        potentialAction: { "@type": "SearchAction", target: "https://rampseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com",
        description: "The most complete boat ramp directory in Oklahoma.",
        sameAs: [], contactPoint: { "@type": "ContactPoint", email: "hello@rampseeker.com", contactType: "customer service" },
      }) }} />

      {/* Hero */}
      <section className="relative py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Oklahoma Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          Every Boat Ramp in Oklahoma
        </h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
          {unified.length}+ boat ramps across {lakes.length} lakes. GPS coordinates, amenities, local tips.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8">
          <div className="relative">
            <input type="text" value={query} onChange={(e) => { setQuery(e.target.value); setShowAll(false); }}
              placeholder="Search by lake, city, or ramp name..."
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-200 text-charcoal outline-none focus:border-water focus:ring-2 focus:ring-water/20 transition shadow-md text-sm font-['Source_Sans_3']" />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            {/* Autocomplete dropdown */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                {searchSuggestions.map((s, i) => (
                  <Link key={i} href={s.href} className="flex items-center gap-3 px-4 py-3 hover:bg-water/5 transition border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                    <span className="text-sm text-charcoal">{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <select value={lakeFilter} onChange={(e) => { setLakeFilter(e.target.value); setShowAll(false); }}
              className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-charcoal outline-none focus:border-water transition cursor-pointer">
              <option value="">All Lakes</option>
              {lakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
                <option key={l.id} value={l.id}>{l.name} ({lakeCounts[l.id] || 0})</option>
              ))}
            </select>
            {amenityKeys.slice(0, 4).map((a) => {
              const active = amenityFilter.includes(a);
              return (
                <button key={a} onClick={() => { setAmenityFilter(active ? amenityFilter.filter((x) => x !== a) : [...amenityFilter, a]); setShowAll(false); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${active ? "bg-forest/10 text-forest border border-forest/30" : "bg-white text-gray-500 border border-gray-200 hover:border-water hover:text-water"}`}>
                  {amenityLabels[a]?.icon} <span className="hidden sm:inline">{amenityLabels[a]?.label}</span>
                </button>
              );
            })}
          </div>
          {isFiltering && <p className="text-gray-400 text-sm mt-3">{filtered.length} ramp{filtered.length !== 1 ? "s" : ""} found</p>}
        </div>
      </section>

      {/* If filtering, show results immediately */}
      {isFiltering ? (
        <section className="max-w-6xl mx-auto px-4 py-10">
          {lakeFilter && (() => {
            const lake = lakes.find((l) => l.id === lakeFilter);
            return lake ? (
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[Cabin] text-xl font-bold text-charcoal">{lake.name}</h2>
                <Link href={lake.id === "grand-lake" ? "/grand-lake" : `/lakes/${lake.id}`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition">Full {lake.name} page &rarr;</Link>
              </div>
            ) : null;
          })()}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayRamps.map((r) => {
              const gl = r.grandLakeData;
              const lake = getLakeForRamp(r.latitude, r.longitude);
              return (
                <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                    {r.featured && <span className="text-[10px] font-bold text-sunset bg-sunset/10 px-1.5 py-0.5 rounded-full">Detailed</span>}
                  </div>
                  <p className="text-gray-500 text-sm">{r.city}, OK{lake && !lakeFilter ? ` \u00b7 ${lake.name}` : ""}{gl ? ` \u00b7 ${gl.fee === "free" ? "Free" : gl.fee}` : ""}</p>
                  {gl && gl.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {gl.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                      ))}
                    </div>
                  )}
                  {r.rating > 0 && (
                    <div className="flex items-center gap-0.5 mt-2">
                      {[1,2,3,4,5].map((s) => <span key={s} className={s <= r.rating ? "text-yellow-500" : "text-gray-200"} style={{ fontSize: 13 }}>&#9733;</span>)}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
                </Link>
              );
            })}
          </div>
          {!showAll && filtered.length > 36 && (
            <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">
              Show all {filtered.length} ramps
            </button>
          )}
        </section>
      ) : (
        <>
          {/* Browse by Lake */}
          <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[Cabin] text-2xl font-bold text-charcoal">Browse by Lake</h2>
              <Link href="/lakes" className="text-sm font-semibold text-sunset hover:text-sunset-dark transition">All {lakes.length} lakes &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lakes.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).slice(0, 12).map((l) => (
                <Link key={l.id} href={l.id === "grand-lake" ? "/grand-lake" : `/lakes/${l.id}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
                  <div className="flex items-start justify-between">
                    <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3>
                    <span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    <span>{l.acres.toLocaleString()} acres</span>
                    <span>{l.shorelineMiles} mi shoreline</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {l.fishSpecies.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] bg-forest/10 text-forest px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by County */}
          <section className="max-w-6xl mx-auto px-4 pb-8">
            <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by County</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {counties.slice(0, 12).map((c) => (
                <Link key={c.slug} href={`/counties/${c.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition">
                  <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{c.name} County</p>
                  <p className="text-gray-400 text-xs">{c.ramps.length} ramp{c.ramps.length !== 1 ? "s" : ""}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by City */}
          <section className="max-w-6xl mx-auto px-4 pb-8">
            <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {cities.filter((c) => c.ramps.length >= 2).slice(0, 12).map((c) => (
                <Link key={c.slug} href={`/cities/${c.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition">
                  <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{c.name}</p>
                  <p className="text-gray-400 text-xs">{c.ramps.length} ramp{c.ramps.length !== 1 ? "s" : ""}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* All Ramps */}
          <section className="max-w-6xl mx-auto px-4 pt-4 pb-8">
            <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All {unified.length} Oklahoma Boat Ramps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {unified.slice(0, showAll ? undefined : 30).map((r) => (
                <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-lg p-3 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between">
                    <span className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm">{r.name}</span>
                    {r.featured && <span className="text-[10px] font-bold text-sunset bg-sunset/10 px-1.5 py-0.5 rounded-full">Detailed</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{r.city}, OK</p>
                </Link>
              ))}
            </div>
            {!showAll && unified.length > 30 && (
              <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-water hover:bg-water/5 transition">
                Show all {unified.length} ramps
              </button>
            )}
          </section>
        </>
      )}

      {/* About Oklahoma */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Boating in Oklahoma</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Oklahoma has over 200 lakes and more than 1 million surface acres of water — more man-made lake shoreline than any other state.</p>
            <p>RampSeeker covers {unified.length}+ boat ramps across {lakes.length} major lakes, from Grand Lake and Tenkiller in the east to Fort Cobb and Foss in the west.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How many boat ramps are in Oklahoma?", acceptedAnswer: { "@type": "Answer", text: `RampSeeker lists ${unified.length}+ boat ramps across ${lakes.length} lakes in Oklahoma.` } },
            { "@type": "Question", name: "Are Oklahoma boat ramps free?", acceptedAnswer: { "@type": "Answer", text: "Most public boat ramps in Oklahoma are free. Some marina ramps may charge a fee." } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in Oklahoma?", a: `RampSeeker lists ${unified.length}+ boat ramps across ${lakes.length} major lakes in Oklahoma, with more being added regularly.` },
            { q: "Are Oklahoma boat ramps free?", a: "Most public boat ramps in Oklahoma are free, including state park and city-operated ramps. Some marina ramps may charge a fee." },
            { q: "What is the best boat ramp in Oklahoma?", a: "Wolf Creek Park on Grand Lake in Grove is one of the most popular, with 6 concrete ramps and parking for 400+ vehicles. But the best ramp depends on which lake you're fishing." },
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

      {/* Submit */}
      <section id="submit" className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-2">Know a ramp we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete ramp directory in Oklahoma.</p>
          <a href="mailto:hello@rampseeker.com?subject=New%20Ramp%20Submission" className="bg-sunset hover:bg-sunset-dark text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Ramp</a>
        </div>
      </section>
    </div>
  );
}
