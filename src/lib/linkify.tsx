import Link from "next/link";

const SITE_ORIGIN = "https://www.eyesurgeonmumbai.com";

/** Markdown [label](url) or a bare http(s) URL. Stops at space, closing paren/quote, or end. */
const TOKEN_REGEX =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s)\]>"']+/g;
const TRAILING_PUNCTUATION_REGEX = /[.,;:!?]+$/;

function getPathname(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.origin === SITE_ORIGIN && u.pathname.startsWith("/")) return u.pathname;
    return null;
  } catch {
    return null;
  }
}

function stripTrailingPunctuation(rawUrl: string): { url: string; trailing: string } {
  const trailing = rawUrl.match(TRAILING_PUNCTUATION_REGEX)?.[0] ?? "";
  return {
    url: trailing ? rawUrl.slice(0, -trailing.length) : rawUrl,
    trailing,
  };
}

function labelFromPathname(pathname: string): string {
  if (pathname === "/") return "Home";
  return pathname
    .replace(/^\//, "")
    .replace(/^post\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export type LinkifiedProps = {
  text: string;
  className?: string;
  /** Link class for internal/external links */
  linkClassName?: string;
};

type LinkPart = { url: string; pathname: string | null; label: string };

/**
 * Renders text with markdown links and bare URLs turned into clickable links.
 * Internal (eyesurgeonmumbai.com) URLs become Next.js Link; external become <a target="_blank" rel="noopener">.
 */
export function LinkifiedText({ text, className, linkClassName }: LinkifiedProps) {
  const parts: (string | LinkPart)[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(TOKEN_REGEX.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }

    if (m[1] && m[2]) {
      const url = m[2];
      parts.push({
        url,
        pathname: getPathname(url),
        label: m[1],
      });
    } else {
      const { url, trailing } = stripTrailingPunctuation(m[0]);
      const pathname = getPathname(url);
      parts.push({
        url,
        pathname,
        label: pathname ? labelFromPathname(pathname) : url,
      });
      if (trailing) parts.push(trailing);
    }

    lastIndex = m.index + m[0].length;
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
        const { url, pathname, label } = part;
        const cls = linkClassName ?? defaultLinkClass;
        if (pathname) {
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
            {label}
          </a>
        );
      })}
    </span>
  );
}
