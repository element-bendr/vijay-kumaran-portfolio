import type { ProjectKnowledgeRecord } from "./projectKnowledge";

export const projectKnowledgeRefresh: ProjectKnowledgeRecord[] = [
  {
    id: "github-profile-positioning",
    project: "Vijay Kumaran",
    category: "Profile",
    visibility: "public",
    summary: "AI Systems Engineer focused on agentic infrastructure, applied AI, production automation, and web systems.",
    content:
      "Vijay Kumaran builds production-oriented AI systems, governed agent infrastructure, internal automation, and web platforms. Recent engineering work emphasizes deterministic control around probabilistic models: explicit state and authority boundaries, evidence and provenance, bounded retries, idempotency, staging/production separation, migrations, fail-closed promotion, adversarial tests, and reproducible verification. Commercial breadth includes production client websites and institutional publishing systems. Primary engineering positioning: AI Systems Engineer / Agentic Infrastructure Engineer. Client-facing positioning: AI Automation & Internal Systems Consultant.",
    sources: [
      { label: "GitHub profile", url: "https://github.com/element-bendr" },
      { label: "Engineering work index", path: "app/work/page.tsx" },
      { label: "About page", path: "app/about/page.tsx" },
    ],
  },
  {
    id: "portfolio-services",
    project: "Vijay Kumaran — Services",
    category: "Services",
    visibility: "public",
    summary: "AI systems and agents, automation/internal systems, production web systems, and evidence-led systems audits.",
    content:
      "Current service positioning has four practical lanes. AI Systems & Agents: governed agent workflows, AI-enabled internal systems, deterministic control planes, evidence/provenance, and production hardening. Automation & Internal Systems: discovery pipelines, publishing workflows, admin systems, integrations, and operational automation. Production Web Systems: Next.js and Cloudflare-oriented websites/platforms for institutions and brands. Systems Audit: architecture, AI boundaries, failure modes, reliability, observability, automation opportunities, and a prioritized implementation plan. The engineering approach is evidence before claims, deterministic control of consequential behavior, fail-closed ambiguity, and production discipline.",
    sources: [
      { label: "About page", path: "app/about/page.tsx" },
      { label: "Work index", path: "app/work/page.tsx" },
    ],
  },
  {
    id: "pcas",
    project: "PCAS",
    category: "Governed career-agent system",
    visibility: "public_sanitized",
    summary: "Cloud-first, human-gated career acquisition system with deterministic state, live source discovery, bounded AI evaluation, and production certification.",
    content:
      "PCAS separates deterministic software authority from bounded AI reasoning. Cloudflare Workers, Workflows, D1, Workers AI, GitHub Actions, and live Greenhouse discovery support a pipeline from discovery through evidence, evaluation, human review, and learning. Consequential outbound actions require human approval. The merged P0–P2 certification recorded 34 unit tests, 41 policy/security tests, and 270 integration tests; real Greenhouse and Workers AI staging checks passed, deterministic evaluation replay passed, and candidate-memory/privacy/adversarial checks passed. Daily production discovery runs only from protected main and must collect and certify successfully. P3 grounded application-packet/Gmail work is still in progress and is not presented as shipped.",
    sources: [
      { label: "PCAS case study", path: "app/work/pcas/page.tsx" },
      { label: "PCAS GitHub", url: "https://github.com/element-bendr/Personal-Career-Acquisition-System" },
    ],
  },
  {
    id: "newsharness",
    project: "newsharness",
    category: "Claim-evidence intelligence system",
    visibility: "public_sanitized",
    summary: "Cloudflare-native news intelligence with provider observability, replayable workflows, immutable claim/evidence controls, and publication gates.",
    content:
      "newsharness combines scheduled collection, normalization, clustering, extraction, enrichment, drafting, publishing, observability, traces, evals, and replay-ready provider data with deterministic claim/evidence governance. Phase 3 verification recorded 26 test files / 149 tests and added source governance, exact-host redirect validation, bounded streaming fetches, hostile-content parsing, rights-aware artifact storage, legal-hold/retention handling, and redacted events. The Phase 4 candidate gate recorded 38 files / 231 tests, architecture checks across 117 files, D1 migration verification, and 54 inventory artifacts with 0 missing. Phase 4 added immutable claim versions/evidence snapshots, reviewer attribution, invalidation, backfill, audited capability activation, and exact-version publication gating.",
    sources: [
      { label: "newsharness case study", path: "app/work/newsharness/page.tsx" },
      { label: "newsharness GitHub", url: "https://github.com/element-bendr/newsharness" },
    ],
  },
  {
    id: "memory-os",
    project: "memory-os",
    category: "Governed engineering executor",
    visibility: "public_sanitized",
    summary: "Governed coding-agent memory and execution system with durable context, sandboxed execution, and verification-gated handoffs.",
    content:
      "memory-os keeps durable project knowledge separate from in-flight task state and execution evidence. Recent merged work includes a governed OpenCode execution runtime, sandbox execution/release CI, bounded cold-start agent-registry retries, role-specific stage timeouts, exception propagation, blocked-status precedence, and preserved readiness/error logs. The system uses Git-reviewed knowledge, Postgres/pgvector projections, Beads task state, retrieval, and verification-gated handoffs. Its design treats model/session output as insufficient to establish governed task completion.",
    sources: [
      { label: "memory-os case study", path: "app/work/memory-os/page.tsx" },
      { label: "memory-os GitHub", url: "https://github.com/element-bendr/memory-os" },
    ],
  },
  {
    id: "memory-os-autonomy",
    project: "Memory OS Autonomy",
    category: "Governed agent infrastructure",
    visibility: "public_sanitized",
    summary: "Promoted A0–A14 autonomy chain separating research/planning from execution authority through deterministic validation and certification.",
    content:
      "Memory OS Autonomy is a TypeScript layer for research, evidence, skeptic review, opportunity gating, grounded specification, independent validation, bounded task materialization, execution binding, durable controller state, retry/recovery, end-to-end certification, and adversarial authority verification. It is deliberately isolated from Memory OS internals and integrates through versioned request/receipt and process contracts. The merged A14 gate recorded 251 total tests / 247 pass / 0 fail / 4 expected live skips, with all A14 tests executed, TypeScript/build/Beads smoke checks passing, and 0 vulnerabilities recorded by npm audit at that gate. Before A14 promotion, the disposable A13 end-to-end run reached final_phase: certified. Later draft evaluator/market-delivery work is not claimed as promoted.",
    sources: [
      { label: "Memory OS Autonomy case study", path: "app/work/memory-os-autonomy/page.tsx" },
      { label: "Memory OS Autonomy GitHub", url: "https://github.com/element-bendr/memory-os-autonomy" },
    ],
  },
  {
    id: "little-agent",
    project: "little-agent",
    category: "Governed runtime",
    visibility: "public_sanitized",
    summary: "PostgreSQL-first governed runtime with append-only authority events, transactional outbox, rebuildable AGE/pgvector projections, and independent promotion review.",
    content:
      "little-agent has promoted Tile 1 and Tile 2 foundations built on PostgreSQL 17, Apache AGE, and pgvector. The promoted database layer includes checksum-bound migrations, canonical identities, optimistic concurrency, append-only authority events, database-enforced UPDATE/DELETE/TRUNCATE denial, transactional outbox, atomic mutation/event/outbox commits, projection rebuild, real AGE traversal, and pgvector cosine-similarity smoke tests. Tile 2 was rejected twice by independent review before promotion: first for an empty mandatory security suite and second for missing direct TRUNCATE proof. A third fresh review accepted after cumulative packet, Mosaic, security, live, build-control, TCP, scope, clean-tree, and Docker-cleanup gates passed. Direct TRUNCATE of the authority ledger is required to fail with PostgreSQL SQLSTATE 55000.",
    sources: [
      { label: "little-agent case study", path: "app/work/little-agent/page.tsx" },
      { label: "little-agent GitHub", url: "https://github.com/element-bendr/little-agent" },
    ],
  },
  {
    id: "palimpsest",
    project: "Palimpsest",
    category: "Verifiable knowledge projection",
    visibility: "public_sanitized",
    summary: "Polylogue-backed projection runtime producing sanitized Markdown with provenance, hashes, redaction checks, and fail-closed ledger verification.",
    content:
      "Palimpsest preserves an authority hierarchy from Polylogue ledger to sanitized Markdown projection to downstream knowledge systems. The merged runtime includes provenance and content hashes, ledger verification, redaction checks, bounded unit/integration tests, GitHub Actions verification, alternate-ledger-root sync coverage, and pinned verification toolchain revisions. The initial merged runtime verification PR contained 19 commits across 20 changed files (+1,315 / -6), but the engineering value is the verified projection/ledger boundary rather than the line count.",
    sources: [
      { label: "Palimpsest case study", path: "app/work/palimpsest/page.tsx" },
      { label: "Palimpsest GitHub", url: "https://github.com/element-bendr/Palimpsest" },
    ],
  },
  {
    id: "case-study-newsharness",
    project: "newsharness",
    category: "Claim-evidence intelligence system",
    visibility: "public_sanitized",
    summary: "Updated public case-study record for newsharness.",
    content:
      "The current public case study presents newsharness as a governed intelligence system rather than an early MVP. It documents Cloudflare Agents/Durable Objects/D1/R2/Workers AI architecture, provider observability, replayable workflows, source governance, immutable claim/evidence controls, reviewer attribution, invalidation, and publication gates. Verified evidence shown publicly includes Phase 3 149 tests and Phase 4 candidate 231 tests, without claiming user scale, revenue, availability, or unverified model accuracy.",
    sources: [{ label: "newsharness case study", path: "app/work/newsharness/page.tsx" }],
  },
  {
    id: "case-study-memory-os",
    project: "memory-os",
    category: "Governed engineering executor",
    visibility: "public_sanitized",
    summary: "Updated public case-study record for memory-os.",
    content:
      "The current public memory-os case study emphasizes governed engineering execution, durable knowledge, sandbox/release CI, bounded failure handling, and verification-gated handoffs. It no longer describes the project only as a memory prototype. Claims remain bounded to merged repository evidence and do not infer traffic, user counts, productivity percentages, or service-level availability.",
    sources: [{ label: "memory-os case study", path: "app/work/memory-os/page.tsx" }],
  },
];
