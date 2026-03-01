"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { X, Phone, MessageCircle, ArrowRight } from "lucide-react";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;
/** Same-origin so fallback loads when CDN fails */
const FALLBACK_IMAGE = "/hero.webp";

type ClinicBrickGalleryProps = {
  images: readonly string[];
};

export default function ClinicBrickGallery({ images }: ClinicBrickGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const close = useCallback(() => {
    setSelected(null);
    setModalSrc(null);
  }, []);

  useEffect(() => {
    if (selected) setModalSrc(selected);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <>
      {/* Masonry: CSS columns so each image keeps natural aspect ratio, no stretched strips */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setSelected(src)}
            className="group block w-full break-inside-avoid mb-3 sm:mb-4 rounded-xl overflow-hidden bg-silver-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-lg hover:ring-2 hover:ring-clinical-400/50 hover:ring-offset-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-500 focus-visible:ring-offset-2 text-left"
          >
            {/* Native img so height is natural — no fixed grid rows, no distortion */}
            <span className="block relative w-full overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`iSight Eye Care clinic, view ${i + 1}`}
                className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src !== FALLBACK_IMAGE) el.src = FALLBACK_IMAGE;
                }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Modal — scrollable on mobile to prevent overlap */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="View clinic image"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Content card — scrollable on mobile */}
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col sm:flex-row rounded-2xl overflow-y-auto overflow-x-hidden shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Rich gradient base — behind content */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-tr from-clinical-500/25 via-transparent to-transparent pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-bl from-clinical-400/15 via-transparent to-transparent pointer-events-none z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[50%] bg-clinical-500/20 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-navy-700/30 rounded-full blur-2xl pointer-events-none z-0" />

            {/* Image area — capped height on mobile to avoid overlap */}
            <div className="relative flex-shrink-0 flex-1 flex items-center justify-center min-h-[200px] min-w-0 sm:min-w-[280px] p-3 sm:p-6 z-10">
              <div className="relative w-full max-w-2xl aspect-[4/3] max-h-[50vh] sm:max-h-none rounded-xl overflow-hidden bg-navy-950/50 shadow-inner">
                {modalSrc && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={modalSrc}
                    alt="iSight Eye Care clinic"
                    className="absolute inset-0 w-full h-full object-contain"
                    onError={() => setModalSrc(FALLBACK_IMAGE)}
                  />
                )}
              </div>
            </div>

            {/* Side panel — iSight branding + CTA */}
            <div className="relative flex flex-col justify-between w-full sm:w-80 lg:w-96 flex-shrink-0 p-4 sm:p-8 bg-gradient-to-b from-navy-900/98 via-navy-950/95 to-navy-950 border-t sm:border-t-0 sm:border-l border-white/10 z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-clinical-500/5 to-transparent pointer-events-none rounded-b-2xl sm:rounded-r-2xl sm:rounded-b-none z-0" />
              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-clinical-400">
                  Our spaces
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-2">
                  iSight Eye Care
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Khar & Dadar · NABH accredited
                </p>
                <p className="text-white/70 text-sm mt-3 leading-relaxed">
                  Modern equipment, comfortable spaces, and a team dedicated to your vision.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-3">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-clinical-400/90">
                  Book a visit
                </span>
                <a
                  href={`tel:+${PHONE}`}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-clinical-500 to-clinical-400 text-white font-semibold shadow-lg shadow-clinical-500/25 hover:shadow-clinical-400/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" strokeWidth={2.25} />
                  Call {PHONE_DISPLAY}
                  <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2.25} />
                  WhatsApp
                </a>
                <Link
                  href="/consult"
                  className="block text-center text-sm text-clinical-300 hover:text-clinical-200 font-medium transition-colors"
                >
                  View consult page →
                </Link>
              </div>
            </div>
          </div>

          {/* Close button — above card on mobile */}
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[60] p-2 rounded-full bg-navy-900/90 hover:bg-navy-800/90 text-white backdrop-blur-sm border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </>
  );
}
