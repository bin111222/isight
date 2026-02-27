#!/usr/bin/env node
/**
 * Prints the exact ImageKit URL used for each treatment card image (first image).
 * Use this to verify or upload missing files on ImageKit.
 * Run: node scripts/list-treatment-image-urls.mjs
 */

const SLUG_TO_FOLDER = {
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

const BASE =
  process.env.NEXT_PUBLIC_IMAGE_CDN_BASE ||
  "https://ik.imagekit.io/jaishreeskinfinitii/isighteyecare/public";

function encodePathSegments(path) {
  return path
    .split("/")
    .map((seg) => (seg ? encodeURIComponent(seg) : ""))
    .filter(Boolean)
    .join("/");
}

function getImageUrlPath(path) {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  const base = BASE.replace(/\/$/, "");
  const encoded = encodePathSegments(clean);
  return `${base}/${encoded}`;
}

console.log("Treatment card image URLs (first image = 1.webp when public/ missing):\n");
for (const [slug, folderName] of Object.entries(SLUG_TO_FOLDER)) {
  const path = `/Treatment Images/${folderName}/1.webp`;
  const url = getImageUrlPath(path);
  console.log(slug);
  console.log("  ", url);
  console.log("");
}
