"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("rampseeker_cookies_accepted")) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("rampseeker_cookies_accepted", "1");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99998] bg-white border-t border-gray-200 shadow-lg px-4 py-3">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-600 text-sm text-center sm:text-left">
          We use cookies to improve your experience and serve relevant ads. By continuing to browse, you agree to our cookie policy.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/privacy" className="text-water text-sm font-medium hover:underline">Learn More</Link>
          <button onClick={accept} className="bg-water hover:bg-water-light text-white font-bold text-sm px-5 py-2 rounded-lg transition">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
