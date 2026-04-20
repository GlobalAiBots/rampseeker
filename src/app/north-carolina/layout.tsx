import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in North Carolina — 1,500+ Ramps, Lakes & Coastal Launches | RampSeeker",
  description: "The most complete boat ramp directory for North Carolina. 1,500+ ramps across Lake Norman, Jordan Lake, Falls Lake, Pamlico Sound, Outer Banks, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "North Carolina Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/north-carolina", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "North Carolina Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/north-carolina" },
};

export default function NorthCarolinaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
