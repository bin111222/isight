"use client";

import { useState, useEffect, useRef } from "react";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Smooth count-up animation. Returns current value and whether animation has started.
 * duration in ms; start when inView is true.
 */
export function useCountUp(
  end: number,
  options: { duration?: number; inView: boolean; suffix?: string }
): string {
  const { duration = 1800, inView, suffix = "" } = options;
  const [display, setDisplay] = useState("0");
  const startTime = useRef<number | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    startTime.current = null;

    const tick = (now: number) => {
      if (startTime.current === null) startTime.current = now;
      const elapsed = now - startTime.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(t);
      const current = Math.round(eased * end);
      setDisplay(String(current) + suffix);

      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, inView, suffix]);

  return display;
}
