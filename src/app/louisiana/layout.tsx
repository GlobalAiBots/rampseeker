import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Louisiana — 376 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Louisiana. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Louisiana Boat Ramps — RampSeeker", url: "https://rampseeker.com/louisiana", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Louisiana Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/louisiana" },
};

export default function LouisianaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
