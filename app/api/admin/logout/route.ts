import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/auth";
import { isSameOrigin } from "@/lib/security";
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, "", { ...adminCookie.options, maxAge: 0 });
  return response;
}
