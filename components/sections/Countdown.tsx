"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Live ceremony countdown (Feature 05, built with the Hero). Ticks every second
 * toward content.event.isoDateTime. Hydration-safe: renders stable "00"
 * placeholders on the server and first client paint, then starts ticking after
 * mount — so server and client markup always match. Keeps ticking under
 * reduced-motion (it's live information, not decorative motion).
 */

const UNITS = [
  { key: "d", label: "Days" },
  { key: "h", label: "Hours" },
  { key: "m", label: "Minutes" },
  { key: "s", label: "Seconds" },
] as const;

type Parts = Record<(typeof UNITS)[number]["key"], number>;

function remaining(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff % 864e5) / 36e5),
    m: Math.floor((diff % 36e5) / 6e4),
    s: Math.floor((diff % 6e4) / 1e3),
  };
}

export function Countdown({ className }: { className?: string }) {
  // null until mounted → both server and first client render show placeholders.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(content.event.isoDateTime).getTime();
    const update = () => setParts(remaining(target));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn("flex items-stretch gap-[clamp(12px,3vw,20px)]", className)}
      role="timer"
      aria-label="Time remaining until the ceremony"
    >
      {UNITS.map((unit, i) => (
        <div key={unit.key} className="flex items-stretch gap-[clamp(12px,3vw,20px)]">
          {i > 0 && (
            <span
              aria-hidden="true"
              className="w-px self-stretch bg-[rgba(194,155,69,0.45)]"
            />
          )}
          <div className="flex min-w-[clamp(44px,12vw,58px)] flex-col items-center gap-1.5">
            <span className="font-display text-[clamp(26px,8vw,40px)] font-medium leading-none tabular-nums text-coffee">
              {parts ? String(parts[unit.key]).padStart(2, "0") : "00"}
            </span>
            <span className="text-[clamp(8px,2vw,9.5px)] font-semibold uppercase tracking-[0.2em] text-coffee-soft">
              {unit.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
