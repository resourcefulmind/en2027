import { cn } from "@/lib/utils";

type Props = {
  /** Include the feTurbulence grain layer on top of the linen weave (default true). */
  grain?: boolean;
  className?: string;
};

// Fine cross-hatch "woven" weave — felt, not seen (ported from the design .paper layer).
const WEAVE =
  "repeating-linear-gradient(45deg, rgba(62,44,34,0.014) 0 1px, transparent 1px 6px)," +
  "repeating-linear-gradient(-45deg, rgba(62,44,34,0.011) 0 1px, transparent 1px 6px)";

/**
 * Absolute paper-texture overlay: a faint linen weave plus an optional noise
 * grain, both at multiply so the warmth of the ivory shows through. Drop inside a
 * `relative` section as the first child; it's decorative and non-interactive.
 */
export function PaperTexture({ grain = true, className }: Props) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: WEAVE, mixBlendMode: "multiply" }}
      />
      {grain ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "var(--noise)",
            backgroundSize: "150px",
            opacity: 0.05,
            mixBlendMode: "multiply",
          }}
        />
      ) : null}
    </div>
  );
}
