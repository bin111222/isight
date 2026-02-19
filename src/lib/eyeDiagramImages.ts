/**
 * Optional images for the "Understand Your Eye" section.
 * Add paths here when you generate custom layers; leave empty string to use SVG only.
 *
 * Suggested assets (place in public/eye-diagram/):
 *   - base.webp or base.png   → full eye diagram background
 *   - cornea.webp             → cornea layer or info-panel illustration
 *   - lens.webp
 *   - retina.webp
 *   - optic-nerve.webp
 */
export const EYE_DIAGRAM_IMAGES = {
  /** Full diagram background (same aspect as SVG viewBox ~100x100). Optional. */
  base: "/eye-diagram/base.webp",
  /** Per-part images shown in the info panel when that part is selected. Optional. */
  parts: {
    cornea: "/eye-diagram/cornea.webp",
    lens: "/eye-diagram/lens.webp",
    retina: "/eye-diagram/retina.webp",
    "optic-nerve": "/eye-diagram/optic-nerve.webp",
  } as Record<string, string>,
};

export function getEyePartImage(partId: string): string {
  return EYE_DIAGRAM_IMAGES.parts[partId] ?? "";
}

export function getEyeDiagramBase(): string {
  return EYE_DIAGRAM_IMAGES.base;
}
