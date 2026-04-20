import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in South Carolina — 233 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for South Carolina. GPS coordinates, amenities, local tips.",
  openGraph: { title: "South Carolina Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/south-carolina", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "South Carolina Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/south-carolina" },
};

export default function SouthCarolinaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
