/** Shared content types – used by lib/content and content/treatments to avoid circular deps */

export type ContentTable = {
  headers: string[];
  rows: string[][];
};

export type ContentSection = {
  heading?: string;
  body?: string;
  list?: string[];
  table?: ContentTable;
};

export type FAQ = { q: string; a: string };

export type PageContent = {
  title: string;
  description?: string;
  subtitle?: string;
  sections: ContentSection[];
  faqs?: FAQ[];
};

/** Blog post – same URL as old Wix (/post/[slug]) for SEO */
export type BlogPost = PageContent & {
  slug: string;
  /** YYYY-MM-DD. If this calendar day (India time) is in the future, the post stays hidden until then. */
  date: string;
  /** YYYY-MM-DD. Optional last-update date for Google freshness signals. Falls back to `date` when absent. */
  dateModified?: string;
  /** Optional medical reviewer name (e.g., "Dr. Nikhil Nasta"). Adds reviewedBy + lastReviewed signals for YMYL. */
  reviewedBy?: string;
  image?: string; // hero image slug (resolved via getBlogImageUrl)
};
