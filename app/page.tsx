import Link from "next/link";
import type { Metadata } from "next";
import { AskTheWork, ButtonLink, LiveSitesStrip, PageShell, ProjectMark, SectionLabel } from "@/components/site";
import { SpaceField } from "@/components/SpaceField";
import { HeroScroll } from "@/components/HeroScroll";
import { CardGlow } from "@/components/CardGlow";
import { Magnetic } from "@/components/Magnetic";
import { TrustStrip } from "@/components/TrustStrip";
import { AskHero } from "@/components/AskHero";
import { ProjectThumb } from "@/components/ProjectThumb";
import { WorkBoard } from "@/components/WorkBoard";
import { AnimatedArrow, HeroItem, MaskedHeadline, MaskedLine, MotionHero, MotionItem, MotionSection, WordReveal } from "@/components/motion";
import { projects } from "@/data/projects";
import { createMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/",
  title: "AI Systems Engineer & Agentic Infrastructure · Vijay Kumaran",
  description: "Production-oriented AI systems, governed agents, business automation, and web platforms built with deterministic controls, evidence, and real deployment discipline.",
});

export default function Home() {
  return <PageShell>
    <HeroScroll><SpaceField />
      <MotionHero className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-10 lg:px-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <HeroItem><SectionLabel>AI Systems Engineer · Agentic Infrastructure</SectionLabel></HeroItem>
            <HeroItem><p className="mt-1 max-w-xl font-mono text-[13px] leading-relaxed tracking-[.01em] text-muted-dark">Governed agents. Deterministic control planes. Production automation with evidence behind the claims.</p></HeroItem>
            <HeroItem><MaskedHeadline className="display mt-7 max-w-5xl text-[clamp(3.5rem,7.4vw,7.5rem)] leading-[.92]"><MaskedLine>AI systems.</MaskedLine><MaskedLine>Governed agents.</MaskedLine><MaskedLine><span className="text-cyan">Production infrastructure.</span></MaskedLine></MaskedHeadline></HeroItem>
            <HeroItem><h2 className="mt-4 max-w-3xl font-mono text-xl leading-relaxed tracking-tight text-muted-dark">Applied AI engineering for systems that have to keep working after the demo ends.</h2></HeroItem>
            <div className="mt-10 max-w-2xl">
              <HeroItem><WordReveal text="Models can reason. Deterministic systems decide what is allowed to happen." className="text-2xl leading-tight text-slate-200 sm:text-3xl" /></HeroItem>
              <HeroItem><p className="mt-5 text-base leading-relaxed text-muted-dark">I build agentic systems, internal automation, and production web platforms with explicit state, provenance, retries, verification, human gates where needed, and deployment evidence.</p></HeroItem>
              <HeroItem><div><div className="flex flex-wrap gap-3"><Magnetic><ButtonLink href="/work">View engineering proof</ButtonLink></Magnetic><Magnetic><ButtonLink href="/about#audit" secondary>Book a systems audit</ButtonLink></Magnetic></div><p className="mt-7 border-t border-dark-line pt-4 text-sm leading-relaxed text-muted-dark">Recent work spans governed agent infrastructure, Cloudflare-native intelligence, production discovery systems, institutional publishing, and client web delivery.</p></div></HeroItem>
            </div>
          </div>
          <HeroItem className="justify-self-center"><AskHero /><WorkBoard /></HeroItem>
        </div>
      </MotionHero>
    </HeroScroll>
    <TrustStrip />
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16"><SectionLabel light>What I build</SectionLabel><MotionSection className="mt-8 grid gap-px overflow-hidden border border-light-line bg-light-line md:grid-cols-3">{[["01", "AI Systems & Agents", "Governed agent systems with explicit authority boundaries, durable state, evidence, verification, and bounded model reasoning."],["02", "Automation & Internal Systems", "Operational workflows, discovery pipelines, publishing systems, and admin tooling that reduce manual coordination without hiding failure modes."],["03", "Production Web Systems", "Fast, secure, maintainable web platforms for institutions and brands, with real deployment and handover discipline."]].map(([num,title,copy]) => <MotionItem key={num} className="bg-light p-7 sm:p-8"><span className="font-mono text-xs text-muted-light">{num}</span><h2 className="display mt-12 text-4xl">{title}</h2><p className="mt-4 max-w-sm text-base leading-relaxed text-muted-light">{copy}</p></MotionItem>)}</MotionSection></div></section>
    <section className="bg-dark-soft text-light"><div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16"><div className="flex items-end justify-between"><div><SectionLabel>Selected engineering work</SectionLabel><h2 className="display mt-6 text-[clamp(2.8rem,5.5vw,5.5rem)]">Systems with<br /><span className="text-cyan">evidence behind them.</span></h2></div><Link href="/work" className="group hidden font-mono text-xs uppercase tracking-[.16em] text-cyan hover:text-white sm:block">View all work <AnimatedArrow /></Link></div><div className="mt-8 border-y border-dark-line py-4"><LiveSitesStrip /></div><CardGlow><MotionSection className="mt-10 grid gap-5 md:grid-cols-2">{projects.slice(0,4).map((project) => <MotionItem key={project.slug}><Link href={project.href} className="group block h-full border border-dark-line p-7 transition-colors hover:border-cyan group-hover:bg-white/[.02] sm:p-8"><div className="flex items-start justify-between font-mono text-xs text-muted-dark"><span>{project.category}</span><span>{project.index}</span></div><ProjectThumb slug={project.slug} /><ProjectMark slug={project.slug} /><h3 className="display mt-6 text-4xl group-hover:text-cyan">{project.name} <span className="font-sans text-xl text-cyan opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100">↗</span></h3><p className="mt-3 max-w-lg text-base text-muted-dark">{project.description}</p><p className="mt-6 border-t border-dark-line pt-4 text-base leading-relaxed text-slate-300">{project.metric}</p><p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-dark">{project.proof}</p></Link></MotionItem>)}</MotionSection></CardGlow></div></section>
    <AskTheWork />
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-5xl sm:text-7xl">Need an AI system that can survive production?</h2></MotionItem><MotionItem><ButtonLink href="/about#audit" light>Book a systems audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
