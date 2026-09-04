import { Database, EyeSlash, LockKey, Trash } from "@phosphor-icons/react/dist/ssr";
import { Parallax, ScaleFade } from "../ui/parallax";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { DataControls } from "../widgets/data-controls";

/**
 * The companion to the Privacy section above: that one answers "can this
 * touch my bank account," this one answers "what happens to my data once
 * Delta has it." Kept to claims that are true regardless of what Delta's
 * backend looks like in practice -- policy commitments (no selling, delete
 * on request, minimal collection) and one platform-level fact (HTTPS in
 * transit, true of anything hosted the way this is). Deliberately avoids
 * claims that would require knowing Delta's actual infrastructure to verify
 * -- no named encryption standard, no certification, no audit claim.
 */
const POINTS = [
  {
    icon: EyeSlash,
    question: "Who gets to see my spending habits?",
    lead: "No one you didn't choose.",
    body: "Delta does not sell data, share it with advertisers, or hand it to data brokers. No version of this business runs on your information being someone else's product.",
  },
  {
    icon: LockKey,
    question: "Is my data protected on the way there?",
    lead: "Encrypted, always.",
    body: "Every request between your phone and Delta travels over an encrypted connection, the same standard your bank's own app uses. Nothing moves in the open.",
  },
  {
    icon: Database,
    question: "What do you even collect?",
    lead: "Only what the feature needs.",
    body: "Transactions, balances, and the card details you scan yourself. No contacts, no location history, no browsing activity. If a feature does not need it, Delta does not ask for it.",
  },
  {
    icon: Trash,
    question: "Can I delete everything?",
    lead: "Whenever you ask.",
    body: "Close your account and Delta deletes what it holds. There is no retained copy sitting around after you leave.",
  },
];

export function DataSafety() {
  return (
    <Section id="data-safety">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <ScaleFade>
            <Parallax distance={22}>
              <DataControls />
            </Parallax>
          </ScaleFade>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow="AFTER YOU CONNECT"
            title="What actually happens to your data, once Delta has it."
            maxWidth="max-w-[24ch]"
          />

          <Reveal index={2}>
            <p className="mt-7 max-w-[54ch] text-[15px] leading-relaxed text-ink-2">
              Connecting an account answers one worry. This is the other one:
              what happens to the data itself, once Delta can see it.
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
            <p className="mt-7 text-[12.5px] text-ink-4">
              No ads, ever. Delta is not funded by your data, and never will be.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
