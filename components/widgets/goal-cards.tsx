"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Num } from "../ui/num";

/**
 * The pace marker is the whole point: the bar is where you are, the marker is
 * where you should be by now. Goal B is 1,80,000 short of its marker, which is
 * exactly the shortfall quoted underneath it.
 */
const GOALS = [
  {
    id: "emergency",
    name: "Emergency fund",
    target: "₹3,00,000",
    by: "Dec 2026",
    saved: "₹2,10,000",
    progress: 70,
    pace: 69,
    status: "on pace" as const,
    note: "Holding your current rate clears this seven weeks early.",
  },
  {
    id: "down-payment",
    name: "Down payment",
    target: "₹12,00,000",
    by: "Mar 2028",
    saved: "₹3,64,000",
    progress: 30,
    pace: 45,
    status: "behind pace" as const,
    note: "₹1,80,000 behind pace. Increase SIP by ₹4,200/month to catch up.",
  },
];

export function GoalCards() {
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {GOALS.map((goal, i) => {
        const behind = goal.status === "behind pace";
        return (
          <motion.article
            key={goal.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 130, damping: 22, delay: i * 0.1 }}
            className="inner-edge flex flex-col rounded-2xl border border-line bg-surface p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                {goal.name}
              </h3>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] ${
                  behind
                    ? "border-warn/30 bg-warn/[0.08] text-warn"
                    : "border-delta/30 bg-delta-dim/40 text-delta"
                }`}
              >
                {goal.status}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <Num className="text-[22px] font-medium text-ink">{goal.saved}</Num>
              <span className="text-[13px] text-ink-4">of</span>
              <Num className="text-[13px] text-ink-3">{goal.target}</Num>
            </div>
            <p className="mt-1 font-mono text-[11px] tracking-wide text-ink-4">
              by {goal.by}
            </p>

            {/* progress track with pace marker */}
            <div className="relative mt-6 h-1.5 w-full overflow-visible rounded-full bg-surface-3">
              <motion.div
                initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
                style={{ width: `${goal.progress}%`, transformOrigin: "left" }}
                className={`h-full rounded-full ${behind ? "bg-warn" : "bg-delta"}`}
              />
              <span
                aria-hidden
                style={{ left: `${goal.pace}%` }}
                className="absolute -top-1 h-3.5 w-px -translate-x-1/2 bg-ink-2"
              />
              <span
                style={{ left: `${goal.pace}%` }}
                className="absolute top-4 -translate-x-1/2 font-mono text-[9px] whitespace-nowrap text-ink-4"
              >
                on-pace
              </span>
            </div>

            <p className="mt-10 text-[13px] leading-relaxed text-ink-2">{goal.note}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
