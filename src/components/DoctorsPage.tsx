import Link from "next/link";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import { TREATMENT_LINKS, SITE_URL } from "@/lib/sitemap";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import ClinicBrickGallery from "@/components/ClinicBrickGallery";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { CLINIC_IMAGES, GALLERY_IMAGES } from "@/lib/galleryAssets";
import { getImageUrl } from "@/lib/imageUrl";

const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Nikhil Nasta",
  description:
    "Award-winning ophthalmologist with over 15 years of experience in cataract surgery, LASIK, retinal surgery, dry eye management, and ocular aesthetics. Founder of iSight Eye Care, Mumbai.",
  url: `${SITE_URL}/isight-eye-care-doctors`,
  image: `${SITE_URL}/hero.webp`,
  telephone: "+918692986033",
  medicalSpecialty: "Ophthalmology",
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "MBBS",
      educationalLevel: "undergraduate",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "MS Ophthalmology",
      recognizedBy: { "@type": "Organization", name: "J.N. Medical College, Belgaum" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "DNB Ophthalmology",
      recognizedBy: { "@type": "Organization", name: "National Board of Examinations, India" },
    },
  ],
  award: [
    "Ophthall Hall of Vision Recognition Award",
    "Pfizer Gold Medallion and Plaque",
  ],
  worksFor: {
    "@type": "MedicalClinic",
    name: "iSight Eye Care & Surgery",
    url: SITE_URL,
  },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Padmashree Dr. D.Y. Patil Medical College" },
    { "@type": "EducationalOrganization", name: "J.N. Medical College, Belgaum" },
  ],
  knowsAbout: [
    "Cataract Surgery", "LASIK", "Contoura Vision", "Retinal Surgery",
    "Glaucoma Treatment", "Dry Eye", "Pediatric Ophthalmology", "Ocular Aesthetics",
  ],
};

/** About page images with intrinsic dimensions – display at original aspect ratio */
const ABOUT_IMAGES = {
  hero: { src: getImageUrl("/hero.webp"), width: 4165, height: 4133, alt: "Dr. Nikhil Nasta – Ophthalmologist, iSight Eye Care Mumbai" },
  publications: { src: getImageUrl("/publications.webp"), width: 1179, height: 1163, alt: "iSight Eye Care – Publications and recognition" },
  coffee: { src: getImageUrl("/coffee.webp"), width: 1104, height: 1110, alt: "Coffee consultation at iSight Eye Care" },
  pet: { src: getImageUrl("/pet.webp"), width: 5712, height: 4284, alt: "Pet friendly eye clinic – iSight Eye Care Mumbai" },
} as const;

const QUALIFICATIONS = [
  "M.S. in Ophthalmology, J.N. Medical College, Belgaum (2004)",
  "Diplomate of the National Board (D.N.B.)",
  "International Council of Ophthalmology certification, Cambridge, UK",
  "M.B.B.S., Padmashree Dr. D.Y. Patil Medical College, Nerul, Navi Mumbai (1999)",
  "Glaucoma short-term fellowship, Aravind Eye Hospital, Madurai",
  "Lasers in Diabetic Retinopathy fellowship, Aravind Eye Hospital, Madurai",
];

const AWARDS = [
  "Pfizer Gold Medallion and Plaque",
  "Special certificate for standing 4th in Mumbai University",
  "Dr. Govind Vishnu Juvekar Prize",
  "Smt. Chandanmohan Gold Medal",
];

const EXPERTISE = [
  "Cataract extraction & premium IOLs",
  "Glaucoma surgeries",
  "Refractive procedures (LASIK, Contoura Vision)",
  "Squint surgeries",
  "Oculoplastic procedures",
  "Corneal treatments",
];

