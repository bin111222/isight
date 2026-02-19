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
