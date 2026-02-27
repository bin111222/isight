import Link from "next/link";
import Image from "next/image";
import type { PageContent } from "@/lib/content";
import { getImageUrl } from "@/lib/imageUrl";
import { TREATMENT_LINKS } from "@/lib/sitemap";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import TreatmentCardImage from "@/components/TreatmentCardImage";

const HERO_FALLBACK = getImageUrl("/hero.webp");

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";

type Props = {
  slug: string;
  content: PageContent;
  imagePaths?: string[];
};

function getBreadcrumbLabel(slug: string): string {
  const found = TREATMENT_LINKS.find((l) => l.href === `/${slug}`);
  return found ? found.label : slug.replace(/-/g, " ");
}

/** Distribute image paths across section gaps (between sections). */
function distributeImages(imagePaths: string[], numSections: number): string[][] {
  if (imagePaths.length === 0 || numSections === 0) return [];
  const slots = numSections;
  const perSlot = Math.floor(imagePaths.length / slots);
  const extra = imagePaths.length % slots;
  const result: string[][] = [];
  let idx = 0;
  for (let i = 0; i < slots; i++) {
    const count = perSlot + (i < extra ? 1 : 0);
    result.push(imagePaths.slice(idx, idx + count));
    idx += count;
  }
  return result;
}

