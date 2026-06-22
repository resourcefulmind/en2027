import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * The per-section top connector: a thin coral line fading down into a small gold
 * bead. Stacked atop each section, these read as ONE continuous coral thread down
 * the page (the site's signature — see ui-rules.md). Built once, reused everywhere.
 */
export function ThreadIn({ className }: Props) {
  return (
    <div
      className={cn("relative z-[1] flex flex-col items-center", className)}
      aria-hidden="true"
    >
      {/* coral line, with a faint gold dot partway down (the ::before in the design) */}
      <span
        className="relative w-[1.5px]"
        style={{
          height: "clamp(46px, 9vw, 76px)",
          background: "linear-gradient(transparent, var(--color-coral))",
        }}
      >
        <span
          className="absolute left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-gold"
          style={{ top: "58%" }}
        />
      </span>
      {/* the gold bead, with a soft inner highlight */}
      <span
        className="relative size-2 rounded-full bg-gold"
        style={{ boxShadow: "0 1px 1px rgba(62,44,34,0.3)" }}
      >
        <span className="absolute inset-0.5 rounded-full bg-gold-soft opacity-60" />
      </span>
    </div>
  );
}
