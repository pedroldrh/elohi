import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParallaxHero } from "@/components/sections/parallax-hero";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Watch free foodservice education videos from Elohi Strategic Advisors.",
};

const VIDEOS = [
  { id: "pMpzkpoR4o8", title: "Fireside Chat: Non-Commercial Foodservice (with Jane Foreman)" },
  { id: "xp5Pp61Yy-E", title: "Fireside Chat: The Sysco Drop-Ship Program" },
  { id: "0ztCzz2x-TY", title: "Fireside Chat: How Data Moves Within and Through a Company To Power Its Business" },
  { id: "35oHSjE93lg", title: "Fireside Chat: Fractional vs. Full-Time Employees" },
  { id: "2RkMOed-2e0", title: "Fireside Chat: The Basics of Foodservice Distribution" },
  { id: "4DyS7Fq9KO8", title: "Fireside Chat: Tariffs, AI, and Your Supply Chain" },
  { id: "hb7wy_wJxWY", title: "Fireside Chat: Insurance Myths That Are Costing Small Businesses Money" },
  { id: "GitZsNbe50Q", title: "Fireside Chat: Top 3 Legal Mistakes Small Businesses Make" },
  { id: "4R0BptYc51c", title: "Fireside Chat: The Strategy of Ethics" },
  { id: "9LDMgm1_EcM", title: "Fireside Chat: Supply Chain Data, Disruption & Drama" },
  { id: "559wS8-GPTQ", title: "Fireside Chat: 5 Supply-Chain Fiascos (from those who have lived it)" },
  { id: "DWI6zY9UJLA", title: "Fireside Chat: Oops AI Did It Again" },
];

export default function LearnPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <ParallaxHero src="/salad-bowls.jpg" alt="Colorful salad bowls overhead">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFAF5]">
            Learn
          </h1>
          <p className="mt-4 text-lg text-[#E0C5AC] max-w-2xl mx-auto">
            Free foodservice education — straight from the experts.
          </p>
        </div>
      </ParallaxHero>

      {/* Videos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEOS.map((video) => (
              <div key={video.id} className="space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-sm font-medium text-foreground">{video.title}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <a
                href="https://www.youtube.com/@esa-elohistrategicadvisors/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
