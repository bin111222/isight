"use client";

import { FileCheck } from "lucide-react";

type Props = {
  title: string;
  body: string;
  disclaimer: string;
  onBegin: () => void;
  onBack: () => void;
};

export default function AssessmentIntro({ title, body, disclaimer, onBegin, onBack }: Props) {
  return (
    <div className="animate-fade-in rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-3 text-clinical-300 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-clinical-500/20">
          <FileCheck className="w-6 h-6" strokeWidth={2} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider">Self-assessment</span>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{title}</h2>
      <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
        <p>{body}</p>
        <p className="text-white/70 text-sm border-l-2 border-clinical-400/50 pl-4">
          {disclaimer}
        </p>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={onBegin}
          className="btn btn-lg btn-primary w-full sm:w-auto"
        >
          I understand - begin assessment
        </button>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-lg btn-outline w-full sm:w-auto"
        >
          ← Back to assessments
        </button>
      </div>
    </div>
  );
}
