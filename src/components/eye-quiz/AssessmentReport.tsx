"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, AlertCircle } from "lucide-react";
import html2canvas from "html2canvas";
import type { QuizDef, ResultBand } from "@/lib/eyeQuizzes";

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
  const [saving, setSaving] = useState(false);

  const handleSaveAsImage = async () => {
    if (typeof window === "undefined") return;
    const content = reportRef.current?.querySelector<HTMLElement>(".print-report");
    if (!content) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(content, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      link.download = `isight-${quiz.title.replace(/\s+/g, "-").toLowerCase()}-report-${date}.webp`;
      link.href = canvas.toDataURL("image/webp");
      link.click();
    } finally {
      setSaving(false);
    }
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
              onClick={handleSaveAsImage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/5 transition-all disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {saving ? "Saving…" : "Save as image"}
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
                    <span className="text-white/70">{s.title.replace(/^Part [A-Z] -\s*/, "")}</span>
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
          className="btn btn-lg btn-primary"
        >
          {resultBand.ctaLabel}
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </Link>
        <button
          type="button"
          onClick={onRetake}
          className="btn btn-lg btn-outline"
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
