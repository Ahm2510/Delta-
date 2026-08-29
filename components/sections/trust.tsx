"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eyebrow } from "../ui/eyebrow";
import { Num } from "../ui/num";
import { Reveal } from "../ui/reveal";
import { ScrubText } from "../ui/scrub-text";

const NODES = [
  {
    n: "01",
    title: "Compute",
    body: "Deterministic code calculates every statistic. The AI never does arithmetic.",
  },
  {
    n: "02",
    title: "Select",
    body: "Observations are ranked by materiality: rupee impact × deviation from your norm.",
  },
  {
    n: "03",
    title: "Narrate",
    body: "The model writes the story, but is structurally forbidden from introducing any new number.",
  },
  {
    n: "04",
    title: "Verify",
    body: "Every figure in the output is checked against the input facts. A mismatch is rejected before it ships.",
  },
];

export function Trust() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.7"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const scaleY = scaleX;

  return (
    <section id="trust" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>WHY IT CAN BE TRUSTED</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.85rem,3.5vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.028em] text-ink">
                The numbers are computed. The AI only narrates.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-20">
            <ScrubText className="max-w-[56ch] text-[15px] leading-relaxed text-ink-2">
              Every number Delta shows you is computed the same way, whether that&rsquo;s in
              the digest, the dashboard, a card alert, or a goal check-in.
            </ScrubText>
          </div>
        </div>

        {/* ------------------------------------------------- pipeline of four */}
        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* the track, and the line that draws along it as you scroll */}
          <div
            aria-hidden
            className="absolute top-3 left-[7px] h-[calc(100%-1.5rem)] w-px bg-line lg:top-[7px] lg:left-0 lg:h-px lg:w-full"
          >
            <motion.div
              style={
                reduced
                  ? undefined
                  : {
                      scaleY,
                      scaleX,
                      transformOrigin: "top left",
                    }
              }
              className="h-full w-full bg-delta/70"
            />
          </div>

          <ol className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {NODES.map((node, i) => (
              <li key={node.n} className="relative pl-10 lg:pt-10 lg:pl-0">
                <NodeDot progress={progress} index={i} reduced={!!reduced} />
                <div className="flex items-baseline gap-2.5">
                  <Num className="text-[12px] tracking-[0.14em] text-ink-4">{node.n}</Num>
                  <span className="font-mono text-[12px] text-ink-4">&rarr;</span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                    {node.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-ink-2">
                  {node.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ------------------------------------------------------- the callout */}
        <Reveal>
          <div className="mt-20 rounded-2xl border border-line bg-surface/60 px-6 py-14 text-center sm:px-12 lg:mt-28 lg:py-20">
            <ScrubText className="mx-auto max-w-[26ch] font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-ink">
              A hallucinated number is structurally impossible here, not just unlikely.
            </ScrubText>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Dot that fills in once the drawing line has reached its position. */
function NodeDot({
  progress,
  index,
  reduced,
}: {
  progress: ReturnType<typeof useSpring>;
  index: number;
  reduced: boolean;
}) {
  const threshold = index / NODES.length;
  const opacity = useTransform(progress, [threshold, threshold + 0.14], [0, 1]);

  return (
    <span
      aria-hidden
      className="absolute top-1 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-line-2 bg-canvas lg:top-0"
    >
      <motion.span
        style={reduced ? undefined : { opacity }}
        className="block h-[5px] w-[5px] rounded-full bg-delta"
      />
    </span>
  );
}
