export default function CletusPromo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-[Cabin] font-bold text-water text-sm mb-1">Powered by CLETUS AI</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            RampSeeker uses CLETUS AI to help you find boat ramps. Own a marina, bait shop, or lake business? Get CLETUS on your website — answer customer questions 24/7.
          </p>
        </div>
        <a
          href="https://grandlakeai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-water hover:bg-water-light text-white font-bold text-sm px-5 py-2.5 rounded-lg transition whitespace-nowrap flex-shrink-0"
        >
          Learn More &rarr;
        </a>
      </div>
    </div>
  );
}
