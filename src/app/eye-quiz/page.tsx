import type { Metadata } from "next";
import { SITE_URL } from "@/lib/sitemap";
import EyeQuizHub from "@/components/eye-quiz/EyeQuizHub";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import { clampTitleTag } from "@/lib/seoTitle";

const canonical = `${SITE_URL}/eye-quiz`;
const title = clampTitleTag("Eye Health Self-Assessments | iSight Mumbai");
const description =
  "Screening tools for dry eye, digital eye strain, and vision wellness. Symptom questions, Amsler grid check, and a printable report with next steps. iSight Eye Care.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "iSight Eye Care",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "iSight Eye Care Eye Health Self-Assessments" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.webp"],
  },
};

export default function EyeQuizPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <h1 className="sr-only">Eye Health Self-Assessments</h1>
      <EyeQuizHub />
      <section className="bg-navy-800/60 border-t border-white/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/60 text-sm max-w-xl mx-auto">
            These self-assessments are for general awareness only and do not replace a professional eye examination. For a proper diagnosis and treatment plan, book a consultation with our team.
          </p>
        </div>
      </section>
      <BookAppointmentCTA variant="fullBleed" showWhatsApp />
    </main>
  );
}
