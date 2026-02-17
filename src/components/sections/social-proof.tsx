"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import blurData from "@/lib/blur-data.json";

const STATS = [
  { numericValue: 50, prefix: "", suffix: "+", label: "Manufacturers Advised" },
  { numericValue: 2, prefix: "$", suffix: "M+", label: "Revenue Influenced" },
  { numericValue: 200, prefix: "", suffix: "+", label: "Restaurant Accounts Opened" },
  { numericValue: 15, prefix: "", suffix: "+", label: "Years in Foodservice" },
];

function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;

    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

function StatItem({ stat, isVisible, delay }: {
  stat: typeof STATS[number];
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.numericValue, isVisible);

  return (
    <div
      className="text-center transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#6FB7F2] to-[#95E1BF] bg-clip-text text-transparent">
        {stat.prefix}{count}{stat.suffix}
      </p>
      <p className="mt-2 text-sm text-white font-bilo">{stat.label}</p>
    </div>
  );
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Image
        src="/social-proof-bg.jpg"
        alt="Artisan cheese and fruit board"
        fill
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurData["/social-proof-bg.jpg"]}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
