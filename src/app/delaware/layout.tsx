import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Delaware — 181 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Delaware. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Delaware Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/delaware", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Delaware Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/delaware" },
};

export default function DelawareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
