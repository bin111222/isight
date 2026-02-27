/**
 * Resolves image URLs. Paths match public/, e.g. "/hero.webp", "/Treatment Images/Lasik/1.webp".
 *
 * - Treatment Images: always same-origin (/) so they load from deployed public/Treatment Images/
 *   when that folder is in the repo (see .gitignore exception).
 * - Other paths: use NEXT_PUBLIC_IMAGE_CDN_BASE or default ImageKit.
 */
const DEFAULT_CDN_BASE = "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public";
const BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_IMAGE_CDN_BASE) ||
  DEFAULT_CDN_BASE;

function encodePathSegments(path: string): string {
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .filter(Boolean)
    .join("/");
}

export function getImageUrl(path: string): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  const encoded = encodePathSegments(clean);
  // Treatment images: always same-origin so they load from deployed public/Treatment Images/
  if (clean.startsWith("Treatment Images/")) {
    return `/${encoded}`;
  }
  const base = BASE.replace(/\/$/, "");
  return `${base}/${encoded}`;
}
