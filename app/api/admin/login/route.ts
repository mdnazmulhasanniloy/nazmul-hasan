import { NextResponse } from "next/server";
import { adminCookie, createAdminToken } from "@/lib/auth";
import { timingSafeEqual } from "crypto";

function safeEqual(value: string, expected: string) {
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const { email = "", password = "" } = await request.json();
  const valid = safeEqual(String(email), process.env.ADMIN_EMAIL || "") && safeEqual(String(password), process.env.ADMIN_PASSWORD || "");
  if (!valid) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, await createAdminToken(String(email)), adminCookie.options);
  return response;
}
