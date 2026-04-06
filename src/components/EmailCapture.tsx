"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    console.log("Newsletter signup:", email);
    setDone(true);
  }

  return (
    <section className="max-w-2xl mx-auto px-4 pb-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-1">Get Boating Updates</h2>
        <p className="text-gray-500 text-sm mb-5">New ramps, fishing reports, and boating tips from across America. No spam, unsubscribe anytime.</p>
        {!done ? (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-cream border border-gray-200 text-charcoal text-sm outline-none focus:border-water focus:ring-1 focus:ring-water/20 transition"
            />
            <button type="submit" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-5 py-3 rounded-lg transition shadow-sm text-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        ) : (
          <p className="text-forest font-bold text-sm">You&apos;re subscribed! Check your inbox.</p>
        )}
      </div>
    </section>
  );
}
