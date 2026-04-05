import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in New Hampshire — 376 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for New Hampshire. GPS coordinates, amenities, local tips.",
  openGraph: { title: "New Hampshire Boat Ramps — RampSeeker", url: "https://rampseeker.com/new-hampshire", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "New Hampshire Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/new-hampshire" },
};

export default function NewHampshireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
