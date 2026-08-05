import Link from "next/link";
import type { Metadata } from "next";
import { PageShell, SectionLabel } from "@/components/site";
import { AnimatedArrow, MaskedHeadline, MaskedLine, MotionItem, MotionSection } from "@/components/motion";
import { posts } from "@/data/posts";
import { createMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createMetadata({ path: "/thinking", title: "Thinking", description: "Notes on building Cloudflare agents, AI memory systems, and automation that stays reviewable." });

export default function ThinkingPage() {
  return <PageShell>
    <section className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-16"><SectionLabel>Thinking</SectionLabel><MaskedHeadline className="display mt-6 max-w-4xl text-[clamp(2.95rem,5.7vw,5.75rem)] leading-[.92]"><MaskedLine>Notes on building</MaskedLine><MaskedLine><span className="text-cyan">systems that run.</span></MaskedLine></MaskedHeadline><p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-dark">Field notes from the work — what generalizes, what breaks, and what holds up.</p></div></section>
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"><MotionSection className="divide-y divide-light-line border-y border-light-line">{posts.map((post) => <MotionItem key={post.slug}><Link href={`/thinking/${post.slug}`} className="group grid gap-2 py-8 sm:grid-cols-[140px_1fr] sm:gap-8"><div className="font-mono text-xs uppercase tracking-[.12em] text-muted-light"><span>{post.date}</span><span className="ml-3 text-blue">{post.readingTime}</span></div><div><h2 className="display text-3xl transition-colors group-hover:text-blue sm:text-4xl">{post.title}</h2><p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-light">{post.excerpt}</p><p className="mt-5 font-mono text-xs uppercase tracking-[.12em] text-blue">Read <AnimatedArrow /></p></div></Link></MotionItem>)}</MotionSection></div></section>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Like the thinking?</h2></MotionItem><MotionItem><Link href="/work" className="group inline-flex items-center justify-center border border-white bg-white px-5 py-3 font-mono text-sm tracking-[.02em] text-blue hover:bg-transparent hover:text-white">See the work <AnimatedArrow /></Link></MotionItem></div></section>
  </PageShell>;
}
