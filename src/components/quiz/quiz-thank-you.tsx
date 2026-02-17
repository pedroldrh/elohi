"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { Track } from "@/lib/quiz-scoring";

const TRACK_INFO: Record<Track, { label: string; href: string; color: string; description: string }> = {
  LEARN: {
    label: "Start Learning",
    href: "/learn",
    color: "#6FB7F2",
    description: "We recommend starting with our Learn track to build a strong foodservice foundation.",
  },
  BUILD: {
    label: "Build Your Strategy",
    href: "/services",
    color: "#E41C50",
    description: "You're ready for the Build track — targeted projects to solve specific growth challenges.",
  },
  SCALE: {
    label: "Scale Your Business",
    href: "/services",
    color: "#00BC70",
    description: "You're ready to Scale — ongoing advisory to accelerate your foodservice revenue.",
  },
};

interface QuizThankYouProps {
  track: Track;
  onClose: () => void;
}

export function QuizThankYou({ track, onClose }: QuizThankYouProps) {
  const info = TRACK_INFO[track];

  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-foreground">
        Thank you for your responses!
      </h2>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <p className="text-sm text-muted-foreground">Your recommended track</p>
        <h3 className="text-xl font-bold" style={{ color: info.color }}>
          {track}
        </h3>
        <p className="text-sm text-muted-foreground">{info.description}</p>
      </div>

      <p className="text-muted-foreground">
        The ESA team will review your answers and get in contact with you soon.
      </p>

      <div className="space-y-3 pt-2">
        <Button
          asChild
          className="w-full"
          size="lg"
          style={{ backgroundColor: info.color }}
        >
          <Link href={info.href} onClick={onClose}>
            {info.label}
          </Link>
        </Button>
        <Button variant="ghost" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
