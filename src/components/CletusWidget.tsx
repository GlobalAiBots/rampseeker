"use client";

import { useEffect } from "react";

export default function CletusWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.globalaibots.com/widget-demo.js";
    script.setAttribute("data-agent-name", "RampSeeker Guide");
    script.setAttribute("data-color", "#1E6091");
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch { /* already removed */ }
    };
  }, []);
  return null;
}
