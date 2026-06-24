"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { PhotoFrame } from "@/components/woven/PhotoFrame";
import { Reveal } from "@/components/woven/Reveal";
import { RoseSprig } from "@/components/woven/RoseSprig";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { cn } from "@/lib/utils";

/**
 * Gallery (Feature 09). An editorial layout of placeholder frames: one wide
 * feature tile + a CSS-columns masonry, each a button opening a lightbox
 * (prev/next/close, keyboard, scrim, focus handling, scroll lock). Tiles come
 * from content.gallery.tiles; real photos drop into the shared PhotoFrame at
 * feature 17. A "Photographs coming soon" note covers the empty state.
 */

const { gallery } = content;
const TILES = gallery.tiles;

function Tile({
  index,
  aspect,
  feature,
  onOpen,
}: {
  index: number;
  aspect: string;
  feature?: boolean;
  onOpen: (i: number) => void;
}) {
  const corner = feature ? "w-[clamp(56px,11vw,84px)]" : "w-[clamp(34px,8vw,46px)]";
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`View photograph (${index + 1} of ${TILES.length})`}
      className="group relative block w-full cursor-pointer p-0 focus-visible:outline-none"
    >
      <RoseSprig variant="sprig" className={cn("absolute -left-2.5 -top-2.5 z-[3]", corner)} />
      {feature ? (
        <RoseSprig
          variant="sprig"
          className={cn("absolute -bottom-2.5 -right-2.5 z-[3] rotate-180", corner)}
        />
      ) : null}
      <PhotoFrame
        monoSize={feature ? 64 : 46}
        label={feature ? "Couple's Photograph" : undefined}
        style={feature ? undefined : { aspectRatio: aspect }}
        className={cn(
          "transition-[box-shadow,transform] duration-[350ms] ease-[var(--ease-out)]",
          "group-hover:-translate-y-[3px] group-hover:shadow-[0_4px_8px_rgba(62,44,34,0.07),0_26px_54px_rgba(62,44,34,0.14)]",
          "group-focus-visible:shadow-[0_0_0_2px_var(--color-focus-ring),0_26px_54px_rgba(62,44,34,0.14)]",
          feature && "aspect-[3/2] min-[700px]:aspect-[21/9]",
        )}
      />
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-coffee-soft opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-80 group-focus-visible:translate-y-0 group-focus-visible:opacity-80">
        View
      </span>
    </button>
  );
}

export function Gallery() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [idx, setIdx] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function openLB(i: number) {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setIdx(i);
    setOpen(true);
  }
  const step = (d: number) => setIdx((i) => (i + d + TILES.length) % TILES.length);

  // Lock scroll, focus the close button, wire keyboard while open; restore on close.
  useEffect(() => {
    if (!open) {
      lastFocus.current?.focus();
      return;
    }
    const raf = requestAnimationFrame(() => setShown(true));
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setShown(false);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <section id="gallery" className="relative overflow-hidden pb-[clamp(80px,13vw,150px)]">
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

        <div className="relative z-[2] mx-auto w-full max-w-[1040px] px-[22px]">
          <Reveal>
            <SectionHeading eyebrow={gallery.eyebrow} title={gallery.heading} lede={gallery.subline} />
          </Reveal>
          <Reveal delayMs={120} className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-2.5 font-display text-[clamp(12px,2.6vw,13px)] italic text-coral">
              <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
              {gallery.emptyNote}
              <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
            </span>
          </Reveal>

          <div className="mt-[clamp(38px,6vw,58px)]">
            {/* feature tile */}
            <Reveal className="mb-[clamp(16px,2.4vw,22px)]">
              <Tile index={0} aspect={TILES[0].aspect} feature onOpen={openLB} />
            </Reveal>

            {/* masonry */}
            <div className="columns-2 [column-gap:clamp(14px,2vw,20px)] min-[841px]:columns-3 max-[460px]:[column-gap:12px]">
              {TILES.slice(1).map((tile, i) => (
                <Reveal
                  key={tile.caption}
                  className="mb-[clamp(14px,2vw,20px)] break-inside-avoid"
                >
                  <Tile index={i + 1} aspect={tile.aspect} onOpen={openLB} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* lightbox */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(18px,5vw,56px)]"
        >
          <button
            type="button"
            aria-label="Close viewer"
            onClick={() => setOpen(false)}
            className={cn(
              "absolute inset-0 bg-[rgba(36,24,18,0.62)] backdrop-blur-[3px] transition-opacity duration-[350ms] ease-[var(--ease-out)] motion-reduce:transition-none",
              shown ? "opacity-100" : "opacity-0",
            )}
          />

          {/* controls */}
          <LbButton className="right-[clamp(14px,4vw,26px)] top-[clamp(14px,4vw,26px)]" label="Close" onClick={() => setOpen(false)} ref={closeRef}>
            <path d="M6 6l12 12M18 6L6 18" />
          </LbButton>
          <LbButton
            className="left-[clamp(6px,2vw,18px)] top-1/2 max-[560px]:left-[calc(50%-34px)] max-[560px]:top-auto max-[560px]:bottom-3.5 -translate-y-1/2 max-[560px]:translate-y-0"
            label="Previous"
            onClick={() => step(-1)}
          >
            <path d="M15 5l-7 7 7 7" />
          </LbButton>
          <LbButton
            className="right-[clamp(6px,2vw,18px)] top-1/2 max-[560px]:right-[calc(50%-34px)] max-[560px]:top-auto max-[560px]:bottom-3.5 -translate-y-1/2 max-[560px]:translate-y-0"
            label="Next"
            onClick={() => step(1)}
          >
            <path d="M9 5l7 7-7 7" />
          </LbButton>

          <div
            className={cn(
              "relative z-[2] flex max-h-full max-w-[min(860px,92vw)] flex-col items-center gap-4 transition-[opacity,transform] duration-[400ms] ease-[var(--ease-out)] motion-reduce:transition-none",
              shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-2.5 scale-[0.98] opacity-0",
            )}
          >
            <div className="relative w-fit">
              <RoseSprig variant="sprig" className="absolute -left-2.5 -top-2.5 z-[3] w-[clamp(56px,11vw,84px)]" />
              <RoseSprig variant="sprig" className="absolute -bottom-2.5 -right-2.5 z-[3] w-[clamp(56px,11vw,84px)] rotate-180" />
              <PhotoFrame
                monoSize={72}
                label="Photograph coming soon"
                className="aspect-[3/2] h-[min(60vh,calc(86vw/1.5))]"
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center max-[560px]:mb-14">
              <span className="font-display text-[clamp(18px,4vw,23px)] italic text-ivory">
                {TILES[idx].caption}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[rgba(250,244,234,0.7)]">
                {idx + 1} of {TILES.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

// Circular translucent control button for the lightbox.
function LbButton({
  ref,
  className,
  label,
  onClick,
  children,
}: {
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute z-[3] inline-flex size-[46px] items-center justify-center rounded-full border border-[rgba(250,244,234,0.3)] bg-[rgba(250,244,234,0.1)] text-ivory transition-[background-color,border-color,transform] duration-200 hover:border-[rgba(250,244,234,0.6)] hover:bg-[rgba(250,244,234,0.2)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(250,244,234,0.7)]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        {children}
      </svg>
    </button>
  );
}
