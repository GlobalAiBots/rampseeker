import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in California — 896 Ramps Across 10 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for California. GPS coordinates, amenities, local tips.",
  openGraph: { title: "California Boat Ramps — RampSeeker", url: "https://rampseeker.com/california", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "California Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/california" },
};

export default function CaliforniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
