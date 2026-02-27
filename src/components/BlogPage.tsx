import Link from "next/link";
import { getBlogImageUrl } from "@/lib/blogImageUrl";
import type { PageContent } from "@/types/content";
import type { BlogPost } from "@/types/content";
import { getAllPosts, getReadingTimeMinutes } from "@/lib/posts";

type BlogPageProps = { content: PageContent };

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PostThumbnail({ post }: { post: BlogPost }) {
  const readingMin = getReadingTimeMinutes(post);

  if (post.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-800">
        {/* Native img so CDN URLs (including blog thumbnails) load directly like on individual post page */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBlogImageUrl(post.image)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute bottom-2 right-2 rounded bg-navy-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {readingMin} min read
        </div>
      </div>
    );
  }

  const initial = (post.title || "A").charAt(0).toUpperCase();

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-clinical-500/90 to-navy-700"
      style={{
        background: `linear-gradient(135deg, rgba(45, 90, 158, 0.95) 0%, rgba(15, 23, 41, 0.98) 100%)`,
      }}
    >
      <span
        className="text-5xl font-bold text-white/90 drop-shadow-md sm:text-6xl"
        aria-hidden
      >
        {initial}
      </span>
      <div className="absolute bottom-2 right-2 rounded bg-navy-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        {readingMin} min read
      </div>
    </div>
  );
}

export default function BlogPage({ content }: BlogPageProps) {
  const posts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <article className="min-h-screen">
      {/* Hero + intro */}
      <header className="relative overflow-hidden bg-navy-950 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="mesh-bg absolute inset-0" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="mt-4 text-lg text-silver-200/90 max-w-2xl">
              {content.subtitle}
            </p>
          )}
          {content.sections?.length ? (
            <div className="mt-6 space-y-3 text-navy-200/90 leading-relaxed max-w-2xl">
              {content.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="font-semibold text-white/95 mb-1">
                      {section.heading}
                    </h2>
                  )}
                  {section.body && <p>{section.body}</p>}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Articles grid */}
      <section className="bg-silver-100 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-8 sm:mb-10">
            All articles
          </h2>

          {posts.length === 0 ? (
            <p className="rounded-xl border border-silver-200 bg-white p-8 text-center text-navy-600 shadow-soft">
              Blog posts will appear here once migrated from the old site. Run
              the scraper script to import them.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/post/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-silver-200 bg-white shadow-soft transition-all duration-300 hover:border-clinical-200 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-clinical-400 focus:ring-offset-2"
                  >
                    <PostThumbnail post={post} />
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h3 className="font-display font-semibold text-navy-900 line-clamp-2 group-hover:text-clinical-500 transition-colors">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="mt-1.5 line-clamp-2 text-sm text-navy-600">
                          {post.description}
                        </p>
                      )}
                      <time
                        dateTime={post.date}
                        className="mt-3 text-xs font-medium text-navy-500"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </article>
  );
}
