/**
 * Editorial content structure. No articles are fabricated before the client
 * supplies approved text, images, dates and claims.
 */
export type BlogCategory = "Coffee" | "Food" | "Cafe News" | "Events";
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  image: string;
  datePublished: string;
  content: string[];
};

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  "Coffee", "Food", "Cafe News", "Events",
];

/** Approved posts only. Add real content when the café provides it. */
export const BLOG_POSTS: readonly BlogPost[] = [];

export function filterBlogPosts(category: BlogCategory | "All"): BlogPost[] {
  const posts = category === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((item) => item.category === category);
  return [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
