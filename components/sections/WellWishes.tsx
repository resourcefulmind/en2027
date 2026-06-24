"use client";

import { useState } from "react";
import { content } from "@/content";
import { Monogram } from "@/components/woven/Monogram";
import { PaperTexture } from "@/components/woven/PaperTexture";
import { Reveal } from "@/components/woven/Reveal";
import { SectionHeading } from "@/components/woven/SectionHeading";
import { ThreadIn } from "@/components/woven/ThreadIn";
import { Toast } from "@/components/woven/Toast";
import { wishSchema } from "@/lib/validation";
import { useToast } from "@/lib/useToast";
import { cn, formatWishDate } from "@/lib/utils";

/**
 * Well-Wishes (Feature 15). A form that posts a wish to Supabase (via the API
 * route) and a masonry wall of note-cards server-rendered from the same store.
 * The wall hydrates from `initialWishes`; a submission is optimistically
 * prepended (rolled back on failure) and confirmed with a toast. Wishes render
 * as plain text (React-escaped) — never HTML.
 */

export type WishCard = { id: string; name: string; message: string; date: string };
type CardState = WishCard & { fresh?: boolean };

const CARD_GRAIN =
  "repeating-linear-gradient(45deg, rgba(62,44,34,.013) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,.010) 0 1px, transparent 1px 6px)";
const FIELD =
  "w-full rounded-md border border-line-subtle bg-[rgba(255,255,255,0.5)] px-[15px] py-[13px] font-body text-[16px] text-coffee outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#a8988b] focus:border-coral focus:shadow-[0_0_0_3px_var(--color-focus-ring)]";
const LABEL = "mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-coffee-soft";
const MAX = 280;

const { wishes: copy } = content;

