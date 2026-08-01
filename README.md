# Vijay Kumaran Portfolio

AI Automation & Web Systems Consultant portfolio. Built with Next.js App Router, TypeScript, Tailwind CSS, and static export (`output: "export"`) deployed to Cloudflare Pages. The Ask the Work API is a standalone Cloudflare Worker.

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

The Ask the Work feature uses a direct-corpus-in-prompt architecture (v1). The full public-safe project corpus (~8k words) fits in the model prompt — no retrieval, no vector store, no D1 indexing needed.

## Ask the Work: direct-corpus v1

The live Q&A component on the homepage answers questions about Vijay Kumaran's projects, skills, and services. Answers are grounded in the indexed corpus only. If the corpus doesn't support an answer, the assistant refuses.

### Architecture

- **No retrieval** — the full corpus loads into every prompt
- **No D1/FTS5/Vectorize** — no indexing infrastructure
- **4-layer hallucination prevention**: prompt grounding → input guard → answer validation → frontend sanitization
- **Model provider**: configurable via env vars (Cloudflare Workers AI + AI Gateway, or any OpenAI-compatible provider like DeepSeek)

### Setup

```bash
# Option 1: Cloudflare Workers AI + AI Gateway
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put AI_GATEWAY_ID
wrangler secret put AI_GATEWAY_TOKEN
wrangler secret put AI_MODEL

# Option 2: Any OpenAI-compatible provider (DeepSeek, etc.)
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

### Future phases

When the corpus outgrows a single prompt window (~35k words), add D1/FTS5 or Vectorize for retrieval. For now, direct-corpus covers the entire knowledge base.

The profile README lives in [`element-bendr/element-bendr`](https://github.com/element-bendr/element-bendr) and should only link to this site and the public case studies repository.
