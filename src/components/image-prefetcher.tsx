"use client";

import { useEffect } from "react";

// Hero / full-width images → prefetch at common screen widths
const HERO_IMAGES = [
  "/contact-hero.jpg",
  "/services-hero.jpg",
  "/serving-dish.jpg",
  "/salad-bowls.jpg",
  "/dining.jpg",
  "/social-proof-bg.jpg",
  "/spice-market.jpg",
];

// Card / smaller images
const CARD_IMAGES = [
  "/stephanie-lind.jpg",
  "/pillar-learn.jpg",
  "/pillar-build.jpg",
  "/pillar-scale.jpg",
  "/berries.jpg",
  "/pizza-kitchen.jpg",
  "/lasagna.jpg",
  "/taco-prep.jpg",
  "/grocery-store.jpg",
];

function nextImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

export function ImagePrefetcher() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Pick widths that match what the browser will actually request
      const screenW = window.innerWidth;
      // Next.js deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
      const heroW = screenW <= 828 ? 828 : screenW <= 1200 ? 1200 : 1920;
      const cardW = screenW <= 768 ? heroW : screenW <= 1200 ? 640 : 828;

      HERO_IMAGES.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = nextImageUrl(src, heroW);
        document.head.appendChild(link);
      });

      CARD_IMAGES.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = nextImageUrl(src, cardW);
        document.head.appendChild(link);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
