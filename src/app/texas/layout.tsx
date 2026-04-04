import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Texas — 841+ Ramps Across 17 Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Texas. 841+ ramps across Lake Fork, Sam Rayburn, Lake Travis, Texoma, and more. GPS coordinates, amenities, directions.",
  openGraph: { title: "Texas Boat Ramps — RampSeeker", url: "https://rampseeker.com/texas", siteName: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/texas" },
};

export default function TexasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
