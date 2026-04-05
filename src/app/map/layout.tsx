import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US Boat Ramp Map — Find Launch Sites in All 50 States | RampSeeker",
  description: "Interactive map of 29,000+ boat ramps across 46 states. Browse by state to find boat launch sites with GPS coordinates, amenities, and directions.",
  openGraph: {
    title: "US Boat Ramp Map — RampSeeker",
    description: "29,000+ boat ramps across 46 states. Find your launch.",
    url: "https://rampseeker.com/map",
    siteName: "RampSeeker",
  },
  twitter: { card: "summary", title: "US Boat Ramp Map | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/map" },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
