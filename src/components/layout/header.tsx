"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizTrigger } from "@/components/quiz/quiz-trigger";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const TRACKS = [
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Build" },
  { href: "/contact", label: "Scale" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tracksOpen, setTracksOpen] = useState(false);
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tracksRef.current && !tracksRef.current.contains(e.target as Node)) {
        setTracksOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/elohi-logo.png"
              alt="Elohi Strategic Advisors"
              width={300}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <QuizTrigger size="sm" />
            <div className="relative" ref={tracksRef}>
              <Button
                size="sm"
                variant="outline"
                className="border-[#FFFAF5]/30 text-[#FFFAF5] hover:bg-[#FFFAF5] hover:text-[#6929CD] transition-colors"
                onClick={() => setTracksOpen(!tracksOpen)}
              >
                Tracks <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${tracksOpen ? "rotate-180" : ""}`} />
              </Button>
              {tracksOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-background/95 backdrop-blur-lg shadow-lg overflow-hidden">
                  {TRACKS.map((track) => (
                    <Link
                      key={track.label}
                      href={track.href}
                      className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      onClick={() => setTracksOpen(false)}
                    >
                      {track.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-3 space-y-2">
              <QuizTrigger className="w-full" />
              <div className="pt-2 border-t border-border">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tracks</p>
                {TRACKS.map((track) => (
                  <Link
                    key={track.label}
                    href={track.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {track.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
