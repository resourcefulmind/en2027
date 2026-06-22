"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Transient toast controller. `showToast(msg)` displays a message and auto-hides
 * it after `duration`. Returns the current message (or null) for a <Toast>.
 * Shared across sections (Wedding Details, Gifting, Well-Wishes).
 */
export function useToast(duration = 1900) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number>(0);

  const showToast = useCallback(
    (message: string) => {
      setToast(message);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { toast, showToast };
}
