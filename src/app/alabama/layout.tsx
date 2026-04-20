import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Alabama — 732 Ramps Across 22 Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for Alabama. 732 ramps across Lake Guntersville, Wheeler Lake, Lake Martin, Mobile Bay, Gulf Shores, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Alabama Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/alabama", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Alabama Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/alabama" },
};

export default function AlabamaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
