import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elohi — Foodservice Growth, Engineered",
    template: "%s | Elohi",
  },
  description:
    "Elohi helps food manufacturers sell to restaurants with pricing, freight economics, pipeline, and go-to-market strategy.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://elohi.us"
  ),
  openGraph: {
    title: "Elohi — Foodservice Growth, Engineered",
    description:
      "For manufacturers ready to win restaurant distribution — pricing, freight economics, pipeline, and go-to-market.",
    url: "https://elohi.us",
    siteName: "Elohi",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elohi — Foodservice Growth, Engineered",
    description:
      "For manufacturers ready to win restaurant distribution.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
