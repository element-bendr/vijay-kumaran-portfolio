"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const CYAN = "#22D3EE";
const CLUSTER_COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#D946EF"];
const SOLUTIONS = [
  { label: "Websites", x: 400, y: 490 },
  { label: "Business systems", x: 600, y: 505 },
  { label: "AI automations", x: 800, y: 490 },
];

const PROBLEMS = [
  "manual data entry",
  "scattered files",
  "slow approvals",
  "no visibility",
  "email overload",
  "broken handoffs",
];

type Pt = { x: number; y: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

type Line = { color: string; from: Pt; mid: Pt; to: Pt; label: string };
const edge = (a: Pt, b: Pt) => `M${a.x} ${a.y} L${b.x} ${b.y}`;

function buildLines(): Line[] {
  return PROBLEMS.map((label, i) => {
    const x = 120 + i * 180 + rand(-30, 30);
    const target = SOLUTIONS[i % SOLUTIONS.length];
    const mid = { x: x + (target.x - x) * rand(0.35, 0.55), y: rand(210, 290) };
    return { color: CLUSTER_COLORS[i % CLUSTER_COLORS.length], from: { x, y: rand(14, 30) }, mid, to: { x: target.x + rand(-18, 18), y: target.y - rand(4, 14) }, label };
  });
}

const CONVERGE: Pt = { x: 600, y: 300 };

export function HeroMesh() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>(() => buildLines());
  useEffect(() => {
    if (!reduce) setLines(buildLines());
  }, [reduce]);
  const [secret, setSecret] = useState(false);

  const flow = (duration: number, delay: number) => ({
    initial: reduce ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: 0, opacity: 0.55 },
    animate: reduce ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: -260, opacity: 0.9 },
    transition: reduce ? { duration: 0 } : { duration, repeat: Infinity, repeatDelay: rand(0.3, 1), ease: "linear" as const, delay },
  });

  return <svg aria-hidden viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
    {lines.map((l, i) => (
      <g key={i}>
        <text x={l.from.x} y={l.from.y - 8} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={l.color}>{l.label}</text>
        <motion.path d={edge(l.from, l.mid)} stroke={l.color} strokeWidth={1.4} strokeDasharray="6 8" fill="none" {...flow(rand(2, 3.5), rand(0, 1.2))} />
        <motion.path d={edge(l.mid, l.to)} stroke={l.color} strokeWidth={1.4} strokeDasharray="6 8" fill="none" {...flow(rand(2, 3.5), rand(0.6, 1.8))} />
        <circle cx={l.from.x} cy={l.from.y} r={2.5} fill={l.color} />
      </g>
    ))}
    {SOLUTIONS.map((s, i) => (
      <g key={i}>
        <motion.path d={edge(CONVERGE, s)} stroke={CYAN} strokeWidth={1.6} strokeDasharray="10 10" fill="none" {...flow(rand(2.5, 3.5), rand(0.4, 1.6))} />
        <motion.circle cx={s.x} cy={s.y} r={4} fill={CYAN} animate={reduce ? {} : { scale: [1, 1.25, 1], transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 } }} />
        <text x={s.x} y={s.y + 22} textAnchor="middle" fontSize="13" fontFamily="ui-monospace, monospace" fill={CYAN}>{s.label}</text>
      </g>
    ))}
    <motion.circle cx={CONVERGE.x} cy={CONVERGE.y} r={5} fill={CYAN} animate={reduce ? {} : { scale: [0.8, 1.2, 0.8], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }} />
    <motion.circle cx={CONVERGE.x} cy={CONVERGE.y} r={13} fill="none" stroke={CYAN} strokeWidth={1} className="pointer-events-auto" style={{ cursor: "pointer" }} role="button" aria-label="The convergence point — where problems meet solutions" initial={{ opacity: 0.15 }} animate={{ opacity: secret ? 0.7 : 0.15, scale: secret ? [1, 1.7, 1] : 1 }} transition={{ duration: 0.6 }} onClick={() => { setSecret((s) => !s); window.dispatchEvent(new CustomEvent("vijay-secret", { detail: "terminal-node" })); }} />
  </svg>;
}
