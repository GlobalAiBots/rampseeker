import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Oregon — 811 Ramps Across 20 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Oregon. 811 ramps across Columbia River, Willamette River, Crater Lake, Deschutes River, Pacific Coast, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Oregon Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/oregon", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Oregon Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/oregon" },
};

export default function OregonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
