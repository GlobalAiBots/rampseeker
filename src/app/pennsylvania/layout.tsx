import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Pennsylvania — 302 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Pennsylvania. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Pennsylvania Boat Ramps — RampSeeker", url: "https://rampseeker.com/pennsylvania", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Pennsylvania Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/pennsylvania" },
};

export default function PennsylvaniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
