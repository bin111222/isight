#!/usr/bin/env node
/**
 * Puts treatment images into the correct folders under public/Treatment Images.
 *
 * Usage:
 *   1. Audit (no args): list each treatment, its folder, and image count.
 *   2. Copy from source: node scripts/organize-treatment-images.mjs <path-to-source>
 *
 * Source directory can have subfolders named by:
 *   - Folder name (e.g. "Lasik", "Cataract", "Dry eye")
 *   - Or slug (e.g. "lasik-surgery-mumbai", "cataract-surgery-mumbai")
 * All image files in each subfolder are copied into the corresponding
 * public/Treatment Images/<folder>. Existing files are skipped unless --overwrite.
 *
 * Options:
 *   --overwrite   Replace existing files in destination (default: skip existing)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TREATMENT_IMAGES_BASE = path.join(ROOT, "public", "Treatment Images");

/** Same mapping as src/lib/treatmentImages.ts */
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

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const FOLDER_TO_SLUGS = Object.entries(SLUG_TO_FOLDER).reduce((acc, [slug, folder]) => {
  if (!acc[folder]) acc[folder] = [];
  acc[folder].push(slug);
  return acc;
}, {});

function isImageFile(name) {
  const ext = path.extname(name).toLowerCase();
  return IMAGE_EXT.has(ext);
}

function countImagesInDir(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter((f) => fs.statSync(path.join(dirPath, f)).isFile() && isImageFile(f)).length;
  } catch {
    return 0;
  }
}

function audit() {
  console.log("Treatment Images audit (public/Treatment Images):\n");
  const folders = [...new Set(Object.values(SLUG_TO_FOLDER))].sort();
  for (const folder of folders) {
    const dir = path.join(TREATMENT_IMAGES_BASE, folder);
    const count = countImagesInDir(dir);
    const slugs = FOLDER_TO_SLUGS[folder] || [];
    const slugLabel = slugs.length === 1 ? slugs[0] : slugs.join(", ");
    console.log(`  ${folder}`);
    console.log(`    → slugs: ${slugLabel}`);
    console.log(`    → images: ${count}`);
    console.log("");
  }
}

function copyImages(fromDir, toDir, overwrite) {
  let copied = 0;
  const files = fs.readdirSync(fromDir);
  for (const file of files) {
    const src = path.join(fromDir, file);
    if (!fs.statSync(src).isFile() || !isImageFile(file)) continue;
    const dest = path.join(toDir, file);
    if (!overwrite && fs.existsSync(dest)) continue;
    fs.mkdirSync(toDir, { recursive: true });
    fs.copyFileSync(src, dest);
    copied++;
  }
  return copied;
}

function organizeFromSource(sourcePath, overwrite) {
  const resolved = path.resolve(process.cwd(), sourcePath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    console.error("Source path is not a directory:", resolved);
    process.exit(1);
  }

  const subdirs = fs.readdirSync(resolved, { withFileTypes: true }).filter((d) => d.isDirectory());
  const folderNames = new Set(Object.values(SLUG_TO_FOLDER));
  let totalCopied = 0;

  for (const { name } of subdirs) {
    let destFolder = null;
    if (folderNames.has(name)) {
      destFolder = name;
    } else if (SLUG_TO_FOLDER[name]) {
      destFolder = SLUG_TO_FOLDER[name];
    } else {
      console.warn("  Skip (unknown folder):", name);
      continue;
    }

    const fromDir = path.join(resolved, name);
    const toDir = path.join(TREATMENT_IMAGES_BASE, destFolder);
    const copied = copyImages(fromDir, toDir, overwrite);
    if (copied > 0) {
      console.log(`  ${name} → ${destFolder}: ${copied} image(s) copied`);
      totalCopied += copied;
    }
  }

  console.log("\nTotal images copied:", totalCopied);
}

// --- main
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const overwrite = process.argv.includes("--overwrite");

if (args.length === 0) {
  audit();
} else {
  console.log("Copying treatment images from:", path.resolve(process.cwd(), args[0]));
  console.log("Overwrite existing:", overwrite);
  console.log("");
  organizeFromSource(args[0], overwrite);
}
