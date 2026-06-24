"use client";

import { content } from "@/content";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

/**
 * Schedule / Order of the Day (Feature 08). A single-flow vertical timeline:
 * the coral thread becomes the spine (drawing in on scroll), a gold node per
 * event, times right-aligned in a left gutter. Events + tail reveal via the
 * shared Reveal; the spine draw is the one bespoke piece (scaleY via useReveal).
 * Rendered from content.schedule. Reduced-motion safe.
 */

const { schedule } = content;

// "1:00 PM" → { main: "1:00", suffix: "PM", numeric: true }; "Evening" → non-numeric.
function parseTime(t: string) {
  const sp = t.indexOf(" ");
  const main = sp === -1 ? t : t.slice(0, sp);
  const suffix = sp === -1 ? "" : t.slice(sp + 1);
  return { main, suffix, numeric: /\d/.test(main) };
}

function EventRow({ time, title, note }: { time: string; title: string; note: string }) {
  const t = parseTime(time);
  return (
    <Reveal className="relative pl-[calc(var(--spine-x)+var(--gap))]">
      {/* gold node on the spine */}
      <span
        aria-hidden="true"
        className="absolute left-[var(--spine-x)] top-1 size-[var(--node)] -translate-x-1/2 rounded-full shadow-[0_1px_2px_rgba(62,44,34,0.35),inset_0_1px_1px_rgba(255,255,255,0.45)]"
        style={{ background: "radial-gradient(circle at 34% 30%, #F3E2A8, #C29B45 55%, #8A6526)" }}
      >
        <span className="absolute -inset-[5px] rounded-full border border-[rgba(194,155,69,0.4)]" />
      </span>

      {/* time in the left gutter, right-aligned */}
      <div className="absolute left-0 top-px w-[calc(var(--spine-x)-22px)] text-right text-coral">
        {t.numeric ? (
          <>
            <span className="font-display text-[clamp(19px,4.4vw,24px)] font-medium leading-[1.05] tracking-[-0.01em] tabular-nums">
              {t.main}
            </span>
            {t.suffix ? (
              <span className="mt-[5px] block font-body text-[0.42em] font-semibold uppercase tracking-[0.18em] text-coffee-soft">
                {t.suffix}
              </span>
            ) : null}
          </>
        ) : (
          <span className="block text-[clamp(13px,2.8vw,15px)] font-semibold uppercase tracking-[0.12em]">
            {t.main}
          </span>
        )}
      </div>

      <h3 className="m-0 mb-[7px] font-display text-[clamp(19px,3.8vw,23px)] font-medium leading-[1.12] tracking-[-0.005em] text-coffee">
        {title}
      </h3>
      <p className="m-0 max-w-[34ch] text-[clamp(14px,3vw,15.5px)] leading-[1.6] text-coffee-soft text-pretty">
        {note}
      </p>
    </Reveal>
  );
}

export function Schedule() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section
      id="schedule"
      className="relative overflow-hidden pb-[clamp(80px,13vw,150px)]"
    >
      <PaperTexture grain className="z-0" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 46% at 50% 0%, rgba(248,222,207,.42), transparent 52%)",
        }}
      />

      <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

      <div className="relative z-[2] mx-auto w-full max-w-[680px] px-[22px]">
        <Reveal>
          <SectionHeading eyebrow={schedule.eyebrow} title={schedule.heading} lede={schedule.subline} />
        </Reveal>

        <div
          ref={ref}
          className="relative mx-auto mt-[clamp(34px,6vw,50px)] max-w-[540px] [--gap:34px] [--node:14px] [--spine-x:96px] max-[540px]:[--gap:26px] max-[540px]:[--spine-x:78px]"
        >
          {/* wash anchoring the timeline */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 bottom-[-6px] right-[-70px] left-[calc(var(--spine-x)-190px)] z-0 blur-[7px]"
            style={{
              background:
                "radial-gradient(72% 56% at calc(var(--spine-x) + 70px) 40%, rgba(242,192,172,.22), transparent 74%)," +
                "radial-gradient(56% 38% at calc(var(--spine-x) + 10px) 88%, rgba(194,155,69,.11), transparent 78%)",
            }}
          />

          <div className="relative z-[1]">
            {/* the coral spine, draws in on reveal */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[var(--spine-x)] top-[10px] bottom-[26px] z-[1] w-[1.5px] origin-top -translate-x-1/2",
                "transition-transform duration-[1500ms] ease-[var(--ease-out)]",
                "motion-reduce:!scale-y-100 motion-reduce:transition-none",
                revealed ? "scale-y-100" : "scale-y-0",
              )}
              style={{
                background:
                  "linear-gradient(rgba(224,120,86,.35) 0, var(--color-coral) 8%, var(--color-coral) 78%, rgba(224,120,86,.4))",
              }}
            />

            {/* gold botanical crowning the spine */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-[var(--spine-x)] top-[-30px] z-[2] -translate-x-1/2 text-gold transition-opacity duration-700 motion-reduce:!opacity-100",
                revealed ? "opacity-100" : "opacity-0",
              )}
            >
              <svg viewBox="0 0 30 38" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" className="block h-[38px] w-[30px]">
                <path d="M15 38 V12" />
                <path d="M15 24 C8 23 5 18 6 13 C12 14 15 19 15 24 Z" fill="rgba(194,155,69,0.14)" />
                <path d="M15 24 C22 23 25 18 24 13 C18 14 15 19 15 24 Z" fill="rgba(194,155,69,0.14)" />
                <path d="M15 16 C11 15 9 11 10 7 C14 8 15 12 15 16 Z" fill="rgba(194,155,69,0.18)" />
                <path d="M15 16 C19 15 21 11 20 7 C16 8 15 12 15 16 Z" fill="rgba(194,155,69,0.18)" />
                <circle cx="15" cy="6" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </span>

            <div className="relative z-[2] flex flex-col gap-[clamp(30px,5.2vw,48px)] pt-1">
              {schedule.events.map((e) => (
                <EventRow key={e.title} time={e.time} title={e.title} note={e.note} />
              ))}
            </div>

            {/* closing flourish */}
            <Reveal className="relative mt-[clamp(28px,5vw,40px)] flex min-h-[20px] items-center pl-[calc(var(--spine-x)+var(--gap))]">
              <span
                aria-hidden="true"
                className="absolute left-[var(--spine-x)] top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_1px_1px_rgba(62,44,34,0.3)]"
              >
                <span className="absolute inset-[2px] rounded-full bg-gold-soft opacity-60" />
              </span>
              <span className="font-display text-[clamp(16px,3.6vw,20px)] font-medium italic text-coffee-soft">
                {schedule.closing}
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
