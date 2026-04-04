import Link from "next/link";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

const post = getBlogPostBySlug("what-to-do-boat-ramp-closed")!;

export const metadata: Metadata = {
  title: `${post.title} | RampSeeker`,
  description: post.excerpt,
  keywords: "boat ramp closed, boat ramp closed near me, alternative boat ramp",
  openGraph: { title: post.title, url: `https://rampseeker.com/blog/${post.slug}` },
  alternates: { canonical: `https://rampseeker.com/blog/${post.slug}` },
};

export default function Post() {
  const related = getRelatedPosts(post.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: "2026-03-15", author: { "@type": "Organization", name: "RampSeeker Team" }, publisher: { "@type": "Organization", name: "RampSeeker", url: "https://rampseeker.com" } }) }} />

      <div className="rounded-xl overflow-hidden mb-8" style={{ background: post.gradient }}>
        <div className="px-6 py-10 md:py-14">
          <nav className="text-sm text-white/60 mb-4 flex gap-2"><Link href="/" className="hover:text-white transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-white transition">Blog</Link><span>/</span><span className="text-white/80">Ramp Closures</span></nav>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-full">{post.category}</span>
          <h1 className="font-[Cabin] text-2xl md:text-4xl font-bold text-white mt-3 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">{post.date} &middot; {post.readTime} &middot; RampSeeker Team</p>
        </div>
      </div>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>You&apos;ve hitched the trailer, packed the cooler, driven 45 minutes to the lake, and pulled into the parking lot — only to find a gate across the ramp with a &quot;CLOSED&quot; sign. <strong className="text-charcoal">Few things in boating are more frustrating than arriving at a closed ramp with no backup plan.</strong> It happens more often than you&apos;d think, especially during spring flooding, summer droughts, and the off-season.</p>
        <p>The key is knowing why ramps close, how to check before you drive, and what to do when your Plan A falls through.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Why Boat Ramps Close</h2>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Low Water Levels</h3>
        <p>This is the number one reason ramps close, especially in the late summer and fall. When lake levels drop below normal pool elevation, the concrete slab of the ramp may no longer reach the water. What was a perfectly good two-lane ramp in June becomes a dry concrete pad 30 feet from the waterline by September. Lakes managed by the Army Corps of Engineers publish daily lake level reports — if the level is more than 3-4 feet below normal pool, expect some ramps to be out of service.</p>
        <p>Drought years hit particularly hard. In 2022 and 2023, multiple ramps on Texas lakes were completely high and dry for months. Oklahoma lakes like <Link href="/oklahoma/lakes/grand-lake" className="text-water hover:underline">Grand Lake</Link> and <Link href="/oklahoma/lakes/tenkiller-ferry-lake" className="text-water hover:underline">Tenkiller</Link> can also be affected when the Corps draws down water levels for flood control or power generation.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Storm Damage and Flooding</h3>
        <p>On the opposite end, heavy rains and flooding can close ramps by submerging them under several feet of water. The parking lot floods, the courtesy dock floats away, and debris collects on the ramp surface. Even after the water recedes, ramps may stay closed while crews clear mud, silt, and debris. A single major storm can knock out ramps for days or weeks.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Construction and Renovation</h3>
        <p>Ramp improvements are a good thing — new concrete, additional lanes, better docks — but the construction period means closures. State parks and Corps of Engineers facilities sometimes close ramps for weeks or months during renovation. These are usually announced in advance, but the announcements don&apos;t always reach everyone who needs to know.</p>

        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mt-8">Seasonal Closures</h3>
        <p>Some ramps close for the off-season, typically November through March. State parks may gate access roads to certain ramps during winter when staffing is reduced. County ramps in remote areas sometimes close when the road isn&apos;t maintained in winter. This is more common in <Link href="/kansas" className="text-water hover:underline">Kansas</Link> and northern <Link href="/missouri" className="text-water hover:underline">Missouri</Link> where winter conditions are harsher.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Check Before You Drive</h2>
        <p>A few minutes of research before you leave the house can save you a wasted trip:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Call ahead.</strong> The single most reliable method. Call the park office, marina, or managing agency. State park offices answer the phone, and the staff knows exactly which ramps are open. It takes two minutes and saves you two hours.</li>
          <li><strong className="text-charcoal">State park and Corps of Engineers websites.</strong> Most agencies post closure notices on their websites. The Corps of Engineers lake pages list current conditions and any facility closures. State park websites usually have alerts on the specific park&apos;s page.</li>
          <li><strong className="text-charcoal">Google Maps recent reviews.</strong> Search the ramp on Google Maps and check the most recent reviews. Boaters are remarkably good about posting &quot;ramp closed as of [date]&quot; or &quot;water too low to launch&quot; in their reviews. Sort by &quot;Most Recent&quot; for current conditions.</li>
          <li><strong className="text-charcoal">Social media and fishing forums.</strong> Local Facebook fishing groups are goldmines for real-time ramp information. Search &quot;[lake name] ramp&quot; and you&apos;ll often find posts from people who were just there.</li>
          <li><strong className="text-charcoal">Lake level data.</strong> Check the current lake level against normal pool elevation. If it&apos;s significantly below normal, call to confirm your ramp is still usable. The USACE and state agencies publish daily lake levels online.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Finding an Alternative Ramp with RampSeeker</h2>
        <p>When your go-to ramp is closed, RampSeeker helps you find the next-closest option. Search by lake to see all available ramps — most lakes have multiple access points, and when one is closed, another is usually open. On large lakes like Grand Lake, Lake Texoma, or <Link href="/missouri/lakes/lake-of-the-ozarks" className="text-water hover:underline">Lake of the Ozarks</Link>, there can be a dozen or more ramps spread around the shoreline. Your closed ramp might add 15 minutes of driving to reach an alternative, but at least you&apos;re getting on the water.</p>
        <p>Always have a Plan B. Before any lake trip, identify at least two ramps on the lake you&apos;re visiting. If the first one is gated, you can redirect immediately instead of scrambling on your phone in the parking lot.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">What NOT to Do When a Ramp Is Closed</h2>
        <p>Frustration leads to bad decisions. Here&apos;s what to avoid:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">Don&apos;t launch on a closed ramp.</strong> If a ramp is gated or signed as closed, there&apos;s a reason. Launching on a closed ramp can damage your trailer (broken concrete, hidden debris under water), damage your boat, or get you a citation. Some closures exist because the ramp surface has collapsed or shifted — you won&apos;t see the damage until your trailer drops into a hole.</li>
          <li><strong className="text-charcoal">Don&apos;t create your own launch site.</strong> Driving through a field or down an embankment to reach the water is illegal on public land and can result in fines, trespassing charges, and environmental damage. It also tears up the shoreline for everyone else.</li>
          <li><strong className="text-charcoal">Don&apos;t block the closed ramp area.</strong> Even if you&apos;re not launching, parking in a closed ramp lot can interfere with maintenance crews or emergency access. Move on to your backup plan.</li>
          <li><strong className="text-charcoal">Don&apos;t assume it&apos;s temporary.</strong> &quot;I&apos;ll just wait an hour&quot; rarely works. If a ramp is closed due to water levels or construction, it&apos;s not opening today. Cut your losses and drive to the alternative.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Reporting Damaged or Closed Ramps</h2>
        <p>If you arrive at a ramp that&apos;s damaged but not officially closed — broken concrete, missing dock, submerged hazards — report it. Contact the managing agency (state park, Corps of Engineers, city parks department) and describe what you found. This helps other boaters and speeds up repairs.</p>
        <p>You can also leave a Google Maps review with current conditions. The boating community relies on shared information, and your five-minute review might save someone else a wasted trip next weekend.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Plan Ahead, Launch Every Time</h2>
        <p>Boat ramp closures are a fact of life, but they don&apos;t have to ruin your day on the water. Build the habit of checking conditions before you leave, always have a backup ramp in mind, and use <Link href="/oklahoma" className="text-water hover:underline">RampSeeker&apos;s state pages</Link> to find every available launch on your lake. Whether you&apos;re fishing <Link href="/texas" className="text-water hover:underline">Texas</Link> reservoirs, <Link href="/arkansas" className="text-water hover:underline">Arkansas</Link> tailwaters, or <Link href="/kansas" className="text-water hover:underline">Kansas</Link> prairie lakes, a little preparation goes a long way.</p>

        <BlogCletusCallout />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-4">More from the Blog</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-20" style={{ background: p.gradient }} />
              <div className="p-4">
                <span className="text-[10px] font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{p.category}</span>
                <h4 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm mt-2 line-clamp-2">{p.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{p.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
