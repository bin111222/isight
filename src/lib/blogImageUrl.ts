/** Same ImageKit public path as site images (NEXT_PUBLIC_IMAGE_CDN_BASE). Blog images at {base}/blog/ */
const IMAGE_CDN_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_IMAGE_CDN_BASE) ||
  "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public";
const BASE = IMAGE_CDN_BASE.replace(/\/$/, "") + "/blog";

/**
 * Returns the full image URL for a blog post. Pass the slug only (e.g. "cataract-surgery-cost-mumbai").
 * Returns "" when slug is missing or undefined.
 */
export function getBlogImageUrl(slug: string | undefined): string {
  if (!slug) return "";
  const clean = slug.replace(/\.(webp|png|jpg|jpeg)$/i, "");
  return `${BASE}/${clean}.webp`;
}
