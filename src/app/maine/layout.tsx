import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Maine — 849 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Maine. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Maine Boat Ramps — RampSeeker", url: "https://rampseeker.com/maine", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Maine Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/maine" },
};

export default function MaineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
