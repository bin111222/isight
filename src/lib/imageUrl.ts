/**
 * Resolves image URLs from the CDN. Paths match public/, e.g. "/hero.webp", "/clinic/DSC04995.webp".
 * Set NEXT_PUBLIC_IMAGE_CDN_BASE in env (local and production); otherwise falls back to ImageKit
 * so images still work when public/ is not deployed (e.g. public is gitignored).
 * Path segments are encoded once here so CDN URLs are valid and not double-encoded.
 */
const BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_IMAGE_CDN_BASE) ||
  "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public";

function encodePathSegments(path: string): string {
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .filter(Boolean)
    .join("/");
}

export function getImageUrl(path: string): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  const base = BASE.replace(/\/$/, "");
  const encoded = encodePathSegments(clean);
  return `${base}/${encoded}`;
}
