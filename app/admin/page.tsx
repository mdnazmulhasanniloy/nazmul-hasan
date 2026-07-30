import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdmin } from "@/lib/auth";
import { getPortfolioContent } from "@/lib/content";

export const metadata = { title: "Admin Dashboard", robots: { index: false, follow: false } };
export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const content = await getPortfolioContent();
  return <main id="main" className="shell min-h-dvh pb-20 pt-24 sm:pt-28"><div className="mb-7 border-b border-line pb-7 sm:mb-10 sm:pb-9"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="eyebrow mb-3">Administration / Live CMS</p><h1 className="text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Manage portfolio content.</h1></div><div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.14em] text-muted"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-50"/><span className="relative size-2 rounded-full bg-acid"/></span>Database connected · Changes publish live</div></div></div><AdminDashboard initialContent={content}/></main>;
}
