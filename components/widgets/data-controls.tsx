"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Check, Trash, X } from "@phosphor-icons/react/dist/ssr";

const COLLECTED = [
  { label: "Transactions & balances", on: true },
  { label: "Card reward details", on: true },
  { label: "Contacts", on: false },
  { label: "Location history", on: false },
  { label: "Browsing activity", on: false },
];

/**
 * A settings-style panel rather than another consent dialog, so this reads
 * as a distinct moment from the bank-approval screen in the Privacy section.
 * The delete flow is a real two-tap confirm, matching how an actual
 * destructive action should behave, not a single decorative button.
 */
export function DataControls() {
  const [deleted, setDeleted] = useState<"idle" | "confirming" | "done">("idle");
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="inner-edge overflow-hidden rounded-2xl border border-line-2 bg-surface">
        <div className="border-b border-line px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Settings &middot; What Delta knows
          </span>
        </div>

        <ul className="divide-y divide-line px-5 sm:px-6">
          {COLLECTED.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 py-3">
              <span className="text-[13px] text-ink-2">{item.label}</span>
              {item.on ? (
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-delta">
                  <Check size={11} weight="bold" />
                  Collected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-ink-4">
                  <X size={11} weight="bold" />
                  Never collected
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="px-5 py-5 sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            {deleted === "done" ? (
              <motion.div
                key="done"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-lg border border-delta/25 bg-delta-dim/40 px-3.5 py-3"
              >
                <Check size={13} weight="bold" className="shrink-0 text-delta" />
                <span className="text-[12px] leading-relaxed text-ink-2">
                  Deleted. Nothing Delta held about this account remains.
                </span>
              </motion.div>
            ) : deleted === "confirming" ? (
              <motion.div
                key="confirming"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2.5"
              >
                <p className="text-[12px] leading-relaxed text-ink-3">
                  This removes everything Delta holds for this account. It cannot
                  be undone.
                </p>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeleted("done")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-warn/90 py-2.5 text-[12.5px] font-medium text-delta-ink transition-colors duration-200 hover:bg-warn active:translate-y-px"
                  >
                    <Trash size={12} weight="bold" />
                    Confirm delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleted("idle")}
                    className="flex flex-1 items-center justify-center rounded-lg border border-line-2 py-2.5 text-[12.5px] text-ink-3 transition-colors duration-200 hover:border-line-3 hover:text-ink-2 active:translate-y-px"
                  >
                    Keep my data
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="idle"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                type="button"
                onClick={() => setDeleted("confirming")}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-line-2 py-2.5 text-[12.5px] text-ink-3 transition-colors duration-200 hover:border-line-3 hover:text-ink-2 active:translate-y-px"
              >
                <Trash size={12} weight="bold" />
                Delete my data
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
