import { NextResponse } from "next/server";
import { adminCookie, createAdminToken } from "@/lib/auth";
import { isSameOrigin, readJson, safeEqual } from "@/lib/security";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  const entry = !current || current.resetAt <= now ? { count: 0, resetAt: now + WINDOW_MS } : current;
  if (entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429, headers: { "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)) } });
  }
  try {
    const body = await readJson(request) as { email?: unknown; password?: unknown };
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const valid = safeEqual(email, process.env.ADMIN_EMAIL || "") && safeEqual(password, process.env.ADMIN_PASSWORD || "");
    if (!valid) {
      entry.count += 1;
      attempts.set(key, entry);
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    attempts.delete(key);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookie.name, await createAdminToken(email), adminCookie.options);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
