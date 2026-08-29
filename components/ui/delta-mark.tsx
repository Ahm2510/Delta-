type Props = { className?: string; title?: string };

/**
 * The Delta mark. A hollow triangle drawn on the same optical weight as the
 * wordmark next to it. Kept as a primitive so the logo, section markers and
 * verification badges are literally the same glyph.
 */
export function DeltaMark({ className = "h-4 w-4", title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 3.4 21.2 20.6H2.8L12 3.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Solid variant, used where the mark reads as a status icon rather than a logo. */
export function DeltaMarkSolid({ className = "h-3 w-3", title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 3.4 21.2 20.6H2.8L12 3.4Z" fill="currentColor" />
    </svg>
  );
}
