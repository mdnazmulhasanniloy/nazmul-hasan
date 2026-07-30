"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, Globe2, Smartphone } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} className="card group relative overflow-hidden p-6 sm:p-8">
    <div className="absolute right-0 top-0 size-28 translate-x-12 -translate-y-12 rounded-full bg-acid/0 blur-3xl transition-colors duration-500 group-hover:bg-acid/10" />
    {project.image && <div className="-mx-6 -mt-6 mb-7 aspect-[16/10] overflow-hidden border-b border-line sm:-mx-8 sm:-mt-8"><img src={project.image} alt={`${project.title} project preview`} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/></div>}
    <div className={`${project.image ? "mb-10" : "mb-16"} flex items-start justify-between`}><span className="font-mono text-xs text-acid">{project.index} / 06</span><ArrowUpRight className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid" size={20} /></div>
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-muted">{project.kicker}</p>
    <h3 className="mb-4 text-3xl font-semibold tracking-[-.04em]">{project.title}</h3>
    <p className="mb-7 max-w-md leading-relaxed text-muted">{project.description}</p>
    <div className="mb-8 flex flex-wrap gap-2">{project.stack.map(x => <span key={x} className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{x}</span>)}</div>
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
      <Link href={`/projects/${project.slug}`} className="focus-ring inline-flex min-h-11 items-center border-b border-acid font-mono text-[11px] uppercase tracking-[.15em] text-white">Explore project</Link>
      <div className="flex gap-1">{project.links.slice(0,3).map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} ${link.label}`} className="focus-ring grid size-11 place-items-center text-muted transition-colors hover:text-acid">{link.kind === "github" ? <Github size={15}/> : link.kind === "web" ? <Globe2 size={15}/> : <Smartphone size={15}/>}</a>)}</div>
    </div>
  </motion.article>;
}
