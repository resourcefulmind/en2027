"use client";

import { Fragment, useState } from "react";
import { content } from "@/content";
import { Divider } from "@/components/woven/Divider";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * FAQ (Feature 11). A gold-hairline accordion in three tiers. Single-open (first
 * item open by default; clicking the open question closes it). The answer opens
 * via a grid 0fr→1fr transition (no height measurement); reduced-motion makes it
 * instant. Bracketed placeholders in answers are rendered muted (couple fills at
 * feature 16). All content from content.faq.
 */

const { faq } = content;

type AnswerLink = { label: string; to: string };

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Render an answer: mute [bracketed] placeholders, and turn any linked label
// into an anchor that scrolls to its section (e.g. "Details" -> #details).
function renderAnswer(text: string, links?: readonly AnswerLink[]) {
  const linkMap = new Map((links ?? []).map((l) => [l.label, l.to]));
  const tokens = ["\\[[^\\]]*\\]", ...[...linkMap.keys()].map(escapeRegExp)];
  const re = new RegExp(`(${tokens.join("|")})`, "g");
  return text.split(re).map((part, i) => {
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <span key={i} className="text-coffee-soft">
          {part}
        </span>
      );
    }
    const to = linkMap.get(part);
    if (to) {
      return (
        <a
          key={i}
          href={`#${to}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(to);
          }}
          className="font-medium text-coral underline decoration-[rgba(224,120,86,0.45)] underline-offset-2 transition-colors duration-200 hover:text-coral-deep hover:decoration-coral"
        >
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Indicator({ open }: { open: boolean }) {
  const bar =
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm transition-[transform,background-color] duration-[350ms] ease-[var(--ease-out)] motion-reduce:transition-none";
  return (
    <span aria-hidden="true" className="relative size-[22px] flex-none">
      <span className={cn(bar, "h-[1.5px] w-4", open ? "rotate-[135deg] bg-coral" : "bg-gold")} />
      <span className={cn(bar, "h-4 w-[1.5px]", open ? "rotate-[135deg] bg-coral" : "bg-gold")} />
    </span>
  );
}

function Item({
  itemKey,
  q,
  a,
  links,
  open,
  onToggle,
}: {
  itemKey: string;
  q: string;
  a: string;
  links?: readonly AnswerLink[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[rgba(194,155,69,0.45)]">
      <button
        type="button"
        id={`faq-q-${itemKey}`}
        aria-expanded={open}
        aria-controls={`faq-a-${itemKey}`}
        onClick={onToggle}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-[18px] px-0.5 py-[clamp(18px,3.2vw,24px)] text-left",
          "font-display text-[clamp(17px,3.6vw,21px)] font-medium leading-[1.3] tracking-[-0.01em]",
          "transition-colors duration-200 hover:text-coral-deep focus-visible:outline-none focus-visible:text-coral-deep",
          open ? "text-coral-deep" : "text-coffee",
        )}
      >
        {q}
        <Indicator open={open} />
      </button>
      <div
        id={`faq-a-${itemKey}`}
        role="region"
        aria-labelledby={`faq-q-${itemKey}`}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[var(--ease-out)] motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "relative pb-[clamp(20px,3.2vw,26px)] pl-[18px] pr-[44px] pt-0.5 transition-transform duration-[400ms] ease-[var(--ease-out)] motion-reduce:transition-none",
              open ? "translate-y-0" : "-translate-y-1.5",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0.5 bottom-[clamp(22px,3.4vw,28px)] w-0.5 rounded-sm bg-coral opacity-80"
            />
            <p className="m-0 max-w-[60ch] font-body text-[clamp(15px,3.2vw,16.5px)] leading-[1.68] text-coffee text-pretty">
              {renderAnswer(a, links)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  // Single-open: the key of the open item, or null. First item open by default.
  const [openKey, setOpenKey] = useState<string>("0-0");

  return (
    <section id="faq" className="relative overflow-hidden pb-[clamp(72px,12vw,130px)]">
      <PaperTexture grain className="z-0" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 55% at 50% 0%, rgba(248,222,207,.5), transparent 52%)",
        }}
      />

      <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

      <div className="relative z-[2] mx-auto w-full max-w-[760px] px-[22px]">
        <Reveal>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.heading} lede={faq.subline} />
        </Reveal>

        {faq.tiers.map((tier, ti) => (
          <Reveal key={tier.label}>
            <div
              className={cn(
                "mb-[clamp(6px,1.5vw,12px)] flex items-center gap-3.5",
                ti === 0 ? "mt-[clamp(34px,6vw,52px)]" : "mt-[clamp(40px,7vw,60px)]",
              )}
            >
              <span className="whitespace-nowrap text-[clamp(10.5px,2.3vw,12px)] font-bold uppercase tracking-[0.22em] text-gold">
                {tier.label}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-[rgba(194,155,69,0.4)]" />
            </div>
            <div className="border-t border-[rgba(194,155,69,0.45)]">
              {tier.items.map((item, ii) => {
                const key = `${ti}-${ii}`;
                return (
                  <Item
                    key={key}
                    itemKey={key}
                    q={item.q}
                    a={item.a}
                    links={"links" in item ? item.links : undefined}
                    open={openKey === key}
                    onToggle={() => setOpenKey((prev) => (prev === key ? "" : key))}
                  />
                );
              })}
            </div>
          </Reveal>
        ))}

        <Reveal className="mt-[clamp(40px,7vw,60px)] flex flex-col items-center text-center">
          <Divider className="mb-[clamp(20px,3.5vw,28px)] max-w-[min(220px,60%)]" />
          <p className="m-0 font-display text-[clamp(17px,3.8vw,22px)] font-medium italic text-coffee">
            {renderAnswer(faq.closing)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
