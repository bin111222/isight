/** Blog images: use CDN when NEXT_PUBLIC_IMAGE_CDN_BASE is set, else same-origin /blog/ */
const CDN_BASE =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_IMAGE_CDN_BASE : undefined;

/**
 * Returns the full image URL for a blog post. Pass the slug only (e.g. "cataract-surgery-cost-mumbai").
 * Returns "" when slug is missing or undefined.
 */
export function getBlogImageUrl(slug: string | undefined): string {
  if (!slug) return "";
  const clean = slug.replace(/\.(webp|png|jpg|jpeg)$/i, "");
  if (CDN_BASE) {
    const base = CDN_BASE.replace(/\/$/, "") + "/blog";
    return `${base}/${clean}.webp`;
  }
  return `/blog/${clean}.webp`;
}
