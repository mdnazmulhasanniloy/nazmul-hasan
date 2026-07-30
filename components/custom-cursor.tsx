"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type CursorMode = "default" | "view" | "click" | "type";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 900, damping: 55, mass: .35 });
  const ringY = useSpring(y, { stiffness: 900, damping: 55, mass: .35 });
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setFinePointer(media.matches);
    updatePointer();
    media.addEventListener("change", updatePointer);
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) setMode("type");
      else if (target?.closest("a")) setMode("view");
      else if (target?.closest("button, [role='button']")) setMode("click");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      media.removeEventListener("change", updatePointer);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!finePointer || reduce) return null;
  const interactive = mode !== "default";
  const label = mode === "view" ? "VIEW" : mode === "click" ? "CLICK" : mode === "type" ? "TYPE" : "";
  return <>
    <motion.span aria-hidden="true" className="cursor-core pointer-events-none fixed left-0 top-0 z-[9999]" style={{ x, y, translateX: "-50%", translateY: "-50%" }} animate={{ opacity: visible ? 1 : 0, scale: pressed ? 1.8 : interactive ? .7 : 1 }} transition={{ duration: .14 }} />
    <motion.span aria-hidden="true" className="cursor-halo pointer-events-none fixed left-0 top-0 z-[9997]" style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }} animate={{ width: interactive ? 58 : 32, height: interactive ? 58 : 32, opacity: visible ? 1 : 0, scale: pressed ? .78 : 1 }} transition={{ width: { type: "spring", stiffness: 450, damping: 28 }, height: { type: "spring", stiffness: 450, damping: 28 }, scale: { duration: .12 } }}>
      <span className="cursor-orbit"><i/><i/><i/></span>
    </motion.span>
    <motion.span aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9998] overflow-hidden rounded-full border border-acid/25 bg-ink/90 font-mono text-[7px] font-bold tracking-[.12em] text-acid shadow-[0_5px_20px_rgba(0,0,0,.35)] backdrop-blur" style={{ x: ringX, y: ringY }} animate={{ opacity: visible && interactive ? 1 : 0, scale: visible && interactive ? 1 : .5, translateX: 26, translateY: 22 }} transition={{ duration: .18 }}>
      <span className="block px-2 py-1">{label}</span>
    </motion.span>
  </>;
}
