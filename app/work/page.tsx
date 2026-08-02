import type { Metadata } from "next";
import { ButtonLink, PageShell, SectionLabel } from "@/components/site";
import { MotionItem } from "@/components/motion";
import { WorkFilter } from "@/components/WorkFilter";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A proof index of systems built for websites, publishing workflows, AI automation, and operational clarity.",
};

export default function WorkPage() {
  return <PageShell>
    <section className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-16"><SectionLabel>Selected work</SectionLabel><h1 className="display mt-6 max-w-4xl text-[clamp(3.1rem,6vw,6rem)] leading-[.92]">Real systems,<br /><span className="text-cyan">practical outcomes.</span></h1><p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-dark">A proof index of systems built for websites, publishing workflows, AI automation, and operational clarity.</p></div></section>
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"><WorkFilter projects={projects} /></div></section>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Need a system that keeps working?</h2></MotionItem><MotionItem><ButtonLink href="/about" light>Book an audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
