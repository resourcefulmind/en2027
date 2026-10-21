import type { CSSProperties } from "react";
import Image from "next/image";
import { Monogram } from "@/components/woven/Monogram";
import { cn } from "@/lib/utils";

/**
 * The gold-bordered ivory frame for a photograph. With a `src` it shows the
 * photo (cover-fit, inner hairline drawn over it); without one it stands in as
 * a placeholder (EN monogram + optional label). Shared by Our Story and
 * Gallery. Aspect ratio, lift, and rose corners are composed by the caller
 * (via className/style and surrounding markup).
 */

const CARD_GRAIN =
  "repeating-linear-gradient(45deg, rgba(62,44,34,.012) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,.009) 0 1px, transparent 1px 6px)";

export function PhotoFrame({
  monoSize = 58,
  label,
  src,
  alt = "",
  sizes,
  position,
  className,
  style,
}: {
  monoSize?: number;
  label?: string;
  src?: string;
  alt?: string;
  sizes?: string;
  /** CSS object-position, to keep the subject in frame when the slot crops. */
  position?: string;
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
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <>
          <Monogram size={monoSize} className="opacity-50" />
          {label ? (
            <span className="text-[clamp(8.5px,1.6vw,11px)] font-semibold uppercase tracking-[0.24em] text-coffee-soft opacity-85">
              {label}
            </span>
          ) : null}
        </>
      )}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[7px] rounded-[3px] border",
          src ? "border-[rgba(250,244,234,0.55)]" : "border-[rgba(194,155,69,0.4)]",
        )}
      />
    </div>
  );
}
