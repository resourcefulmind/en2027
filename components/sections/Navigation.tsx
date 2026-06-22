"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { Monogram } from "@/components/woven/Monogram";
import { cn } from "@/lib/utils";

/**
 * Fixed site navigation (Feature 03). Transparent over the hero; frosts on
 * scroll. Faithful port of design/Navigation.html: one rAF-throttled scroll
 * handler drives both the frost toggle and active-section tracking, anchor
 * links scroll via window.scrollTo with a nav-height offset, and a right-slide
 * sheet handles mobile. Section ids below are the contract Features 04–12 must
 * adopt on their <section> wrappers.
 */

// Nav labels come from content.ts; the target id for each is owned here.
const SECTION_IDS = ["story", "schedule", "details", "gallery"] as const;
const LINKS = content.nav.links.map((label, i) => ({
  label,
  id: SECTION_IDS[i],
}));
const RSVP_ID = "rsvp";
const HERO_ID = "hero";

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Smooth scroll to a section, offsetting for the live nav height. Honours
  // reduced-motion (read at call time so it tracks OS changes).
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navH = navRef.current?.offsetHeight ?? 0;
    const y = el.getBoundingClientRect().top + window.scrollY - (navH - 2);
    window.scrollTo({
      top: id === HERO_ID ? 0 : y,
      behavior: reduce ? "auto" : "smooth",
    });
  }, []);

  // Single rAF-throttled handler: frost past the hero, and active = the last
  // tracked section whose top has crossed 35% of the viewport (cleared in hero).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const hero = document.getElementById(HERO_ID);
        const navH = navRef.current?.offsetHeight ?? 0;
        const y = window.scrollY || document.documentElement.scrollTop;
        const heroH = hero?.offsetHeight ?? window.innerHeight;

        setScrolled(y > heroH - navH - 40);

        const line = y + window.innerHeight * 0.35;
        let current: string | null = null;
        for (const id of SECTION_IDS) {
          const sec = document.getElementById(id);
          if (sec && sec.offsetTop <= line) current = id;
        }
        if (y < heroH * 0.5) current = null;
        setActiveId(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpen((open) => {
      if (open) lastFocus.current?.focus();
      return false;
    });
  }, []);

  const openSheet = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setSheetOpen(true);
  }, []);

  // Lock body scroll while the sheet is open; move focus to the close button.
  useEffect(() => {
    if (!sheetOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen, closeSheet]);

  // A nav/sheet link: scroll to its section, then close the sheet.
  const go = (id: string) => () => {
    scrollToId(id);
    closeSheet();
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-[60] flex items-center justify-between",
          "px-[clamp(18px,4vw,40px)] border-b",
          "transition-[height,background-color,border-color,box-shadow] duration-[400ms] ease-[var(--ease-soft)]",
          scrolled
            ? "h-[62px] border-[rgba(194,155,69,0.35)] bg-[rgba(250,244,234,0.72)] backdrop-blur-[12px] backdrop-saturate-[1.4] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_24px_rgba(62,44,34,0.05)]"
            : "h-[76px] border-transparent bg-transparent",
        )}
      >
        <button
          type="button"
          onClick={go(HERO_ID)}
          aria-label={`${content.couple.namesDisplay} — back to top`}
          className="-m-1.5 inline-flex cursor-pointer items-center rounded-full p-1.5 leading-[0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus-ring)]"
        >
          <Monogram size={44} crest />
        </button>

        <div className="hidden items-center gap-[clamp(18px,2.6vw,34px)] min-[721px]:flex">
          {LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={go(link.id)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative cursor-pointer whitespace-nowrap px-0.5 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.16em]",
                  "transition-[color,opacity] duration-[250ms] ease-[var(--ease-soft)]",
                  "after:absolute after:bottom-[-2px] after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-coral after:transition-[width] after:duration-300 after:ease-[var(--ease-out)]",
                  "hover:text-coral hover:opacity-100 hover:after:w-full",
                  "focus-visible:text-coral focus-visible:opacity-100 focus-visible:outline-none focus-visible:after:w-full",
                  active
                    ? "text-coral opacity-100 after:w-full"
                    : "text-coffee opacity-[0.82] after:w-0",
                )}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={go(RSVP_ID)}
            className={cn(
              "cursor-pointer rounded-pill bg-coral font-body text-[11.5px] font-bold uppercase tracking-[0.16em] text-white",
              "px-6 py-[11px] max-[720px]:px-[18px] max-[720px]:py-[10px]",
              "shadow-[0_1px_2px_rgba(199,95,63,0.25),0_10px_22px_rgba(199,95,63,0.2)]",
              "transition-[background-color,transform] duration-150 ease-[var(--ease-soft)]",
              "hover:bg-coral-deep active:scale-[0.97] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--color-focus-ring)]",
            )}
          >
            {content.nav.cta}
          </button>

          <button
            type="button"
            onClick={openSheet}
            aria-label="Open menu"
            aria-expanded={sheetOpen}
            aria-controls="nav-sheet"
            className="inline-flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg text-coffee min-[721px]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus-ring)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="h-[22px] w-[22px]"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Scrim */}
      <div
        onClick={closeSheet}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[55] bg-[rgba(36,24,18,0.34)] backdrop-blur-[2px] transition-opacity duration-[350ms] ease-[var(--ease-soft)]",
          sheetOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile sheet */}
      <aside
        id="nav-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed right-0 top-0 z-[58] flex h-full w-[min(82vw,320px)] flex-col border-l border-gold",
          "bg-ivory px-[26px] pb-[calc(26px+env(safe-area-inset-bottom))] pt-[22px]",
          "shadow-[-24px_0_60px_rgba(62,44,34,0.18)] transition-transform duration-[420ms] ease-[var(--ease-out)]",
          sheetOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(62,44,34,.014) 0 1px, transparent 1px 6px), repeating-linear-gradient(-45deg, rgba(62,44,34,.011) 0 1px, transparent 1px 6px)",
        }}
      >
        <div className="flex items-center justify-between border-b border-[rgba(194,155,69,0.4)] pb-[18px]">
          <span className="font-display text-[19px] font-medium italic text-coffee">
            {content.couple.namesDisplay}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeSheet}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-coffee-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus-ring)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col pt-2">
          {LINKS.map((link, i) => {
            const active = activeId === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={go(link.id)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex cursor-pointer items-center justify-between border-b border-line-subtle px-1 py-[19px] text-left",
                  "font-body text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
                  "hover:text-coral focus-visible:text-coral focus-visible:outline-none",
                  active ? "text-coral" : "text-coffee",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "font-display text-[13px] normal-case italic tracking-normal",
                    active ? "text-coral" : "text-gold opacity-80",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={go(RSVP_ID)}
          className="mt-[26px] cursor-pointer rounded-pill bg-coral p-4 text-center font-body text-[12.5px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_22px_rgba(199,95,63,0.22)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--color-focus-ring)]"
        >
          {content.nav.cta}
        </button>

        <div className="mt-auto pt-6 text-center font-body text-[10.5px] uppercase tracking-[0.22em] text-coffee-soft opacity-70">
          {content.footer.dateLine}
        </div>
      </aside>
    </>
  );
}
