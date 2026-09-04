import { ArrowUpRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { CountUp } from "../ui/count-up";
import { DeltaMark } from "../ui/delta-mark";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { EarlyAccessForm } from "../waitlist";

/* ------------------------------------------------------------ 10. why now */

const STATS = [
  { to: 400, suffix: "M+", body: "Indians transacting digitally", span: "lg:col-span-3" },
  {
    to: 100,
    suffix: "M+",
    body: "consents already processed on the Account Aggregator rails",
    span: "lg:col-span-4",
  },
  {
    to: 750,
    suffix: "M+",
    body: "smartphones: the wedge is insight, the expansion is the financial home screen",
    span: "lg:col-span-5",
  },
];

export function WhyNow() {
  return (
    <Section id="why-now">
      <SectionHeading
        eyebrow="WHY NOW"
        title="The rails are live. The insight layer isn't."
        maxWidth="max-w-[15ch]"
      />

      {/* Asymmetric spans rather than three equal cards: 3 + 4 + 5 = 12. */}
      <div className="mt-14 grid grid-cols-1 border-t border-line lg:mt-20 lg:grid-cols-12">
        {STATS.map((stat, i) => (
          <Reveal key={stat.suffix + stat.to} index={i} className={stat.span}>
            <div className="h-full border-b border-line px-0 py-8 lg:border-b-0 lg:border-l lg:px-8 lg:py-10 lg:first:border-l-0 lg:first:pl-0">
              <CountUp
                to={stat.to}
                suffix={stat.suffix}
                className="block text-[clamp(2.5rem,5vw,4rem)] leading-none font-medium tracking-[-0.03em] text-delta"
              />
              <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-ink-2">
                {stat.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------- 11. early access */

export function EarlyAccess() {
  return (
    <Section id="early-access">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="EARLY ACCESS"
              title="See what changed in your money before anyone else does."
              maxWidth="max-w-[16ch]"
            />
            <Reveal index={2}>
              <p className="mt-7 max-w-[48ch] text-[15px] leading-relaxed text-ink-2">
                Delta hasn&rsquo;t launched yet. Join the waitlist and tell us the one
                money question you can never quite answer. Early members are onboarded
                first, in order.
              </p>
            </Reveal>

            <Reveal index={3}>
              <div className="mt-9 flex items-start gap-3 border-t border-line pt-7">
                <ShieldCheck size={15} weight="bold" className="mt-0.5 shrink-0 text-delta" />
                <p className="max-w-[42ch] text-[13px] leading-relaxed text-ink-3">
                  Delta can only view your account, never touch it, and Delta never
                  sees your bank password. Cancel anytime.{" "}
                  <a
                    href="#privacy"
                    className="text-ink-2 underline decoration-line-3 underline-offset-4 transition-colors duration-200 hover:text-delta hover:decoration-delta/50"
                  >
                    See exactly how the connection works
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal index={1} y={22}>
            <EarlyAccessForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- 12. for investors
   Deliberately quiet. No button, no card, nothing competing with the consumer
   call to action above it. */

export function Investors() {
  return (
    <section id="investors" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4 lg:col-span-3 lg:pt-1">
              For investors
            </span>
            <p className="max-w-[62ch] text-[14px] leading-relaxed text-ink-3 lg:col-span-8">
              Delta is raising its pre-seed round. If you invest in financial infrastructure
              for India (connect, categorize, cards, investments, one home screen), we&rsquo;d
              like to talk.{" "}
              <a
                href="mailto:reach.delta.in@gmail.com?subject=Delta%20pre-seed"
                className="group inline-flex items-baseline gap-1 text-ink-2 underline decoration-line-3 underline-offset-4 transition-colors duration-200 hover:text-delta hover:decoration-delta/50"
              >
                reach.delta.in@gmail.com
                <ArrowUpRight
                  size={11}
                  weight="bold"
                  className="translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 13. footer */

const FOOTER_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Early access", href: "#early-access" },
  { label: "For investors", href: "#investors" },
  { label: "Contact", href: "mailto:reach.delta.in@gmail.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Delta, back to top">
            <DeltaMark className="h-[18px] w-[18px] text-delta transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-px" />
            <span className="font-display text-[17px] font-bold tracking-tight text-ink">
              Delta
            </span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-ink-3 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-[12px] leading-relaxed text-ink-3">
            Delta is not yet released. Every screen shown on this page is a product
            preview with sample data.
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-relaxed text-ink-4">
              Built on India&rsquo;s Account Aggregator framework. You control every consent.
            </p>
            <p className="font-mono text-[11px] tracking-wide text-ink-4">
              Δ Delta, 2026. No ads. We never sell your data.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
