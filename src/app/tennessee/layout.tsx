import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Tennessee — 454 Ramps Across 20 Lakes & Rivers | RampSeeker",
  description: "The most complete boat ramp directory for Tennessee. 454 ramps across Norris Lake, Kentucky Lake, Dale Hollow, Cherokee Lake, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Tennessee Boat Ramps — RampSeeker", url: "https://rampseeker.com/tennessee", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Tennessee Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/tennessee" },
};

export default function TennesseeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
