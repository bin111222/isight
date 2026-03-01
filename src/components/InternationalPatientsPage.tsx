"use client";

import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Check,
  ArrowRight,
  Send,
  Plane,
  ClipboardList,
  Activity,
  PlaneLanding,
  Cpu,
  HeadphonesIcon,
  Video,
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import TreatmentCardImage from "@/components/TreatmentCardImage";

const PHONE = "918692986033";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;
const WHATSAPP_INTERNATIONAL_MSG = encodeURIComponent(
  "Hi, I'm an international patient interested in eye treatment at iSight Eye Care. I'd like to know about treatment options and cost estimates."
);
const EMAIL_INTERNATIONAL = "info@eyesurgeonmumbai.com";
const EMAIL_SUBJECT = encodeURIComponent("International Patient – Treatment Plan & Cost Estimate");
const EMAIL_VIRTUAL = encodeURIComponent("International Patient – Request Virtual Consultation");
const mailtoEstimate = `mailto:${EMAIL_INTERNATIONAL}?subject=${EMAIL_SUBJECT}`;
const mailtoVirtual = `mailto:${EMAIL_INTERNATIONAL}?subject=${EMAIL_VIRTUAL}`;
const mailtoPreArrival = `mailto:${EMAIL_INTERNATIONAL}?subject=${encodeURIComponent("Pre-Arrival Assessment – International Patient")}`;

/** Treatment badge: slug for image + optional page link; ctaType for CTA button */
type TreatmentBadge = {
  slug: string | null;
  title: string;
  description: string;
  pageHref?: string;
  ctaType?: "whatsapp" | "email";
  ctaText?: string;
  whatsappMessage?: string;
};

const TREATMENT_BADGES: TreatmentBadge[] = [
  {
    slug: "cataract-surgery-mumbai",
    title: "Cataract Surgery",
    description: "Micro-incision techniques, premium IOLs. Phaco, MICS, femtosecond laser, paediatric. Monofocal to trifocal & EDOF. Day-care, 20–30 min per eye.",
    pageHref: "/cataract-surgery-mumbai",
    ctaType: "whatsapp",
    ctaText: "WhatsApp for cost estimate",
    whatsappMessage: "Hi, I need a cataract cost estimate for international patient.",
  },
  {
    slug: "lasik-surgery-mumbai",
    title: "Laser Vision Correction",
    description: "LASIK, Contoura, SMILE, PRK, PRESBYOND. Freedom from glasses. Eligibility based on corneal thickness and eye health.",
    pageHref: "/lasik-surgery-mumbai",
    ctaType: "email",
    ctaText: "Check LASIK eligibility",
  },
  {
    slug: "icl-surgery-mumbai",
    title: "Implantable Lens (ICL)",
    description: "Phakic IOL for high myopia and thin corneas. Reversible, high-definition vision. Ideal when LASIK isn’t suitable.",
    pageHref: "/icl-surgery-mumbai",
    ctaType: "whatsapp",
    ctaText: "Is ICL right for me?",
    whatsappMessage: "Hi, I'd like to know if ICL is right for me (international patient).",
  },
  {
    slug: "trifocal-iol-surgery-mumbai",
    title: "Refractive Lens Exchange (RLE)",
    description: "Clear lens extraction for presbyopia and high hyperopia. Premium trifocal & EDOF lenses. Permanent spectacle independence.",
    pageHref: "/trifocal-iol-surgery-mumbai",
  },
  {
    slug: "retinal-surgery-mumbai",
    title: "Retina Treatment",
    description: "Retinal detachment, vitrectomy, diabetic retinopathy, intravitreal injections, macular hole, ARMD. Early diagnosis and timely intervention.",
    pageHref: "/retinal-surgery-mumbai",
    ctaType: "email",
    ctaText: "Retina evaluation plan",
  },
  {
    slug: "glaucoma-treatment-mumbai",
    title: "Glaucoma",
    description: "Screening, OCT, visual fields. Medical, laser (trabeculoplasty), trabeculectomy, MIGS. Long-term monitoring and individualised planning.",
    pageHref: "/glaucoma-treatment-mumbai",
  },
  {
    slug: "corneal-transplant-surgery-mumbai",
    title: "Cornea Services",
    description: "Transplant (PK, DSEK, DMEK, DALK), keratoconus, cross-linking, pterygium. Advanced corneal imaging for precision.",
    pageHref: "/corneal-transplant-surgery-mumbai",
  },
  {
    slug: "pediatric-eye-care-mumbai",
    title: "Pediatric Ophthalmology",
    description: "Paediatric cataract, squint, amblyopia, congenital disorders, refractive error. Family-centred, safe and comfortable.",
    pageHref: "/pediatric-eye-care-mumbai",
  },
  {
    slug: "oculoplastic-surgery-botox-mumbai",
    title: "Oculoplasty & Eyelid",
    description: "Blepharoplasty, ptosis, DCR, eyelid reconstruction, orbital surgery. Functional and cosmetic.",
    pageHref: "/oculoplastic-surgery-botox-mumbai",
  },
  {
    slug: "dry-eye-treatment-mumbai",
    title: "Laser Procedures",
    description: "YAG capsulotomy, laser iridotomy, retinal laser, glaucoma laser. In-clinic and theatre-based.",
    pageHref: "/dry-eye-treatment-mumbai",
  },
];

