/**
 * Resolves image URLs. Paths match public/, e.g. "/hero.webp", "/Treatment Images/Lasik/1.webp".
 *
 * - When NEXT_PUBLIC_IMAGE_CDN_BASE is set: returns full CDN URL (path segments encoded).
 * - When not set: returns same-origin path so Next serves from public/ (avoids 404s when
 *   treatment images exist in public/ but are not yet on ImageKit).
 */
const CDN_BASE =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_IMAGE_CDN_BASE : undefined;

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
  if (CDN_BASE) {
    const base = CDN_BASE.replace(/\/$/, "");
    return `${base}/${encoded}`;
  }
  return `/${encoded}`;
}
