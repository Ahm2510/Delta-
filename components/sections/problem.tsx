import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";

/**
 * Five items on a six-column track: three at span-2, two at span-3. Both rows
 * fill exactly, so the dense grid has no dead cell at any breakpoint. At the
 * two-column breakpoint the fifth item widens to span-2 for the same reason.
 */
const ITEMS = [
  {
    n: "01",
    title: "Scattered",
    body: "3 banks, 2 cards, UPI, wallets: your money lives in five places with no single picture.",
    span: "lg:col-span-2",
  },
  {
    n: "02",
    title: "Unread",
    body: "Statements and app dashboards show what you spent, never why it matters.",
    span: "lg:col-span-2",
  },
  {
    n: "03",
    title: "Unacted",
    body: "Without a feedback loop, subscriptions creep and savings erode, month after month.",
    span: "lg:col-span-2",
  },
  {
    n: "04",
    title: "Unrewarded",
    body: "Your cards carry perks you're not using and due dates you're not tracking, until a missed payment costs more than the reward ever did.",
    span: "lg:col-span-3",
  },
  {
    n: "05",
    title: "Adrift",
    body: "Investments sit in four different apps, goals live in your head, and nothing tells you if the two still match.",
    span: "sm:col-span-2 lg:col-span-3",
  },
];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="THE PROBLEM"
        title="Money moves constantly. Almost nobody knows why."
        maxWidth="max-w-[16ch]"
      />

      <Reveal index={2}>
        <div className="mt-14 overflow-hidden rounded-2xl border border-line lg:mt-20">
          <div className="grid grid-flow-dense grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-6">
            {ITEMS.map((item, i) => (
              <article
                key={item.n}
                className={`group relative bg-canvas p-7 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface lg:p-8 ${item.span}`}
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-ink-4 transition-colors duration-500 group-hover:text-delta">
                  {item.n}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-ink-2">
                  {item.body}
                </p>
                {/* hairline that draws in from the left on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-delta/50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  style={{ transitionDelay: `${i * 20}ms` }}
                />
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
