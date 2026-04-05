import Link from "next/link";
import { type UnifiedRamp, amenityLabels, isGenericName, sortRamps } from "@/data/all-ramps";

export default function LakeRampList({ ramps, stateName }: { ramps: UnifiedRamp[]; stateName: string }) {
  const sorted = sortRamps(ramps);

  const enriched = sorted.filter((r) => r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length) || r.featured);
  const named = sorted.filter((r) => !isGenericName(r.name) && !(r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length) || r.featured));
  const generic = sorted.filter((r) => isGenericName(r.name) && !(r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length)));

  return (
    <>
      {/* Tier 1: Enriched ramps */}
      {enriched.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {enriched.map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
              <p className="text-gray-500 text-sm">
                {r.city || stateName}
                {r.rating > 0 && <span> &middot; {r.rating}/5</span>}
              </p>
              {r.amenities && r.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {r.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                  ))}
                </div>
              )}
              <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
            </Link>
          ))}
        </div>
      )}

      {/* Tier 2: Named ramps */}
      {named.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {named.map((r) => (
            <Link key={r.id} href={`/ramps/${r.id}`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-water shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
              <p className="text-gray-500 text-sm">{r.city || stateName}</p>
              <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
            </Link>
          ))}
        </div>
      )}

      {/* Tier 3: Generic ramps — compact */}
      {generic.length > 0 && (
        <>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Additional Launch Sites</p>
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 mb-4">
            {generic.map((r) => (
              <Link key={r.id} href={`/ramps/${r.id}`} className="flex items-center justify-between px-4 py-2.5 hover:bg-water/5 transition group">
                <div>
                  <span className="text-sm text-charcoal group-hover:text-water transition">{r.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}</span>
                </div>
                <span className="text-xs font-semibold text-sunset">Details &rarr;</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {ramps.length === 0 && <p className="text-gray-400 col-span-3">No ramps found yet.</p>}
    </>
  );
}
