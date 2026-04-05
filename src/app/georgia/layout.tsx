import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Georgia — 730 Ramps Across 20 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Georgia. 730 ramps across Lake Lanier, Clarks Hill Lake, Lake Hartwell, Savannah Coast, Golden Isles, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Georgia Boat Ramps — RampSeeker", url: "https://rampseeker.com/georgia", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Georgia Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/georgia" },
};

export default function GeorgiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
