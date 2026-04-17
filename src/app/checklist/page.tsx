"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const items = [
  { id: "drain-plug", label: "Drain plug in", icon: "🔌", category: "Critical" },
  { id: "trailer-lights", label: "Trailer lights disconnected", icon: "💡", category: "Critical" },
  { id: "kill-switch", label: "Kill switch lanyard attached", icon: "🔑", category: "Critical" },
  { id: "life-jackets", label: "Life jackets for all passengers", icon: "🦺", category: "Safety" },
  { id: "registration", label: "Registration visible & current", icon: "📋", category: "Legal" },
  { id: "ramp-fee", label: "Ramp fee paid / pass displayed", icon: "💵", category: "Legal" },
  { id: "bow-stern-lines", label: "Bow & stern lines ready", icon: "🪢", category: "Prep" },
  { id: "fenders", label: "Fenders out", icon: "⚓", category: "Prep" },
  { id: "fuel-level", label: "Check fuel level", icon: "⛽", category: "Prep" },
  { id: "trim-motor", label: "Trim motor up after loading", icon: "🚤", category: "Prep" },
  { id: "battery", label: "Battery switch on", icon: "🔋", category: "Systems" },
  { id: "bilge-pump", label: "Bilge pump working", icon: "💧", category: "Systems" },
  { id: "navigation-lights", label: "Navigation lights tested", icon: "🔦", category: "Systems" },
  { id: "fire-extinguisher", label: "Fire extinguisher charged & accessible", icon: "🧯", category: "Safety" },
  { id: "anchor", label: "Anchor & line secured", icon: "⚓", category: "Gear" },
  { id: "cooler-ice", label: "Cooler with ice & water", icon: "🧊", category: "Gear" },
  { id: "sunscreen", label: "Sunscreen applied", icon: "☀️", category: "Personal" },
  { id: "phone-charged", label: "Phone charged & in waterproof case", icon: "📱", category: "Personal" },
];

const categories = ["Critical", "Safety", "Legal", "Prep", "Systems", "Gear", "Personal"];

function getStoredChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("rampseeker-checklist") || "{}"); } catch { return {}; }
}

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecked(getStoredChecks());
    setMounted(true);
  }, []);

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem("rampseeker-checklist", JSON.stringify(next));
  }

  function resetAll() {
    setChecked({});
    localStorage.removeItem("rampseeker-checklist");
  }

  const completed = items.filter((i) => checked[i.id]).length;
  const total = items.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" },
          { "@type": "ListItem", position: 2, name: "Pre-Launch Checklist", item: "https://rampseeker.com/checklist" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What should I check before launching my boat?", acceptedAnswer: { "@type": "Answer", text: "Before launching, check: drain plug is in, trailer lights disconnected, kill switch attached, life jackets for all passengers, registration visible, fuel level, navigation lights, fire extinguisher, and that your trim motor is up. Use this interactive checklist every time." } },
          { "@type": "Question", name: "What is the most common boat ramp mistake?", acceptedAnswer: { "@type": "Answer", text: "The most common mistake is forgetting the drain plug. Launching with the drain plug out will flood your boat within minutes. Always check it first — that's why it's #1 on this checklist." } },
          { "@type": "Question", name: "Do I need a life jacket on a boat?", acceptedAnswer: { "@type": "Answer", text: "Federal law requires one USCG-approved life jacket per person on board. Children under 13 must wear a life jacket at all times in most states. It's the most important safety item on any boat." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <span className="text-charcoal font-medium">Pre-Launch Checklist</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Pre-Launch Checklist</h1>
      <p className="text-gray-500 mb-6">Tap each item before you back down the ramp. Your progress saves automatically.</p>

      {/* Progress */}
      {mounted && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-charcoal">{completed}/{total} complete</span>
            <span className="text-sm font-bold" style={{ color: pct === 100 ? "#2D6A4F" : "#E76F51" }}>{pct}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, background: pct === 100 ? "linear-gradient(135deg, #2D6A4F, #48BB78)" : "linear-gradient(135deg, #2980B9, #1E6091)" }} />
          </div>
          {pct === 100 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-green-700 font-bold text-sm">&#9989; All clear! You&apos;re ready to launch.</p>
            </div>
          )}
        </div>
      )}

      {/* Checklist by category */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;
          return (
            <div key={cat}>
              <h2 className="font-[Cabin] font-bold text-charcoal text-sm uppercase tracking-wider mb-3" style={{ color: cat === "Critical" ? "#E76F51" : "#1E6091" }}>{cat}</h2>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <button key={item.id} onClick={() => toggle(item.id)} className={`w-full text-left flex items-center gap-4 rounded-xl p-4 transition-all duration-200 ${checked[item.id] ? "bg-green-50 border-2 border-green-300" : "bg-white border-2 border-gray-200 hover:border-water"}`} style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${checked[item.id] ? "bg-green-500 text-white" : "bg-gray-100 text-gray-300"}`}>
                      {checked[item.id] ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : <span className="text-xs">{item.icon}</span>}
                    </div>
                    <span className={`text-sm font-medium transition-all ${checked[item.id] ? "text-green-700 line-through" : "text-charcoal"}`}>{item.label}</span>
                    {cat === "Critical" && !checked[item.id] && <span className="ml-auto text-[10px] font-bold text-red-400 bg-red-50 px-2 py-0.5 rounded-full">CRITICAL</span>}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <div className="mt-8 text-center">
        <button onClick={resetAll} className="text-sm text-gray-400 hover:text-red-500 transition">Reset checklist for next trip &rarr;</button>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "What is the most common boat ramp mistake?", a: "Forgetting the drain plug. Launching with it out will flood your boat within minutes. Always check it first — that's why it's #1 on this checklist." },
            { q: "Do I need a life jacket on a boat?", a: "Federal law requires one USCG-approved life jacket per person on board. Children under 13 must wear one at all times in most states." },
            { q: "Should I disconnect trailer lights before backing in?", a: "Yes. Submerging hot trailer lights in cold water can crack the lenses and short the wiring. Disconnect them before the trailer hits the water." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Related */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/blog/how-to-launch-a-boat-safely" className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-water hover:shadow-sm transition">
          <p className="font-bold text-charcoal group-hover:text-water transition text-sm">How to Launch a Boat Safely</p>
          <p className="text-gray-400 text-xs mt-1">Step-by-step launching guide</p>
        </Link>
        <Link href="/blog/boat-ramp-etiquette" className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-water hover:shadow-sm transition">
          <p className="font-bold text-charcoal group-hover:text-water transition text-sm">Boat Ramp Etiquette</p>
          <p className="text-gray-400 text-xs mt-1">The unwritten rules of the ramp</p>
        </Link>
      </div>
    </div>
  );
}
