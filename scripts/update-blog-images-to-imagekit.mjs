#!/usr/bin/env node
/**
 * Updates all blog post files to use ImageKit URLs for the title image.
 * Uses the same public slug as the site (NEXT_PUBLIC_IMAGE_CDN_BASE). Blog images at {base}/blog/{slug}.webp.
 *
 * Usage (from project root):
 *   IMAGEKIT_BASE_URL=https://ik.imagekit.io/your_id/public node scripts/update-blog-images-to-imagekit.mjs
 *   node scripts/update-blog-images-to-imagekit.mjs https://ik.imagekit.io/your_id/public
 *
 * Base URL = ImageKit public path (no trailing slash), e.g. https://ik.imagekit.io/xxx/isighteyecare/public
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");

const PUBLIC_BASE =
  process.env.IMAGEKIT_BASE_URL ||
  process.env.NEXT_PUBLIC_IMAGE_CDN_BASE ||
  process.argv.find((a) => a.startsWith("https://"));
if (!PUBLIC_BASE || !PUBLIC_BASE.startsWith("https://")) {
  console.error("Usage: IMAGEKIT_BASE_URL=<public-base> node scripts/update-blog-images-to-imagekit.mjs");
  console.error("   or: node scripts/update-blog-images-to-imagekit.mjs <public-base>");
  console.error("Example: node scripts/update-blog-images-to-imagekit.mjs https://ik.imagekit.io/your_id/public");
  process.exit(1);
}

const baseUrl = PUBLIC_BASE.replace(/\/$/, "") + "/blog";

function getSlugAndImageLine(content) {
  const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
  const imageMatch = content.match(/(\s*image:\s*)["']([^"']+)["']/);
  if (!slugMatch) return null;
  return {
    slug: slugMatch[1],
    imageMatch,
  };
}

const postFiles = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".ts") && f !== "registry.ts");

let updated = 0;
for (const file of postFiles) {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, "utf8");
  const info = getSlugAndImageLine(content);
  if (!info || !info.imageMatch) continue;

  const newUrl = `${baseUrl}/${info.slug}.webp`;
  const newLine = `${info.imageMatch[1]}${JSON.stringify(newUrl)},`;
  const oldLine = info.imageMatch[0] + ",";
  if (oldLine === newLine) continue;

  const newContent = content.replace(
    /(\s*image:\s*)["'][^"']+["'],/,
    `${info.imageMatch[1]}${JSON.stringify(newUrl)},`
  );
  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`${info.slug} → ${newUrl}`);
  updated++;
}

console.log(`\nUpdated ${updated} post(s) to use ImageKit (${baseUrl}/...).webp`);
