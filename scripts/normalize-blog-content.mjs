#!/usr/bin/env node
/**
 * Normalizes all blog post content: collapse double spaces, fix spacing before punctuation.
 * Run from project root: node scripts/normalize-blog-content.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "src", "content", "posts");

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".ts") && f !== "registry.ts");
let count = 0;
for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  // Collapse 2+ spaces to 1; fix " ." -> ".", " ," -> ",", " ;" -> ";"
  content = content.replace(/\s{2,}/g, " ").replace(/\s+([.,;:])/g, "$1");
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    count++;
    console.log("Normalized:", file);
  }
}
console.log(`Done. Normalized ${count} files.`);
