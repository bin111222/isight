import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import { getImageUrl } from "@/lib/imageUrl";
import { NAV_LINKS, TREATMENT_LINKS } from "@/lib/sitemap";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/nikhil-nasta-72724644/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.youtube.com/@isighteyecaresurgery3296", label: "YouTube", Icon: Youtube },
  { href: "https://www.instagram.com/nikhilnasta/", label: "Instagram", Icon: Instagram },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 text-silver-200 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-500/40 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-5">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity" aria-label="iSight Eye Care – Home">
              <Image src={getImageUrl("/icon-logo.webp")} alt="iSight Eye Care" width={700} height={200} sizes="140px" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-silver-200/85 max-w-xs leading-relaxed">
              Led by Dr. Nikhil Nasta. Expert eye care for a clearer tomorrow in Mumbai.
            </p>
            <a
              href={`tel:+${PHONE}`}
              className="inline-flex items-center gap-2 text-clinical-400 font-semibold hover:text-clinical-300 transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
            <div className="flex gap-4 pt-1">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-silver-200/80 hover:border-clinical-500/50 hover:bg-clinical-500/10 hover:text-clinical-300 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-5 text-sm uppercase tracking-wider text-silver-200/70">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-silver-200/90 hover:text-clinical-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-display font-semibold mb-5 text-sm uppercase tracking-wider text-silver-200/70">Treatments</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
              {TREATMENT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-silver-200/90 hover:text-clinical-300 transition-colors">
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
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm">
            <Link href="/consult" className="text-silver-200/80 hover:text-clinical-300 transition-colors font-medium">
              Book Consultation
            </Link>
            <a href={`tel:+${PHONE}`} className="text-silver-200/80 hover:text-clinical-300 transition-colors font-medium">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
