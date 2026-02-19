"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Stethoscope, ClipboardList, ArrowRight } from "lucide-react";
import CountUpStat from "@/components/CountUpStat";
import UnderstandYourEye from "@/components/UnderstandYourEye";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import { TREATMENT_LINKS } from "@/lib/sitemap";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";
const FALLBACK_IMAGE = "/hero.webp";

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
};

export default function HomePageClient({ images }: Props) {
  const getServiceImage = (href: string) => {
    const slug = href.replace(/^\//, "");
    return images.serviceImages[slug] ?? FALLBACK_IMAGE;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex flex-col justify-center mesh-bg overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-50 pointer-events-none" />
        <div className="absolute inset-0 hero-grain" aria-hidden />
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-clinical-400/12 blur-[100px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-[380px] h-[380px] rounded-full bg-clinical-500/10 blur-[90px] animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-28 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-clinical-400/90 animate-fade-in opacity-0 [animation-fill-mode:forwards]">
            iSight Eye Care · Mumbai
          </p>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:0.08s]">
            Vision
            <br />
            <span className="bg-gradient-to-r from-clinical-200 via-clinical-400 to-clinical-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Restored
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-white/80 max-w-xl mx-auto leading-relaxed animate-fade-in opacity-0 stagger-1 [animation-fill-mode:forwards]">
            Expert eye care for a clearer tomorrow. Led by Dr. Nikhil Nasta.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0 stagger-2 [animation-fill-mode:forwards]">
            <a
              href={`tel:+${PHONE}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-navy-900 font-semibold text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-0"
            >
              <Phone className="w-5 h-5 shrink-0" strokeWidth={2.25} aria-hidden />
              Book Consultation
            </a>
            <Link
              href="/treatments"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-semibold text-base bg-transparent hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              <Stethoscope className="w-5 h-5 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
              Explore Treatments
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/40 to-transparent" />
      </section>

      {/* Trust strip with count-up */}
      <section className="relative bg-navy-800/90 backdrop-blur-md border-b border-white/5 py-14 -mt-px">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
                src="/hero.webp"
                alt="Dr. Nikhil Nasta"
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent" />
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
      <section className="relative py-16 lg:py-20 overflow-hidden bg-navy-800/80 border-y border-white/5">
        {/* Ambient glow behind card — vivid teal */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none" aria-hidden>
          <div className="w-full max-w-3xl h-64 bg-[#14b8a6]/20 blur-[80px] rounded-full -translate-y-1/2" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/eye-quiz"
            className="group group/card flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 rounded-3xl overflow-hidden border border-[#2dd4bf]/35 bg-gradient-to-br from-white/[0.06] via-[#14b8a6]/15 to-[#0d9488]/10 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_4px_24px_-4px_rgba(0,0,0,0.2),0_0_48px_-12px_rgba(20,184,166,0.25)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_32px_-8px_rgba(0,0,0,0.25),0_0_64px_-16px_rgba(20,184,166,0.35)] hover:border-[#2dd4bf]/50 transition-all duration-400 ease-out hover:-translate-y-0.5"
          >
            {/* Left accent bar — teal gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2dd4bf] via-[#14b8a6] to-[#0d9488] rounded-l-3xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1 min-w-0 pl-4 sm:pl-5">
              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#14b8a6]/25 border border-[#2dd4bf]/40 flex items-center justify-center text-[#5eead4] group-hover/card:bg-[#14b8a6]/35 group-hover/card:border-[#2dd4bf]/50 transition-colors duration-300">
                <ClipboardList className="w-7 h-7" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#5eead4]">Screening tools</p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[1.75rem] font-bold text-white mt-2 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Eye Health Self-Assessments</h2>
                <p className="mt-3 text-white/80 text-base sm:text-[0.9375rem] max-w-md leading-relaxed">Dry eye, digital strain & vision wellness. Symptom questions, optional Amsler grid, and a printable report with next steps.</p>
              </div>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#14b8a6] text-white font-semibold shadow-[0_0_28px_-6px_rgba(13,148,136,0.55)] group-hover/card:bg-[#2dd4bf] group-hover/card:shadow-[0_0_36px_-8px_rgba(45,212,191,0.5)] group-hover/card:scale-[1.02] transition-all duration-300 ease-out">
              Start an assessment
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
                  <Image
                    src={getServiceImage(item.href)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              View all treatments
            </Link>
            <a
              href={`tel:+${PHONE}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-clinical-500 text-white font-semibold hover:bg-clinical-400 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(45,90,158,0.4)] hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]"
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

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-end p-8 sm:p-10 text-white shadow-soft-lg hover:shadow-card-hover transition-all duration-300">
              <Image
                src={images.spotlightCataractImage}
                alt=""
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
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-clinical-500 hover:bg-clinical-400 rounded-full font-semibold transition-all hover:shadow-glow"
                >
                  Consult
                </a>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-end p-8 sm:p-10 text-white shadow-soft-lg hover:shadow-card-hover transition-all duration-300">
              <Image
                src={images.spotlightLasikImage}
                alt=""
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
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-clinical-500 hover:bg-clinical-400 rounded-full font-semibold transition-all hover:shadow-glow"
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
                      <Image
                        src={getServiceImage(href)}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors"
            >
              See full treatments page →
            </Link>
          </div>
        </div>
      </section>

      {/* Google reviews (real) with fallback to static testimonials */}
      <GoogleReviewsSection />

      {/* Final CTA with background */}
      <section className="relative bg-navy-900 py-24 overflow-hidden">
        <Image
          src="/hero.webp"
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
            <a
              href={`tel:+${PHONE}`}
              className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-navy-900 font-semibold rounded-2xl hover:bg-white/95 transition-all shadow-xl hover:scale-[1.02]"
            >
              Book now
            </a>
            <a href={`tel:+${PHONE}`} className="btn-glass inline-flex justify-center px-8 py-4 rounded-2xl border-2 border-white/30">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
