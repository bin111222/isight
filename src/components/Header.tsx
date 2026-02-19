"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone } from "lucide-react";
import { NAV_LINKS, TREATMENT_LINKS } from "@/lib/sitemap";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";

const TREATMENTS_HREF = "/treatments";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [treatmentMenuOpen, setTreatmentMenuOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-white/5 overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 overflow-visible">
        {/* Mobile: menu left, logo center, call right. Desktop: logo left only (menu/call in nav or hidden) */}
        <div className="relative flex flex-1 lg:flex-initial justify-center lg:justify-start items-center min-w-0">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Link
            href="/"
            className="flex items-center transition-transform hover:scale-[1.02] shrink-0"
            aria-label="iSight Eye Care – Home"
          >
            <Image
              src="/icon-logo.png"
              alt="iSight Eye Care"
              width={700}
              height={200}
              sizes="126px"
              className="h-9 w-auto"
              priority
            />
          </Link>
          <a
            href={`tel:+${PHONE}`}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white hover:text-clinical-400 transition-colors"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="w-6 h-6" strokeWidth={2} aria-hidden />
          </a>
        </div>

        <nav className="hidden lg:flex items-center gap-8 overflow-visible">
          {NAV_LINKS.map(({ href, label }) => {
            if (href === TREATMENTS_HREF) {
              return (
                <div
                  key={href}
                  className="relative group"
                  onMouseEnter={() => setTreatmentMenuOpen(true)}
                  onMouseLeave={() => setTreatmentMenuOpen(false)}
                >
                  <Link
                    href={href}
                    className="nav-link text-sm font-medium flex items-center gap-1"
                  >
                    {label}
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div
                    className={`absolute top-full left-0 pt-2 w-[280px] z-50 transition-opacity duration-150 ${
                      treatmentMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="w-full bg-[#0f1729] border border-white/20 rounded-xl shadow-xl py-2 overflow-hidden">
                      <div className="max-h-[70vh] overflow-y-auto overscroll-contain">
                        {TREATMENT_LINKS.map(({ href: tHref, label: tLabel }) => (
                          <Link
                            key={tHref}
                            href={tHref}
                            className="block px-4 py-2.5 text-sm text-[#e8ecf1] hover:text-white hover:bg-white/10 transition-colors"
                          >
                            {tLabel.replace(/\s+Mumbai$/, "")}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-white/20 mt-1 pt-1">
                        <Link
                          href={href}
                          className="block px-4 py-2.5 text-sm font-medium text-[#7eb3e8] hover:text-white hover:bg-white/10 transition-colors"
                        >
                          View all treatments →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link key={href} href={href} className="nav-link text-sm font-medium">
                {label}
              </Link>
            );
          })}
          <a
            href={`tel:+${PHONE}`}
            className="ml-2 px-5 py-2.5 bg-clinical-500 hover:bg-clinical-400 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-glow"
          >
            Book Consultation
          </a>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy-900 py-4 px-4">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => {
              if (href === TREATMENTS_HREF) {
                return (
                  <div key={href}>
                    <button
                      type="button"
                      onClick={() => setMobileTreatmentsOpen((v) => !v)}
                      className="flex items-center justify-between w-full text-silver-200 hover:text-white py-2 font-medium text-left"
                    >
                      {label}
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileTreatmentsOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileTreatmentsOpen && (
                      <div className="pl-3 mt-1 mb-2 flex flex-col gap-0.5 border-l border-white/10">
                        {TREATMENT_LINKS.map(({ href: tHref, label: tLabel }) => (
                          <Link
                            key={tHref}
                            href={tHref}
                            onClick={() => setOpen(false)}
                            className="text-silver-300 hover:text-white py-1.5 text-sm"
                          >
                            {tLabel.replace(/\s+Mumbai$/, "")}
                          </Link>
                        ))}
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className="text-clinical-400 hover:text-clinical-300 py-1.5 text-sm font-medium mt-1"
                        >
                          View all treatments →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-silver-200 hover:text-white py-2 font-medium"
                >
                  {label}
                </Link>
              );
            })}
            <a
              href={`tel:+${PHONE}`}
              className="mt-2 py-3 bg-clinical-500 text-white text-center font-medium rounded-lg"
            >
              Call {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
