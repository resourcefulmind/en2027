import { cn } from "@/lib/utils";

type BadgeVariant = "peach" | "coral" | "gold-outline";

type Props = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const VARIANTS: Record<BadgeVariant, string> = {
  peach: "bg-peach-soft text-coffee",
  coral: "bg-coral text-white",
  "gold-outline": "border border-gold/60 text-coffee",
};

/** Small-caps pill label. Peach wash, coral fill, or gold-outline. */
export function Badge({ children, variant = "peach", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1",
        "font-body text-eyebrow font-semibold uppercase tracking-label",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
