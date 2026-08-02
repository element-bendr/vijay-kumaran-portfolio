export type Progress = {
  xoWins: number;
  xoLosses: number;
  xoDraws: number;
  questionsAsked: number;
  visited: string[];
  secrets: string[];
};

const KEY = "vijay-progress";
const CASE_STUDIES = ["newsharness", "memory-os", "kpdc-trifecta", "steelmade", "chronoquill", "artsports-content-os", "mnemos"];

export function getProgress(): Progress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      xoWins: parsed.xoWins ?? 0,
      xoLosses: parsed.xoLosses ?? 0,
      xoDraws: parsed.xoDraws ?? 0,
      questionsAsked: parsed.questionsAsked ?? 0,
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      secrets: Array.isArray(parsed.secrets) ? parsed.secrets : [],
    };
  } catch {
    return empty();
  }
}

export function unlockedCount(p: Progress): number {
  const visited = CASE_STUDIES.filter((slug) => p.visited.includes(slug)).length;
  return visited + p.secrets.length;
}

export function totalCount(): number {
  return CASE_STUDIES.length + 4;
}

export function recordVisit(slug: string): Progress {
  const p = getProgress();
  if (!p.visited.includes(slug)) p.visited.push(slug);
  return save(p);
}

export function recordSecret(id: string): Progress {
  const p = getProgress();
  if (!p.secrets.includes(id)) p.secrets.push(id);
  return save(p);
}

export function recordWin(): Progress {
  const p = getProgress();
  p.xoWins++;
  return save(p);
}

export function recordLoss(): Progress {
  const p = getProgress();
  p.xoLosses++;
  return save(p);
}

export function recordDraw(): Progress {
  const p = getProgress();
  p.xoDraws++;
  return save(p);
}

export function recordQuestion(): Progress {
  const p = getProgress();
  p.questionsAsked++;
  return save(p);
}

function save(p: Progress): Progress {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — keep in-memory value */
  }
  return p;
}

function empty(): Progress {
  return { xoWins: 0, xoLosses: 0, xoDraws: 0, questionsAsked: 0, visited: [], secrets: [] };
}
