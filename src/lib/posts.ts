import type { BlogPost } from "@/types/content";
import POSTS_REGISTRY from "@/content/posts/registry";

/** All post slugs from old Wix blog – same paths for SEO. Generated from old-blog-sitemap.md. */
export const POST_SLUGS = [
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
  "pediatric-eye-care-in-mumbai-conditions-treatments-why-early-checks-matter",
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
  "pediatric-eye-care-in-mumbai-early-eye-checks-big-vision-for-little-eyes",
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
] as const;

export type PostSlug = (typeof POST_SLUGS)[number];

export function getAllPostSlugs(): PostSlug[] {
  return [...POST_SLUGS];
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!POST_SLUGS.includes(slug as PostSlug)) return null;
  return POSTS_REGISTRY[slug] ?? null;
}

export function getAllPosts(): BlogPost[] {
  return POST_SLUGS.map((slug) => getPostBySlug(slug)).filter(
    (p): p is BlogPost => p != null
  );
}

/** Approximate reading time in minutes from word count */
export function getReadingTimeMinutes(post: BlogPost): number {
  const text = [
    post.title,
    post.description,
    ...post.sections.flatMap((s) => [s.heading, s.body, ...(s.list ?? [])].filter(Boolean)),
    ...(post.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ]
    .filter(Boolean)
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
