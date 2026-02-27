/** Shared content types – used by lib/content and content/treatments to avoid circular deps */

export type ContentSection = {
  heading?: string;
  body?: string;
  list?: string[];
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
  date: string; // YYYY-MM-DD
  image?: string; // hero image slug (resolved via getBlogImageUrl)
};
