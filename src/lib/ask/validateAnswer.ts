import { REFUSAL_PHRASE, type ValidationResult } from "./types";

const HALLUCINATION_PATTERNS: Array<[RegExp, string]> = [
  [/\b99[.\s]*99%?\b/, "Fake percentage claim"],
  [/\b0\s*downtime\b/i, "Fake uptime claim"],
  [/\b\d+\s*x\s*faster\b/i, "Fake multiplier claim"],
  [/\b100%?\s*(success|uptime|reliable)\b/i, "Fake absolute claim"],
  [/\b\d+\s*engineers?\b/i, "Fake team size"],
  [/\b\d+\s*months?\b/i, "Fake timeline"],
  [/\bteam\s*of\s*\d+\b/i, "Fake team size"],
  [/\bmillions?\s*of\s*users?\b/i, "Fake scale claim"],
  [/\b\d+[kK]\+\s*users?\b/i, "Fake scale claim"],
  [/\brevenue\b/i, "Fake revenue claim"],
  [/\bguaranteed\b/i, "Fake guarantee"],
  [/\bcertified\b/i, "Fake certification"],
  [/\baward[\s-]winning\b/i, "Fake award claim"],
  [/\bclient\s*quote\b/i, "Fake testimonial"],
  [/\btestimonial\b/i, "Fake testimonial"],
  [/\bleadership\s*team\b/i, "Fake org claim"],
  [/\b\d+%\s*(reduction|improvement|increase|decrease)/i, "Fake metric"],
  [/\bproven\s*(track\s*)?record\b/i, "Vague claim"],
];

const PROMPT_LEAK_PATTERNS: Array<[RegExp, string]> = [
  [/<\/?corpus>/i, "Prompt leak: corpus tags"],
  [/\bPROJECT:\b/, "Prompt leak: format label"],
  [/\bCATEGORY:\b/, "Prompt leak: format label"],
  [/\bVISIBILITY:\b/, "Prompt leak: format label"],
  [/\bsystem\s*prompt\b/i, "Prompt leak: system prompt"],
  [/\bindexed\s*corpus\b/i, "Prompt leak: indexed corpus"],
  [/\bas\s*an\s*AI\b/i, "Straying from persona"],
  [/\bbased\s*on\s*my\s*training\b/i, "Straying from persona"],
  [/\bgeneral\s*knowledge\b/i, "Straying from persona"],
  [/\bmy\s*knowledge\s*cutoff\b/i, "Straying from persona"],
  [/\bI\s*am\s*an\s*AI\b/i, "Straying from persona"],
];

export function validateAnswer(
  answer: string,
  allowedLabels: string[],
  allowedProjects: string[],
): ValidationResult {
  if (typeof answer !== "string" || answer.trim().length === 0) {
    return { valid: false, reason: "Empty answer." };
  }

  if (answer.toLowerCase().includes(REFUSAL_PHRASE.toLowerCase())) {
    return { valid: true };
  }

  if (!answer.includes("Sources used")) {
    return {
      valid: false,
      reason: "Answer missing Sources used section.",
    };
  }

  for (const [pattern, reason] of HALLUCINATION_PATTERNS) {
    if (pattern.test(answer)) {
      return { valid: false, reason };
    }
  }

  for (const [pattern, reason] of PROMPT_LEAK_PATTERNS) {
    if (pattern.test(answer)) {
      return { valid: false, reason };
    }
  }

  const lower = answer.toLowerCase();
  const citesProject = allowedProjects.some((name) =>
    lower.includes(name.toLowerCase()),
  );
  if (!citesProject) {
    return {
      valid: false,
      reason: "Answer does not cite any known project.",
    };
  }

  return { valid: true };
}
