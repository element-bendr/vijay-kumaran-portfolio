"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedArrow, MotionItem, MotionSection } from "@/components/motion";
import { ProjectMark } from "@/components/site";
import type { Project } from "@/data/projects";

const BUCKETS = ["All", "Websites", "Systems", "Automation"] as const;
type Bucket = (typeof BUCKETS)[number];

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Bucket>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.bucket === active);
  return <div>
    <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter work by type">
      {BUCKETS.map((bucket) => {
        const count = bucket === "All" ? projects.length : projects.filter((p) => p.bucket === bucket).length;
        return <button key={bucket} onClick={() => setActive(bucket)} aria-pressed={active === bucket} className={`border px-4 py-2 font-mono text-xs uppercase tracking-[.12em] transition-colors ${active === bucket ? "border-blue bg-blue text-white" : "border-light-line text-muted-light hover:border-blue hover:text-blue"}`}>{bucket} <span className="opacity-60">{count}</span></button>;
      })}
    </div>
    <MotionSection key={active} className="[&>div]:border-b [&>div]:border-light-line">{visible.map((project) => <MotionItem key={project.slug}><article id={project.slug} className="group grid gap-5 py-7 transition-colors hover:bg-ink/[.02] lg:grid-cols-[72px_1fr_1.1fr_90px] lg:items-start"><span className="font-mono text-xs text-muted-light">{project.index}</span><div><ProjectMark slug={project.slug} /><h2 className="display mt-3 text-3xl transition-colors group-hover:text-blue sm:text-4xl">{project.name}</h2><p className="mt-2 text-sm text-muted-light">{project.category}</p></div><div><p className="text-base leading-relaxed text-muted-light">{project.description}</p><p className="mt-3 text-sm leading-relaxed"><span className="font-semibold text-ink">What this proves: </span>{project.proof}</p></div><div className="lg:text-right"><Link href={project.href} className="font-mono text-sm tracking-[.02em] text-blue hover:underline">Read case study <AnimatedArrow /></Link></div></article></MotionItem>)}</MotionSection>
  </div>;
}
