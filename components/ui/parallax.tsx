"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Layered scroll parallax. Positive distance drifts the layer up as the page
 * scrolls past it; negative drifts it down. Springed so it never feels
 * mechanically tied to the scrollbar.
 */
export function Parallax({
  children,
  distance = 60,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Media panels grow from 0.94 to full as they enter. There is deliberately no
 * fade-out on the way past: dimming a panel while someone is still reading the
 * numbers in it is worse than the effect is good, so opacity only ever climbs.
 */
export function ScaleFade({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.15"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.28], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [0.6, 1]);
  const smoothScale = useSpring(scale, { stiffness: 110, damping: 28 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduced ? undefined : { scale: smoothScale, opacity }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
