import { Reveal } from "@/components/motion";
import { ArrowUpRight, Award, BookOpen, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import { SkillExplorer } from "@/components/skill-explorer";
import { getPortfolioContent } from "@/lib/content";

export const metadata = { title: "About", description: "Learn about MD Nazmul Hasan’s backend development experience, education, professional courses, and technical expertise.", alternates: { canonical: "/about" } };

export default async function AboutPage() {
  const { courses, education, experience, skills } = await getPortfolioContent();
  return <main id="main" className="pt-28">
    <section className="shell py-16 sm:py-24"><Reveal><p className="eyebrow mb-5">About / Profile</p><h1 className="display max-w-5xl">Engineering for the <span className="text-acid">unhappy path.</span></h1></Reveal>
      <div className="mt-16 grid gap-10 lg:grid-cols-[.35fr_.65fr]"><Reveal><div className="card sticky top-28 p-7"><div className="relative mb-8 aspect-square overflow-hidden border border-line bg-black"><Image src="/logo.png" alt="Nazmul Hasan NH monogram" fill sizes="(min-width: 1024px) 28vw, 90vw" className="object-cover transition-transform duration-700 hover:scale-105"/></div><p className="text-xl font-semibold">MD Nazmul Hasan</p><p className="mt-1 text-muted">Backend Developer</p><div className="mt-6 space-y-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-wider text-muted"><p className="flex gap-2"><MapPin size={14}/> Dhaka, Bangladesh</p><p className="flex gap-2"><BookOpen size={14}/> English · Bangla</p></div></div></Reveal>
      <Reveal delay={.1}><div className="max-w-3xl space-y-7 text-lg leading-[1.8] text-muted"><p className="text-2xl leading-relaxed text-white">I care about the invisible layer—the one that decides whether a product feels instant, whether data remains correct, and whether a team sleeps through the night.</p><p>Over the last five years, I’ve worked across product engineering and backend architecture, building services that process critical workflows and remain understandable as they grow. My approach starts with the domain, maps failure explicitly, and makes observability part of the design rather than an afterthought.</p><p>I gravitate toward small, composable systems and boring technology used exceptionally well. Performance matters. But so do naming, operational clarity, and the next engineer’s ability to make a safe change six months later.</p></div></Reveal></div>
    </section>
    <section className="border-y border-line bg-panel/30 py-20 sm:py-28"><div className="shell">
      <Reveal><p className="eyebrow mb-4">Education</p><h2 className="section-title mb-12">Academic foundation.</h2></Reveal>
      <div className="grid gap-4 lg:grid-cols-2">{education.map((item, index) => <Reveal key={item.index} delay={index * .06}><article className="card group flex h-full flex-col p-7 sm:p-9">
        <div className="flex items-start justify-between"><span className="font-mono text-xs text-acid">{item.index}</span><div className="grid size-12 place-items-center border border-line text-acid transition-colors group-hover:border-acid"><GraduationCap size={21}/></div></div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-[.16em] text-acid">{item.period}{item.current && <span className="ml-3 inline-flex items-center gap-2 text-muted"><span className="size-1.5 rounded-full bg-acid"/>In progress</span>}</p>
        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-.025em] sm:text-3xl">{item.degree}</h3>
        <p className="mt-3 font-medium text-white">{item.institution}</p>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">{item.description}</p>
      </article></Reveal>)}</div>

      <Reveal className="mb-10 mt-20"><p className="eyebrow mb-4">Professional courses</p><h2 className="text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Learning beyond the syllabus.</h2></Reveal>
      <div className="grid gap-4 lg:grid-cols-3">{courses.map((course, index) => <Reveal key={course.title} delay={index * .06}><article className="card group flex h-full flex-col p-7">
        <div className="flex items-center justify-between"><div className="grid size-11 place-items-center border border-line text-acid transition-colors group-hover:border-acid"><Award size={19}/></div><span className="font-mono text-[9px] text-muted">0{index + 1}</span></div>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[.14em] text-acid">{course.period}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-.025em]">{course.title}</h3>
        <p className="mt-2 text-sm font-medium text-white">{course.provider}</p>
        <p className="mb-7 mt-5 flex-1 leading-relaxed text-muted">{course.description}</p>
        <a href={course.certificate} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[.14em] text-white transition-colors hover:text-acid">View certificate <ArrowUpRight size={14}/></a>
      </article></Reveal>)}</div>
    </div></section>
    <section className="shell py-20 sm:py-28"><Reveal><p className="eyebrow mb-4">Career timeline</p><h2 className="section-title mb-14">Production experience.</h2></Reveal><div className="relative border-l border-line pl-7 sm:ml-5 sm:pl-12">{experience.map(x=><Reveal key={`${x.company}-${x.role}`} className="relative mb-14 last:mb-0"><span className="absolute -left-[33px] top-1 size-3 rounded-full border-2 border-acid bg-ink sm:-left-[55px]"/>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2"><p className="font-mono text-[10px] text-acid">{x.period}</p><span className="border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted">{x.mode}</span></div>
      <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{x.role}</h3><p className="mt-1 font-medium text-white">{x.company}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted">{x.location}</p>
      <p className="mt-5 max-w-3xl leading-relaxed text-muted">{x.text}</p>
      <ul className="mt-6 grid max-w-4xl gap-3 text-sm text-muted sm:grid-cols-2">{x.highlights.map(highlight=><li key={highlight} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid"/><span>{highlight}</span></li>)}</ul>
      <div className="mt-6 flex flex-wrap gap-2">{x.tags.map(tag=><span key={tag} className="border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white">{tag}</span>)}</div>
    </Reveal>)}</div></section>
    <section className="border-t border-line py-20 sm:py-28"><div className="shell"><Reveal><p className="eyebrow mb-4">Technical expertise</p><h2 className="section-title mb-5">Built across the stack.</h2><p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted">{skills.length} technologies across four domains—from pixel-conscious interfaces to production backend infrastructure.</p></Reveal><Reveal><SkillExplorer skills={skills} /></Reveal></div></section>
  </main>;
}
