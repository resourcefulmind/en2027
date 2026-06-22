import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Small-caps section label with a short gold tick.
 * Hanken, uppercase, wide tracking, coffee-soft (see ui-rules.md → Section anatomy).
 */
export function Eyebrow({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[11px] whitespace-nowrap",
        "font-body text-eyebrow font-semibold uppercase tracking-eyebrow text-coffee-soft",
        className,
      )}
    >
      <span className="h-px w-[22px] bg-gold opacity-85" aria-hidden="true" />
      {children}
    </span>
  );
}
