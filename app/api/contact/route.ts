import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/inquiries";
import { isSameOrigin, readJson } from "@/lib/security";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_MESSAGES = 5;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = attempts.get(ip);
  const entry = !current || current.resetAt <= now ? { count: 0, resetAt: now + WINDOW_MS } : current;
  if (entry.count >= MAX_MESSAGES) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }
  try {
    const body = await readJson(request) as Record<string, unknown>;
    if (body.website) return NextResponse.json({ ok: true });
    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const company = clean(body.company, 150);
    const message = clean(body.message, 5000);
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
    }
    await createInquiry({
      name,
      email,
      company,
      message,
      ipHash: createHash("sha256").update(`${process.env.AUTH_SECRET}:${ip}`).digest("hex"),
    });
    entry.count += 1;
    attempts.set(ip, entry);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The message could not be saved." }, { status: 400 });
  }
}
