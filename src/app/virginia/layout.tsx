import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Virginia — 443 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Virginia. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Virginia Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/virginia", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Virginia Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/virginia" },
};

export default function VirginiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
