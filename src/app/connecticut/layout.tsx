import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Connecticut — 447 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Connecticut. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Connecticut Boat Ramps — RampSeeker", url: "https://rampseeker.com/connecticut", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Connecticut Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/connecticut" },
};

export default function ConnecticutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
