"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ParallaxHero } from "@/components/sections/parallax-hero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Calendar } from "lucide-react";
import { QuizTrigger } from "@/components/quiz/quiz-trigger";

function ContactForm() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "";
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: reason || "",
    message: "",
    website: "", // honeypot
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent! We'll be in touch soon.");
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          interest: "",
          message: "",
          website: "",
        });
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="pt-24">
      {/* Hero banner */}
      <ParallaxHero src="/contact-hero.jpg" alt="Gourmet dishes with herbs and spices">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFAF5]">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-[#E0C5AC]">
            Ready to grow your foodservice business? Let&apos;s talk.
          </p>
        </div>
      </ParallaxHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Form */}
            <Card className="md:col-span-3 rounded-2xl border-border">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Your role"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">I&apos;m interested in</Label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&>option]:bg-background [&>option]:text-foreground"
                    >
                      <option value="">Select an option</option>
                      <option value="learn">Learn — Foodservice fundamentals</option>
                      <option value="build">Build — Scoped project</option>
                      <option value="scale">Scale — Ongoing advisory</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals..."
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                    />
                  </div>

                  {/* Honeypot — hidden from users */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              {/* Food image card */}
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <Image
                  src="/poke-bowl.jpg"
                  alt="Fresh poke bowl"
                  fill
                  className="object-cover"
                />
              </div>

              <Card className="rounded-2xl border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#6FB7F2]" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">
                        hello@elohi.us
                      </p>
                    </div>
                  </div>

                  {calendlyUrl && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#00BC70]" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Book a Call
                        </p>
                        <a
                          href={calendlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#6FB7F2] hover:underline"
                        >
                          Schedule on Calendly
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    Not sure where to start? Take our{" "}
                    <span className="text-[#AF95E4] font-medium cursor-pointer hover:underline" onClick={() => { const url = new URL(window.location.href); url.searchParams.set("quiz", "1"); window.history.pushState({}, "", `${url.pathname}${url.search}`); window.dispatchEvent(new PopStateEvent("popstate")); }}>
                      readiness quiz
                    </span>{" "}
                    to get a personalized recommendation, then we&apos;ll follow
                    up with next steps.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
