import type { Metadata } from "next";
import { ButtonLink, PageShell, SectionLabel } from "@/components/site";
import { MaskedHeadline, MaskedLine, MotionItem } from "@/components/motion";
import { WorkFilter } from "@/components/WorkFilter";
import { projects } from "@/data/projects";
import { createMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/work",
  title: "Engineering Work",
  description: "Evidence-backed AI systems, governed agent infrastructure, business automation, institutional systems, and production web delivery.",
});

export default function WorkPage() {
  return <PageShell>
    <section className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-16"><SectionLabel>Engineering proof index</SectionLabel><MaskedHeadline className="display mt-6 max-w-5xl text-[clamp(3.1rem,6vw,6rem)] leading-[.92]"><MaskedLine>Systems built,</MaskedLine><MaskedLine><span className="text-cyan">claims verified.</span></MaskedLine></MaskedHeadline><p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-dark">A portfolio of governed AI systems, automation workflows, internal platforms, and production websites. Where test or promotion evidence exists, it is stated directly rather than converted into decorative percentages.</p></div></section>
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"><WorkFilter projects={projects} /></div></section>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Need a system with more than a demo behind it?</h2></MotionItem><MotionItem><ButtonLink href="/about#audit" light>Book a systems audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
