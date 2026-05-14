# Blog plan: Contoura, LASIK & Cataract (19 posts)

SEO focus: India / Mumbai intent, E-E-A-T (clear eligibility, risks, when to see a doctor), transactional CTAs. Each post is written after reviewing common themes in top-ranking pages (medical institutions, major eye hospitals, and patient-education sites); cite this file for image production, not for medical claims.

---

## Global keyword clusters

| Cluster | Primary intents | Example primary keywords |
|--------|------------------|---------------------------|
| LASIK | Fear, safety, recovery, cost vs contacts, candidacy | `is lasik painful`, `lasik recovery time`, `lasik vs contact lenses cost`, `lasik risks`, `lasik eligibility age`, `lasik enhancement` |
| Contoura | Premium procedure, comparison, recovery, side effects | `what is contoura vision`, `contoura vision cost mumbai`, `contoura vs smile`, `contoura recovery`, `contoura side effects`, `contoura candidate` |
| Cataract | Cost, lens choice, laser vs phaco, recovery, comorbidities, timing, PCO | `cataract surgery cost mumbai`, `monofocal vs multifocal lens`, `flacs vs phaco`, `cataract recovery`, `cataract surgery diabetes`, `when to have cataract surgery`, `secondary cataract` |

---

Live posts are **`BlogPost` modules** under [`src/content/posts/`](src/content/posts/) and registered in [`src/content/posts/registry.ts`](src/content/posts/registry.ts). URLs: `/post/{slug}` (no leading slash in slug).

---

## Schedule, files & SEO targets

All **19 posts** use a **`date` in May 2026** (staggered; satisfies “at least 15 in May”). Source files are TypeScript (`.ts`), not Markdown.

