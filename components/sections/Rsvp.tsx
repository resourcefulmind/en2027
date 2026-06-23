"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { content } from "@/content";
import { Monogram } from "@/components/woven/Monogram";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { rsvpSchema } from "@/lib/validation";
import { scrollToSection } from "@/lib/scroll";
import { useDialog } from "@/lib/useDialog";
import { cn } from "@/lib/utils";

/**
 * RSVP (Feature 14) — the closing call-to-action and the only section that
 * writes data. The form validates with the shared rsvpSchema, POSTs to
 * /api/rsvp (→ Google Sheet), and opens a personalised success modal. Failures
 * show an inline error and preserve every field. Section id="rsvp" resolves the
 * hero/nav RSVP CTAs.
 */

const { rsvp } = content;
const CARD_GRAIN =
  "repeating-linear-gradient(45deg, rgba(62,44,34,.012) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,.009) 0 1px, transparent 1px 6px)";

const FIELD =
  "w-full rounded-md border border-line-subtle bg-[rgba(255,255,255,0.55)] px-[15px] py-[14px] font-body text-[16px] text-coffee outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#a8988b] focus:border-coral focus:shadow-[0_0_0_3px_var(--color-focus-ring)]";
const LABEL =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-coffee-soft";

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-[9px]">
      <span className={LABEL}>
        {label} {required ? <span className="text-coral">*</span> : null}
        {optional ? <span className="font-display text-[13px] italic tracking-[0.08em] text-coffee-soft opacity-60 normal-case"> — optional</span> : null}
      </span>
      {children}
    </label>
  );
}

function Stepper({ label, value, set, min }: { label: string; value: number; set: (n: number) => void; min: number }) {
  const step = (d: number) => set(Math.max(min, Math.min(20, value + d)));
  return (
    <div className="flex flex-col gap-[9px]">
      <span className={LABEL}>{label}</span>
      <div className="flex items-center justify-between gap-2.5 rounded-md border border-line-subtle bg-[rgba(255,255,255,0.55)] px-2 py-1.5">
        <button type="button" onClick={() => step(-1)} aria-label={`Fewer ${label.toLowerCase()}`} className="inline-flex size-[40px] flex-none cursor-pointer items-center justify-center rounded-[8px] border border-line-subtle bg-ivory text-[22px] leading-none text-coffee transition-colors duration-150 hover:border-coral hover:text-coral active:bg-peach-soft">−</button>
        <span className="min-w-[24px] text-center font-display text-[22px] font-medium tabular-nums text-coffee">{value}</span>
        <button type="button" onClick={() => step(1)} aria-label={`More ${label.toLowerCase()}`} className="inline-flex size-[40px] flex-none cursor-pointer items-center justify-center rounded-[8px] border border-line-subtle bg-ivory text-[22px] leading-none text-coffee transition-colors duration-150 hover:border-coral hover:text-coral active:bg-peach-soft">+</button>
      </div>
    </div>
  );
}

function Choice({ selected, tone, title, sub, onSelect }: { selected: boolean; tone: "yes" | "no"; title: string; sub: string; onSelect: () => void }) {
  // Selected fill/border are instant (no transition) — intentional for clarity.
  const sel =
    tone === "yes"
      ? "border-coral bg-peach-soft shadow-[0_0_0_1px_#E07856,0_10px_24px_rgba(224,120,86,0.14)]"
      : "border-coffee-soft bg-[rgba(107,85,71,0.06)] shadow-[0_0_0_1px_rgba(107,85,71,0.4)]";
  const tick = tone === "yes" ? "border-coral bg-coral" : "border-coffee-soft bg-coffee-soft";
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "relative cursor-pointer rounded-lg border py-[18px] pl-[52px] pr-[18px] text-left transition-[box-shadow,transform] duration-200",
        selected ? sel : "border-line-subtle bg-[rgba(255,255,255,0.5)] hover:border-gold",
      )}
    >
      <span className={cn("absolute left-[18px] top-1/2 inline-flex size-[22px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px]", selected ? tick : "border-line-subtle")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={cn("size-3", selected ? "opacity-100" : "opacity-0")}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span className="mb-[3px] block font-display text-[18px] font-medium leading-[1.1] text-coffee">{title}</span>
      <span className="text-[12.5px] text-coffee-soft">{sub}</span>
    </button>
  );
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "friend";
}

