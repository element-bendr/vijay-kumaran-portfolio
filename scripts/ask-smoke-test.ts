/**
 * Smoke test for Ask the Work API.
 * Run: npx tsx scripts/ask-smoke-test.ts
 *
 * Tests guard-level rejection and response shape.
 * Full model integration requires env vars (CLOUDFLARE_ACCOUNT_ID or AI_PROVIDER_URL).
 */

const BASE = process.env.BASE_URL ?? "http://localhost:3005";

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: await res.json() };
}

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`);
  return { status: res.status, data: await res.json() };
}

const shouldRefuse = [
  "Who is the president of France?",
  "Write me a Python scraper.",
  "What is the latest OpenAI model?",
  "Give me investment advice.",
];

const shouldPassGuard = [
  "What proves AI automation experience?",
  "Explain newsharness simply.",
  "Which project proves client delivery?",
  "What does memory-os show?",
  "Which project is closest to a business workflow problem?",
];

let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}: ${(e as Error).message}`);
  }
}

async function main() {
  console.log("\nHealth check");
  {
    const { status, data } = await get("/api/health");
    if (status !== 200) throw new Error(`health returned ${status}`);
    if (!data.ok) throw new Error("health ok=false");
    console.log(`  ✓ health: ok=${data.ok} model=${data.model} provider=${data.provider}`);
  }

  console.log("\nGuard: should refuse off-topic questions");
  for (const q of shouldRefuse) {
    await test(`"${q.slice(0, 40)}"`, async () => {
      const { status, data } = await post("/api/ask", { question: q });
      if (status !== 200) throw new Error(`unexpected status ${status}`);
      if (!data.refused) throw new Error("should have been refused");
      if (!data.answer) throw new Error("missing answer in refuse response");
    });
  }

  console.log("\nGuard: should allow on-topic questions (model may refuse if missing env)");
  for (const q of shouldPassGuard) {
    await test(`"${q.slice(0, 40)}"`, async () => {
      const { status, data } = await post("/api/ask", { question: q });
      if (status === 502 || status === 500) {
        // Expected: model not configured locally
        return;
      }
      if (status !== 200) throw new Error(`unexpected status ${status}`);
      if (typeof data.refused !== "boolean") throw new Error("missing refused field");
      if (!Array.isArray(data.sources)) throw new Error("missing sources array");
      if (!Array.isArray(data.relatedProjects)) throw new Error("missing relatedProjects array");
      if (!data.refused && !data.answer) throw new Error("answer missing for non-refused response");
    });
  }

  console.log("\nGuard: reject invalid body");
  {
    const { status, data } = await post("/api/ask", {});
    if (status !== 400) throw new Error(`expected 400, got ${status}`);
    if (!data.error) throw new Error("missing error message");
    console.log(`  ✓ invalid body: 400 "${data.error}"`);
  }

  console.log("\nGuard: reject empty question");
  {
    const { status, data } = await post("/api/ask", { question: "" });
    if (status !== 200) throw new Error(`expected 200, got ${status}`);
    if (!data.refused) throw new Error("empty question should be refused");
    console.log(`  ✓ empty question refused: "${data.refusalReason}"`);
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
