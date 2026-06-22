"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered fade-and-rise wrapper. useReveal flips `revealed` when the
 * element enters view (and immediately under reduced-motion); the motion-reduce
 * variants also pin the resting state visible so content is never stranded
 * hidden. Optional `delayMs` staggers siblings.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  style?: CSSProperties;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: delayMs ? `${delayMs}ms` : undefined, ...style }}
      className={cn(
        "transition-[opacity,transform] duration-[800ms] ease-out",
        "motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none",
        revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
