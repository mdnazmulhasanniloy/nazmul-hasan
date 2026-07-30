"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials as defaultTestimonials } from "@/data/portfolio";

export function TestimonialCarousel({ testimonials = defaultTestimonials }: { testimonials?: typeof defaultTestimonials }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const move = useCallback((direction: number) => setActive(v => (v + direction + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setInterval(() => move(1), 6500);
    return () => window.clearInterval(timer);
  }, [move, paused, reduce]);

  const item = testimonials[active];
  return (
    <div className="relative overflow-hidden border border-line bg-panel/65" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="absolute right-[-8%] top-[-50%] size-80 rounded-full bg-acid/[.07] blur-3xl" />
      <div className="grid min-h-[430px] lg:grid-cols-[.7fr_.3fr]">
        <div className="relative flex flex-col justify-between p-7 sm:p-12 lg:p-16">
          <Quote className="mb-12 text-acid" size={34} strokeWidth={1.5} />
          <div className="relative min-h-[190px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure key={active} initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduce ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
                <blockquote className="max-w-4xl text-balance text-2xl font-medium leading-[1.35] tracking-[-.025em] sm:text-3xl lg:text-4xl">“{item.quote}”</blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <strong>{item.name}</strong><span className="text-muted">—</span>
                  <span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted">{item.role}, {item.company}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between border-t border-line p-7 lg:border-l lg:border-t-0 lg:p-9">
          <div><span className="font-mono text-7xl font-semibold tracking-[-.08em] text-white/10">0{active + 1}</span><p className="mt-1 font-mono text-[9px] uppercase tracking-[.2em] text-muted">of 0{testimonials.length} endorsements</p></div>
          <div>
            <div className="mb-6 flex gap-2" role="group" aria-label="Choose testimonial">{testimonials.map((t, i) => <button key={t.name} onClick={() => setActive(i)} className="focus-ring flex min-h-11 flex-1 items-center" aria-label={`Show review ${i + 1} from ${t.name}`} aria-pressed={i === active}><span className={`h-px w-full transition-colors ${i === active ? "bg-acid" : "bg-line hover:bg-muted"}`} /></button>)}</div>
            <div className="flex gap-2"><button onClick={() => move(-1)} className="focus-ring grid size-12 place-items-center border border-line transition-colors hover:border-acid hover:text-acid" aria-label="Previous review"><ArrowLeft size={17} /></button><button onClick={() => move(1)} className="focus-ring grid size-12 place-items-center border border-line transition-colors hover:border-acid hover:text-acid" aria-label="Next review"><ArrowRight size={17} /></button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
