You are Codex implementing Phase 2 of Vijay Kumaran’s portfolio website.

Repository:
element-bendr/vijay-kumaran-portfolio

Branch:
feature/ask-the-work-direct-corpus-v1

Goal:
Build “Ask the Work”, a constrained project Q&A feature for the portfolio website.

Important architecture decision:
The current project corpus is tiny. Do not build RAG retrieval yet.
Do not use D1, FTS5, Vectorize, embeddings, R2, or GitHub ingestion in this phase.

Instead:
Load the full public-safe project corpus into the model prompt and force the model to answer only from that corpus.

This is direct-corpus grounded Q&A, not retrieval-based RAG.

Stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Cloudflare Workers via OpenNext
- Cloudflare AI Gateway for model calls
- Workers AI or configured model provider via AI Gateway
- No database in v1 unless already present for unrelated site needs

Production hardening requirements:

These must be included in every relevant file below. Do not skip them.

Security:

- Prompt injection: strip control characters, zero-width spaces, and markdown fences from user input before it enters the prompt. User typing ``` could close the corpus block.
- XSS: never dangerouslySetInnerHTML with raw model output. Use DOMPurify or equivalent before rendering answers.
- Markdown rendering: use a safe library (marked + DOMPurify, or react-markdown with sanitize). The model WILL return markdown (bullet lists, bold, code).
- server-only boundary: add import "server-only" to model.ts, corpus.ts, prompts.ts, validateAnswer.ts, and route.ts. None of these must ever be bundled into client JavaScript.
- Secrets: CLOUDFLARE_ACCOUNT_ID must NOT have NEXT_PUBLIC_ prefix. Secrets go in wrangler secrets / .dev.vars, never in wrangler.toml [vars].

Reliability:

- Model timeout: AbortController with 15s deadline in model.ts. Workers have 30s CPU limit.
- Model retry: 3 retries with exponential backoff (200ms / 400ms / 800ms) on 5xx or gateway errors.
- Health check: GET /api/health returns { ok: true, model: "configured" | "missing" }.
- AI Gateway logging: enable the free built-in request/response logging in the gateway config.

Answer validation hardening (beyond the checks already listed):

- Reject answer if it mentions "corpus", "system prompt", "PROJECT:", "<corpus>", "indexed corpus" — these are prompt leaks.
- Reject answer if it names a project NOT in the allowed project labels.
- Reject answer if it contains zero project-name citations and is not a refusal phrase.
- Reject answer if it contains "as an AI", "based on my training", "general knowledge" — model is straying.

Frontend error taxonomy — six distinct states, each with different UX:

1. network-error: "Can't reach the assistant right now. Check your connection."
2. timeout: "This is taking longer than expected. Try a shorter question."
3. rate-limited: "Too many questions. Wait a moment and try again."
4. refused: model refused (show refusal reason from API).
5. server-error: "Something went wrong on our side. Try again shortly."
6. invalid-response: "Received an unexpected response. Try rephrasing."

Frontend loading:

- AbortController on fetch + visible cancel button during loading.
- Microcopy during load: "Checking the work…" (not a bare spinner).
- Estimated time: ~3-6s. No progress bar — just a calm pulse.

Source extraction algorithm:

Do not parse "Sources used" text. Instead, since we own the corpus and know all project names and source labels, extract sources by substring-matching known labels in the answer text. More reliable than fragile LLM output parsing.

relatedProjects semantics:

relatedProjects = all project names found in the answer text via substring match of known project names (case-insensitive). Not the same as sources (which are specific source records). If the answer mentions newsharness and memory-os, both appear in relatedProjects.

getAllowedSourceLabels() purpose:

Used by validateAnswer.ts to check that every source name cited in the model output matches a known corpus label. Prevents the model from inventing source names.

Secrets setup order (deploy checklist):

1. Create .env.example with all four env vars and dummy values.
2. Set secrets: wrangler secret put CLOUDFLARE_ACCOUNT_ID, AI_GATEWAY_ID, AI_GATEWAY_TOKEN.
3. Set non-secret var: wrangler.toml [vars] for AI_MODEL (default value is safe to commit).
4. Create .dev.vars for local wrangler dev.
5. Deploy: npm run deploy.
6. Verify: curl POST /api/ask with smoke test question.

Feature name:
Ask the Work

Frontend copy:
Ask focused questions about the projects, stack, and proof behind this portfolio.
Answers are grounded in indexed project case studies and documentation only.

Core behavior:

- User asks a question.
- API loads full project corpus from local TypeScript data.
- API sends corpus + question to model through AI Gateway.
- Model answers only from corpus.
- If unsupported, model refuses.
- API validates response for source labels and obvious hallucination patterns.
- Frontend shows answer and sources.

Allowed question areas:

- Vijay Kumaran’s projects
- skills and proof
- services shown in the portfolio
- project comparisons
- stack and implementation proof
- which project is relevant to a business need

Refuse:

- unrelated general knowledge
- politics
- medical/legal/financial advice
- current events
- general coding help unrelated to Vijay’s projects
- requests outside portfolio evidence

Required refusal:
“I don’t have enough indexed evidence to answer that.”

Files to create/update:

1. src/data/projectKnowledge.ts

Create structured public-safe corpus records for:

- GitHub profile positioning
- portfolio services
- newsharness
- memory-os
- KPDC / Trifecta
- SteelMade
- ChronoQuill
- ArtSports Content OS
- Mnemos

Each record:
{
id: string;
project: string;
category: string;
visibility: "public" | "public_sanitized";
summary: string;
content: string;
sources: Array<{
label: string;
path?: string;
url?: string;
}>;
}

Use only claims already present in the portfolio/case-study copy. Do not invent:

- metrics
- team sizes
- timelines
- revenue claims
- client quotes
- private implementation details
- private URLs
- fake outcomes

2. src/lib/ask/types.ts

Define:

- ProjectKnowledgeRecord
- AskRequest
- AskResponse
- AskSource

3. src/lib/ask/corpus.ts

Functions:

- buildAskCorpus()
- getAllowedSourceLabels()
- getRelatedProjectsFromAnswer()
- estimateCorpusSize()

The corpus should be formatted clearly:

PROJECT:
CATEGORY:
VISIBILITY:
SUMMARY:
SOURCES:
CONTENT:

Separate records with "---".

4. src/lib/ask/guard.ts

Function:
guardQuestion(question: string)

Behavior:

- strip control characters (\x00-\x1F except \n, \t), zero-width spaces (\u200B-\u200F), and markdown fences (```, ~~~) from the question BEFORE category checks
- reject empty question (after stripping)
- reject question over 500 chars (after stripping)
- reject obvious unrelated categories (politics, medical, legal, finance, general coding, current events)
- allow project/profile/skills/services/stack/proof/comparison/business-fit questions

