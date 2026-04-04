export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  gradient: string;
  icon: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "free-boat-ramps-how-to-find-them",
    title: "Free vs Paid Boat Ramps: How to Find Free Launch Sites in Every State",
    date: "April 4, 2026", readTime: "5 min read", category: "Tips",
    excerpt: "Most boat ramps in America are free. Here's how to find them and avoid surprise fees at the ramp.",
    gradient: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><text x="30" y="38" font-size="28" fill="rgba(255,255,255,0.25)" font-weight="bold">$</text><path d="M40 12v36M32 18h16M32 42h16" stroke="rgba(255,255,255,0.15)" stroke-width="2"/></svg>`,
  },
  {
    slug: "best-bass-fishing-lakes-oklahoma",
    title: "The 7 Best Bass Fishing Lakes in Oklahoma (2026 Guide)",
    date: "April 1, 2026", readTime: "5 min read", category: "Fishing",
    excerpt: "From Grand Lake to Broken Bow — the top Oklahoma lakes for largemouth, smallmouth, and spotted bass.",
    gradient: "linear-gradient(135deg, #1E6091 0%, #2D6A4F 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M15 35c5-8 15-15 25-10s15 5 25-2" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M40 20c3 0 8 3 12 2s6-3 8-2c0 0-2 8-10 8s-10-4-14-3-6 5-6 5" fill="rgba(255,255,255,0.15)"/></svg>`,
  },
  {
    slug: "oklahoma-boating-rules-2026",
    title: "Oklahoma Boating Rules & Regulations You Need to Know (2026)",
    date: "March 28, 2026", readTime: "6 min read", category: "Regulations",
    excerpt: "Registration, safety equipment, BUI laws, GRDA rules, and everything Oklahoma boaters need to know.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><rect x="28" y="12" width="24" height="30" rx="3" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M36 24l4 4 8-8" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    slug: "how-to-launch-boat-beginner-guide",
    title: "How to Launch a Boat: Complete Beginner's Guide for Oklahoma Ramps",
    date: "March 25, 2026", readTime: "7 min read", category: "Beginner Guide",
    excerpt: "Step-by-step guide to backing down the ramp, loading your boat, and ramp etiquette.",
    gradient: "linear-gradient(135deg, #0D9488 0%, #1E6091 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M25 15l15 30h-30z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><path d="M40 45h25" stroke="rgba(255,255,255,0.3)" stroke-width="2"/></svg>`,
  },
  {
    slug: "boat-trailer-maintenance-checklist",
    title: "Boat Trailer Maintenance: The Pre-Season Checklist Every Boater Needs",
    date: "March 22, 2026", readTime: "6 min read", category: "Maintenance",
    excerpt: "Wheel bearings, tires, lights, winch strap, brakes — everything to check before your first launch of the season.",
    gradient: "linear-gradient(135deg, #44403C 0%, #78716C 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="40" cy="30" r="12" stroke="rgba(255,255,255,0.25)" stroke-width="2"/><path d="M40 22v8l6 4" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    slug: "best-boat-ramps-for-kayaks",
    title: "Best Boat Ramps for Kayaks and Small Boats in Oklahoma, Texas & the Midwest",
    date: "March 18, 2026", readTime: "5 min read", category: "Kayaking",
    excerpt: "Not all ramps work for kayaks. Here's what to look for and the best kayak-friendly launches across the region.",
    gradient: "linear-gradient(135deg, #0D9488 0%, #065F46 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M15 35c10-3 20 3 30 0s15-5 20-3" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><line x1="40" y1="15" x2="40" y2="35" stroke="rgba(255,255,255,0.25)" stroke-width="2"/><line x1="32" y1="20" x2="48" y2="20" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/></svg>`,
  },
  {
    slug: "what-to-do-boat-ramp-closed",
    title: "What to Do When a Boat Ramp Is Closed or Damaged",
    date: "March 15, 2026", readTime: "4 min read", category: "Tips",
    excerpt: "Low water, storm damage, or construction? Here's how to find an alternative ramp and avoid wasted trips.",
    gradient: "linear-gradient(135deg, #E76F51 0%, #F4A261 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M40 15l18 30H22z" stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none"/><line x1="40" y1="24" x2="40" y2="35" stroke="rgba(255,255,255,0.35)" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="40" r="1.5" fill="rgba(255,255,255,0.35)"/></svg>`,
  },
  {
    slug: "night-launching-tips",
    title: "Night Launching: How to Launch and Load Your Boat in the Dark",
    date: "March 12, 2026", readTime: "5 min read", category: "Tips",
    excerpt: "Pre-dawn fishing trips and night launches. Essential gear, techniques, and which ramps have lights.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 80%, #312E81 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="55" cy="20" r="8" fill="rgba(255,255,255,0.12)"/><circle cx="55" cy="20" r="6" fill="rgba(255,255,255,0.08)"/><path d="M20 45h40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/><path d="M30 42l10-15 10 15" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/></svg>`,
  },
  {
    slug: "fishing-license-guide-midwest",
    title: "Fishing License Requirements: Oklahoma, Texas, Missouri, Arkansas & Kansas",
    date: "March 8, 2026", readTime: "6 min read", category: "Regulations",
    excerpt: "State-by-state costs, where to buy, age requirements, and reciprocal agreements for border lakes.",
    gradient: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M35 20c2-5 8-5 10 0s-2 8-5 12c-3-4-7-7-5-12z" fill="rgba(255,255,255,0.15)"/><line x1="40" y1="32" x2="40" y2="48" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><circle cx="40" cy="48" r="2" fill="rgba(255,255,255,0.2)"/></svg>`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 2);
}
