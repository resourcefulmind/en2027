"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * The shared modal a11y plumbing (feature 14): while `open`, lock body scroll,
 * focus an initial element, close on Escape, and restore focus to whatever was
 * focused before on close. Deliberately small — scrims, slide/entrance
 * animations, and arrow-key navigation stay in each modal's own component.
 */
export function useDialog(
  open: boolean,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  // Latest onClose via a ref so the Escape handler never goes stale and the
  // open effect doesn't re-run (which would yank focus) when onClose changes.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    initialFocus?.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      lastFocus?.focus();
    };
  }, [open, initialFocus]);
}
