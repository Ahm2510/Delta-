"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowCounterClockwise, Bank, Check, X } from "@phosphor-icons/react/dist/ssr";
import { DeltaMarkSolid } from "../ui/delta-mark";
import { Num } from "../ui/num";

type Decision = "pending" | "approved" | "denied";

const OUTCOME = {
  approved: {
    heading: "Access approved",
    caption: "Approved on your bank's screen. Delta never saw your password.",
  },
  denied: {
    heading: "Access not given",
    caption: "Nothing was shared. This screen belongs to your bank, not Delta.",
  },
} as const;

/**
 * The approval itself happens here, not inside Delta. Deliberately styled as
 * a generic bank/UPI approval screen rather than a real, named bank -- same
 * rule as the card mockups elsewhere on the page. Both outcomes get a full,
 * staggered resolution (icon pop, then heading, then caption) instead of a
 * quick colour tint, so either choice actually feels finished. "Try again"
 * resets it, matching how the other interactive widgets on the page invite
 * replay rather than being a one-shot demo.
 */
export function ConsentScreen() {
  const [decision, setDecision] = useState<Decision>("pending");
  const reduced = useReducedMotion();
  const settled = decision !== "pending";

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="inner-edge overflow-hidden rounded-2xl border border-line-2 bg-surface">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <Bank size={13} weight="bold" className="text-ink-3" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Your bank &middot; approval screen
          </span>
        </div>

        <div className="px-5 pt-6 pb-5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-2 bg-surface-2">
              <DeltaMarkSolid className="h-3 w-3 text-delta" />
            </span>
            <p className="text-[13.5px] leading-snug text-ink-2">
              <span className="font-medium text-ink">Delta</span> is requesting access
              to your account
            </p>
          </div>

          <motion.dl
            animate={reduced ? undefined : { opacity: settled ? 0.45 : 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 divide-y divide-line border-y border-line"
          >
            <div className="flex items-center justify-between py-3">
              <dt className="text-[12px] text-ink-3">Data</dt>
              <dd className="text-[12px] text-ink-2">Balance &amp; transactions</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-[12px] text-ink-3">Permission</dt>
              <dd className="text-[12px] text-ink-2">
                <Num className="text-[12px] text-delta">View only</Num>
              </dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-[12px] text-ink-3">Valid until</dt>
              <dd className="text-[12px] text-ink-2">
                You decide. <Num className="text-ink-2">Cancel anytime</Num>
              </dd>
            </div>
          </motion.dl>

          <div className="mt-5">
            <AnimatePresence mode="wait" initial={false}>
              {decision === "pending" ? (
                <motion.div
                  key="buttons"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-2.5"
                >
                  <button
                    type="button"
                    onClick={() => setDecision("approved")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-delta-fill py-2.5 text-[12.5px] font-medium text-delta-ink transition-colors duration-200 hover:bg-delta active:translate-y-px"
                  >
                    <Check size={12} weight="bold" />
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecision("denied")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line-2 py-2.5 text-[12.5px] text-ink-3 transition-colors duration-200 hover:border-line-3 hover:text-ink-2 active:translate-y-px"
                  >
                    <X size={12} weight="bold" />
                    Deny
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="outcome"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center gap-3 rounded-xl border py-6 text-center ${
                    decision === "approved"
                      ? "border-delta/25 bg-delta-dim/40"
                      : "border-line-2 bg-surface-2"
                  }`}
                >
                  <motion.span
                    initial={reduced ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={
                      reduced
                        ? { duration: 0.2 }
                        : { type: "spring", stiffness: 280, damping: 16, delay: 0.05 }
                    }
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      decision === "approved"
                        ? "bg-delta-fill text-delta-ink"
                        : "border border-line-2 text-ink-3"
                    }`}
                  >
                    {decision === "approved" ? (
                      <Check size={18} weight="bold" />
                    ) : (
                      <X size={18} weight="bold" />
                    )}
                  </motion.span>

                  <motion.div
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: reduced ? 0 : 0.18 }}
                  >
                    <p className="text-[13.5px] font-medium text-ink">
                      {OUTCOME[decision].heading}
                    </p>
                    <p className="mt-1.5 max-w-[26ch] text-[11.5px] leading-relaxed text-ink-4">
                      {OUTCOME[decision].caption}
                    </p>
                  </motion.div>

                  <button
                    type="button"
                    onClick={() => setDecision("pending")}
                    className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-4 transition-colors duration-200 hover:text-ink-2"
                  >
                    <ArrowCounterClockwise size={11} weight="bold" />
                    Try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
