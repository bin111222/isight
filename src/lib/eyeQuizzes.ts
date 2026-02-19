/**
 * Eye health self-assessments: medical-test style with sections, sliders,
 * optional visual tests (Amsler, acuity), and formal report with sub-scores.
 */

export type QuizId = "dry-eye" | "digital-strain" | "vision-wellness";

export type Choice = {
  label: string;
  value: number;
};

/** Question can be multiple choice, severity slider, or a visual screening step. */
export type Question =
  | {
      id: string;
      type: "choice";
      question: string;
      choices: Choice[];
      sectionId: string;
    }
  | {
      id: string;
      type: "slider";
      question: string;
      sectionId: string;
      min: number;
      max: number;
      labelLow: string;
      labelHigh: string;
      /** Slider value is stored; for scoring we map to 0--4 scale: (value - min) / (max - min) * 4 */
    }
  | {
      id: string;
      type: "visual";
      visualType: "amsler" | "acuity";
      question: string;
      sectionId: string;
      instruction: string;
    };

export type Section = {
  id: string;
  title: string;
  description?: string;
};

export type ResultBand = {
  min: number;
  max: number;
  riskLevel: "low" | "moderate" | "high";
  title: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  reportRecommendation: string[];
};

export type QuizDef = {
  id: QuizId;
  title: string;
  shortDescription: string;
  icon: string;
  estimatedMinutes: number;
  /** Intro shown before assessment; consent-style. */
  introTitle: string;
  introBody: string;
  introDisclaimer: string;
  /** Baseline: "Rate your eye comfort right now (1 = comfortable, 10 = very uncomfortable)". */
  baselineQuestion: string;
  sections: Section[];
  questions: Question[];
  resultBands: ResultBand[];
};

const NEVER_TO_ALWAYS: Choice[] = [
  { label: "None of the time", value: 0 },
  { label: "Some of the time", value: 1 },
  { label: "Half of the time", value: 2 },
  { label: "Most of the time", value: 3 },
  { label: "All of the time", value: 4 },
];

