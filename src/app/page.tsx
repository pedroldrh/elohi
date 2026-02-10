import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Pillars } from "@/components/sections/pillars";
import { CTABanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Pillars />
      <CTABanner />
    </main>
  );
}
