/**
 * Normalises copy in the 19 new campaign posts: strips ###/#### line prefixes,
 * replaces em/en dashes, collapses excess blank lines.
 * Run: node scripts/normalize-new-blog-post-strings.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS = path.join(__dirname, "../src/content/posts");

const FILES = [
  "is-lasik-eye-surgery-painful-mumbai.ts",
  "lasik-recovery-time-day-by-day-mumbai.ts",
  "lasik-vs-contact-lenses-mumbai.ts",
  "lasik-risks-side-effects.ts",
  "lasik-candidate-age-eligibility.ts",
  "can-lasik-be-repeated-enhancement.ts",
  "what-is-contoura-vision-vs-lasik.ts",
  "contoura-vision-cost-mumbai-worth-it.ts",
  "contoura-vision-recovery-return-work.ts",
  "contoura-vision-vs-smile.ts",
  "contoura-vision-side-effects.ts",
  "ideal-candidate-contoura-vision.ts",
  "cataract-surgery-cost-mumbai-lenses.ts",
  "monofocal-vs-multifocal-iol.ts",
  "flacs-vs-phaco-cataract-surgery.ts",
  "cataract-surgery-recovery-dos-donts.ts",
  "cataract-surgery-diabetes-safety.ts",
  "when-to-have-cataract-surgery.ts",
  "secondary-cataract-pco-after-surgery.ts",
];

function extractJsonObject(src) {
  const marker = "const post: BlogPost = ";
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error("missing marker");
  let i = idx + marker.length;
  while (i < src.length && /\s/.test(src[i])) i++;
  if (src[i] !== "{") throw new Error("expected {");
  const begin = i;
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (c === "\\") {
        escaped = true;
        continue;
      }
      if (c === quote) inString = false;
      continue;
    }
    if (c === '"' || c === "'") {
      inString = true;
      quote = c;
      continue;
    }
    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) return JSON.parse(src.slice(begin, i + 1));
    }
  }
  throw new Error("unbalanced");
}

function normalizeText(s) {
  if (typeof s !== "string" || !s) return s;
  let t = s;
  t = t.replace(/\u2014/g, " - ");
  t = t.replace(/\u2013/g, "-");
  t = t.replace(/^#{4,6}\s*(.+)$/gm, "$1");
  t = t.replace(/^###\s*(.+)$/gm, "$1");
  t = t.replace(/\n{3,}/g, "\n\n");
  return t.trim();
}

function walk(obj) {
  if (obj == null) return;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === "string") obj[i] = normalizeText(obj[i]);
      else walk(obj[i]);
    }
    return;
  }
  if (typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === "string") obj[k] = normalizeText(v);
      else walk(v);
    }
  }
}

function toTs(post) {
  const json = JSON.stringify(post, null, 2);
  return `import type { BlogPost } from "@/types/content";

const post: BlogPost = ${json};

export default post;
`;
}

for (const f of FILES) {
  const fp = path.join(POSTS, f);
  const src = fs.readFileSync(fp, "utf8");
  const post = extractJsonObject(src);
  walk(post);
  fs.writeFileSync(fp, toTs(post), "utf8");
  console.log("Normalized", f);
}
