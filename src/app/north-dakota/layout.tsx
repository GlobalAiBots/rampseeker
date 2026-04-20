import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in North Dakota — 302 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for North Dakota. GPS coordinates, amenities, local tips.",
  openGraph: { title: "North Dakota Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/north-dakota", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "North Dakota Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/north-dakota" },
};

export default function NorthDakotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
