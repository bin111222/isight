import type { Metadata } from "next";
import EyeQuizHub from "@/components/eye-quiz/EyeQuizHub";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";

export const metadata: Metadata = {
  title: "Eye Health Self-Assessments | Dry Eye, Digital Strain & Vision Screening | iSight Mumbai",
  description:
    "Screening tools for dry eye, digital eye strain, and vision wellness. Symptom questions, Amsler grid check, and a printable report with next steps. iSight Eye Care.",
};

export default function EyeQuizPage() {
  return (
    <main className="min-h-screen bg-navy-900">
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
