import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Massachusetts — 622 Ramps Across 7 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Massachusetts. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Massachusetts Boat Ramps — RampSeeker", url: "https://rampseeker.com/massachusetts", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Massachusetts Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/massachusetts" },
};

export default function MassachusettsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
