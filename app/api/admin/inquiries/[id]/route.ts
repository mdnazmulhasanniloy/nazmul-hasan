import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteInquiry } from "@/lib/inquiries";
import { isSameOrigin } from "@/lib/security";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const deleted = await deleteInquiry((await params).id);
  if (!deleted) return NextResponse.json({ error: "Message not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
