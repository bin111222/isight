const DEFAULT_MAX_TITLE_LENGTH = 65;

/**
 * Keep HTML title tags within SEO-safe limits while preserving readability.
 */
export function clampTitleTag(title: string, maxLength = DEFAULT_MAX_TITLE_LENGTH): string {
  const normalized = title.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const softCut = normalized.slice(0, maxLength);
  const lastSpaceIndex = softCut.lastIndexOf(" ");
  const cutIndex = lastSpaceIndex >= maxLength * 0.6 ? lastSpaceIndex : maxLength;

  return softCut
    .slice(0, cutIndex)
    .replace(/[|,;:!?.\-–—\s]+$/g, "")
    .trim();
}
