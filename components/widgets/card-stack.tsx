"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CaretLeft, CaretRight, Warning } from "@phosphor-icons/react/dist/ssr";
import { DeltaMarkSolid } from "../ui/delta-mark";
import { Num } from "../ui/num";

/**
 * Card mockups stay generic by design. Attaching invented reward structures to
 * a real, named bank product would be a claim we cannot stand behind, so every
 * card here is identified only by its last four digits.
 */
type Card = {
  id: string;
  last4: string;
  kind: "Credit" | "Debit";
  rewards: string;
  lounge: string;
  due: { label: string; amount: string; minimum: string } | null;
  tint: string;
};

const CARDS: Card[] = [
  {
    id: "a",
    last4: "4821",
    kind: "Credit",
    rewards: "2% on dining & groceries",
    lounge: "4 lounge visits/quarter (2 used)",
    due: { label: "3 Sept", amount: "₹18,420", minimum: "₹930" },
    tint: "from-[#1c2a24] to-[#0c0e15]",
  },
  {
    id: "b",
    last4: "5164",
    kind: "Credit",
    rewards: "5% on travel bookings",
    lounge: "1 lounge visit/quarter (0 used)",
    due: { label: "18 Sept", amount: "₹6,780", minimum: "₹340" },
    tint: "from-[#1a2436] to-[#0c0e15]",
  },
  {
    id: "c",
    last4: "7302",
    kind: "Debit",
    rewards: "1% back on fuel & utilities",
    lounge: "No lounge programme",
    due: null,
    tint: "from-[#2a2436] to-[#0c0e15]",
  },
];

export function CardStack() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const card = CARDS[active];

  const move = (dir: 1 | -1) =>
    setActive((i) => (i + dir + CARDS.length) % CARDS.length);

  return (
    <div>
      {/* ------------------------------------------------------ coverflow */}
      {/* overflow-hidden so the fanned-out cards clip at the container edge
          instead of pushing the page sideways on a 375px screen */}
      <div
        className="relative h-[210px] w-full overflow-hidden [perspective:1400px] sm:h-[240px]"
        role="group"
        aria-label="Your cards"
      >
        {CARDS.map((c, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Card ending ${c.last4}`}
              aria-current={i === active}
              animate={
                reduced
                  ? { opacity: i === active ? 1 : 0.35 }
                  : {
                      x: offset * 44,
                      z: -abs * 100,
                      rotateY: offset * -17,
                      scale: 1 - abs * 0.06,
                      opacity: abs > 2 ? 0 : 1 - abs * 0.2,
                    }
              }
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              style={{ zIndex: CARDS.length - abs, transformStyle: "preserve-3d" }}
              className="absolute inset-x-0 mx-auto block h-[190px] w-[268px] cursor-pointer sm:h-[215px] sm:w-[340px]"
            >
              <span
                className={`inner-edge flex h-full w-full flex-col justify-between rounded-2xl border border-line-2 bg-gradient-to-br ${c.tint} p-5 text-left`}
              >
                <span className="flex items-start justify-between">
                  <DeltaMarkSolid className="h-3.5 w-3.5 text-delta" />
                  <Num className="text-[10px] uppercase tracking-[0.18em] text-ink-4">
                    {c.kind}
                  </Num>
                </span>
                <span>
                  <Num className="block text-[15px] tracking-[0.22em] text-ink-2">
                    ···· ···· ···· {c.last4}
                  </Num>
                  <span className="mt-2 block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-4">
                    Card ending {c.last4}
                  </span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* --------------------------------------------------------- controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous card"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line-2 text-ink-3 transition-colors duration-200 hover:border-line-3 hover:text-ink active:translate-y-px"
        >
          <CaretLeft size={13} weight="bold" />
        </button>
        <div className="flex gap-1.5">
          {CARDS.map((c, i) => (
            <span
              key={c.id}
              className={`h-1 rounded-full transition-all duration-400 ${
                i === active ? "w-5 bg-delta" : "w-1 bg-line-3"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next card"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line-2 text-ink-3 transition-colors duration-200 hover:border-line-3 hover:text-ink active:translate-y-px"
        >
          <CaretRight size={13} weight="bold" />
        </button>
      </div>

      {/* ------------------------------------------------ decoded read-out */}
      <motion.div
        key={card.id}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="inner-edge mt-6 rounded-2xl border border-line bg-surface"
      >
        <div className="border-b border-line px-5 py-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Card ending <Num className="text-delta">{card.last4}</Num>
          </span>
        </div>

        <dl className="divide-y divide-line">
          <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
              Rewards
            </dt>
            <dd className="text-right text-[13px] text-ink-2">{card.rewards}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
              Lounge
            </dt>
            <dd className="text-right text-[13px] text-ink-2">{card.lounge}</dd>
          </div>
        </dl>

        {card.due ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-warn/[0.06] px-5 py-4">
            <span className="flex items-center gap-2">
              <Warning size={13} weight="bold" className="text-warn" />
              <span className="text-[13px] text-ink-2">
                Bill due <Num className="text-warn">{card.due.label}</Num>
              </span>
            </span>
            <span className="flex items-baseline gap-3">
              <Num className="text-[14px] text-ink">{card.due.amount}</Num>
              <span className="text-[12px] text-ink-4">
                min <Num>{card.due.minimum}</Num>
              </span>
            </span>
          </div>
        ) : (
          <div className="border-t border-line px-5 py-4">
            <span className="text-[13px] text-ink-3">
              Debit card. Nothing falls due, nothing to miss.
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
