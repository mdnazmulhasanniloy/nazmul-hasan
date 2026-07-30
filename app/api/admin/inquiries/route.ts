import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getInquiries } from "@/lib/inquiries";

export async function GET(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const requested = Number(new URL(request.url).searchParams.get("page") || 1);
  const page = Number.isInteger(requested) ? Math.max(1, requested) : 1;
  return NextResponse.json(await getInquiries(page, 5));
}
