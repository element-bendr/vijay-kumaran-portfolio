import { buildAskCorpus, extractSourcesFromAnswer, getAllowedProjectNames, getAllowedSourceLabels, getRelatedProjectsFromAnswer } from "../src/lib/ask/corpus";
import { guardQuestion } from "../src/lib/ask/guard";
import { ConfigError, generateAskAnswer, ModelUnavailableError } from "../src/lib/ask/model";
import { validateAnswer } from "../src/lib/ask/validateAnswer";
import { REFUSAL_PHRASE } from "../src/lib/ask/types";

const RATE_WINDOW = 60_000;
const RATE_LIMIT = 20;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    if (rateMap.size > 10_000) rateMap.clear();
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function handleAsk(request: Request): Promise<Response> {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!checkRate(ip)) {
    return json({ error: "Too many questions. Wait a moment and try again." }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (!body || typeof (body as Record<string, unknown>).question !== "string") {
    return json({ error: "Missing or invalid 'question' field." }, 400);
  }

  const { question: rawQuestion } = body as { question: string };

  const guardResult = guardQuestion(rawQuestion);
  if (!guardResult.allowed) {
    return json({
      answer: REFUSAL_PHRASE,
      sources: [],
      relatedProjects: [],
      refused: true,
      refusalReason: guardResult.reason,
    });
  }

  let corpus: string;
  try {
    corpus = buildAskCorpus();
  } catch {
    return json({ error: "Failed to build knowledge corpus." }, 500);
  }

  let answer: string;
  try {
    answer = await generateAskAnswer({
      question: guardResult.sanitizedQuestion,
      corpus,
    });
  } catch (e) {
    if (e instanceof ConfigError) {
      return json({ error: "Service configuration error." }, 500);
    }
    if (e instanceof ModelUnavailableError) {
      return json(
        { error: "The assistant is temporarily unavailable. Please try again shortly." },
        502,
      );
    }
    return json({ error: "Request timed out. Try a shorter question." }, 504);
  }

  const allowedLabels = getAllowedSourceLabels();
  const allowedProjects = getAllowedProjectNames();

  const validation = validateAnswer(answer, allowedLabels, allowedProjects);
  if (!validation.valid) {
    return json({
      answer: REFUSAL_PHRASE,
      sources: [],
      relatedProjects: [],
      refused: true,
      refusalReason: validation.reason,
    });
  }

  return json({
    answer,
    sources: extractSourcesFromAnswer(answer),
    relatedProjects: getRelatedProjectsFromAnswer(answer),
    refused: false,
  });
}

function handleHealth(): Response {
  const usingProvider = !!process.env.AI_PROVIDER_URL;
  const modelConfigured = usingProvider
    ? !!process.env.AI_PROVIDER_URL && !!process.env.AI_PROVIDER_KEY && !!process.env.AI_MODEL
    : !!process.env.CLOUDFLARE_ACCOUNT_ID && !!process.env.AI_GATEWAY_ID && !!process.env.AI_GATEWAY_TOKEN && !!process.env.AI_MODEL;

  return json({
    ok: true,
    model: modelConfigured ? "configured" : "missing",
    provider: usingProvider ? "custom" : "cloudflare-workers-ai",
  });
}

export default {
  async fetch(request: Request, env: Record<string, unknown>): Promise<Response> {
    Object.assign(process.env, env);
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/api/health") {
      return handleHealth();
    }
    if (request.method === "POST" && url.pathname === "/api/ask") {
      return handleAsk(request);
    }
    return json({ error: "Not found" }, 404);
  },
};
