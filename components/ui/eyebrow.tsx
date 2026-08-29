import { DeltaMarkSolid } from "./delta-mark";

/**
 * The section marker: a solid delta, a slash, and the section name in mono.
 * Deliberately not a decorative "SECTION 03" counter -- it names the section.
 */
export function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[11px] leading-none tracking-[0.18em] uppercase">
      <DeltaMarkSolid className="h-2.5 w-2.5 text-delta" />
      <span className="font-mono text-ink-3">/</span>
      <span className="font-mono text-ink-2">{children}</span>
    </div>
  );
}
