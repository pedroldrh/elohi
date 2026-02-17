"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import blurData from "@/lib/blur-data.json";

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
      <span
        className={done ? "opacity-0" : "inline-block"}
        style={{
          animation: done ? "none" : "blink 0.7s step-end infinite",
          width: "3px",
          height: "0.85em",
          backgroundColor: "#AF95E4",
          verticalAlign: "baseline",
          marginLeft: "2px",
        }}
      />
      <style>{`@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-plating.jpg"
          alt="Chefs plating dishes in a professional kitchen"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurData["/hero-plating.jpg"]}
        />
      </div>
      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFAF5]">
          Foodservice growth,{" "}
          <TypedText
            text="engineered."
            className="bg-gradient-to-r from-[#6FB7F2] via-[#AF95E4] to-[#E41C50] bg-clip-text text-transparent inline-block px-3 py-3 -mx-3 leading-loose italic font-accent"
          />
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white leading-relaxed font-bilo">
          For manufacturers ready to win restaurant distribution&mdash;pricing,
          freight economics, pipeline, and go-to-market.
        </p>

        <div className="mt-10">
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
