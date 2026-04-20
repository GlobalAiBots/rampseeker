import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Idaho — 743 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Idaho. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Idaho Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/idaho", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Idaho Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/idaho" },
};

export default function IdahoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
