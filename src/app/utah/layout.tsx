import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Utah — 285 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Utah. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Utah Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/utah", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Utah Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/utah" },
};

export default function UtahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
