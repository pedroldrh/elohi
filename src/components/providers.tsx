"use client";

import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { QuizModal } from "@/components/quiz/quiz-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
      <Suspense fallback={null}>
        <QuizModal />
      </Suspense>
    </>
  );
}
