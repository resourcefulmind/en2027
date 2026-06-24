"use client";

import { content } from "@/content";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { PhotoFrame } from "@/components/woven/PhotoFrame";
import { Reveal } from "@/components/woven/Reveal";
import { RoseSprig } from "@/components/woven/RoseSprig";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { cn } from "@/lib/utils";

/**
 * Our Story (Feature 06). Two alternating beats (text + framed photo
 * placeholder) around a pull-quote interlude, opened by the continuing coral
 * thread. Paper grain, a layered golden-hour wash, and slow-drifting petals set
 * the mood. Text fades in on scroll (Reveal); the rose line-art draws itself in
 * (RoseSprig); everything is reduced-motion safe.
 */

// Layered warm light falling across the section (richer than the hero's wash).
const WASH =
  "radial-gradient(60% 40% at 82% 8%, rgba(224,120,86,.10), transparent 62%)," +
  "radial-gradient(70% 55% at 18% 26%, rgba(242,192,172,.22), transparent 58%)," +
  "radial-gradient(120% 65% at 50% 2%, rgba(248,222,207,.42), transparent 60%)," +
  "radial-gradient(80% 50% at 70% 96%, rgba(194,155,69,.10), transparent 60%)";

// Deterministic petal layout (no Math.random → identical on server and client).
const PETALS = [
  { left: 8, top: 12, scale: 0.8, dur: 22, delay: -3 },
  { left: 24, top: 46, scale: 1.1, dur: 26, delay: -12 },
  { left: 41, top: 8, scale: 0.7, dur: 19, delay: -7 },
  { left: 58, top: 60, scale: 1.0, dur: 24, delay: -15 },
  { left: 72, top: 22, scale: 0.85, dur: 21, delay: -5 },
  { left: 86, top: 52, scale: 1.2, dur: 28, delay: -18 },
  { left: 50, top: 34, scale: 0.75, dur: 17, delay: -9 },
];

const PETAL_BG =
  "radial-gradient(circle at 35% 30%, rgba(242,192,172,.5), rgba(224,120,86,.16))";

// The Beat's framed photo: shared PhotoFrame + two rose-sprig corners.
function BeatPhoto({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <RoseSprig
        variant="sprig"
        className="absolute -left-3.5 -top-3.5 z-[3] w-[clamp(64px,13vw,92px)]"
      />
      <RoseSprig
        variant="sprig"
        className="absolute -bottom-3.5 -right-3.5 z-[3] w-[clamp(64px,13vw,92px)] rotate-180"
      />
      <PhotoFrame
        monoSize={58}
        label="Couple's Photograph"
        className="aspect-[4/5] gap-3.5 shadow-[0_2px_5px_rgba(62,44,34,0.05),0_26px_56px_rgba(62,44,34,0.12)]"
      />
    </div>
  );
}

type BeatData = { label: string; heading: string; body: readonly string[] };

function Beat({ beat, flip }: { beat: BeatData; flip?: boolean }) {
  return (
    <Reveal className="mt-[clamp(48px,8vw,88px)] grid grid-cols-1 items-center gap-[clamp(26px,4vw,56px)] min-[760px]:grid-cols-2">
      <div className={cn(flip && "min-[760px]:order-2")}>
        <span className="mb-[clamp(14px,2vw,20px)] inline-flex items-center gap-3 text-[clamp(10.5px,2.2vw,12px)] font-bold uppercase tracking-[0.22em] text-gold">
          <span aria-hidden="true" className="h-px w-[26px] bg-gold opacity-80" />
          {beat.label}
        </span>
        <h3 className="m-0 mb-[clamp(14px,2vw,20px)] font-display text-[clamp(1.7rem,5vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.015em] text-coffee">
          {beat.heading}
        </h3>
        {beat.body.map((para, i) => (
          <p
            key={i}
            className={cn(
              "max-w-[46ch] text-[clamp(15px,3.3vw,17px)] leading-[1.72] text-coffee text-pretty",
              i > 0 && "mt-3.5",
            )}
          >
            {para}
          </p>
        ))}
      </div>
      <BeatPhoto className={cn(flip && "min-[760px]:order-1")} />
    </Reveal>
  );
}

export function OurStory() {
  const { beats } = content.ourStory;
  return (
    <section
      id="story"
      className="relative overflow-hidden pb-[clamp(72px,12vw,130px)]"
    >
      <PaperTexture grain className="z-0" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: WASH }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{ left: `${p.left}%`, top: `${p.top}%`, transform: `scale(${p.scale})` }}
          >
            <span
              className="petal-drift block h-[22px] w-4 opacity-0"
              style={{
                borderRadius: "80% 0 80% 0",
                background: PETAL_BG,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          </span>
        ))}
      </div>

      {/* coral thread continuing from the hero */}
      <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

      <div className="relative z-[2] mx-auto w-full max-w-[1000px] px-6">
        <Reveal className="mt-[clamp(22px,4vw,36px)]">
          <SectionHeading
            eyebrow={content.ourStory.eyebrow}
            title={content.ourStory.heading}
            lede={content.ourStory.lede}
          />
        </Reveal>

        <Beat beat={beats.howWeMet} />

        {/* interlude: pull-quote with a blooming thread */}
        <div className="mx-auto mb-[clamp(8px,2vw,16px)] mt-[clamp(56px,9vw,100px)] flex max-w-[620px] flex-col items-center text-center">
          <div className="flex flex-col items-center" aria-hidden="true">
            <span
              className="w-[1.5px]"
              style={{
                height: "clamp(40px,7vw,64px)",
                background: "linear-gradient(transparent, var(--color-coral))",
              }}
            />
            <RoseSprig variant="bloom" className="mt-[-2px] w-[clamp(46px,9vw,64px)]" />
          </div>
          <Reveal>
            <p className="mt-[clamp(20px,3.5vw,32px)] font-display text-[clamp(1.5rem,5.2vw,2.4rem)] font-medium italic leading-[1.28] tracking-[-0.01em] text-balance text-coffee">
              <span className="not-italic text-coral">&ldquo;</span>
              {content.ourStory.pullQuote}
              <span className="not-italic text-coral">&rdquo;</span>
            </p>
          </Reveal>
        </div>

        <Beat beat={beats.proposal} flip />
      </div>
    </section>
  );
}
