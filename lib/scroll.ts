/**
 * The site's single anchor-scroll behavior. Shared by the nav and the hero CTAs
 * so every in-page jump lands the same way: offset by the live (frost-aware)
 * height of the fixed nav, special-cased so "hero" returns to the very top, and
 * instant under reduced-motion. No-ops gracefully when the target isn't on the
 * page yet (sections are composed feature by feature).
 */

const HERO_ID = "hero";

export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;

  if (id === HERO_ID) {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return; // target not built yet, do nothing rather than jump wrong

  const navH = document.querySelector<HTMLElement>("[data-site-nav]")?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - (navH - 2);
  window.scrollTo({ top, behavior: scrollBehavior() });
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
