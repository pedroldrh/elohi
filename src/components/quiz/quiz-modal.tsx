"use client";

import { useReducer, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { QuizLeadCapture } from "./quiz-lead-capture";
import { QuizQuestion } from "./quiz-question";
import { QuizThankYou } from "./quiz-thank-you";
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from "@/lib/quiz-config";
import { determineTrack, type Track } from "@/lib/quiz-scoring";
import { trackEvent } from "@/lib/analytics";

interface QuizState {
  step: number; // 0=lead, 1-N=questions, N+1=thank you
  lead: { email: string; company: string; role: string };
  answers: string[];
  track: Track | null;
  isSubmitting: boolean;
  error: string | null;
}

type QuizAction =
  | { type: "SET_LEAD"; payload: { email: string; company: string; role: string } }
  | { type: "SET_ANSWER"; payload: { questionIndex: number; answer: string } }
  | { type: "GO_BACK" }
  | { type: "FINISH"; payload: Track }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: QuizState = {
  step: 0,
  lead: { email: "", company: "", role: "" },
  answers: Array(TOTAL_QUESTIONS).fill(""),
  track: null,
  isSubmitting: false,
  error: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_LEAD":
      return { ...state, lead: action.payload, step: 1 };
    case "SET_ANSWER": {
      const answers = [...state.answers];
      answers[action.payload.questionIndex] = action.payload.answer;
      const nextStep = state.step + 1;
      return { ...state, answers, step: nextStep };
    }
    case "GO_BACK":
      return { ...state, step: Math.max(0, state.step - 1) };
    case "FINISH":
      return { ...state, step: TOTAL_QUESTIONS + 1, track: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function QuizModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("quiz") === "1";

  const [state, dispatch] = useReducer(quizReducer, initialState);

  const closeQuiz = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("quiz");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : window.location.pathname, { scroll: false });
    dispatch({ type: "RESET" });
  }, [router, searchParams]);

  const handleClose = useCallback(() => {
    if (state.step > 0 && state.step <= TOTAL_QUESTIONS) {
      if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
        closeQuiz();
      }
    } else {
      closeQuiz();
    }
  }, [state.step, closeQuiz]);

  const handleLeadSubmit = useCallback(
    (lead: { email: string; company: string; role: string }) => {
      dispatch({ type: "SET_LEAD", payload: lead });
      trackEvent("quiz_lead_captured", { email: lead.email });
    },
    []
  );

  const handleAnswer = useCallback(
    async (answer: string) => {
      const questionIndex = state.step - 1;
      dispatch({
        type: "SET_ANSWER",
        payload: { questionIndex, answer },
      });

      trackEvent("quiz_answer", { question: questionIndex + 1 });

      // If this was the last question, submit
      if (state.step === TOTAL_QUESTIONS) {
        const updatedAnswers = [...state.answers];
        updatedAnswers[questionIndex] = answer;

        dispatch({ type: "SET_SUBMITTING", payload: true });

        try {
          await fetch("/api/quiz/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lead: state.lead,
              answers: updatedAnswers,
            }),
          });
        } catch {
          console.error("[Quiz] Failed to submit results");
        }

        const track = determineTrack(updatedAnswers);

        dispatch({ type: "SET_SUBMITTING", payload: false });
        dispatch({ type: "FINISH", payload: track });
        trackEvent("quiz_completed", { email: state.lead.email, track });
      }
    },
    [state.step, state.answers, state.lead]
  );

  const handleBack = useCallback(() => {
    dispatch({ type: "GO_BACK" });
  }, []);

  // Determine progress bar value
  const progressValue =
    state.step >= 1 && state.step <= TOTAL_QUESTIONS
      ? (state.step / (TOTAL_QUESTIONS + 1)) * 100
      : state.step > TOTAL_QUESTIONS
        ? 100
        : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Foodservice Readiness Quiz</DialogTitle>

        {/* Progress bar for question steps */}
        {state.step >= 1 && (
          <Progress value={progressValue} className="h-2 mb-4" />
        )}

        {/* Step content */}
        {state.step === 0 && (
          <QuizLeadCapture
            onSubmit={handleLeadSubmit}
            initialLead={state.lead}
          />
        )}

        {state.step >= 1 && state.step <= TOTAL_QUESTIONS && (
          <QuizQuestion
            question={QUIZ_QUESTIONS[state.step - 1]}
            questionNumber={state.step}
            totalQuestions={TOTAL_QUESTIONS}
            currentAnswer={state.answers[state.step - 1]}
            onSubmitAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}

        {state.step > TOTAL_QUESTIONS && state.track && (
          <QuizThankYou track={state.track} onClose={closeQuiz} />
        )}

        {state.isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-2xl">
            <div className="text-sm text-muted-foreground animate-pulse">
              Submitting your responses...
            </div>
          </div>
        )}

        {state.error && (
          <p className="text-sm text-destructive text-center">{state.error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
