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
 * at the point someone is asked to connect anything. Every claim here is
 * true of the Account Aggregator framework itself, not a promise specific
 * to Delta, and none of it is a technical claim about Delta's own
 * infrastructure that can't be verified from outside.
 */
const POINTS = [
  {
    icon: Eye,
    title: "Read-only, always",
    body: "There is no channel for Delta to move money, place a trade, or make a payment. The connection only ever flows one way.",
  },
  {
    icon: Key,
    title: "Your password never leaves your bank",
    body: "Approval happens on your bank's own screen or the AA app. Delta asks for access, never for a login.",
  },
  {
    icon: Certificate,
    title: "Regulated, not a workaround",
    body: "Account Aggregators are licensed as NBFC-AAs by the Reserve Bank of India. This is regulated financial infrastructure, not a screen-scraper reading your inbox.",
  },
  {
    icon: ShieldCheck,
    title: "Revoke it in one tap",
    body: "Pull access at any time, from your bank or the AA app. Nothing lingers once you do.",
  },
];

export function Privacy() {
  return (
    <Section id="privacy">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="PRIVACY & SECURITY"
            title="Delta cannot move your money. That is not a policy, it is how the connection works."
            maxWidth="max-w-[22ch]"
          />

          <Reveal index={2}>
            <p className="mt-7 max-w-[54ch] text-[15px] leading-relaxed text-ink-2">
              Account Aggregators do not hand your banking app to anyone. They hand
              over a read-only feed, for exactly what you approve, for exactly as
              long as you approve it. Delta never sees a password, because the
              connection is not built to carry one.
            </p>
          </Reveal>

          <Reveal index={3}>
            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {POINTS.map((point) => (
                <li key={point.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-2 bg-surface">
                    <point.icon size={14} weight="bold" className="text-delta" />
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-medium text-ink">
                      {point.title}
                    </span>
                    <span className="mt-1.5 block max-w-[32ch] text-[13px] leading-relaxed text-ink-3">
                      {point.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={4}>
            <p className="mt-9 flex items-center gap-2 border-t border-line pt-6 text-[12.5px] text-ink-4">
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
