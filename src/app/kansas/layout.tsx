import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Kansas — 386+ Ramps Across 15 Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Kansas. 386+ ramps across Milford, Tuttle Creek, Clinton, Perry, Cheney, Wilson, and more. GPS coordinates, amenities, directions.",
  openGraph: { title: "Kansas Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/kansas", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/kansas" },
};

export default function KansasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
