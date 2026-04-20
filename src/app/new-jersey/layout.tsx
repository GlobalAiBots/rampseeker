import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in New Jersey — 420 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for New Jersey. GPS coordinates, amenities, local tips.",
  openGraph: { title: "New Jersey Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/new-jersey", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "New Jersey Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/new-jersey" },
};

export default function NewJerseyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
