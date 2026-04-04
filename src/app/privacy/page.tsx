import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RampSeeker",
  description: "RampSeeker privacy policy. How we collect, use, and protect your information, including our use of Google AdSense and cookies.",
  openGraph: { title: "Privacy Policy — RampSeeker", url: "https://rampseeker.com/privacy", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "Privacy Policy — RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: April 2, 2026</p>

      <div className="space-y-6 text-gray-600 leading-relaxed text-sm">
        <p>RampSeeker (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website rampseeker.com. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our site.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Information We Collect</h2>
        <p>RampSeeker is a free, publicly accessible boat ramp directory. We do not require user accounts. We may collect the following information:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-charcoal">Contact submissions:</strong> If you email us at hello@rampseeker.com or submit a ramp suggestion, we collect the information you voluntarily provide (name, email, ramp details).</li>
          <li><strong className="text-charcoal">Newsletter signups:</strong> If you subscribe to our mailing list, we collect your email address.</li>
          <li><strong className="text-charcoal">Usage data:</strong> We may collect anonymous usage data such as pages visited, time on site, browser type, and approximate geographic location through analytics tools.</li>
          <li><strong className="text-charcoal">Cookies:</strong> We use cookies and similar technologies as described below.</li>
        </ul>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Cookies and Advertising</h2>
        <p>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</p>
        <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies by visiting the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">Network Advertising Initiative opt-out page</a>.</p>
        <p>We may also use Google Analytics to understand how visitors use our site. Google Analytics uses cookies to collect anonymous traffic data. You can learn more about how Google uses data at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">Google&apos;s partner policy page</a>.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">AI Chatbot (CLETUS)</h2>
        <p>Our site includes an AI chatbot powered by CLETUS (by Global AI Bots). When you interact with the chatbot, your messages are processed by Anthropic&apos;s Claude AI to generate responses. Chat conversations may be logged to improve the quality of responses. We do not use chatbot conversations for advertising purposes or share them with third parties beyond the AI processing service.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To provide and maintain our boat ramp directory</li>
          <li>To respond to your submissions, inquiries, and feedback</li>
          <li>To send newsletter updates if you subscribed (you can unsubscribe anytime)</li>
          <li>To analyze site usage and improve the user experience</li>
          <li>To display relevant advertisements through Google AdSense</li>
        </ul>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">We Do Not Sell Your Data</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share anonymous, aggregated data (such as total site visitors) but never individual personal information.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Third-Party Links</h2>
        <p>Our site contains links to external websites (Google Maps, Amazon, business websites). We are not responsible for the privacy practices of these third-party sites. We encourage you to review their privacy policies.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Data Sources</h2>
        <p>Boat ramp locations, GPS coordinates, and amenity information are compiled from publicly available sources including Google Places API, U.S. Army Corps of Engineers records, Oklahoma state park data, and user submissions.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Children&apos;s Privacy</h2>
        <p>Our site is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.</p>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10">Contact Us</h2>
        <p>Questions about this privacy policy? Email <a href="mailto:hello@rampseeker.com" className="text-water hover:underline">hello@rampseeker.com</a>.</p>
      </div>
    </div>
  );
}
