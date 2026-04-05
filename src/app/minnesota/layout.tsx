import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Minnesota — 1,700+ Ramps Across 20 Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Minnesota. 1,700+ ramps across Mille Lacs, Lake Vermilion, Leech Lake, Lake Minnetonka, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Minnesota Boat Ramps — RampSeeker", url: "https://rampseeker.com/minnesota", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Minnesota Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/minnesota" },
};

export default function MinnesotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
