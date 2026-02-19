import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, TREATMENT_LINKS } from "@/lib/sitemap";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 text-silver-200 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-500/30 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">
          <div>
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity" aria-label="iSight Eye Care – Home">
              <Image src="/icon-logo.png" alt="iSight Eye Care" width={48} height={48} className="h-9 w-auto" />
            </Link>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                <Image src="/hero.webp" alt="Dr. Nikhil Nasta" fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <p className="text-sm text-silver-200/80 max-w-xs leading-relaxed">
                  Led by Dr. Nikhil Nasta. Expert eye care for a clearer tomorrow in Mumbai.
                </p>
                <a
                  href={`tel:+${PHONE}`}
                  className="mt-5 inline-flex items-center gap-2 text-clinical-400 font-semibold hover:text-clinical-300 transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-silver-200/90 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-display font-semibold mb-5">Treatments</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
              {TREATMENT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-silver-200/90 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-silver-200/60">
            © {currentYear} iSight Eye Care &amp; Surgery. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <Link href="/consult" className="text-silver-200/80 hover:text-white transition-colors font-medium">
              Book Consultation
            </Link>
            <a href={`tel:+${PHONE}`} className="text-silver-200/80 hover:text-white transition-colors font-medium">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
