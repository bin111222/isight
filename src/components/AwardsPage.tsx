import { Award, Newspaper } from "lucide-react";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import AwardsBrickGallery from "@/components/AwardsBrickGallery";
import NewsBrickGallery from "@/components/NewsBrickGallery";
import { AWARDS_IMAGES, NEWS_IMAGES } from "@/lib/galleryAssets";
import { getPageContent } from "@/lib/content";

export default function AwardsPage() {
  const content = getPageContent("awards-eye-surgeon-mumbai");

  return (
    <div className="min-h-screen bg-silver-100">
      {/* Hero - compact */}
      <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-gradient-to-b from-navy-900 to-navy-900/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(92,139,201,0.2),transparent_50%)] pointer-events-none" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 text-clinical-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} aria-hidden />
            Recognition
          </span>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 sm:mt-3">
            Awards &amp; recognition
          </h1>
          <p className="mt-2 sm:mt-3 text-silver-200 text-base sm:text-lg max-w-2xl mx-auto">
            iSight Eye Care and Dr. Nikhil Nasta-honoured for excellence in eye care and the growth of our brand.
          </p>
        </div>
      </section>

      {/* Intro + awards brick gallery */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {content?.sections?.[0]?.body && (
            <p className="text-navy-700 text-lg leading-relaxed max-w-3xl mx-auto text-center">
              {content.sections[0].body}
            </p>
          )}
          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 text-center mt-12 mb-6">
            Celebrating excellence
          </h2>
          <AwardsBrickGallery images={AWARDS_IMAGES} altPrefix="Award and recognition" />
        </div>
      </section>

      {/* Media coverage - news brick gallery */}
      <section className="py-14 lg:py-18 bg-white border-t border-silver-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 text-clinical-500 text-sm font-semibold uppercase tracking-[0.2em]">
            <Newspaper className="w-4 h-4" strokeWidth={2} aria-hidden />
            Media coverage
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            iSight in the news
          </h2>
          <p className="mt-4 text-navy-700 leading-relaxed max-w-2xl">
            Articles and features highlighting our work in eye care, from cataract and LASIK to retinal and paediatric services.
          </p>
          <div className="mt-10">
            <NewsBrickGallery
              images={NEWS_IMAGES}
              altPrefix="Media coverage article"
              columns="columns-2 sm:columns-3 md:columns-4 lg:columns-5"
            />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <BookAppointmentCTA variant="card" />
      </section>

      <p className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 text-sm text-navy-500">
        Disclaimer: This information is for educational purposes only. Individual cases vary; consult a specialist
        for personalised advice.
      </p>
    </div>
  );
}
