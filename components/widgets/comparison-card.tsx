"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DeltaMark, DeltaMarkSolid } from "../ui/delta-mark";
import { Num } from "../ui/num";
import { PreviewNote } from "../ui/preview-note";

/**
 * The signature widget. Two weekly spend figures with the delta between them.
 * Labelled "weekly spend" rather than "balance" on purpose -- the story below
 * claims 4,120 less spent, and 38,410 minus 34,290 is exactly that, so the
 * arithmetic on the card has to be spend, not balance, to actually hold up.
 */
export function ComparisonCard() {
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="inner-edge overflow-hidden rounded-2xl border border-line-2 bg-surface">
      {/* header rail */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          Delta comparison engine
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-delta">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-delta" />
          Verified
        </span>
      </div>

      <div className="px-4 py-6 sm:px-6 sm:py-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
          Weekly spend
        </span>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
              last week
            </p>
            <p className="mt-1.5">
              <Num className="text-[clamp(1.25rem,4.4vw,1.75rem)] text-ink-3 line-through decoration-ink-4/70 decoration-[1.5px]">
                ₹38,410
              </Num>
            </p>
          </div>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.55 }}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-delta/30 bg-delta-dim/50"
          >
            <DeltaMarkSolid className="h-3.5 w-3.5 text-delta" title="change" />
          </motion.div>

          <div className="min-w-0 text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
              this week
            </p>
            <p className="mt-1.5">
              <Num className="text-[clamp(1.25rem,4.4vw,1.75rem)] font-medium text-ink">
                ₹34,290
              </Num>
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border-l-2 border-delta/60 bg-surface-2/70 px-4 py-3.5">
          <p className="text-[13px] leading-relaxed text-ink-2 sm:text-[14px]">
            &ldquo;You spent <Num className="text-delta">₹4,120</Num> less this week,
            mostly fewer late-night food orders.&rdquo;
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3 sm:px-5">
        <DeltaMark className="h-3 w-3 text-delta" />
        <span className="font-mono text-[10.5px] tracking-wide text-ink-4">
          verified against <Num className="text-ink-3">214</Num> transactions
        </span>
      </div>
    </div>
    <PreviewNote />
    </div>
  );
}