export function WellWishes({ initialWishes }: { initialWishes: WishCard[] }) {
  const [list, setList] = useState<CardState[]>(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast } = useToast(2200);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const payload = { name: name.trim(), message: message.trim() };
    const parsed = wishSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your wish.");
      return;
    }

    setSubmitting(true);
    const tempId = `temp-${Date.now()}`;
    const optimistic: CardState = {
      id: tempId,
      name: payload.name,
      message: payload.message,
      date: formatWishDate(new Date().toISOString()),
      fresh: true,
    };
    setList((prev) => [optimistic, ...prev]);
    setName("");
    setMessage("");

    const rollback = () => {
      setList((prev) => prev.filter((w) => w.id !== tempId));
      setName(payload.name);
      setMessage(payload.message);
    };

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        rollback();
        setError(json.error || "Couldn't share your wish. Please try again.");
        return;
      }
      const w = json.data as { id: string; name: string; message: string; created_at: string };
      setList((prev) =>
        prev.map((x) =>
          x.id === tempId
            ? { id: w.id, name: w.name, message: w.message, date: formatWishDate(w.created_at), fresh: true }
            : x,
        ),
      );
      showToast(copy.toast);
    } catch {
      rollback();
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const count = list.length;
  const remaining = MAX - message.length;

  return (
    <>
      <section id="wishes" className="relative overflow-hidden pb-[clamp(72px,12vw,130px)]">
        <PaperTexture grain className="z-0" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(120% 55% at 50% 0%, rgba(248,222,207,.5), transparent 52%)" }}
        />

        <ThreadIn className="pt-[clamp(40px,9vw,80px)]" />

        <div className="relative z-[2] mx-auto w-full max-w-[940px] px-[22px]">
          <Reveal>
            <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} lede={copy.intro} />
          </Reveal>

          {/* form */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative mx-auto mt-[clamp(30px,5vw,46px)] max-w-[540px] rounded-[4px] border border-gold bg-ivory p-[clamp(24px,5vw,34px)] shadow-[0_2px_5px_rgba(62,44,34,0.05),0_22px_50px_rgba(62,44,34,0.10)]"
              style={{ backgroundImage: CARD_GRAIN }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-[5px] rounded-[3px] border border-[rgba(194,155,69,0.4)]" />
              <div className="relative flex flex-col gap-[18px]">
                <div>
                  <label htmlFor="wish-name" className={LABEL}>
                    Your name <span className="text-coral">*</span>
                  </label>
                  <input id="wish-name" className={FIELD} type="text" maxLength={60} autoComplete="name" placeholder="e.g. Aunty Ngozi" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="wish-msg" className={LABEL}>
                    Your wish <span className="text-coral">*</span>
                  </label>
                  <textarea id="wish-msg" className={cn(FIELD, "min-h-[92px] resize-y leading-[1.55]")} maxLength={MAX} placeholder="Wishing you a love as warm and lasting as…" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="min-h-4 flex-1 text-[12.5px] text-coral-deep" role="alert">{error}</span>
                    <span className={cn("text-[12px] tabular-nums", remaining < 20 ? "text-coral-deep" : "text-coffee-soft")}>
                      {message.length} / {MAX}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex cursor-pointer items-center gap-2.5 self-start rounded-pill bg-coral px-[30px] py-3.5 font-body text-[12.5px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_1px_2px_rgba(199,95,63,0.25),0_12px_26px_rgba(199,95,63,0.22)] transition-[background-color,transform] duration-200 hover:bg-coral-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <HeartIcon />
                  {submitting ? "Sharing…" : copy.submitCta}
                </button>
              </div>
            </form>
          </Reveal>

          {/* wall head */}
          <Reveal className="mx-auto mt-[clamp(48px,8vw,76px)] flex max-w-[900px] items-center gap-3.5">
            <span className="whitespace-nowrap text-[clamp(11px,2.5vw,12.5px)] font-bold uppercase tracking-[0.2em] text-coffee">
              {copy.wallHeading}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-[rgba(194,155,69,0.4)]" />
            {count > 0 ? (
              <span className="whitespace-nowrap text-[11.5px] tracking-[0.1em] text-coffee-soft">
                {count === 1 ? "1 wish" : `${count} wishes`}
              </span>
            ) : null}
          </Reveal>

          {/* wall */}
          <div className="relative z-[2] mt-[clamp(26px,5vw,38px)]">
            {count === 0 ? (
              <div className="flex flex-col items-center gap-4 px-6 py-[clamp(40px,8vw,72px)] text-center">
                <Monogram size={64} className="opacity-80" />
                <span aria-hidden="true" className="h-px w-14 bg-gold opacity-70" />
                <p className="m-0 max-w-[24ch] font-display text-[clamp(18px,4vw,23px)] font-medium leading-[1.3] text-coffee">
                  {copy.emptyState}
                </p>
              </div>
            ) : (
              <div className="columns-1 [column-gap:clamp(14px,2vw,22px)] min-[561px]:columns-2 min-[881px]:columns-3 max-[560px]:[column-gap:0]">
                {list.map((w) => (
                  <article
                    key={w.id}
                    className={cn(
                      "wish-note relative mx-auto mb-[clamp(16px,2.4vw,24px)] block w-full max-w-[380px] break-inside-avoid rounded-[4px] border border-[rgba(194,155,69,0.55)] bg-ivory px-[clamp(18px,2.2vw,24px)] pb-[clamp(18px,2.2vw,22px)] pt-[clamp(20px,2.4vw,26px)] shadow-[0_1px_2px_rgba(62,44,34,0.05),0_14px_32px_rgba(62,44,34,0.09)] hover:shadow-[0_2px_4px_rgba(62,44,34,0.06),0_22px_46px_rgba(62,44,34,0.13)]",
                      w.fresh && "wish-fresh",
                    )}
                    style={{ backgroundImage: CARD_GRAIN }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[11px] left-1/2 size-[16px] -translate-x-1/2 rounded-full shadow-[0_1px_2px_rgba(62,44,34,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                      style={{ background: "radial-gradient(circle at 35% 30%, #F3E2A8, #C29B45 55%, #8A6526)" }}
                    >
                      <span className="absolute inset-[5px] rounded-full border border-[rgba(124,90,34,0.5)]" />
                    </span>
                    <p className="mb-3.5 mt-1.5 text-[clamp(15px,1.5vw,16.5px)] leading-[1.6] text-coffee text-pretty">
                      {w.message}
                    </p>
                    <div className="flex items-baseline justify-between gap-2.5">
                      <span className="font-display text-[clamp(15px,1.5vw,17px)] font-medium italic text-coral">{w.name}</span>
                      <span className="whitespace-nowrap text-[10.5px] uppercase tracking-[0.12em] text-coffee-soft opacity-80">{w.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Toast message={toast} />
    </>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[15px]">
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2 5 5.2 5 7.3 5 8.6 6.2 12 9c3.4-2.8 4.7-4 6.8-4C22 5 23.6 8.3 22 11.7 19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
