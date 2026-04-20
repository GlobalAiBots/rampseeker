import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Wyoming — 77 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Wyoming. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Wyoming Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/wyoming", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Wyoming Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/wyoming" },
};

export default function WyomingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
