"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import TreatmentCardImage from "@/components/TreatmentCardImage";
import HeroSequenceBackground from "@/components/HeroSequenceBackground";
import { Phone, MessageCircle, Stethoscope, ClipboardList, ArrowRight } from "lucide-react";
import CountUpStat from "@/components/CountUpStat";
import UnderstandYourEye from "@/components/UnderstandYourEye";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import { BlogFAQAccordion, type FAQItem } from "@/components/ui/blog-faq-accordion";
import { TREATMENT_LINKS } from "@/lib/sitemap";
import { getImageUrl } from "@/lib/imageUrl";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;
const FALLBACK_IMAGE = getImageUrl("/hero.webp");
const FIRST_FRAME_SRC = getImageUrl("/homesequence2/ezgif-frame-001.jpg");
/** Desktop + fine pointer only — mobile sticky scroll-sequences feel broken and waste data. */
const SEQUENCE_MQ = "(pointer: fine) and (min-width: 768px)";
const REDUCE_MOTION_MQ = "(prefers-reduced-motion: reduce)";

function subscribeSequencePreference(onChange: () => void) {
  const sequenceMq = window.matchMedia(SEQUENCE_MQ);
  const motionMq = window.matchMedia(REDUCE_MOTION_MQ);
  sequenceMq.addEventListener("change", onChange);
  motionMq.addEventListener("change", onChange);
  const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
  connection?.addEventListener?.("change", onChange);
  return () => {
    sequenceMq.removeEventListener("change", onChange);
    motionMq.removeEventListener("change", onChange);
    connection?.removeEventListener?.("change", onChange);
  };
}

function getSequencePreference(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia(SEQUENCE_MQ).matches) return false;
  if (window.matchMedia(REDUCE_MOTION_MQ).matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (connection?.saveData) return false;
  if (typeof connection?.effectiveType === "string" && /2g/.test(connection.effectiveType)) return false;
  return true;
}

function useDesktopScrollSequence() {
  return useSyncExternalStore(subscribeSequencePreference, getSequencePreference, () => false);
}


const FEATURED_TREATMENTS = [
  { title: "LASIK Surgery", excerpt: "Freedom from glasses with Contoura LASIK. Quick, precise, life-changing.", href: "/lasik-surgery-mumbai", tag: "Refractive" },
  { title: "Cataract Surgery", excerpt: "No patch, no stitch, no injection. Back to life in 24–48 hours.", href: "/cataract-surgery-mumbai", tag: "Surgery" },
  { title: "Glaucoma & Retina", excerpt: "From monitoring to advanced laser and microsurgery.", href: "/glaucoma-treatment-mumbai", tag: "Medical & Surgical" },
  { title: "Dry Eye & More", excerpt: "Specialist care for dry eye, pediatric, and corneal conditions.", href: "/dry-eye-treatment-mumbai", tag: "Medical" },
];

const FEATURED_HREFS = new Set(FEATURED_TREATMENTS.map((t) => t.href));
const OTHER_TREATMENTS = TREATMENT_LINKS.filter(({ href }) => !FEATURED_HREFS.has(href));

const WHY_ITEMS = [
  { title: "Board-certified specialist", desc: "Dr. Nikhil Nasta, award-winning ophthalmologist" },
  { title: "Cutting-edge technology", desc: "Contoura LASIK, Alcon Phaco, Turbovit retinal" },
  { title: "Patient-first care", desc: "NABH-accredited centres, clear communication" },
];

export type HomePageImages = {
  serviceImages: Record<string, string>;
  spotlightCataractImage: string;
  spotlightLasikImage: string;
};

type Props = {
  images: HomePageImages;
  faqs: FAQItem[];
};

