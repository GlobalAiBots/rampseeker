"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function CletusAd() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="my-12 rounded-2xl overflow-hidden transition-all duration-700"
      style={{
        background: "linear-gradient(135deg, #1E3A5F 0%, #1E6091 60%, #0D9488 100%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-bold text-white/70 bg-white/15 px-3 py-1 rounded-full tracking-wider uppercase mb-4">
              Powered by CLETUS AI
            </span>
            <h2 className="font-[Cabin] text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Your Business Deserves a 24/7 Employee
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
              CLETUS is the AI chat and voice agent that never sleeps, never calls in sick, and costs less than $1/day.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://globalaibots.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E76F51] hover:bg-[#D35F44] text-white font-bold text-sm px-6 py-3 rounded-lg transition shadow-lg shadow-black/20"
              >
                Start Free Trial &rarr;
              </a>
              <Link
                href="/for-businesses"
                className="border-2 border-white/30 hover:border-white/60 text-white font-bold text-sm px-6 py-3 rounded-lg transition"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="space-y-3">
              {[
                "AI chat widget answers customers on your website",
                "AI phone receptionist handles calls 24/7",
                "Learns YOUR business in 5 minutes",
                "Works for any industry — restaurants, shops, services",
                "14-day free trial, no credit card needed",
              ].map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nudge */}
        <p className="text-white/40 text-xs mt-8 text-center">
          Try it now — click the chat bubble in the corner to see CLETUS in action &rarr;
        </p>
      </div>
    </div>
  );
}
