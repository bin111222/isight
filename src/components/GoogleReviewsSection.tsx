"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { HOMEPAGE_TESTIMONIALS } from "@/data/homepageTestimonials";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/WBCWnwJDfNRdPGuy7";

export default function GoogleReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollEdges();
    el.addEventListener("scroll", updateScrollEdges, { passive: true });
    const ro = new ResizeObserver(updateScrollEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollEdges);
      ro.disconnect();
    };
  }, [updateScrollEdges]);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-silver-100 py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                What Our Patients Say
              </h2>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-colors shrink-0"
                aria-label="See our Google rating"
              >
                <span className="text-amber-500">★★★★★</span>
                <span>4.9 · Google</span>
              </a>
            </div>
            <p className="mt-2 text-navy-600">
              Real stories from iSight Eye Care. Read more on Google.
            </p>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-silver-200 shadow-sm hover:shadow-md hover:border-clinical-500/30 transition-all text-navy-800 font-medium shrink-0"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>See our Google reviews</span>
            <ExternalLink className="w-4 h-4 text-navy-500 shrink-0" aria-hidden />
          </a>
        </div>

        <p className="mt-6 text-sm text-navy-500">
          Use the arrows to move left and right, or scroll the row on a trackpad or touchscreen.
        </p>

        <div className="mt-4 flex flex-row items-stretch gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Scroll reviews left"
            disabled={!canScrollLeft}
            onClick={() => scrollByDirection("left")}
            className="shrink-0 self-center flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-silver-200 bg-white text-navy-800 shadow-sm transition-all hover:border-clinical-500/30 hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>

          <div
            ref={scrollRef}
            dir="ltr"
            className="min-w-0 flex-1 flex flex-row gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-gutter:stable]"
            role="list"
            aria-label="Patient testimonials"
          >
            {HOMEPAGE_TESTIMONIALS.map((t, i) => (
              <blockquote
                key={i}
                role="listitem"
                className="relative shrink-0 w-72 sm:w-80 snap-start rounded-2xl bg-white p-6 sm:p-7 border border-silver-200/80 shadow-soft hover-lift"
              >
                <span className="absolute top-5 left-6 text-4xl text-clinical-200/50 font-serif leading-none">
                  "
                </span>
                <p className="relative text-navy-700 leading-relaxed pt-4">
                  {t.quote}
                </p>
                <footer className="mt-6 font-semibold text-navy-900">
                  - {t.author}
                </footer>
              </blockquote>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll reviews right"
            disabled={!canScrollRight}
            onClick={() => scrollByDirection("right")}
            className="shrink-0 self-center flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-silver-200 bg-white text-navy-800 shadow-sm transition-all hover:border-clinical-500/30 hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        </div>

        <p className="mt-8 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-clinical-500 font-semibold hover:text-clinical-400 transition-colors"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