export default function HomePageClient({ images, faqs }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const sequenceEnabled = useDesktopScrollSequence();

  const getServiceImage = (href: string) => {
    const slug = href.replace(/^\//, "");
    return images.serviceImages[slug] ?? FALLBACK_IMAGE;
  };

  return (
    <>
      {/* Desktop (fine pointer): CSS keeps 220vh sticky scrub. Mobile: normal one-screen hero, no frame storm. */}
      <section
        ref={heroRef}
        className="relative -mt-16 min-h-[100dvh] bg-[var(--navy-950)] [@media(pointer:fine)_and_(min-width:768px)_and_(prefers-reduced-motion:no-preference)]:h-[220vh] [@media(pointer:fine)_and_(min-width:768px)_and_(prefers-reduced-motion:no-preference)]:min-h-0"
      >
        <div className="relative min-h-[100dvh] overflow-hidden pt-16 [@media(pointer:fine)_and_(min-width:768px)_and_(prefers-reduced-motion:no-preference)]:sticky [@media(pointer:fine)_and_(min-width:768px)_and_(prefers-reduced-motion:no-preference)]:top-0 [@media(pointer:fine)_and_(min-width:768px)_and_(prefers-reduced-motion:no-preference)]:h-[100dvh]">
          {sequenceEnabled ? (
            <HeroSequenceBackground sectionRef={heroRef} />
          ) : (
            <img
              src={FIRST_FRAME_SRC}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/45 to-navy-950/70" aria-hidden />
          <div className="absolute inset-0 hero-grain" aria-hidden />
          <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-clinical-400/12 blur-[100px] animate-float pointer-events-none max-md:hidden" />
          <div className="absolute bottom-1/4 right-1/5 w-[380px] h-[380px] rounded-full bg-clinical-500/10 blur-[90px] animate-float pointer-events-none max-md:hidden" style={{ animationDelay: "2s" }} />

          <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 pb-10 sm:pb-14 text-center flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <p className="inline-flex items-center rounded-full border border-white/20 bg-navy-950/40 px-4 py-1.5 font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-clinical-200/95 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                iSight Eye Care · Mumbai
              </p>
              <h1 className="mt-4 font-display font-extrabold text-white tracking-tight drop-shadow-[0_10px_28px_rgba(0,0,0,0.58)]">
                <span className="block text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white/95 leading-tight mb-2 sm:mb-3">
                  Dr. Nikhil Nasta
                </span>
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
                  Vision
                  <br />
                  <span className="bg-gradient-to-r from-clinical-100 via-clinical-300 to-clinical-200 bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_8px_18px_rgba(0,0,0,0.42)] animate-gradient-shift">
                    Restored
                  </span>
                </span>
              </h1>
              <div className="mt-4 sm:mt-7 max-w-2xl mx-auto rounded-[22px] sm:rounded-[26px] border border-white/20 bg-gradient-to-b from-white/14 via-white/9 to-white/6 px-4 py-4 sm:px-7 sm:py-6 shadow-[0_20px_52px_-34px_rgba(0,0,0,0.95)] backdrop-blur-lg ring-1 ring-white/10">
                <p className="text-sm sm:text-lg text-white/95 max-w-xl mx-auto leading-relaxed text-balance drop-shadow-[0_8px_22px_rgba(0,0,0,0.75)]">
                  Leading eye surgeon in Mumbai at iSight Eye Care & Surgery - LASIK, cataract, retina, glaucoma, and
                  dry eye. NABH-accredited centres in Khar and Dadar.
                </p>
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/consult"
                    className="btn btn-lg btn-secondary group border-0 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.9)] w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 shrink-0" strokeWidth={2.25} aria-hidden />
                    Book Consultation
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg group w-full sm:w-auto border border-white/55 bg-navy-950/45 text-white shadow-[0_10px_28px_-16px_rgba(0,0,0,0.85)] backdrop-blur-sm hover:bg-navy-900/60 hover:border-white/80 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/40 to-transparent" />
      </section>

      {/* Trust strip with count-up */}
      <section className="relative bg-navy-800/90 backdrop-blur-md border-b border-white/5 py-16 lg:py-20 -mt-px">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <CountUpStat />
        </div>
      </section>

      {/* Mission */}
      <section className="bg-silver-100 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-soft border border-silver-200/80 flex flex-col lg:flex-row">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-clinical-500 to-clinical-400 rounded-l-3xl" />
            <div className="relative flex-shrink-0 w-full lg:w-80 h-64 lg:h-auto lg:min-h-[360px] rounded-t-3xl lg:rounded-l-none lg:rounded-r-none overflow-hidden">
              <Image
                src={getImageUrl("/hero.webp")}
                alt="Dr. Nikhil Nasta"
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-white/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-transparent" />
            </div>
            <div className="relative flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">Our Mission</h2>
              <p className="mt-5 text-navy-700 text-lg leading-relaxed">
                <Link href="/awards-eye-surgeon-mumbai" className="text-clinical-500 hover:text-clinical-400 font-semibold underline decoration-clinical-400/50 underline-offset-2">
                  Award-winning
                </Link>{" "}
                ophthalmologist Dr. Nikhil Nasta is dedicated to restoring the one sense we rely on every day. Why struggle with poor eyesight when expert care is within reach?
              </p>
              <Link
                href="/isight-eye-care-doctors"
                className="inline-flex items-center gap-2 mt-8 text-clinical-500 font-semibold hover:text-clinical-400 transition-colors group"
              >
                About Dr. Nikhil Nasta
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <UnderstandYourEye />

      {/* Eye Health Self-Assessments */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-navy-800/90 border-y border-white/5">
        {/* Ambient glow behind card — clinical blue */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none" aria-hidden>
          <div className="w-full max-w-3xl h-64 bg-clinical-400/20 blur-[80px] rounded-full -translate-y-1/2" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/eye-quiz"
            className="group group/card flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 rounded-3xl overflow-hidden border border-clinical-400/35 bg-gradient-to-br from-white/[0.06] via-clinical-500/15 to-navy-800/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_4px_24px_-4px_rgba(0,0,0,0.2),0_0_48px_-12px_rgba(45,90,158,0.25)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_32px_-8px_rgba(0,0,0,0.25),0_0_64px_-16px_rgba(92,139,201,0.35)] hover:border-clinical-400/50 transition-all duration-400 ease-out hover:-translate-y-0.5"
          >
            {/* Left accent bar — clinical gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-clinical-300 via-clinical-400 to-clinical-500 rounded-l-3xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1 min-w-0 pl-4 sm:pl-5">
              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-clinical-500/25 border border-clinical-400/40 flex items-center justify-center text-clinical-300 group-hover/card:bg-clinical-500/35 group-hover/card:border-clinical-400/50 transition-colors duration-300">
                <ClipboardList className="w-7 h-7" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-clinical-300">Screening tools</p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[1.75rem] font-bold text-white mt-2 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Let's do an Eye Test</h2>
                <p className="mt-3 text-white/80 text-base sm:text-[0.9375rem] max-w-md leading-relaxed">Dry eye, digital strain & vision wellness. Symptom questions, optional Amsler grid, and a printable report with next steps.</p>
              </div>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-clinical-500 text-white font-semibold shadow-[0_0_28px_-6px_rgba(45,90,158,0.55)] group-hover/card:bg-clinical-400 group-hover/card:shadow-[0_0_36px_-8px_rgba(92,139,201,0.5)] group-hover/card:scale-[1.02] transition-all duration-300 ease-out">
              Start a test
              <ArrowRight className="w-5 h-5 group-hover/card:translate-x-0.5 transition-transform duration-300" aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      {/* Our Services — editorial cards */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-100 via-white to-silver-100" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-clinical-500">
              Treatments
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mt-3">
              Our Services
            </h2>
            <p className="mt-4 text-navy-600 text-lg">
              Expert care across the full spectrum of eye health—from vision correction to surgery and medical management.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {FEATURED_TREATMENTS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col rounded-2xl lg:rounded-3xl bg-white overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,15,26,0.12)] border border-silver-200/60 hover:shadow-[0_12px_40px_-12px_rgba(10,15,26,0.2)] hover:border-clinical-500/20 transition-all duration-300 hover:-translate-y-1.5 text-left"
              >
                <div className="relative w-full aspect-[5/4] lg:aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={getServiceImage(item.href)}
                    fallbackSrc={FALLBACK_IMAGE}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-transparent" />
                  <span className="absolute top-4 left-4 lg:top-6 lg:left-6 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md bg-white/15 backdrop-blur-sm text-white text-[11px] lg:text-xs font-semibold uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 pt-12 lg:p-6 lg:pt-14">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-white/90 text-sm lg:text-base leading-snug line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-4 lg:px-6 lg:py-5 border-t border-silver-200/80 bg-silver-50/50 group-hover:bg-clinical-50/50 transition-colors duration-300">
                  <span className="text-clinical-500 font-semibold text-sm lg:text-base group-hover:text-clinical-600 transition-colors">
                    Learn more
                  </span>
                  <span className="text-clinical-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/treatments"
              className="btn btn-lg btn-dark w-full sm:w-auto"
            >
              View all treatments
            </Link>
            <a
              href={`tel:+${PHONE}`}
              className="btn btn-lg btn-primary w-full sm:w-auto"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose + spotlight cards with correct images */}
      <section className="bg-white py-24 lg:py-32 border-t border-silver-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">Why Choose Us</h2>
          <p className="mt-3 text-navy-600 max-w-2xl">Expertise, technology, and care that put your vision first.</p>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-6 rounded-2xl bg-silver-100/80 border border-silver-200/60"
              >
                <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-clinical-500/10 text-clinical-500 flex items-center justify-center text-xl font-bold">✓</span>
                <div>
                  <span className="font-semibold text-navy-900">{item.title}</span>
                  <p className="mt-1 text-sm text-navy-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/consult" className="btn btn-lg btn-dark w-full sm:w-auto">
              Book a consultation
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-primary w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2.25} aria-hidden />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-end p-8 sm:p-10 text-white shadow-soft-lg hover:shadow-card-hover transition-all duration-300">
              <Image
                src={images.spotlightCataractImage}
                alt="Cataract surgery at iSight Eye Care Mumbai – no patch, no stitch"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/50" />
              <div className="relative z-10">
                <h3 className="font-display text-xl sm:text-2xl font-bold">No patch, no stitch cataract surgery</h3>
                <p className="mt-5 text-white/90 leading-relaxed text-sm sm:text-base">
                  Advanced Alcon Laureate Phaco. No injections, minimal discomfort. Most patients are back to normal within 24–48 hours.
                </p>
                <a
                  href={`tel:+${PHONE}`}
                  className="btn btn-md btn-primary rounded-full mt-8"
                >
                  Consult
                </a>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-end p-8 sm:p-10 text-white shadow-soft-lg hover:shadow-card-hover transition-all duration-300">
              <Image
                src={images.spotlightLasikImage}
                alt="Contoura LASIK eye surgery at iSight Eye Care Mumbai"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/50" />
              <div className="relative z-10">
                <h3 className="font-display text-xl sm:text-2xl font-bold">Contoura LASIK & Turbovit retinal surgery</h3>
                <p className="mt-5 text-white/90 leading-relaxed text-sm sm:text-base">
                  Precision vision correction and expert retinal care. From LASIK to complex retinal procedures.
                </p>
                <a
                  href={`tel:+${PHONE}`}
                  className="btn btn-md btn-primary rounded-full mt-8"
                >
                  Book now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More treatments — with images, below Why Choose Us */}
      <section className="bg-silver-100 py-24 lg:py-32 border-t border-silver-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-clinical-500">
              Full range
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mt-3">
              More treatments we offer
            </h2>
            <p className="mt-3 text-navy-600">
              From premium lens options and retinal care to pediatric, squint, corneal transplant, and aesthetic services.
            </p>
          </div>
          <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {OTHER_TREATMENTS.map(({ href, label }) => {
              const displayLabel = label.replace(/\s+Mumbai\s*$/i, "").trim();
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="group relative flex flex-col rounded-2xl bg-white overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,15,26,0.12)] border border-silver-200/60 hover:shadow-[0_12px_40px_-12px_rgba(10,15,26,0.2)] hover:border-clinical-500/20 transition-all duration-300 hover:-translate-y-1 text-left"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <TreatmentCardImage
                        src={getServiceImage(href)}
                        fallbackSrc={FALLBACK_IMAGE}
                        alt={displayLabel}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 pt-10">
                        <h3 className="font-display text-lg font-bold text-white leading-tight">
                          {displayLabel}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-silver-200/80 bg-silver-50/50 group-hover:bg-clinical-50/50 transition-colors duration-300">
                      <span className="text-clinical-500 font-semibold text-sm group-hover:text-clinical-600 transition-colors">
                        Learn more
                      </span>
                      <span className="text-clinical-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 text-center">
            <Link
              href="/treatments"
              className="btn btn-md btn-dark"
            >
              See full treatments page →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — visible copy matches FAQPage JSON-LD in page.tsx */}
      {faqs.length > 0 && (
        <section className="bg-white py-20 lg:py-28 border-t border-silver-200" aria-labelledby="home-faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-clinical-500 text-center">
              Common questions
            </p>
            <h2
              id="home-faq-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mt-3 text-center text-balance"
            >
              Frequently asked questions
            </h2>
            <p className="mt-4 text-navy-600 text-center text-balance max-w-xl mx-auto">
              Quick answers about appointments, our Mumbai centres, treatments including LASIK, and what to expect at iSight Eye Care.
            </p>
            <div className="mt-10">
              <BlogFAQAccordion faqs={faqs} defaultValue="0" />
            </div>
          </div>
        </section>
      )}

      {/* Google reviews (real) with fallback to static testimonials */}
      <GoogleReviewsSection />

      {/* Final CTA with background */}
      <section className="relative bg-navy-900 py-24 overflow-hidden">
        <Image
          src={getImageUrl("/hero.webp")}
          alt=""
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-clinical-500/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/40 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Schedule your appointment</h2>
          <p className="mt-5 text-white/90 text-lg">
            Good vision matters for life. Contact us to book your next eye check-up.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consult"
              className="btn btn-lg btn-secondary w-full sm:w-auto"
            >
              Book Appointment
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-glass w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2.25} aria-hidden />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
