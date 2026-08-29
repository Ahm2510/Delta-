"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Index within a group -- drives the waterfall cascade. */
  index?: number;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  /**
   * Animate on mount instead of on scroll-into-view. Use for anything above
   * the fold: that content is visible immediately, so making it wait on an
   * IntersectionObserver only risks it never appearing.
   */
  mount?: boolean;
};

/**
 * Reveal. Index-based stagger rather than parent variants, so the children can
 * stay server-rendered and still cascade.
 * Under prefers-reduced-motion this collapses to a plain opacity fade.
 */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  y = 18,
  className = "",
  once = true,
  mount = false,
}: Props) {
  const reduced = useReducedMotion();
  const wait = delay + index * 0.07;

  // Reduced motion means no entrance at all -- not a shorter one. This also
  // means the content is never gated behind an animation that has to run.
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(mount
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 } })}
      viewport={mount ? undefined : { once, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.7, delay: wait }}
    >
      {children}
    </motion.div>
  );
}
