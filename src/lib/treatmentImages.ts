import { readdirSync } from "fs";
import { join } from "path";

const TREATMENT_IMAGES_BASE = join(process.cwd(), "public", "Treatment Images");

/** Map treatment page slug to folder name under public/Treatment Images */
const SLUG_TO_FOLDER: Record<string, string> = {
  "lasik-surgery-mumbai": "Lasik",
  "cataract-surgery-mumbai": "Cataract",
  "trifocal-iol-surgery-mumbai": "Trifocal IOL (Intraocular Lens) Implants",
  "multifocal-iol-surgery-mumbai": "Multifocal IOL (Intraocular Lens)",
  "edof-iol-surgery-mumbai": "EDOF (Extended Depth of Focus) IOL Implants",
  "icl-surgery-mumbai": "Implantable Contact Lens",
  "corneal-transplant-surgery-mumbai": "Advanced Corneal Transplant Surgery",
  "retinal-surgery-mumbai": "Retinal Surgery",
  "retinal-injections-mumbai": "Retinal Injections for ARMD",
  "glaucoma-treatment-mumbai": "Glaucoma Treatment",
  "dry-eye-treatment-mumbai": "Dry eye",
  "pediatric-eye-care-mumbai": "Pediatric",
  "squint-correction-surgery-mumbai": "Advanced Squint Correction Surgery",
  "oculoplastic-surgery-botox-mumbai": "Advanced Oculoplastic Surgery and Botox Treatment",
  "skin-type-ocular-aesthetics-mumbai": "Advanced Oculoplastic Surgery and Botox Treatment",
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

/**
 * Returns public URLs for all images in this treatment's folder.
 * Used in server components only (reads filesystem at build/request time).
 */
export function getTreatmentImagePaths(slug: string): string[] {
  const folderName = SLUG_TO_FOLDER[slug];
  if (!folderName) return [];

  const dir = join(TREATMENT_IMAGES_BASE, folderName);
  let files: string[];
  try {
    files = readdirSync(dir);
  } catch {
    return [];
  }

  const images = files
    .filter((f) => IMAGE_EXT.has(f.slice(f.lastIndexOf(".")).toLowerCase()))
    .sort()
    .map((f) => `/Treatment Images/${folderName}/${f}`);

  return images;
}
