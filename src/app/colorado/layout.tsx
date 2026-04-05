import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Colorado — 321 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Colorado. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Colorado Boat Ramps — RampSeeker", url: "https://rampseeker.com/colorado", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Colorado Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/colorado" },
};

export default function ColoradoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
