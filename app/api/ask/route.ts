
import { NextResponse } from "next/server";
import { buildAskCorpus, extractSourcesFromAnswer, getAllowedProjectNames, getAllowedSourceLabels, getRelatedProjectsFromAnswer } from "../../../src/lib/ask/corpus";
import { guardQuestion } from "../../../src/lib/ask/guard";
import { ConfigError, generateAskAnswer, ModelUnavailableError } from "../../../src/lib/ask/model";
import { validateAnswer } from "../../../src/lib/ask/validateAnswer";
import { REFUSAL_PHRASE } from "../../../src/lib/ask/types";

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

export async function POST(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Too many questions. Wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!body || typeof (body as Record<string, unknown>).question !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid 'question' field." },
      { status: 400 },
    );
  }

  const { question: rawQuestion } = body as { question: string };

  const guardResult = guardQuestion(rawQuestion);
  if (!guardResult.allowed) {
    return NextResponse.json({
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
    return NextResponse.json(
      { error: "Failed to build knowledge corpus." },
      { status: 500 },
    );
  }

  let answer: string;
  try {
    answer = await generateAskAnswer({
      question: guardResult.sanitizedQuestion,
      corpus,
    });
  } catch (e) {
    if (e instanceof ConfigError) {
      return NextResponse.json(
        { error: "Service configuration error." },
        { status: 500 },
      );
    }
    if (e instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again shortly." },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { error: "Request timed out. Try a shorter question." },
      { status: 504 },
    );
  }

  const allowedLabels = getAllowedSourceLabels();
  const allowedProjects = getAllowedProjectNames();

  const validation = validateAnswer(answer, allowedLabels, allowedProjects);
  if (!validation.valid) {
    return NextResponse.json({
      answer: REFUSAL_PHRASE,
      sources: [],
      relatedProjects: [],
      refused: true,
      refusalReason: validation.reason,
    });
  }

  return NextResponse.json({
    answer,
    sources: extractSourcesFromAnswer(answer),
    relatedProjects: getRelatedProjectsFromAnswer(answer),
    refused: false,
  });
}
