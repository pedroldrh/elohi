"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizTrigger } from "@/components/quiz/quiz-trigger";
import { ArrowRight } from "lucide-react";
import { useParallax } from "@/lib/animations";

function TypedText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    const typeNext = () => {
      if (cancelled || i >= text.length) {
        if (!cancelled) setDone(true);
        return;
      }
      i++;
      setDisplayed(text.slice(0, i));
      const delay = 80 + Math.random() * 80;
      setTimeout(typeNext, delay);
    };

    const delay = setTimeout(typeNext, 600);
    return () => { cancelled = true; clearTimeout(delay); };
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  );
}

export function Hero() {
  const { ref, offset } = useParallax(0.3);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}
      >
        <Image
          src="/hero-plating.jpg"
          alt="Chefs plating dishes in a professional kitchen"
          fill
          className="object-cover scale-110"
          priority
        />
      </div>
      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFAF5]">
          Foodservice growth,{" "}
          <TypedText
            text="engineered."
            className="font-demontilles bg-gradient-to-r from-[#6FB7F2] via-[#AF95E4] to-[#E41C50] bg-clip-text text-transparent inline-block px-3 py-3 -mx-3 leading-loose"
          />
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-[#E0C5AC] leading-relaxed font-bilo">
          For manufacturers ready to win restaurant distribution&mdash;pricing,
          freight economics, pipeline, and go-to-market.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <QuizTrigger size="lg">
            Take our Quiz
          </QuizTrigger>
          <Button asChild variant="outline" size="lg" className="border-[#FFFAF5]/30 text-[#FFFAF5] hover:bg-[#FFFAF5] hover:text-[#6929CD]">
            <Link href="/services">
              See Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
