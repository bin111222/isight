import type { BlogPost } from "@/types/content";
import POSTS_REGISTRY from "@/content/posts/registry";

/** All post slugs from old Wix blog – same paths for SEO. Generated from old-blog-sitemap.md. */
export const LEGACY_POST_SLUGS = [
  "phaco-surgery-mumbai",
  "ideal-candidate-for-phaco-cataract-surgery",
  "digital-eye-strain-how-to-protect-your-vision-in-the-screen-age",
  "best-lasik-laser-eye-surgery-in-mumbai-how-to-choose-the-right-doctor",
  "is-lasik-safe-after-40",
  "dry-eye-home-treatment",
  "who-should-perform-eye-aesthetic-treatments",
  "cataract-surgery-mumbai",
  "ipl-and-morpheus-for-dry-eye-treatment-restoring-comfort-and-clarity-at-i-sight-eye-care-mumbai",
  "morpheus-eye-rejuvenation-brighten-and-tighten-the-eyes-naturally",
  "eye-treatment-mumbai-international-patients",
  "cataract-surgery-recovery-time-healing-aftercare-what-to-expect",
  "contoura-vision-mumbai-bandra-guide",
  "lasik-surgery-bandra-mumbai-guide",
  "advantages-of-edof-iol-over-multifocal",
  "everything-you-need-to-know-about-robotic-cataract-surgery-in-mumbai",
  "phaco-surgery-recovery-timeline",
  "unlocking-clarity-understanding-the-cornea-of-the-eye-and-its-vital-role-in-vision",
  "pediatric-eye-care-mumbai-in-mumbai-conditions-treatments-why-early-checks-matter",
  "which-fruits-good-for-eyesight",
  "is-dry-eye-dangerous",
  "best-eye-drops-for-dry-eyes",
  "lasik-in-khar-mumbai",
  "myths-about-phaco-cataract-surgery",
  "dry-eye-therapy-mumbai",
  "glaucoma-the-silent-thief-of-sight-and-how-to-catch-it-early",
  "common-eye-area-aesthetic-concerns-solutions",
  "how-often-should-child-eye-checkup",
  "is-eye-surgery-in-india-safe-for-international-patients",
  "the-complete-guide-to-kids-eye-check-ups-when-why-and-how-to-protect-young-vision",
  "pediatric-eye-doctor-india",
  "do-edof-lenses-cause-halos-or-glare",
  "pediatric-eye-care-mumbai-in-mumbai-early-eye-checks-big-vision-for-little-eyes",
  "phaco-vs-traditional-cataract-surgery",
  "why-dry-eye-occurs",
  "are-eye-floaters-normal-after-40",
  "ipl-treatment-dry-eye-mumbai-guide",
  "vision-20-20-what-it-really-means-and-how-to-achieve-it-in-mumbai",
  "phaco-vs-traditional-cataract-surgery-which-technique-gives-better-results-in-mumbai",
  "cataract-surgery-cost-india-vs-usa-uk-uae",
  "dry-eye-treatment-in-mumbai-causes-modern-treatments-long-term-relief",
  "benefits-of-phaco-cataract-surgery",
  "blepharoplasty-eyelid-surgery-mumbai",
  "can-glaucoma-exist-without-symptoms",
  "laser-treatment-for-eyes-in-mumbai-who-it-s-for-how-it-works-and-what-to-expect",
  "can-cataract-come-back-after-surgery",
  "phaco-mumbai",
  "dry-eye-disease-treatment-mumbai",
  "ophthalmic-aesthetics-mumbai-guide",
  "edof-iol-vs-trifocal-iol",
  "edof-iol-surgery-mumbai-guide",
  "advantages-edof-iol-mumbai",
  "best-fruits-for-eyes",
  "icl-surgery-mumbai-india-guide",
  "pediatric-eye-doctor-near-me",
  "best-fruits-for-eyesight-improvement-natural-vision-boosters",
  "myopia-treatment-mumbai-guide",
  "pediatric-eye-doctor",
  "what-age-should-cataract-surgery-be-done",
  "can-dry-eye-cause-blurry-vision-permanently",
  "aesthetic-ophthalmology-mumbai-guide",
  "best-glaucoma-treatment-in-mumbai-early-detection-specialists-laser-surgery-options",
  "top-lasik-clinics-in-bandra",
  "edof-lens-night-driving-mumbai",
  "top-rated-lasik-surgeons-in-bandra",
  "cataract-surgery-cost-mumbai",
  "is-phaco-cataract-surgery-safe-for-elderly",
  "why-icl-instead-of-lasik",
  "dry-eye-treatment-mumbai-guide",
  "when-floaters-mean-trouble-understanding-retina-health",
  "cataract-surgery-mumbai-guide",
  "lasik-laser-eye-surgery-cost-in-india",
  "does-lasik-permanently-fix-eyes",
  "how-does-lasik-surgery-work-process-and-recovery",
  "best-clinics-for-lasik-eye-surgery-in-india",
  "advanced-eye-surgery-latest-technology-near-me",
  "best-eye-hospitals-laser-vision-correction-india",
  "affordable-advanced-eye-surgery-packages-india",
  "customized-cataract-surgery-options-india",
  "eye-surgery-centers-financing-emi-plans-india",
  "consultation-premium-lens-implant-surgeries-india",
  "hospitals-using-bladeless-laser-eye-surgery-india",
  "advanced-eye-surgery-insurance-coverage-india",
  "patient-reviews-advanced-eye-surgery-centers",
  "experienced-retinal-surgery-clinics-india",
  "top-rated-corneal-transplant-centers-india",
  "advanced-glaucoma-surgery-minimal-downtime-india",
  "hospitals-for-pediatric-advanced-eye-surgeries-india",
  "same-day-advanced-eye-surgery-procedures-india",
  "advanced-refractive-surgery-quick-recovery-centers-india",
] as const;

