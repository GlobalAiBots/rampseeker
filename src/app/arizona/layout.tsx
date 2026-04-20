import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Arizona — 239 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Arizona. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Arizona Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/arizona", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Arizona Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/arizona" },
};

export default function ArizonaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
