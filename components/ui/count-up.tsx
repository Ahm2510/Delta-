"use client";

import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Counts a figure up on first scroll into view, writing straight to the DOM
 * node from a motion value so the count never triggers a React re-render.
 *
 * The server renders the FINAL figure, not zero. These are real market
 * statistics: if scripting or the observer ever fails, the page must still
 * show 400M+, never a wrong 0M+. The zero is introduced client-side in a
 * layout effect (before paint, so there is no flash), and a timeout snaps to
 * the true value if the element somehow never comes into view.
 */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);

  const format = (v: number) => `${prefix}${Math.round(v)}${suffix}`;

  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.textContent = format(v);
  });

  useLayoutEffect(() => {
    if (reduced || !ref.current) return;
    ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (reduced || !inView || started.current) return;
    started.current = true;
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, duration, reduced, value]);

  // Safety net: a real statistic must never sit at zero.
  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => {
      if (!started.current && ref.current) ref.current.textContent = format(to);
    }, 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, reduced]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {format(to)}
    </span>
  );
}
