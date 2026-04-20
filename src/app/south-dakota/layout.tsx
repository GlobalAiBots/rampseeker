import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in South Dakota — 110 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for South Dakota. GPS coordinates, amenities, local tips.",
  openGraph: { title: "South Dakota Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/south-dakota", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "South Dakota Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/south-dakota" },
};

export default function SouthDakotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