Return:
{ allowed: boolean; sanitizedQuestion: string; reason?: string }

5. src/lib/ask/prompts.ts

System prompt:

You are Ask the Work, the project Q&A assistant for Vijay Kumaran’s portfolio.

You answer only from the indexed corpus provided below.

You must not use general knowledge, outside assumptions, web knowledge, or model memory.

If the answer is not clearly supported by the corpus, say:
“I don’t have enough indexed evidence to answer that.”

You may answer questions about:

- Vijay Kumaran’s projects
- Vijay’s skills and proof
- services shown in the portfolio
- project comparisons
- stack and implementation proof
- what project is relevant to a business need

You must refuse unrelated questions.

Always include a short “Sources used” list naming the project/source records used.

Do not invent metrics, client names, timelines, team sizes, private details, or implementation claims not present in the corpus.

Keep answers concise, useful, and suitable for recruiters, clients, or technical reviewers.

User prompt format:

Indexed corpus: <corpus>
${corpus} </corpus>

User question:
${question}

Answer only from the corpus.
If the corpus does not support the answer, refuse.

6. src/lib/ask/model.ts

import "server-only";

Function:
generateAskAnswer({ question, corpus })

Use Cloudflare AI Gateway REST API.

Environment variables:

- CLOUDFLARE_ACCOUNT_ID
- AI_GATEWAY_ID
- AI_GATEWAY_TOKEN
- AI_MODEL

Default AI_MODEL:
@cf/meta/llama-3.1-8b-instruct

Do not hardcode tokens. Do not use NEXT_PUBLIC_ prefix for any of these.

Use temperature: 0.1.
Use max tokens: 700.

Timeout: AbortController with 15s deadline.
Retry: 3 retries with exponential backoff (200ms / 400ms / 800ms) on 5xx status or fetch errors. After 3 failures, throw ModelUnavailableError.

AI Gateway: enable built-in request/response logging and caching in the gateway config.
Cached identical-question responses reduce latency and AI Gateway cost.

Handle missing env vars gracefully — throw ConfigError with message listing which vars are missing.
Never return raw error details to the client.

7. src/lib/ask/validateAnswer.ts

import "server-only";

Validate model output for hallucination, prompt leaks, and format compliance.

Checks (any failure → refused=true, refusalReason set):

Format checks:
- response must include "Sources used" heading
- source names must match known corpus/project labels (use getAllowedSourceLabels())

Hallucination patterns (reject if any found):
- Fake metrics: "99.99%", "0 downtime", "10x faster", "100% success"
- Fake team/scale: "10 engineers", "8 months", "team of", "millions of users"
- Fake authority: "revenue", "guaranteed", "certified", "award-winning"
- Fake social proof: "client quote", "testimonial", "Leadership Team"
- Fake project names: any project-like name not in allowed list

