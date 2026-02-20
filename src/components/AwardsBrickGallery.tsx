"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { X, Award, ArrowRight } from "lucide-react";

type AwardsBrickGalleryProps = {
  images: readonly string[];
  altPrefix: string;
  columns?: string;
};

export default function AwardsBrickGallery({
  images,
  altPrefix,
  columns = "columns-2 sm:columns-3 lg:columns-4",
}: AwardsBrickGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const close = useCallback(() => setSelected(null), []);

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
      <div className={`${columns} gap-3 sm:gap-4`}>
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setSelected(src)}
            className="group block w-full break-inside-avoid mb-3 sm:mb-4 rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(10,15,26,0.15)] hover:ring-clinical-200/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-500 focus-visible:ring-offset-2 text-left"
          >
            <span className="block w-full overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="View award"
        >
          <div
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          {/* Content card — scrollable on mobile so image + panel don't overlap */}
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col sm:flex-row rounded-2xl overflow-y-auto overflow-x-hidden shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient base — behind content */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-tr from-clinical-500/25 via-transparent to-transparent pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-bl from-clinical-400/15 via-transparent to-transparent pointer-events-none z-0" />

            {/* Image area — capped height on mobile to avoid overlap */}
            <div className="relative flex-shrink-0 flex-1 flex items-center justify-center min-h-[200px] min-w-0 sm:min-w-[280px] p-3 sm:p-6 z-10">
              <div className="relative w-full max-w-2xl flex items-center justify-center max-h-[50vh] sm:max-h-none">
                <img
                  src={selected}
                  alt={altPrefix}
                  className="max-w-full max-h-[48vh] sm:max-h-[85vh] w-auto h-auto object-contain rounded-xl"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            {/* Side panel — Dr. Nikhil */}
            <div className="relative flex flex-col justify-between w-full sm:w-80 lg:w-96 flex-shrink-0 p-4 sm:p-8 bg-gradient-to-b from-navy-900/98 via-navy-950/95 to-navy-950 border-t sm:border-t-0 sm:border-l border-white/10 z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-clinical-500/5 to-transparent pointer-events-none rounded-b-2xl sm:rounded-r-2xl sm:rounded-b-none z-0" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-clinical-400">
                  <Award className="w-3.5 h-3.5" strokeWidth={2} aria-hidden />
                  Recognised excellence
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-2">
                  Dr. Nikhil Nasta
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Founder, iSight Eye Care · Over 15 years of experience
                </p>
                <p className="text-white/70 text-sm mt-3 leading-relaxed">
                  Award-winning ophthalmologist with expertise in cataract, glaucoma, refractive surgery, and paediatric eye care. Dr. Nasta founded iSight to bring quality, affordable eye care to Mumbai—with centres in Khar and Dadar and a team dedicated to your vision.
                </p>
                <p className="text-white/60 text-xs mt-3 leading-relaxed">
                  M.S. Ophthalmology · D.N.B. · ICO certified · Pfizer Gold Medallion · Mumbai University honours
                </p>
              </div>
              <div className="mt-6 sm:mt-8 relative">
                <Link
                  href="/isight-eye-care-doctors"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-clinical-300 hover:text-clinical-200 transition-colors"
                >
                  More about Dr. Nikhil
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>

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
