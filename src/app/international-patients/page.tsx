import type { Metadata } from "next";
import { SITE_URL } from "@/lib/sitemap";
import { getTreatmentImagePaths } from "@/lib/treatmentImages";
import InternationalPatientsPage from "@/components/InternationalPatientsPage";
import { clampTitleTag } from "@/lib/seoTitle";

/** Slugs used for treatment badges on the international patients page */
const BADGE_SLUGS = [
  "cataract-surgery-mumbai",
  "lasik-surgery-mumbai",
  "icl-surgery-mumbai",
  "trifocal-iol-surgery-mumbai",
  "retinal-surgery-mumbai",
  "retinal-injections-mumbai",
  "glaucoma-treatment-mumbai",
  "corneal-transplant-surgery-mumbai",
  "pediatric-eye-care-mumbai",
  "squint-correction-surgery-mumbai",
  "oculoplastic-surgery-botox-mumbai",
  "dry-eye-treatment-mumbai",
] as const;

/** Same-origin image paths so all images load from the app (no CDN dependency). */
function getInternationalPatientsTreatmentImages(): Record<string, string> {
  const map: Record<string, string> = { placeholder: "/hero.webp" };
  for (const slug of BADGE_SLUGS) {
    const paths = getTreatmentImagePaths(slug);
    map[slug] = paths[0] ?? "/hero.webp";
  }
  return map;
}

const canonical = `${SITE_URL}/international-patients`;
const title = clampTitleTag("International Patients | Eye Surgery Mumbai | iSight Eye Care");

export const metadata: Metadata = {
  title,
  description:
    "World-class eye surgery in Mumbai for international patients. Cataract, LASIK, retina, cornea, glaucoma & more. Transparent costs, English-speaking staff, NABH-accredited. Get a treatment plan and cost estimate.",
  keywords: [
    "eye surgery India",
    "cataract surgery India",
    "LASIK India",
    "international patients eye care Mumbai",
    "medical tourism India eye",
    "ophthalmology Mumbai",
    "retina surgery India",
    "glaucoma treatment India",
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description:
      "World-class eye surgery in Mumbai for international patients. Transparent costs, dedicated coordination, NABH-accredited care.",
    url: canonical,
    siteName: "iSight Eye Care",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "World-class eye surgery in Mumbai for international patients. Get a treatment plan and cost estimate.",
  },
  robots: "index, follow",
};

function faqJsonLd() {
  const faqs = [
    { question: "How long do I need to stay in India?", answer: "Typically 3–7 days depending on procedure." },
    { question: "Are surgeries safe?", answer: "Yes. Procedures follow international sterilization and safety protocols." },
    { question: "Is language a barrier?", answer: "No. English communication is standard." },
    { question: "Can I travel alone?", answer: "Yes, though one attendant is recommended for major surgery." },
    { question: "When can I fly back?", answer: "Usually within a few days post clearance." },
  ];
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    }),
  };
}

function medicalClinicJsonLd() {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "iSight Eye Care & Surgery",
      description:
        "Comprehensive ophthalmic care in Mumbai for international patients. Cataract, LASIK, retina, cornea, glaucoma, pediatric and cosmetic eye surgery.",
      url: canonical,
      address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
      medicalSpecialty: "Ophthalmology",
      areaServed: "Worldwide",
    }),
  };
}

export default function InternationalPatientsRoute() {
  const treatmentImages = getInternationalPatientsTreatmentImages();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={faqJsonLd()} />
      <script type="application/ld+json" dangerouslySetInnerHTML={medicalClinicJsonLd()} />
      <InternationalPatientsPage treatmentImages={treatmentImages} />
    </>
  );
}
