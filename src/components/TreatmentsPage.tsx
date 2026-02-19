import Link from "next/link";
import Image from "next/image";
import { TREATMENT_LINKS } from "@/lib/sitemap";
import { getTreatmentImagePaths } from "@/lib/treatmentImages";
import { getImageUrl } from "@/lib/imageUrl";
import { TREATMENT_PAGES } from "@/content/treatments";
import type { PageContent } from "@/types/content";
import CountUpStat from "@/components/CountUpStat";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";

/** Short category tags for treatment cards, aligned with homepage style */
const SLUG_TO_TAG: Record<string, string> = {
  "lasik-surgery-mumbai": "Refractive",
  "cataract-surgery-mumbai": "Surgery",
  "trifocal-iol-surgery-mumbai": "Surgery",
  "multifocal-iol-surgery-mumbai": "Surgery",
  "edof-iol-surgery-mumbai": "Surgery",
  "icl-surgery-mumbai": "Refractive",
  "glaucoma-treatment-mumbai": "Medical & Surgical",
  "dry-eye-treatment-mumbai": "Medical",
  "retinal-surgery-mumbai": "Surgery",
  "retinal-injections-mumbai": "Medical",
  "corneal-transplant-surgery-mumbai": "Surgery",
  "pediatric-eye-care-mumbai": "Pediatric",
  "squint-correction-surgery-mumbai": "Surgery",
  "oculoplastic-surgery-botox-mumbai": "Aesthetic",
  "skin-type-ocular-aesthetics-mumbai": "Aesthetic",
};

function getExcerpt(slug: string): string {
  const page = TREATMENT_PAGES[slug];
  if (!page) return "Expert eye care at iSight.";
  if (page.description) return page.description;
  const first = page.sections?.[0];
  if (first?.body) {
    const text = first.body.replace(/\n/g, " ").trim();
    return text.length > 140 ? `${text.slice(0, 137)}...` : text;
  }
  return "Expert eye care at iSight.";
}

function getFirstImage(slug: string): string {
  const paths = getTreatmentImagePaths(slug);
  return getImageUrl(paths[0] ?? "/hero.webp");
}

type Props = {
  content: PageContent;
};

export default function TreatmentsPage({ content }: Props) {
  const introSection = content.sections.find((s) => s.heading);
  const introBody = content.sections.find((s) => s.body && !s.list)?.body;

  return (
    <>
      {/* Hero — aligned with homepage */}
      <section className="relative min-h-[50vh] flex flex-col justify-center mesh-bg overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-50 pointer-events-none" />
        <div className="absolute inset-0 hero-grain" aria-hidden />
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] rounded-full bg-clinical-400/12 blur-[80px] animate-float pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-clinical-400/90">
            iSight Eye Care · Mumbai
          </p>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            All
            <span className="bg-gradient-to-r from-clinical-200 via-clinical-400 to-clinical-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              {" "}Treatments
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Full spectrum of eye care—from vision correction to surgery and medical management.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/40 to-transparent" />
      </section>

      {/* Trust strip — same as homepage */}
      <section className="relative bg-navy-800/90 backdrop-blur-md border-b border-white/5 py-14 -mt-px">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <CountUpStat />
        </div>
      </section>

      {/* Intro from content */}
      {(introSection || introBody) && (
        <section className="bg-silver-100 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            {introSection?.heading && (
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                {introSection.heading}
              </h2>
            )}
            {(introBody || introSection?.body) && (
              <p className="mt-5 text-navy-700 text-lg leading-relaxed">
                {introBody ?? introSection?.body}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Treatment cards grid — same UI as homepage Our Services */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-100 via-white to-silver-100" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-clinical-500">
              Our Services
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mt-3">
              Explore by treatment
            </h2>
            <p className="mt-4 text-navy-600 text-lg">
              Click any card to read more and book a consultation.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TREATMENT_LINKS.map(({ href, label }) => {
              const slug = href.slice(1);
              const imageSrc = getFirstImage(slug);
              const excerpt = getExcerpt(slug);
              const tag = SLUG_TO_TAG[slug] ?? "Eye Care";
              return (
                <Link
                  key={href}
                  href={href}
                  className="group relative flex flex-col rounded-2xl bg-white overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,15,26,0.12)] border border-silver-200/60 hover:shadow-[0_12px_40px_-12px_rgba(10,15,26,0.2)] hover:border-clinical-500/20 transition-all duration-300 hover:-translate-y-1.5 text-left"
                >
                  <div className="relative w-full aspect-[5/4] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-transparent" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider">
                      {tag}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5 pt-12">
                      <h3 className="font-display text-xl font-bold text-white leading-tight">
                        {label.replace(" Mumbai", "")}
                      </h3>
                      <p className="mt-2 text-white/90 text-sm leading-snug line-clamp-2">
                        {excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4 border-t border-silver-200/80 bg-silver-50/50 group-hover:bg-clinical-50/50 transition-colors duration-300">
                    <span className="text-clinical-500 font-semibold text-sm group-hover:text-clinical-600 transition-colors">
                      Learn more
                    </span>
                    <span className="text-clinical-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key areas list from content */}
      {content.sections.some((s) => s.list?.length) && (
        <section className="bg-white py-16 lg:py-20 border-t border-silver-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
              Key treatment areas
            </h2>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-navy-700">
              {content.sections.flatMap((s, i) => (s.list ?? []).map((item, j) => (
                <li key={`area-${i}-${j}`} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-clinical-500/15 text-clinical-500 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              )))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-silver-100 py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
            Ready to discuss your eyes?
          </h2>
          <p className="mt-4 text-navy-600 text-lg">
            Book a consultation with Dr. Nikhil Nasta and the iSight team.
          </p>
          <div className="mt-10">
            <BookAppointmentCTA variant="card" />
          </div>
        </div>
      </section>
    </>
  );
}
