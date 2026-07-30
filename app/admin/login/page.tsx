import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/admin-login";
import { isAdmin } from "@/lib/auth";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };
export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <main id="main" className="shell grid min-h-dvh place-items-center pb-20 pt-28"><div className="w-full"><div className="mx-auto mb-8 max-w-md"><p className="eyebrow mb-3">Private workspace</p><h1 className="text-4xl font-semibold tracking-tight">Portfolio admin</h1></div><AdminLogin/></div></main>;
}
