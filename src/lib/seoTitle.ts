const DEFAULT_MAX_TITLE_LENGTH = 65;
const DEFAULT_MIN_TITLE_LENGTH = 30;

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

/**
 * Expand very short titles with a branded suffix, then enforce max length.
 */
export function formatTitleTag(
  title: string,
  {
    minLength = DEFAULT_MIN_TITLE_LENGTH,
    maxLength = DEFAULT_MAX_TITLE_LENGTH,
    suffix = " | iSight Eye Care Mumbai",
  }: {
    minLength?: number;
    maxLength?: number;
    suffix?: string;
  } = {},
): string {
  const normalized = title.replace(/\s+/g, " ").trim();
  if (normalized.length >= minLength) return clampTitleTag(normalized, maxLength);
  return clampTitleTag(`${normalized}${suffix}`, maxLength);
}
