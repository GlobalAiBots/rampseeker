export default function CletusPromo() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-10">
      <p className="font-[Cabin] font-bold text-charcoal text-sm mb-2">This site is powered by CLETUS AI</p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Own a business? CLETUS answers your customers&apos; questions 24/7 — on your website and your phone. Works for any industry.
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-sm text-gray-600">
        <span>&#10003; AI chat widget for your website</span>
        <span>&#10003; AI phone receptionist</span>
        <span>&#10003; Costs less than $1/day</span>
        <span>&#10003; Setup in 5 minutes</span>
      </div>
      <a
        href="https://globalaibots.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-water hover:bg-water-light text-white font-bold text-sm px-5 py-2.5 rounded-lg transition"
      >
        Get CLETUS for Your Business &rarr;
      </a>
    </div>
  );
}
