import { getTreatmentImagePaths } from "@/lib/treatmentImages";
import { getImageUrl } from "@/lib/imageUrl";
import { TREATMENT_SLUGS, SITE_URL } from "@/lib/sitemap";
import HomePageClient, { type HomePageImages } from "@/components/HomePageClient";

const SERVICE_SLUGS = [
  "lasik-surgery-mumbai",
  "cataract-surgery-mumbai",
  "glaucoma-treatment-mumbai",
  "dry-eye-treatment-mumbai",
] as const;

function getFirstImage(slug: string): string {
  const paths = getTreatmentImagePaths(slug);
  return getImageUrl(paths[0] ?? "/hero.webp");
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  name: "iSight Eye Care & Surgery",
  alternateName: "iSight Eye Care",
  description:
    "Award-winning eye care centre in Mumbai. Comprehensive ophthalmology: LASIK, cataract, retinal surgery, glaucoma, dry eye, pediatric eye care, and ocular aesthetics.",
  url: SITE_URL,
  telephone: "+918692986033",
  priceRange: "₹₹",
  image: `${SITE_URL}/og-image.webp`,
  logo: `${SITE_URL}/logo.webp`,
  medicalSpecialty: "Ophthalmology",
  hasMap: "https://maps.google.com/?q=iSight+Eye+Care+Mumbai",
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.0760,
    longitude: 72.8777,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/isighteyecare",
    "https://www.facebook.com/isighteyecare",
  ],
};

const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Nikhil Nasta",
  description:
    "Award-winning ophthalmologist with over 15 years of experience. Expertise in cataract surgery, LASIK, retinal surgery, dry eye management, and ocular aesthetics.",
  url: `${SITE_URL}/isight-eye-care-doctors`,
  image: `${SITE_URL}/hero.webp`,
  medicalSpecialty: "Ophthalmology",
  worksFor: {
    "@type": "MedicalClinic",
    name: "iSight Eye Care & Surgery",
    url: SITE_URL,
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "MBBS" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "MS Ophthalmology" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "DNB Ophthalmology" },
  ],
  award: "Ophthall Hall of Vision Recognition Award",
};

/** Non-treatment pages that appear in service-style cards and need an image (e.g. International Patients) */
const EXTRA_SERVICE_SLUGS = ["international-patients"] as const;

export default function HomePage() {
  const serviceImages: Record<string, string> = {};
  for (const slug of TREATMENT_SLUGS) {
    serviceImages[slug] = getFirstImage(slug);
  }
  for (const slug of EXTRA_SERVICE_SLUGS) {
    serviceImages[slug] = getFirstImage(slug);
  }

  const images: HomePageImages = {
    serviceImages,
    spotlightCataractImage: getFirstImage("cataract-surgery-mumbai"),
    spotlightLasikImage: getFirstImage("lasik-surgery-mumbai"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />
      <HomePageClient images={images} />
    </>
  );
}
