import Link from "next/link";

const SITE_ORIGIN = "https://www.eyesurgeonmumbai.com";

/** Matches http(s) URLs. Stops at space, closing paren/quote, or end. */
const URL_REGEX = /https?:\/\/[^\s)\]>"']+/g;

function getPathname(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.origin === SITE_ORIGIN && u.pathname.startsWith("/")) return u.pathname;
    return null;
  } catch {
    return null;
  }
}

export type LinkifiedProps = {
  text: string;
  className?: string;
  /** Link class for internal/external links */
  linkClassName?: string;
};

/**
 * Renders text with URLs turned into clickable links.
 * Internal (eyesurgeonmumbai.com) URLs become Next.js Link; external become <a target="_blank" rel="noopener">.
 */
export function LinkifiedText({ text, className, linkClassName }: LinkifiedProps) {
  const parts: (string | { url: string; pathname: string | null })[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(URL_REGEX.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }
    const url = m[0];
    const pathname = getPathname(url);
    parts.push({ url, pathname });
    lastIndex = m.index + url.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  const defaultLinkClass =
    "text-clinical-500 underline underline-offset-2 hover:text-clinical-600";

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (typeof part === "string") {
          return <span key={i}>{part}</span>;
        }
        const { url, pathname } = part;
        const cls = linkClassName ?? defaultLinkClass;
        if (pathname) {
          const label =
            pathname === "/"
              ? "Home"
              : pathname
                  .replace(/^\//, "")
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <Link key={i} href={pathname} className={cls}>
              {label}
            </Link>
          );
        }
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
          >
            {url}
          </a>
        );
      })}
    </span>
  );
}
