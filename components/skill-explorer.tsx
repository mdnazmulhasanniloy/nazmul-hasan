"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Boxes, Code2, Database, Layers3, ServerCog } from "lucide-react";
import { technicalSkills, type SkillCategory, type TechnicalSkill } from "@/data/portfolio";

const filters: { label: "All Skills" | SkillCategory; icon: typeof Boxes }[] = [
  { label: "All Skills", icon: Layers3 },
  { label: "Front-End", icon: Code2 },
  { label: "Back-End", icon: ServerCog },
  { label: "Database", icon: Database },
  { label: "DevOps", icon: Boxes },
];

export function SkillExplorer({ compact = false, skills = technicalSkills }: { compact?: boolean; skills?: TechnicalSkill[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["label"]>("All Skills");
  const reduce = useReducedMotion();
  const visible = useMemo(() => active === "All Skills" ? skills : skills.filter(skill => skill.category === active), [active, skills]);

  return <div>
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter technical skills">
      {filters.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} aria-pressed={active === label} className={`focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 font-mono text-[10px] uppercase tracking-[.12em] transition-colors ${active === label ? "border-acid bg-acid text-ink" : "border-line text-muted hover:border-muted hover:text-white"}`}><Icon size={14}/>{label}</button>)}
    </div>
    <motion.div layout className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
      <AnimatePresence mode="popLayout">
        {visible.map((skill, index) => <motion.article layout key={skill.name} initial={reduce ? false : { opacity: 0, scale: .96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, scale: .96 }} transition={{ duration: .28, delay: reduce ? 0 : Math.min(index * .025, .18) }} className="card group overflow-hidden p-5">
          <div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-semibold">{skill.name}</h3><p className="mt-1 text-sm text-muted">{skill.description}</p></div><span className="font-mono text-[9px] uppercase tracking-wider text-acid">{skill.level}</span></div>
          <div className="mt-7 flex items-center gap-4"><div className="h-1 flex-1 overflow-hidden bg-line"><motion.div initial={reduce ? { width: `${skill.percentage}%` } : { width: 0 }} whileInView={{ width: `${skill.percentage}%` }} viewport={{ once: true }} transition={{ duration: .75, delay: .1, ease: [0.22,1,.36,1] }} className="h-full bg-acid"/></div><span className="w-8 text-right font-mono text-[10px] tabular-nums text-white">{skill.percentage}%</span></div>
          <p className="sr-only">{skill.name}: {skill.level}, {skill.percentage} percent proficiency.</p>
        </motion.article>)}
      </AnimatePresence>
    </motion.div>
  </div>;
}