| # | Topic | File | Slug | `date` (YYYY-MM-DD) | Primary keyword |
|---|--------|------|------|---------------------|-----------------|
| 1 | Is LASIK painful? | [src/content/posts/is-lasik-eye-surgery-painful-mumbai.ts](src/content/posts/is-lasik-eye-surgery-painful-mumbai.ts) | `is-lasik-eye-surgery-painful-mumbai` | 2026-05-02 | is lasik eye surgery painful |
| 2 | LASIK recovery timeline | [src/content/posts/lasik-recovery-time-day-by-day-mumbai.ts](src/content/posts/lasik-recovery-time-day-by-day-mumbai.ts) | `lasik-recovery-time-day-by-day-mumbai` | 2026-05-03 | lasik recovery time |
| 3 | LASIK vs contact lenses | [src/content/posts/lasik-vs-contact-lenses-mumbai.ts](src/content/posts/lasik-vs-contact-lenses-mumbai.ts) | `lasik-vs-contact-lenses-mumbai` | 2026-05-04 | lasik vs contact lenses cost |
| 4 | LASIK risks & side effects | [src/content/posts/lasik-risks-side-effects.ts](src/content/posts/lasik-risks-side-effects.ts) | `lasik-risks-side-effects` | 2026-05-05 | lasik risks and side effects |
| 5 | LASIK candidacy & age | [src/content/posts/lasik-candidate-age-eligibility.ts](src/content/posts/lasik-candidate-age-eligibility.ts) | `lasik-candidate-age-eligibility` | 2026-05-06 | lasik surgery eligibility age |
| 6 | LASIK repeat / enhancement | [src/content/posts/can-lasik-be-repeated-enhancement.ts](src/content/posts/can-lasik-be-repeated-enhancement.ts) | `can-lasik-be-repeated-enhancement` | 2026-05-08 | lasik enhancement repeat surgery |
| 7 | What is Contoura vs LASIK | [src/content/posts/what-is-contoura-vision-vs-lasik.ts](src/content/posts/what-is-contoura-vision-vs-lasik.ts) | `what-is-contoura-vision-vs-lasik` | 2026-05-09 | what is contoura vision |
| 8 | Contoura cost worth it Mumbai | [src/content/posts/contoura-vision-cost-mumbai-worth-it.ts](src/content/posts/contoura-vision-cost-mumbai-worth-it.ts) | `contoura-vision-cost-mumbai-worth-it` | 2026-05-10 | contoura vision cost mumbai |
| 9 | Contoura recovery & work | [src/content/posts/contoura-vision-recovery-return-work.ts](src/content/posts/contoura-vision-recovery-return-work.ts) | `contoura-vision-recovery-return-work` | 2026-05-11 | contoura vision recovery time |
| 10 | Contoura vs SMILE | [src/content/posts/contoura-vision-vs-smile.ts](src/content/posts/contoura-vision-vs-smile.ts) | `contoura-vision-vs-smile` | 2026-05-12 | contoura vs smile |
| 11 | Contoura side effects | [src/content/posts/contoura-vision-side-effects.ts](src/content/posts/contoura-vision-side-effects.ts) | `contoura-vision-side-effects` | 2026-05-13 | contoura vision side effects |
| 12 | Contoura ideal candidate | [src/content/posts/ideal-candidate-contoura-vision.ts](src/content/posts/ideal-candidate-contoura-vision.ts) | `ideal-candidate-contoura-vision` | 2026-05-14 | contoura vision candidacy |
| 13 | Cataract cost Mumbai | [src/content/posts/cataract-surgery-cost-mumbai-lenses.ts](src/content/posts/cataract-surgery-cost-mumbai-lenses.ts) | `cataract-surgery-cost-mumbai-lenses` | 2026-05-15 | cataract surgery cost mumbai |
| 14 | Monofocal vs multifocal IOL | [src/content/posts/monofocal-vs-multifocal-iol.ts](src/content/posts/monofocal-vs-multifocal-iol.ts) | `monofocal-vs-multifocal-iol` | 2026-05-16 | monofocal vs multifocal lens cataract |
| 15 | FLACS vs phaco | [src/content/posts/flacs-vs-phaco-cataract-surgery.ts](src/content/posts/flacs-vs-phaco-cataract-surgery.ts) | `flacs-vs-phaco-cataract-surgery` | 2026-05-17 | laser cataract surgery vs traditional |
| 16 | Cataract recovery dos & don'ts | [src/content/posts/cataract-surgery-recovery-dos-donts.ts](src/content/posts/cataract-surgery-recovery-dos-donts.ts) | `cataract-surgery-recovery-dos-donts` | 2026-05-18 | cataract surgery recovery time |
| 17 | Cataract & diabetes | [src/content/posts/cataract-surgery-diabetes-safety.ts](src/content/posts/cataract-surgery-diabetes-safety.ts) | `cataract-surgery-diabetes-safety` | 2026-05-19 | cataract surgery diabetes |
| 18 | When to have cataract surgery | [src/content/posts/when-to-have-cataract-surgery.ts](src/content/posts/when-to-have-cataract-surgery.ts) | `when-to-have-cataract-surgery` | 2026-05-20 | when is cataract surgery needed |
| 19 | Secondary cataract (PCO) | [src/content/posts/secondary-cataract-pco-after-surgery.ts](src/content/posts/secondary-cataract-pco-after-surgery.ts) | `secondary-cataract-pco-after-surgery` | 2026-05-21 | secondary cataract after surgery |

---

## SERP research notes (themes consolidated from typical top results)

Use for editorial alignment only — all clinical copy in blog files is original and should be reviewed by your ophthalmologist before publishing.

### Post 1 — Pain
- Typical top sources: hospital patient blogs (Vision Eye Centre, Kataria), EyeQ India procedure guides.
- Themes: topical anaesthesia, pressure not pain, 2–4 h grittiness peak, odour during laser.

### Post 2 — Recovery
- Typical top sources: Krishnan Netralaya, Laxmi Eye aftercare guides, EyeQ India.
- Themes: day 1 blur, dry eye month 1, shield at night, no swim ~1 week.

### Post 3 — Contacts vs LASIK
- Typical top sources: Laxmi Eye lifestyle comparison, Jaipur Eye & Dental lifetime cost, cost aggregators.
- Themes: annual lens + solution spend, dust/AC dryness with contacts, break-even years.

### Post 4 — Risks
- Typical top sources: Mayo Clinic, AAO, FDA LASIK patient info, NEI.
- Themes: dry eye, glare/halos, under/over-correction, infection rare, realistic expectations.

### Post 5 — Eligibility
- Typical top sources: AAO, FDA “when LASIK is not for me”, Mayo Clinic candidacy.
- Themes: 18+ vs stable refraction 1–2 yr, pregnancy, keratoconus, thin cornea.

