"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Num } from "../ui/num";
import { PreviewNote } from "../ui/preview-note";

type Line = { merchant: string; when: string; amount: string; flag?: string };

type Point = {
  id: string;
  figure: string;
  tone: "up" | "neutral" | "good";
  body: string;
  drawerLabel: string;
  lines: Line[];
};

/**
 * Every drawer reconciles to the figure above it. The food-delivery lines sum
 * to exactly 612 + 544 + 489 + 2,475 = 4,120, and 25,600 set aside against
 * 1,42,000 of inflow is 18%. If a number on this page cannot be reconstructed
 * from the rows under it, it does not belong on the page.
 */
const POINTS: Point[] = [
  {
    id: "food",
    figure: "+23%",
    tone: "up",
    body: "Food delivery ran ₹4,120 above your four-week average. Nine late-night orders did it.",
    drawerLabel: "Transactions behind this",
    lines: [
      { merchant: "Swiggy · Biryani House", when: "Fri 11:48pm", amount: "₹612" },
      { merchant: "Zomato · Late Night Eats", when: "Sat 12:20am", amount: "₹544" },
      { merchant: "Swiggy · Curry Point", when: "Sun 11:31pm", amount: "₹489" },
      { merchant: "+6 more late-night orders", when: "this week", amount: "₹2,475" },
    ],
  },
  {
    id: "recurring",
    figure: "₹649",
    tone: "neutral",
    body: "A new recurring charge appeared: Hotstar renewal. Second streaming service this quarter.",
    drawerLabel: "Recurring charges on file",
    lines: [
      { merchant: "Hotstar · Super", when: "Tue 6:02am", amount: "₹649", flag: "new" },
      { merchant: "Netflix · Standard", when: "3 Sep", amount: "₹499" },
      { merchant: "Spotify · Individual", when: "7 Sep", amount: "₹119" },
    ],
  },
  {
    id: "savings",
    figure: "18%",
    tone: "good",
    body: "Savings rate this week, your best in a month.",
    drawerLabel: "What you set aside",
    lines: [
      { merchant: "SIP · index fund", when: "Mon 9:15am", amount: "₹12,000" },
      { merchant: "Recurring deposit", when: "Wed 8:00am", amount: "₹6,000" },
      { merchant: "Sweep to savings", when: "Sun 11:02pm", amount: "₹7,600" },
      { merchant: "Set aside of ₹1,42,000 inflow", when: "this week", amount: "₹25,600" },
    ],
  },
];

const TONE: Record<Point["tone"], string> = {
  up: "text-warn",
  neutral: "text-ink",
  good: "text-delta",
};

export function MondayDigest() {
  const [open, setOpen] = useState<string | null>("food");
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="inner-edge overflow-hidden rounded-2xl border border-line-2 bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Monday digest
          </span>
          <span className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-4">
            ~120 words
          </span>
        </div>

        <div className="px-5 pt-6 pb-2 sm:px-6">
          <h3 className="font-display text-xl font-bold tracking-tight text-ink">
            Your week, explained
          </h3>
        </div>

        <ul className="px-2 pb-3 sm:px-3">
          {POINTS.map((point) => {
            const isOpen = open === point.id;
            return (
              <li key={point.id} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : point.id)}
                  aria-expanded={isOpen}
                  aria-controls={`digest-${point.id}`}
                  className="group flex w-full items-start gap-4 rounded-lg px-3 py-4 text-left transition-colors duration-300 hover:bg-surface-2/60"
                >
                  <Num
                    className={`w-[3.5rem] shrink-0 pt-px text-[15px] font-medium ${TONE[point.tone]}`}
                  >
                    {point.figure}
                  </Num>
                  <span className="flex-1 text-[13.5px] leading-relaxed text-ink-2">
                    {point.body}
                  </span>
                  <CaretDown
                    size={13}
                    weight="bold"
                    className={`mt-1 shrink-0 text-ink-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-ink-2 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`digest-${point.id}`}
                      key="drawer"
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mx-3 mb-4 rounded-xl border border-line bg-canvas/70 p-4">
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-4">
                          {point.drawerLabel}
                        </p>
                        <ul className="mt-3 divide-y divide-line">
                          {point.lines.map((line) => (
                            <li
                              key={line.merchant}
                              className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                            >
                              <span className="min-w-0 text-[12.5px] text-ink-2">
                                <span className="truncate">{line.merchant}</span>
                                {line.flag ? (
                                  <span className="ml-2 rounded border border-delta/30 px-1.5 py-px font-mono text-[9px] tracking-[0.12em] text-delta uppercase">
                                    {line.flag}
                                  </span>
                                ) : null}
                              </span>
                              <span className="flex shrink-0 items-baseline gap-3">
                                <Num className="text-[11px] text-ink-4">{line.when}</Num>
                                <Num className="w-[4.5rem] text-right text-[12.5px] text-ink">
                                  {line.amount}
                                </Num>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] tracking-wide text-ink-4">
        Tap any line to see the transactions behind it.
      </p>
      <PreviewNote className="mt-2" />
    </div>
  );
}