Prompt leak patterns (reject if any found):
- "corpus", "system prompt", "PROJECT:", "<corpus>", "</corpus>"
- "indexed corpus", "provided context", "based on the corpus"
- "as an AI", "based on my training", "general knowledge", "my knowledge cutoff"

Citation check:
- Answer must mention at least one known project name, OR exactly match the refusal phrase

8. src/app/api/ask/route.ts

import "server-only";

POST JSON:
{ question: string }

Return:
{
answer: string;
sources: Array<{
label: string;
project: string;
path?: string;
url?: string;
}>;
relatedProjects: string[];
refused: boolean;
refusalReason?: string;
}

Behavior:

- validate body (400 if missing question, 400 if not string)
- guard question → if not allowed, return 200 with refused=true
- build corpus → if fails (should never — local data), return 500
- call model → if ModelUnavailableError, return 502 with "Service unavailable" message
  → if timeout, return 504 with "Request timed out" message
  → if ConfigError (missing env), return 500 (don't leak which vars)
- validate answer → if fails, return 200 with refused=true
- extract sources: substring-match known project names and source labels in answer text — do NOT parse "Sources used" from model output
- extract relatedProjects: all known project names found in answer (case-insensitive)
- return response
- no streaming in v1

Also add:
GET /api/health → { ok: true, model: "configured" | "missing" }
Checks if all four env vars are set. Used for deploy verification.

9. Frontend

Replace static AskTheWorkTeaser with live AskTheWork component.

UI requirements:

- Keep Quiet Systems design language.
- Minimal, calm, no chatbot avatar.
- One input.
- Suggested question chips:
  - What proves AI automation experience?
  - Explain newsharness simply.
  - Which project proves client delivery?
  - What does memory-os show?

- Submit button.
- Cancel button during loading (AbortController on fetch).
- Loading state: "Checking the work…" microcopy + calm pulse (not bare spinner). ~3-6s wait.
- Answer card with safe markdown rendering (marked + DOMPurify, or react-markdown with sanitize).
- Source chips (link to case study if available).
- Related project chips.
- Refusal state (show refusal reason in quiet tone).
- Error states (6 distinct types — see error taxonomy in production hardening above):
  network-error, timeout, rate-limited, refused, server-error, invalid-response.

Do not make it look like customer-support chat.
Do not add a robot mascot.
Do not add fake typing drama.
Do not use dangerouslySetInnerHTML with model output.
Do not leak raw error messages from the server.

10. Secrets setup + README update

Create .env.example:
```
# Ask the Work — Cloudflare AI Gateway
CLOUDFLARE_ACCOUNT_ID=your-account-id
AI_GATEWAY_ID=your-gateway-id
AI_GATEWAY_TOKEN=your-gateway-token
AI_MODEL=@cf/meta/llama-3.1-8b-instruct
```

Create .dev.vars (same keys, real values — gitignored, never committed).

Deploy checklist (in order):
1. wrangler secret put CLOUDFLARE_ACCOUNT_ID
2. wrangler secret put AI_GATEWAY_ID
3. wrangler secret put AI_GATEWAY_TOKEN
4. Add to wrangler.toml [vars]: AI_MODEL = "@cf/meta/llama-3.1-8b-instruct"
5. npm run build && npm run lint
6. npm run deploy
7. curl -X POST https://your-domain/api/ask -H "Content-Type: application/json" -d '{"question":"What proves AI automation experience?"}'

README section: "Ask the Work: direct-corpus v1"

Explain:
- The corpus is currently small enough to fit in the prompt.
- V1 does not use retrieval, embeddings, Vectorize, or D1.
- Future phases may add D1/FTS5 or Vectorize when the corpus grows.
- All source extraction is substring-based (no fragile LLM output parsing).
- AI Gateway handles model routing, caching, rate limiting, and logging.

Quality checks:

- npm run lint
- npm run build
- curl GET /api/health on deployed worker
- Manual smoke test with the questions below (curl or browser)

Smoke test questions:

Should answer:

- What proves Vijay can build AI automations?
- Explain newsharness simply.
- Which project proves client delivery?
- What does memory-os show?
- Which project is closest to a business workflow problem?

Should refuse:

- Who is the president of France?
- Write me a Python scraper.
- What is the latest OpenAI model?
- Give me investment advice.

Do not:

- build D1
- build FTS5
- build Vectorize
- build embeddings
- build R2 snapshots
- build GitHub ingestion
- add fake project claims
- use general web answers
- expose secrets to the browser
- use NEXT_PUBLIC_ prefix for API keys or secrets
- use dangerouslySetInnerHTML with model output

Commit:
feat: add direct-corpus ask the work

Final response:
Summarize files changed, env vars needed, API behavior, frontend behavior, smoke test results, and known limitations.
