"use client";

import { ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/WBCWnwJDfNRdPGuy7";

const TESTIMONIALS = [
  {
    quote:
      "Getting LASIK done by Dr. Nikhil Nasta was the best decision of my life! I had been wearing glasses for over 12 years and now I wake up with perfect vision. The procedure was quick, painless, and Dr. Nasta made me feel completely comfortable.",
    author: "Rohan S.",
  },
  {
    quote:
      "I was struggling with severe dry eyes for months. Dr. Nikhil diagnosed the root cause in my first visit. Within weeks, my eyes feel normal again. Highly recommend him if you suffer from dry eyes in Mumbai.",
    author: "Neha M.",
  },
  {
    quote:
      "My father had cataracts in both eyes and was very nervous about surgery. Dr. Nikhil Nasta explained everything with such patience. The cataract surgery was smooth, recovery was fast. Truly the best cataract surgeon in Mumbai!",
    author: "Anil K.",
  },
];

export default function GoogleReviewsSection() {
  return (
    <section className="bg-silver-100 py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
              What Our Patients Say
            </h2>
            <p className="mt-2 text-navy-600">
              Real stories from iSight Eye Care. Read more on Google.
            </p>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-silver-200 shadow-sm hover:shadow-md hover:border-clinical-500/30 transition-all text-navy-800 font-medium shrink-0"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>See our Google reviews</span>
            <ExternalLink className="w-4 h-4 text-navy-500 shrink-0" aria-hidden />
          </a>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className="relative rounded-2xl bg-white p-6 sm:p-8 border border-silver-200/80 shadow-soft hover-lift"
            >
              <span className="absolute top-5 left-6 text-4xl text-clinical-200/50 font-serif leading-none">
                "
              </span>
              <p className="relative text-navy-700 leading-relaxed pt-4">
                {t.quote}
              </p>
              <footer className="mt-6 font-semibold text-navy-900">
                — {t.author}
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-8 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-clinical-500 font-semibold hover:text-clinical-400 transition-colors"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
