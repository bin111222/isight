// Exact URLs from old-sitemap.md - do not change for SEO
export const SITE_URL = "https://www.eyesurgeonmumbai.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  { href: "/eye-quiz", label: "Eye Quiz" },
  { href: "/isight-eye-care-doctors", label: "Our Doctor" },
  { href: "/blog", label: "Blog" },
  { href: "/consult", label: "Consult" },
  { href: "/awards-eye-surgeon-mumbai", label: "Awards" },
] as const;

// Treatment/procedure pages from old-sitemap.md – exact URLs for SEO
export const TREATMENT_LINKS = [
  { href: "/lasik-surgery-mumbai", label: "LASIK Surgery Mumbai" },
  { href: "/trifocal-iol-surgery-mumbai", label: "Trifocal IOL Surgery Mumbai" },
  { href: "/pediatric-eye-care-mumbai", label: "Pediatric Eye Care Mumbai" },
  { href: "/icl-surgery-mumbai", label: "ICL Surgery Mumbai" },
  { href: "/oculoplastic-surgery-botox-mumbai", label: "Oculoplastic Surgery & Botox Mumbai" },
  { href: "/multifocal-iol-surgery-mumbai", label: "Multifocal IOL Surgery Mumbai" },
  { href: "/retinal-injections-mumbai", label: "Retinal Injections Mumbai" },
  { href: "/edof-iol-surgery-mumbai", label: "EDOF IOL Surgery Mumbai" },
  { href: "/cataract-surgery-mumbai", label: "Cataract Surgery Mumbai" },
  { href: "/squint-correction-surgery-mumbai", label: "Squint Correction Surgery Mumbai" },
  { href: "/corneal-transplant-surgery-mumbai", label: "Corneal Transplant Surgery Mumbai" },
  { href: "/glaucoma-treatment-mumbai", label: "Glaucoma Treatment Mumbai" },
  { href: "/retinal-surgery-mumbai", label: "Retinal Surgery Mumbai" },
  { href: "/skin-type-ocular-aesthetics-mumbai", label: "Skin Type Ocular Aesthetics Mumbai" },
  { href: "/dry-eye-treatment-mumbai", label: "Dry Eye Treatment Mumbai" },
] as const;

/** Slugs that use the treatment page layout (breadcrumb, author, related links) */
export const TREATMENT_SLUGS = TREATMENT_LINKS.map((l) => l.href.slice(1));

export const ALL_PAGE_SLUGS = [
  "",
  "treatments",
  "isight-eye-care-doctors",
  "blog",
  "consult",
  "awards-eye-surgeon-mumbai",
  "lasik-surgery-mumbai",
  "trifocal-iol-surgery-mumbai",
  "pediatric-eye-care-mumbai",
  "icl-surgery-mumbai",
  "oculoplastic-surgery-botox-mumbai",
  "multifocal-iol-surgery-mumbai",
  "retinal-injections-mumbai",
  "edof-iol-surgery-mumbai",
  "cataract-surgery-mumbai",
  "squint-correction-surgery-mumbai",
  "corneal-transplant-surgery-mumbai",
  "glaucoma-treatment-mumbai",
  "retinal-surgery-mumbai",
  "skin-type-ocular-aesthetics-mumbai",
  "dry-eye-treatment-mumbai",
] as const;
