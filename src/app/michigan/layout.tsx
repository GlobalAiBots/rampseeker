import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Michigan — 3,400+ Ramps Across 24 Lakes & Great Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Michigan. 3,400+ ramps across Lake Michigan, Lake Huron, Lake Superior, Torch Lake, Houghton Lake, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Michigan Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/michigan", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Michigan Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/michigan" },
};

export default function MichiganLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
