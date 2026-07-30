"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 34, filter: "blur(7px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .12 }} transition={{ duration: .72, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.span whileHover={{ scale: 1.025 }} whileTap={{ scale: .975 }} transition={{ type: "spring", stiffness: 400, damping: 24 }} className={className}>{children}</motion.span>;
}
