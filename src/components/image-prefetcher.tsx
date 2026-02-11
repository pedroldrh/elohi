"use client";

import { useEffect } from "react";

const SITE_IMAGES = [
  "/contact-hero.jpg",
  "/services-hero.jpg",
  "/serving-dish.jpg",
  "/salad-bowls.jpg",
  "/dining.jpg",
  "/social-proof-bg.jpg",
  "/spice-market.jpg",
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

export function ImagePrefetcher() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SITE_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
