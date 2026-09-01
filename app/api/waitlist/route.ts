import { NextResponse } from "next/server";
import {
  alreadyJoined,
  appendToSheet,
  countJoined,
  isValidEmail,
  normaliseEmail,
  normalisePhone,
  notifyFounders,
  persist,
  type WaitlistEntry,
} from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  email?: unknown;
  name?: unknown;
  phone?: unknown;
  question?: unknown;
  source?: unknown;
};

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, field: "email", message: "That request did not come through. Try again." },
      { status: 400 },
    );
  }

  const rawEmail = str(body.email, 254);

  if (!rawEmail) {
    return NextResponse.json(
      { ok: false, field: "email", message: "An email address is required." },
      { status: 422 },
    );
  }

  if (!isValidEmail(rawEmail)) {
    return NextResponse.json(
      { ok: false, field: "email", message: "That address does not look right. Check it and try again." },
      { status: 422 },
    );
  }

  const email = normaliseEmail(rawEmail);

  try {
    const rawPhone = str(body.phone, 24);
    const entry: WaitlistEntry = {
      intent: "waitlist",
      email,
      name: str(body.name, 80) || undefined,
      phone: rawPhone ? normalisePhone(rawPhone) : undefined,
      question: str(body.question, 1000) || undefined,
      source: body.source === "early-access" ? "early-access" : "hero",
      createdAt: new Date().toISOString(),
    };

    // The Sheet is a real shared store; the local file is best-effort only
    // and can't be trusted alone on Vercel (see lib/waitlist.ts). When the
    // Sheet answers, it is authoritative for both dedup and position.
    const sheet = await appendToSheet(entry);
    let status: "joined" | "already";
    let position: number;

    if (sheet.ok) {
      status = sheet.alreadyJoined ? "already" : "joined";
      position = sheet.position;
      await persist(entry); // best-effort local copy too; harmless if it fails
    } else if (await alreadyJoined(email)) {
      status = "already";
      position = await countJoined();
    } else {
      await persist(entry);
      position = await countJoined();
      status = "joined";
    }

    if (status === "already") {
      return NextResponse.json({
        ok: true,
        status: "already",
        position,
        message: "You are already on the list. Your place is held.",
      });
    }

    // Never let the notification affect what the visitor sees.
    await notifyFounders(entry, position);

    return NextResponse.json({
      ok: true,
      status: "joined",
      position,
      message:
        "You are on the list. Delta is not released yet. We will write the moment your batch opens.",
    });
  } catch (error) {
    console.error("[waitlist] failed to record signup:", error);
    return NextResponse.json(
      { ok: false, field: "email", message: "Something failed on our side. Try again in a moment." },
      { status: 500 },
    );
  }
}
