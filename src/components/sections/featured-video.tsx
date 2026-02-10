import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function FeaturedVideo() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFAF5]">
          From Our Fireside Chats
        </h2>
        <p className="mt-4 text-[#E0C5AC] font-bilo">
          Free foodservice education — straight from the experts.
        </p>

        <div className="mt-10 aspect-video w-full rounded-2xl overflow-hidden border border-border">
          <iframe
            src="https://www.youtube.com/embed/pMpzkpoR4o8"
            title="Fireside Chat: Non-Commercial Foodservice (with Jane Foreman)"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">
          Fireside Chat: Non-Commercial Foodservice (with Jane Foreman)
        </p>

        <div className="mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/learn">
              Watch More Videos <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
