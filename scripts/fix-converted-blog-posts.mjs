/**
 * Post-processes BlogPost .ts files generated from markdown (fixes intro-as-heading, --- noise).
 * Run: node scripts/fix-converted-blog-posts.mjs
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
  if (src[i] !== "{") throw new Error("expected { at " + i);
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
  throw new Error("unbalanced braces");
}

function stripMdBold(s) {
  if (!s) return s;
  return s.replace(/\*\*([^*]+)\*\*/g, "$1");
}

function stripHr(s) {
  if (!s) return s;
  return s
    .replace(/\n---\s*$/g, "")
    .replace(/\n---\n/g, "\n\n")
    .replace(/^\s*---\s*$/gm, "")
    .trim();
}

function isIntroAsHeading(heading, body) {
  if (!heading) return false;
  const b = (body || "").trim();
  if (heading.length > 90) return true;
  if (b === "---" || b === "" || /^\n*---\n*$/.test(b)) return true;
  return false;
}

function mergeIntroSection(sec) {
  const h = sec.heading || "";
  const b = stripHr(sec.body || "");
  const body = stripMdBold(
    [h, b].filter((x) => x && x !== "---").join("\n\n").trim()
  );
  return { body };
}

function promoteSubsectionsToHeadings(sections) {
  /** Turn lines like "### Foo" into separate sections when they appear in long bodies. Optional simplification: keep as body. */
  return sections;
}

function cleanPost(post) {
  const sections = [...post.sections];
  if (sections.length && isIntroAsHeading(sections[0].heading, sections[0].body)) {
    sections[0] = mergeIntroSection(sections[0]);
  }
  for (const s of sections) {
    if (s.body) s.body = stripMdBold(stripHr(s.body));
    if (s.heading) s.heading = stripMdBold(stripHr(s.heading));
    if (s.table) {
      s.table.headers = s.table.headers.map((h) => stripMdBold(h));
      s.table.rows = s.table.rows.map((row) => row.map((c) => stripMdBold(c)));
    }
  }
  if (post.faqs) {
    for (const f of post.faqs) {
      f.a = stripMdBold(stripHr(f.a));
      f.q = stripMdBold(stripHr(f.q));
    }
  }
  return { ...post, sections: promoteSubsectionsToHeadings(sections) };
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
  const post = cleanPost(extractJsonObject(src));
  fs.writeFileSync(fp, toTs(post), "utf8");
  console.log("Fixed", f);
}
