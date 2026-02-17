"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-config";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer: string;
  onSubmitAnswer: (answer: string) => void;
  onBack: () => void;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onSubmitAnswer,
  onBack,
}: QuizQuestionProps) {
  const isYesNo = question.type === "yesno" || question.type === "yesno_detail";

  const [yesNo, setYesNo] = useState<"Yes" | "No" | null>(() => {
    if (currentAnswer === "Yes" || currentAnswer.startsWith("Yes: ")) return "Yes";
    if (currentAnswer === "No") return "No";
    return null;
  });
  const [detail, setDetail] = useState(() => {
    if (currentAnswer.startsWith("Yes: ")) return currentAnswer.slice(5);
    return "";
  });
  const [text, setText] = useState(currentAnswer);

  // Reset state when question changes
  useEffect(() => {
    setYesNo(() => {
      if (currentAnswer === "Yes" || currentAnswer.startsWith("Yes: ")) return "Yes";
      if (currentAnswer === "No") return "No";
      return null;
    });
    setDetail(() => {
      if (currentAnswer.startsWith("Yes: ")) return currentAnswer.slice(5);
      return "";
    });
    setText(currentAnswer);
  }, [question.question, currentAnswer]);

  const canProceed = (() => {
    if (isYesNo) return yesNo !== null;
    if (question.type === "text") return text.trim().length > 0;
    return false;
  })();

  const handleNext = () => {
    if (isYesNo) {
      if (yesNo === "Yes" && detail.trim()) {
        onSubmitAnswer(`Yes: ${detail.trim()}`);
      } else {
        onSubmitAnswer(yesNo!);
      }
    } else {
      onSubmitAnswer(text.trim());
    }
  };

  const handleYesNoSelect = (value: "Yes" | "No") => {
    setYesNo(value);
    setDetail("");
    if (value === "No") {
      onSubmitAnswer("No");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-1">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h3 className="text-xl font-semibold text-foreground">
          {question.question}
        </h3>
      </div>

      {/* Yes/No buttons */}
      {isYesNo && (
        <div className="flex gap-3">
          {(["Yes", "No"] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleYesNoSelect(option)}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
                yesNo === option
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Detail text field when "Yes" is selected */}
      {isYesNo && yesNo === "Yes" && (
        <div className="space-y-2">
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder={question.placeholder || "Tell us more..."}
            rows={2}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      )}

      {/* Text input for open-ended questions */}
      {question.type === "text" && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      )}

      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
        {/* Show Next for text questions and yes/no when Yes is selected */}
        {(question.type === "text" || (isYesNo && yesNo === "Yes")) && (
          <Button size="sm" onClick={handleNext} disabled={!canProceed}>
            {questionNumber === totalQuestions ? "Submit" : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}
