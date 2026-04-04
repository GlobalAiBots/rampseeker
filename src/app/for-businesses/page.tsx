import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLETUS AI — 24/7 AI Chat & Voice Agent for Any Business | RampSeeker",
  description: "CLETUS answers your customers' questions 24/7 on your website and phone. Works for any business — restaurants, hotels, marinas, salons, retail, services, and more. Less than $1/day.",
  keywords: "AI chatbot for small business, AI customer service, 24/7 chatbot for website, AI phone answering service, chatbot for restaurants, AI for hotels",
  openGraph: { title: "CLETUS AI — 24/7 Chat & Voice Agent for Any Business", url: "https://rampseeker.com/for-businesses", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "CLETUS AI for Your Business | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/for-businesses" },
};

const businesses = [
  { icon: "&#127957;", type: "Campgrounds & RV Parks", questions: ["Do you have full hookups?", "What are your rates?", "Are you pet friendly?"] },
  { icon: "&#9875;", type: "Marinas & Boat Rentals", questions: ["What slip sizes do you have?", "What pontoons are available?", "What's fuel price?"] },
  { icon: "&#127907;", type: "Bait Shops & Outfitters", questions: ["Are you open?", "Do you have live shiners?", "What's biting right now?"] },
  { icon: "&#127976;", type: "Hotels & Lodges", questions: ["Do you have availability?", "Is there a pool?", "What's checkout time?"] },
  { icon: "&#127860;", type: "Restaurants & Bars", questions: ["What are your hours?", "Do you have dock access?", "Is there live music tonight?"] },
  { icon: "&#127978;", type: "Retail & Local Shops", questions: ["What are your hours?", "Do you carry [product]?", "Where are you located?"] },
  { icon: "&#128295;", type: "Service Businesses", questions: ["How much does [service] cost?", "Do you offer free estimates?", "What areas do you serve?"] },
  { icon: "&#128136;", type: "Salons & Spas", questions: ["Do you take walk-ins?", "What are your prices?", "Can I book online?"] },
  { icon: "&#127973;", type: "Medical & Dental", questions: ["What insurance do you accept?", "Taking new patients?", "What are your hours?"] },
  { icon: "&#127947;", type: "Gyms & Fitness", questions: ["What are membership rates?", "Do you offer day passes?", "What classes do you have?"] },
  { icon: "&#128054;", type: "Pet Services", questions: ["What are boarding rates?", "Do you do grooming?", "Is there outdoor play?"] },
  { icon: "&#127968;", type: "Real Estate", questions: ["Is this property still available?", "Can I schedule a showing?", "What are the HOA fees?"] },
];

export default function ForBusinessesPage() {
  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          Your Customers Have Questions.<br />CLETUS Answers Them 24/7.
        </h1>
        <p className="text-gray-500 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          AI chat and voice agent for your website and phone. Works for any business, any industry. Less than $1/day.
        </p>
        <div className="flex gap-3 justify-center mt-8 flex-wrap">
          <a href="https://globalaibots.com/signup" target="_blank" rel="noopener noreferrer" className="bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start Free 14-Day Trial</a>
          <a href="#see-it" className="border-2 border-water text-water hover:bg-water hover:text-white font-bold px-6 py-3 rounded-lg transition">See It In Action</a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-3">CLETUS Works for Every Business</h2>
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

      <section className="bg-gray-50 border-y border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account in 30 seconds. No credit card for the free trial." },
              { step: "2", title: "Teach CLETUS", desc: "Enter your hours, prices, FAQ, and policies. CLETUS learns it all in minutes." },
              { step: "3", title: "Go Live", desc: "Paste one line of code on your website. CLETUS starts answering immediately." },
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

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-8">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "CLETUS Chat", price: "$29.95", desc: "AI chat widget on your website. 24/7." },
            { name: "CLETUS Voice", price: "$49.95", desc: "AI phone receptionist. Natural voice." },
            { name: "Chat + Voice", price: "$69.95", desc: "Both products. Save $10/mo.", highlight: true },
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

      <section id="see-it" className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">See CLETUS In Action — Right Now</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The chat bubble in the bottom corner of this page IS CLETUS. Click it and ask anything — that&apos;s exactly what your customers would experience.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 text-center" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Stop Losing Customers to Unanswered Questions</h2>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">CLETUS costs less than $1/day and works 24/7. Your customers get instant answers. You get more business.</p>
        <a href="https://globalaibots.com/signup" target="_blank" rel="noopener noreferrer" className="inline-block bg-sunset hover:bg-sunset-dark text-white font-bold px-8 py-3 rounded-lg transition shadow-sm">Start Your Free 14-Day Trial &rarr;</a>
        <p className="text-gray-400 text-xs mt-4">Questions? <a href="mailto:hello@globalaibots.com" className="text-water hover:underline">hello@globalaibots.com</a></p>
      </section>
    </div>
  );
}
