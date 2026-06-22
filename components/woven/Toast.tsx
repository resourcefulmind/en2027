import { cn } from "@/lib/utils";

/**
 * Bottom-centered confirmation pill, driven by `useToast` (message | null).
 * Presentational only — visibility and text come straight from `message`.
 * Announced politely to assistive tech.
 */
export function Toast({ message }: { message: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-7 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-pill bg-coffee px-[22px] py-[13px] text-[13px] font-semibold text-ivory shadow-[0_10px_30px_rgba(62,44,34,0.28)]",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3.5 opacity-0",
      )}
    >
      <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-coral">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="size-3">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {message ?? ""}
    </div>
  );
}
