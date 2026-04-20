import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Alaska — 392 Ramps Across 6 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Alaska. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Alaska Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/alaska", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Alaska Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/alaska" },
};

export default function AlaskaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
