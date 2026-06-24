"use client";

import type { ReactNode } from "react";
import { content } from "@/content";
import { Badge } from "@/components/woven/Badge";
import { Button } from "@/components/woven/Button";
import { Divider } from "@/components/woven/Divider";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { Toast } from "@/components/woven/Toast";
import { useCopy } from "@/lib/useCopy";
import { useToast } from "@/lib/useToast";
import { cn } from "@/lib/utils";

/**
 * Gifting (Feature 10). Display-only, no payments. A gracious intro, two cash
 * account cards (Naira + Foreign) with copy-to-clipboard on the account number /
 * IBAN, and a registry block. The registry link is live only when a real URL is
 * set (else a disabled button); copy actions confirm via the shared Toast.
 */

const { gifting } = content;

const CARD_GRAIN =
  "repeating-linear-gradient(45deg, rgba(62,44,34,.012) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,.009) 0 1px, transparent 1px 6px)";

const isRealUrl = (u: string) => /^https?:\/\//.test(u);

function Field({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <div className="mb-[5px] text-[10.5px] font-semibold uppercase tracking-[0.18em] text-coffee-soft">
        {label}
      </div>
      <div className={cn("text-[clamp(15.5px,3.6vw,18px)] font-medium text-coffee break-words", valueClassName)}>
        {value}
      </div>
    </div>
  );
}

function CopyField({
  label,
  value,
  valueClassName,
  onCopied,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  onCopied: () => void;
}) {
  const { copied, copy } = useCopy();
  return (
    <div>
      <div className="mb-[5px] text-[10.5px] font-semibold uppercase tracking-[0.18em] text-coffee-soft">
        {label}
      </div>
      <div className="flex items-end justify-between gap-3.5">
        <div className={cn("min-w-0 flex-1 font-medium text-coffee break-words", valueClassName)}>
          {value}
        </div>
        <button
          type="button"
          aria-label={`Copy ${label}`}
          onClick={() => {
            copy(value);
            onCopied();
          }}
          className={cn(
            "flex-none inline-flex cursor-pointer items-center gap-1.5 rounded-pill px-4 py-2.5 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-[background-color,transform] duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus-ring)] [&>svg]:size-3.5",
            copied
              ? "bg-[#1F8A5B] shadow-[0_1px_2px_rgba(31,138,91,0.22),0_7px_16px_rgba(31,138,91,0.16)]"
              : "bg-coral shadow-[0_1px_2px_rgba(199,95,63,0.22),0_7px_16px_rgba(199,95,63,0.18)] hover:bg-coral-deep",
          )}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// Cardstock shell with badge + bordered field stack.
function AccountCard({
  badge,
  badgeVariant,
  delayMs,
  children,
}: {
  badge: string;
  badgeVariant: "coral" | "gold-outline";
  delayMs?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delayMs={delayMs} className="min-[760px]:flex-1">
      <div
        className="relative h-full rounded-[4px] border border-gold bg-ivory p-[clamp(24px,5vw,36px)] shadow-[0_2px_5px_rgba(62,44,34,0.05),0_22px_50px_rgba(62,44,34,0.10)]"
        style={{ backgroundImage: CARD_GRAIN }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[5px] rounded-[3px] border border-[rgba(194,155,69,0.4)]"
        />
        <div className="relative flex h-full flex-col">
          <Badge variant={badgeVariant} className="mb-[clamp(18px,3vw,24px)] self-start">
            {badge}
          </Badge>
          <div className="[&>div]:border-t [&>div]:border-[rgba(62,44,34,0.1)] [&>div]:py-[13px] [&>div:first-child]:border-t-0 [&>div:first-child]:pt-0">
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const MONO_BIG = "font-display text-[clamp(20px,5.2vw,26px)] tracking-[0.03em] leading-[1.1] tabular-nums";
const MONO_SM = "font-body text-[clamp(15px,3.6vw,17px)] tracking-[0.04em] tabular-nums";

export function Gifting() {
  const { toast, showToast } = useToast();
  const copied = () => showToast("Copied to clipboard");
  const registryLive = isRealUrl(gifting.registry.url);

  return (
    <>
      <section id="gifting" className="relative overflow-hidden pb-[clamp(64px,11vw,120px)]">
        <PaperTexture grain className="z-0" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 0%, rgba(248,222,207,.5), transparent 55%)",
          }}
        />

        <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

        <div className="relative z-[2] mx-auto w-full max-w-[880px] px-[22px]">
          <Reveal>
            <SectionHeading eyebrow={gifting.eyebrow} title={gifting.heading} lede={gifting.intro} />
          </Reveal>

          <Reveal className="my-[clamp(32px,6vw,52px)] flex justify-center">
            <Divider />
          </Reveal>

          <Reveal className="mb-[clamp(18px,3vw,24px)] flex items-center gap-3.5">
            <span className="text-[clamp(11px,2.5vw,12.5px)] font-bold uppercase tracking-[0.2em] text-coffee">
              Cash Gifts
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-[rgba(194,155,69,0.4)]" />
          </Reveal>

          <div className="flex flex-col items-stretch gap-[clamp(16px,3vw,22px)] min-[760px]:flex-row">
            <AccountCard badge={gifting.naira.label} badgeVariant="coral" delayMs={0}>
              <Field label="Account Name" value={gifting.naira.accountName} />
              <CopyField
                label="Account Number"
                value={gifting.naira.accountNumber}
                valueClassName={MONO_BIG}
                onCopied={copied}
              />
              <Field label="Bank Name" value={gifting.naira.bank} />
            </AccountCard>

            <AccountCard badge={gifting.foreign.label} badgeVariant="gold-outline" delayMs={80}>
              <Field label="Account Name" value={gifting.foreign.accountName} />
              <CopyField
                label="Account Number"
                value={gifting.foreign.accountNumber}
                valueClassName={MONO_BIG}
                onCopied={copied}
              />
              <Field label="Bank Name" value={gifting.foreign.bank} />
              <CopyField
                label="IBAN"
                value={gifting.foreign.iban}
                valueClassName={MONO_SM}
                onCopied={copied}
              />
              <Field label="SWIFT / BIC" value={gifting.foreign.swift} valueClassName={MONO_SM} />
            </AccountCard>
          </div>

          <Reveal
            delayMs={120}
            className="mt-[clamp(30px,6vw,44px)] flex flex-col items-center gap-[clamp(10px,2vw,14px)] rounded-[4px] border border-[rgba(194,155,69,0.45)] bg-[rgba(250,244,234,0.4)] p-[clamp(26px,5vw,36px)] text-center"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-coffee-soft">
              Gift Registry
            </span>
            <p className="m-0 text-[clamp(15px,3.4vw,17px)] leading-[1.5] text-coffee">
              {gifting.registry.line}
            </p>
            {registryLive ? (
              <Button
                variant="secondary"
                href={gifting.registry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 gap-2.5 border-coffee/70 text-coffee hover:border-coffee hover:bg-coffee hover:text-ivory [&>svg]:size-3.5"
              >
                {gifting.registry.cta}
                <ExternalIcon />
              </Button>
            ) : (
              <Button
                variant="secondary"
                disabled
                aria-disabled="true"
                title="Registry link coming soon"
                className="mt-1.5 cursor-not-allowed gap-2.5 border-coffee/30 text-coffee/50 opacity-70 [&>svg]:size-3.5"
              >
                {gifting.registry.cta}
                <ExternalIcon />
              </Button>
            )}
          </Reveal>
        </div>
      </section>

      <Toast message={toast} />
    </>
  );
}

/* ---- inline icons ---- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2.4} {...stroke}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
