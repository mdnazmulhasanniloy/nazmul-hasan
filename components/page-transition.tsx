"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: reduce ? "auto" : "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
