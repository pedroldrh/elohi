import { Hero } from "@/components/sections/hero";
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
      <Pillars />
      <Clients />
      <SocialProof />
      <FeaturedVideo />
      <CTABanner />
      <ImagePrefetcher />
    </main>
  );
}