export type PostSlug = string;

/**
 * Preserve legacy ordering first, then include any newly added registry posts.
 * This ensures newly created posts appear without needing manual slug list updates.
 */
export const POST_SLUGS: PostSlug[] = [
  ...LEGACY_POST_SLUGS,
  ...Object.keys(POSTS_REGISTRY).filter(
    (slug) => !(LEGACY_POST_SLUGS as readonly string[]).includes(slug)
  ),
];

const SCHEDULE_TIMEZONE = "Asia/Kolkata";

/** YYYYMMDD integer for calendar comparison (timezone-agnostic date string). */
function calendarKeyFromDateString(dateStr: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return y * 10_000 + mo * 100 + d;
}

/** Today's calendar date as YYYYMMDD in India (publish schedule). */
function todayCalendarKeyIST(asOf: Date): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SCHEDULE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(asOf);
  const y = Number(parts.find((p) => p.type === "year")?.value);
  const m = Number(parts.find((p) => p.type === "month")?.value);
  const d = Number(parts.find((p) => p.type === "day")?.value);
  return y * 10_000 + m * 100 + d;
}

/**
 * True when `post.date` (YYYY-MM-DD) is on or before today's calendar date in Asia/Kolkata.
 * Invalid `date` strings are treated as published so content is not accidentally hidden.
 */
export function isPostPublished(
  post: BlogPost,
  asOf: Date = new Date()
): boolean {
  const postKey = calendarKeyFromDateString(post.date);
  if (postKey == null) return true;
  return postKey <= todayCalendarKeyIST(asOf);
}

/** Slugs visible on /blog, sitemap, and /post/[slug] (excludes future-dated posts). */
export function getPublishedPostSlugs(asOf: Date = new Date()): PostSlug[] {
  return getAllPostSlugs().filter((slug) => {
    const p = getPostBySlug(slug);
    return p != null && isPostPublished(p, asOf);
  });
}

export function getPublishedPosts(asOf: Date = new Date()): BlogPost[] {
  return getAllPosts().filter((p) => isPostPublished(p, asOf));
}

export function getAllPostSlugs(): PostSlug[] {
  return [...POST_SLUGS];
}

export function getPostBySlug(slug: string): BlogPost | null {
  return POSTS_REGISTRY[slug] ?? null;
}

export function getAllPosts(): BlogPost[] {
  return POST_SLUGS.map((slug) => getPostBySlug(slug)).filter(
    (p): p is BlogPost => p != null
  );
}

/**
 * Topic keywords used to group posts into clusters for related-article
 * recommendations and schema topic mapping. Order matters: the first match
 * wins, so list more specific topics (e.g., "contoura") before broader ones
 * (e.g., "lasik").
 */
const TOPIC_KEYWORDS: Array<{ topic: string; pattern: RegExp }> = [
  { topic: "smile", pattern: /\bsmile\b/ },
  { topic: "silk", pattern: /\bsilk\b/ },
  { topic: "contoura", pattern: /contoura/ },
  { topic: "icl", pattern: /\bicl\b/ },
  { topic: "lasik", pattern: /lasik|prk|refractive|laser-vision|laser-eye/ },
  { topic: "edof", pattern: /\bedof\b/ },
  { topic: "trifocal", pattern: /trifocal|multifocal/ },
  { topic: "cataract", pattern: /cataract|phaco|iol|lens-implant/ },
  { topic: "dry-eye", pattern: /dry-eye|tear|ipl|meibom/ },
  { topic: "glaucoma", pattern: /glaucoma/ },
  { topic: "retina", pattern: /retina|floater|diabetic-retin|injection/ },
  { topic: "pediatric", pattern: /pediatric|kids|child/ },
  { topic: "oculoplastic", pattern: /oculoplastic|blepharoplasty|eyelid|botox|aesthetic|cosmetic|morpheus/ },
  { topic: "corneal", pattern: /corneal-transplant|keratoplasty|cornea-/ },
  { topic: "squint", pattern: /squint|strabismus/ },
];

/** Primary topic for a post, derived from its slug. Returns null if no match. */
export function getPostTopic(slug: string): string | null {
  for (const { topic, pattern } of TOPIC_KEYWORDS) {
    if (pattern.test(slug)) return topic;
  }
  return null;
}

/**
 * Published posts sharing the same primary topic as `slug`, excluding the post
 * itself. Used to render the "Related articles" block and reinforce topic-cluster
 * signals for search. Returns at most `limit` posts.
 */
export function getRelatedPosts(
  slug: string,
  limit = 5,
  asOf: Date = new Date()
): BlogPost[] {
  const topic = getPostTopic(slug);
  if (!topic) return [];
  return getPublishedPosts(asOf)
    .filter((p) => p.slug !== slug && getPostTopic(p.slug) === topic)
    .slice(0, limit);
}

/** Approximate reading time in minutes from word count */
export function getReadingTimeMinutes(post: BlogPost): number {
  const text = [
    post.title,
    post.description,
    ...post.sections.flatMap((s) => {
      const fromTable = s.table
        ? [s.table.headers, ...s.table.rows].flat().join(" ")
        : "";
      return [s.heading, s.body, ...(s.list ?? []), fromTable].filter(Boolean);
    }),
    ...(post.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ]
    .filter(Boolean)
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
