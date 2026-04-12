# Search Console SEO analysis — review & implementation plan

**Source document:** `SearchConsole_SEO_Analysis_eyesurgeonmumbai.docx` (90-day GSC snapshot, April 2026)  
**Purpose:** Separate what aligns with current SEO best practice from what is overstated, outdated, or must be verified in-property before you act.  
**Status:** For your review — no site changes have been made from this file yet.

---

## 1. Executive summary

The analysis correctly identifies **CTR improvement** (titles and descriptions), **indexing hygiene**, **HTTPS/canonical consolidation**, **branded and local entity signals** (homepage, doctor name, Google Business Profile), and **content gaps** (LASIK cluster) as levers worth working on.

It **overstates** guaranteed outcomes (“FAQ lifts CTR 20–30%”, “new LASIK page → page 1”), leans on **generic industry CTR benchmarks** without SERP context, and treats **FAQ rich results** as if they still behave like 2021. A few items need **confirmation inside Search Console and the live site** (indexed vs excluded URLs, CWV scope, HTTP property).

---

## 2. Verdict matrix (by theme)

| Theme | Verdict | Notes |
|--------|---------|--------|
| High impressions, low CTR → improve titles & descriptions | **Sound** | Meta description is not a ranking factor but strongly influences clicks; titles influence both (and Google may rewrite them). |
| Benchmark “3–8% CTR” / “~8% at position 5” | **Use with caution** | CTR depends on query mix, SERP features (AI overviews, maps, PAA), brand, and whether the URL matches intent. Use **query- and page-level** CTR, not one site-wide average vs a generic benchmark. |
| Rewrite titles: benefit + trust + year | **Mostly sound** | Trust and specificity help clicks; **year** can help for freshness-sensitive queries but can look repetitive if overused site-wide. Prefer **when the content is actually updated** or the query implies recency (e.g. costs). |
| Meta description ~155 characters + CTA | **Sound** | Treat as a guideline; Google truncates by pixel width and often rewrites. |
| Comparison table with prices on listicle | **Sound for UX & relevance** | Helps users and can support “comprehensive” coverage; **does not guarantee** table rich results. |
| Dedicated H2 for “lubricating eye drops” | **Sound** | Clear topical structure and internal relevance for long-tail coverage. |
| FAQ schema → “20–30% CTR boost” / “rich result expansion” | **Partially outdated / overstated** | Since [Google’s Aug 2023 change](https://developers.google.com/search/blog/2023/08/howto-faq-changes), **FAQ rich results in search are limited** for many sites; eligibility is not guaranteed even for health topics. FAQ **content** on-page remains useful; schema is optional and may not change SERP appearance. |
| “121 not indexed vs 110 indexed” | **Must verify** | Could reflect duplicates, `noindex`, low value URLs, or crawl budget — **audit in GSC (Pages → Why pages aren’t indexed)** before treating as one “structural” number. |
| LASIK impressions → “dedicated page = jump to page 1” | **Overconfident** | New URLs compete with established results; YMYL/medical queries need **E-E-A-T**, internal links, and time. Expect **gradual** movement, not automatic page 1. |
| Homepage / brand queries (“Dr Nikhil Nasta”, clinic name) | **Sound** | Title, H1, clear doctor/clinic page, internal links, GBP, and **Person/Physician**-appropriate structured data are standard. |
| HTTP vs HTTPS impressions | **Sound** | **301** everything to one canonical host (usually `https://www` or `https://` non-www), consistent **canonical** tags, **HTTPS** sitemap in GSC — **verify in server config and GSC URL inspection**, not only estimated clicks. |
| Core Web Vitals “only 34 mobile pages Good” | **Needs context** | CrUX/GSC reports reflect **URLs with enough data**; a small “Good” count can mean low traffic URLs lack field data, not necessarily that the whole site fails. Still worth fixing worst LCP/INP/CLS URLs that matter for revenue. |
| Internal linking between LASIK / cataract / homepage | **Sound** | Standard hub-and-spoke practice. |
| Word-count targets (2,000–2,500 words) | **Weak as a rule** | **Depth and intent satisfaction** beat length; match or beat top results’ usefulness, not a fixed word count. |

---

## 3. What is **correct / aligned** with SEO standards (safe to plan around)

1. **Treat CTR as a diagnostic** for pages that already earn impressions: test clearer titles and descriptions (especially for URLs averaging **positions 1–10** where the snippet is seen often).
2. **One canonical hostname and protocol**: redirect HTTP → HTTPS, pick `www` vs non-`www`, align canonicals and internal links.
3. **Branded search**: homepage title and visible H1 should make **clinic + doctor + city** unambiguous; strengthen the **team/doctor** URL with credentials and scope of practice.
4. **Local entity**: complete and accurate **Google Business Profile**, aligned NAP (name, address, phone) with the site.
5. **Content gaps from GSC**: if LASIK and cost/surgeon intent queries show impressions on weak URLs, **dedicated, helpful pages** (not keyword stubs) are a reasonable roadmap — with realistic timelines.
6. **On-page structure**: logical H2s, comparison sections where users expect them, and genuine FAQs **visible on the page** (whether or not schema earns a rich result).
7. **Indexing**: use GSC to classify **Crawled — currently not indexed**, **Duplicate**, **Excluded by `noindex`**, etc., and fix **templates** (pagination, tags, thin duplicates) rather than “force index” everything.
8. **Page experience**: improve **real-user** metrics for high-traffic templates (LCP, INP, CLS) where GSC/PageSpeed shows problems.

---

## 4. What is **misleading, overstated, or needs updating**

1. **“~36,000 extra clicks per month” / “200–500% lift”** from CTR fixes alone — **speculative** unless modeled per-query with position and current CTR; use **small A/B style rewrites** and remeasure.
2. **FAQ schema as primary CTR lever** — **downgrade priority**; keep FAQs for users; add schema only if implementation is clean and you accept that **rich result display may not appear**.
3. **“Rankings will jump to page 1”** when a LASIK page goes live — replace with: **target rankings over months**, supported by internal links, quality, and relevance.
4. **Single “Avg. CTR 0.7% should be 3–8%”** — misleading without splitting **branded vs non-branded**, **position distribution**, and **SERP feature** presence.
5. **FAQ “only on 2 pages” as a critical gap** — interesting internally, but **not equivalent** to “losing 20–30% CTR on all posts” given current rich result rules.

---

## 5. Pre-flight checklist (verify **before** implementation)

Do these in **Google Search Console** and on the **live site** so the plan targets real issues:

- [ ] **Pages** report: export or note top reasons for “not indexed” (duplicate, soft 404, crawl anomaly, etc.).
- [ ] **Performance** report: filter **top pages** and **top queries** — confirm CTR/position for the URLs named in the doc (they may have shifted).
- [ ] **URL Inspection**: sample **HTTP** and **HTTPS** URLs — confirm **Google-selected canonical** and **redirect** chain.
- [ ] **Sitemaps**: only canonical hostname; no stale HTTP sitemap if deprecated.
- [ ] **Core Web Vitals** (or CrUX in PageSpeed): identify **which templates** fail and whether failures align with **money pages**.
- [ ] **Live title/description**: compare to GSC “average position” per query — low CTR at **position 7+** is often **expected**, not only a “bad meta” problem.

---

## 6. Proposed implementation plan (for after you approve)

Phased so high-confidence, low-risk items come first.

### Phase A — Technical & measurement (week 1)

| # | Action | Rationale |
|---|--------|-----------|
| A1 | Confirm **301** HTTP→HTTPS and **host** consistency; fix canonical tags on key templates | Removes duplicate signals; aligns with Google’s preferred canonical. |
| A2 | GSC **indexing** audit: fix systematic causes (noindex, duplicates, thin URLs) | Ensures effort goes to URLs that can rank. |
| A3 | Document **baseline**: top 10 queries and pages by impressions — export for before/after | Objective measurement of title/description tests. |

### Phase B — Snippet & on-page (weeks 1–2)

| # | Action | Rationale |
|---|--------|-----------|
| B1 | Rewrite **title + meta description** for top impression URLs (eye drops, cataract cost, phaco comparison, homepage) using **specific** promises aligned with content | Improves CTR where snippets are shown; low risk if honest. |
| B2 | Homepage + doctor page: **clear H1**, doctor name, city, procedures, single primary intent | Branded and local queries; E-E-A-T signals for humans (and clearer relevance). |
| B3 | Eye drops post: **comparison table** (if accurate/maintainable), **H2** for lubricating drops | Matches intent for list/comparison queries; supports comprehensiveness. |
| B4 | Add **visible FAQ** blocks where questions are real patient questions; **schema optional** | User value first; schema second given rich result limits. |

### Phase C — Content (weeks 2–6+)

| # | Action | Rationale |
|---|--------|-----------|
| C1 | **LASIK cost Mumbai** and **LASIK surgeon / trust** pages (or merge if one strong page serves both intents — decide from SERP) | Addresses commercial intent visible in GSC. |
| C2 | **LASIK vs SMILE vs SILK vs Contoura** (or equivalent) if search demand and clinical accuracy allow | Captures comparison intent; must be medically reviewed. |
| C3 | **Internal links**: homepage ↔ pillar posts ↔ LASIK cluster | Distributes crawl and relevance. |

### Phase D — Ongoing

| # | Action | Rationale |
|---|--------|-----------|
| D1 | **CWV** fixes on templates that drive the most sessions | Page experience remains a signal; prioritize traffic-bearing layouts. |
| D2 | **GBP** posts, services, and website link alignment | Reinforces local + branded discovery. |

---

## 7. What this repo (`isighteyecare`) should do next

After you approve this plan:

1. Map each **Phase B/C** item to the actual routes and content modules in **this** codebase (if the production site is this project).
2. Implement **technical** items (canonicals, redirects) in hosting/config if not in the repo.
3. Apply **content and meta** changes in the site’s content source (e.g. post frontmatter or CMS fields) and redeploy.

---

## 8. Sign-off

- [ ] I’ve reviewed sections 2–4 and agree with the prioritization.  
- [ ] Pre-flight checklist (section 5) is done or assigned.  
- [ ] Proceed with Phase A → B → C as listed (or note edits below).

**Edits / notes from stakeholder:**

_(Add your changes here.)_

---

*This review interprets general SEO guidance as of April 2026; Google’s algorithms and rich result policies change — re-check [Google Search Central](https://developers.google.com/search) when implementing.*
