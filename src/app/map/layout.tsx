import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oklahoma Boat Ramp Map — Find Launch Sites Near You | RampSeeker",
  description: "Interactive map of 261+ boat ramps across 19 Oklahoma lakes. Find the closest launch point with GPS coordinates and directions.",
  openGraph: {
    title: "Oklahoma Boat Ramp Map",
    description: "261+ boat ramps across 19 Oklahoma lakes. Find your launch.",
    url: "https://rampseeker.com/map",
    siteName: "RampSeeker",
  },
  twitter: { card: "summary", title: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/map" },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
