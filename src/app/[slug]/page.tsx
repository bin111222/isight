import { notFound } from "next/navigation";
import { ALL_PAGE_SLUGS, TREATMENT_SLUGS, SITE_URL } from "@/lib/sitemap";
import { getPageContent } from "@/lib/content";
import { getTreatmentImagePaths } from "@/lib/treatmentImages";
import { getImageUrl } from "@/lib/imageUrl";
import TreatmentPageLayout from "@/components/TreatmentPageLayout";
import TreatmentsPage from "@/components/TreatmentsPage";
import DoctorsPage from "@/components/DoctorsPage";
import AwardsPage from "@/components/AwardsPage";
import ConsultPage from "@/components/ConsultPage";
import BookAppointmentCTA from "@/components/BookAppointmentCTA";
import BlogPage from "@/components/BlogPage";
import { clampTitleTag } from "@/lib/seoTitle";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_PAGE_SLUGS.filter((s) => s !== "").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const content = getPageContent(slug);
  if (!content) return { title: clampTitleTag("iSight Eye Care Mumbai") };
  const canonical = `${SITE_URL}/${slug}`;
  const title = clampTitleTag(content.title);
  return {
    title,
    description: content.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: content.description,
      url: canonical,
      siteName: "iSight Eye Care",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.description,
      images: ["/og-image.webp"],
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const content = getPageContent(slug);
  if (!content) notFound();

  const isTreatmentPage = TREATMENT_SLUGS.includes(slug);

  if (isTreatmentPage) {
    const treatmentImages = getTreatmentImagePaths(slug).map(getImageUrl);
    return <TreatmentPageLayout slug={slug} content={content} imagePaths={treatmentImages} />;
  }

  if (slug === "isight-eye-care-doctors") {
    return <DoctorsPage />;
  }

  if (slug === "consult") {
    return <ConsultPage />;
  }

  if (slug === "treatments") {
    return <TreatmentsPage content={content} />;
  }

  if (slug === "awards-eye-surgeon-mumbai") {
    return <AwardsPage />;
  }

  if (slug === "blog") {
    return <BlogPage content={content} />;
  }

  /* Other non-treatment pages */
  return (
    <article className="min-h-screen bg-silver-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-900">{content.title}</h1>
        {content.subtitle && (
          <p className="mt-4 text-lg text-navy-600">{content.subtitle}</p>
        )}

        <div className="mt-10 space-y-10">
          {content.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">{section.heading}</h2>
              )}
              {section.body && (
                <div className="text-navy-700 leading-relaxed whitespace-pre-line">{section.body}</div>
              )}
              {section.list && (
                <ul className="list-disc pl-6 space-y-2 text-navy-700">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {content.faqs && content.faqs.length > 0 && (
          <section className="mt-16 border-t border-silver-200 pt-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">Frequently Asked Questions</h2>
            <ul className="space-y-6">
              {content.faqs.map((faq, i) => (
                <li key={i}>
                  <h3 className="font-semibold text-navy-900">{faq.q}</h3>
                  <p className="mt-1 text-navy-700">{faq.a}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16">
          <BookAppointmentCTA variant="card" />
        </div>

        <p className="mt-8 text-sm text-navy-500">
          Disclaimer: This information is for educational purposes only. Individual cases vary; consult a
          specialist for personalized advice.
        </p>
      </div>
    </article>
  );
}
