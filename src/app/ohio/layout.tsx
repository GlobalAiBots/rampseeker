import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in Ohio — 705 Ramps Across 18 Lakes & Rivers | RampSeeker",
  description: "The most complete boat ramp directory for Ohio. 705 ramps across Lake Erie, Pymatuning, Mosquito Lake, Ohio River, and more. GPS coordinates, amenities, local tips.",
  openGraph: { title: "Ohio Boat Ramps — RampSeeker", url: "https://www.rampseeker.com/ohio", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Ohio Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/ohio" },
};

export default function OhioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
