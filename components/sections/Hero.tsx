"use client";

import { content } from "@/content";
import { Button } from "@/components/woven/Button";
import { Monogram } from "@/components/woven/Monogram";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Countdown } from "@/components/sections/Countdown";
import { scrollToSection } from "@/lib/scroll";

/**
 * Hero (Feature 04) — the invitation. A full-viewport ivory-deep stage with a
 * golden-hour wash and paper grain, holding the bordered invitation card: EN
 * crest (monogram over a hero-local guilloché medallion + woven backing),
 * eyebrow, names, gold rule, dateline, live Countdown, and the two CTAs. The
 * coral thread descends below the card to begin the site-wide thread.
 *
 * Renders its own <section id="hero"> — the anchor the fixed nav frosts/tracks
 * against. Entrance is staggered on-load CSS (globals.css), reduced-motion safe.
 */

// Guilloché medallion geometry — concentric circles + fine radiating lines,
// computed once (deterministic). Watermark behind the monogram.
const SPOKES = Array.from({ length: 48 }, (_, i) => {
  const rad = (i * 7.5 * Math.PI) / 180;
  return {
    x1: +(100 + Math.cos(rad) * 52).toFixed(1),
    y1: +(100 + Math.sin(rad) * 52).toFixed(1),
    x2: +(100 + Math.cos(rad) * 94).toFixed(1),
    y2: +(100 + Math.sin(rad) * 94).toFixed(1),
  };
});
const RINGS = [50, 64, 80, 94];

const FADE_MASK = "radial-gradient(circle, #000 50%, transparent 74%)";
const WEAVE_MASK = "radial-gradient(circle, #000 30%, transparent 66%)";

