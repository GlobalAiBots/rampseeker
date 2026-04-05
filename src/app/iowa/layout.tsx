import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Iowa — 637 Ramps Across 8 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Iowa. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Iowa Boat Ramps — RampSeeker", url: "https://rampseeker.com/iowa", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Iowa Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/iowa" },
};

export default function IowaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
