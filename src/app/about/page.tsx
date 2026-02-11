import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Wrench, TrendingUp, Users, Handshake } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ParallaxHero } from "@/components/sections/parallax-hero";
import blurData from "@/lib/blur-data.json";

export const metadata: Metadata = {
  title: "About",
  description:
    "Elohi helps food manufacturers break into and grow within the foodservice industry with strategy and execution.",
};

const APPROACH = [
  {
    icon: BookOpen,
    title: "Learn",
    image: "/salad-bowls.jpg",
    imageAlt: "Colorful salad bowls overhead",
    description:
      "We teach the fundamentals of foodservice sales — pricing, distribution, CRM, and go-to-market — so you build on a solid foundation.",
    color: "#6FB7F2",
  },
  {
    icon: Wrench,
    title: "Build",
    image: "/taco-prep.jpg",
    imageAlt: "Food preparation in a commercial kitchen",
    description:
      "We scope targeted projects around your biggest gaps: pricing studies, freight modeling, sales playbooks, and target account mapping.",
    color: "#E41C50",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    image: "/grocery-store.jpg",
    imageAlt: "Grocery store distribution",
    description:
      "We provide ongoing advisory and fractional sales leadership to accelerate your foodservice revenue and optimize trade spend.",
    color: "#00BC70",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero with background image */}
      <ParallaxHero src="/serving-dish.jpg" alt="Serving a beautifully prepared dish" className="py-28">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFAF5]">
            Built for{" "}
            <span className="font-demontilles bg-gradient-to-r from-[#6FB7F2] to-[#F6A6B3] bg-clip-text text-transparent inline-block px-3 py-3 -mx-3 leading-loose">
              foodservice reality.
            </span>
          </h1>
          <p className="mt-6 text-lg text-[#E0C5AC] max-w-2xl mx-auto leading-relaxed font-bilo">
            Elohi exists because too many great food products never reach
            restaurant menus. We bridge the gap between manufacturing excellence
            and foodservice distribution with strategy grounded in real-world
            execution.
          </p>
        </div>
      </ParallaxHero>

      {/* Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APPROACH.map((item) => (
              <Card key={item.title} className="rounded-2xl border-border overflow-hidden group pt-0 gap-0">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pt-4">
                  <item.icon className="w-8 h-8 mb-3" style={{ color: item.color }} />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image divider */}
      <section className="relative h-64 sm:h-80">
        <Image
          src="/dining.jpg"
          alt="People enjoying food together"
          fill
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurData["/dining.jpg"]}
        />
      </section>

      {/* Who we work with */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-[#6FB7F2]" />
                <h2 className="text-2xl font-bold text-foreground">
                  Who We Work With
                </h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>Food manufacturers entering the foodservice channel</li>
                <li>CPG brands expanding from retail to restaurants</li>
                <li>Regional producers ready for national distribution</li>
                <li>Private-label manufacturers building direct sales</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Handshake className="w-6 h-6 text-[#00BC70]" />
                <h2 className="text-2xl font-bold text-foreground">
                  How Engagements Work
                </h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li>Start with the readiness quiz or a discovery call</li>
                <li>We assess your gaps and recommend a track</li>
                <li>Choose project-based or ongoing advisory engagement</li>
                <li>Measurable outcomes with quarterly reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
