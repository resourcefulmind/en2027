"use client";

import type { ReactNode } from "react";
import { content } from "@/content";
import { Button } from "@/components/woven/Button";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { Toast } from "@/components/woven/Toast";
import { buildIcs } from "@/lib/ics";
import { useToast } from "@/lib/useToast";

/**
 * Wedding Details (Feature 07). Venue / Time / Dress Code cards, then Open in
 * Maps + Add to Calendar actions. The maps link prefers a real content.mapUrl,
 * else falls back to a Google Maps search of the venue. Add to Calendar builds
 * an .ics from content (lib/ics.ts) and confirms with a toast.
 */

const CARD_GRAIN =
  "repeating-linear-gradient(45deg, rgba(62,44,34,.012) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,.009) 0 1px, transparent 1px 6px)";

// Prefer a real pin if the couple has set one; otherwise a working search link.
function mapHref(): string {
  const url = content.event.mapUrl;
  if (/^https?:\/\//.test(url)) return url;
  const q = encodeURIComponent(`${content.event.venueName}, ${content.event.venueAddress}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const { details } = content;

function Tile({
  label,
  heading,
  delayMs,
  children,
}: {
  label: string;
  heading: string;
  delayMs?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delayMs={delayMs} className="flex">
      <div
        className="relative flex w-full flex-col rounded-[4px] border border-gold bg-ivory px-[clamp(22px,2.8vw,30px)] py-[clamp(26px,3.4vw,34px)] shadow-[0_2px_5px_rgba(62,44,34,0.05),0_22px_50px_rgba(62,44,34,0.10)]"
        style={{ backgroundImage: CARD_GRAIN }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[5px] rounded-[3px] border border-[rgba(194,155,69,0.4)]"
        />
        <div className="relative flex h-full flex-col">
          <span className="mb-[clamp(16px,2.4vw,22px)] inline-flex items-center gap-2.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-coffee-soft">
            <span aria-hidden="true" className="size-[5px] rotate-45 border border-gold" />
            {label}
          </span>
          <h3 className="m-0 mb-1.5 font-display text-[clamp(22px,4.6vw,27px)] font-medium leading-[1.12] tracking-[-0.01em] text-coffee">
            {heading}
          </h3>
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function Note({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="mt-auto inline-flex items-center gap-2 text-[13px] leading-[1.5] text-coffee-soft">
      <span aria-hidden="true" className="flex-none text-gold [&>svg]:size-3.5">
        {icon}
      </span>
      {children}
    </p>
  );
}

const SWATCHES = [
  { name: "Coffee Brown", bg: "radial-gradient(circle at 34% 30%, #5a4334, #3E2C22)" },
  { name: "Coral Peach", bg: "radial-gradient(circle at 34% 30%, #F2C0AC, #E07856)" },
];

export function WeddingDetails() {
  const { toast, showToast } = useToast(2400);

  function addToCalendar() {
    const blob = new Blob([buildIcs()], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Ebere-and-Nnamdi.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Calendar invite downloaded");
  }

  return (
    <>
      <section id="details" className="relative overflow-hidden pb-[clamp(72px,12vw,130px)]">
        <PaperTexture grain className="z-0" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(120% 55% at 50% 0%, rgba(248,222,207,.46), transparent 52%)",
          }}
        />

        <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

        <div className="relative z-[2] mx-auto w-full max-w-[1000px] px-[22px]">
          <Reveal>
            <SectionHeading
              eyebrow={details.eyebrow}
              title={details.heading}
              lede={details.subline}
            />
          </Reveal>

          <div className="mt-[clamp(34px,6vw,52px)] grid grid-cols-1 items-stretch gap-[clamp(16px,2.4vw,22px)] min-[720px]:grid-cols-3">
            <Tile label={details.venue.label} heading={details.venue.name} delayMs={0}>
              <p className="text-[clamp(14px,3vw,15.5px)] leading-[1.55] text-coffee-soft">
                {details.venue.address}
              </p>
              <div className="my-[clamp(16px,2.4vw,20px)] h-px bg-[rgba(194,155,69,0.4)]" />
              <Note icon={<ParkingIcon />}>{details.venue.note}</Note>
            </Tile>

            <Tile label={details.time.label} heading={details.time.time} delayMs={80}>
              <p className="text-[clamp(14px,3vw,15.5px)] leading-[1.55] text-coffee">
                {details.time.date}
              </p>
              <div className="my-[clamp(16px,2.4vw,20px)] h-px bg-[rgba(194,155,69,0.4)]" />
              <Note icon={<ClockIcon />}>{details.time.note}</Note>
            </Tile>

            <Tile label={details.dressCode.label} heading={details.dressCode.heading} delayMs={160}>
              <p className="text-[clamp(14px,3vw,15.5px)] leading-[1.55] text-coffee-soft">
                {details.dressCode.line}
              </p>
              <div className="mt-auto flex gap-3 pt-[clamp(16px,2.4vw,20px)]">
                {SWATCHES.map((s) => (
                  <div key={s.name} className="flex flex-col items-center gap-[7px]">
                    <span
                      className="size-[46px] rounded-full border border-[rgba(62,44,34,0.1)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(62,44,34,0.18)]"
                      style={{ background: s.bg }}
                    />
                    <span className="whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-[0.12em] text-coffee-soft">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </Tile>
          </div>

          <Reveal
            delayMs={120}
            className="mt-[clamp(30px,5vw,44px)] flex flex-wrap justify-center gap-3.5"
          >
            <Button
              variant="secondary"
              href={mapHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2.5 hover:bg-[rgba(194,155,69,0.12)] [&>svg]:size-4 [&>svg]:text-gold"
            >
              <PinIcon />
              Open in Maps
            </Button>
            <Button
              variant="secondary"
              onClick={addToCalendar}
              className="gap-2.5 hover:bg-[rgba(194,155,69,0.12)] [&>svg]:size-4 [&>svg]:text-gold"
            >
              <CalendarIcon />
              Add to Calendar
            </Button>
          </Reveal>
        </div>
      </section>

      <Toast message={toast} />
    </>
  );
}

/* ---- inline icons (thin-stroke, from the design) ---- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ParkingIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="7.5" cy="16" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16" r="1.2" fill="currentColor" stroke="none" />
      <path d="M5 11V8a7 7 0 0 1 14 0v3" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4M12 13v5M9.5 15.5h5" />
    </svg>
  );
}
