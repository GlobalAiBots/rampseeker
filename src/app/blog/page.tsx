import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RampSeeker Blog — Boating Tips & Lake Guides for Oklahoma, Texas & More",
  description: "Boating tips, fishing guides, lake information, and boat ramp advice for anglers across Oklahoma, Texas, Missouri, Arkansas, and Kansas.",
  openGraph: { title: "RampSeeker Blog", url: "https://www.rampseeker.com/blog", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "RampSeeker Blog" },
  alternates: { canonical: "https://www.rampseeker.com/blog" },
};

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Boating tips, fishing guides, and lake information across Oklahoma, Texas, and beyond.</p>
      <div className="space-y-6">
        {blogPosts.map((p) => (
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
