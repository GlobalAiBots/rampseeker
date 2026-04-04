import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RampSeeker Blog — Boating Tips & Lake Guides for Oklahoma, Texas & More",
  description: "Boating tips, fishing guides, lake information, and boat ramp advice for anglers across Oklahoma, Texas, Missouri, Arkansas, and Kansas.",
  openGraph: { title: "RampSeeker Blog", url: "https://rampseeker.com/blog", siteName: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/blog" },
};

const posts = [
  {
    slug: "best-bass-fishing-lakes-oklahoma",
    title: "The 7 Best Bass Fishing Lakes in Oklahoma (2026 Guide)",
    date: "April 1, 2026",
    readTime: "5 min read",
    category: "Fishing",
    excerpt: "From Grand Lake to Broken Bow — the top Oklahoma lakes for largemouth, smallmouth, and spotted bass, with the best ramps to launch from.",
    gradient: "linear-gradient(135deg, #1E6091 0%, #2D6A4F 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 35c5-8 15-15 25-10s15 5 25-2" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M40 20c3 0 8 3 12 2s6-3 8-2c0 0-2 8-10 8s-10-4-14-3-6 5-6 5" fill="rgba(255,255,255,0.15)"/><ellipse cx="38" cy="22" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.4)"/></svg>`,
  },
  {
    slug: "oklahoma-boating-rules-2026",
    title: "Oklahoma Boating Rules & Regulations You Need to Know (2026)",
    date: "March 28, 2026",
    readTime: "6 min read",
    category: "Regulations",
    excerpt: "Registration requirements, safety equipment, BUI laws, GRDA rules, no-wake zones, and everything else Oklahoma boaters need to know.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="28" y="12" width="24" height="30" rx="3" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M36 24l4 4 8-8" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "how-to-launch-boat-beginner-guide",
    title: "How to Launch a Boat: Complete Beginner's Guide for Oklahoma Ramps",
    date: "March 25, 2026",
    readTime: "7 min read",
    category: "Beginner Guide",
    excerpt: "Step-by-step guide to backing down the ramp, loading your boat, and not being THAT person who holds up the line.",
    gradient: "linear-gradient(135deg, #0D9488 0%, #1E6091 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 15l15 30h-30z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><path d="M40 45h25" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M55 40l5 5-5 5" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Boating tips, fishing guides, and lake information across Oklahoma, Texas, and beyond.</p>
      <div className="space-y-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            {/* Thumbnail */}
            <div className="sm:w-48 h-36 sm:h-auto flex-shrink-0 flex items-center justify-center relative" style={{ background: p.gradient }}>
              <div className="w-20 h-16" dangerouslySetInnerHTML={{ __html: p.icon }} />
            </div>
            {/* Content */}
            <div className="p-5 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{p.category}</span>
                <span className="text-gray-400 text-xs">{p.date} &middot; {p.readTime}</span>
              </div>
              <h2 className="font-[Cabin] text-lg font-bold text-charcoal group-hover:text-water transition mb-2 line-clamp-2">{p.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">{p.excerpt}</p>
              <span className="text-sunset font-semibold text-sm">Read more &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
