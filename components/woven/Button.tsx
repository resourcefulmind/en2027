import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

/**
 * Polymorphic CTA. Renders an <a> when `href` is given (anchor links, Maps,
 * registry), otherwise a <button>. Variants per ui-rules.md:
 *   primary:   coral fill + white label, pill
 *   secondary: gold-hairline outline on ivory
 *   ghost:     quiet text → coral on hover, fine gold underline
 */
type ButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const BASE =
  "inline-flex items-center justify-center font-body uppercase no-underline cursor-pointer " +
  "transition-[background-color,transform,color] duration-150 active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus-ring)] focus-visible:ring-offset-2";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-pill bg-coral text-white font-bold text-[13px] tracking-[0.13em] px-7 py-3.5 " +
    "shadow-[0_1px_2px_rgba(199,95,63,0.25),0_12px_26px_rgba(199,95,63,0.22)] hover:bg-coral-deep",
  secondary:
    "rounded-pill bg-transparent text-coffee font-bold text-[13px] tracking-[0.13em] px-7 py-3.5 " +
    "border border-gold/60 hover:border-gold",
  ghost:
    "relative bg-transparent text-coffee font-semibold text-[13px] tracking-[0.14em] px-0.5 py-1 hover:text-coral " +
    "after:absolute after:inset-x-0.5 after:-bottom-px after:h-px after:bg-gold after:opacity-75 hover:after:opacity-100",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(BASE, VARIANTS[variant], className);

  // Discriminate on href to pick the element; the casts narrow the spread props
  // to the element actually rendered (the union can't be inferred through ...rest).
  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
