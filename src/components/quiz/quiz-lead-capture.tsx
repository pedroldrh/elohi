"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuizLeadCaptureProps {
  onSubmit: (lead: { email: string; company: string; role: string }) => void;
  initialLead?: { email: string; company: string; role: string };
}

export function QuizLeadCapture({ onSubmit, initialLead }: QuizLeadCaptureProps) {
  const [email, setEmail] = useState(initialLead?.email ?? "");
  const [company, setCompany] = useState(initialLead?.company ?? "");
  const [role, setRole] = useState(initialLead?.role ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, company, role });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Is your business ready for foodservice?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Answer a few quick questions so we can understand where you are
          and how ESA can best support your foodservice growth.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="quiz-email">Email *</Label>
          <Input
            id="quiz-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quiz-company">Company</Label>
          <Input
            id="quiz-company"
            type="text"
            placeholder="Your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quiz-role">Your role</Label>
          <Input
            id="quiz-role"
            type="text"
            placeholder="e.g. Founder, Sales Director"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Start the Quiz
        </Button>
      </form>
    </div>
  );
}
