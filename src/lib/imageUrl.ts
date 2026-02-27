/**
 * Resolves image URLs from the CDN. Paths match public/, e.g. "/hero.webp", "/clinic/DSC04995.webp".
 * Set NEXT_PUBLIC_IMAGE_CDN_BASE in env (local and production); otherwise falls back to ImageKit
 * so images still work when public/ is not deployed (e.g. public is gitignored).
 */
const BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_IMAGE_CDN_BASE) ||
  "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public";

export function getImageUrl(path: string): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  const base = BASE.replace(/\/$/, "");
  return `${base}/${clean}`;
}
