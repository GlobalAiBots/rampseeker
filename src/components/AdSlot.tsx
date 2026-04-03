// Replace with Google AdSense code once approved
// 1. Sign up at https://www.google.com/adsense/
// 2. Replace the placeholder div below with the AdSense ad unit code
// 3. Add your data-ad-client and data-ad-slot attributes

export default function AdSlot({ position }: { position: string }) {
  return (
    <div
      data-ad-position={position}
      className="w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300 text-xs my-6"
      style={{ minHeight: 90 }}
      aria-hidden="true"
    />
  );
}
