import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { getPortfolioContent } from "@/lib/content";

export async function Footer() {
  const { settings } = await getPortfolioContent();
  return <footer className="border-t border-line">
    <div className="shell grid gap-10 py-12 md:grid-cols-2 md:items-end">
      <div><p className="eyebrow mb-4">Build something dependable</p><p className="max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">Have a hard backend problem?<br /><Link href="/contact" className="link-line text-acid">Let’s make it boring.</Link></p></div>
      <div className="md:text-right">
        <div className="mb-7 flex flex-wrap gap-4 md:justify-end">
          <a href={settings.github} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-white"><Github size={15}/>GitHub<ArrowUpRight size={12}/></a>
          <a href={settings.linkedin} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-white"><Linkedin size={15}/>LinkedIn<ArrowUpRight size={12}/></a>
          <a href={settings.instagram} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-white"><Instagram size={15}/>Instagram<ArrowUpRight size={12}/></a>
          <a href={`mailto:${settings.email}`} className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-white"><Mail size={15}/>Email</a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">© {new Date().getFullYear()} MD Nazmul Hasan · Dhaka, Bangladesh</p>
      </div>
    </div>
  </footer>;
}
