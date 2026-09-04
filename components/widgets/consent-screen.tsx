"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Bank, Check, X } from "@phosphor-icons/react/dist/ssr";
import { DeltaMarkSolid } from "../ui/delta-mark";
import { Num } from "../ui/num";

/**
 * The approval itself happens here, not inside Delta. Deliberately styled as
 * a generic bank/UPI consent screen rather than a real, named bank -- same
 * rule as the card mockups elsewhere on the page.
 */
export function ConsentScreen() {
  const [decided, setDecided] = useState<"pending" | "approved">("pending");
  const reduced = useReducedMotion();

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

          <dl className="mt-6 divide-y divide-line border-y border-line">
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
          </dl>

          <motion.div
            animate={{
              backgroundColor: decided === "approved" ? "var(--color-delta-dim)" : "transparent",
            }}
            transition={{ duration: reduced ? 0.01 : 0.4 }}
            className="mt-5 flex gap-2.5 rounded-xl p-1"
          >
            <button
              type="button"
              onClick={() => setDecided("approved")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-delta-fill py-2.5 text-[12.5px] font-medium text-delta-ink transition-colors duration-200 hover:bg-delta active:translate-y-px"
            >
              <Check size={12} weight="bold" />
              Approve
            </button>
            <button
              type="button"
              onClick={() => setDecided("pending")}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line-2 py-2.5 text-[12.5px] text-ink-3 transition-colors duration-200 hover:border-line-3 hover:text-ink-2 active:translate-y-px"
            >
              <X size={12} weight="bold" />
              Deny
            </button>
          </motion.div>
        </div>

        <div className="border-t border-line px-5 py-3.5">
          <p className="text-[11px] leading-relaxed text-ink-4">
            {decided === "approved"
              ? "Approved on your bank's screen. Delta never saw your password."
              : "This screen belongs to your bank, not Delta. Nothing is shared until you approve it here."}
          </p>
        </div>
      </div>
    </div>
  );
}
