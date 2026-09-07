import type { Metadata } from "next";
import { ButtonLink, PageShell, SectionLabel } from "@/components/site";
import { TrackVisit } from "@/components/TrackVisit";
import { MotionItem, MotionSection } from "@/components/motion";
import { CaseStudyMeta } from "@/components/CaseStudyMeta";
import { createMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/work/memory-os",
  title: "memory-os — Governed AI Engineering Executor",
  description: "Governed coding-agent memory and execution system with durable project context, sandboxed execution, evidence-based handoffs, and verification gates.",
});

const chips = ["Git-reviewed knowledge", "Postgres/pgvector", "Beads", "OpenCode execution", "Sandbox CI", "Verification gates"];
const capabilities = [
  "Durable project knowledge separated from in-flight task state",
  "Retrieval and evidence-backed handoffs across coding sessions",
  "Governed OpenCode execution runtime",
  "Sandbox execution and release CI",
  "Role-specific stage timeouts and propagated failures",
  "Bounded cold-start agent registry retries",
  "Preserved readiness/error logs for failure investigation",
];

export default function MemoryOsPage() {
  return <PageShell><TrackVisit slug="memory-os" />
    <section className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-16"><SectionLabel>Case study / 05</SectionLabel><h1 className="display mt-6 max-w-5xl text-[clamp(2.95rem,5.7vw,5.75rem)] leading-[.92]">Governed memory and<br /><span className="text-cyan">engineering execution</span></h1><p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-dark">A coding-agent system that preserves durable project context while keeping execution, task state, verification, and handoff authority explicit.</p><CaseStudyMeta slug="memory-os" /><div className="mt-7 grid gap-px border border-dark-line bg-dark-line sm:grid-cols-2 lg:grid-cols-4">{[["Type", "Governed engineering system"], ["Knowledge", "Git-reviewed"], ["Execution", "OpenCode boundary"], ["State", "Postgres · Beads · evidence"]].map(([label, value]) => <div className="bg-dark p-4" key={label}><p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted-dark">{label}</p><p className="mt-2 text-sm text-light">{value}</p></div>)}</div><div className="mt-7 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="border border-dark-line px-3 py-2 font-mono text-[11px] text-muted-dark">{chip}</span>)}</div></div></section>
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"><MotionSection className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div><SectionLabel light>Overview</SectionLabel><p className="mt-6 text-2xl leading-tight">Agent memory is useful only if temporary state cannot silently become durable truth.</p></div><p className="max-w-xl text-base leading-relaxed text-muted-light">memory-os keeps canonical project knowledge, task state, retrieval, execution evidence, and certification boundaries separate so coding agents can continue work across sessions without turning model confidence into authority.</p></MotionSection><MotionSection className="mt-10 border-y border-light-line py-7"><SectionLabel light>System architecture</SectionLabel><div className="mt-5 grid gap-px overflow-hidden border border-light-line bg-light-line sm:grid-cols-3 lg:grid-cols-6">{[["Knowledge", "Git-reviewed"], ["Retrieval", "project context"], ["State", "Postgres / Beads"], ["Execution", "OpenCode"], ["Sandbox", "bounded runtime"], ["Handoff", "verification-gated"]].map(([step, tool], i) => <div key={step} className="bg-light p-4"><span className="font-mono text-xs text-blue">0{i + 1}</span><p className="mt-5 text-sm font-semibold leading-tight">{step}</p><p className="mt-1 text-xs leading-relaxed text-muted-light">{tool}</p></div>)}</div></MotionSection><MotionSection className="grid gap-10 py-12 lg:grid-cols-2"><div><SectionLabel light>Engineering problem</SectionLabel><p className="mt-6 text-2xl leading-tight">Long-running coding agents lose context, repeat work, and can confuse execution success with actual task completion.</p></div><div><SectionLabel light>What it does</SectionLabel><ul className="mt-5 divide-y divide-light-line">{capabilities.map((item) => <li key={item} className="py-2.5 text-base text-muted-light">{item}</li>)}</ul></div></MotionSection><MotionSection className="grid gap-10 border-t border-light-line py-12 lg:grid-cols-2"><div><SectionLabel light>Verified engineering evidence</SectionLabel><ul className="mt-6 space-y-3 text-base leading-relaxed"><li>Governed OpenCode execution runtime merged into the repository.</li><li>Sandbox execution and release CI hardened through live Pass 2A/2B work.</li><li>Bounded cold-start registry retries added with tests instead of unbounded startup optimism.</li><li>Role-specific stage timeouts, exception propagation, blocked-status precedence, and preserved runtime/error logs added to failure handling.</li></ul></div><div><SectionLabel light>What this proves</SectionLabel><ul className="mt-6 space-y-3 text-base text-muted-light"><li>Agent memory and execution need different authority boundaries.</li><li>Exit codes are not enough to establish governed task completion.</li><li>Production agent systems need observable failure and recovery paths.</li><li>Durable knowledge should remain inspectable outside the model session.</li></ul></div></MotionSection></div></section>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Need agents that remember without drifting?</h2></MotionItem><MotionItem><ButtonLink href="/about#audit" light>Book a systems audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
