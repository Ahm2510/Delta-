import { Bank, Certificate, Eye, Key, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Parallax, ScaleFade } from "../ui/parallax";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { ConsentScreen } from "../widgets/consent-screen";

/**
 * This is a different kind of trust than the AI-accuracy section further
 * down the page. That one answers "can I trust the numbers." This one
 * answers "can I trust this with my bank account" -- the actual hesitation
 * at the point someone is asked to connect anything, and the one that has
 * cost real signups. Structured as the exact questions a skeptical visitor
 * is silently asking, answered before they have to type them anywhere.
 * Every answer is true of the Account Aggregator framework itself, not a
 * promise specific to Delta, and none of it is a claim about Delta's own
 * unbuilt infrastructure that can't be verified from outside.
 */
const POINTS = [
  {
    icon: Eye,
    question: "Can Delta spend or move my money?",
    lead: "Never.",
    body: "Delta can only look at your balance and your past spending. It has no way to send money, pay a bill, invest, or buy anything on your behalf. That option does not exist, for anyone.",
  },
  {
    icon: Key,
    question: "Will you see my bank password?",
    lead: "Never.",
    body: "You type your password only inside your own bank's app, never inside Delta. We ask permission to look. We are never shown the key.",
  },
  {
    icon: Certificate,
    question: "Is this actually safe, or a workaround?",
    lead: "RBI-approved.",
    body: "This connection runs on India's official system for sharing account information safely. It is watched over by the Reserve Bank of India, the same authority that already regulates your bank.",
  },
  {
    icon: ShieldCheck,
    question: "Can I stop this later?",
    lead: "Whenever you want.",
    body: "Turn it off from your own bank's app in a few taps. The moment you do, access ends completely. Nothing keeps running in the background.",
  },
];

export function Privacy() {
  return (
    <Section id="privacy">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="BEFORE YOU CONNECT ANYTHING"
            title="What actually happens to your money, before you have to ask."
            maxWidth="max-w-[22ch]"
          />

          <Reveal index={2}>
            <p className="mt-7 max-w-[54ch] text-[15px] leading-relaxed text-ink-2">
              You are being asked to connect a bank account to an app that
              has not launched yet. That is worth pausing over, so here is
              exactly what does, and does not, happen when you do.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="inner-edge mt-9 rounded-2xl border border-line bg-surface/60 p-6 sm:p-7">
              <ul className="flex flex-col divide-y divide-line">
                {POINTS.map((point) => (
                  <li key={point.question} className="flex items-start gap-3.5 py-5 first:pt-0 last:pb-0">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-2 bg-surface">
                      <point.icon size={14} weight="bold" className="text-delta" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-medium text-ink">
                        {point.question}
                      </span>
                      <span className="mt-1.5 block max-w-[38ch] text-[13px] leading-relaxed text-ink-3">
                        <span className="font-medium text-delta">{point.lead}</span>{" "}
                        {point.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal index={4}>
            <p className="mt-7 flex items-center gap-2 text-[12.5px] text-ink-4">
              <Bank size={12} weight="bold" className="shrink-0" />
              No ads, ever. We never sell your data. There is nothing else this runs
              on.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ScaleFade>
            <Parallax distance={22}>
              <ConsentScreen />
            </Parallax>
          </ScaleFade>
        </div>
      </div>
    </Section>
  );
}
