import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Indiana — 520 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Indiana. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Indiana Boat Ramps — RampSeeker", url: "https://rampseeker.com/indiana", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Indiana Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/indiana" },
};

export default function IndianaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
