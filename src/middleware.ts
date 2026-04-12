import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Must match `SITE_URL` in `src/lib/sitemap.ts` (canonical hostname). */
const CANONICAL_HOST = "www.eyesurgeonmumbai.com";

function isLocalhost(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".local") ||
    host.includes("localhost")
  );
}

/** Only enforce redirects for the live site hostnames (not Vercel previews, etc.). */
function isProductionEyesurgeonHost(host: string): boolean {
  return host === CANONICAL_HOST || host === "eyesurgeonmumbai.com";
}

export function middleware(request: NextRequest) {
  const rawHost = request.headers.get("host") ?? "";
  const host = rawHost.split(":")[0]?.toLowerCase() ?? "";

  if (isLocalhost(host)) {
    return NextResponse.next();
  }

  if (!isProductionEyesurgeonHost(host)) {
    return NextResponse.next();
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttps =
    forwardedProto === "https" ||
    (forwardedProto === null && request.nextUrl.protocol === "https:");

  const needsWww = host !== CANONICAL_HOST;
  const needsHttps = !isHttps;

  if (!needsWww && !needsHttps) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and common static files so middleware stays cheap.
     * HTTP clients still get 301 on HTML routes; assets load over HTTPS after first navigation.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|webp|gif|woff2?|ttf|txt|json)$).*)",
  ],
};
