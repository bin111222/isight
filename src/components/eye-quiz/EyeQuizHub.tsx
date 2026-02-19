"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Droplets, Monitor, Eye } from "lucide-react";
import { ALL_QUIZZES, getQuiz, type QuizId, type QuizDef } from "@/lib/eyeQuizzes";
import QuizRunner from "./QuizRunner";

const ICONS: Record<QuizId, React.ReactNode> = {
  "dry-eye": <Droplets className="w-8 h-8" strokeWidth={1.8} />,
  "digital-strain": <Monitor className="w-8 h-8" strokeWidth={1.8} />,
  "vision-wellness": <Eye className="w-8 h-8" strokeWidth={1.8} />,
};

export default function EyeQuizHub() {
  const [activeQuizId, setActiveQuizId] = useState<QuizId | null>(null);
  const activeQuiz = activeQuizId ? getQuiz(activeQuizId) : null;
  const sectionRef = useRef<HTMLElement>(null);

  // When user selects a test, scroll so the quiz content is at the top
  useEffect(() => {
    if (activeQuizId && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeQuizId]);

  const handleSelectQuiz = (id: QuizId) => {
    setActiveQuizId(id);
  };

  return (
    <section ref={sectionRef} className="bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-clinical-500/8 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {!activeQuiz ? (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-clinical-500/20 text-clinical-300 mb-6">
                <Sparkles className="w-7 h-7" strokeWidth={2} />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Eye Health Self-Assessments
              </h2>
              <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
                Screening tools for dry eye, digital eye strain, and vision wellness. Each assessment includes symptom questions, optional visual checks, and a printable report with next steps.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_QUIZZES.map((quiz) => (
                <button
                  key={quiz.id}
                  type="button"
                  onClick={() => handleSelectQuiz(quiz.id)}
                  className="group text-left p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-clinical-400/40 hover:bg-clinical-500/10 transition-all duration-300 hover:shadow-[0_0_32px_rgba(92,139,201,0.15)]"
                >
                  <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-clinical-500/20 text-clinical-300 group-hover:bg-clinical-500/30 group-hover:text-clinical-200 transition-colors">
                    {ICONS[quiz.id]}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-clinical-100 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="mt-2 text-white/65 text-sm leading-relaxed">
                    {quiz.shortDescription}
                  </p>
                  <p className="mt-4 text-white/50 text-xs">
                    ~{quiz.estimatedMinutes} min · Report included
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-clinical-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Start assessment
                    <span aria-hidden>→</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <QuizRunner quiz={activeQuiz} onBack={() => setActiveQuizId(null)} />
        )}
      </div>
    </section>
  );
}
