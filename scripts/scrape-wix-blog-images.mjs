#!/usr/bin/env node
/**
 * Scrapes blog hero images from the Wix sitemap (old-blog-sitemap.md), downloads
 * each to public/blog/{slug}.{ext}, and updates post files to use /blog/{slug}.{ext}.
 *
 * Run from project root:
 *   node scripts/scrape-wix-blog-images.mjs
 *
 * Options:
 *   --skip-existing   Skip download if file already exists in public/blog/
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITEMAP_PATH = path.join(ROOT, "old-website-files", "old-blog-sitemap.md");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");
const BLOG_IMAGES_DIR = path.join(ROOT, "public", "blog");

const SKIP_EXISTING = process.argv.includes("--skip-existing");

function parseSitemap(content) {
  const entries = [];
  const blocks = content.split(/<url>\s*/).filter((b) => b.includes("/post/"));
  for (const block of blocks) {
    const loc = block.match(/<loc>https:\/\/www\.eyesurgeonmumbai\.com\/post\/([^<]+)<\/loc>/);
    const image = block.match(/<image:loc>([^<]+)<\/image:loc>/);
    if (loc && image) {
      entries.push({ slug: loc[1].trim(), imageUrl: image[1] });
    }
  }
  return entries;
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
          reject(new Error(`HTTP ${res.statusCode}`));
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

function updatePostImageInFile(filePath, slug, newImagePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const updated = content.replace(
    /image:\s*["'][^"']+["']/,
    `image: "${newImagePath}"`
  );
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
    return true;
  }
  return false;
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const sitemapContent = fs.readFileSync(SITEMAP_PATH, "utf8");
  const entries = parseSitemap(sitemapContent);
  console.log(`Found ${entries.length} posts with images in sitemap.\n`);

  fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  let updated = 0;

  for (let i = 0; i < entries.length; i++) {
    const { slug, imageUrl } = entries[i];
    const ext = getExtension(imageUrl);
    const localFile = `${slug}.${ext}`;
    const outPath = path.join(BLOG_IMAGES_DIR, localFile);
    const publicPath = `/blog/${localFile}`;

    if (SKIP_EXISTING && fs.existsSync(outPath)) {
      process.stdout.write(`[${i + 1}/${entries.length}] ${slug} ... skip (exists)\n`);
      skipped++;
      const postPath = path.join(POSTS_DIR, `${slug}.ts`);
      if (fs.existsSync(postPath) && updatePostImageInFile(postPath, slug, publicPath)) {
        updated++;
      }
      continue;
    }

    process.stdout.write(`[${i + 1}/${entries.length}] ${slug} ... `);
    try {
      const buf = await downloadToBuffer(imageUrl);
      fs.writeFileSync(outPath, buf);
      console.log("OK");
      downloaded++;

      const postPath = path.join(POSTS_DIR, `${slug}.ts`);
      if (fs.existsSync(postPath) && updatePostImageInFile(postPath, slug, publicPath)) {
        updated++;
      }
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failed++;
    }
    await delay(400);
  }

  console.log(`\nDone. Downloaded: ${downloaded}, skipped: ${skipped}, failed: ${failed}.`);
  console.log(`Updated image path in ${updated} post files.`);
  console.log(`Images: ${BLOG_IMAGES_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
