"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizTriggerProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "secondary" | "outline";
  children?: React.ReactNode;
}

export function QuizTrigger({
  className,
  size = "default",
  variant = "default",
  children,
}: QuizTriggerProps) {
  const router = useRouter();

  const openQuiz = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("quiz", "1");
    router.push(`${url.pathname}${url.search}`, { scroll: false });
  };

  return (
    <Button
      onClick={openQuiz}
      size={size}
      variant={variant}
      className={cn(
        "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25",
        className
      )}
    >
      {children || "Take the Quiz"}
    </Button>
  );
}
