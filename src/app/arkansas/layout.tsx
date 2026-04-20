import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Arkansas — 503+ Ramps Across 13 Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Arkansas. 503+ ramps across Beaver Lake, Bull Shoals, Greers Ferry, Lake Ouachita, and more. GPS coordinates, amenities, directions.",
  openGraph: { title: "Arkansas Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/arkansas", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/arkansas" },
};

export default function ArkansasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
