#!/usr/bin/env node
/**
 * Downloads blog title/hero images from Wix URLs to public/blog/ so you can
 * re-host them (e.g. on ImageKit). Run from project root:
 *
 *   node scripts/download-blog-images.mjs
 *
 * Options:
 *   --skip-existing   Skip downloading if file already exists in public/blog/
 *
 * Creates:
 *   - public/blog/{slug}.{ext}  – one image per post, named by slug
 *   - public/blog/manifest.json – mapping slug → { localFile, originalUrl } for ImageKit
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");
const BLOG_IMAGES_DIR = path.join(ROOT, "public", "blog");

const SKIP_EXISTING = process.argv.includes("--skip-existing");

/**
 * Extract slug and image URL from a post .ts file (regex, no TS eval).
 */
function parsePostFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
  const imageMatch = content.match(/image:\s*["']([^"']+)["']/);
  if (!slugMatch) return null;
  return {
    slug: slugMatch[1],
    imageUrl: imageMatch ? imageMatch[1] : undefined,
  };
}

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase().replace(/^\./, "");
    if (["png", "webp", "jpg", "jpeg", "gif", "avif"].includes(ext)) return ext;
    return "jpg";
  } catch {
    return "jpg";
  }
}

function downloadToBuffer(url) {
  const u = new URL(url);
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers: { "User-Agent": "Mozilla/5.0 (compatible; iSightMigration/1.0)" },
      },
      (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const postFiles = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "registry.ts");

  const entries = [];
  for (const file of postFiles) {
    const parsed = parsePostFile(path.join(POSTS_DIR, file));
    if (parsed && parsed.imageUrl) entries.push(parsed);
  }

  console.log(`Found ${entries.length} posts with title images (of ${postFiles.length} total).\n`);

  fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });

  const manifest = {};
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < entries.length; i++) {
    const { slug, imageUrl } = entries[i];
    const ext = getExtension(imageUrl);
    const localFile = `${slug}.${ext}`;
    const outPath = path.join(BLOG_IMAGES_DIR, localFile);

    manifest[slug] = {
      localFile,
      originalUrl: imageUrl,
    };

    if (SKIP_EXISTING && fs.existsSync(outPath)) {
      process.stdout.write(`[${i + 1}/${entries.length}] ${slug} ... skip (exists)\n`);
      skipped++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${entries.length}] ${slug} ... `);
    try {
      const buf = await downloadToBuffer(imageUrl);
      fs.writeFileSync(outPath, buf);
      console.log("OK");
      downloaded++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failed++;
    }
    await delay(400);
  }

  fs.writeFileSync(
    path.join(BLOG_IMAGES_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );

  console.log(`\nDone. Downloaded: ${downloaded}, skipped: ${skipped}, failed: ${failed}.`);
  console.log(`Images: ${BLOG_IMAGES_DIR}`);
  console.log(`Manifest: ${BLOG_IMAGES_DIR}/manifest.json (slug → localFile, originalUrl for ImageKit).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
