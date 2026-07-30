import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { editableSections, type EditableSection, updateContentSection } from "@/lib/content";
import { isSameOrigin, readJson, validateContentValue } from "@/lib/security";

export async function PUT(request: Request, { params }: { params: Promise<{ section: string }> }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { section } = await params;
    if (!editableSections.includes(section as EditableSection)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });
    const body = await readJson(request) as { value?: unknown };
    if (body?.value === undefined) return NextResponse.json({ error: "Missing value" }, { status: 400 });
    validateContentValue(body.value);
    await updateContentSection(section as EditableSection, body.value);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request." }, { status: 400 });
  }
}
