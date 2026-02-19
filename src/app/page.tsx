import { getTreatmentImagePaths } from "@/lib/treatmentImages";
import { TREATMENT_SLUGS } from "@/lib/sitemap";
import HomePageClient, { type HomePageImages } from "@/components/HomePageClient";

const SERVICE_SLUGS = [
  "lasik-surgery-mumbai",
  "cataract-surgery-mumbai",
  "glaucoma-treatment-mumbai",
  "dry-eye-treatment-mumbai",
] as const;

const FALLBACK_IMAGE = "/hero.webp";

function getFirstImage(slug: string): string {
  const paths = getTreatmentImagePaths(slug);
  return paths[0] ?? FALLBACK_IMAGE;
}

export default function HomePage() {
  const serviceImages: Record<string, string> = {};
  for (const slug of TREATMENT_SLUGS) {
    serviceImages[slug] = getFirstImage(slug);
  }

  const images: HomePageImages = {
    serviceImages,
    spotlightCataractImage: getFirstImage("cataract-surgery-mumbai"),
    spotlightLasikImage: getFirstImage("lasik-surgery-mumbai"),
  };

  return <HomePageClient images={images} />;
}
