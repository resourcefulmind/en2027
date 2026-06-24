"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy-to-clipboard with a transient "copied" flag for button feedback. Uses the
 * async Clipboard API, falling back to a hidden textarea + execCommand where it's
 * unavailable (older mobile browsers / non-secure contexts).
 */
export function useCopy(duration = 1900) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch {
          /* no-op: clipboard unavailable */
        }
        ta.remove();
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), duration);
    },
    [duration],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { copied, copy };
}
