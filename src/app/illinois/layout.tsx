import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Illinois — 1,451 Ramps Across 16 Lakes & Rivers | RampSeeker",
  description: "The most complete boat ramp directory for Illinois. 1,451 ramps across Lake Michigan, Rend Lake, Carlyle Lake, Mississippi River, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Illinois Boat Ramps — RampSeeker", url: "https://rampseeker.com/illinois", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Illinois Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/illinois" },
};

export default function IllinoisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
