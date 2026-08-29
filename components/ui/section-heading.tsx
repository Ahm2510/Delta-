import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

/**
 * One heading treatment for every section, so the vertical rhythm never
 * drifts between chapters.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = "",
  maxWidth = "max-w-[19ch]",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal index={1}>
        <h2
          className={`mt-6 font-display text-[clamp(1.85rem,3.5vw,3.1rem)] leading-[1.04] font-bold tracking-[-0.028em] text-balance text-ink ${maxWidth}`}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal index={2}>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-ink-2 sm:text-[16px]">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
