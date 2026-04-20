import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Washington — 1,352 Ramps Across 20 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Washington State. 1,352 ramps across Puget Sound, Lake Chelan, Columbia River, San Juan Islands, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Washington Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/washington", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Washington Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/washington" },
};

export default function WashingtonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
