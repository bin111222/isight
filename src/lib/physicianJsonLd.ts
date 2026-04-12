import { SITE_URL } from "@/lib/sitemap";

/**
 * Shared Physician + Person structured data for homepage and /isight-eye-care-doctors.
 * Aligns with branded search (“Dr Nikhil Nasta”) and Google rich-result expectations.
 */
export const PHYSICIAN_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["Physician", "Person"],
  "@id": `${SITE_URL}/isight-eye-care-doctors#physician`,
  honorificPrefix: "Dr.",
  name: "Dr. Nikhil Nasta",
  givenName: "Nikhil",
  familyName: "Nasta",
  jobTitle: "Ophthalmologist & Eye Surgeon",
  description:
    "Award-winning ophthalmologist with over 15 years of experience. Expertise in cataract surgery, LASIK and Contoura Vision, retinal surgery, glaucoma, dry eye, pediatric ophthalmology, and oculoplastic surgery at iSight Eye Care & Surgery, Mumbai.",
  url: `${SITE_URL}/isight-eye-care-doctors`,
  image: `${SITE_URL}/hero.webp`,
  telephone: "+918692986033",
  medicalSpecialty: "Ophthalmology",
  sameAs: [
    "https://www.instagram.com/isighteyecare",
    "https://www.facebook.com/isighteyecare",
  ],
  worksFor: {
    "@type": "MedicalClinic",
    name: "iSight Eye Care & Surgery",
    alternateName: "iSight Eye Care",
    url: SITE_URL,
    telephone: "+918692986033",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Khar West",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400052",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Dadar West",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400028",
        addressCountry: "IN",
      },
    ],
  },
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
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Padmashree Dr. D.Y. Patil Medical College" },
    { "@type": "EducationalOrganization", name: "J.N. Medical College, Belgaum" },
  ],
  knowsAbout: [
    "Cataract surgery",
    "LASIK",
    "Contoura Vision",
    "Retinal surgery",
    "Glaucoma treatment",
    "Dry eye",
    "Pediatric ophthalmology",
    "Oculoplastic surgery",
  ],
  award: [
    "Ophthall Hall of Vision Recognition Award",
    "Pfizer Gold Medallion and Plaque",
  ],
} as const;
