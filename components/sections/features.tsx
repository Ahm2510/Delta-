import type { ReactNode } from "react";
import { Num } from "../ui/num";
import { Parallax, ScaleFade } from "../ui/parallax";
import { PreviewNote } from "../ui/preview-note";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { CardStack } from "../widgets/card-stack";
import { GoalCards } from "../widgets/goal-cards";
import { LiveDashboard } from "../widgets/live-dashboard";
import { SpendNotification } from "../widgets/spend-notification";

/** Full-width hairline strip carrying a sourced market figure. */
function StatFootnote({ children, source }: { children: ReactNode; source: string }) {
  return (
    <Reveal>
      <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 lg:mt-20">
        <p className="max-w-[70ch] text-[13.5px] leading-relaxed text-ink-3">{children}</p>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
          {source}
        </span>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------- 5. media left, prose right */

export function MomentYouSpend() {
  return (
    <Section id="the-moment-you-spend">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5 lg:order-1">
          <ScaleFade>
            <Parallax distance={26}>
              <SpendNotification />
            </Parallax>
          </ScaleFade>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:order-2">
          <SectionHeading
            eyebrow="THE MOMENT YOU SPEND"
            title="Tagged before you've locked your phone."
            maxWidth="max-w-[15ch]"
          />
          <Reveal index={2}>
            <p className="mt-7 max-w-[58ch] text-[15px] leading-relaxed text-ink-2">
              The instant a payment clears, Delta surfaces it: Dynamic Island on
              iPhone, a smart notification on Android, with its best guess at the
              category. Confirm with a tap, or swipe to change it. Correct it once and Delta
              remembers: your dog walker goes under &lsquo;Family,&rsquo; not
              &lsquo;Services,&rsquo; from then on.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-7 max-w-[58ch] border-l border-delta/40 pl-5 text-[14px] leading-relaxed text-ink-3">
              No monthly clean-up. Every transaction is tagged the moment it happens, so
              the digest and dashboard are never working from stale data.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------- 6. split heading row, then full-width panel */

export function AlwaysCurrent() {
  return (
    <Section id="dashboard">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="BEYOND THE WEEKLY DIGEST"
            title={
              <>
                The Monday Digest tells the story. The dashboard lets you dig in.
              </>
            }
            maxWidth="max-w-[18ch]"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <Reveal index={2}>
            <p className="max-w-[58ch] text-[15px] leading-relaxed text-ink-2">
              Every tagged transaction feeds a live dashboard: spend by category this month,
              a six-month trend, every recurring charge in one list, how this month compares
              to your usual, available anytime, not just Monday.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal index={1}>
        <div className="mt-14 lg:mt-20">
          <ScaleFade>
            <LiveDashboard />
          </ScaleFade>
          <PreviewNote />
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-8 font-mono text-[11.5px] tracking-wide text-ink-4">
          Same verified numbers as the Digest. Two ways to read them.
        </p>
      </Reveal>
    </Section>
  );
}

/* ----------------- 7. full-width heading, offset card stack, prose right */

export function CardsDecoded() {
  return (
    <Section id="cards">
      <SectionHeading
        eyebrow="SCAN ONCE, KNOW ALWAYS"
        title="You know your card number. Do you know what it actually gets you?"
        maxWidth="max-w-[24ch]"
      />

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 lg:mt-20 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5 lg:col-start-2">
          <Parallax distance={20}>
            <CardStack />
          </Parallax>
          <PreviewNote />
        </div>

        <div className="lg:col-span-4 lg:col-start-8 lg:pt-6">
          <Reveal index={1}>
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
              Scan any credit or debit card and Delta shows its real reward structure:
              cashback rate, lounge access, milestone bonuses, and, for
              credit cards, when the bill is actually due. A reminder days before, not a
              late fee after.
            </p>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-6 max-w-[52ch] text-[14px] leading-relaxed text-ink-3">
              Most people leave real money on the table every year in perks they never
              claimed, then pay a late fee on top. This is the first place that surfaces
              both, before either one costs you.
            </p>
          </Reveal>
        </div>
      </div>

      <StatFootnote source="RBI Payment Systems Report, June 2025">
        India has <Num className="text-ink-2">1.1 billion+</Num> credit and debit cards in
        circulation, and almost none of them ship with a due-date reminder.
      </StatFootnote>
    </Section>
  );
}

/* --------------------------------- 8. narrow prose rail, wide goal cards */

export function Goals() {
  return (
    <Section id="goals">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="SET IT, DELTA WATCHES IT"
              title="Your goals shouldn't live in a spreadsheet you forgot about."
              maxWidth="max-w-[16ch]"
            />
            <Reveal index={2}>
              <p className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
                Connect investment accounts the same way as your bank, one consent,
                via the Account Aggregator framework. Set a goal: an amount, a date.
                Delta checks your actual portfolio against it every week, ahead,
                on pace, or behind, and by how much.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-6 max-w-[46ch] text-[14px] leading-relaxed text-ink-3">
                Goals fail quietly, in a file nobody reopens. This one does the arithmetic
                every week and says something while there is still time to catch up.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <GoalCards />
          <PreviewNote />
        </div>
      </div>

      <StatFootnote source="SEBI / NSDL / CDSL data, Oct 2025">
        India crossed <Num className="text-ink-2">210 million</Num> demat accounts in 2025,
        most sitting in an app that shows a portfolio, not whether it&rsquo;s still
        on track for anything.
      </StatFootnote>
    </Section>
  );
}

