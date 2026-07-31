import "server-only";

import type { GuardResult } from "./types";

const MAX_LENGTH = 500;

const STRIP_PATTERNS: Array<[RegExp, string]> = [
  [/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""],
  [/[\u200B-\u200F\uFEFF]/g, ""],
  [/```[a-z]*\n?/gi, ""],
  [/~~~\n?/g, ""],
  [/\u200B/g, ""],
];

const BLOCKED_STEMS = [
  "politic", "president", "election", "congress", "parliament",
  "diagnose", "symptom", "treatment", "disease", "prescription",
  "sue", "lawsuit", "attorney", "legal advice",
  "invest ", "stock ", "trading", "portfolio alloc", "financial advice", "investment advice",
  "latest news", "breaking news", "current event",
  "write me a python", "write me a java", "write me a c++", "how to code", "debug this",
  "what is the meaning of life",
  "write a script", "write code", "help me code",
  "latest model", "best model", "which model should",
  "openai", "chatgpt", "claude", "gemini", "anthropic",
  "who won", "who is winning", "score of", "match today",
  "weather in", "what is the weather",
  "recipe", "how to cook",
];

export function guardQuestion(raw: string): GuardResult {
  if (typeof raw !== "string") {
    return { allowed: false, sanitizedQuestion: "", reason: "Question must be a string." };
  }

  let q = raw.trim();

  for (const [pattern, replacement] of STRIP_PATTERNS) {
    q = q.replace(pattern, replacement);
  }

  q = q.replace(/\s+/g, " ").trim();

  if (q.length === 0) {
    return { allowed: false, sanitizedQuestion: q, reason: "Question is empty." };
  }

  if (q.length > MAX_LENGTH) {
    return { allowed: false, sanitizedQuestion: q, reason: `Question is too long (max ${MAX_LENGTH} characters).` };
  }

  const lower = q.toLowerCase();
  for (const stem of BLOCKED_STEMS) {
    if (lower.includes(stem)) {
      return { allowed: false, sanitizedQuestion: q, reason: "Question appears unrelated to the portfolio. Please ask about projects, skills, or services shown on the site." };
    }
  }

  return { allowed: true, sanitizedQuestion: q };
}
