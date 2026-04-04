import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Florida — 1,400+ Ramps, Lakes & Coastal Launches | RampSeeker",
  description: "The most complete boat ramp directory for Florida. Freshwater lakes, saltwater launches, coastal access points. Lake Okeechobee, Tampa Bay, Biscayne Bay, and more. GPS coordinates, amenities, directions.",
  openGraph: { title: "Florida Boat Ramps — RampSeeker", url: "https://rampseeker.com/florida", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/florida" },
};

export default function FloridaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
