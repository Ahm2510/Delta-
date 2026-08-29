import type { ReactNode } from "react";

/**
 * Every numeral on this page goes through here. Rupee amounts, percentages,
 * counts, dates, step numbers. Enforces the mono + tabular figure rule so
 * columns of numbers line up and nothing renders in the sans stack by accident.
 */
export function Num({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`font-mono tabular-nums ${className}`}>{children}</span>;
}
