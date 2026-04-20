import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparisonBySlug, type ComparisonPage } from "@/data/comparisons";
import type { Metadata } from "next";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) return { title: "Comparison Not Found" };
  return {
    title: cmp.metaTitle,
    description: cmp.metaDescription,
    alternates: { canonical: `https://rampseeker.com/compare/${cmp.slug}` },
    openGraph: { title: cmp.metaTitle, description: cmp.metaDescription, url: `https://rampseeker.com/compare/${cmp.slug}`, siteName: "RampSeeker", type: "article" },
  };
}

const AFFILIATE_TAG = "babymydog03-20";
const amazonLink = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;

function ProductCard({ product, label, isWinner }: { product: ComparisonPage["productA"]; label: string; isWinner: boolean }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden ${isWinner ? 'ring-2 ring-water' : 'border border-gray-200'} shadow-sm`}>
      <div className={`px-6 py-3 text-white text-xs font-bold uppercase tracking-widest ${isWinner ? 'bg-water' : 'bg-gray-500'}`}>
        {label} {isWinner && " · Our Pick"}
      </div>
      <div className="p-6">
        <h3 className="font-[Cabin] font-bold text-charcoal text-xl mb-2">{product.name}</h3>
        <p className="font-extrabold text-water text-xl mb-4">{product.price}</p>
        <p className="text-gray-600 text-sm italic mb-4">{product.bestFor}</p>

        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-forest mb-2">Pros</p>
          <ul className="space-y-1.5">
            {product.pros.map((p, i) => (
              <li key={i} className="text-charcoal text-sm flex items-start gap-2">
                <span className="text-forest font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-sunset mb-2">Cons</p>
          <ul className="space-y-1.5">
            {product.cons.map((c, i) => (
              <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                <span className="text-sunset font-bold flex-shrink-0 mt-0.5">&#8722;</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {product.searchQuery && (
          <a href={amazonLink(product.searchQuery)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block text-white font-bold text-center text-base px-6 py-3 rounded-lg transition-all hover:shadow-md bg-water hover:bg-water-deep">
            &#9733; View on Amazon
          </a>
        )}
      </div>
    </div>
  );
}

const LAKE_SLUGS: Record<string, { slug: string; name: string }> = {
  "lake-fork": { slug: "lake-fork-texas", name: "Lake Fork" },
  "lake-fork-texas": { slug: "lake-fork-texas", name: "Lake Fork" },
  "grand-lake": { slug: "grand-lake", name: "Grand Lake" },
  "lake-okeechobee": { slug: "lake-okeechobee-florida", name: "Lake Okeechobee" },
  "lake-okeechobee-florida": { slug: "lake-okeechobee-florida", name: "Lake Okeechobee" },
  "lake-guntersville": { slug: "lake-guntersville", name: "Lake Guntersville" },
  "toledo-bend": { slug: "toledo-bend-texas-louisiana", name: "Toledo Bend" },
  "toledo-bend-texas-louisiana": { slug: "toledo-bend-texas-louisiana", name: "Toledo Bend" },
  "sam-rayburn": { slug: "sam-rayburn", name: "Sam Rayburn" },
  "table-rock": { slug: "table-rock-lake-missouri", name: "Table Rock Lake" },
  "table-rock-lake-missouri": { slug: "table-rock-lake-missouri", name: "Table Rock Lake" },
  "lake-erie-ohio": { slug: "lake-erie-ohio", name: "Lake Erie" },
  "kentucky-lake-tennessee": { slug: "kentucky-lake-tennessee", name: "Kentucky Lake" },
};
const STATE_NAMES: Record<string, string> = {
  "florida": "Florida", "california": "California", "texas": "Texas", "north-carolina": "North Carolina",
  "south-carolina": "South Carolina", "georgia": "Georgia", "alabama": "Alabama", "virginia": "Virginia",
  "michigan": "Michigan", "minnesota": "Minnesota", "wisconsin": "Wisconsin", "ohio": "Ohio",
  "new-jersey": "New Jersey", "new-york": "New York", "oregon": "Oregon", "washington": "Washington",
  "oklahoma": "Oklahoma", "missouri": "Missouri", "louisiana": "Louisiana", "tennessee": "Tennessee",
};
const BLOG_TITLES: Record<string, string> = {
  "boat-ramp-etiquette": "Boat Ramp Etiquette",
  "how-to-back-trailer": "How to Back a Boat Trailer",
  "best-bass-lakes-america": "25 Best Bass Fishing Lakes in America",
  "how-to-launch-a-boat-safely": "How to Launch a Boat Safely",
  "how-to-launch-boat-beginner-guide": "Boat Launching Beginner Guide",
  "boat-trailer-maintenance-checklist": "Boat Trailer Maintenance Checklist",
  "boat-trailer-tire-guide": "Boat Trailer Tire Guide",
  "winterize-your-boat": "Winterize Your Boat",
  "spring-boat-prep": "Spring Boat Prep Checklist",
  "best-lakes-for-boating-by-state": "Best Lakes for Boating by State",
  "best-boat-ramps-for-kayaks": "Best Boat Ramps for Kayaks",
  "kayak-launch-sites": "Kayak Launch Sites",
  "free-boat-ramps-how-to-find-them": "How to Find Free Boat Ramps",
  "night-launching-tips": "Night Launching Tips",
  "must-have-boat-trip-items": "Must-Have Boat Trip Items",
};

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://rampseeker.com/compare" },
      { "@type": "ListItem", position: 3, name: cmp.title, item: `https://rampseeker.com/compare/${cmp.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cmp.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cmp.title,
    description: cmp.metaDescription,
    datePublished: "2026-04-19",
    author: { "@type": "Organization", name: "RampSeeker" },
    publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" },
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, breadcrumbLd, faqLd]) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
          <Link href="/compare" className="hover:text-water transition">Compare</Link><span>/</span>
          <span className="text-charcoal font-medium">{cmp.subject}</span>
        </nav>

        <Link href="/compare" className="inline-flex items-center gap-1 text-sm text-water font-semibold hover:underline mb-6">
          &larr; All Comparisons
        </Link>

        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">{cmp.title}</h1>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-6">Last Updated: April 2026</p>

        <div className="text-gray-700 leading-relaxed space-y-4 mb-10 text-lg max-w-3xl">
          {cmp.intro.split(/\n\n+/).map((p, i) => <p key={i}>{p.trim()}</p>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <ProductCard product={cmp.productA} label={cmp.productA.name} isWinner={cmp.verdictWinner === "a" || cmp.verdictWinner === "both"} />
          <ProductCard product={cmp.productB} label={cmp.productB.name} isWinner={cmp.verdictWinner === "b" || cmp.verdictWinner === "both"} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-12 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-charcoal mb-4">Side-by-Side</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 text-gray-400 font-medium uppercase tracking-wider text-xs">Attribute</th>
                    <th className="text-left py-3 px-4 text-charcoal font-bold">{cmp.productA.name}</th>
                    <th className="text-left py-3 px-4 text-charcoal font-bold">{cmp.productB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {cmp.comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-semibold text-gray-500">{row.attribute}</td>
                      <td className={`py-3 px-4 ${row.winner === "a" ? 'font-bold text-forest' : 'text-gray-700'}`}>
                        {row.winner === "a" && "\u2713 "}{row.a}
                      </td>
                      <td className={`py-3 px-4 ${row.winner === "b" ? 'font-bold text-forest' : 'text-gray-700'}`}>
                        {row.winner === "b" && "\u2713 "}{row.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <article className="prose prose-gray max-w-none mb-12">
          <div className="text-charcoal leading-relaxed space-y-5">
            {cmp.body.split(/\n\n+/).map((block, i) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("## ")) {
                return <h2 key={i} className="font-[Cabin] text-2xl font-bold text-charcoal mt-8 mb-3">{trimmed.slice(3)}</h2>;
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*([^*]+)\*\*/g, "<strong class='text-charcoal'>$1</strong>") }} />
              );
            })}
          </div>
        </article>

        <section className="mb-12 rounded-2xl p-6 md:p-8 border-2 border-water/30 bg-water/5">
          <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-charcoal mb-3 flex items-center gap-2">
            <span className="text-sunset">&#127942;</span> Our Verdict
          </h2>
          <p className="text-charcoal leading-relaxed text-base md:text-lg">{cmp.verdict}</p>
        </section>

        <section className="mb-12">
          <h2 className="font-[Cabin] text-xl md:text-2xl font-bold text-charcoal mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {cmp.faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-charcoal hover:text-water transition list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-water ml-2 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {cmp.relatedLakes && cmp.relatedLakes.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-water mb-3">Related Lakes</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedLakes.map((s) => {
                  const lake = LAKE_SLUGS[s];
                  if (!lake) return null;
                  return (
                    <Link key={s} href={`/lakes/${lake.slug}`} className="inline-flex items-center gap-1 bg-water/10 hover:bg-water/20 text-water text-xs font-semibold px-3 py-1.5 rounded-full transition">
                      {lake.name} &rarr;
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {cmp.relatedStates && cmp.relatedStates.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-sunset mb-3">Top States</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedStates.map((s) => (
                  <Link key={s} href={`/${s}`} className="inline-flex items-center gap-1 bg-sunset/10 hover:bg-sunset/20 text-sunset text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {STATE_NAMES[s] || s} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
          {cmp.relatedBlog && cmp.relatedBlog.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Related Reading</p>
              <div className="flex flex-wrap gap-2">
                {cmp.relatedBlog.map((s) => (
                  <Link key={s} href={`/blog/${s}`} className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full transition">
                    {BLOG_TITLES[s] || s} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">More Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {comparisons.filter((c) => c.slug !== cmp.slug).slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="block p-4 rounded-xl border border-gray-200 hover:border-water hover:bg-water/5 transition">
                <p className="font-bold text-charcoal text-sm">{c.title}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{c.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-gray-400 italic text-center mt-8">
          As an Amazon Associate we earn from qualifying purchases. Prices and specs are approximate — always confirm with your dealer.
        </p>
      </div>
    </div>
  );
}