export default function DoctorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />
    <div className="min-h-screen bg-silver-100">
      {/* Hero — full-bleed image */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={ABOUT_IMAGES.hero.src}
            fallbackSrc={getImageUrl("/hero.webp")}
            alt={ABOUT_IMAGES.hero.alt}
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-900/40 to-navy-900/95" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/40 to-transparent" aria-hidden />
        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 pb-12 lg:pb-16 pt-24 lg:pt-28">
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <div className="text-white max-w-xl md:ml-auto md:mr-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-400 mb-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.7)]">Our Doctor</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.8),0_4px_16px_rgba(0,0,0,0.6)]">
                Dr. Nikhil Nasta
              </h1>
              <p className="mt-3 text-silver-200 text-lg sm:text-xl max-w-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.7)]">
                Award-winning ophthalmologist · Founder of iSight Eye Care · Over 15 years of experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About & iSight intro */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">01</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
                Empowering clear vision through innovation and compassion
              </h2>
              <p className="mt-5 text-navy-700 leading-relaxed text-base sm:text-lg">
                iSight Eyecare and Surgery is a chain of multi-speciality eye care centres developed by Dr. Nikhil
                Nasta. Our centres are in two prime Mumbai locations—Khar and Dadar—equipped with the latest
                ophthalmic instruments and operating facilities.
              </p>
              <p className="mt-4 text-navy-700 leading-relaxed text-base sm:text-lg">
                The aim of iSight is to provide quality eye care for all patients at affordable prices. Dr. Nikhil
                Nasta is the founder and has over 15 years of experience with expertise across ophthalmology surgery,
                establishing the centre to offer a full range of skilled services to the community.
              </p>
            </div>
            <div className="relative max-w-lg rounded-2xl overflow-hidden shadow-soft-lg ring-1 ring-black/5">
              <ImageWithFallback
                src={ABOUT_IMAGES.publications.src}
                fallbackSrc={getImageUrl("/hero.webp")}
                alt={ABOUT_IMAGES.publications.alt}
                width={ABOUT_IMAGES.publications.width}
                height={ABOUT_IMAGES.publications.height}
                className="w-full h-auto block"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & expertise */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-silver-100 via-white to-silver-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(92,139,201,0.06),transparent)] pointer-events-none" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-clinical-500 text-white text-sm font-bold">02</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
              Qualifications & experience
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <article className="group relative rounded-2xl border border-silver-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(10,15,26,0.12)] hover:border-clinical-200/60 transition-all duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-clinical-400 to-clinical-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-clinical-100 text-clinical-500">
                  <GraduationCap className="w-5 h-5" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900">Education & certifications</h3>
              </div>
              <ul className="space-y-3">
                {QUALIFICATIONS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-700 text-[15px] leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-clinical-400 ring-4 ring-clinical-100" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="group relative rounded-2xl border border-silver-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(10,15,26,0.12)] hover:border-clinical-200/60 transition-all duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-clinical-400 to-clinical-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-600">
                  <Award className="w-5 h-5" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900">Awards & recognition</h3>
              </div>
              <ul className="space-y-3">
                {AWARDS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-700 text-[15px] leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 ring-4 ring-amber-50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="group relative rounded-2xl border border-silver-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(10,15,26,0.12)] hover:border-clinical-200/60 transition-all duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-clinical-400 to-clinical-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600">
                  <Stethoscope className="w-5 h-5" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900">Clinical expertise</h3>
              </div>
              <ul className="space-y-3">
                {EXPERTISE.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-700 text-[15px] leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Coffee Consultation */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">03</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
                Coffee consultation with Dr. Nikhil Nasta
              </h2>
              <p className="mt-5 text-navy-700 leading-relaxed text-base sm:text-lg">
                Sit with Dr. Nikhil Nasta and enjoy a coffee whilst talking about eyes and life. We believe in
                personalised attention and care—you’re not just a case number. Many of our patients have our team’s
                contact and are just a WhatsApp away when they need advice.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative max-w-sm mx-auto rounded-2xl overflow-hidden shadow-soft-lg ring-1 ring-black/5 bg-navy-50 p-6">
              <ImageWithFallback
                src={ABOUT_IMAGES.coffee.src}
                fallbackSrc={getImageUrl("/hero.webp")}
                alt={ABOUT_IMAGES.coffee.alt}
                width={ABOUT_IMAGES.coffee.width}
                height={ABOUT_IMAGES.coffee.height}
                className="w-full h-auto block"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pet Friendly */}
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative max-w-lg rounded-2xl overflow-hidden shadow-soft-lg ring-1 ring-black/5">
              <ImageWithFallback
                src={ABOUT_IMAGES.pet.src}
                fallbackSrc={getImageUrl("/hero.webp")}
                alt={ABOUT_IMAGES.pet.alt}
                width={ABOUT_IMAGES.pet.width}
                height={ABOUT_IMAGES.pet.height}
                className="w-full h-auto block"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">04</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
                Pet friendly eye clinic
              </h2>
              <p className="mt-5 text-navy-700 leading-relaxed text-base sm:text-lg">
                We welcome your furry companions. At iSight Eye Care we want you to feel at ease, whether that means
                bringing your pet along or simply knowing you’re in a warm, human-centred environment. So if you're looking for a pet friendly eye clinic in Mumbai, look no further than iSight Eye Care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — Dr. Nikhil: OT, portrait, TEDx */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">05</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            Behind the scenes
          </h2>
          <p className="mt-4 text-navy-700 leading-relaxed text-base sm:text-lg max-w-2xl">
            From the operating theatre to the stage—meet Dr. Nikhil Nasta in practice, in portrait, and at TEDx.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 lg:gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(10,15,26,0.15)] ring-1 ring-black/5 hover:shadow-[0_12px_40px_-8px_rgba(10,15,26,0.2)] transition-shadow duration-300"
              >
                <ImageWithFallback
                  src={img.src}
                  fallbackSrc={getImageUrl("/hero.webp")}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic photos — brick wall gallery */}
      <section className="relative py-14 lg:py-18 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-100/50 to-white pointer-events-none" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">06</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            Our clinic & facilities
          </h2>
          <p className="mt-4 text-navy-700 leading-relaxed text-base sm:text-lg max-w-2xl">
            iSight Eye Care centres in Khar and Dadar—modern equipment, comfortable spaces, and a team dedicated to your vision.
          </p>
          <div className="mt-10">
            <ClinicBrickGallery images={CLINIC_IMAGES} />
          </div>
        </div>
      </section>

      {/* Staff & philosophy */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">07</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            Continuous learning & care
          </h2>
          <p className="mt-5 text-navy-700 leading-relaxed text-base sm:text-lg max-w-3xl">
            Just like software updates, we upgrade the skills of our staff every month. Our team stays current with
            the latest in eye care so you receive the best possible treatment. Put your sight in Dr. Nikhil’s hands
            and you will see further ahead.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <BookAppointmentCTA variant="card" />
      </section>

      {/* Treatments quick links */}
      <section className="py-12 bg-silver-100 border-t border-silver-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-navy-900 mb-6">Our treatments</h2>
          <ul className="flex flex-wrap gap-3">
            {TREATMENT_LINKS.slice(0, 10).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block px-4 py-2 rounded-full bg-white border border-silver-200 text-navy-700 text-sm font-medium hover:border-clinical-400 hover:text-clinical-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 text-sm text-navy-500">
        Disclaimer: This information is for educational purposes only. Individual cases vary; consult a specialist
        for personalised advice.
      </p>
    </div>
    </>
  );
}
