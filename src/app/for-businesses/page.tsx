import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get CLETUS AI for Your Lake Business — Marinas, Bait Shops, RV Parks | RampSeeker",
  description: "CLETUS is the AI chat and voice agent for lake businesses. Answer customer questions 24/7 on your website and phone. Marinas, bait shops, RV parks, boat rentals, restaurants.",
  keywords: "AI chatbot for marina, AI for bait shop, chatbot for RV park, AI customer service lake business, marina chatbot",
  openGraph: { title: "Get CLETUS AI for Your Lake Business", url: "https://rampseeker.com/for-businesses", siteName: "RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/for-businesses" },
};

const businesses = [
  { icon: "&#9875;", type: "Marinas", questions: ["What slip sizes do you have?", "What's the fuel price today?", "Do you have transient slips?"] },
  { icon: "&#127907;", type: "Bait Shops", questions: ["Are you open?", "Do you have live shiners?", "What's biting right now?"] },
  { icon: "&#127957;", type: "RV Parks", questions: ["Do you have full hookups?", "What are your rates?", "Is there a pool?"] },
  { icon: "&#128674;", type: "Boat Rentals", questions: ["What pontoons are available Saturday?", "What's the deposit?", "Do you deliver to the ramp?"] },
  { icon: "&#127860;", type: "Restaurants", questions: ["What are your hours?", "Do you have dock access?", "Can we bring the dog?"] },
];

export default function ForBusinessesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          Your Customers Are Searching Right Now. Is Anyone Answering?
        </h1>
        <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          CLETUS is the AI chat and voice agent that answers your customers 24/7 — on your website and your phone.
        </p>
        <div className="flex gap-3 justify-center mt-8 flex-wrap">
          <a href="https://globalaibots.com/signup" target="_blank" rel="noopener noreferrer" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start Free 14-Day Trial</a>
          <a href="#see-it" className="border-2 border-water text-water hover:bg-water hover:text-white font-bold px-6 py-3 rounded-lg transition">See It In Action</a>
        </div>
      </section>

      {/* Built for Lake Businesses */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-3">Built for Lake Businesses</h2>
        <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">CLETUS learns YOUR business and answers YOUR customers&apos; questions — instantly, accurately, 24/7.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((b) => (
            <div key={b.type} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: b.icon }} />
              <h3 className="font-[Cabin] font-bold text-charcoal mb-3">{b.type}</h3>
              <div className="space-y-2">
                {b.questions.map((q) => (
                  <p key={q} className="text-gray-500 text-sm bg-gray-50 rounded-lg px-3 py-2 italic">&ldquo;{q}&rdquo;</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 border-y border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account in 30 seconds. No credit card for the free trial." },
              { step: "2", title: "Teach CLETUS Your Business", desc: "Enter your hours, prices, FAQ, and policies. CLETUS learns it all in minutes." },
              { step: "3", title: "Paste One Line of Code", desc: "Add the widget to your website. CLETUS starts answering customers immediately." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-water text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h3 className="font-[Cabin] font-bold text-charcoal mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-8">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "CLETUS Chat", price: "$29.95", desc: "AI chat widget on your website. 24/7 responses." },
            { name: "CLETUS Voice", price: "$49.95", desc: "AI phone receptionist. Natural voice, smart routing." },
            { name: "Chat + Voice", price: "$69.95", desc: "Both products bundled. Save $10/mo.", highlight: true },
          ].map((p) => (
            <div key={p.name} className={`rounded-xl p-6 text-center ${p.highlight ? "bg-water text-white" : "bg-white border border-gray-200 shadow-sm"}`}>
              <p className={`font-[Cabin] font-bold text-sm mb-1 ${p.highlight ? "text-white/80" : "text-gray-500"}`}>{p.name}</p>
              <p className="text-3xl font-bold font-[Cabin] mb-1">{p.price}<span className={`text-sm font-normal ${p.highlight ? "text-white/70" : "text-gray-400"}`}>/mo</span></p>
              <p className={`text-sm ${p.highlight ? "text-white/80" : "text-gray-500"}`}>{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm text-center mt-4">14-day free trial on every plan. No credit card required.</p>
      </section>

      {/* See It In Action */}
      <section id="see-it" className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">See CLETUS In Action — Right Now</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The chat bubble in the bottom corner of this page IS CLETUS. Click it and ask anything about Oklahoma boat ramps — that&apos;s exactly what your customers would experience on your website.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Try asking: &ldquo;What boat ramps are on Grand Lake?&rdquo; or &ldquo;Where can I launch near Disney?&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Stop Losing Customers to Unanswered Questions</h2>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">CLETUS costs less than $1/day and works 24/7. Your customers get instant answers. You get more bookings.</p>
        <a href="https://globalaibots.com/signup" target="_blank" rel="noopener noreferrer" className="inline-block bg-sunset hover:bg-sunset-dark text-white font-bold px-8 py-3 rounded-lg transition shadow-sm">Start Your Free 14-Day Trial &rarr;</a>
        <p className="text-gray-400 text-xs mt-4">Questions? <a href="mailto:hello@grandlakeai.com" className="text-water hover:underline">hello@grandlakeai.com</a></p>
      </section>
    </div>
  );
}
