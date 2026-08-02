"use client";

import { motion, MotionConfig, useReducedMotion, type Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function MotionSection({ children, className, stagger = true }: { children: React.ReactNode; className?: string; stagger?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger ? 0.08 : 0 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial={false} variants={reveal} className={className}>{children}</motion.div>;
}

export function MotionHero({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { y: 18 }, show: { y: 0, transition: { duration: 0.6, ease: EASE } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedArrow({ children = "↗" }: { children?: React.ReactNode }) {
  return (
    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      {children}
    </span>
  );
}

export function MaskedHeadline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h1
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}

export function MaskedLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.6, ease: EASE } } }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function WordReveal({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.p>
  );
}
