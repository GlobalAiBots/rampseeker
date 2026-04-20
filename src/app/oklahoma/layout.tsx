import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Oklahoma — 460+ Ramps Across 19 Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Oklahoma. 460+ ramps across Grand Lake, Tenkiller, Eufaula, Keystone, Broken Bow, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Oklahoma Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/oklahoma", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/oklahoma" },
};

export default function OklahomaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
