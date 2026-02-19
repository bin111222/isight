"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, Printer, AlertCircle } from "lucide-react";
import type { QuizDef, ResultBand } from "@/lib/eyeQuizzes";
import { getSectionScores } from "@/lib/eyeQuizzes";
import { getImageUrl } from "@/lib/imageUrl";

type SectionScore = { sectionId: string; title: string; score: number; max: number };

type Props = {
  quiz: QuizDef;
  resultBand: ResultBand;
  totalScore: number;
  sectionScores: SectionScore[];
  baselineValue?: number;
  onBack: () => void;
  onRetake: () => void;
};

const RISK_STYLES: Record<ResultBand["riskLevel"], string> = {
  low: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  moderate: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  high: "bg-red-500/20 text-red-300 border-red-400/40",
};

export default function AssessmentReport({
  quiz,
  resultBand,
  totalScore,
  sectionScores,
  baselineValue,
  onBack,
  onRetake,
}: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (typeof window === "undefined") return;
    const content = reportRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const riskClass =
      resultBand.riskLevel === "low"
        ? "risk-low"
        : resultBand.riskLevel === "moderate"
          ? "risk-moderate"
          : "risk-high";
    const origin = window.location.origin;
    const logoPath = getImageUrl("/icon-logo.png");
    const logoUrl = logoPath.startsWith("http") ? logoPath : `${origin}${logoPath}`;
    const phoneDisplay = "8692986033";
    const phoneFull = "+91 86929 86033";
    const whatsappUrl = "https://wa.me/918692986033";
    const kharAddress = "Sapphire, 4th Floor, 402, Swami Vivekanand Rd, above IDFC FIRST Bank, Khar West, Mumbai 400052";
    const dadarAddress = "Earth Galaxy, 102, Dr Babasaheb Ambedkar Rd, Dadar East, Mumbai 400014";
    const hours = "Mon–Sat: 9:00 AM – 7:00 PM";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${quiz.title} — Self-Assessment Report | iSight Eye Care</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Segoe UI', system-ui, sans-serif; color: #0f172a; padding: 28px; max-width: 680px; margin: 0 auto; font-size: 15px; line-height: 1.5; }
            .header { text-align: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #1e3a5f; }
            .logo { max-height: 48px; width: auto; display: block; margin: 0 auto 12px; }
            .clinic-name { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 4px; letter-spacing: 0.02em; }
            .doctor-name { font-size: 0.95rem; color: #475569; margin: 0 0 16px; font-weight: 500; }
            .contact-block { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px 28px; font-size: 0.875rem; color: #475569; margin-top: 12px; }
            .contact-block a { color: #1e40af; text-decoration: none; font-weight: 600; }
            .contact-block a:hover { text-decoration: underline; }
            .locations { margin-top: 16px; text-align: left; display: grid; gap: 12px; }
            .loc { font-size: 0.8rem; color: #64748b; padding: 8px 12px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #5c8bc9; }
            .loc strong { color: #0f172a; display: block; margin-bottom: 2px; }
            h1 { font-size: 1.5rem; margin: 0 0 6px; color: #0f172a; font-weight: 700; }
            .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 20px; }
            .section { margin-bottom: 14px; }
            .section h3 { font-size: 0.875rem; font-weight: 600; margin: 0 0 4px; color: #334155; }
            .section p { margin: 0; font-size: 0.875rem; }
            .risk { display: inline-block; padding: 6px 14px; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; margin: 12px 0 14px; }
            .risk-low { background: #d1fae5; color: #047857; }
            .risk-moderate { background: #fef3c7; color: #b45309; }
            .risk-high { background: #fee2e2; color: #b91c1c; }
            .recommendations { margin: 16px 0; padding: 14px 18px; background: #f1f5f9; border-radius: 10px; border-left: 4px solid #5c8bc9; }
            .recommendations strong { display: block; margin-bottom: 8px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; }
            ul { margin: 0; padding-left: 1.25rem; font-size: 0.875rem; }
            .disclaimer { margin-top: 24px; padding: 14px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; font-size: 0.8rem; color: #92400e; }
            .footer-contact { margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.8rem; color: #64748b; text-align: center; }
            .footer-contact a { color: #1e40af; font-weight: 600; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoUrl}" alt="iSight Eye Care" class="logo" />
            <p class="clinic-name">iSight Eye Care &amp; Surgery</p>
            <p class="doctor-name">Dr. Nikhil Nasta — Ophthalmologist</p>
            <div class="contact-block">
              <span>📞 <a href="tel:+918692986033">${phoneFull}</a></span>
              <span>💬 <a href="${whatsappUrl}" target="_blank">WhatsApp</a></span>
            </div>
            <div class="locations">
              <div class="loc"><strong>Khar</strong> ${kharAddress}<br/>${hours}</div>
              <div class="loc"><strong>Dadar</strong> ${dadarAddress}<br/>${hours}</div>
            </div>
          </div>
          <h1>${quiz.title}</h1>
          <p class="meta">Self-Assessment Report · ${date}</p>
          ${baselineValue != null ? `<p class="meta">Baseline comfort rating: ${baselineValue}/10</p>` : ""}
          ${sectionScores.filter((s) => s.max > 0).map((s) => `<div class="section"><h3>${s.title.replace(/^Part [A-Z] —\\s*/, "")}</h3><p>Score: ${s.score} / ${s.max}</p></div>`).join("")}
          <p><strong>Total score:</strong> ${totalScore}</p>
          <p class="risk ${riskClass}">${resultBand.title}</p>
          <p>${resultBand.summary}</p>
          <div class="recommendations">
            <strong>Recommended next steps</strong>
            <ul>${resultBand.reportRecommendation.map((r) => `<li>${r}</li>`).join("")}</ul>
          </div>
          <p class="disclaimer">This report is from a self-assessment tool and is not a medical diagnosis. For a proper evaluation, book an in-person examination with Dr. Nikhil Nasta or another eye care specialist.</p>
          <p class="footer-contact">Book a consultation: <a href="tel:+918692986033">${phoneDisplay}</a> · <a href="${whatsappUrl}">WhatsApp</a> · NABH accredited</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <div className="animate-fade-in space-y-8" ref={reportRef}>
      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 lg:p-10 print-report">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Self-Assessment Report</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">{quiz.title}</h2>
            <p className="text-sm text-white/50 mt-1">
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/5 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print / Save
            </button>
          </div>
        </div>

        {baselineValue != null && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Baseline (at start)</p>
            <p className="text-white font-medium mt-1">Eye comfort: {baselineValue} / 10</p>
          </div>
        )}

        {sectionScores.filter((s) => s.max > 0).length > 0 && (
          <div className="mb-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Section scores</p>
            <div className="flex flex-wrap gap-3">
              {sectionScores
                .filter((s) => s.max > 0)
                .map((s) => (
                  <div
                    key={s.sectionId}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
                  >
                    <span className="text-white/70">{s.title.replace(/^Part [A-Z] —\s*/, "")}</span>
                    <span className="ml-2 font-semibold text-white tabular-nums">
                      {s.score} / {s.max}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Total score</p>
          <p className="text-2xl font-bold text-white tabular-nums mt-1">{totalScore}</p>
        </div>

        <div className={`inline-flex items-center px-4 py-2 rounded-full border ${RISK_STYLES[resultBand.riskLevel]} font-semibold`}>
          {resultBand.title}
        </div>

        <p className="mt-4 text-white/85 leading-relaxed">{resultBand.summary}</p>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border-l-4 border-clinical-400/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinical-300 mb-2">Recommended next steps</p>
          <ul className="list-disc pl-5 space-y-1 text-white/85 text-sm">
            {resultBand.reportRecommendation.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-amber-200/90 text-sm">
            This report is from a self-assessment tool and is not a medical diagnosis. For a proper evaluation, book an in-person examination.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={resultBand.ctaHref}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-clinical-500 text-white font-semibold shadow-[0_0_24px_rgba(92,139,201,0.3)] hover:bg-clinical-400 transition-all duration-300"
        >
          {resultBand.ctaLabel}
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </Link>
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center justify-center px-6 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
        >
          Retake assessment
        </button>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="text-white/60 hover:text-white text-sm font-medium transition-colors"
      >
        ← Back to all assessments
      </button>
    </div>
  );
}
