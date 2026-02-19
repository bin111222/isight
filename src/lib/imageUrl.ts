/**
 * Resolves image URLs from the CDN when configured via env.
 * The base URL is never hardcoded – set it in .env only (do not commit).
 * Paths are the same as under public/, e.g. "/hero.webp", "/clinic/DSC04995.webp".
 */
const BASE = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_IMAGE_CDN_BASE : "";

export function getImageUrl(path: string): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  if (!BASE) return "/" + clean;
  const base = BASE.replace(/\/$/, "");
  return `${base}/${clean}`;
}
