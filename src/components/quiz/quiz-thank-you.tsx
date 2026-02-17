"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface QuizThankYouProps {
  onClose: () => void;
}

export function QuizThankYou({ onClose }: QuizThankYouProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-foreground">
        Thank you for your responses!
      </h2>

      <p className="text-muted-foreground">
        Our team will review your answers and reach out with personalized
        recommendations for your foodservice strategy.
      </p>

      <div className="space-y-3 pt-2">
        <Button asChild className="w-full" size="lg">
          <Link href="/contact" onClick={onClose}>
            Book a Strategy Call
          </Link>
        </Button>
        <Button variant="ghost" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
