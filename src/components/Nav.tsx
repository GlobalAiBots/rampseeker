"use client";

import Link from "next/link";
import { useState } from "react";
import StatesDropdown from "./StatesDropdown";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const SearchIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-[Cabin]">
          <span className="text-2xl">&#9875;</span>
          <span className="text-charcoal">Ramp<span className="text-water">Seeker</span></span>
        </Link>

        {/* Desktop primary links (md and above) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <StatesDropdown />
          <Link href="/map" className="text-gray-500 hover:text-water transition">Map</Link>
          <Link href="/compare" className="text-gray-500 hover:text-water transition">Compare</Link>
          <Link href="/blog" className="text-gray-500 hover:text-water transition">Blog</Link>
          <Link href="/about" className="text-gray-500 hover:text-water transition">About</Link>
        </div>

        {/* Desktop right cluster: search + CTA */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/search" aria-label="Search" className="text-gray-500 hover:text-water transition">
            {SearchIcon}
          </Link>
          <Link href="/for-businesses" className="text-sunset font-bold hover:text-sunset-dark transition">
            For Businesses
          </Link>
        </div>

        {/* Mobile hamburger (below md) */}
        <button
          className="md:hidden text-charcoal text-2xl leading-none px-3 py-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="ramp-mobile-drawer"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer scrim (dims + collapses page content underneath, tap-to-close) */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          className="md:hidden fixed inset-x-0 top-14 bottom-0 bg-black/40 z-40 cursor-default"
          onClick={close}
        />
      )}

      {/* Mobile drawer (below md) */}
      {open && (
        <div
          id="ramp-mobile-drawer"
          className="md:hidden absolute left-0 right-0 top-14 bg-white border-b border-gray-200 shadow-xl z-50"
        >
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col text-sm font-medium">
            <div className="py-3 border-b border-gray-100">
              <StatesDropdown />
            </div>
            <Link href="/map" onClick={close} className="block text-charcoal hover:text-water transition py-3 border-b border-gray-100">Map</Link>
            <Link href="/compare" onClick={close} className="block text-charcoal hover:text-water transition py-3 border-b border-gray-100">Compare</Link>
            <Link href="/blog" onClick={close} className="block text-charcoal hover:text-water transition py-3 border-b border-gray-100">Blog</Link>
            <Link href="/about" onClick={close} className="block text-charcoal hover:text-water transition py-3 border-b border-gray-100">About</Link>
            <Link href="/search" onClick={close} aria-label="Search" className="flex items-center gap-2 text-charcoal hover:text-water transition py-3 border-b border-gray-100">
              {SearchIcon}
              <span>Search</span>
            </Link>
            <Link href="/for-businesses" onClick={close} className="block bg-sunset hover:bg-sunset-dark text-white font-bold transition py-3 mt-3 mb-1 text-center rounded-lg">
              For Businesses
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
