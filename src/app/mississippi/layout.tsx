import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Mississippi — 47 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Mississippi. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Mississippi Boat Ramps — RampSeeker", url: "https://rampseeker.com/mississippi", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Mississippi Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/mississippi" },
};

export default function MississippiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
