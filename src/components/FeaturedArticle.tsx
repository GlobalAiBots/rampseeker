import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

function seededIndex(slug: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

export default function FeaturedArticle({ listingSlug }: { listingSlug: string }) {
  if (blogPosts.length === 0) return null;
  const idx1 = seededIndex(listingSlug, blogPosts.length);
  const idx2 = seededIndex(listingSlug + "_2", blogPosts.length);
  const picks = [blogPosts[idx1]];
  if (idx2 !== idx1 && blogPosts.length > 1) picks.push(blogPosts[idx2]);

  return (
    <section className="my-8">
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Boating Tips &amp; Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {picks.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{p.category}</span>
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition mt-2 text-sm leading-snug">{p.title}</h3>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">{(p.excerpt || "").substring(0, 120)}{(p.excerpt || "").length > 120 ? "..." : ""}</p>
            <span className="text-water text-xs font-semibold mt-2 inline-block">Read More &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
