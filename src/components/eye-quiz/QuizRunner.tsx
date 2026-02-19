"use client";

import { useState, useEffect } from "react";
import type { QuizDef, Question } from "@/lib/eyeQuizzes";
import {
  getResultBand,
  getTotalScore,
  getSectionScores,
} from "@/lib/eyeQuizzes";
import AssessmentIntro from "./AssessmentIntro";
import SliderQuestion from "./SliderQuestion";
import AmslerGrid from "./AmslerGrid";
import AssessmentReport from "./AssessmentReport";

type Props = {
  quiz: QuizDef;
  onBack: () => void;
};

export default function QuizRunner({ quiz, onBack }: Props) {
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const allQuestions = quiz.questions;
  const currentQuestion: Question | null =
    currentIndex >= 0 && currentIndex < allQuestions.length ? allQuestions[currentIndex] : null;

  // Initialise slider answer to midpoint when landing on a slider question so "Next" works without touching it
  useEffect(() => {
    const q = allQuestions[currentIndex];
    if (!q || q.type !== "slider") return;
    const id = q.id;
    const mid = Math.round((q.min + q.max) / 2);
    setAnswers((a) => (a[id] !== undefined ? a : { ...a, [id]: mid }));
  }, [currentIndex, allQuestions]);

  const previousQuestion: Question | null =
    currentIndex > 0 && currentIndex <= allQuestions.length ? allQuestions[currentIndex - 1] : null;
  const showSectionHeader =
    currentQuestion &&
    previousQuestion &&
    currentQuestion.sectionId !== previousQuestion.sectionId;
  const currentSection = currentQuestion
    ? quiz.sections.find((s) => s.id === currentQuestion.sectionId)
    : null;

  const progress =
    showIntro ? 0 : ((currentIndex + 1) / allQuestions.length) * 100;
  const isComplete = !showIntro && currentIndex >= allQuestions.length;

  const handleChoice = (questionId: string, value: number) => {
    setAnswers((a) => ({ ...a, [questionId]: value }));
    setCurrentIndex((i) => i + 1);
  };

  const handleSliderChange = (questionId: string, value: number) => {
    setAnswers((a) => ({ ...a, [questionId]: value }));
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleAmslerResult = (questionId: string, hasAbnormality: boolean) => {
    setAnswers((a) => ({ ...a, [questionId]: hasAbnormality ? 1 : 0 }));
    setCurrentIndex((i) => i + 1);
  };

  if (showIntro) {
    return (
      <AssessmentIntro
        title={quiz.introTitle}
        body={quiz.introBody}
        disclaimer={quiz.introDisclaimer}
        onBegin={() => setShowIntro(false)}
        onBack={onBack}
      />
    );
  }

  if (isComplete) {
    const totalScore = getTotalScore(quiz, answers);
    const resultBand = getResultBand(quiz, totalScore);
    const sectionScores = getSectionScores(quiz, answers);
    const baselineValue = answers["baseline"];
    return (
      <AssessmentReport
        quiz={quiz}
        resultBand={resultBand}
        totalScore={totalScore}
        sectionScores={sectionScores}
        baselineValue={baselineValue}
        onBack={onBack}
        onRetake={() => {
          setShowIntro(true);
          setCurrentIndex(0);
          setAnswers({});
        }}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="animate-fade-in rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={
            currentIndex === 0
              ? () => setShowIntro(true)
              : () => setCurrentIndex((i) => i - 1)
          }
          className="text-white/70 hover:text-white text-sm font-medium transition-colors"
        >
          {currentIndex === 0 ? "← Back" : "← Previous"}
        </button>
        <span className="text-white/50 text-sm tabular-nums">
          {currentIndex + 1} of {allQuestions.length}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-8">
        <div
          className="h-full rounded-full bg-clinical-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {showSectionHeader && currentSection && (
        <div className="mb-8 pb-6 border-b border-white/10">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinical-300">
            {currentSection.title}
          </p>
          {currentSection.description && (
            <p className="mt-1 text-white/70 text-sm">{currentSection.description}</p>
          )}
        </div>
      )}

      {currentQuestion.type === "choice" && (
        <>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
            {currentQuestion.question}
          </h3>
          <ul className="space-y-3" role="listbox">
            {currentQuestion.choices.map((choice) => (
              <li key={choice.value}>
                <button
                  type="button"
                  onClick={(e) => {
                    handleChoice(currentQuestion.id, choice.value);
                    (e.currentTarget as HTMLElement).blur();
                  }}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).blur()}
                  className="w-full text-left px-5 py-4 rounded-2xl border-2 border-white/15 bg-white/5 text-white font-medium hover:border-clinical-400/50 hover:bg-clinical-500/10 focus:border-clinical-400 focus:bg-clinical-500/15 focus:outline-none focus:ring-2 focus:ring-clinical-400/30 transition-all duration-200"
                >
                  {choice.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {currentQuestion.type === "slider" && (
        <>
          <SliderQuestion
            question={currentQuestion.question}
            value={answers[currentQuestion.id] ?? Math.round((currentQuestion.min + currentQuestion.max) / 2)}
            min={currentQuestion.min}
            max={currentQuestion.max}
            labelLow={currentQuestion.labelLow}
            labelHigh={currentQuestion.labelHigh}
            onChange={(v) => handleSliderChange(currentQuestion.id, v)}
          />
          <div className="mt-8">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-clinical-500 text-white font-semibold hover:bg-clinical-400 transition-all"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {currentQuestion.type === "visual" && currentQuestion.visualType === "amsler" && (
        <AmslerGrid
          instruction={currentQuestion.instruction}
          question={currentQuestion.question}
          onResult={(hasAbnormality) => handleAmslerResult(currentQuestion.id, hasAbnormality)}
        />
      )}
    </div>
  );
}
