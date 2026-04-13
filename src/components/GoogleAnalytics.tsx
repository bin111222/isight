"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function normalizeMeasurementId(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim().replace(/^['"]+|['"]+$/g, "");
  return /^G-[A-Z0-9]+$/i.test(trimmed) ? trimmed : null;
}

const measurementId =
  normalizeMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) ||
  normalizeMeasurementId(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) ||
  "G-VS8X68FBJL";

function trackPageView(url: string) {
  if (!measurementId || typeof window.gtag !== "function") return;
  window.gtag("config", measurementId, { page_path: url });
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const query = typeof window !== "undefined" ? window.location.search.slice(1) : "";
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
