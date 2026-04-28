import Link from "next/link";
import ClaimForm from "./ClaimForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Your Boat Ramp | RampSeeker",
  description: "Manage or operate a public boat ramp? Claim your free listing to update fees, access hours, amenities, and contact information.",
  alternates: { canonical: "https://www.rampseeker.com/claim" },
};

export default async function ClaimPage({ searchParams }: { searchParams: Promise<{ ramp?: string; name?: string }> }) {
  const params = await searchParams;
  const rampId = params.ramp || "";
  const rampName = params.name || "";

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
        <span className="text-charcoal font-medium">Claim Your Ramp</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-2">Claim Your Boat Ramp</h1>
      <p className="text-gray-500 mb-8">Manage or operate a public boat ramp? Claim your free listing to update fees, access hours, amenities, and contact information.</p>

      <ClaimForm rampId={rampId} initialRampName={rampName} />
    </div>
  );
}
