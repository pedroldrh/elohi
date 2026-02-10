"use client";

import { Button } from "@/components/ui/button";
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-config";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelect: (optionIndex: number) => void;
  onBack: () => void;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelect,
  onBack,
}: QuizQuestionProps) {
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

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              selectedOption === index
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
        <p className="text-xs text-muted-foreground self-center">
          Select an option to continue
        </p>
      </div>
    </div>
  );
}
