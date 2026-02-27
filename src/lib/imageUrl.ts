/**
 * Resolves image URLs. Paths match public/, e.g. "/hero.webp", "/Treatment Images/Lasik/1.webp".
 * Uses NEXT_PUBLIC_IMAGE_CDN_BASE or default ImageKit. Path segments are encoded for CDN URLs.
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
  const base = BASE.replace(/\/$/, "");
  return `${base}/${encoded}`;
}
