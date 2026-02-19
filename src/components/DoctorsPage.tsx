import Image from "next/image";
import Link from "next/link";
import { TREATMENT_LINKS } from "@/lib/sitemap";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";

/** About page images with intrinsic dimensions – display at original aspect ratio */
const ABOUT_IMAGES = {
  hero: { src: "/hero.webp", width: 4165, height: 4133, alt: "Dr. Nikhil Nasta – Ophthalmologist, iSight Eye Care Mumbai" },
  publications: { src: "/publications.jpg", width: 1179, height: 1163, alt: "iSight Eye Care – Publications and recognition" },
  coffee: { src: "/coffee.png", width: 1104, height: 1110, alt: "Coffee consultation at iSight Eye Care" },
  pet: { src: "/pet.jpg", width: 5712, height: 4284, alt: "Pet friendly eye clinic – iSight Eye Care Mumbai" },
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
    <div className="min-h-screen bg-silver-100">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end mesh-bg overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/60" aria-hidden />
        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 pb-12 lg:pb-16 pt-24 lg:pt-28">
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <div className="relative flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl w-48 sm:w-56 md:w-64">
              <Image
                src={ABOUT_IMAGES.hero.src}
                alt={ABOUT_IMAGES.hero.alt}
                width={ABOUT_IMAGES.hero.width}
                height={ABOUT_IMAGES.hero.height}
                className="w-full h-auto block"
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                priority
              />
            </div>
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-400 mb-2">Our Doctors</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">
                Dr. Nikhil Nasta
              </h1>
              <p className="mt-3 text-silver-200 text-lg sm:text-xl max-w-xl">
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
              <Image
                src={ABOUT_IMAGES.publications.src}
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
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">02</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-2">
            Qualifications & experience
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Education & certifications</h3>
              <ul className="space-y-2.5">
                {QUALIFICATIONS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-700 text-[15px] leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-clinical-400 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Awards & recognition</h3>
              <ul className="space-y-2.5">
                {AWARDS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-700 text-[15px] leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-clinical-400 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">Clinical expertise</h3>
              <ul className="space-y-2.5">
                {EXPERTISE.map((item, i) => (
                  <li key={i} className="flex gap-3 text-navy-700 text-[15px] leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-clinical-400 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
              <Image
                src={ABOUT_IMAGES.coffee.src}
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
              <Image
                src={ABOUT_IMAGES.pet.src}
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
                Pet friendly clinic
              </h2>
              <p className="mt-5 text-navy-700 leading-relaxed text-base sm:text-lg">
                We welcome your furry companions. At iSight Eye Care we want you to feel at ease—whether that means
                bringing your pet along or simply knowing you’re in a warm, human-centred environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff & philosophy */}
      <section className="py-14 lg:py-18 bg-silver-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clinical-500">05</span>
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
  );
}
