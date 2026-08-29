"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowsClockwise, Check } from "@phosphor-icons/react/dist/ssr";
import { DeltaMarkSolid } from "../ui/delta-mark";
import { Num } from "../ui/num";
import { PreviewNote } from "../ui/preview-note";

const CATEGORIES = ["Food & Dining", "Work", "Subscriptions"];

export function SpendNotification() {
  const [selected, setSelected] = useState(CATEGORIES[0]);
  const [confirmed, setConfirmed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[320px]">
      {/* phone shell */}
      <div className="inner-edge rounded-[2.5rem] border border-line-2 bg-surface p-2.5">
        <div className="relative overflow-hidden rounded-[2.1rem] border border-line bg-canvas px-3 pt-3 pb-5">
          {/* dynamic island */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="mx-auto flex h-8 w-fit min-w-[104px] items-center justify-center gap-2 rounded-full bg-surface-2 px-3.5"
          >
            <DeltaMarkSolid className="h-2.5 w-2.5 text-delta" />
            <Num className="text-[11px] text-ink-2">₹340</Num>
          </motion.div>

          {/* the notification itself */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 170, damping: 22, delay: 0.2 }}
            className="mt-5 rounded-2xl border border-line-2 bg-surface/90 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-3">
                <DeltaMarkSolid className="h-2 w-2 text-delta" />
                Delta
              </span>
              <Num className="text-[9.5px] uppercase tracking-[0.16em] text-ink-4">now</Num>
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-3">
              <p className="text-[14px] font-medium text-ink">Blue Tokai Coffee</p>
              <Num className="text-[15px] text-ink">₹340</Num>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const on = selected === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelected(cat);
                      setConfirmed(false);
                    }}
                    aria-pressed={on}
                    className={`relative rounded-full px-2.5 py-1.5 text-[11px] transition-colors duration-300 ${
                      on ? "text-delta-ink" : "border border-line-2 text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    {on ? (
                      <motion.span
                        layoutId="category-chip"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-delta-fill"
                      />
                    ) : null}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setConfirmed((c) => !c)}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line-2 py-2 text-[11px] text-ink-3 transition-colors duration-300 hover:border-line-3 hover:text-ink-2"
            >
              {confirmed ? (
                <>
                  <Check size={11} weight="bold" className="text-delta" />
                  <span className="text-delta">Tagged as {selected}</span>
                </>
              ) : (
                <>
                  <Check size={11} weight="bold" />
                  Tap to confirm &middot; swipe to change
                </>
              )}
            </button>
          </motion.div>

          {/* the learning line */}
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-surface/50 px-3.5 py-3">
            <ArrowsClockwise size={12} weight="bold" className="mt-0.5 shrink-0 text-delta" />
            <p className="text-[11.5px] leading-relaxed text-ink-3">
              You&rsquo;ve corrected &lsquo;Urban Company&rsquo; to &lsquo;Home&rsquo;{" "}
              <Num className="text-ink-2">3</Num> times. Applying automatically.
            </p>
          </div>
        </div>
      </div>
      <PreviewNote />
    </div>
  );
}
