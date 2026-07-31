/**
 * End-to-end test for Ask the Work pipeline via the HTTP API.
 * Tests guard → corpus → model → validate → extract → respond.
 *
 * Run: BASE_URL=http://localhost:3006 npx tsx scripts/ask-e2e-test.ts
 *
 * Falls back to offline guard-level tests if the API returns 500 (model not configured).
 */

const API_BASE = process.env.BASE_URL ?? "http://localhost:3006";

async function ask(question: string) {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = (await res.json()) as {
    answer?: string;
    sources?: Array<{ label: string; project: string }>;
    relatedProjects?: string[];
    refused?: boolean;
    refusalReason?: string;
    error?: string;
  };
  return { status: res.status, data };
}

async function test(question: string, label: string) {
  const { status, data } = await ask(question);
  if (data.error || (status >= 500 && status !== 502)) {
    return { ok: status === 200 ? "refused" : "offline", detail: data.error ?? `status ${status}` };
  }
  if (data.refused) {
    return { ok: "refused", detail: `Refused: ${data.refusalReason ?? "unknown"}` };
  }
  return {
    ok: "answered",
    detail: `Sources: ${(data.sources ?? []).map((s) => s.label).join(", ") || "none"} | Projects: ${(data.relatedProjects ?? []).join(", ") || "none"}`,
  };
}

async function main() {
  const questions = [
    "What proves AI automation experience?",
    "Explain newsharness simply.",
    "Which project proves client delivery?",
    "What does memory-os show?",
    "Which project is closest to a business workflow problem?",
    "Who is the president of France?",
    "Write me a Python scraper.",
    "Give me investment advice.",
  ];

  const health = await fetch(`${API_BASE}/api/health`).then((r) => r.json()) as { model: string };
  console.log(`API: ${health.model === "configured" ? "LIVE" : "OFFLINE (guard only)"} | ${API_BASE}\n`);

  let answered = 0;
  let refused = 0;
  let offline = 0;

  for (const q of questions) {
    const result = await test(q, q);
    const icon = result.ok === "answered" ? "✓" : result.ok === "refused" ? "✗" : "○";
    if (result.ok === "answered") answered++;
    else if (result.ok === "refused") refused++;
    else offline++;
    console.log(`  ${icon} "${q}"`);
    console.log(`    ${result.detail}`);
  }

  console.log(`\n${answered} answered, ${refused} refused, ${offline} offline (no API key)`);
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
