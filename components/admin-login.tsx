"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    setLoading(false);
    if (!response.ok) { setError("Email or password is incorrect."); return; }
    router.push("/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="card mx-auto w-full max-w-md space-y-5 p-7 sm:p-9">
    <div className="mb-7 grid size-12 place-items-center border border-acid/40 bg-acid/10 text-acid"><LockKeyhole size={20}/></div>
    <div><label htmlFor="admin-email" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted">Admin email</label><input id="admin-email" name="email" type="email" required autoComplete="username" className="focus-ring min-h-12 w-full border border-line bg-ink px-4"/></div>
    <div><label htmlFor="admin-password" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted">Password</label><input id="admin-password" name="password" type="password" required autoComplete="current-password" className="focus-ring min-h-12 w-full border border-line bg-ink px-4"/></div>
    {error && <p role="alert" className="border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
    <button disabled={loading} className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 bg-acid px-5 font-mono text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-50">{loading ? "Signing in…" : "Sign in"}<LogIn size={16}/></button>
  </form>;
}
