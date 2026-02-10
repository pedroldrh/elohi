import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Pillars } from "@/components/sections/pillars";
import { FeaturedVideo } from "@/components/sections/featured-video";
import { CTABanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <SocialProof />
      <FeaturedVideo />
      <CTABanner />
    </main>
  );
}
