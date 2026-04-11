"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NearMeButton({ label = "Find Ramps Near Me", color = "#E67E22" }: { label?: string; color?: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleClick() {
    if (!navigator.geolocation) { alert("Geolocation is not supported by your browser"); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { router.push(`/near-me?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`); },
      () => { alert("Unable to get your location. Please allow location access."); setLoading(false); }
    );
  }

  return (
    <button onClick={handleClick} disabled={loading} className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition text-sm hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: color }}>
      {"\u{1F4CD}"} {loading ? "Finding..." : label}
    </button>
  );
}
