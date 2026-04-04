import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp on Grand Lake O' the Cherokees | RampSeeker",
  description: "23 detailed boat ramp guides for Grand Lake Oklahoma. GPS coordinates, amenities, local tips, nearby businesses. The most complete Grand Lake ramp directory.",
  openGraph: { title: "Grand Lake Boat Ramps — RampSeeker", url: "https://rampseeker.com/grand-lake", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Grand Lake Boat Ramps — RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/grand-lake" },
};

export default function GrandLakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
