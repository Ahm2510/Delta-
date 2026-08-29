"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Num } from "../ui/num";

const CATEGORIES = [
  { name: "Food & Dining", amount: 9240, label: "₹9,240" },
  { name: "Shopping", amount: 6430, label: "₹6,430" },
  { name: "Transport", amount: 3120, label: "₹3,120" },
  { name: "Subscriptions", amount: 2890, label: "₹2,890" },
];

const SUBSCRIPTIONS = [
  { name: "Hotstar · Super", amount: "₹649" },
  { name: "Netflix · Standard", amount: "₹499" },
  { name: "Amazon Prime", amount: "₹299" },
  { name: "Spotify · Individual", amount: "₹119" },
  { name: "Cult.fit · Elite", amount: "₹1,324" },
];

/** Six real months. The September figure is the same 21,680 the bars add up to. */
const TREND = [
  { month: "Apr", value: 24180, label: "₹24,180" },
  { month: "May", value: 22640, label: "₹22,640" },
  { month: "Jun", value: 26910, label: "₹26,910" },
  { month: "Jul", value: 23470, label: "₹23,470" },
  { month: "Aug", value: 25020, label: "₹25,020" },
  { month: "Sep", value: 21680, label: "₹21,680", current: true },
];

const MAX_CATEGORY = Math.max(...CATEGORIES.map((c) => c.amount));
const MAX_TREND = Math.max(...TREND.map((t) => t.value));

export function LiveDashboard() {
  const reduced = useReducedMotion();

  const grow = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { scaleX: 0, opacity: 0 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <div className="inner-edge overflow-hidden rounded-2xl border border-line-2 bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          This month &middot; September
        </span>
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
            total
          </span>
          <Num className="text-[13px] text-ink">₹21,680</Num>
        </span>
      </div>

      {/* dense bento: 2 + 1 fills row one, 3 fills row two. No dead cells. */}
      <div className="grid grid-flow-dense grid-cols-1 gap-px bg-line lg:grid-cols-3">
        {/* --------------------------------------------- spend by category */}
        <div className="bg-surface p-5 sm:p-6 lg:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
            Spend by category
          </p>
          <ul className="mt-5 space-y-4">
            {CATEGORIES.map((cat, i) => (
              <li key={cat.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] text-ink-2">{cat.name}</span>
                  <Num className="text-[13px] text-ink">{cat.label}</Num>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-3">
                  <motion.div
                    {...grow(i * 0.08)}
                    style={{
                      width: `${(cat.amount / MAX_CATEGORY) * 100}%`,
                      transformOrigin: "left",
                    }}
                    className={`h-full rounded-full ${i === 0 ? "bg-delta" : "bg-line-3"}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------ recurring */}
        <div className="bg-surface p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
            Recurring
          </p>
          <ul className="mt-5 divide-y divide-line">
            {SUBSCRIPTIONS.map((sub) => (
              <li key={sub.name} className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="truncate text-[12.5px] text-ink-2">{sub.name}</span>
                <Num className="shrink-0 text-[12.5px] text-ink-3">{sub.amount}</Num>
              </li>
            ))}
          </ul>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-delta/25 bg-delta-dim/40 px-3 py-1.5">
            <Num className="text-[11px] text-delta">5</Num>
            <span className="text-[11px] text-ink-2">active subscriptions</span>
            <span className="text-ink-4">&middot;</span>
            <Num className="text-[11px] text-ink-2">₹2,890/mo</Num>
          </div>
        </div>

        {/* -------------------------------------------------- six-month trend */}
        <div className="bg-surface p-5 sm:p-6 lg:col-span-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
              Six-month trend
            </p>
            <span className="flex items-center gap-1.5">
              <ArrowDown size={11} weight="bold" className="text-delta" />
              <Num className="text-[12px] text-delta">₹2,303</Num>
              <span className="text-[12px] text-ink-3">below your six-month average</span>
            </span>
          </div>

          <div className="mt-6 grid grid-cols-6 items-end gap-2 sm:gap-3">
            {TREND.map((point, i) => (
              <div key={point.month} className="group flex flex-col items-center gap-2">
                <Num
                  className={`text-[10px] transition-colors duration-300 ${
                    point.current ? "text-delta" : "text-ink-4 group-hover:text-ink-3"
                  }`}
                >
                  {point.label}
                </Num>
                <div className="flex h-24 w-full items-end sm:h-28">
                  <motion.div
                    initial={reduced ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + i * 0.06,
                    }}
                    style={{
                      height: `${(point.value / MAX_TREND) * 100}%`,
                      transformOrigin: "bottom",
                    }}
                    className={`w-full rounded-t-sm ${
                      point.current ? "bg-delta" : "bg-line-3 group-hover:bg-ink-4"
                    } transition-colors duration-300`}
                  />
                </div>
                <Num
                  className={`text-[10px] uppercase tracking-[0.1em] ${
                    point.current ? "text-ink-2" : "text-ink-4"
                  }`}
                >
                  {point.month}
                </Num>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