export function Rsvp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ first: string; yes: boolean } | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  const closeModal = () => setDone(null);
  // Gentle nudge to the Gifting section (accept path only): close, then scroll up.
  const giftUs = () => {
    setDone(null);
    scrollToSection("gifting");
  };
  useDialog(done !== null, closeModal, closeRef);

  function selectAttend(v: "yes" | "no") {
    setAttend(v);
    setError("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!attend) {
      setError("Please let us know if you can join us.");
      return;
    }
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attending: attend,
      adults: attend === "yes" ? adults : 0,
      children: attend === "yes" ? children : 0,
      message: message.trim(),
    };
    const parsed = rsvpSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setDone({ first: firstName(name), yes: attend === "yes" });
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const submitLabel = submitting ? "Sending…" : attend === "no" ? "Send our reply" : rsvp.submitCta;

  return (
    <>
      <section id="rsvp" className="relative overflow-hidden pb-[clamp(72px,12vw,130px)]">
        <PaperTexture grain className="z-0" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(120% 50% at 50% 0%, rgba(248,222,207,.5), transparent 54%)" }} />

        <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

        <div className="relative z-[2] mx-auto w-full max-w-[600px] px-[22px]">
          <Reveal>
            <SectionHeading eyebrow={rsvp.eyebrow} title={rsvp.heading} lede={rsvp.subline} />
          </Reveal>

          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative mt-[clamp(30px,5vw,46px)] rounded-[5px] border border-gold bg-ivory p-[clamp(26px,5vw,40px)] shadow-[0_2px_5px_rgba(62,44,34,0.05),0_22px_50px_rgba(62,44,34,0.10)]"
              style={{ backgroundImage: CARD_GRAIN }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-[6px] rounded-[3px] border border-[rgba(194,155,69,0.4)]" />
              <div className="relative flex flex-col gap-[clamp(20px,3.4vw,26px)]">
                <Field label="Full name" required>
                  <input className={FIELD} type="text" autoComplete="name" placeholder="e.g. Adaeze Okafor" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field label="Email" required>
                  <input className={FIELD} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Field>
                <Field label="Phone / WhatsApp" required>
                  <input className={FIELD} type="tel" autoComplete="tel" placeholder="+234 800 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Field>

                <div className="flex flex-col gap-[9px]">
                  <span className={LABEL}>Will you be joining us? <span className="text-coral">*</span></span>
                  <div role="radiogroup" aria-label="Attendance" className="grid grid-cols-1 gap-3.5 min-[441px]:grid-cols-2">
                    <Choice selected={attend === "yes"} tone="yes" title={rsvp.accept} sub={rsvp.acceptSub} onSelect={() => selectAttend("yes")} />
                    <Choice selected={attend === "no"} tone="no" title={rsvp.decline} sub={rsvp.declineSub} onSelect={() => selectAttend("no")} />
                  </div>
                </div>

                {attend === "yes" ? (
                  <div className="grid grid-cols-2 gap-3.5">
                    <Stepper label="Adults" value={adults} set={setAdults} min={1} />
                    <Stepper label="Children" value={children} set={setChildren} min={0} />
                  </div>
                ) : null}

                {attend === "no" ? (
                  <p className="px-1 pt-1.5 text-center font-display text-[clamp(16px,3.6vw,19px)] italic leading-[1.45] text-coffee-soft">
                    {rsvp.declineNote}
                  </p>
                ) : null}

                <Field label="A message for the couple" optional>
                  <textarea className={cn(FIELD, "min-h-[88px] resize-y leading-[1.55]")} maxLength={280} placeholder="Share a wish, a blessing, or a note…" value={message} onChange={(e) => setMessage(e.target.value)} />
                </Field>

                <p className="min-h-[15px] text-center text-[12.5px] text-coral-deep" role="alert">{error}</p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-pill bg-coral px-[30px] py-[17px] font-body text-[13px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_1px_2px_rgba(199,95,63,0.25),0_14px_30px_rgba(199,95,63,0.24)] transition-[background-color,transform] duration-200 hover:bg-coral-deep active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {!submitting ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  ) : null}
                  {submitLabel}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* success modal */}
      {done ? (
        <div role="dialog" aria-modal="true" aria-labelledby="rsvp-modal-title" className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <button type="button" aria-label="Close" onClick={closeModal} className="absolute inset-0 bg-[rgba(36,24,18,0.55)] backdrop-blur-[3px]" />
          <div
            className="relative z-[2] w-[min(440px,100%)] rounded-[6px] border border-gold bg-ivory px-[clamp(26px,5vw,40px)] pb-[clamp(30px,5vw,40px)] pt-[clamp(34px,6vw,48px)] text-center shadow-[0_30px_70px_rgba(36,24,18,0.34)]"
            style={{ backgroundImage: CARD_GRAIN }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-[7px] rounded-[4px] border border-[rgba(194,155,69,0.4)]" />
            <button ref={closeRef} type="button" onClick={closeModal} aria-label="Close" className="absolute right-3.5 top-3.5 inline-flex size-[38px] cursor-pointer items-center justify-center rounded-full text-coffee-soft hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus-ring)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" className="size-[18px]"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <div className="mb-[18px] leading-[0]"><Monogram crest size={76} className="mx-auto" /></div>
            <div aria-hidden="true" className="mx-auto mb-5 flex w-[150px] items-center justify-center gap-3 text-gold">
              <span className="h-px flex-1 bg-current opacity-60" />
              <span className="size-[5px] rotate-45 border border-current" />
              <span className="h-px flex-1 bg-current opacity-60" />
            </div>
            <h3 id="rsvp-modal-title" className="m-0 mb-3 font-display text-[clamp(1.6rem,5.5vw,2.1rem)] font-medium leading-[1.18] tracking-[-0.01em] text-balance text-coffee">
              {(done.yes ? rsvp.successYes : rsvp.successNo).replace("{name}", done.first)}
            </h3>
            <p className="m-0 mb-[26px] text-[15.5px] leading-[1.6] text-coffee-soft text-pretty">
              {done.yes ? rsvp.successYesMsg : rsvp.successNoMsg}
            </p>
            <button type="button" onClick={closeModal} className="cursor-pointer rounded-pill border border-coffee px-[30px] py-[13px] font-body text-[12px] font-bold uppercase tracking-[0.16em] text-coffee transition-colors duration-200 hover:bg-coffee hover:text-ivory">
              Close
            </button>
            {done.yes ? (
              <p className="mt-[18px] text-[13px] leading-[1.5] text-coffee-soft">
                {rsvp.giftPrompt}{" "}
                <button type="button" onClick={giftUs} className="cursor-pointer font-semibold text-coral underline-offset-2 hover:text-coral-deep hover:underline">
                  {rsvp.giftCta} →
                </button>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
