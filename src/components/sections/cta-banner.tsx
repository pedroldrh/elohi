"use client";

import Image from "next/image";
import { QuizTrigger } from "@/components/quiz/quiz-trigger";

export function CTABanner() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background image */}
          <Image
            src="/spice-market.jpg"
            alt="Colorful spice market"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 p-12 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFAF5]">
              Ready to find out <span className="font-demontilles">where you stand?</span>
            </h2>
            <p className="mt-4 text-lg text-[#E0C5AC] max-w-xl mx-auto font-bilo">
              Take our 2-minute readiness quiz and get a personalized roadmap for
              growing your foodservice business.
            </p>
            <div className="mt-8">
              <QuizTrigger size="lg">
                Take the Readiness Quiz
              </QuizTrigger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
