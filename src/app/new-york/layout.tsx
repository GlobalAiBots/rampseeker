import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in New York — 1,564 Ramps Across 20 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for New York. 1,564 ramps across Lake George, Finger Lakes, Lake Ontario, Lake Champlain, Hudson River, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "New York Boat Ramps — RampSeeker", url: "https://rampseeker.com/new-york", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "New York Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/new-york" },
};

export default function NewYorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
