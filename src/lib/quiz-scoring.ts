import { QUIZ_QUESTIONS } from "./quiz-config";

export type Track = "LEARN" | "BUILD" | "SCALE";

export function determineTrack(answers: string[]): Track {
  let yesCount = 0;

  answers.forEach((answer, i) => {
    const q = QUIZ_QUESTIONS[i];
    if (!q) return;

    if (q.type === "yesno" || q.type === "yesno_detail") {
      if (answer === "Yes" || answer.startsWith("Yes: ")) {
        yesCount++;
      }
    } else if (q.type === "text") {
      if (answer.trim().length > 0) {
        yesCount++;
      }
    }
  });

  // 10 scorable questions (excluding the last open-ended "where can ESA help")
  if (yesCount <= 4) return "LEARN";
  if (yesCount <= 8) return "BUILD";
  return "SCALE";
}
