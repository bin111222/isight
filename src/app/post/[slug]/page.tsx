import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPostBySlug,
  getPublishedPostSlugs,
  getReadingTimeMinutes,
  isPostPublished,
} from "@/lib/posts";
import { LinkifiedText } from "@/lib/linkify";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import { BlogFAQAccordion } from "@/components/ui/blog-faq-accordion";
import { SITE_URL } from "@/lib/sitemap";
import { getBlogImageUrl } from "@/lib/blogImageUrl";
import { formatTitleTag } from "@/lib/seoTitle";
import { Twitter, Linkedin, Facebook, MessageCircle } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

/** Revalidate so future-dated posts become reachable after their publish day without redeploying. */
export const revalidate = 3600;

export async function generateStaticParams() {
  return getPublishedPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: formatTitleTag("Blog") };
  if (!isPostPublished(post)) notFound();
  const canonical = `${SITE_URL}/post/${slug}`;
  const ogImage = post.image ? getBlogImageUrl(post.image) : `${SITE_URL}/og-image.webp`;
  const title = formatTitleTag(post.title);
  return {
    title,
    description: post.description ?? undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description: post.description ?? undefined,
      url: canonical,
      siteName: "iSight Eye Care",
      locale: "en_IN",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description ?? undefined,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  if (!isPostPublished(post)) notFound();

  const readingMin = getReadingTimeMinutes(post);
  const canonical = `${SITE_URL}/post/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(canonical);

  return (
    <article className="min-h-screen bg-white -mt-16 pt-16 pb-16 lg:pb-24">
      {/* 1. Header & Hero Section */}
      <header className="pt-12 pb-8 md:pt-16 md:pb-12 border-b border-silver-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-900 text-sm font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl font-bold text-navy-950 leading-[1.15] mb-8 tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            {/* Author Avatar */}
            <div className="h-12 w-12 rounded-full overflow-hidden bg-silver-200 shrink-0">
              <img
                src="/hero.webp"
                alt="Dr. Nikhil Nasta"
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-semibold text-navy-900">Dr. Nikhil Nasta</span>
              <div className="flex items-center gap-2 text-sm text-navy-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{readingMin} min read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 md:mt-12 mb-12 md:mb-16">
          <div className="w-full overflow-hidden rounded-2xl bg-silver-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getBlogImageUrl(post.image)}
              alt={post.title}
              className="w-full object-cover"
              style={{ maxHeight: '600px' }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* 2. Editorial Typography & Layout */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="prose prose-lg md:prose-xl max-w-none text-navy-800 space-y-8">
          {post.sections.map((section, i) => {
            let bodyText = section.body?.trim() || "";
            let headingText = section.heading?.trim() || "";

            // Filter out scraped metadata lines often found at the start of the first section
            if (i === 0 && bodyText.includes("Dr. Nikhil Nasta") && bodyText.includes("min read")) {
              bodyText = bodyText.replace(/^.*min read\s*/i, "").trim();
            }

            // Remove standalone "FAQs" headings since we render an accordion at the bottom
            if (headingText.toLowerCase() === "faqs") {
              headingText = "";
            }

            const hasContent =
              headingText ||
              bodyText ||
              (section.list && section.list.length > 0) ||
              (section.table &&
                section.table.headers.length > 0 &&
                section.table.rows.length > 0);
            
            if (!hasContent) return null;

            return (
              <section key={i} className="scroll-mt-24">
                {headingText && (
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-950 mt-12 mb-6 leading-tight">
                    {headingText}
                  </h2>
                )}
                {bodyText && (
                  <div className="text-[19px] leading-[1.8] text-navy-800 whitespace-pre-line mb-6">
                    <LinkifiedText
                      text={bodyText}
                      linkClassName="text-clinical-500 font-medium underline underline-offset-4 hover:text-clinical-700 transition-colors"
                    />
                  </div>
                )}
                {section.list && section.list.length > 0 && (
                  <ul className="list-disc pl-6 space-y-3 mb-8 text-[19px] leading-[1.8] text-navy-800 marker:text-navy-400">
                    {section.list.map((item, j) => (
                      <li key={j} className="pl-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.table &&
                  section.table.headers.length > 0 &&
                  section.table.rows.length > 0 && (
                    <div className="mb-8 overflow-x-auto rounded-xl border border-silver-200 bg-white shadow-sm">
                      <table className="w-full min-w-[32rem] text-left text-[15px] md:text-[17px] text-navy-800">
                        <thead>
                          <tr className="border-b border-silver-200 bg-silver-50">
                            {section.table.headers.map((h, j) => (
                              <th
                                key={j}
                                scope="col"
                                className="px-4 py-3 font-semibold text-navy-950"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, ri) => (
                            <tr
                              key={ri}
                              className="border-b border-silver-100 last:border-0"
                            >
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 align-top">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </section>
            );
          })}
        </div>

        {/* Mini CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="/consult"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-clinical-500 text-white font-semibold text-base hover:bg-clinical-600 transition-colors shadow-sm"
          >
            Contact the Eye Clinic
          </a>
        </div>

        {/* 4. Enhanced Navigation & Social Proof (Social Share) */}
        <div className="mt-10 pt-8 border-t border-silver-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="font-semibold text-navy-900 font-display">Share this article:</span>
            <div className="flex items-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-silver-100 text-navy-600 hover:bg-clinical-100 hover:text-clinical-600 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-silver-100 text-navy-600 hover:bg-clinical-100 hover:text-clinical-600 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-silver-100 text-navy-600 hover:bg-clinical-100 hover:text-clinical-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-silver-100 text-navy-600 hover:bg-clinical-100 hover:text-clinical-600 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Author Bio Box */}
        <div className="mt-12 bg-silver-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center border border-silver-100">
          <div className="h-20 w-20 rounded-full overflow-hidden shrink-0 bg-navy-100 text-navy-800 flex items-center justify-center font-bold font-display text-2xl">
            <img src="/hero.webp" alt="Dr. Nikhil Nasta" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-navy-950 mb-2">
              Dr. Nikhil Nasta
            </h3>
            <p className="text-navy-700 leading-relaxed text-sm sm:text-base">
              Dr. Nikhil Nasta is the Founder & Lead Surgeon at iSight Eye Care. With over two decades of experience, he specializes in advanced cataract surgery and comprehensive eye care, dedicated to restoring vision and improving patients' quality of life.
            </p>
          </div>
        </div>

        {/* 5. Seamless FAQ & CTA Integration */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-silver-200">
            <h2 className="font-display text-3xl font-bold text-navy-950 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="bg-transparent border-none p-0">
              <BlogFAQAccordion faqs={post.faqs} defaultValue="0" />
            </div>
          </div>
        )}

        <div className="mt-20">
          <BookAppointmentCTA variant="card" />
        </div>

        <p className="mt-12 text-sm text-navy-500 text-center px-4">
          Disclaimer: This information is for educational purposes only.
          Individual cases vary; consult a specialist for personalized advice.
        </p>
      </div>

      {/* JSON-LD Schemas */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Person", name: "Dr. Nikhil Nasta" },
            publisher: { "@type": "Organization", name: "iSight Eye Care", url: SITE_URL },
            mainEntityOfPage: { "@id": canonical },
            image: post.image ? getBlogImageUrl(post.image) : `${SITE_URL}/og-image.webp`,
          }),
        }}
      />
    </article>
  );
}
