import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RampSeeker",
  description: "RampSeeker privacy policy. How we collect, use, and protect your information.",
  alternates: { canonical: "https://rampseeker.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p><strong className="text-charcoal">Last updated:</strong> April 2, 2026</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Information We Collect</h2>
        <p>RampSeeker is a free, publicly accessible boat ramp directory. We do not require user accounts or collect personal information to use the site. If you contact us via email (hello@rampseeker.com) or submit a ramp suggestion, we collect the information you provide (name, email, ramp details).</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Analytics</h2>
        <p>We may use standard web analytics tools to understand how visitors use our site (pages visited, time on site, general location). This data is aggregated and does not identify individual users.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Third-Party Services</h2>
        <p>Our site embeds Google Maps for displaying ramp locations. Google Maps has its own privacy policy. We use Google Fonts for typography. No other third-party tracking or advertising services are used.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Cookies</h2>
        <p>RampSeeker does not set cookies for tracking purposes. Third-party embeds (Google Maps) may set their own cookies according to their policies.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Data Sources</h2>
        <p>Boat ramp locations, GPS coordinates, and amenity information are compiled from publicly available sources including Google Places API, U.S. Army Corps of Engineers records, Oklahoma state park data, and user submissions.</p>
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Contact</h2>
        <p>Questions about this policy? Email <a href="mailto:hello@rampseeker.com" className="text-water hover:underline">hello@rampseeker.com</a>.</p>
      </div>
    </div>
  );
}
