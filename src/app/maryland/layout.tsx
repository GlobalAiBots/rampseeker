import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Maryland — 1,010 Ramps Across 18 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Maryland. 1,010 ramps across Chesapeake Bay, Potomac River, Deep Creek Lake, Ocean City, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Maryland Boat Ramps — RampSeeker", url: "https://rampseeker.com/maryland", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Maryland Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/maryland" },
};

export default function MarylandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
