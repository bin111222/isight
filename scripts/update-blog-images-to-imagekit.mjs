#!/usr/bin/env node
/**
 * Updates all blog post files to use ImageKit URLs for the title image.
 * Assumes images are uploaded as {slug}.webp under your ImageKit path.
 *
 * Usage (from project root):
 *   IMAGEKIT_BASE_URL=https://ik.imagekit.io/your_id/blog node scripts/update-blog-images-to-imagekit.mjs
 *   node scripts/update-blog-images-to-imagekit.mjs https://ik.imagekit.io/your_id/blog
 *
 * Base URL should NOT have a trailing slash (e.g. https://ik.imagekit.io/xxx/blog).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");

const BASE_URL =
  process.env.IMAGEKIT_BASE_URL ||
  process.argv.find((a) => a.startsWith("https://"));
if (!BASE_URL || !BASE_URL.startsWith("https://")) {
  console.error("Usage: IMAGEKIT_BASE_URL=<url> node scripts/update-blog-images-to-imagekit.mjs");
  console.error("   or: node scripts/update-blog-images-to-imagekit.mjs <base-url>");
  console.error("Example: node scripts/update-blog-images-to-imagekit.mjs https://ik.imagekit.io/your_id/blog");
  process.exit(1);
}

const baseUrl = BASE_URL.replace(/\/$/, "");

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
