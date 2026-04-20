import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in West Virginia — 3 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for West Virginia. GPS coordinates, amenities, local tips.",
  openGraph: { title: "West Virginia Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/west-virginia", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "West Virginia Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/west-virginia" },
};

export default function WestVirginiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
