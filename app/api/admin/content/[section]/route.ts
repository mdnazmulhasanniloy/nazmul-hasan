import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { editableSections, type EditableSection, updateContentSection } from "@/lib/content";

export async function PUT(request: Request, { params }: { params: Promise<{ section: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { section } = await params;
  if (!editableSections.includes(section as EditableSection)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  const body = await request.json();
  if (body.value === undefined) return NextResponse.json({ error: "Missing value" }, { status: 400 });
  await updateContentSection(section as EditableSection, body.value);
  return NextResponse.json({ ok: true });
}
