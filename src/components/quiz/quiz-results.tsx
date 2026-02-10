"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { QuizResult } from "@/types";

interface QuizResultsProps {
  result: QuizResult;
  onClose: () => void;
}

const TRACK_INFO: Record<
  string,
  { title: string; description: string; color: string; ctaBg: string; cta: string; ctaHref: string }
> = {
  LEARN: {
    title: "Learn",
    description:
      "You're early in your foodservice journey. We'll help you build the foundation — pricing basics, distribution 101, and a clear path forward.",
    color: "#6FB7F2",
    ctaBg: "#6FB7F2",
    cta: "Get the Foodservice Starter Pack",
    ctaHref: "/contact?reason=learn",
  },
  BUILD: {
    title: "Build",
    description:
      "You've got the basics down but need targeted help. We'll scope a project around your biggest gaps and deliver actionable solutions.",
    color: "#E41C50",
    ctaBg: "#E41C50",
    cta: "Request a Scoped Project",
    ctaHref: "/contact?reason=build",
  },
  SCALE: {
    title: "Scale",
    description:
      "You're ready to accelerate. We'll provide ongoing advisory and execution support to grow your foodservice revenue.",
    color: "#00BC70",
    ctaBg: "#00BC70",
    cta: "Book a Strategy Call",
    ctaHref: process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact?reason=scale",
  },
};

export function QuizResults({ result, onClose }: QuizResultsProps) {
  const track = TRACK_INFO[result.recommendedTrack];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Your Results</h2>
      </div>

      {/* Score */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Readiness Score</span>
          <span className="text-2xl font-bold text-foreground">
            {result.readinessScore}%
          </span>
        </div>
        <Progress value={result.readinessScore} className="h-3" />
      </div>

      {/* Track recommendation */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <p className="text-sm text-muted-foreground">Recommended Track</p>
        <h3 className="text-xl font-bold" style={{ color: track.color }}>{track.title}</h3>
        <p className="text-sm text-muted-foreground">{track.description}</p>
      </div>

      {/* Gaps */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <p className="text-sm text-muted-foreground">Key Areas to Address</p>
        <ul className="space-y-2">
          {result.gapTags.map((gap) => (
            <li
              key={gap}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <ArrowRight className="w-4 h-4 text-secondary shrink-0" />
              {gap}
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Button asChild className="w-full" size="lg" style={{ backgroundColor: track.ctaBg }}>
          <Link href={track.ctaHref} onClick={onClose}>
            {track.cta}
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
