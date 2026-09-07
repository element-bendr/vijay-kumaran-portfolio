import type { Metadata } from "next";
import { ButtonLink, PageShell, SectionLabel } from "@/components/site";
import { MotionItem, MotionSection } from "@/components/motion";
import { MaskedHeadline, MaskedLine, WordReveal } from "@/components/motion";
import { projects } from "@/data/projects";
import { createMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/about",
  title: "About",
  description: "Vijay Kumaran builds production-oriented AI systems, governed agents, automation workflows, and web platforms with deterministic controls and evidence-backed delivery.",
});

const stack = [
  "TypeScript",
  "Node.js",
  "Next.js",
  "Cloudflare Workers",
  "Workflows",
  "Durable Objects",
  "D1 / R2",
  "PostgreSQL",
  "pgvector",
  "Apache AGE",
  "GitHub Actions",
  "Agentic Workflows",
];

const approach = [
  ["01", "Evidence before claims", "Architecture, project status, and professional claims should trace back to code, tests, deployment state, or other inspectable evidence."],
  ["02", "Deterministic control", "Models can reason and propose. Deterministic software owns state, authorization, retries, validation, persistence, and consequential side effects."],
  ["03", "Fail closed", "Ambiguous execution, stale evidence, invalid state, or broken verification should stop promotion instead of being converted into optimism."],
  ["04", "Production discipline", "Real providers, migrations, staging/production separation, CI gates, recovery paths, documentation, and handover matter as much as the happy-path demo."],
];

const recentProof = projects.slice(0, 6).map((p) => [p.name, p.metric]);

export default function AboutPage() {
  return <PageShell>
    <section className="bg-dark text-light"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16 lg:px-16 lg:py-16"><div><SectionLabel>About</SectionLabel><MaskedHeadline className="display mt-6 max-w-5xl text-[clamp(3.1rem,6vw,6rem)] leading-[.92]"><MaskedLine>Vijay Kumaran</MaskedLine></MaskedHeadline><WordReveal text="AI Systems Engineer · Agentic Infrastructure · Applied AI" className="mt-6 text-2xl text-cyan sm:text-3xl" /><p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-dark">I build production-oriented AI systems, governed agent infrastructure, internal automation, and web platforms. Recent work focuses on making probabilistic models useful without letting probabilistic output become execution authority.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="mailto:element.bendr@gmail.com" light>Start a conversation</ButtonLink><ButtonLink href="/work" secondary>View engineering proof</ButtonLink></div><p className="mt-8 max-w-3xl border-t border-dark-line pt-4 text-sm leading-relaxed text-muted-dark">The portfolio combines deep agent-system engineering with shipped client work, institutional systems, production websites, and operational automation.</p></div><MotionItem className="self-end"><aside className="border-y border-dark-line py-5"><SectionLabel>Recent proof</SectionLabel><ul className="mt-5 divide-y divide-dark-line">{recentProof.map(([name, proof]) => <li className="flex items-baseline justify-between gap-4 py-3" key={name}><span className="font-mono text-sm text-light">{name}</span><span className="max-w-[62%] text-right text-sm leading-relaxed text-muted-dark">{proof}</span></li>)}</ul></aside></MotionItem></div></section>
    <section id="approach" className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16"><SectionLabel light>Engineering approach</SectionLabel><div className="mt-8 divide-y divide-light-line">{approach.map(([num, title, copy]) => <div className="grid gap-4 py-6 lg:grid-cols-[72px_1fr_1fr]" key={num}><span className="font-mono text-xs text-muted-light">{num}</span><h2 className="display text-3xl">{title}</h2><p className="max-w-md text-base leading-relaxed text-muted-light">{copy}</p></div>)}</div></div></section>
    <section id="audit" className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-16 lg:py-16"><div><SectionLabel>Systems audit</SectionLabel><h2 className="display mt-6 text-[clamp(2.8rem,5vw,5rem)]">Your system,<br /><span className="text-cyan">under evidence.</span></h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark">A focused review of an AI workflow, automation system, internal tool, or web platform. The output is a written assessment of architecture, reliability, failure modes, automation opportunities, and next steps.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="mailto:element.bendr@gmail.com" light>Start an audit conversation</ButtonLink><ButtonLink href="/work" secondary>View case studies</ButtonLink></div></div><div className="mt-10 space-y-6 lg:mt-0"><div className="border border-dark-line p-5"><p className="font-mono text-xs text-cyan">01 — Scope</p><p className="mt-3 text-base leading-relaxed text-muted-dark">Define the system, business objective, trust boundary, constraints, and what success actually means.</p></div><div className="border border-dark-line p-5"><p className="font-mono text-xs text-cyan">02 — Architecture & evidence</p><p className="mt-3 text-base leading-relaxed text-muted-dark">Review state, data flow, AI boundaries, observability, tests, deployments, recovery paths, and where claims outrun evidence.</p></div><div className="border border-dark-line p-5"><p className="font-mono text-xs text-cyan">03 — Prioritized plan</p><p className="mt-3 text-base leading-relaxed text-muted-dark">Produce a bounded action plan: what to fix, what to automate, what to simplify, and what not to build.</p></div><div className="border border-dark-line p-5"><p className="font-mono text-xs text-cyan">04 — Build (optional)</p><p className="mt-3 text-base leading-relaxed text-muted-dark">Implementation is scoped separately with explicit verification and production-readiness gates.</p></div></div></div></section>
    <section className="bg-dark-soft text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16"><SectionLabel>Working stack</SectionLabel><h2 className="display mt-6 text-[clamp(2.8rem,5vw,5rem)]">Modern systems,<br /><span className="text-cyan">explicit controls.</span></h2><MotionSection className="mt-8 flex flex-wrap gap-2">{stack.map((item) => <MotionItem key={item}><span className="border border-dark-line px-4 py-3 font-mono text-xs text-muted-dark">{item}</span></MotionItem>)}</MotionSection></div></section>
    <section id="contact" className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><div><SectionLabel>Contact</SectionLabel><h2 className="display mt-6 text-[clamp(3.1rem,6vw,6rem)] leading-[.9]">Build something<br />that holds up.</h2><a href="mailto:element.bendr@gmail.com" className="mt-6 inline-block text-lg underline underline-offset-4">element.bendr@gmail.com</a></div><ButtonLink href="mailto:element.bendr@gmail.com" light>Send an email</ButtonLink></div></section>
  </PageShell>;
}
