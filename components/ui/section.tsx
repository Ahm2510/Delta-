import type { ReactNode } from "react";

/**
 * Consistent vertical rhythm across every section transition, plus the
 * horizontal hairline that separates one chapter from the next.
 */
export function Section({
  id,
  children,
  className = "",
  divider = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative ${divider ? "border-t border-line" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        {children}
      </div>
    </section>
  );
}
