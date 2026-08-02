import { marked } from "marked";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, SectionLabel } from "@/components/site";
import { AnimatedArrow, MotionItem } from "@/components/motion";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} · Vijay Kumaran` : "Thinking · Vijay Kumaran",
    description: post?.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <PageShell><div className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16"><h1 className="display text-4xl">Post not found</h1></div></div></PageShell>;
  const html = marked.parse(post.content) as string;
  return <PageShell>
    <article className="bg-light text-ink"><div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 lg:px-16"><SectionLabel light>Thinking</SectionLabel><h1 className="display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">{post.title}</h1><div className="mt-6 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[.12em]"><span className="text-muted-light">{post.date}</span><span className="text-blue">{post.readingTime}</span>{post.tags.map((tag) => <span key={tag} className="border border-light-line px-2.5 py-1 text-muted-light">{tag}</span>)}</div><div className="mt-10 max-w-none space-y-5 text-base leading-relaxed text-muted-light [&_h2]:display [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-ink [&_strong]:font-semibold [&_strong]:text-ink [&_code]:rounded [&_code]:border [&_code]:border-light-line [&_code]:bg-light [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[.85em] [&_code]:text-blue" dangerouslySetInnerHTML={{ __html: html }} /><div className="mt-12 flex justify-between border-t border-light-line pt-6 font-mono text-xs uppercase tracking-[.12em]"><Link href="/thinking" className="text-blue hover:underline">← All thinking</Link><Link href="/work" className="group text-blue hover:underline">See the work <AnimatedArrow /></Link></div></div></article>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Building something similar?</h2></MotionItem><MotionItem><Link href="/about" className="inline-flex items-center justify-center border border-white bg-white px-5 py-3 font-mono text-sm tracking-[.02em] text-blue hover:bg-transparent hover:text-white">Book an audit</Link></MotionItem></div></section>
  </PageShell>;
}
