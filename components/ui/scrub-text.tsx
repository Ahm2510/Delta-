"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Fragment, useRef } from "react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Floor is 0.38, not near-zero: if someone lands mid-page or the scroll range
  // never completes, every word must still be readable.
  const opacity = useTransform(progress, range, [0.38, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Words resolve from near-invisible to full as the block scrolls through the
 * viewport. Used sparingly -- twice on the page, on the two lines that carry
 * the argument rather than the mechanics.
 */
export function ScrubText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Resolves fully by the time the block reaches the middle of the viewport,
    // so the reader never arrives at a half-lit sentence.
    offset: ["start 0.92", "end 0.72"],
  });

  const words = children.split(" ");

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {children}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1.4) / words.length]}>
            {word}
          </Word>{" "}
        </Fragment>
      ))}
    </p>
  );
}
