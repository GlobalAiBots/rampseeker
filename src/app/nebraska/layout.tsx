import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Nebraska — 98 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Nebraska. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Nebraska Boat Ramps — RampSeeker", url: "https://rampseeker.com/nebraska", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Nebraska Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/nebraska" },
};

export default function NebraskaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
