import type { Metadata } from "next";
import { ButtonLink, PageShell, SectionLabel } from "@/components/site";
import { TrackVisit } from "@/components/TrackVisit";
import { MotionItem, MotionSection } from "@/components/motion";
import { CaseStudyMeta } from "@/components/CaseStudyMeta";
import { createMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/work/newsharness",
  title: "newsharness — Claim-Evidence News Intelligence",
  description: "Cloudflare-native news intelligence with provider observability, immutable claim/evidence controls, replayable workflows, and publication gating.",
});

const chips = ["Cloudflare Agents SDK", "Durable Objects", "D1", "R2", "Workers AI", "Claim/evidence governance", "Replayable providers"];
const capabilities = [
  "Scheduled multi-provider collection and normalization",
  "Story clustering, extraction, enrichment, and drafting",
  "Provider observability, run traces, evals, and replay-ready data",
  "Immutable claim versions and evidence snapshots",
  "Authenticated reviewer attribution and append-only review decisions",
  "Evidence invalidation, eligibility checks, and exact-version publication gating",
  "Rights-aware storage, bounded extraction, and hostile-content handling",
];

export default function NewsharnessPage() {
  return <PageShell><TrackVisit slug="newsharness" />
    <section className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-16"><SectionLabel>Case study / 02</SectionLabel><h1 className="display mt-6 max-w-5xl text-[clamp(2.95rem,5.7vw,5.75rem)] leading-[.92]">News intelligence with<br /><span className="text-cyan">claim-evidence controls</span></h1><p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-dark">A Cloudflare-native intelligence system that combines collection, clustering, extraction, drafting, and publishing with inspectable provenance, immutable evidence, reviewer attribution, and fail-closed publication gates.</p><CaseStudyMeta slug="newsharness" /><div className="mt-7 grid gap-px border border-dark-line bg-dark-line sm:grid-cols-2 lg:grid-cols-4">{[["Type", "AI intelligence system"], ["Runtime", "Cloudflare"], ["Governance", "Claim / evidence"], ["Stack", "Agents · DO · D1 · R2 · Workers AI"]].map(([label, value]) => <div className="bg-dark p-4" key={label}><p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted-dark">{label}</p><p className="mt-2 text-sm text-light">{value}</p></div>)}</div><div className="mt-7 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="border border-dark-line px-3 py-2 font-mono text-[11px] text-muted-dark">{chip}</span>)}</div></div></section>
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"><MotionSection className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div><SectionLabel light>Overview</SectionLabel><p className="mt-6 text-2xl leading-tight">The system treats generated prose as an output, not as evidence.</p></div><p className="max-w-xl text-base leading-relaxed text-muted-light">newsharness separates collection and model-assisted reasoning from the deterministic controls that decide whether claims have valid evidence, whether evidence is still eligible, and whether an exact claim version may be published.</p></MotionSection><MotionSection className="mt-10 border-y border-light-line py-7"><SectionLabel light>System architecture</SectionLabel><div className="mt-5 grid gap-px overflow-hidden border border-light-line bg-light-line sm:grid-cols-3 lg:grid-cols-6">{["Providers", "Normalize + cluster", "Extract + enrich", "Claims + evidence", "Review + gates", "Publish + analytics"].map((item, i) => <div key={item} className="bg-light p-4"><span className="font-mono text-xs text-blue">0{i + 1}</span><p className="mt-5 text-sm leading-tight">{item}</p></div>)}</div></MotionSection><MotionSection className="grid gap-10 py-12 lg:grid-cols-2"><div><SectionLabel light>Engineering problem</SectionLabel><p className="mt-6 text-2xl leading-tight">AI summaries become dangerous when source material, claim versions, reviewer decisions, and publication state blur together.</p></div><div><SectionLabel light>What it does</SectionLabel><ul className="mt-5 divide-y divide-light-line">{capabilities.map((item) => <li key={item} className="py-2.5 text-base text-muted-light">{item}</li>)}</ul></div></MotionSection><MotionSection className="grid gap-10 border-t border-light-line py-12 lg:grid-cols-2"><div><SectionLabel light>Verified engineering evidence</SectionLabel><ul className="mt-6 space-y-3 text-base leading-relaxed"><li><strong>Phase 3:</strong> 26 test files / 149 tests; source governance, exact-host redirect validation, bounded streaming fetches, hostile-content parsing, rights-aware artifacts, retention/legal holds, and redacted events.</li><li><strong>Phase 4 candidate gate:</strong> 38 files / 231 tests; TypeScript and architecture checks across 117 files; D1 migration verification; 54 inventory artifacts with 0 missing.</li><li>Phase 4 added immutable claim identities/versions, evidence snapshots, reviewer attribution, invalidation, backfill, audited capability activation, and exact-version publication gating.</li></ul></div><div><SectionLabel light>Why it matters</SectionLabel><ul className="mt-6 space-y-3 text-base text-muted-light"><li>Separates model reasoning from publication authority.</li><li>Makes source and evidence lineage inspectable.</li><li>Supports deterministic replay and failure investigation.</li><li>Uses governance as runtime behavior rather than résumé decoration.</li></ul></div></MotionSection></div></section>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Need intelligence you can inspect?</h2></MotionItem><MotionItem><ButtonLink href="/about#audit" light>Book a systems audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
