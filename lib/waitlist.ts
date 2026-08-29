import { appendFile, mkdir, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export type WaitlistEntry = {
  intent: "waitlist";
  email: string;
  name?: string;
  phone?: string;
  question?: string;
  source: "hero" | "early-access";
  createdAt: string;
};

/**
 * Vercel's deployment bundle is read-only outside /tmp -- writing to a
 * project-relative path throws there. Locally, keep using a project-relative
 * file so `wc -l data/waitlist.jsonl` from the README still works.
 * /tmp on Vercel is itself ephemeral (wiped on cold start, not shared across
 * instances), so this is a best-effort local record, not durable storage --
 * the founder notification email is the real one once RESEND_API_KEY is set.
 */
const STORE_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "delta-waitlist")
  : path.join(process.cwd(), "data");
const STORE_FILE = path.join(STORE_DIR, "waitlist.jsonl");

/**
 * Deliberately permissive: this rejects typos, not unusual-but-valid
 * addresses. No single-quote, no consecutive dots, must have a real TLD.
 */
const EMAIL = /^[^\s@,'"]+@[^\s@.,'"]+(\.[^\s@.,'"]+)+$/;

export function normaliseEmail(raw: string) {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string) {
  const e = normaliseEmail(raw);
  return e.length >= 6 && e.length <= 254 && EMAIL.test(e);
}

/** Digits only, so +91 98765 43210 and 9876543210 dedupe to the same person. */
export function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.length > 10 ? `+${digits}` : `+91${digits}`;
}

export async function alreadyJoined(email: string) {
  try {
    const contents = await readFile(STORE_FILE, "utf8");
    return contents
      .split("\n")
      .filter(Boolean)
      .some((line) => {
        try {
          return (JSON.parse(line) as WaitlistEntry).email === email;
        } catch {
          return false;
        }
      });
  } catch {
    // No file yet means nobody has joined yet.
    return false;
  }
}

export async function persist(entry: WaitlistEntry) {
  try {
    await mkdir(STORE_DIR, { recursive: true });
    await appendFile(STORE_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (error) {
    // A local write failure must never fail the signup itself -- the founder
    // notification email is the actual record once Resend is configured.
    console.error("[waitlist] failed to persist locally:", error);
  }
}

export async function countJoined() {
  try {
    const contents = await readFile(STORE_FILE, "utf8");
    return contents.split("\n").filter(Boolean).length;
  } catch {
    return 0;
  }
}

/**
 * Fires a notification to the founders inbox. Entirely optional: without
 * RESEND_API_KEY set this is a no-op, and a failure here never fails the
 * signup -- the local file is best-effort (see STORE_DIR above), so this and
 * appendToSheet below are the durable records once configured.
 */
export async function notifyFounders(entry: WaitlistEntry, position: number) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "no-api-key" as const };

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    const lines = [
      `Email     ${entry.email}`,
      `Name      ${entry.name || "--"}`,
      `Phone     ${entry.phone || "--"}`,
      `Source    ${entry.source}`,
      `Position  ${position}`,
      "",
      "Question",
      entry.question || "--",
    ].join("\n");

    await resend.emails.send({
      from: process.env.WAITLIST_FROM ?? "Delta <onboarding@resend.dev>",
      to: (process.env.WAITLIST_TO ?? "reach.delta.in@gmail.com").split(","),
      replyTo: entry.email,
      subject: `Delta waitlist #${position} - ${entry.email}`,
      text: lines,
    });

    return { sent: true as const };
  } catch (error) {
    console.error("[waitlist] founder notification failed:", error);
    return { sent: false, reason: "send-failed" as const };
  }
}

/**
 * Appends the signup as a row in a Google Sheet, via a Google Apps Script
 * Web App URL (see README for the five-minute setup -- no service account
 * or Cloud Console needed). Same contract as notifyFounders: a no-op
 * without GOOGLE_SHEETS_WEBHOOK_URL set, and a failure here never fails
 * the signup itself.
 */
export async function appendToSheet(entry: WaitlistEntry, position: number) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { sent: false, reason: "no-webhook-url" as const };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, position }),
    });
    if (!res.ok) throw new Error(`Sheets webhook responded ${res.status}`);
    return { sent: true as const };
  } catch (error) {
    console.error("[waitlist] sheet append failed:", error);
    return { sent: false, reason: "send-failed" as const };
  }
}
