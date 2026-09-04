"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Eyebrow } from "../ui/eyebrow";
import { Num } from "../ui/num";
import { Reveal } from "../ui/reveal";
import { MondayDigest } from "../widgets/monday-digest";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    body: "Every account, one approval, via India's official bank-data system, or a statement upload. Delta can only view it, and you can cancel anytime.",
  },
  {
    n: "02",
    title: "Understand",
    body: "A hybrid AI engine categorizes every transaction automatically and learns from your corrections.",
  },
  {
    n: "03",
    title: "Act",
    body: "The Monday Digest, real-time nudges after every payment, and alerts before a bill is due or a goal falls behind. Every claim taps through to the transactions behind it.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.9"],
  });

  // Three discrete values, so this sets state at most twice per pass.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="how-it-works" ref={ref} className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          {/* ------------------------------------------------ pinned step rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow>HOW DELTA WORKS</Eyebrow>
              </Reveal>
              <Reveal index={1}>
                <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(1.85rem,3.5vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.028em] text-ink">
                  Connect. Understand. Act.
                </h2>
              </Reveal>

              <ol className="mt-12 space-y-1">
                {STEPS.map((step, i) => {
                  const on = active === i;
                  return (
                    <li key={step.n} className="relative">
                      <div className="flex gap-5 py-5 pl-5">
                        {on ? (
                          <motion.span
                            layoutId="step-marker"
                            transition={{ type: "spring", stiffness: 220, damping: 28 }}
                            className="absolute top-4 bottom-4 left-0 w-px bg-delta"
                          />
                        ) : (
                          <span className="absolute top-4 bottom-4 left-0 w-px bg-line-2" />
                        )}

                        <Num
                          className={`w-8 shrink-0 pt-1 text-[12px] tracking-[0.12em] transition-colors duration-500 ${
                            on ? "text-delta" : "text-ink-4"
                          }`}
                        >
                          {step.n}
                        </Num>

                        <div>
                          <h3
                            className={`font-display text-xl font-bold tracking-tight transition-colors duration-500 ${
                              on ? "text-ink" : "text-ink-3"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-2.5 max-w-[46ch] text-[14px] leading-relaxed transition-colors duration-500 ${
                              on ? "text-ink-2" : "text-ink-4"
                            }`}
                          >
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* ---------------------------------------------------- digest panel */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1} y={26}>
              <MondayDigest />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
