"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-ramps";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function NearMePage({ searchParams }: { searchParams: Promise<{ lat?: string; lng?: string }> }) {
  const params = use(searchParams);
  const lat = parseFloat(params.lat || "0");
  const lng = parseFloat(params.lng || "0");

  const nearby = useMemo(() => {
    if (!lat || !lng) return [];
    return unified
      .map(r => ({ ...r, distance: haversine(lat, lng, r.latitude, r.longitude) }))
      .filter(r => r.distance <= 50)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);
  }, [lat, lng]);

  if (!lat || !lng) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-4">Location Required</h1>
        <p className="text-gray-500 mb-8">We need your location to find nearby boat ramps. Use the &quot;Find Near Me&quot; button on the homepage.</p>
        <Link href="/" className="bg-sunset text-white font-bold px-6 py-3 rounded-lg transition inline-block">Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <span className="text-charcoal font-medium">Near Me</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-2">Boat Ramps Near You</h1>
      <p className="text-gray-500 mb-8">{nearby.length} boat ramps within 50 miles of your location</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nearby.map(r => (
          <Link key={r.id} href={`/ramps/${r.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{r.city}, {r.state}</p>
            <p className="text-sunset text-sm font-semibold mt-2">{r.distance.toFixed(1)} miles away</p>
          </Link>
        ))}
      </div>

      {nearby.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No boat ramps found within 50 miles.</p>
          <Link href="/" className="text-water hover:underline mt-4 inline-block">Browse all ramps by state</Link>
        </div>
      )}
    </div>
  );
}
