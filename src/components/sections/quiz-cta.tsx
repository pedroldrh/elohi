"use client";

import { QuizTrigger } from "@/components/quiz/quiz-trigger";

export function QuizCTA() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50 border-y border-border">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-lg font-medium text-foreground font-bilo">
          How ready for foodservice is your brand?
        </p>
        <QuizTrigger size="lg" />
      </div>
    </section>
  );
}
