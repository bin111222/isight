#!/usr/bin/env node
/**
 * Scrapes blog posts from the old Wix site (eyesurgeonmumbai.com/post/...)
 * and writes them to src/content/posts/*.ts. Run from project root:
 *
 *   node scripts/scrape-wix-blogs.mjs
 *
 * No extra deps – uses Node built-in https and regex parsing.
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITEMAP_PATH = path.join(ROOT, "old-website-files", "old-blog-sitemap.md");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");
const REGISTRY_PATH = path.join(POSTS_DIR, "registry.ts");

const BASE = "https://www.eyesurgeonmumbai.com";

function parseSitemap(content) {
  const entries = [];
  const blocks = content.split(/<url>\s*/).filter((b) => b.includes("/post/"));
  for (const block of blocks) {
    const loc = block.match(/<loc>https:\/\/www\.eyesurgeonmumbai\.com\/post\/([^<]+)<\/loc>/);
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    const image = block.match(/<image:loc>([^<]+)<\/image:loc>/);
    if (loc) {
      entries.push({
        slug: loc[1].trim(),
        lastmod: lastmod ? lastmod[1] : "",
        image: image ? image[1] : undefined,
      });
    }
  }
  return entries;
}

function fetchUrl(urlStr) {
  const u = new URL(urlStr);
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers: { "User-Agent": "Mozilla/5.0 (compatible; iSightMigration/1.0)" },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function htmlToSections(html) {
  const sections = [];
  const faqs = [];
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    || html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    || html.match(/data-hook="blog-post-content"[\s\S]*?>([\s\S]*?)(?:<\/div>|$)/i);
  let main = articleMatch ? articleMatch[1] : html;
  const h2Blocks = main.split(/(?=<h[23][^>]*>)/i);
  let inFaq = false;
  for (let i = 0; i < h2Blocks.length; i++) {
    const block = h2Blocks[i];
    const h2Match = block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const h3Match = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    const heading = (h2Match || h3Match) ? stripHtml((h2Match || h3Match)[1]) : "";
    const bodyHtml = block.replace(/<h[23][^>]*>[\s\S]*?<\/h[23]>/i, "").trim();
    const body = stripHtml(bodyHtml).replace(/\s+/g, " ").trim();
    if (/FAQ|❓|question/i.test(heading)) {
      inFaq = true;
    }
    if (inFaq && heading && body) {
      faqs.push({ q: heading.replace(/^\s*[-*]?\s*/, ""), a: body.slice(0, 500) });
      continue;
    }
    if (/top of page|bottom of page|CTA|📞|⭐|📘|👁️|🧠|✅|🚫|🔄|🏁/i.test(heading)) continue;
    if (heading || body) {
      sections.push({
        heading: heading ? heading.replace(/^[^\w\s]+/, "").trim() : undefined,
        body: body || undefined,
      });
    }
  }
  if (sections.length === 0 && main.length > 100) {
    const text = stripHtml(main).replace(/\s+/g, " ").trim();
    if (text.length > 50) sections.push({ body: text.slice(0, 3000) });
  }
  return { sections, faqs };
}

async function fetchPost(entry) {
  const url = `${BASE}/post/${entry.slug}`;
  let html;
  try {
    html = await fetchUrl(url);
  } catch (err) {
    console.warn(`  Fetch failed for ${entry.slug}:`, err.message);
    return null;
  }

  const titleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i)
    || html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch
    ? stripHtml(titleMatch[1]).replace(/\s*\|\s*.*$/, "").trim().slice(0, 120)
    : entry.slug.replace(/-/g, " ");
  const descMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i)
    || html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  const description = descMatch ? stripHtml(descMatch[1]).slice(0, 160) : "";

  const { sections, faqs } = htmlToSections(html);
  if (sections.length === 0) {
    console.warn(`  No content found for ${entry.slug}`);
    return null;
  }

  return {
    slug: entry.slug,
    title,
    description,
    date: entry.lastmod || new Date().toISOString().slice(0, 10),
    image: entry.image,
    sections: sections.filter((s) => s.heading || (s.body && s.body.length > 20)),
    faqs: faqs.length > 0 ? faqs : undefined,
  };
}

function writePostFile(post) {
  const sectionsStr = post.sections
    .map(
      (s) =>
        `    {\n      ${s.heading ? `heading: ${JSON.stringify(s.heading)},` : ""}\n      body: ${JSON.stringify((s.body || "").trim())},\n    }`
    )
    .join(",\n");
  const faqsStr =
    post.faqs && post.faqs.length
      ? `  faqs: [\n${post.faqs.map((f) => `    { q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} }`).join(",\n")},\n  ],\n`
      : "";

  const content = `import type { BlogPost } from "@/types/content";

/** Scraped from old Wix – same URL /post/${post.slug} for SEO */
const post: BlogPost = {
  slug: ${JSON.stringify(post.slug)},
  title: ${JSON.stringify(post.title)},
  description: ${JSON.stringify(post.description || "")},
  date: ${JSON.stringify(post.date)},
  image: ${post.image ? JSON.stringify(post.image) : "undefined"},
  sections: [
${sectionsStr}
  ],
${faqsStr}};

export default post;
`;
  const outPath = path.join(POSTS_DIR, `${post.slug}.ts`);
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(outPath, content, "utf8");
}

function toVar(slug) {
  return "p_" + slug.replace(/-/g, "_").replace(/[^a-z0-9_]/gi, "_");
}

function writeRegistry(slugs) {
  const imports = slugs
    .map((s) => `import ${toVar(s)} from "./${s}";`)
    .join("\n");
  const entries = slugs
    .map((s) => `  "${s}": ${toVar(s)},`)
    .join("\n");
  const content = `/**
 * Registry of all blog posts. Same URLs as old Wix (/post/[slug]) for SEO.
 * Generated by scripts/scrape-wix-blogs.mjs
 */
import type { BlogPost } from "@/types/content";
${imports}

const POSTS: Record<string, BlogPost> = {
${entries}
};

export default POSTS;
`;
  fs.writeFileSync(REGISTRY_PATH, content, "utf8");
}

async function main() {
  const sitemapContent = fs.readFileSync(SITEMAP_PATH, "utf8");
  const entries = parseSitemap(sitemapContent);
  console.log(`Found ${entries.length} posts in sitemap.`);

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const written = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const exists = fs.existsSync(path.join(POSTS_DIR, `${entry.slug}.ts`));
    if (exists && process.argv.includes("--skip-existing")) {
      written.push(entry.slug);
      continue;
    }
    process.stdout.write(`[${i + 1}/${entries.length}] ${entry.slug} ... `);
    const post = await fetchPost(entry);
    if (post) {
      writePostFile(post);
      written.push(entry.slug);
      console.log("OK");
    } else {
      console.log("SKIP");
    }
    await delay(600);
  }

  const existing = fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "registry.ts")
    .map((f) => f.replace(/\.ts$/, ""));
  const allSlugs = [...new Set([...written, ...existing])].sort();
  writeRegistry(allSlugs);
  console.log(`\nDone. Wrote ${written.length} posts. Registry has ${allSlugs.length} entries.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
