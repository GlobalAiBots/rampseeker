import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RampSeeker Blog — Oklahoma Boating Tips & Lake Guides",
  description: "Boating tips, fishing guides, and lake information for Oklahoma anglers and boaters. From the team behind the state's most complete boat ramp directory.",
  openGraph: { title: "RampSeeker Blog", url: "https://rampseeker.com/blog", siteName: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/blog" },
};

const posts = [
  { slug: "best-bass-fishing-lakes-oklahoma", title: "The 7 Best Bass Fishing Lakes in Oklahoma (2026 Guide)", date: "April 1, 2026", excerpt: "From Grand Lake to Broken Bow — the top Oklahoma lakes for largemouth, smallmouth, and spotted bass, with the best ramps to launch from." },
  { slug: "oklahoma-boating-rules-2026", title: "Oklahoma Boating Rules & Regulations You Need to Know (2026)", date: "March 28, 2026", excerpt: "Registration requirements, safety equipment, BUI laws, GRDA rules, no-wake zones, and everything else Oklahoma boaters need to know." },
  { slug: "how-to-launch-boat-beginner-guide", title: "How to Launch a Boat: Complete Beginner's Guide for Oklahoma Ramps", date: "March 25, 2026", excerpt: "Step-by-step guide to backing down the ramp, loading your boat, and not being THAT person who holds up the line." },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Boating tips, fishing guides, and lake information for Oklahoma.</p>
      <div className="space-y-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
            <p className="text-gray-400 text-xs mb-1">{p.date}</p>
            <h2 className="font-[Cabin] text-xl font-bold text-charcoal group-hover:text-water transition mb-2">{p.title}</h2>
            <p className="text-gray-500 text-sm">{p.excerpt}</p>
            <span className="text-sunset font-semibold text-sm mt-3 inline-block">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