function HeroCrest() {
  return (
    <div
      className="hero-anim-mono relative grid place-items-center"
      style={{ animationDelay: "0.15s" }}
    >
      {/* guilloché watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(150px,40vw,210px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.34]"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      >
        <svg
          viewBox="0 0 200 200"
          className="block size-full"
          stroke="var(--color-gold)"
          strokeWidth="0.6"
          fill="none"
          aria-hidden="true"
        >
          {SPOKES.map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
          ))}
          {RINGS.map((r) => (
            <circle key={r} cx="100" cy="100" r={r} />
          ))}
        </svg>
      </span>

      {/* woven backing disc */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(194,155,69,.16) 0 1.5px, transparent 1.5px 7px), repeating-linear-gradient(-45deg, rgba(194,155,69,.12) 0 1.5px, transparent 1.5px 7px)",
          maskImage: WEAVE_MASK,
          WebkitMaskImage: WEAVE_MASK,
        }}
      />

      {/* the monogram, lifted above the watermark */}
      <span
        className="relative z-[1] block"
        style={{
          filter:
            "drop-shadow(0 1px 0 rgba(255,255,255,.6)) drop-shadow(0 2px 3px rgba(62,44,34,.22))",
        }}
      >
        <Monogram crest size={84} className="block h-auto w-[clamp(64px,16vw,84px)]" />
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-ivory-deep"
    >
      {/* paper grain (weave + noise) — reused primitive */}
      <PaperTexture grain className="z-0" />
      {/* golden-hour wash from above */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 75% at 50% 14%, rgba(248,222,207,.55), transparent 58%)",
        }}
      />

      {/* stage — top padding clears the fixed nav with breathing room; the
          section grows past 100svh on short screens rather than crowding it */}
      <div className="relative z-[4] flex w-full flex-1 flex-col items-center justify-center px-5 pt-2 max-[720px]:pb-[clamp(32px,6vh,64px)] max-[720px]:pt-[clamp(82px,11.8vh,110px)]">
        {/* invitation card */}
        <div
          className="relative flex w-full max-w-[560px] flex-col items-center gap-[clamp(18px,3.2vw,26px)] rounded-[3px] border border-gold bg-ivory px-[clamp(26px,6vw,64px)] pb-[clamp(38px,7vw,60px)] pt-[clamp(34px,7vw,60px)] text-center shadow-[0_2px_5px_rgba(62,44,34,0.05),0_30px_70px_rgba(62,44,34,0.13)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(62,44,34,.012) 0 1px, transparent 1px 6px), repeating-linear-gradient(-45deg, rgba(62,44,34,.009) 0 1px, transparent 1px 6px)",
          }}
        >
          {/* inner gold hairline */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[6px] rounded-[2px] border border-[rgba(194,155,69,0.45)]"
          />

          <HeroCrest />

          <span
            className="hero-anim mt-[clamp(30px,6vw,52px)] text-[clamp(10px,2.4vw,12.5px)] font-semibold uppercase tracking-[0.28em] text-coffee-soft"
            style={{ animationDelay: "0.28s" }}
          >
            {content.hero.eyebrow}
          </span>

          <h1 className="m-0 flex flex-col items-center font-display font-medium leading-[0.96] tracking-[-0.022em] text-coffee">
            <span
              className="hero-anim text-[clamp(3.7rem,15.5vw,6.8rem)]"
              style={{ animationDelay: "0.36s" }}
            >
              {content.couple.bride}
            </span>
            <span
              className="hero-anim mt-2.5 max-w-[32ch] font-display text-[clamp(10.5px,2.4vw,13px)] font-normal italic leading-[1.5] tracking-normal text-gold"
              style={{ animationDelay: "0.44s" }}
            >
              {content.couple.brideFamily}
            </span>
            <span
              className="hero-anim my-1 text-[clamp(1.85rem,7.75vw,3.4rem)] font-normal italic text-coral"
              style={{ animationDelay: "0.52s" }}
            >
              &amp;
            </span>
            <span
              className="hero-anim text-[clamp(3.7rem,15.5vw,6.8rem)]"
              style={{ animationDelay: "0.6s" }}
            >
              {content.couple.groom}
            </span>
            <span
              className="hero-anim mt-2.5 max-w-[32ch] font-display text-[clamp(10.5px,2.4vw,13px)] font-normal italic leading-[1.5] tracking-normal text-gold"
              style={{ animationDelay: "0.68s" }}
            >
              {content.couple.groomFamily}
            </span>
          </h1>

          <span
            aria-hidden="true"
            className="hero-anim h-px w-[clamp(56px,16vw,84px)] bg-gold opacity-85"
            style={{ animationDelay: "0.76s" }}
          />

          <span
            className="hero-anim max-w-[34ch] font-display text-[clamp(13.5px,3vw,17px)] italic leading-[1.5] text-coffee-soft"
            style={{ animationDelay: "0.84s" }}
          >
            {content.hero.invite}
          </span>

          <span
            className="hero-anim text-[clamp(10.5px,2.6vw,12.5px)] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-coffee"
            style={{ animationDelay: "0.92s" }}
          >
            {content.event.dateLine}
            <span className="mt-[7px] block font-medium tracking-[0.16em] text-coffee-soft">
              {content.event.venueArea}
            </span>
          </span>

          <div className="hero-anim" style={{ animationDelay: "1s" }}>
            <Countdown />
          </div>

          <div
            className="hero-anim flex flex-wrap items-center justify-center gap-[clamp(14px,4vw,22px)]"
            style={{ animationDelay: "1.08s" }}
          >
            <Button variant="primary" onClick={() => scrollToSection("rsvp")}>
              {content.hero.ctaPrimary}
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("story")}>
              {content.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* the coral thread begins here */}
        <div className="relative z-[4] flex flex-col items-center" aria-hidden="true">
          <span
            className="hero-grow relative w-[1.5px] bg-coral"
            style={{ height: "clamp(56px,11vh,92px)", animationDelay: "1.16s" }}
          >
            <span className="absolute left-1/2 top-[40%] size-[5px] -translate-x-1/2 rounded-full bg-gold" />
          </span>
          <span className="relative size-2 rounded-full bg-gold shadow-[0_1px_1px_rgba(62,44,34,0.3)]">
            <span className="absolute inset-[2px] rounded-full bg-gold-soft opacity-60" />
          </span>
          <span
            className="hero-grow w-[1.5px]"
            style={{
              height: "clamp(20px,5vh,40px)",
              background: "linear-gradient(var(--color-coral), transparent)",
              animationDelay: "1.26s",
            }}
          />
        </div>
      </div>
    </section>
  );
}
