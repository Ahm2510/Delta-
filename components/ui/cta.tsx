import type { ReactNode } from "react";
import { Magnetic } from "./magnetic";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[13px] font-medium tracking-tight " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:translate-y-px";

/** Green fill, near-black label. Never the reverse -- the text must stay readable. */
export function PrimaryCta({
  href,
  children,
  className = "",
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
}) {
  const link = (
    <a
      href={href}
      className={`${base} bg-delta-fill px-5 py-2.5 text-delta-ink hover:bg-delta ${className}`}
    >
      {children}
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

export function GhostCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} border border-line-2 px-5 py-2.5 text-ink-2 hover:border-line-3 hover:text-ink ${className}`}
    >
      {children}
    </a>
  );
}
