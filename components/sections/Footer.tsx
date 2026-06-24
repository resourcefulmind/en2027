"use client";

import { content } from "@/content";
import { Monogram } from "@/components/woven/Monogram";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { RoseSprig } from "@/components/woven/RoseSprig";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

/**
 * Footer (Feature 12): the closing movement. The coral thread arrives from the
 * section above and resolves into a gold knot (drawn via useReveal), then the EN
 * crest, names, date, the groom's formal honour, a rose flourish, the closing
 * line, and the hashtag, over a dusk wash deepening at the very bottom. Content
 * reveals via Reveal; reduced-motion shows everything.
 */

const { footer, couple } = content;

export function Footer() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <footer className="relative overflow-hidden px-[22px] pb-[clamp(64px,11vw,110px)] text-center">
      <PaperTexture grain className="z-0" />
      {/* dusk: golden-hour wash deepening toward the base */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[60%]"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 130%, rgba(224,120,86,.16), transparent 60%)," +
            "radial-gradient(90% 90% at 50% 140%, rgba(194,155,69,.16), transparent 62%)," +
            "linear-gradient(transparent, rgba(248,222,207,.35))",
        }}
      />

      <div className="relative z-[2] mx-auto flex max-w-[600px] flex-col items-center">
        {/* thread resolving into the final gold knot */}
        <div
          ref={ref}
          aria-hidden="true"
          className="flex flex-col items-center pt-[clamp(48px,10vw,90px)]"
        >
          <span
            className={cn(
              "w-[1.5px] origin-top transition-transform duration-[900ms] ease-[var(--ease-out)] motion-reduce:!scale-y-100 motion-reduce:transition-none",
              revealed ? "scale-y-100" : "scale-y-0",
            )}
            style={{
              height: "clamp(56px,11vw,92px)",
              background: "linear-gradient(transparent, var(--color-coral))",
            }}
          />
          <span
            className={cn(
              "relative -mt-px size-[18px] transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out)] motion-reduce:!scale-100 motion-reduce:!opacity-100 motion-reduce:transition-none",
              revealed ? "scale-100 opacity-100" : "scale-[0.4] opacity-0",
            )}
            style={{ transitionDelay: "0.3s" }}
          >
            <span
              className="absolute inset-0 rounded-full shadow-[0_1px_2px_rgba(62,44,34,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)]"
              style={{ background: "radial-gradient(circle at 34% 30%, #F3E2A8, #C29B45 55%, #8A6526)" }}
            />
            <span className="absolute -inset-[7px] rounded-full border border-[rgba(194,155,69,0.5)]" />
            <span className="absolute -inset-[13px] rounded-full border border-[rgba(194,155,69,0.25)]" />
          </span>
        </div>

        <Reveal className="mt-[clamp(40px,7vw,66px)] leading-[0]">
          <Monogram crest size={92} />
        </Reveal>

        <Reveal delayMs={80}>
          <h2 className="mt-[clamp(22px,4vw,32px)] font-display text-[clamp(2.4rem,9vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-coffee">
            {couple.bride} <span className="font-normal italic text-coral">&amp;</span> {couple.groom}
          </h2>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-[clamp(16px,3vw,22px)] text-[clamp(11px,2.6vw,13px)] font-semibold uppercase tracking-[0.28em] text-coffee-soft">
            {footer.dateLine}
          </p>
        </Reveal>

        <Reveal delayMs={220}>
          <p className="mt-[clamp(8px,1.8vw,12px)] font-display text-[clamp(12.5px,2.9vw,14.5px)] italic text-coffee-soft">
            {footer.formalHonour}
          </p>
        </Reveal>

        <Reveal
          delayMs={300}
          className="my-[clamp(30px,5.5vw,46px)] flex w-[min(240px,70%)] items-center justify-center gap-3.5 text-gold"
        >
          <span aria-hidden="true" className="h-px flex-1 bg-current opacity-55" />
          <RoseSprig variant="sprig" className="w-[clamp(26px,6vw,34px)]" />
          <span aria-hidden="true" className="h-px flex-1 bg-current opacity-55" />
        </Reveal>

        <Reveal delayMs={360}>
          <p className="m-0 max-w-[18ch] font-display text-[clamp(1.4rem,5vw,2.05rem)] font-medium italic leading-[1.32] tracking-[-0.01em] text-balance text-coffee">
            {footer.closingLine}
          </p>
        </Reveal>

        <Reveal delayMs={440}>
          <p className="mt-[clamp(28px,5vw,42px)] inline-flex items-center gap-2.5 text-[clamp(11px,2.6vw,12.5px)] font-bold uppercase tracking-[0.2em] text-coral">
            <span aria-hidden="true" className="size-1 rotate-45 border border-gold" />
            {couple.hashtag}
            <span aria-hidden="true" className="size-1 rotate-45 border border-gold" />
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
