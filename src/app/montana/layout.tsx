import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Montana — 88 Ramps Across 7 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Montana. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Montana Boat Ramps — RampSeeker", url: "https://rampseeker.com/montana", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Montana Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/montana" },
};

export default function MontanaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
