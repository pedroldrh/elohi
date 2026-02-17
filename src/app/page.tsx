import { Hero } from "@/components/sections/hero";
import { QuizCTA } from "@/components/sections/quiz-cta";
import { SocialProof } from "@/components/sections/social-proof";
import { Pillars } from "@/components/sections/pillars";
import { Clients } from "@/components/sections/clients";
import { FeaturedVideo } from "@/components/sections/featured-video";
import { CTABanner } from "@/components/sections/cta-banner";
import { ImagePrefetcher } from "@/components/image-prefetcher";

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuizCTA />
      <Pillars />
      <Clients />
      <SocialProof />
      <FeaturedVideo />
      <CTABanner />
      <ImagePrefetcher />
    </main>
  );
}
