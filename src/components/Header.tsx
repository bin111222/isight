"use client";

import Link from "next/link";
import { useState } from "react";
import { getImageUrl } from "@/lib/imageUrl";
import { Phone } from "lucide-react";
import { NAV_LINKS, TREATMENT_LINKS } from "@/lib/sitemap";

const PHONE = "918692986033";
const PHONE_DISPLAY = "8692986033";

const TREATMENTS_HREF = "/treatments";

// Nav links excluding Home (logo). Split for left/right of centered logo.
const NAV_WITHOUT_HOME = NAV_LINKS.filter((l) => l.href !== "/");
const LEFT_NAV = NAV_WITHOUT_HOME.slice(0, 4); // Treatments, International Patients, Eye Quiz, Our Doctor
const RIGHT_NAV = NAV_WITHOUT_HOME.slice(4);   // Blog, Consult, Awards

function NavItem({
  href,
  label,
  treatmentMenuOpen,
  setTreatmentMenuOpen,
}: {
  href: string;
  label: string;
  treatmentMenuOpen: boolean;
  setTreatmentMenuOpen: (v: boolean) => void;
}) {
  if (href === TREATMENTS_HREF) {
    return (
      <div
        className="relative group"
        onMouseEnter={() => setTreatmentMenuOpen(true)}
        onMouseLeave={() => setTreatmentMenuOpen(false)}
      >
        <Link
          href={href}
          className="nav-link text-sm font-medium whitespace-nowrap flex items-center gap-1"
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
    <Link href={href} className="nav-link text-sm font-medium whitespace-nowrap">
      {label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [treatmentMenuOpen, setTreatmentMenuOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

  return (
    <header className="fixed top-3 left-3 right-3 sm:top-4 sm:left-6 sm:right-6 z-50 max-w-[1600px] mx-auto rounded-2xl bg-navy-950/50 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20 overflow-visible">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10 lg:gap-y-0 h-16 overflow-visible">
        {/* Left: mobile hamburger | desktop left nav */}
        <div className="flex flex-1 lg:flex-initial items-center justify-start lg:justify-end min-w-0">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white -ml-2"
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
          <nav className="hidden lg:flex items-center justify-end gap-6 xl:gap-8 overflow-visible">
            {LEFT_NAV.map(({ href, label }) => (
              <NavItem
                key={href}
                href={href}
                label={label}
                treatmentMenuOpen={treatmentMenuOpen}
                setTreatmentMenuOpen={setTreatmentMenuOpen}
              />
            ))}
          </nav>
        </div>

        {/* Center: logo (dead centre on desktop) */}
        <div className="flex flex-1 lg:flex-initial justify-center items-center min-w-0">
          <Link
            href="/"
            className="flex items-center transition-transform hover:scale-[1.02] shrink-0"
            aria-label="iSight Eye Care – Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl("/icon-logo.webp")}
              alt="iSight Eye Care"
              width={700}
              height={200}
              className="h-[2.925rem] w-auto"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        {/* Right: mobile phone | desktop right nav + CTA */}
        <div className="flex flex-1 lg:flex-initial items-center justify-end lg:justify-start min-w-0">
          <a
            href={`tel:+${PHONE}`}
            className="lg:hidden p-2 text-white hover:text-clinical-400 transition-colors -mr-2"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="w-6 h-6" strokeWidth={2} aria-hidden />
          </a>
          <nav className="hidden lg:flex items-center justify-start gap-6 xl:gap-8 overflow-visible">
            {RIGHT_NAV.map(({ href, label }) => (
              <NavItem
                key={href}
                href={href}
                label={label}
                treatmentMenuOpen={treatmentMenuOpen}
                setTreatmentMenuOpen={setTreatmentMenuOpen}
              />
            ))}
            <a
              href={`tel:+${PHONE}`}
              className="whitespace-nowrap ml-1 xl:ml-2 px-5 py-2.5 bg-clinical-500 hover:bg-clinical-400 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-glow"
            >
              Book Consultation
            </a>
          </nav>
        </div>
      </div>

      {open && (
        <div className="lg:hidden rounded-b-2xl border-t border-white/10 bg-navy-950/70 backdrop-blur-md py-4 px-4">
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
