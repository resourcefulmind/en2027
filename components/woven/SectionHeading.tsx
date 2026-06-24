import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/woven/Eyebrow";

type Props = {
  /** Small-caps eyebrow above the title. */
  eyebrow?: string;
  /** Fraunces h2 title (string or rich nodes for the coral ampersand etc.). */
  title: React.ReactNode;
  /** Optional muted lede beneath the title. */
  lede?: string;
  /** Heading level, defaults to h2 (the section title). */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Eyebrow + Fraunces title (+ optional lede), centered, with balanced wrapping.
 * Titles use fluid clamp() per ui-tokens.md rather than the static --text-h2.
 */
export function SectionHeading({ eyebrow, title, lede, as = "h2", className }: Props) {
  const Heading = as;
  return (
    <header className={cn("flex flex-col items-center gap-4 text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        className="font-display font-medium leading-title tracking-display text-balance text-coffee"
        style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)" }}
      >
        {title}
      </Heading>
      {lede ? (
        <p className="font-body max-w-narrow text-body-lg leading-copy text-coffee-soft">{lede}</p>
      ) : null}
    </header>
  );
}
