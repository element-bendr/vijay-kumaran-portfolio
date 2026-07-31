export type ProjectKnowledgeRecord = {
  id: string;
  project: string;
  category: string;
  visibility: "public" | "public_sanitized";
  summary: string;
  content: string;
  sources: Array<{ label: string; path?: string; url?: string }>;
};

export type AskRequest = { question: string };

export type AskSource = {
  label: string;
  project: string;
  path?: string;
  url?: string;
};

export type AskResponse = {
  answer: string;
  sources: AskSource[];
  relatedProjects: string[];
  refused: boolean;
  refusalReason?: string;
};

export type GuardResult = {
  allowed: boolean;
  sanitizedQuestion: string;
  reason?: string;
};

export type ValidationResult = {
  valid: boolean;
  reason?: string;
};

export const REFUSAL_PHRASE =
  "I don't have enough indexed evidence to answer that.";