const REGIONS = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Middle East",
  "Africa",
  "Europe",
  "South East Asia",
];

const WHY_INDIA = [
  "Advanced surgical infrastructure",
  "Globally comparable technology",
  "Experienced ophthalmic surgeons",
  "No waiting lists",
  "Significantly lower cost",
  "Day-care surgical model",
  "English-speaking medical staff",
];

const WHY_ISIGHT = [
  "Comprehensive Multi-Specialty Eye Care",
  "Advanced Diagnostic Technology",
  "Premium Intraocular Lens Options",
  "Modern Operating Theatre Infrastructure",
  "Transparent Treatment Planning",
  "Dedicated International Patient Coordination",
];

const JOURNEY_STEPS = [
  {
    step: 1,
    title: "Send Your Reports",
    body: "Email your prescription, eye scans, or medical reports. Our team reviews and provides provisional diagnosis, recommended treatment, cost estimate, and approximate stay duration.",
    cta: "Email for Pre-Arrival Assessment",
    href: mailtoPreArrival,
    Icon: Send,
  },
  {
    step: 2,
    title: "Travel Planning",
    body: "Our international desk assists with visa guidance, invitation letters if required, accommodation suggestions, airport proximity recommendations, and treatment scheduling.",
    Icon: Plane,
  },
  {
    step: 3,
    title: "In-Person Evaluation",
    body: "On arrival: comprehensive eye examination, advanced diagnostics, confirmation of surgical plan, and detailed consent discussion.",
    Icon: ClipboardList,
  },
  {
    step: 4,
    title: "Surgery",
    body: "Most procedures are day-care. Surgery typically scheduled within 1–3 days. Modern sterile operating theatre, advanced microscope systems, international safety standards.",
    Icon: Activity,
  },
  {
    step: 5,
    title: "Follow-Up & Travel Back",
    body: "First review next day, additional review if required, travel clearance, remote follow-up guidance.",
    Icon: PlaneLanding,
  },
];

const FAQ_ITEMS = [
  { q: "How long do I need to stay in India?", a: "Typically 3–7 days depending on procedure." },
  { q: "Are surgeries safe?", a: "Yes. Procedures follow international sterilization and safety protocols." },
  { q: "Is language a barrier?", a: "No. English communication is standard." },
  { q: "Can I travel alone?", a: "Yes, though one attendant is recommended for major surgery." },
  { q: "When can I fly back?", a: "Usually within a few days post clearance." },
];

function CtaButton({
  href,
  children,
  primary = false,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  icon: React.ElementType;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={
        primary
          ? "group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          : "group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 text-white font-semibold transition-all duration-300"
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2.25} />
      {children}
      <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
    </a>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 lg:mb-12">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinical-500 mb-3">{eyebrow}</p>
      )}
      <h2 id={id} className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900">{title}</h2>
      {description && <p className="mt-3 text-navy-600 text-base lg:text-lg max-w-3xl">{description}</p>}
    </div>
  );
}

