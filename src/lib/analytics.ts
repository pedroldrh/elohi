export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  console.log(`[Analytics] ${event}`, properties ?? "");

  // Extensible: add GTM, Mixpanel, Plausible, etc.
  // if (window.gtag) window.gtag('event', event, properties);
}
