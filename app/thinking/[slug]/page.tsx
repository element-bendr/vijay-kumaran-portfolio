import { marked } from "marked";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, SectionLabel } from "@/components/site";
import { AnimatedArrow, MaskedHeadline, MaskedLine, MotionItem } from "@/components/motion";
import { posts } from "@/data/posts";

const SITE_URL = "https://vijay-kumaran-portfolio-ask.pages.dev";

const RELATED: Record<string, Array<{ name: string; href: string }>> = {
  "cloudflare-native-news-intelligence-agent": [{ name: "newsharness", href: "/work/newsharness" }],
  "giving-ai-coding-agents-a-governed-memory": [{ name: "memory-os", href: "/work/memory-os" }],
  "what-client-delivery-actually-requires": [{ name: "KPDC / Trifecta", href: "/work/kpdc-trifecta" }, { name: "SteelMade", href: "/work/steelmade" }],
  "making-automation-reviewable-not-just-fast": [{ name: "ChronoQuill", href: "/work/chronoquill" }, { name: "ArtSports Content OS", href: "/work/artsports-content-os" }],
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} · Vijay Kumaran` : "Thinking · Vijay Kumaran",
    description: post?.excerpt,
    openGraph: post ? {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    } : undefined,
    twitter: post ? {
      title: post.title,
      description: post.excerpt,
    } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <PageShell><div className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16"><h1 className="display text-4xl">Post not found</h1></div></div></PageShell>;
  const html = marked.parse(post.content) as string;
  const rel = RELATED[slug] || [];
  return <PageShell>
    <article className="bg-light text-ink"><div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 lg:px-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#service` },
      }) }} />
      <SectionLabel light>Thinking</SectionLabel><MaskedHeadline className="display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]"><MaskedLine>{post.title}</MaskedLine></MaskedHeadline><div className="mt-6 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[.12em]"><span className="text-muted-light">{post.date}</span><span className="text-blue">{post.readingTime}</span>{post.tags.map((tag) => <span key={tag} className="border border-light-line px-2.5 py-1 text-muted-light">{tag}</span>)}</div><div className="mt-10 max-w-none space-y-5 text-base leading-relaxed text-muted-light [&_h2]:display [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-ink [&_strong]:font-semibold [&_strong]:text-ink [&_code]:rounded [&_code]:border [&_code]:border-light-line [&_code]:bg-light [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[.85em] [&_code]:text-blue" dangerouslySetInnerHTML={{ __html: html }} />{rel.length > 0 && <div className="mt-10 border-t border-light-line pt-6"><p className="font-mono text-xs uppercase tracking-[.12em] text-muted-light mb-3">Related projects</p>{rel.map((r) => <a key={r.href} href={r.href} className="inline-block mr-5 font-mono text-sm text-blue hover:underline">{r.name} ↗</a>)}</div>}<div className="mt-8 flex justify-between border-t border-light-line pt-6 font-mono text-xs uppercase tracking-[.12em]"><Link href="/thinking" className="text-blue hover:underline">← All thinking</Link><Link href="/work" className="group text-blue hover:underline">See the work <AnimatedArrow /></Link></div></div></article>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Building something similar?</h2></MotionItem><MotionItem><Link href="/about" className="inline-flex items-center justify-center border border-white bg-white px-5 py-3 font-mono text-sm tracking-[.02em] text-blue hover:bg-transparent hover:text-white">Book an audit</Link></MotionItem></div></section>
  </PageShell>;
}
