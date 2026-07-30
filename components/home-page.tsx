"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MagneticButton, Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { IntroMedia } from "@/components/intro-media";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import type { PortfolioContent } from "@/lib/content";
import { SkillExplorer } from "@/components/skill-explorer";

export function HomePage({ content }: { content: PortfolioContent }) {
  const { experience, posts, projects, skills, testimonials, settings } = content;
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 130]);
  return <main id="main">
    <section className="shell relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28">
      <motion.div style={{ y: heroY }} className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="mb-8 flex items-center gap-3">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-acid" /></span>
            <span className="font-mono text-[10px] uppercase tracking-[.2em] text-muted">{settings.availability}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .7, ease: [0.22,1,.36,1] }} className="display max-w-4xl">
            {settings.headline}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .55 }} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {settings.introduction}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .32 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton><Link href="/projects" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 bg-acid px-6 font-mono text-xs font-bold uppercase tracking-[.13em] text-ink">View selected work <ArrowRight size={16} /></Link></MagneticButton>
            <Link href="/contact" className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 border border-line px-6 font-mono text-xs uppercase tracking-[.13em] transition-colors hover:border-white">Discuss a project <ArrowUpRight size={15} /></Link>
          </motion.div>
          <div className="mt-14 grid max-w-xl grid-cols-3 border-y border-line py-5">
            {[["5+", "Years building"], ["30+", "APIs shipped"], ["99.9%", "Uptime mindset"]].map(([v,l]) => <div key={l}><strong className="block font-mono text-xl text-white">{v}</strong><span className="font-mono text-[9px] uppercase tracking-wider text-muted">{l}</span></div>)}
          </div>
        </div>
        <div className="mt-8 lg:mt-0"><IntroMedia /></div>
      </motion.div>
      <a href="#about" aria-label="Scroll to about section" className="focus-ring absolute bottom-6 right-5 grid size-11 place-items-center border border-line text-muted transition-colors hover:border-acid hover:text-acid sm:right-8 lg:right-12"><ArrowDown size={17} /></a>
    </section>

    <div className="overflow-hidden border-y border-line bg-acid py-3 text-ink" aria-hidden="true"><div className="ticker flex w-max gap-10 whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[.18em]">{Array.from({length: 2}).flatMap(() => ["APIs that scale", "•", "Systems that recover", "•", "Data that stays correct", "•", "Software that lasts", "•"]).map((x,i)=><span key={i}>{x}</span>)}</div></div>

    <section id="about" className="shell py-24 sm:py-32">
      <Reveal className="grid gap-12 lg:grid-cols-[.35fr_.65fr]"><div><p className="eyebrow">01 · The approach</p></div><div>
        <h2 className="section-title max-w-4xl">Complexity belongs in the architecture, <span className="text-muted">not in the experience.</span></h2>
        <div className="mt-10 grid gap-8 text-muted sm:grid-cols-2"><p className="leading-relaxed">I’m Nazmul, a backend developer based in Dhaka. I design systems around clear boundaries, measurable behavior, and the uncomfortable failure modes most diagrams leave out.</p><p className="leading-relaxed">My work spans API platforms, distributed workflows, data infrastructure, and production reliability—with a bias toward simple solutions that teams can confidently operate.</p></div>
        <Link href="/about" className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-acid">More about my process <ArrowRight size={15} /></Link>
      </div></Reveal>
    </section>

    <section className="border-y border-line bg-panel/35 py-24 sm:py-32">
      <div className="shell"><Reveal className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow mb-4">02 · Selected systems</p><h2 className="section-title">Work that works.</h2></div><Link href="/projects" className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-white">All projects <ArrowUpRight size={15} /></Link></Reveal>
      <div className="grid gap-4 lg:grid-cols-3">{projects.map((p,i)=><Reveal key={p.slug} delay={i*.06}><ProjectCard project={p}/></Reveal>)}</div></div>
    </section>

    <section className="shell py-24 sm:py-32">
      <Reveal><p className="eyebrow mb-4">03 · Field history</p><h2 className="section-title mb-14">Experience</h2></Reveal>
      <div className="border-t border-line">{experience.map((x)=><Reveal key={`${x.company}-${x.role}`}><article className="group grid gap-5 border-b border-line py-8 transition-colors hover:bg-panel/50 sm:grid-cols-[.22fr_.3fr_.48fr] sm:px-5">
        <div><p className="font-mono text-[10px] tracking-wider text-acid">{x.period}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted">{x.mode}</p></div><div><h3 className="text-xl font-semibold">{x.role}</h3><p className="mt-1 text-sm text-white">{x.company}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted">{x.location}</p></div><div><p className="max-w-xl leading-relaxed text-muted">{x.text}</p><div className="mt-4 flex flex-wrap gap-2">{x.tags.map(t=><span key={t} className="font-mono text-[9px] uppercase tracking-wider text-white">+ {t}</span>)}</div></div>
      </article></Reveal>)}</div>
    </section>

    <section className="border-y border-line py-24 sm:py-32"><div className="shell"><Reveal className="mb-12 grid gap-5 lg:grid-cols-[.45fr_.55fr] lg:items-end"><div><p className="eyebrow mb-4">04 · Expertise</p><h2 className="section-title">Technical <span className="text-acid">skills.</span></h2></div><p className="max-w-xl text-lg leading-relaxed text-muted lg:justify-self-end">{skills.length} technologies across four domains—from component-driven interfaces to production infrastructure.</p></Reveal><Reveal><SkillExplorer compact skills={skills} /></Reveal></div></section>

    <section className="shell py-24 sm:py-32"><Reveal className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-4">05 · From collaborators</p><h2 className="section-title">Trusted under pressure.</h2></div><p className="max-w-xs font-mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-muted">Auto-plays · pauses on interaction · keyboard accessible</p></Reveal>
      <Reveal><TestimonialCarousel testimonials={testimonials} /></Reveal>
    </section>

    <section className="border-t border-line py-24 sm:py-32"><div className="shell"><Reveal className="mb-12 flex items-end justify-between"><div><p className="eyebrow mb-4">06 · Field notes</p><h2 className="section-title">Thinking in systems.</h2></div><Link href="/blog" className="focus-ring hidden min-h-11 items-center font-mono text-xs text-muted hover:text-white sm:flex">READ ALL →</Link></Reveal>
      <div className="grid gap-px bg-line">{posts.slice(0,2).map(post=><Link key={post.slug} href={`/blog/${post.slug}`} className="focus-ring group grid gap-5 bg-ink p-6 transition-colors hover:bg-panel sm:grid-cols-[.2fr_.6fr_.2fr] sm:items-center sm:p-8"><p className="font-mono text-[9px] tracking-wider text-muted">{post.date} · {post.read}</p><div><span className="font-mono text-[9px] text-acid">{post.category}</span><h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h3></div><ArrowUpRight className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid sm:justify-self-end"/></Link>)}</div></div></section>
  </main>;
}
