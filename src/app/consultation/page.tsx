import ConsultationQuiz from "@/components/ConsultationQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Consultation | iSight Eye Care",
  description: "Book a consultation with our eye specialists at iSight Eye Care.",
};

export default function ConsultationPage() {
  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Book a Consultation
          </h1>
          <p className="mt-4 text-lg text-silver-200">
            Tell us a bit about what you're experiencing, and we'll connect you with the right specialist.
          </p>
        </div>
        <ConsultationQuiz />
      </div>
    </div>
  );
}
