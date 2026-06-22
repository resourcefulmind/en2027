import type { CSSProperties } from "react";
import { Monogram } from "@/components/woven/Monogram";
import { cn } from "@/lib/utils";

/**
 * The gold-bordered ivory placeholder frame standing in for a real photograph
 * (EN monogram + inner hairline + optional label). Shared by Our Story and
 * Gallery; the photo shoot (feature 17) drops a `next/image` into it. Aspect
 * ratio, lift, and rose corners are composed by the caller (via className/style
 * and surrounding markup).
 */

const CARD_GRAIN =
  "repeating-linear-gradient(45deg, rgba(62,44,34,.012) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,.009) 0 1px, transparent 1px 6px)";

export function PhotoFrame({
  monoSize = 58,
  label,
  className,
  style,
}: {
  monoSize?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[4px] border border-gold bg-ivory",
        "shadow-[0_2px_5px_rgba(62,44,34,0.05),0_16px_38px_rgba(62,44,34,0.09)]",
        className,
      )}
      style={{ backgroundImage: CARD_GRAIN, ...style }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] rounded-[3px] border border-[rgba(194,155,69,0.4)]"
      />
      <Monogram size={monoSize} className="opacity-50" />
      {label ? (
        <span className="text-[clamp(8.5px,1.6vw,11px)] font-semibold uppercase tracking-[0.24em] text-coffee-soft opacity-85">
          {label}
        </span>
      ) : null}
    </div>
  );
}
