import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">&#9875;</p>
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-3">Ramp Not Found</h1>
      <p className="text-gray-500 mb-8">We couldn&apos;t find that page — but we&apos;ve got 261+ boat ramps waiting for you.</p>
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link href="/" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Search All Ramps</Link>
        <Link href="/lakes" className="border-2 border-water text-water hover:bg-water hover:text-white font-bold px-6 py-3 rounded-lg transition">Browse by Lake</Link>
      </div>
      <div className="text-left max-w-md mx-auto">
        <h2 className="font-[Cabin] font-bold text-charcoal mb-3">Popular Lakes</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Grand Lake", href: "/grand-lake" },
            { name: "Lake Tenkiller", href: "/lakes/lake-tenkiller" },
            { name: "Lake Eufaula", href: "/lakes/lake-eufaula" },
            { name: "Keystone Lake", href: "/lakes/keystone-lake" },
            { name: "Lake Texoma", href: "/lakes/lake-texoma" },
            { name: "Broken Bow Lake", href: "/lakes/broken-bow-lake" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-charcoal hover:text-water hover:border-water transition">
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