function SectionContent({
  section,
  index,
  isLead,
}: {
  section: PageContent["sections"][number];
  index: number;
  isLead: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className={isLead ? "space-y-5" : "space-y-4"}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500 mb-1 sm:mb-0"
          aria-hidden
        >
          {num}
        </span>
        {section.heading && (
          <h2
            className={
              isLead
                ? "font-display text-2xl sm:text-3xl font-bold text-navy-900 leading-tight"
                : "treatment-section-heading font-display text-xl sm:text-2xl font-bold text-navy-900"
            }
          >
            {section.heading}
          </h2>
        )}
      </div>
      {section.body && (
        <div
          className={
            isLead
              ? "text-navy-700 leading-relaxed whitespace-pre-line text-base sm:text-lg"
              : "text-navy-700 leading-relaxed whitespace-pre-line text-[15px] sm:text-base"
          }
        >
          {section.body}
        </div>
      )}
      {section.list && (
        <ul className="mt-4 space-y-2.5">
          {section.list.map((item, j) => (
            <li
              key={j}
              className="flex gap-3 text-navy-700 text-[15px] sm:text-base leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-clinical-400 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Rich image block: native img + fallback so same-origin treatment images load without Next/Image. */
function ImageBlock({ srcs, variant }: { srcs: string[]; variant: "first" | "even" | "odd" }) {
  if (srcs.length === 0) return null;
  const Img = (p: { src: string }) => (
    <div className="absolute inset-0">
      <TreatmentCardImage src={p.src} fallbackSrc={HERO_FALLBACK} />
    </div>
  );
  if (variant === "first" && srcs.length === 1) {
    return (
      <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden shadow-soft-lg ring-1 ring-black/5">
        <Img src={srcs[0]} />
      </div>
    );
  }
  if (variant === "first" && srcs.length >= 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="relative sm:col-span-3 aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-lg ring-1 ring-black/5">
          <Img src={srcs[0]} />
        </div>
        <div className="relative sm:col-span-2 grid grid-cols-2 sm:grid-cols-1 gap-3">
          {srcs.slice(1, 3).map((src) => (
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft ring-1 ring-black/5">
              <Img src={src} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (srcs.length === 1) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-lg ring-1 ring-black/5">
        <Img src={srcs[0]} />
      </div>
    );
  }
  if (srcs.length === 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {srcs.map((src) => (
          <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft ring-1 ring-black/5">
            <Img src={src} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="relative col-span-2 sm:col-span-1 aspect-[4/3] rounded-2xl overflow-hidden shadow-soft ring-1 ring-black/5">
        <Img src={srcs[0]} />
      </div>
      {srcs.slice(1, 4).map((src) => (
        <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-soft ring-1 ring-black/5">
          <Img src={src} />
        </div>
      ))}
    </div>
  );
}

export default function TreatmentPageLayout({ slug, content, imagePaths = [] }: Props) {
  const breadcrumbLabel = getBreadcrumbLabel(slug);
  const relatedTreatments = TREATMENT_LINKS.filter((l) => l.href !== `/${slug}`).slice(0, 8);
  const imagesBySlot = distributeImages(imagePaths, content.sections.length);

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden bg-navy-900 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
        <div className="absolute inset-0 bg-treatment-hero bg-treatment-hero-glow" aria-hidden />
        <div className="absolute inset-0 bg-navy-900/85" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <nav
            className="flex items-center gap-2 text-sm text-white/85 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden className="opacity-60">/</span>
            <Link href="/treatments" className="hover:text-white transition-colors">
              Treatments
            </Link>
            <span aria-hidden className="opacity-60">/</span>
            <span className="text-white font-medium" aria-current="page">
              {breadcrumbLabel}
            </span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] max-w-4xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="mt-5 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
              {content.subtitle}
            </p>
          )}
        </div>
      </header>

      {/* Editorial content: alternating rows with varied backgrounds */}
      <div className="relative z-10 -mt-6 sm:-mt-10 lg:-mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {content.sections.map((section, i) => {
            const images = imagesBySlot[i] ?? [];
            const isTextLeft = i % 2 === 0;
            const isLead = i === 0;
            const bg =
              i % 3 === 0
                ? "bg-white"
                : i % 3 === 1
                  ? "bg-silver-100/70"
                  : "bg-white";
            const padding = isLead ? "py-10 sm:py-14 lg:py-16" : "py-8 sm:py-12 lg:py-14";

            return (
              <div
                key={i}
                className={`${bg} rounded-2xl sm:rounded-3xl ${padding} px-6 sm:px-8 lg:px-12 mb-6 sm:mb-8 shadow-soft border border-silver-200/40 overflow-hidden`}
              >
                <div
                  className={
                    images.length > 0
                      ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                      : "block"
                  }
                >
                  {/* Text column */}
                  <div
                    className={
                      images.length > 0
                        ? isTextLeft
                          ? "lg:col-span-6 lg:order-1"
                          : "lg:col-span-6 lg:order-2"
                        : ""
                    }
                  >
                    <SectionContent section={section} index={i} isLead={isLead} />
                  </div>
                  {/* Images column */}
                  {images.length > 0 && (
                    <div
                      className={
                        isTextLeft
                          ? "lg:col-span-6 lg:order-2"
                          : "lg:col-span-6 lg:order-1"
                      }
                    >
                      <ImageBlock
                        srcs={images}
                        variant={isLead ? "first" : i % 2 === 0 ? "even" : "odd"}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Doctor / Medical review – premium strip */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
          <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 p-8 sm:p-10 lg:p-12 text-white shadow-soft-lg ring-1 ring-white/10">
            <div className="absolute inset-0 bg-treatment-hero-glow opacity-30" aria-hidden />
            <div className="relative flex flex-col sm:flex-row gap-8 items-start">
              <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                <Image src={getImageUrl("/hero.webp")} alt="Dr. Nikhil Nasta" fill className="object-cover" sizes="112px" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-300">
                  Medical review
                </p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Dr. Nikhil Nasta
                </h3>
                <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                  Award-winning ophthalmologist. Over 15 years of experience in cataract surgery,
                  LASIK, retinal care, dry eye, and ocular aesthetics. NABH accredited centres in
                  Khar & Dadar, Mumbai.
                </p>
                <Link
                  href="/isight-eye-care-doctors"
                  className="inline-flex items-center gap-2 mt-5 text-clinical-200 font-semibold hover:text-white transition-colors"
                >
                  About Dr. Nikhil
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* FAQs – accordion UI */}
        {content.faqs && content.faqs.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500 mb-2">
              FAQ
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-8">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={content.faqs} defaultValue="0" />
          </div>
        )}

        {/* Related treatments */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20 pb-6">
          <div className="border-t border-silver-200 pt-10 sm:pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500 mb-2">
              Also explore
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-8">
              Related Treatments
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {relatedTreatments.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between rounded-xl bg-silver-100/80 hover:bg-white border border-transparent hover:border-clinical-400/30 px-4 py-3.5 text-navy-700 hover:text-clinical-600 transition-all duration-200 hover:shadow-soft"
                  >
                    <span className="font-medium text-sm sm:text-base">{label.replace(/\s+Mumbai$/, "")}</span>
                    <span className="text-clinical-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 mt-6 text-clinical-500 font-semibold hover:text-clinical-400 transition-colors"
            >
              View all treatments
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* CTA – full-bleed */}
        <div className="mt-4">
          <BookAppointmentCTA variant="fullBleed" priority />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-sm text-navy-500 leading-relaxed">
            Disclaimer: This information is for educational purposes only. Individual cases vary;
            consult a specialist for personalized advice.
          </p>
        </div>
      </div>
    </article>
  );
}
