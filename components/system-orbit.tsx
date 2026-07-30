"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function SystemOrbit() {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 90, damping: 20 }), sy = useSpring(ry, { stiffness: 90, damping: 20 });
  const rotateX = useTransform(sy, [-.5, .5], [8, -8]), rotateY = useTransform(sx, [-.5, .5], [-8, 8]);
  const reduce = useReducedMotion();
  return <div className="perspective relative mx-auto aspect-square w-full max-w-[580px]" onPointerMove={e => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); rx.set((e.clientX-r.left)/r.width-.5); ry.set((e.clientY-r.top)/r.height-.5); }} onPointerLeave={() => { rx.set(0); ry.set(0); }}>
    <motion.div style={reduce ? {} : { rotateX, rotateY }} className="absolute inset-[8%] transform-gpu">
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-[28%] rounded-full border border-line bg-panel shadow-glow" />
      <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[7%] rounded-full">
        <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-acid shadow-[0_0_24px_#c7ff4a]" />
        <span className="absolute bottom-[12%] left-[8%] size-2 rounded-full bg-cyan shadow-[0_0_18px_#7ee7f2]" />
      </motion.div>
      <div className="absolute inset-[38%] grid place-items-center border border-acid/40 bg-ink text-center">
        <div><span className="font-mono text-[9px] uppercase tracking-[.18em] text-muted">system</span><strong className="block font-mono text-xl text-acid">HEALTHY</strong></div>
      </div>
      {["API", "DATA", "QUEUE", "CACHE"].map((x, i) => <span key={x} className="absolute border border-line bg-ink px-2 py-1 font-mono text-[9px] text-muted" style={{ left: `${i % 2 ? 78 : 4}%`, top: `${12 + i * 21}%` }}>{x} · 200</span>)}
    </motion.div>
  </div>;
}
