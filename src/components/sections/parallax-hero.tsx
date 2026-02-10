"use client";

import Image from "next/image";
import { useParallax } from "@/lib/animations";

export function ParallaxHero({
  src,
  alt,
  children,
  className = "py-20",
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, offset } = useParallax(0.3);

  return (
    <section ref={ref} className={`relative ${className} px-4 sm:px-6 lg:px-8 overflow-hidden`}>
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      {children}
    </section>
  );
}
