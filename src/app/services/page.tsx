"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ParallaxHero } from "@/components/sections/parallax-hero";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuizTrigger } from "@/components/quiz/quiz-trigger";
import { BookOpen, Wrench, TrendingUp, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: BookOpen,
    title: "Learn",
    subtitle: "For teams new to foodservice",
    image: "/berries.jpg",
    imageAlt: "Fresh berries — learning the basics",
    description:
      "Build the foundation you need before investing in sales infrastructure.",
    outcomes: [
      "Understand distributor landscape and economics",
      "Build a basic pricing model",
      "Know your go-to-market options",
      "Set up a CRM and lead pipeline",
    ],
    deliverables: [
      "Foodservice 101 workshop (virtual)",
      "Pricing & margin analysis template",
      "Distribution channel overview",
      "CRM setup guidance",
    ],
    cta: "Get Started Learning",
    ctaHref: "/learn",
    accentColor: "#6FB7F2",
  },
  {
    icon: Wrench,
    title: "Build",
    subtitle: "For teams solving specific gaps",
    image: "/pizza-kitchen.jpg",
    imageAlt: "Pizza kitchen operations — building systems",
    description:
      "Targeted consulting engagements scoped to your biggest growth blockers.",
    outcomes: [
      "Custom pricing study for your products",
      "Freight & distribution cost model",
      "Sales playbook and pitch materials",
      "Target account list with outreach plan",
    ],
    deliverables: [
      "Scoped project plan (2-8 weeks)",
      "Deliverable-based engagement",
      "Bi-weekly progress calls",
      "Final report with recommendations",
    ],
    cta: "Request a Scoped Project",
    ctaHref: "/contact?reason=build",
    accentColor: "#E41C50",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    subtitle: "For teams ready to accelerate",
    image: "/lasagna.jpg",
    imageAlt: "Professional food presentation — scaling operations",
    description:
      "Ongoing advisory and fractional sales leadership to grow foodservice revenue.",
    outcomes: [
      "Optimized trade spend and promotions",
      "Active pipeline management",
      "Sales team coaching and enablement",
      "Quarterly business reviews with operators",
    ],
    deliverables: [
      "Monthly retainer engagement",
      "Fractional VP of Sales support",
      "Weekly pipeline reviews",
      "Executive dashboards and reporting",
    ],
    cta: "Book a Strategy Call",
    ctaHref: process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact?reason=scale",
    accentColor: "#00BC70",
  },
];

const FAQ = [
  {
    question: "How long does a typical engagement last?",
    answer:
      "Learn engagements are typically 2-4 weeks. Build projects run 4-12 weeks depending on scope. Scale engagements are ongoing monthly retainers with quarterly review cycles.",
  },
  {
    question: "What data do you need to get started?",
    answer:
      "We'll start with a discovery call to understand your products, current sales channels, and goals. For pricing and freight work, we'll need product specs, current pricing, and shipping data — we'll guide you through everything.",
  },
  {
    question: "How do you measure success?",
    answer:
      "Every engagement starts with clear KPIs. Common metrics include: new accounts opened, revenue from foodservice channel, pipeline value, margin improvements, and distributor acceptance rates.",
  },
  {
    question: "Is my data confidential?",
    answer:
      "Absolutely. We sign NDAs before any data exchange and maintain strict confidentiality. Your pricing, customer lists, and proprietary data are never shared.",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-24">
      {/* Header with background image */}
      <ParallaxHero src="/grain-bowl.jpg" alt="Mediterranean grain bowl">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFAF5]">
            Services
          </h1>
          <p className="mt-4 text-lg text-[#E0C5AC] max-w-2xl mx-auto">
            Choose the track that matches where you are.
          </p>
          <div className="mt-4">
            <QuizTrigger size="sm">
              Take the quiz to find out
            </QuizTrigger>
          </div>
        </div>
      </ParallaxHero>

      {/* Service Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              className="rounded-2xl border-border flex flex-col overflow-hidden group"
            >
              {/* Card image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-[#FFFAF5]"
                  style={{ backgroundColor: service.accentColor }}
                >
                  <service.icon className="w-3.5 h-3.5" />
                  {service.title}
                </div>
              </div>

              <CardHeader className="pt-4">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  {service.subtitle}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Outcomes
                  </h4>
                  <ul className="space-y-1.5">
                    {service.outcomes.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <ArrowRight className="w-3 h-3 mt-1 shrink-0" style={{ color: service.accentColor }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span style={{ color: service.accentColor }} className="mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full" style={{ backgroundColor: service.accentColor }}>
                  <Link href={service.ctaHref}>{service.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-xl border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
