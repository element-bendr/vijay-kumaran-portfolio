"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "start end"] });
  const reduce = useReducedMotion();
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.section ref={ref} className="hero-grid relative overflow-hidden bg-dark text-light" style={reduce ? {} : { opacity }}>
      {children}
    </motion.section>
  );
}
