"use client";

import Image from "next/image";
import { BookOpen, Wrench, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useReveal } from "@/lib/animations";

const PILLARS = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Master the fundamentals of foodservice sales.",
    image: "/pillar-learn.jpg",
    imageAlt: "Fresh salad bar with colorful ingredients",
    details: [
      "Pricing & margin analysis",
      "Distributor landscape 101",
      "Go-to-market foundations",
      "CRM & pipeline basics",
    ],
    accentColor: "#6FB7F2",
  },
  {
    icon: Wrench,
    title: "Build",
    description: "Targeted projects to solve specific growth challenges.",
    image: "/pillar-build.jpg",
    imageAlt: "Restaurant server presenting a plated dish",
    details: [
      "Custom pricing studies",
      "Freight & distribution modeling",
      "Sales playbook creation",
      "Target account identification",
    ],
    accentColor: "#E41C50",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    description: "Ongoing advisory for accelerating foodservice revenue.",
    image: "/pillar-scale.jpg",
    imageAlt: "Grocery store produce section at scale",
    details: [
      "Fractional sales leadership",
      "Trade spend optimization",
      "Pipeline management",
      "Quarterly business reviews",
    ],
    accentColor: "#00BC70",
  },
];

export function Pillars() {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Three tracks. <span className="font-demontilles">One goal.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-bilo">
            Whether you&apos;re just starting or ready to scale, we meet you where
            you are with the right level of support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, i) => (
            <Card
              key={pillar.title}
              className="rounded-2xl border-border overflow-hidden hover:border-[#AF95E4]/40 transition-all duration-700 ease-out group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${200 + i * 150}ms`,
              }}
            >
              {/* Card image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div
                  className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-[#FFFAF5]"
                  style={{ backgroundColor: pillar.accentColor }}
                >
                  <pillar.icon className="w-3.5 h-3.5" />
                  {pillar.title}
                </div>
              </div>

              <CardHeader className="pt-4">
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
                <CardDescription>{pillar.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pillar.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span style={{ color: pillar.accentColor }} className="text-lg leading-none shrink-0">&#8226;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
