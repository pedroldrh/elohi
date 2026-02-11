"use client";

import Image from "next/image";
import { useReveal } from "@/lib/animations";

const LOGOS = [
  { src: "/logos/kraft-heinz.webp", alt: "Kraft Heinz" },
  { src: "/logos/impossible.webp", alt: "Impossible Foods" },
  { src: "/logos/sara-lee.webp", alt: "Sara Lee" },
  { src: "/logos/natures-fynd.webp", alt: "Nature's Fynd" },
  { src: "/logos/marzetti.webp", alt: "Marzetti" },
  { src: "/logos/quorn.webp", alt: "Quorn" },
  { src: "/logos/lightlife.webp", alt: "Lightlife" },
  { src: "/logos/gonnella.webp", alt: "Gonnella" },
  { src: "/logos/uncle-matts.webp", alt: "Uncle Matt's Organic" },
  { src: "/logos/tea-forte.webp", alt: "Tea Forté" },
  { src: "/logos/purely-elizabeth.webp", alt: "Purely Elizabeth" },
  { src: "/logos/nutpods.webp", alt: "Nutpods" },
];

const TESTIMONIALS = [
  {
    quote:
      "ESA gave us the playbook we needed to break into foodservice. Within six months, we had distribution in three major metro areas.",
    name: "VP of Sales",
    company: "Emerging CPG Brand",
  },
  {
    quote:
      "Stephanie and her team understand the foodservice channel like no one else. Their pricing and freight analysis alone saved us from costly mistakes.",
    name: "CEO",
    company: "Plant-Based Food Startup",
  },
  {
    quote:
      "We went from zero restaurant accounts to a full pipeline. ESA doesn't just advise — they execute.",
    name: "Founder",
    company: "Specialty Food Manufacturer",
  },
];

export function Clients() {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div
          className="text-center mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-sm font-medium text-[#6FB7F2] uppercase tracking-wider">
            Trusted by leading brands
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
            Clients We&apos;ve Supported
          </h2>
        </div>

        {/* Logo grid */}
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: "200ms",
          }}
        >
          {LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="relative w-24 h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card/50 p-6 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${400 + i * 150}ms`,
              }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
