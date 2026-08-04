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

export const metadata: Metadata = {
  title: "AI Automation & Web Systems Consultant · Vijay Kumaran",
  description: "Practical websites, business systems, and AI automations that reduce manual work and run reliably every day.",
};

export default function Home() {
  return <PageShell>
    <HeroScroll><SpaceField />
      <MotionHero className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-10 lg:px-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <HeroItem><SectionLabel>AI Automation &amp; Web Systems Consultant</SectionLabel></HeroItem>
            <HeroItem><p className="mt-1 max-w-md font-mono text-[13px] leading-relaxed tracking-[.01em] text-muted-dark">Orchestrating systems. Automating the routine. Building what runs every day.</p></HeroItem>
            <HeroItem><MaskedHeadline className="display mt-7 max-w-5xl text-[clamp(3.5rem,7.4vw,7.5rem)] leading-[.92]"><MaskedLine>Websites.</MaskedLine><MaskedLine>Business systems.</MaskedLine><MaskedLine><span className="text-cyan">AI automations.</span></MaskedLine></MaskedHeadline></HeroItem>
            <HeroItem><h2 className="mt-4 max-w-3xl font-mono text-xl leading-relaxed tracking-tight text-muted-dark">AI automation consultant — practical systems for businesses and brands</h2></HeroItem>
            <div className="mt-10 max-w-2xl">
              <HeroItem><WordReveal text="Built to reduce manual work." className="text-2xl leading-tight text-slate-200 sm:text-3xl" /></HeroItem>
              <HeroItem><p className="mt-5 text-base leading-relaxed text-muted-dark">I build practical web systems, admin workflows, and AI automations that run reliably every day.</p></HeroItem>
              <HeroItem><div><div className="flex flex-wrap gap-3"><Magnetic><ButtonLink href="/work">View case studies</ButtonLink></Magnetic><Magnetic><ButtonLink href="/about#audit" secondary>Book an audit</ButtonLink></Magnetic></div><p className="mt-7 border-t border-dark-line pt-4 text-sm leading-relaxed text-muted-dark">Shipped for institutions, brands, and daily operations.</p></div></HeroItem>
            </div>
          </div>
          <HeroItem className="justify-self-center"><AskHero /><WorkBoard /></HeroItem>
        </div>
      </MotionHero>
    </HeroScroll>
    <TrustStrip />
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16"><SectionLabel light>What I build</SectionLabel><MotionSection className="mt-8 grid gap-px overflow-hidden border border-light-line bg-light-line md:grid-cols-3">{[["01", "Websites", "Fast, secure, and maintainable websites built for clarity and conversion."],["02", "Business Systems", "Custom admin systems and workflows that streamline operations and scale."],["03", "AI Automations", "Practical automations that save time, reduce errors, and keep things moving."]].map(([num,title,copy]) => <MotionItem key={num} className="bg-light p-7 sm:p-8"><span className="font-mono text-xs text-muted-light">{num}</span><h2 className="display mt-12 text-4xl">{title}</h2><p className="mt-4 max-w-sm text-base leading-relaxed text-muted-light">{copy}</p></MotionItem>)}</MotionSection></div></section>
    <section className="bg-dark-soft text-light"><div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16"><div className="flex items-end justify-between"><div><SectionLabel>Selected work</SectionLabel><h2 className="display mt-6 text-[clamp(2.8rem,5.5vw,5.5rem)]">Systems in the<br /><span className="text-cyan">real world.</span></h2></div><Link href="/work" className="group hidden font-mono text-xs uppercase tracking-[.16em] text-cyan hover:text-white sm:block">View all work <AnimatedArrow /></Link></div><div className="mt-8 border-y border-dark-line py-4"><LiveSitesStrip /></div><CardGlow><MotionSection className="mt-10 grid gap-5 md:grid-cols-2">{projects.slice(0,4).map((project) => <MotionItem key={project.slug}><Link href={project.href} className="group block h-full border border-dark-line p-7 transition-colors hover:border-cyan group-hover:bg-white/[.02] sm:p-8"><div className="flex items-start justify-between font-mono text-xs text-muted-dark"><span>{project.category}</span><span>{project.index}</span></div><ProjectThumb slug={project.slug} /><ProjectMark slug={project.slug} /><h3 className="display mt-6 text-4xl group-hover:text-cyan">{project.name} <span className="font-sans text-xl text-cyan opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100">↗</span></h3><p className="mt-3 max-w-lg text-base text-muted-dark">{project.description}</p><p className="mt-6 border-t border-dark-line pt-4 text-base leading-relaxed text-slate-300">{project.metric}</p></Link></MotionItem>)}</MotionSection></CardGlow></div></section>
    <AskTheWork />
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-5xl sm:text-7xl">Need a cleaner workflow or stronger website?</h2></MotionItem><MotionItem><ButtonLink href="/about#audit" light>Book an audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