### Post 6 — Enhancement
- Typical top sources: Refractive Surgery Council, Review of Ophthalmology enhancement articles.
- Themes: wait until stable refraction, flap lift vs PRK-style touch-up, low % need retreatment.

### Post 7–12 — Contoura
- Typical top sources: hospital Contoura pages (Surya, Kapil Eye), SMILE vs Contoura compare articles (Centre for Sight, HealAssist).
- Themes: topography-guided 22k points, night vision quality, dry eye vs SMILE, cost premium.

### Post 13–19 — Cataract
- Typical top sources: Medanta patient education, Dr Jain–style FAQs, AAO FLACS vs phaco, Cleveland Clinic / AAO on PCO.
- Themes: phaco vs FLACS outcomes meta-analyses, IOL trade-offs, YAG for PCO.

---

## Images required (exact CDN filenames)

Upload to your image host under the **`blog/`** folder (same pattern as existing posts: `{NEXT_PUBLIC_IMAGE_CDN_BASE}/blog/<filename>.webp`). Use **exact** filenames below so designers, ImageKit, and `post.image` slugs stay aligned.

**Per post:** 1 hero + 3 in-article assets. Optional: set `image` on the `BlogPost` to the **hero** basename without `.webp` (e.g. `blog-01-hero-relaxed-patient-laser-suite`) when the hero file exists.