function TreatmentBadgeCard({
  badge,
  imageSrc,
  fallbackSrc,
}: {
  badge: TreatmentBadge;
  imageSrc: string;
  fallbackSrc?: string;
}) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-[0_4px_24px_-4px_rgba(10,15,26,0.12)] border border-silver-200/60 hover:shadow-[0_12px_40px_-12px_rgba(10,15,26,0.2)] hover:border-clinical-500/20 transition-all duration-300 hover:-translate-y-1">
      {badge.pageHref ? (
        <Link href={badge.pageHref} className="relative block w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
          <TreatmentCardImage
            src={imageSrc}
            fallbackSrc={fallbackSrc ?? "/hero.webp"}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
          <span className="absolute bottom-0 left-0 right-0 p-4 pt-8">
            <h3 className="font-display text-lg font-bold text-white leading-tight">{badge.title}</h3>
          </span>
        </Link>
      ) : (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
          <TreatmentCardImage
            src={imageSrc}
            fallbackSrc={fallbackSrc ?? "/hero.webp"}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
          <span className="absolute bottom-0 left-0 right-0 p-4 pt-8">
            <h3 className="font-display text-lg font-bold text-white leading-tight">{badge.title}</h3>
          </span>
        </div>
      )}
      <div className="p-5 border border-t-0 border-silver-200/80 rounded-b-2xl bg-white">
        <p className="text-navy-700 text-sm leading-relaxed line-clamp-3">{badge.description}</p>
        {(badge.ctaType === "whatsapp" && badge.whatsappMessage) && (
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(badge.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-clinical-600 font-semibold text-sm hover:text-clinical-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> {badge.ctaText}
          </a>
        )}
        {badge.ctaType === "email" && (
          <a href={mailtoEstimate} className="mt-4 inline-flex items-center gap-2 text-clinical-600 font-semibold text-sm hover:text-clinical-500 transition-colors">
            <Mail className="w-4 h-4" /> {badge.ctaText}
          </a>
        )}
        {badge.pageHref && !badge.ctaType && (
          <Link href={badge.pageHref} className="mt-4 inline-flex items-center gap-2 text-clinical-600 font-semibold text-sm hover:text-clinical-500 transition-colors">
            Learn more <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

type Props = { treatmentImages: Record<string, string> };

export default function InternationalPatientsPage({ treatmentImages }: Props) {
  return (
    <div className="min-h-screen bg-silver-100">
      {/* ——— HERO ——— */}
      <header className="relative min-h-[70vh] flex flex-col justify-center py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_28%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/90 pointer-events-none" aria-hidden />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/50 to-transparent" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clinical-400 mb-4">
            International Patients
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-sm">
            World-Class Eye Surgery in India for International Patients
          </h1>
          <p className="mt-6 text-silver-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience precision-driven eye surgery, advanced technology, and personalised care in Mumbai, India.
          </p>
          <p className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            From cataract and LASIK to retina, cornea, glaucoma, paediatric and cosmetic eye surgery — we provide
            complete ophthalmology solutions under one roof.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton href={`${WHATSAPP_URL}?text=${WHATSAPP_INTERNATIONAL_MSG}`} primary icon={MessageCircle}>
              WhatsApp Our International Care Team
            </CtaButton>
            <CtaButton href={mailtoEstimate} icon={Mail}>
              Email Us for Treatment Plan & Cost Estimate
            </CtaButton>
          </div>
        </div>
      </header>

      {/* ——— WHY PATIENTS CHOOSE INDIA ——— */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="why-india-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-3">
              <SectionHeading
                id="why-india-heading"
                eyebrow="Why patients from around the world choose India"
                title="A Trusted Destination for Advanced Eye Care"
                description="India has become one of the world's most trusted destinations for advanced medical care. In ophthalmology, patients travel from across the globe for high-quality, affordable treatment."
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {REGIONS.map((region) => (
                  <div
                    key={region}
                    className="flex items-center justify-center py-4 px-4 rounded-xl bg-silver-100 border border-silver-200/80 text-navy-800 font-medium text-sm sm:text-base"
                  >
                    {region}
                  </div>
                ))}
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                {WHY_INDIA.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-clinical-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-navy-700 text-base leading-relaxed">
                Mumbai, as India's medical capital, offers international connectivity, hospitality infrastructure, and
                premium healthcare facilities.
              </p>
            </div>
            <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(10,15,26,0.2)] border border-silver-200/80">
              <TreatmentCardImage src="/clinic/DSC04995.webp" fallbackSrc="/hero.webp" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ——— WHY I SIGHT ——— */}
      <section className="py-16 lg:py-24 bg-silver-100" aria-labelledby="why-isight-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1 relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(10,15,26,0.15)] border border-silver-200/80">
              <TreatmentCardImage src="/gallery/ot.webp" fallbackSrc="/hero.webp" alt="" />
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <SectionHeading
                id="why-isight-heading"
                eyebrow="Why choose iSight Eye Care"
                title="What International Patients Receive at iSight"
                description="Our goal is to provide world-class eye care with precision, safety and clarity — both medically and financially."
              />
              <ul className="grid sm:grid-cols-2 gap-4">
                {WHY_ISIGHT.map((item) => (
                  <li key={item} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-silver-200/80 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.08)]">
                    <Check className="w-6 h-6 text-clinical-500 flex-shrink-0" strokeWidth={2.5} />
                    <span className="font-medium text-navy-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ——— COMPLETE LIST OF EYE SURGERIES (BADGES) ——— */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="surgeries-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            id="surgeries-heading"
            eyebrow="Complete list of eye surgeries available"
            title="Every Procedure You Need, Under One Roof"
            description="From cataract and laser vision correction to retina, glaucoma, cornea and paediatric care — we deliver the full range of international eye surgery needs."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TREATMENT_BADGES.map((badge) => (
              <TreatmentBadgeCard
                key={badge.title}
                badge={badge}
                imageSrc={badge.slug ? (treatmentImages[badge.slug] ?? treatmentImages.placeholder) : treatmentImages.placeholder}
                fallbackSrc={treatmentImages.placeholder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ——— TREATMENT JOURNEY ——— */}
      <section className="py-16 lg:py-24 bg-silver-100" aria-labelledby="journey-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            id="journey-heading"
            eyebrow="Your treatment journey"
            title="What Your Treatment Journey Looks Like"
          />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7 space-y-8">
              {JOURNEY_STEPS.map(({ step, title, body, cta, href, Icon }) => (
                <div
                  key={step}
                  className="relative flex gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-silver-200/80 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.08)]"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-clinical-100 text-clinical-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-clinical-500">Step {step}</span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-navy-900 mt-1">{title}</h3>
                    <p className="mt-3 text-navy-700 leading-relaxed">{body}</p>
                    {cta && href && (
                      <a
                        href={href}
                        className="mt-4 inline-flex items-center gap-2 text-clinical-600 font-semibold hover:text-clinical-500 transition-colors"
                      >
                        <Mail className="w-4 h-4" /> {cta}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(10,15,26,0.15)] border border-silver-200/80 flex-1 min-h-[200px]">
                <TreatmentCardImage src="/clinic/DSC04997.webp" fallbackSrc="/hero.webp" alt="" />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(10,15,26,0.15)] border border-silver-200/80 hidden sm:block">
                <TreatmentCardImage src="/clinic/DSC05447.webp" fallbackSrc="/hero.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— COST ADVANTAGE ——— */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="cost-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            id="cost-heading"
            eyebrow="Cost advantage"
            title="Cost Advantage for International Patients"
            description="Eye surgery in India typically costs 60–80% lower than in Western countries."
          />
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(10,15,26,0.15)] border border-silver-200/80">
              <TreatmentCardImage src="/clinic/DSC05345.webp" fallbackSrc="/hero.webp" alt="" />
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-silver-100 border border-silver-200/80 p-6 sm:p-8">
                <ul className="space-y-2 text-navy-700">
                  <li><strong>USA cataract:</strong> $4,000–7,000</li>
                  <li><strong>UK private cataract:</strong> £3,000–5,000</li>
                  <li><strong>Australia:</strong> AUD 4,000+</li>
                  <li><strong>India premium cataract:</strong> significantly lower</li>
                </ul>
                <p className="mt-4 text-navy-600 text-sm">
                  Exact cost depends on lens type and complexity.
                </p>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi, I need a personalised cost breakdown for international patient.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp for Personalized Cost Breakdown
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— TECHNOLOGY & SUPPORT ——— */}
      <section className="py-16 lg:py-24 bg-silver-100" aria-labelledby="tech-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-clinical-100 text-clinical-600 flex items-center justify-center">
                  <Cpu className="w-5 h-5" strokeWidth={2} />
                </div>
                <h2 id="tech-heading" className="font-display text-xl sm:text-2xl font-bold text-navy-900">
                  Technology & Infrastructure
                </h2>
              </div>
              <ul className="text-navy-700 space-y-2">
                {["Advanced diagnostic imaging", "OCT and corneal topography", "Premium phaco machines", "Modern operating microscopes", "Sterile surgical environment", "NABH compliant standards"].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clinical-500 flex-shrink-0" /> {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(10,15,26,0.12)] border border-silver-200/80">
                <TreatmentCardImage src="/clinic/DSC05464.webp" fallbackSrc="/hero.webp" alt="" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-clinical-100 text-clinical-600 flex items-center justify-center">
                  <HeadphonesIcon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900">
                  International Patient Support
                </h2>
              </div>
              <p className="text-navy-700 leading-relaxed">
                We understand travelling for surgery can be overwhelming. Our team ensures transparent communication,
                clear timelines, dedicated patient coordination, and assistance before, during and after surgery.
                Most surgeries do not require long hospitalisation.
              </p>
              <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(10,15,26,0.12)] border border-silver-200/80">
                <TreatmentCardImage src="/clinic/DSC05102.webp" fallbackSrc="/hero.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— ONLINE CONSULTATION ——— */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="online-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(10,15,26,0.15)] border border-silver-200/80 order-2 lg:order-1">
              <TreatmentCardImage src="/hero.webp" fallbackSrc="/hero.webp" alt="" />
            </div>
            <div className="lg:col-span-3 text-center lg:text-left order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-clinical-100 text-clinical-600 mb-6">
                <Video className="w-6 h-6" strokeWidth={2} />
              </div>
              <h2 id="online-heading" className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
                Online Consultation
              </h2>
              <p className="mt-3 text-navy-700 leading-relaxed">
                For patients who prefer an initial discussion before travel, we offer limited online consultation slots
                for treatment planning and clarity.
              </p>
              <a
                href={mailtoVirtual}
                className="mt-6 inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-clinical-500 hover:bg-clinical-400 text-white font-semibold transition-colors"
              >
                <Mail className="w-5 h-5" /> Email to Request Virtual Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="py-16 lg:py-24 bg-silver-100" aria-labelledby="faq-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 id="faq-heading" className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-10">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={FAQ_ITEMS} />
        </div>
      </section>

      {/* ——— FINAL CTA ——— */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-navy-900" aria-labelledby="final-cta-heading">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" aria-hidden />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clinical-400/50 to-transparent" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="final-cta-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Plan Your Eye Treatment in India
          </h2>
          <p className="mt-4 text-silver-200 text-lg">
            If you are considering eye surgery in India, our international patient coordination team is ready to
            guide you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton href={`${WHATSAPP_URL}?text=${WHATSAPP_INTERNATIONAL_MSG}`} primary icon={MessageCircle}>
              WhatsApp Us
            </CtaButton>
            <CtaButton href={mailtoEstimate} icon={Mail}>
              Email for Treatment Estimate
            </CtaButton>
          </div>
        </div>
      </section>

      <p className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-navy-500">
        Disclaimer: This information is for educational purposes only. Individual cases vary; consult a specialist
        for personalised advice.
      </p>
    </div>
  );
}
