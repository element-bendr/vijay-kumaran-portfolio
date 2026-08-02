"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const CYAN = "#22D3EE";
const CLUSTER_COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#D946EF"];

type Pt = { x: number; y: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

type Cluster = { color: string; nodes: Pt[]; edges: Array<[number, number]>; merge: Pt };
const HUB: Pt = { x: 885, y: 250 };
const TRUNK_END: Pt = { x: 1145, y: 250 };
const edge = (a: Pt, b: Pt) => `M${a.x} ${a.y} L${b.x} ${b.y}`;

const CLUSTER_BOXES: Array<[number, number, number, number]> = [
  [50, 30, 220, 170],
  [50, 200, 240, 340],
  [70, 390, 230, 500],
  [290, 70, 480, 400],
];

function buildGeometry(): Cluster[] {
  const hubs: Pt[] = [
    { x: rand(570, 610), y: rand(90, 130) },
    { x: rand(640, 680), y: rand(265, 305) },
    { x: rand(585, 625), y: rand(400, 440) },
    { x: rand(685, 725), y: rand(195, 235) },
  ];
  return CLUSTER_BOXES.map(([x0, y0, x1, y1], ci) => {
    const color = CLUSTER_COLORS[ci];
    const count = ci % 2 === 0 ? 4 : 5;
    const nodes: Pt[] = Array.from({ length: count }, () => ({ x: rand(x0, x1), y: rand(y0, y1) }));
    const idx = nodes.map((_, i) => i).sort(() => Math.random() - 0.5);
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < idx.length - 1; i++) edges.push([idx[i], idx[i + 1]]);
    if (count >= 4) edges.push([idx[0], idx[2]]);
    if (count >= 5 && Math.random() > 0.4) edges.push([idx[1], idx[3]]);
    return { color, nodes, edges, merge: hubs[ci] };
  });
}

export function ConvergenceNet() {
  const reduce = useReducedMotion();
  const [geometry, setGeometry] = useState<Cluster[]>(() => buildGeometry());
  useEffect(() => {
    if (!reduce) setGeometry(buildGeometry());
  }, [reduce]);
  const [secret, setSecret] = useState(false);

  const flow = (delay: number, duration: number, from = 0, to = -220) => ({
    initial: reduce ? { strokeDashoffset: from, opacity: 1 } : { strokeDashoffset: from, opacity: 0.6 },
    animate: reduce ? { strokeDashoffset: from, opacity: 1 } : { strokeDashoffset: to, opacity: 0.9 },
    transition: reduce ? { duration: 0 } : { duration, repeat: Infinity, repeatDelay: rand(0.4, 1.4), ease: "linear" as const, delay },
  });

  const drift = (delay: number, distance: number) =>
    reduce ? {} : { y: [0, -distance, 0], transition: { duration: rand(4, 7), repeat: Infinity, ease: "easeInOut" as const, delay } };

  return <svg aria-hidden viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
    {geometry.map((c, ci) => (
      <g key={ci}>
        {c.edges.map(([i, j], e) => (
          <motion.path key={`e${ci}-${e}`} d={edge(c.nodes[i], c.nodes[j])} stroke={c.color} strokeWidth={1.5} strokeDasharray="7 9" fill="none" {...flow(rand(0, 1.5), rand(2, 3.5))} />
        ))}
        {c.nodes.map((n, i) => (
          <motion.path key={`m${ci}-${i}`} d={edge(n, c.merge)} stroke={c.color} strokeWidth={1.2} strokeDasharray="5 7" fill="none" {...flow(rand(0.5, 2), rand(2.5, 4))} />
        ))}
        {c.nodes.map((n, i) => (
          <motion.circle key={`n${ci}-${i}`} cx={n.x} cy={n.y} r={2.5} fill={c.color} animate={drift(rand(0, 2), rand(2, 5))} />
        ))}
        <motion.circle cx={c.merge.x} cy={c.merge.y} r={4} fill={c.color} animate={drift(rand(0, 2), rand(1, 3))} />
        <motion.path key={`h${ci}`} d={edge(c.merge, HUB)} stroke={c.color} strokeWidth={1.3} strokeDasharray="6 8" fill="none" {...flow(rand(1, 2.5), rand(2.5, 4), 0, -260)} />
      </g>
    ))}
    <motion.circle cx={HUB.x} cy={HUB.y} r={5} fill={CYAN} animate={reduce ? {} : { scale: [1, 1.15, 1], transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } }} />
    <motion.path d={edge(HUB, TRUNK_END)} stroke={CYAN} strokeWidth={2.5} strokeDasharray="26 26" fill="none" {...flow(rand(1, 2), rand(2.5, 3.5), 0, -520)} />
    <motion.circle cx={TRUNK_END.x} cy={TRUNK_END.y} r={5} fill={CYAN} animate={reduce ? {} : { scale: [0.8, 1.2, 0.8], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }} />
    <motion.circle cx={TRUNK_END.x} cy={TRUNK_END.y} r={12} fill="none" stroke={CYAN} strokeWidth={1} className="pointer-events-auto" style={{ cursor: "pointer" }} role="button" aria-label="The orchestrator terminal node" initial={{ opacity: 0.15 }} animate={{ opacity: secret ? 0.7 : 0.15, scale: secret ? [1, 1.6, 1] : 1 }} transition={{ duration: 0.6 }} onClick={() => { setSecret((s) => !s); window.dispatchEvent(new CustomEvent("vijay-secret", { detail: "terminal-node" })); }} />
  </svg>;
}
