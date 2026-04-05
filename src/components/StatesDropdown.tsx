"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const states = [
  { name: "Oklahoma", href: "/oklahoma" },
  { name: "Texas", href: "/texas" },
  { name: "Missouri", href: "/missouri" },
  { name: "Arkansas", href: "/arkansas" },
  { name: "Kansas", href: "/kansas" },
  { name: "Florida", href: "/florida" },
  { name: "Michigan", href: "/michigan" },
  { name: "Minnesota", href: "/minnesota" },
  { name: "North Carolina", href: "/north-carolina" },
  { name: "New York", href: "/new-york" },
  { name: "Illinois", href: "/illinois" },
  { name: "Ohio", href: "/ohio" },
];

export default function StatesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="text-gray-500 hover:text-water transition flex items-center gap-1 text-sm font-medium">
        States
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 w-36">
          {states.map((s) => (
            <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-water/5 hover:text-water transition">
              {s.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
