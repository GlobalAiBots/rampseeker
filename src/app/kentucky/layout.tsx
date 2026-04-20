import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Kentucky — 553 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Kentucky. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Kentucky Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/kentucky", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Kentucky Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/kentucky" },
};

export default function KentuckyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
