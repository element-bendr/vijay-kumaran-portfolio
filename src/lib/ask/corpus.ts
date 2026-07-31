import "server-only";

import { projectKnowledge } from "../../data/projectKnowledge";
import type { AskSource, ProjectKnowledgeRecord } from "./types";

const PROJECT_NAMES: string[] = Array.from(
  new Set(projectKnowledge.map((r) => r.project)),
);

const SOURCE_LABELS: string[] = projectKnowledge.flatMap((r) =>
  r.sources.map((s) => s.label),
);

export function getAllowedProjectNames(): string[] {
  return PROJECT_NAMES;
}

export function getAllowedSourceLabels(): string[] {
  return SOURCE_LABELS;
}

export function buildAskCorpus(): string {
  return projectKnowledge
    .map((r) => formatRecord(r))
    .join("\n---\n");
}

function formatRecord(r: ProjectKnowledgeRecord): string {
  const sourceList = r.sources
    .map((s) => `  - ${s.label}${s.url ? ` (${s.url})` : ""}`)
    .join("\n");
  return [
    `PROJECT: ${r.project}`,
    `CATEGORY: ${r.category}`,
    `VISIBILITY: ${r.visibility}`,
    `SUMMARY: ${r.summary}`,
    `SOURCES:`,
    sourceList,
    `CONTENT:`,
    r.content,
  ].join("\n");
}

export function getRelatedProjectsFromAnswer(answer: string): string[] {
  const lower = answer.toLowerCase();
  return PROJECT_NAMES.filter((name) =>
    lower.includes(name.toLowerCase()),
  );
}

export function estimateCorpusSize(): { chars: number; approxTokens: number } {
  const text = buildAskCorpus();
  return {
    chars: text.length,
    approxTokens: Math.ceil(text.length / 3.5),
  };
}

export function extractSourcesFromAnswer(answer: string): AskSource[] {
  const lower = answer.toLowerCase();
  const seen = new Set<string>();
  const matched: AskSource[] = [];
  for (const record of projectKnowledge) {
    for (const source of record.sources) {
      const key = `${source.label}|${record.project}`;
      if (seen.has(key)) continue;
      if (lower.includes(source.label.toLowerCase())) {
        seen.add(key);
        matched.push({
          label: source.label,
          project: record.project,
          path: source.path,
          url: source.url,
        });
      }
    }
  }
  return matched;
}
