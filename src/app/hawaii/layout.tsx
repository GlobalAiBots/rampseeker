import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Hawaii — 53 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Hawaii. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Hawaii Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/hawaii", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Hawaii Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/hawaii" },
};

export default function HawaiiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
