/**
 * Resolves blog hero image URL from slug so the repo only stores the slug.
 * Set NEXT_PUBLIC_BLOG_IMAGE_BASE in env, or it falls back to the current ImageKit path.
 */
const BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BLOG_IMAGE_BASE) ||
  "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public/blog";

/**
 * Returns the full image URL for a blog post. Pass the slug only (e.g. "cataract-surgery-cost-mumbai").
 */
export function getBlogImageUrl(slug: string): string {
  if (!slug) return "";
  const clean = slug.replace(/\.(webp|png|jpg|jpeg)$/i, "");
  const base = BASE.replace(/\/$/, "");
  return `${base}/${clean}.webp`;
}