| # | Post slug (URL: `/post/<slug>`) | Hero `.webp` | In-article 1 | In-article 2 | In-article 3 |
|---|----------------------------------|----------------|----------------|--------------|----------------|
| 1 | `is-lasik-eye-surgery-painful-mumbai` | `blog-01-hero-relaxed-patient-laser-suite.webp` | `blog-01-inline-numbing-eye-drops.webp` | `blog-01-inline-pressure-not-pain-infographic.webp` | `blog-01-inline-post-op-night-shield.webp` |
| 2 | `lasik-recovery-time-day-by-day-mumbai` | `blog-02-hero-calendar-recovery-timeline.webp` | `blog-02-inline-day-zero-vs-day-seven-vision.webp` | `blog-02-inline-lubricating-eye-drops.webp` | `blog-02-inline-follow-up-clinic-visit.webp` |
| 3 | `lasik-vs-contact-lenses-mumbai` | `blog-03-hero-contact-lens-case-vs-laser-tech.webp` | `blog-03-inline-five-year-cost-comparison-chart.webp` | `blog-03-inline-dusty-mumbai-commute-sunglasses.webp` | `blog-03-inline-swimming-without-contacts.webp` |
| 4 | `lasik-risks-side-effects` | `blog-04-hero-surgeon-informed-consent-trust.webp` | `blog-04-inline-dry-eye-blink-comfort.webp` | `blog-04-inline-night-driving-glare-schematic.webp` | `blog-04-inline-corneal-flap-diagram-generic.webp` |
| 5 | `lasik-candidate-age-eligibility` | `blog-05-hero-pentacam-topography-screen.webp` | `blog-05-inline-age-stability-prescription-chart.webp` | `blog-05-inline-not-a-candidate-gentle-visual.webp` | `blog-05-inline-corneal-thickness-safe-zone.webp` |
| 6 | `can-lasik-be-repeated-enhancement` | `blog-06-hero-enhancement-fine-tuning-diagram.webp` | `blog-06-inline-same-eye-second-pass-schematic.webp` | `blog-06-inline-stability-calendar-three-months.webp` | `blog-06-inline-surgeon-refraction-measurement.webp` |
| 7 | `what-is-contoura-vision-vs-lasik` | `blog-07-hero-corneal-topography-heat-map.webp` | `blog-07-inline-standard-vs-topography-guided-compare.webp` | `blog-07-inline-laser-suite-wide-clean.webp` | `blog-07-inline-22000-data-points-callout.webp` |
| 8 | `contoura-vision-cost-mumbai-worth-it` | `blog-08-hero-premium-value-checklist-graphic.webp` | `blog-08-inline-price-bands-designed-table.webp` | `blog-08-inline-night-streetlights-bokeh.webp` | `blog-08-inline-consultation-quote-transparent.webp` |
| 9 | `contoura-vision-recovery-return-work` | `blog-09-hero-office-return-day-two-lifestyle.webp` | `blog-09-inline-clock-laptop-screen-breaks.webp` | `blog-09-inline-sunglasses-outdoor-bright-day.webp` | `blog-09-inline-post-op-drop-schedule-card.webp` |
| 10 | `contoura-vision-vs-smile` | `blog-10-hero-contoura-vs-smile-split-panel.webp` | `blog-10-inline-flap-vs-small-incision-icon.webp` | `blog-10-inline-dry-eye-risk-comparison-icons.webp` | `blog-10-inline-measurements-first-consult.webp` |
| 11 | `contoura-vision-side-effects` | `blog-11-hero-halos-medical-subtle-illustration.webp` | `blog-11-inline-conjunctival-redness-scale-chart.webp` | `blog-11-inline-follow-up-timeline-milestones.webp` | `blog-11-inline-lubrication-drops-lasik-aftercare.webp` |
| 12 | `ideal-candidate-contoura-vision` | `blog-12-hero-astigmatism-hoa-patient-persona.webp` | `blog-12-inline-topography-irregular-cornea.webp` | `blog-12-inline-not-for-keratoconus-warning-strip.webp` | `blog-12-inline-candidacy-checklist-approved.webp` |
| 13 | `cataract-surgery-cost-mumbai-lenses` | `blog-13-hero-iol-tray-lens-families-product.webp` | `blog-13-inline-cost-ladder-infographic.webp` | `blog-13-inline-phaco-handpiece-generic.webp` | `blog-13-inline-insurance-vs-premium-upgrade.webp` |
| 14 | `monofocal-vs-multifocal-iol` | `blog-14-hero-lens-optics-side-by-side-diagram.webp` | `blog-14-inline-reading-glasses-vs-glasses-free.webp` | `blog-14-inline-multifocal-night-halo-comparison.webp` | `blog-14-inline-lifestyle-occupation-choice-chart.webp` |
| 15 | `flacs-vs-phaco-cataract-surgery` | `blog-15-hero-laser-cataract-dock-vs-phaco-tip.webp` | `blog-15-inline-cost-vs-benefit-scales.webp` | `blog-15-inline-incision-architecture-diagram.webp` | `blog-15-inline-surgeon-case-selection-flowchart.webp` |
| 16 | `cataract-surgery-recovery-dos-donts` | `blog-16-hero-shield-sunglasses-post-cataract.webp` | `blog-16-inline-do-dont-two-column-graphic.webp` | `blog-16-inline-shower-eye-protection-timing.webp` | `blog-16-inline-drop-bottle-antibiotic-steroid.webp` |
| 17 | `cataract-surgery-diabetes-safety` | `blog-17-hero-hba1c-journal-with-eye-exam.webp` | `blog-17-inline-dilated-fundus-retina-concept.webp` | `blog-17-inline-microscope-sterile-surgical-field.webp` | `blog-17-inline-glucose-control-timeline.webp` |
| 18 | `when-to-have-cataract-surgery` | `blog-18-hero-night-driving-glare-oncoming-lights.webp` | `blog-18-inline-snellen-chart-blur-progression.webp` | `blog-18-inline-surgeon-decision-timing-tree.webp` | `blog-18-inline-dense-cataract-education-cross-section.webp` |
| 19 | `secondary-cataract-pco-after-surgery` | `blog-19-hero-pco-cloud-capsule-schematic.webp` | `blog-19-inline-yag-laser-spot-diagram.webp` | `blog-19-inline-frosted-glass-vision-metaphor.webp` | `blog-19-inline-post-yag-clear-window-result.webp` |

**Stock / compliance:** No real patient identifiers; avoid bloody surgical imagery; align with clinic brand colours when designing tables.

---

## Internal linking (suggested)

- All LASIK posts → pillar content in `src/content/posts/` (e.g. cost, safety, surgeon choice).
- Contoura posts → cross-link vs SMILE, vs standard LASIK, cost.
- Cataract posts → cost post, IOL post, recovery post, PCO post.

(Implement links in `sections[].body` as markdown-style `[text](url)`; `LinkifiedText` renders them on `/post/[slug]`.)

---

*Plan generated for iSight Eye Care content calendar. Publish dates are the `date` field in each `BlogPost` module (`YYYY-MM-DD`); posts stay hidden until that calendar day in Asia/Kolkata (see `isPostPublished` in `src/lib/posts.ts`).*
