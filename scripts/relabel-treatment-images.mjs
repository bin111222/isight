#!/usr/bin/env node
/**
 * Relabels all image files in public/Treatment Images to 1.webp, 2.webp, 3.webp, ...
 * in each folder. Uses the same sort order as the app (alphabetical by filename).
 * Run from project root: node scripts/relabel-treatment-images.mjs
 *
 * Options:
 *   --dry-run   Print renames only, do not change files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = path.join(ROOT, "public", "Treatment Images");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

function isImage(name) {
  return IMAGE_EXT.has(path.extname(name).toLowerCase());
}

const dryRun = process.argv.includes("--dry-run");

if (!fs.existsSync(BASE)) {
  console.error("Not found:", BASE);
  process.exit(1);
}

const folders = fs.readdirSync(BASE, { withFileTypes: true }).filter((d) => d.isDirectory());
let totalRenamed = 0;

for (const dir of folders) {
  const folderPath = path.join(BASE, dir.name);
  const files = fs.readdirSync(folderPath).filter(isImage).sort();

  if (files.length === 0) continue;

  // Check if already 1.webp, 2.webp, ... with no extras
  const alreadyLabeled =
    files.length > 0 &&
    files.every((f, i) => f === `${i + 1}.webp` || f === `${i + 1}.jpg` || f === `${i + 1}.png`);
  if (alreadyLabeled && files.every((f) => /^\d+\.(webp|jpg|png)$/i.test(f))) {
    continue;
  }

  // Phase 1: rename to temp names to avoid overwriting
  const tempNames = files.map((f, i) => `__relabel_${i}${path.extname(f)}`);
  for (let i = 0; i < files.length; i++) {
    const from = path.join(folderPath, files[i]);
    const to = path.join(folderPath, tempNames[i]);
    const ext = path.extname(files[i]).toLowerCase();
    const finalName = `${i + 1}${ext}`;
    if (!dryRun) fs.renameSync(from, to);
    console.log(`${dir.name}/ ${files[i]} → ${finalName}`);
    totalRenamed++;
  }

  // Phase 2: rename temp to final 1.webp, 2.webp, ...
  if (!dryRun) {
    for (let i = 0; i < tempNames.length; i++) {
      const from = path.join(folderPath, tempNames[i]);
      const ext = path.extname(files[i]).toLowerCase();
      const finalName = `${i + 1}${ext}`;
      const to = path.join(folderPath, finalName);
      fs.renameSync(from, to);
    }
  }
}

if (dryRun) {
  console.log("\n[DRY RUN] No files changed. Run without --dry-run to apply.");
} else {
  console.log(`\nRelabeled ${totalRenamed} file(s) across ${folders.length} folder(s).`);
}
