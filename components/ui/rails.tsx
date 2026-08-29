/**
 * The two vertical hairlines that run the full height of the viewport, locked
 * to the content container. Everything on the page measures itself against
 * them -- it is the structural device that makes the layout read as
 * infrastructure rather than as a stack of cards.
 */
export function Rails() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none">
      <div className="mx-auto h-full w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="h-full w-full border-x border-line" />
      </div>
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(168,197,180,0.055),transparent_70%)]" />
    </div>
  );
}
