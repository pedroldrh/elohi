import { QUIZ_QUESTIONS, MAX_SCORE } from "./quiz-config";
import type { QuizResult, Track } from "@/types";

const GAP_MAP: Record<number, string> = {
  2: "CRM pipeline",
  3: "Freight economics",
  4: "Pricing model",
  5: "Go-to-market plan",
  6: "Trade spend & promo",
  7: "Target accounts",
};

const FALLBACK_GAPS = [
  "Distribution strategy",
  "Sales enablement",
  "Forecasting cadence",
];

export function calculateQuizResult(answers: number[]): QuizResult {
  const rawScore = answers.reduce((sum, optionIndex, qIndex) => {
    const question = QUIZ_QUESTIONS[qIndex];
    if (!question || optionIndex < 0 || optionIndex >= question.options.length) {
      return sum;
    }
    return sum + question.options[optionIndex].points;
  }, 0);

  const readinessScore = Math.round((rawScore / MAX_SCORE) * 100);

  // Gap detection
  const gaps: string[] = [];
  for (const [qIndexStr, gapLabel] of Object.entries(GAP_MAP)) {
    const qIndex = parseInt(qIndexStr, 10);
    if (answers[qIndex] !== undefined && answers[qIndex] <= 1) {
      gaps.push(gapLabel);
    }
  }

  // Fill to 3 gaps minimum
  let gapTags = gaps.slice(0, 3);
  if (gapTags.length < 3) {
    for (const fallback of FALLBACK_GAPS) {
      if (gapTags.length >= 3) break;
      if (!gapTags.includes(fallback)) {
        gapTags.push(fallback);
      }
    }
  }

  // Track assignment
  const q2Answer = answers[1] ?? -1; // Q2 is index 1
  const q9Answer = answers[8] ?? -1; // Q9 is index 8

  let recommendedTrack: Track;

  if (readinessScore < 40 || q2Answer === 0 || q9Answer === 0) {
    recommendedTrack = "LEARN";
  } else if (readinessScore >= 75) {
    recommendedTrack = "SCALE";
  } else {
    recommendedTrack = "BUILD";
  }

  return {
    readinessScore,
    recommendedTrack,
    gapTags,
    rawScore,
  };
}
