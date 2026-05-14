/**
 * Converts blogs/*.md (YAML frontmatter + markdown body) into src/content/posts/*.ts BlogPost modules.
 * Run from repo root: node scripts/convert-blog-md-to-ts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_POSTS = path.join(ROOT, "src/content/posts");
const BLOGS_DIR = path.join(ROOT, "blogs");

/** Plan order + May 2026 staggered dates (19 posts, all in May). */
const ORDERED_FILES = [
  "is-lasik-eye-surgery-painful-mumbai.md",
  "lasik-recovery-time-day-by-day-mumbai.md",
  "lasik-vs-contact-lenses-cost-lifestyle-mumbai.md",
  "lasik-risks-side-effects-honest-guide.md",
  "lasik-candidate-age-limit-eligibility-india.md",
  "can-lasik-be-repeated-enhancement-touch-up.md",
  "what-is-contoura-vision-vs-standard-lasik.md",
  "contoura-vision-cost-mumbai-worth-it.md",
  "contoura-vision-recovery-time-return-to-work.md",
  "contoura-vision-vs-smile-which-better.md",
  "contoura-vision-side-effects.md",
  "who-is-ideal-candidate-contoura-vision.md",
  "cataract-surgery-cost-mumbai-lens-breakdown.md",
  "monofocal-vs-multifocal-iol-cataract-lens-choice.md",
  "flacs-vs-phaco-cataract-surgery-comparison.md",
  "cataract-surgery-recovery-dos-and-donts.md",
  "cataract-surgery-safe-diabetic-patients.md",
  "when-right-time-cataract-surgery.md",
  "secondary-cataract-after-surgery-pco-yag.md",
];

const MAY_DATES = [
  "2026-05-02",
  "2026-05-03",
  "2026-05-04",
  "2026-05-05",
  "2026-05-06",
  "2026-05-08",
  "2026-05-09",
  "2026-05-10",
  "2026-05-11",
  "2026-05-12",
  "2026-05-13",
  "2026-05-14",
  "2026-05-15",
  "2026-05-16",
  "2026-05-17",
  "2026-05-18",
  "2026-05-19",
  "2026-05-20",
  "2026-05-21",
];

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw.trim());
  if (!m) throw new Error("Missing frontmatter");
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) fm[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
  }
  return { fm, body: m[2].trim() };
}

function stripMdBold(s) {
  return s.replace(/\*\*([^*]+)\*\*/g, "$1");
}

function parseTable(lines) {
  const tableLines = [];
  let i = 0;
  while (i < lines.length) {
    const L = lines[i].trim();
    if (L.startsWith("|") && L.includes("|")) {
      tableLines.push(L);
      i++;
      continue;
    }
    break;
  }
  if (tableLines.length < 2) return null;
  const sep = tableLines[1];
  if (!/^\|[\s\-:|]+\|$/.test(sep.replace(/\s/g, ""))) return null;
  const parseRow = (row) =>
    row
      .split("|")
      .map((c) => stripMdBold(c.trim()))
      .filter((c, idx, arr) => !(idx === 0 && c === "") && !(idx === arr.length - 1 && c === ""));
  const headers = parseRow(tableLines[0]);
  const rows = tableLines.slice(2).map(parseRow);
  if (!headers.length || !rows.length) return null;
  return { headers, rows, consumed: tableLines.length };
}

function parseMarkdownSections(content) {
  let text = content.replace(/\r\n/g, "\n");
  text = text.replace(/^#[^\n]+\n+/, "");
  const parts = text.split(/\n(?=## )/);
  const sections = [];
  const faqs = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const lines = trimmed.split("\n");
    const headingLine = lines[0].replace(/^##\s+/, "").trim();
    let rest = lines.slice(1).join("\n").trim();

    if (headingLine.toLowerCase() === "faq") {
      const chunks = rest.split(/\n(?=### )/);
      for (const ch of chunks) {
        const t = ch.trim();
        if (!t) continue;
        if (!t.startsWith("###")) continue;
        const sub = t.replace(/^###\s+/, "");
        const nl = sub.indexOf("\n");
        const q = nl === -1 ? sub.trim() : sub.slice(0, nl).trim();
        const a = nl === -1 ? "" : sub.slice(nl + 1).trim();
        if (q) faqs.push({ q: stripMdBold(q), a: stripMdBold(a) });
      }
      continue;
    }

    const bodyLines = rest.split("\n");
    let table = null;
    let startIdx = 0;
    if (bodyLines[0]?.trim().startsWith("|")) {
      const t = parseTable(bodyLines);
      if (t) {
        table = { headers: t.headers, rows: t.rows };
        startIdx = t.consumed;
      }
    }
    let body = bodyLines.slice(startIdx).join("\n").trim();
    body = body.replace(/\n---\n/g, "\n\n").trim();
    body = stripMdBold(body);

    const sec = { heading: headingLine };
    if (table) sec.table = table;
    if (body) sec.body = body;
    if (!sec.table && !sec.body && headingLine) sec.body = "";
    if (sec.table || sec.body || sec.heading) sections.push(sec);
  }

  return { sections, faqs };
}

function slugToVar(slug) {
  return "p_" + slug.replace(/-/g, "_");
}

function toTsModule(slug, post) {
  const json = JSON.stringify(post, null, 2);
  return `import type { BlogPost } from "@/types/content";

const post: BlogPost = ${json};

export default post;
`;
}

function main() {
  const manifest = [];
  for (let i = 0; i < ORDERED_FILES.length; i++) {
    const file = ORDERED_FILES[i];
    const fp = path.join(BLOGS_DIR, file);
    if (!fs.existsSync(fp)) throw new Error("Missing " + fp);
    const raw = fs.readFileSync(fp, "utf8");
    const { fm, body } = parseFrontmatter(raw);
    let slug = (fm.slug || "").replace(/^\//, "").trim();
    if (!slug) slug = file.replace(/\.md$/, "");
    const title = fm.title || slug;
    const description = fm.meta_description || fm.meta_title || "";
    const date = MAY_DATES[i] || MAY_DATES[MAY_DATES.length - 1];
    const { sections, faqs } = parseMarkdownSections(body);
    const post = {
      slug,
      title,
      description,
      date,
      sections,
      ...(faqs.length ? { faqs } : {}),
    };
    const outName = `${slug}.ts`;
    const outPath = path.join(SRC_POSTS, outName);
    fs.writeFileSync(outPath, toTsModule(slug, post), "utf8");
    manifest.push({ slug, varName: slugToVar(slug), importPath: `./${slug}`, outName });
    fs.unlinkSync(fp);
    console.log("Wrote", outPath);
  }

  const importLines = manifest
    .map((m) => `import ${m.varName} from "${m.importPath}";`)
    .sort()
    .join("\n");
  const regLines = manifest.map((m) => `  "${m.slug}": ${m.varName},`).sort().join("\n");

  const snippetPath = path.join(ROOT, "scripts/_registry-snippet.txt");
  fs.writeFileSync(
    snippetPath,
    `// Paste into registry.ts (imports alphabetically by path, then keys alphabetically):\n\n${importLines}\n\n${regLines}\n`,
    "utf8"
  );
  console.log("\nRegistry snippet:", snippetPath);
}

main();
