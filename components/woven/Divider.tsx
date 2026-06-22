import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Fine gold hairline with a centre diamond — the quiet section separator.
 * Gold appears only as metal here (hairline + diamond), never a fill behind text.
 */
export function Divider({ className }: Props) {
  return (
    <div
      className={cn("flex w-full max-w-[240px] items-center gap-3 text-gold", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-55" />
      <span className="size-1.5 rotate-45 bg-current" />
      <span className="h-px flex-1 bg-current opacity-55" />
    </div>
  );
}
