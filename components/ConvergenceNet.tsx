"use client";

import { motion, useReducedMotion } from "motion/react";

const CYAN = "#22D3EE";

type Pt = { x: number; y: number };
type Cluster = {
  color: string;
  nodes: Pt[];
  edges: Array<[number, number]>;
  merge: Pt;
  mergeEdges: number[];
  hubFrom: Pt;
};

const CLUSTERS: Cluster[] = [
  {
    color: "#F59E0B",
    nodes: [
      { x: 70, y: 50 },
      { x: 150, y: 95 },
      { x: 95, y: 135 },
      { x: 195, y: 60 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 3],
    ],
    merge: { x: 590, y: 110 },
    mergeEdges: [0, 1, 2, 3],
    hubFrom: { x: 590, y: 110 },
  },
  {
    color: "#10B981",
    nodes: [
      { x: 60, y: 245 },
      { x: 155, y: 210 },
      { x: 175, y: 295 },
      { x: 95, y: 335 },
      { x: 215, y: 265 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 2],
    ],
    merge: { x: 660, y: 285 },
    mergeEdges: [0, 1, 2, 3, 4],
    hubFrom: { x: 660, y: 285 },
  },
  {
    color: "#3B82F6",
    nodes: [
      { x: 85, y: 425 },
      { x: 165, y: 385 },
      { x: 145, y: 475 },
      { x: 215, y: 435 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 3],
    ],
    merge: { x: 605, y: 420 },
    mergeEdges: [0, 1, 2, 3],
    hubFrom: { x: 605, y: 420 },
  },
  {
    color: "#D946EF",
    nodes: [
      { x: 330, y: 80 },
      { x: 400, y: 175 },
      { x: 345, y: 305 },
      { x: 420, y: 385 },
      { x: 460, y: 235 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 2],
    ],
    merge: { x: 705, y: 215 },
    mergeEdges: [0, 1, 2, 3, 4],
    hubFrom: { x: 705, y: 215 },
  },
];

const HUB: Pt = { x: 885, y: 250 };
const TRUNK_END: Pt = { x: 1145, y: 250 };

const edge = (a: Pt, b: Pt) => `M${a.x} ${a.y} L${b.x} ${b.y}`;

export function ConvergenceNet() {
  const reduce = useReducedMotion();
  const at = (ms: number) => (reduce ? 0 : ms / 1000);
  const ease = "easeInOut" as const;
  const draw = (delay: number, duration: number) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0.4 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: reduce ? 0 : duration, delay: at(delay), ease },
  });

  return <svg aria-hidden viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
    {CLUSTERS.map((c, ci) => {
      const nodeDelay = 150 + ci * 110;
      const clusterEdges = c.edges.map(([i, j], e) => <motion.path key={`e${ci}-${e}`} d={edge(c.nodes[i], c.nodes[j])} stroke={c.color} strokeWidth={1.5} fill="none" {...draw(400 + ci * 130 + e * 90, 0.5)} />);
      const mergeSegs = c.mergeEdges.map((i, e) => <motion.path key={`m${ci}-${e}`} d={edge(c.nodes[i], c.merge)} stroke={c.color} strokeWidth={1.5} strokeDasharray="6 5" fill="none" {...draw(1200 + ci * 120 + e * 70, 0.55)} />);
      const hubSeg = <motion.path key={`h${ci}`} d={edge(c.hubFrom, HUB)} stroke={c.color} strokeWidth={1.5} fill="none" {...draw(1900 + ci * 120, 0.55)} />;
      const nodeDots = c.nodes.map((n, i) => <motion.circle key={`n${ci}-${i}`} cx={n.x} cy={n.y} r={3} fill={c.color} initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.3, delay: at(nodeDelay + i * 60) }} />);
      const mergeDot = <motion.circle key={`md${ci}`} cx={c.merge.x} cy={c.merge.y} r={4} fill={c.color} initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduce ? 0 : 0.3, delay: at(1850 + ci * 120) }} />;
      return <g key={ci}>{nodeDots}{clusterEdges}{mergeSegs}{hubSeg}{mergeDot}</g>;
    })}
    <motion.circle cx={HUB.x} cy={HUB.y} r={5} fill={CYAN} initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduce ? 0 : 0.3, delay: at(2600) }} />
    <motion.path d={edge(HUB, TRUNK_END)} stroke={CYAN} strokeWidth={2.5} fill="none" {...draw(2700, 0.7)} />
    <motion.path d={edge(HUB, TRUNK_END)} stroke={CYAN} strokeWidth={2.5} strokeDasharray="20 300" fill="none" initial={reduce ? { strokeDashoffset: 0, opacity: 0 } : { strokeDashoffset: 0, opacity: 0 }} animate={reduce ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: -320, opacity: 1 }} transition={reduce ? { duration: 0 } : { duration: 3.5, repeat: Infinity, repeatDelay: 1.2, ease: "linear", delay: at(3600) }} />
    <motion.circle cx={TRUNK_END.x} cy={TRUNK_END.y} r={5} fill={CYAN} initial={{ opacity: reduce ? 1 : 0 }} animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 0.55, 1], scale: [0.7, 1, 1.15, 1] }} transition={reduce ? { duration: 0 } : { duration: 2.8, repeat: Infinity, repeatDelay: 0.8, delay: at(3500) }} />
  </svg>;
}
