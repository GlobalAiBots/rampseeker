"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const lines: string[] = [];
    fd.forEach((v, k) => lines.push(k + ": " + v));
    window.location.href = "mailto:admin@globalaibots.com?subject=" + encodeURIComponent("New Boat Ramp Submission — RampSeeker") + "&body=" + encodeURIComponent(lines.join("\n"));
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">{"\u2705"}</p>
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-3">Thanks for Your Submission!</h1>
      <p className="text-gray-500 mb-8">We&apos;ll review and add it to RampSeeker within a few days.</p>
      <Link href="/" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition inline-block">Back to Home</Link>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2"><Link href="/" className="hover:text-water transition">Home</Link><span>/</span><span className="text-charcoal font-medium">Submit a Boat Ramp</span></nav>
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-2">Submit a Boat Ramp</h1>
      <p className="text-gray-500 mb-8">Know a boat ramp we&apos;re missing? Help us build the most complete directory in America.</p>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div><label className="block text-sm font-semibold text-charcoal mb-1">Ramp Name</label><input type="text" name="Ramp Name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-water transition" /></div>
        <div><label className="block text-sm font-semibold text-charcoal mb-1">State</label><input type="text" name="State" required className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-water transition" /></div>
        <div><label className="block text-sm font-semibold text-charcoal mb-1">City/Town</label><input type="text" name="City" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-water transition" /></div>
        <div><label className="block text-sm font-semibold text-charcoal mb-1">Lake or River</label><input type="text" name="Water Body" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-water transition" /></div>
        <div><label className="block text-sm font-semibold text-charcoal mb-1">GPS Coordinates (optional)</label><input type="text" name="GPS" placeholder="e.g. 36.59, -94.76" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-water transition" /></div>
        <div><label className="block text-sm font-semibold text-charcoal mb-1">Notes</label><textarea name="Notes" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-water transition resize-none" placeholder="Surface type, amenities, anything helpful..." /></div>
        <button type="submit" className="w-full bg-sunset hover:bg-sunset-dark text-white font-bold py-3.5 rounded-lg transition text-sm">Submit Boat Ramp</button>
        <p className="text-xs text-gray-400 text-center">We review every submission within 48 hours.</p>
      </form>
    </div>
  );
}
