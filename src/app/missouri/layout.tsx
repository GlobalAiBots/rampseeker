import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Missouri — 778+ Ramps Across 12 Lakes | RampSeeker",
  description: "The most complete boat ramp directory for Missouri. 778+ ramps across Lake of the Ozarks, Table Rock, Stockton, Truman, and more. GPS coordinates, amenities, directions.",
  openGraph: { title: "Missouri Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/missouri", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/missouri" },
};

export default function MissouriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
