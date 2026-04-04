export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-bass-fishing-lakes-oklahoma",
    title: "The 7 Best Bass Fishing Lakes in Oklahoma (2026 Guide)",
    date: "April 1, 2026",
    readTime: "5 min read",
    category: "Fishing",
    excerpt: "From Grand Lake to Broken Bow — the top Oklahoma lakes for largemouth, smallmouth, and spotted bass, with the best ramps to launch from.",
    gradient: "linear-gradient(135deg, #1E6091 0%, #2D6A4F 100%)",
  },
  {
    slug: "oklahoma-boating-rules-2026",
    title: "Oklahoma Boating Rules & Regulations You Need to Know (2026)",
    date: "March 28, 2026",
    readTime: "6 min read",
    category: "Regulations",
    excerpt: "Registration requirements, safety equipment, BUI laws, GRDA rules, no-wake zones, and everything else Oklahoma boaters need to know.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
  },
  {
    slug: "how-to-launch-boat-beginner-guide",
    title: "How to Launch a Boat: Complete Beginner's Guide for Oklahoma Ramps",
    date: "March 25, 2026",
    readTime: "7 min read",
    category: "Beginner Guide",
    excerpt: "Step-by-step guide to backing down the ramp, loading your boat, and not being THAT person who holds up the line.",
    gradient: "linear-gradient(135deg, #0D9488 0%, #1E6091 100%)",
  },
];

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 2);
}
