"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { DeltaMark } from "./ui/delta-mark";
import { PrimaryCta } from "./ui/cta";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#the-moment-you-spend" },
  { label: "For investors", href: "#investors" },
];

export function SiteNav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);

  // Toggles at most twice per scroll direction, so this is not a per-frame render.
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    setSolid((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(9,10,15,0.82)" : "rgba(9,10,15,0)",
        borderBottomColor: solid ? "#1b1f28" : "rgba(27,31,40,0)",
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Delta, back to top"
        >
          <DeltaMark className="h-[18px] w-[18px] text-delta transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-px" />
          <span className="font-display text-[17px] font-bold tracking-tight text-ink">
            Delta
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-[13px] text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <PrimaryCta href="#early-access" magnetic={false}>
            Get early access
          </PrimaryCta>
        </div>
      </nav>
    </motion.header>
  );
}
