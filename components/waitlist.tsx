"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useId, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { DeltaMark } from "./ui/delta-mark";

type Status = "idle" | "submitting" | "joined" | "already" | "error";

type Result = {
  ok: boolean;
  status?: "joined" | "already";
  message: string;
  position?: number;
};

const INPUT =
  "w-full rounded-lg border border-line-2 bg-surface-2 px-4 py-3 text-[14px] text-ink " +
  "placeholder:text-ink-4 transition-colors duration-200 hover:border-line-3 " +
  "focus:border-line-3 focus:outline-none";

const LABEL = "block text-[11px] font-mono uppercase tracking-[0.16em] text-ink-3";

function useWaitlist(source: "hero" | "early-access") {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);

  const submit = useCallback(
    async (payload: Record<string, string>) => {
      setStatus("submitting");
      setMessage("");
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, source }),
        });
        const data = (await res.json()) as Result;
        setMessage(data.message);
        if (!data.ok) {
          setStatus("error");
          return false;
        }
        setPosition(data.position ?? null);
        setStatus(data.status === "already" ? "already" : "joined");
        return true;
      } catch {
        setStatus("error");
        setMessage("No connection. Check your network and try again.");
        return false;
      }
    },
    [source],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  return { status, message, position, submit, reset };
}

/* -------------------------------------------------------- early access form */

export function EarlyAccessForm() {
  const { status, message, position, submit, reset } = useWaitlist("early-access");
  const [form, setForm] = useState({ name: "", phone: "", email: "", question: "" });
  const reduced = useReducedMotion();
  const id = useId();

  const busy = status === "submitting";
  const done = status === "joined" || status === "already";
  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (status === "error") reset();
  };

  if (done) {
    return (
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
        className="inner-edge rounded-2xl border border-delta/25 bg-surface p-8 sm:p-10"
      >
        <DeltaMark className="h-6 w-6 text-delta" />
        <p className="mt-6 font-display text-2xl leading-tight tracking-tight text-ink">
          {status === "already" ? "You were already in." : "You’re in."}
        </p>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-2">{message}</p>
        {position ? (
          <div className="mt-6 flex items-baseline gap-3 border-t border-line pt-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
              Your place
            </span>
            <span className="font-mono text-xl text-delta">
              #{String(position).padStart(3, "0")}
            </span>
          </div>
        ) : null}
        <p className="mt-6 text-[12px] leading-relaxed text-ink-4">
          Onboarding runs in small batches, in order. Nothing else arrives in your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit(form);
      }}
      noValidate
      className="inner-edge rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={id + "-name"} className={LABEL}>
            Name
          </label>
          <input
            id={id + "-name"}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            className={INPUT}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={id + "-phone"} className={LABEL}>
            Phone
          </label>
          <div className="flex items-stretch rounded-lg border border-line-2 bg-surface-2 transition-colors duration-200 hover:border-line-3 focus-within:border-line-3">
            <span className="flex items-center border-r border-line-2 px-3.5 font-mono text-[13px] text-ink-3">
              +91
            </span>
            <input
              id={id + "-phone"}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              className="w-full bg-transparent px-3.5 py-3 font-mono text-[14px] text-ink placeholder:text-ink-4 focus:outline-none"
            />
          </div>
          <p className="text-[12px] leading-relaxed text-ink-4">
            We&rsquo;ll text you when it&rsquo;s your turn. No spam, ever.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={id + "-email"} className={LABEL}>
            Email <span className="text-delta">*</span>
          </label>
          <input
            id={id + "-email"}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? id + "-error" : undefined}
            className={INPUT}
          />
          {status === "error" ? (
            <p id={id + "-error"} role="alert" className="text-[12px] text-warn">
              {message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={id + "-question"} className={LABEL}>
            What&rsquo;s your biggest money question right now?{" "}
            <span className="normal-case tracking-normal text-ink-4">(optional)</span>
          </label>
          <textarea
            id={id + "-question"}
            name="question"
            rows={3}
            placeholder="Where does my money actually go every month?"
            value={form.question}
            onChange={(e) => set("question")(e.target.value)}
            className={INPUT + " resize-none"}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-delta-fill px-6 py-3.5 text-[14px] font-medium text-delta-ink transition-colors duration-200 hover:bg-delta active:translate-y-px disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {busy ? "Adding you" : "Get early access"}
        {busy ? (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-delta-ink/30 border-t-delta-ink" />
        ) : (
          <ArrowRight
            size={15}
            weight="bold"
            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
          />
        )}
      </button>

      <p className="mt-5 text-[12px] leading-relaxed text-ink-4">
        Delta is not yet released. We&rsquo;re onboarding in small batches. No ads,
        ever. We never sell your data.
      </p>
    </form>
  );
}
