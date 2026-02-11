"use client";

import Image from "next/image";
import { useReveal } from "@/lib/animations";

const LOGOS = [
  { src: "/logos/kraft-heinz.webp", alt: "Kraft Heinz", url: "https://www.kraftheinz.com/" },
  { src: "/logos/impossible.webp", alt: "Impossible Foods", url: "https://impossiblefoods.com/" },
  { src: "/logos/sara-lee.webp", alt: "Sara Lee", url: "https://www.saraleefrozenbakery.com/" },
  { src: "/logos/natures-fynd.webp", alt: "Nature's Fynd", url: "https://www.naturesfynd.com/" },
  { src: "/logos/marzetti.webp", alt: "Marzetti", url: "https://marzetti.com/" },
  { src: "/logos/quorn.webp", alt: "Quorn", url: "https://www.quorn.us/" },
  { src: "/logos/lightlife.webp", alt: "Lightlife", url: "https://lightlife.com/" },
  { src: "/logos/gonnella.webp", alt: "Gonnella", url: "https://gonnella.com/" },
  { src: "/logos/uncle-matts.webp", alt: "Uncle Matt's Organic", url: "https://www.unclematts.com/" },
  { src: "/logos/tea-forte.webp", alt: "Tea Forté", url: "https://teaforte.com/" },
  { src: "/logos/purely-elizabeth.webp", alt: "Purely Elizabeth", url: "https://purelyelizabeth.com/" },
  { src: "/logos/nutpods.webp", alt: "Nutpods", url: "https://www.nutpods.com/" },
];

const TESTIMONIALS = [
  {
    quote:
      "I needed someone who could guide us on the go-to-market strategy, so one of our really important partners is Elohi Strategic Advisors, who has kind of guided us throughout the foodservice industry and helped us to get that perspective of the operator.",
    name: "Michelle Wolf",
    title: "Co-Founder & CEO",
    company: "New Wave Foods",
  },
  {
    quote:
      "Elohi helped us design our strategy for the U.S. foodservice market, including both operators and distributors. Most importantly, Elohi has played an instrumental role on its execution.",
    name: "Andre Menezes",
    title: "Co-Founder & CEO",
    company: "Next Gen Foods (TiNDLE)",
  },
  {
    quote:
      "We found Elohi and they have been plug and play for us. They've figured out the strategy and the go-to-market strategy and how to really understand operators, and it's been essential to our product launch.",
    name: "Shannon Cosentino-Roush",
    title: "Chief Strategy Officer",
    company: "Finless Foods",
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
            <a
              key={logo.alt}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-24 h-16 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </a>
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
                <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
