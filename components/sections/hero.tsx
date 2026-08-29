import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PrimaryCta } from "../ui/cta";
import { Parallax } from "../ui/parallax";
import { Reveal } from "../ui/reveal";
import { ComparisonCard } from "../widgets/comparison-card";

const PILLS = [
  "Auto-categorized in real time",
  "Cards & due dates",
  "Investment goals",
  "Always-on dashboard",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* measured graph paper, faded out before it reaches the copy */}
      <div
        aria-hidden
        className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12 lg:items-start">
          {/* ---------------------------------------------------- copy column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal mount>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface/60 py-1.5 pr-4 pl-3">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-delta" />
                <span className="font-mono text-[11px] tracking-[0.06em] text-ink-2">
                  Pre-launch &middot; Delta is not yet released
                </span>
              </span>
            </Reveal>

            <Reveal mount index={1}>
              <h1 className="mt-7 font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
                <span className="block text-balance text-ink-2">
                  Every rupee leaves a trace.
                </span>
                <span className="block text-balance text-ink">Delta reads the story.</span>
              </h1>
            </Reveal>

            <Reveal mount index={2}>
              <p className="mt-7 max-w-[58ch] text-[15px] leading-relaxed text-ink-2 sm:text-[16.5px]">
                Delta connects your accounts, finds what actually changed each week, and
                explains it in plain language, with every figure checked against your
                real transactions before you see it.
              </p>
            </Reveal>

            <Reveal mount index={3}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {PILLS.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-line bg-surface/50 px-3 py-1.5 text-[12px] text-ink-3"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal mount index={4}>
              <div className="mt-10">
                <PrimaryCta href="#early-access" className="group px-7 py-3.5 text-[14px]">
                  Get early access
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                  />
                </PrimaryCta>
                <p className="mt-4 max-w-md text-[12px] leading-relaxed text-ink-3">
                  Delta hasn&rsquo;t launched yet. Joining the waitlist reserves your place
                  for launch.
                </p>
                <p className="mt-1.5 max-w-md text-[12px] leading-relaxed text-ink-4">
                  We&rsquo;re onboarding in small batches. No ads, ever. We never sell your
                  data.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------- demo card column
              Offset down and pulled left so it overlaps the copy column's track
              on wide screens -- the asymmetry is the point. */}
          <div className="lg:col-span-5 lg:-ml-6 lg:pt-16 xl:-ml-12">
            <Reveal mount index={2} y={28}>
              <Parallax distance={34}>
                <ComparisonCard />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
