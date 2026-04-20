import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in New Mexico — 56 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for New Mexico. GPS coordinates, amenities, local tips.",
  openGraph: { title: "New Mexico Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/new-mexico", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "New Mexico Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/new-mexico" },
};

export default function NewMexicoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
