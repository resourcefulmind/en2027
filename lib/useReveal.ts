"use client";

import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  /** Fraction of the element visible before it reveals. */
  threshold?: number;
  /** Observer root margin — design pulls the trigger up 8% from the bottom. */
  rootMargin?: string;
  /** Reveal once then stop observing (default true). */
  once?: boolean;
};

type RevealResult<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  revealed: boolean;
};

/**
 * Scroll-reveal trigger, ported from the design references.
 * Returns a ref to attach and a `revealed` flag to drive the entrance.
 *
 * Invariant (see code-standards.md): motion is gated on prefers-reduced-motion,
 * and a setTimeout safety forces `revealed` true so content is NEVER left hidden
 * if IntersectionObserver never fires (e.g. in screenshot capture).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
): RevealResult<T> {
  const { threshold = 0.18, rootMargin = "0px 0px -8% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      // Reveal immediately, but defer off the effect body (no cascading render).
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);

    // Safety: never strand content hidden if the observer never fires.
    const safety = window.setTimeout(() => setRevealed(true), 1400);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}
