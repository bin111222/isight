"use client";

import Image from "next/image";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/imageUrl";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;

type BookAppointmentCTAVariant = "card" | "fullBleed";

type BookAppointmentCTAProps = {
  variant?: BookAppointmentCTAVariant;
  showWhatsApp?: boolean;
  subtitle?: string;
  priority?: boolean;
};

const DEFAULT_SUBTITLE_CARD = "Khar & Dadar · NABH accredited";
const DEFAULT_SUBTITLE_FULL = "Khar & Dadar, Mumbai. Call or WhatsApp to schedule.";

export default function BookAppointmentCTA({
  variant = "card",
  showWhatsApp = false,
  subtitle,
  priority = false,
}: BookAppointmentCTAProps) {
  const isFullBleed = variant === "fullBleed";
  const resolvedSubtitle =
    subtitle ?? (isFullBleed ? DEFAULT_SUBTITLE_FULL : DEFAULT_SUBTITLE_CARD);

  return (
    <div
      className={
        isFullBleed
          ? "relative overflow-hidden py-14 sm:py-16 lg:py-20"
          : "max-w-6xl mx-auto px-4 sm:px-6"
      }
    >
      <div
        className={
          "relative overflow-hidden flex flex-col lg:flex-row min-h-[320px] sm:min-h-[340px] lg:min-h-[280px] text-white " +
          (isFullBleed ? "" : "rounded-2xl shadow-soft ring-1 ring-black/5")
        }
      >
        {/* Image side – doctor visible; gradient only where it meets content */}
        <div className="relative w-full lg:w-[48%] min-h-[200px] sm:min-h-[240px] lg:min-h-full order-2 lg:order-1">
          <Image
            src={getImageUrl("/hero.webp")}
            alt=""
            fill
            className="object-cover object-[center_28%]"
            sizes={isFullBleed ? "50vw" : "(max-width: 1024px) 100vw, 550px"}
            priority={priority}
          />
          {/* Gradient: clear on left (face), dark only toward content */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-900/40 to-navy-900/88 lg:from-transparent lg:via-navy-900/30 lg:to-navy-900"
            aria-hidden
          />
          {/* Subtle vignette on image side only */}
          <div
            className="absolute inset-0 shadow-[inset_-80px_0_100px_-40px_rgba(0,0,0,0.4)] lg:shadow-[inset_-120px_0_120px_-50px_rgba(0,0,0,0.5)]"
            aria-hidden
          />
        </div>

        {/* Content panel – never covers face */}
        <div className="relative flex-1 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10 order-1 lg:order-2 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800">
          {/* Accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-clinical-500 via-clinical-400 to-clinical-500/70 rounded-r-full opacity-95" aria-hidden />

          <div className="relative z-10 pl-4 sm:pl-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-clinical-400 mb-4">
              Schedule a visit
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[2rem] leading-tight text-white max-w-md">
              Book an appointment with Dr. Nikhil Nasta
            </h2>
            {resolvedSubtitle && (
              <p className="mt-3 text-white/80 text-sm sm:text-base max-w-sm leading-relaxed">
                {resolvedSubtitle}
              </p>
            )}

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`tel:+${PHONE}`}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-clinical-500 hover:bg-clinical-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(45,90,158,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(92,139,201,0.45)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" strokeWidth={2.25} />
                Call {PHONE_DISPLAY}
                <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" strokeWidth={2.5} />
              </a>
              {showWhatsApp && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/8 hover:bg-white/14 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/35 backdrop-blur-sm"
                >
                  <MessageCircle className="w-4 h-4 opacity-90" strokeWidth={2.25} />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
