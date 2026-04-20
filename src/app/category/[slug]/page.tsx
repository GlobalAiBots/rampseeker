"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";

interface CatState { code: string; name: string; slug: string; count: number; }
interface Category { slug: string; title: string; description: string; totalCount: number; states: CatState[]; }
const categories = categoriesData as Category[];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = useMemo(() => categories.find(c => c.slug === slug), [slug]);

  if (!category) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-4">Category Not Found</h1><Link href="/" className="text-water hover:underline">Back to Home</Link></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" }, { "@type": "ListItem", position: 2, name: category.title, item: `https://www.rampseeker.com/category/${slug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: `How many ${category.title.toLowerCase()} are in America?`, acceptedAnswer: { "@type": "Answer", text: `RampSeeker lists ${category.totalCount.toLocaleString()} ${category.title.toLowerCase()} across ${category.states.length} states.` } },
        { "@type": "Question", name: `How do I find ${category.title.toLowerCase()} near me?`, acceptedAnswer: { "@type": "Answer", text: `Browse RampSeeker by state to find ${category.title.toLowerCase()} in your area with GPS coordinates, maps, and amenity details.` } },
        { "@type": "Question", name: `Are ${category.title.toLowerCase()} open year-round?`, acceptedAnswer: { "@type": "Answer", text: `Most ${category.title.toLowerCase()} are open year-round, but some may close seasonally due to weather or water levels. Check individual listings for current status.` } },
      ] }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <span className="text-charcoal font-medium">{category.title}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{category.title} in America</h1>
      <p className="text-gray-500 mb-2">{category.totalCount.toLocaleString()} ramps across {category.states.length} states</p>
      <p className="text-gray-400 text-sm mb-8">{category.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {category.states.map(st => (
          <Link key={st.code} href={`/${st.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition">
            <p className="font-bold text-charcoal text-sm group-hover:text-water transition">{st.name}</p>
            <p className="text-gray-400 text-xs">{st.count.toLocaleString()} ramps</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
