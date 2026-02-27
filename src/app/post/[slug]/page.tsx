import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPostBySlug,
  getAllPostSlugs,
  getReadingTimeMinutes,
} from "@/lib/posts";
import { LinkifiedText } from "@/lib/linkify";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import { BlogFAQAccordion } from "@/components/ui/blog-faq-accordion";
import { SITE_URL } from "@/lib/sitemap";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog | iSight Eye Care Mumbai" };
  return {
    title: post.title,
    description: post.description ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readingMin = getReadingTimeMinutes(post);
  const canonical = `${SITE_URL}/post/${post.slug}`;

  return (
    <article className="min-h-screen bg-silver-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <header className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-navy-600 hover:text-navy-900 text-sm font-medium"
          >
            ← Blog
          </Link>
          {post.image && (
            <div className="mt-6 w-full overflow-hidden rounded-xl bg-silver-200">
              {/* Native img so container keeps the image’s own aspect ratio */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                className="h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mt-6 leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-navy-600">
            <span>Dr. Nikhil Nasta</span>
            <span>Updated {post.date}</span>
            <span>{readingMin} min read</span>
          </div>
        </header>

        <div className="space-y-6">
          {post.sections.map((section, i) => {
            const hasContent = section.heading || (section.body && section.body.trim()) || (section.list && section.list.length > 0);
            if (!hasContent) return null;
            return (
              <section
                key={i}
                className="rounded-xl border border-silver-200 bg-white p-6 shadow-soft md:p-8"
              >
                {section.heading && (
                  <h2 className="font-display text-xl font-bold text-navy-900 mb-4 md:text-2xl">
                    {section.heading}
                  </h2>
                )}
                {section.body && section.body.trim() && (
                  <div className="text-navy-700 leading-relaxed whitespace-pre-line">
                    <LinkifiedText
                      text={section.body.trim()}
                      linkClassName="text-clinical-500 font-medium underline underline-offset-2 hover:text-clinical-600"
                    />
                  </div>
                )}
                {section.list && section.list.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-navy-700">
                    {section.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 md:text-3xl">
              Frequently Asked Questions
            </h2>
            <BlogFAQAccordion faqs={post.faqs} defaultValue="0" />
          </section>
        )}

        <div className="mt-16">
          <BookAppointmentCTA variant="card" />
        </div>

        <p className="mt-8 text-sm text-navy-500">
          Disclaimer: This information is for educational purposes only.
          Individual cases vary; consult a specialist for personalized advice.
        </p>

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
              image: post.image,
            }),
          }}
        />
      </div>
    </article>
  );
}
