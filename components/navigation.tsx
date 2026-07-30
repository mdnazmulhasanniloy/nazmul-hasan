"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" },
  { href: "/projects", label: "Work" }, { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(scrollY > 24); onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="shell flex h-[72px] items-center justify-between" aria-label="Primary navigation">
        <Link href="/" className="focus-ring flex min-h-11 items-center gap-3" aria-label="MD Nazmul Hasan, home">
          <span className="relative grid size-10 place-items-center overflow-hidden border border-acid/40 bg-black"><Image src="/logo.png" alt="" fill sizes="40px" className="object-cover" priority /></span>
          <span className="hidden font-mono text-[10px] uppercase leading-tight tracking-[.15em] text-muted sm:block">MD Nazmul Hasan<br /><span className="text-white">Backend Engineer</span></span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(link => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return <Link key={link.href} href={link.href} className={`focus-ring relative min-h-11 px-4 py-3 font-mono text-[11px] uppercase tracking-[.14em] transition-colors ${active ? "text-acid" : "text-muted hover:text-white"}`}>{link.label}{active && <motion.span layoutId="nav-active" className="absolute inset-x-4 bottom-1 h-px bg-acid" />}</Link>;
          })}
        </div>
        <Link href="/contact" className="focus-ring hidden min-h-11 items-center border border-line px-5 font-mono text-[11px] uppercase tracking-[.14em] transition-colors hover:border-acid hover:bg-acid hover:text-ink md:flex">Start a project</Link>
        <button onClick={() => setOpen(v => !v)} className="focus-ring grid size-11 place-items-center border border-line md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={19} /> : <Menu size={19} />}</button>
      </nav>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-y border-line bg-ink px-5 py-5 md:hidden">
          {links.map((link, i) => <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .04 }}><Link href={link.href} className={`focus-ring flex min-h-12 items-center border-b border-line font-mono text-sm uppercase tracking-wider ${pathname === link.href ? "text-acid" : "text-white"}`}>{link.label}</Link></motion.div>)}
        </motion.div>}
      </AnimatePresence>
    </header>
  );
}
