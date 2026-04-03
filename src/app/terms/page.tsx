import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RampSeeker",
  description: "RampSeeker terms of service. Rules and guidelines for using our boat ramp directory.",
  alternates: { canonical: "https://rampseeker.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-6">Terms of Service</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p><strong className="text-charcoal">Last updated:</strong> April 2, 2026</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Use of Service</h2>
        <p>RampSeeker provides a free boat ramp directory for informational purposes. The information is provided &quot;as is&quot; without warranties of any kind. Always verify ramp conditions, access rules, and fees directly before visiting.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Accuracy</h2>
        <p>While we strive for accuracy, boat ramp conditions, fees, and availability can change without notice. GPS coordinates are approximate. Always use caution when navigating to a boat ramp and verify the location visually before launching.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">User Submissions</h2>
        <p>If you submit a ramp or correction, you grant RampSeeker permission to use that information in our directory. We may edit submissions for accuracy and clarity.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Liability</h2>
        <p>RampSeeker is not responsible for any damages, injuries, or losses resulting from the use of information on this site. Boating is inherently risky — always follow safety guidelines, wear life jackets, and check weather conditions.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Contact</h2>
        <p>Questions? Email <a href="mailto:hello@rampseeker.com" className="text-water hover:underline">hello@rampseeker.com</a>.</p>
      </div>
    </div>
  );
}
