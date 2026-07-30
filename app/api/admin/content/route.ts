import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getPortfolioContent } from "@/lib/content";
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getPortfolioContent());
}
