import { getImageUrl } from "@/lib/imageUrl";

/**
 * Optional images for the "Understand Your Eye" section.
 * Add paths here when you generate custom layers; leave empty string to use SVG only.
 *
 * Suggested assets (place in public/eye-diagram/):
 *   - base.webp   → full eye diagram background
 *   - cornea.webp             → cornea layer or info-panel illustration
 *   - lens.webp
 *   - retina.webp
 *   - optic-nerve.webp
 */
const EYE_DIAGRAM_PATHS = {
  base: "/eye-diagram/base.webp",
  parts: {
    cornea: "/eye-diagram/cornea.webp",
    lens: "/eye-diagram/lens.webp",
    retina: "/eye-diagram/retina.webp",
    "optic-nerve": "/eye-diagram/optic-nerve.webp",
  } as Record<string, string>,
};

export function getEyePartImage(partId: string): string {
  const path = EYE_DIAGRAM_PATHS.parts[partId];
  return path ? getImageUrl(path) : "";
}

export function getEyeDiagramBase(): string {
  return getImageUrl(EYE_DIAGRAM_PATHS.base);
}