export const DRY_EYE_QUIZ: QuizDef = {
  id: "dry-eye",
  title: "Dry Eye Self-Assessment",
  shortDescription: "Screening tool based on symptom patterns. Not a substitute for clinical diagnosis.",
  icon: "💧",
  estimatedMinutes: 4,
  introTitle: "Dry Eye Symptom Assessment",
  introBody:
    "This self-assessment uses symptom-based questions similar to those used in clinical practice. It helps identify whether you may have dry eye symptoms that warrant a professional evaluation. In-clinic tests (e.g. Schirmer, tear breakup time, meibomian gland imaging) are required for diagnosis.",
  introDisclaimer:
    "This tool is for awareness only and does not replace an in-person eye examination.",
  baselineQuestion: "Right now, how would you rate your eye comfort? (1 = very comfortable, 10 = very uncomfortable)",
  sections: [
    { id: "symptoms", title: "Part A — Symptom severity", description: "Over the past week, how would you rate the following?" },
    { id: "habits", title: "Part B — Habits & environment", description: "A few questions about your daily routine." },
  ],
  questions: [
    {
      id: "baseline",
      type: "slider",
      question: "Right now, how would you rate your eye comfort?",
      sectionId: "intro",
      min: 1,
      max: 10,
      labelLow: "Very comfortable",
      labelHigh: "Very uncomfortable",
    },
    {
      id: "q_dry_gritty",
      type: "slider",
      question: "Dry or gritty sensation in your eyes",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
    {
      id: "q_burning",
      type: "slider",
      question: "Burning or stinging",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
    {
      id: "q_light_sensitivity",
      type: "slider",
      question: "Sensitivity to light or wind",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
    {
      id: "q_blur",
      type: "slider",
      question: "Blurred or fluctuating vision during the day",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
    {
      id: "q_screen",
      type: "choice",
      question: "Do screens (computer, phone) make your eyes tired or uncomfortable?",
      sectionId: "habits",
      choices: NEVER_TO_ALWAYS,
    },
    {
      id: "q_drops",
      type: "choice",
      question: "How often do you use lubricating eye drops or artificial tears?",
      sectionId: "habits",
      choices: NEVER_TO_ALWAYS,
    },
  ],
  resultBands: [
    {
      min: 0,
      max: 8,
      riskLevel: "low",
      title: "Low symptom burden",
      summary: "Your responses suggest minimal dry eye symptoms. Continue good habits: blink regularly, take screen breaks, and consider a routine eye exam.",
      ctaLabel: "Learn about dry eye care",
      ctaHref: "/dry-eye-treatment-mumbai",
      reportRecommendation: ["Routine eye exam as per your age and risk factors.", "Maintain blink awareness and screen breaks."],
    },
    {
      min: 9,
      max: 18,
      riskLevel: "moderate",
      title: "Mild to moderate symptoms",
      summary: "Your symptom scores suggest dry eye may be affecting you. A specialist can confirm with tear film tests and recommend a tailored plan—from drops to advanced therapies (e.g. IPL, Forma).",
      ctaLabel: "Book a dry eye evaluation",
      ctaHref: "/consult",
      reportRecommendation: ["Consider a comprehensive dry eye evaluation.", "In-clinic tests: Schirmer, TBUT, meibography.", "Discuss lubricants, lid hygiene, and advanced options if needed."],
    },
    {
      min: 19,
      max: 100,
      riskLevel: "high",
      title: "Significant symptom burden",
      summary: "Your responses indicate notable dry eye symptoms. We recommend a full evaluation to confirm the type and severity and to start an appropriate treatment plan.",
      ctaLabel: "Book a dry eye evaluation",
      ctaHref: "/consult",
      reportRecommendation: ["Schedule a dry eye evaluation.", "In-clinic assessment: tear volume, stability, meibomian glands.", "Personalised treatment plan (drops, IPL, punctal plugs, etc.)."],
    },
  ],
};

export const DIGITAL_STRAIN_QUIZ: QuizDef = {
  id: "digital-strain",
  title: "Digital Eye Strain Assessment",
  shortDescription: "Screen use and symptom screening. Helps identify when to seek an eye exam.",
  icon: "🖥️",
  estimatedMinutes: 4,
  introTitle: "Digital Eye Strain Screening",
  introBody:
    "This screening assesses your screen use habits and related symptoms. It is based on common indicators of digital eye strain and dry eye. Results can help you decide whether to adjust habits or seek a professional eye examination.",
  introDisclaimer:
    "This tool is for awareness only and does not replace an in-person eye examination.",
  baselineQuestion: "Right now, how would you rate your eye comfort? (1 = very comfortable, 10 = very uncomfortable)",
  sections: [
    { id: "exposure", title: "Part A — Screen exposure & habits", description: "Your typical daily screen use." },
    { id: "symptoms", title: "Part B — Symptom severity", description: "Over the past week, rate the following." },
  ],
  questions: [
    {
      id: "baseline",
      type: "slider",
      question: "Right now, how would you rate your eye comfort?",
      sectionId: "intro",
      min: 1,
      max: 10,
      labelLow: "Very comfortable",
      labelHigh: "Very uncomfortable",
    },
    {
      id: "q_hours",
      type: "choice",
      question: "On a typical day, how many hours do you spend on screens (phone, computer, tablet)?",
      sectionId: "exposure",
      choices: [
        { label: "Under 2 hours", value: 0 },
        { label: "2–4 hours", value: 1 },
        { label: "4–6 hours", value: 2 },
        { label: "6–8 hours", value: 3 },
        { label: "More than 8 hours", value: 4 },
      ],
    },
    {
      id: "q_breaks",
      type: "choice",
      question: "Do you take regular breaks (e.g. look away every 20 minutes)?",
      sectionId: "exposure",
      choices: [
        { label: "Always", value: 0 },
        { label: "Often", value: 1 },
        { label: "Sometimes", value: 2 },
        { label: "Rarely", value: 3 },
        { label: "Never", value: 4 },
      ],
    },
    {
      id: "q_headaches",
      type: "slider",
      question: "Headaches during or after screen use",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
    {
      id: "q_tired",
      type: "slider",
      question: "Eyes feeling tired or heavy by end of day",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
    {
      id: "q_blur_screen",
      type: "slider",
      question: "Blurred vision when looking up from the screen",
      sectionId: "symptoms",
      min: 1,
      max: 10,
      labelLow: "None",
      labelHigh: "Severe",
    },
  ],
  resultBands: [
    {
      min: 0,
      max: 6,
      riskLevel: "low",
      title: "Low strain",
      summary: "Your habits and symptoms suggest low digital eye strain. Keep up good practices: the 20-20-20 rule and regular blinking.",
      ctaLabel: "Tips for healthy screen use",
      ctaHref: "/dry-eye-treatment-mumbai",
      reportRecommendation: ["Continue 20-20-20 rule and blink awareness.", "Routine eye exam as recommended for your age."],
    },
    {
      min: 7,
      max: 15,
      riskLevel: "moderate",
      title: "Moderate strain",
      summary: "Screen use may be affecting your eyes. Consider better lighting, posture, and lubricating drops. An eye exam can rule out dry eye or refractive issues.",
      ctaLabel: "Book an eye check-up",
      ctaHref: "/consult",
      reportRecommendation: ["Optimise workspace: lighting, distance, breaks.", "Consider lubricating drops if needed.", "Eye exam to rule out dry eye or uncorrected vision."],
    },
    {
      min: 16,
      max: 100,
      riskLevel: "high",
      title: "High strain",
      summary: "Your responses suggest significant screen-related symptoms. A full eye exam can identify dry eye, refractive error, or other causes and guide a personalised plan.",
      ctaLabel: "Book a consultation",
      ctaHref: "/consult",
      reportRecommendation: ["Schedule a comprehensive eye exam.", "Discuss dry eye and refractive correction.", "Personalised advice on screen use and treatment."],
    },
  ],
};

export const VISION_WELLNESS_QUIZ: QuizDef = {
  id: "vision-wellness",
  title: "Vision Wellness Screening",
  shortDescription: "Quick screening for vision changes and risk factors. Includes a simple Amsler-style check.",
  icon: "🔍",
  estimatedMinutes: 5,
  introTitle: "Vision Wellness & Macular Screening",
  introBody:
    "This screening includes questions about vision changes and risk factors, plus an optional Amsler grid check. The Amsler grid is a standard tool used to screen for central vision problems. You will be asked to look at a grid and report any distortion or missing areas.",
  introDisclaimer:
    "This tool is for awareness only and does not replace a comprehensive eye examination.",
  baselineQuestion: "Right now, how would you rate the clarity of your central vision? (1 = very clear, 10 = very blurry or distorted)",
  sections: [
    { id: "symptoms", title: "Part A — Vision & symptoms", description: "Over the past few weeks." },
    { id: "history", title: "Part B — History & risk factors", description: "Brief medical and family history." },
    { id: "amsler", title: "Part C — Amsler grid check", description: "Optional screening for central vision. Cover one eye and look at the centre dot." },
  ],
  questions: [
    {
      id: "baseline",
      type: "slider",
      question: "Right now, how would you rate the clarity of your central vision?",
      sectionId: "intro",
      min: 1,
      max: 10,
      labelLow: "Very clear",
      labelHigh: "Blurry or distorted",
    },
    {
      id: "q_blur_near_far",
      type: "choice",
      question: "Has your vision become blurry for near or far in the last year?",
      sectionId: "symptoms",
      choices: NEVER_TO_ALWAYS,
    },
    {
      id: "q_halos",
      type: "choice",
      question: "Do you see halos or glare around lights at night?",
      sectionId: "symptoms",
      choices: NEVER_TO_ALWAYS,
    },
    {
      id: "q_squint",
      type: "choice",
      question: "Do you struggle to read small print or screens without squinting?",
      sectionId: "symptoms",
      choices: NEVER_TO_ALWAYS,
    },
    {
      id: "q_last_exam",
      type: "choice",
      question: "When was your last comprehensive eye exam?",
      sectionId: "history",
      choices: [
        { label: "Within the last year", value: 0 },
        { label: "1–2 years ago", value: 1 },
        { label: "2–3 years ago", value: 2 },
        { label: "3–5 years ago", value: 3 },
        { label: "More than 5 years ago / never", value: 4 },
      ],
    },
    {
      id: "q_family",
      type: "choice",
      question: "Do you have a family history of glaucoma or macular degeneration?",
      sectionId: "history",
      choices: [
        { label: "No", value: 0 },
        { label: "Not sure", value: 1 },
        { label: "Yes", value: 3 },
      ],
    },
    {
      id: "q_diabetes",
      type: "choice",
      question: "Do you have diabetes or high blood pressure?",
      sectionId: "history",
      choices: [
        { label: "No", value: 0 },
        { label: "Yes", value: 3 },
      ],
    },
    {
      id: "q_amsler",
      type: "visual",
      visualType: "amsler",
      question: "Amsler grid — Do you see any wavy lines, blur, or missing areas?",
      sectionId: "amsler",
      instruction: "Cover one eye. Look at the centre dot. Keep your gaze on the dot. Do all lines look straight and all squares present? Tap anywhere that looks wavy, blurry, or missing.",
    },
  ],
  resultBands: [
    {
      min: 0,
      max: 5,
      riskLevel: "low",
      title: "On track",
      summary: "Your responses and screening suggest no major red flags. Routine exams every 1–2 years are still recommended.",
      ctaLabel: "Book a routine check-up",
      ctaHref: "/consult",
      reportRecommendation: ["Routine comprehensive eye exam every 1–2 years.", "If Amsler showed any abnormality, mention it at your next visit."],
    },
    {
      min: 6,
      max: 14,
      riskLevel: "moderate",
      title: "Consider a check-up",
      summary: "Your answers suggest it may be time for an eye exam. We can check for refractive changes, cataract, dry eye, and glaucoma risk.",
      ctaLabel: "Book an eye exam",
      ctaHref: "/consult",
      reportRecommendation: ["Schedule a comprehensive eye exam.", "Bring this report and mention any Amsler findings."],
    },
    {
      min: 15,
      max: 100,
      riskLevel: "high",
      title: "Worth scheduling soon",
      summary: "Your responses and any Amsler findings suggest a full evaluation is advisable. We can assess vision, cataract, glaucoma, macular health, and dry eye.",
      ctaLabel: "Book a consultation",
      ctaHref: "/consult",
      reportRecommendation: ["Schedule a comprehensive eye evaluation soon.", "Discuss family history, diabetes, and any Amsler abnormalities.", "Full exam: refraction, pressure, retina, macula."],
    },
  ],
};

export const ALL_QUIZZES: QuizDef[] = [DRY_EYE_QUIZ, DIGITAL_STRAIN_QUIZ, VISION_WELLNESS_QUIZ];

export function getQuiz(id: QuizId): QuizDef | undefined {
  return ALL_QUIZZES.find((q) => q.id === id);
}

/** Normalise slider value (min--max) to 0--4 scale for consistent scoring with choice questions. */
export function sliderToScore(value: number, min: number, max: number): number {
  if (max === min) return 0;
  const normalised = (value - min) / (max - min);
  return Math.round(normalised * 4);
}

export function getTotalScore(quiz: QuizDef, answers: Record<string, number>): number {
  let total = 0;
  for (const q of quiz.questions) {
    if (q.id === "baseline") continue; // baseline is for context only, not scored
    const raw = answers[q.id];
    if (raw === undefined) continue;
    if (q.type === "choice") total += raw;
    if (q.type === "slider") total += sliderToScore(raw, q.min, q.max);
    if (q.type === "visual" && q.visualType === "amsler") {
      // 0 = no issue, 1 = issue reported → add 2 to risk
      total += raw === 1 ? 2 : 0;
    }
  }
  return total;
}

export function getResultBand(quiz: QuizDef, totalScore: number): ResultBand {
  const band = quiz.resultBands.find((b) => totalScore >= b.min && totalScore <= b.max);
  return band ?? quiz.resultBands[quiz.resultBands.length - 1];
}

/** Get section-wise score for report (section id -> { max, score }). */
export function getSectionScores(quiz: QuizDef, answers: Record<string, number>): { sectionId: string; title: string; score: number; max: number }[] {
  const sectionMap = new Map<string, { score: number; max: number }>();
  for (const sec of quiz.sections) {
    sectionMap.set(sec.id, { score: 0, max: 0 });
  }
  for (const q of quiz.questions) {
    if (q.id === "baseline") continue;
    const s = sectionMap.get(q.sectionId);
    if (!s) continue;
    const raw = answers[q.id];
    if (raw === undefined) continue;
    let contrib = 0;
    let maxContrib = 4;
    if (q.type === "choice") {
      contrib = raw;
      maxContrib = 4;
    }
    if (q.type === "slider") {
      contrib = sliderToScore(raw, q.min, q.max);
      maxContrib = 4;
    }
    if (q.type === "visual" && q.visualType === "amsler") {
      contrib = raw === 1 ? 2 : 0;
      maxContrib = 2;
    }
    s.score += contrib;
    s.max += maxContrib;
  }
  return quiz.sections.map((sec) => {
    const { score, max } = sectionMap.get(sec.id) ?? { score: 0, max: 0 };
    return { sectionId: sec.id, title: sec.title, score, max };
  });
}
