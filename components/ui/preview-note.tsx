/**
 * Sits under every mock UI on the page. Delta has not shipped, and the widgets
 * carry realistic merchant names and rupee amounts -- without this label they
 * read as screenshots of a live product. Quiet, but never omitted.
 */
export function PreviewNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.16em] text-ink-4 uppercase ${className}`}
    >
      <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-ink-4" />
      Product preview &middot; sample data
    </p>
  );
}
