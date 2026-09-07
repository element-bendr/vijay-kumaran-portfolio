# Vijay Kumaran Portfolio

Portfolio for an **AI Systems Engineer / Agentic Infrastructure Engineer** with additional production web, business-system, and automation delivery experience.

Built with Next.js App Router, TypeScript, Tailwind CSS, and static export (`output: "export"`) deployed to Cloudflare Pages. **Ask the Work** is served by a standalone Cloudflare Worker.

## Current positioning

The portfolio now leads with:

- governed AI systems and agent infrastructure
- deterministic control planes around probabilistic models
- evidence/provenance and verification
- production automation and internal systems
- Cloudflare-native application infrastructure
- PostgreSQL-backed authority and state
- production web systems and client delivery

The strongest current engineering case studies are PCAS, newsharness, Memory OS Autonomy, little-agent, memory-os, and Palimpsest. Private repository URLs are intentionally not exposed by the public case-study corpus.

## Local development

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
```

## Cloudflare deployment

Frontend (static export):

```bash
npm run build
npx wrangler pages deploy out --project-name vijay-kumaran-portfolio-ask
```

API Worker (Ask the Work):

```bash
npm run deploy:api-worker
npx wrangler secret put AI_PROVIDER_URL   # wrangler-api.toml
npx wrangler secret put AI_PROVIDER_KEY
npx wrangler secret put AI_MODEL
```

## Ask the Work: curated direct-corpus architecture

The live Q&A component answers questions about projects, skills, architecture, production controls, test evidence, services, and project comparisons.

The corpus is currently small enough to fit into the model prompt, so v1 deliberately does **not** use retrieval infrastructure.

### Architecture

- **No retrieval yet** — the complete curated public-safe corpus loads into the prompt
- **No D1/FTS5/Vectorize for Q&A** — no indexing infrastructure is required at the current corpus size
- **Curated evidence overrides** — `src/data/projectKnowledgeRefresh.ts` replaces stale records by stable ID without deleting unrelated historical records
- **Private-source boundary** — `public_sanitized` records expose sanitized case-study sources, not private repository URLs
- **4-layer hallucination prevention** — prompt grounding → input guard → answer validation → frontend sanitization
- **Configurable model provider** — Cloudflare Workers AI + AI Gateway or an OpenAI-compatible provider

The effective Ask corpus is assembled in `src/lib/ask/corpus.ts`.

### Why GitHub changes do not publish themselves

Private engineering repositories are authoritative development sources, but they are **not** direct public publishing sources.

The promotion path is intentionally:

```text
private GitHub evidence
        ↓
review / verification
        ↓
public-safe evidence record
        ↓
portfolio case study + Ask corpus
```

A repository commit, README edit, draft PR, or model-generated summary cannot automatically become a recruiter-facing claim. New evidence is promoted only after it is checked for status, provenance, privacy, and whether the underlying work is actually merged/certified.

When the corpus becomes large enough for retrieval, the same approved public-safe records should become the ingestion boundary for D1/FTS5 or Vectorize rather than indexing private repositories directly.

### Setup

```bash
# Option 1: Cloudflare Workers AI + AI Gateway
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put AI_GATEWAY_ID
wrangler secret put AI_GATEWAY_TOKEN
wrangler secret put AI_MODEL

# Option 2: Any OpenAI-compatible provider
wrangler secret put AI_PROVIDER_URL
wrangler secret put AI_PROVIDER_KEY
wrangler secret put AI_MODEL
```

### Endpoints

The API is served by the standalone Worker `vijay-kumaran-portfolio-api.random-planzz.workers.dev` (CORS-enabled for the Pages frontend).

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check (`{ ok, model, provider }`) |
| `POST` | `/api/ask` | Ask a question (`{ question }`) |

### Retrieval threshold

When the approved corpus outgrows a single prompt window, move the **approved public-safe records** to D1/FTS5 or Vectorize and preserve the same source/provenance contract. Do not use retrieval as an excuse to ingest unreviewed private repository content.

## Public profile

The GitHub profile README lives in [`element-bendr/element-bendr`](https://github.com/element-bendr/element-bendr) and links to this portfolio and the public case-studies repository.
