"use client";

import { useCallback, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { AnimatedArrow, MotionItem, MotionSection } from "@/components/motion";
import { SectionLabel } from "@/components/site";

type Source = {
  label: string;
  project: string;
  path?: string;
  url?: string;
};

const PATH_TO_ROUTE: Record<string, string> = {
  "app/about/page.tsx": "/about",
  "app/services/page.tsx": "/services",
  "data/services.ts": "/services",
  "data/projects.ts": "/work",
  "app/work/newsharness/page.tsx": "/work/newsharness",
};

function resolveSourceHref(s: Source): string {
  if (s.url) return s.url;
  if (s.path && PATH_TO_ROUTE[s.path]) return PATH_TO_ROUTE[s.path];
  return s.path ?? "#";
}

type AskResponse = {
  answer: string;
  sources: Source[];
  relatedProjects: string[];
  refused: boolean;
  refusalReason?: string;
};

const SUGGESTIONS = [
  "What proves AI automation experience?",
  "Explain newsharness simply.",
  "Which project proves client delivery?",
  "What does memory-os show?",
];

const API_URL = "https://vijay-kumaran-portfolio-api.random-planzz.workers.dev";

type State =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "answer"; answer: string; sources: Source[]; relatedProjects: string[] }
  | { type: "refused"; reason: string }
  | { type: "error"; message: string };

function md(text: string): string {
  const html = marked.parse(text, { async: false }) as string;
  return DOMPurify.sanitize(html);
}

function stripSourcesSection(answer: string): string {
  const idx = answer.search(/\*\*Sources used\*\*|\nSources used/i);
  return idx === -1 ? answer : answer.slice(0, idx).trim();
}

export function AskTheWork() {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState<State>({ type: "idle" });
  const ctrlRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    ctrlRef.current?.abort();
    setState({ type: "idle" });
  }, []);

  const submit = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setState({ type: "loading" });

    const ctrl = new AbortController();
    ctrlRef.current = ctrl;

    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.trim() }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        if (res.status === 400) {
          setState({ type: "error", message: "Invalid question format. Try rephrasing." });
        } else if (res.status === 429) {
          setState({ type: "error", message: "Too many questions. Wait a moment and try again." });
        } else if (res.status === 502) {
          setState({ type: "error", message: "The assistant is temporarily unavailable. Please try again shortly." });
        } else if (res.status === 504) {
          setState({ type: "error", message: "This is taking longer than expected. Try a shorter question." });
        } else {
          setState({ type: "error", message: "Something went wrong on our side. Try again shortly." });
        }
        return;
      }

      const data: AskResponse = await res.json();

      if (data.refused) {
        setState({ type: "refused", reason: data.refusalReason ?? "" });
      } else {
        setState({
          type: "answer",
          answer: data.answer,
          sources: data.sources,
          relatedProjects: data.relatedProjects,
        });
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setState({ type: "error", message: "Can't reach the assistant right now. Check your connection." });
    } finally {
      if (ctrlRef.current === ctrl) ctrlRef.current = null;
    }
  }, []);

  const handleChip = useCallback((chip: string) => {
    setQuestion(chip);
    submit(chip);
  }, [submit]);

  const reset = useCallback(() => {
    setQuestion("");
    setState({ type: "idle" });
  }, []);

  return (
    <section className="border-b border-light-line bg-light text-ink">
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        {/* ponytail: static decorative SVG — same as original teaser but not interactive */}
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 lg:block">
          <svg viewBox="0 0 40 260" className="h-64 w-10 opacity-20" fill="none">
            <path d="M20 8v244" stroke="#2563EB" strokeWidth="1" />
            <circle cx="20" cy="8" r="2.5" fill="#2563EB" />
            <circle cx="20" cy="130" r="2.5" fill="#2563EB" />
            <circle cx="20" cy="252" r="2.5" fill="#2563EB" />
          </svg>
        </div>

        <MotionSection className="max-w-2xl">
          <MotionItem>
            <SectionLabel light>Ask the work</SectionLabel>
          </MotionItem>
          <MotionItem>
            <h2 className="display mt-6 text-5xl sm:text-6xl">Ask about the work.</h2>
          </MotionItem>

          {state.type === "idle" && (
            <>
              <MotionItem>
                <p className="mt-6 text-lg leading-relaxed text-muted-light">
                  Ask focused questions about the projects, stack, and proof behind this portfolio.
                  Answers are grounded in indexed project case studies and documentation only.
                </p>
              </MotionItem>

              <MotionItem>
                <form onSubmit={(e) => { e.preventDefault(); submit(question); }} className="mt-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="E.g., What proves AI automation experience?"
                      className="flex-1 border border-light-line bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-muted-light focus:border-cyan focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!question.trim()}
                      className="border border-cyan px-5 py-3 font-mono text-sm tracking-[.02em] text-cyan transition-colors hover:bg-cyan hover:text-white disabled:border-light-line disabled:text-muted-light"
                    >
                      Ask
                    </button>
                  </div>
                </form>
              </MotionItem>

              <div className="mt-6 flex flex-wrap gap-2">
                {SUGGESTIONS.map((chip) => (
                  <MotionItem key={chip}>
                    <button
                      onClick={() => handleChip(chip)}
                      className="border border-light-line px-3 py-2 text-left font-mono text-[11px] text-muted-light transition-colors hover:border-cyan/60 hover:text-ink"
                    >
                      {chip}
                    </button>
                  </MotionItem>
                ))}
              </div>
            </>
          )}

          {state.type === "loading" && (
            <div className="mt-10">
              <div className="flex items-center gap-4">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan" />
                <span className="font-mono text-sm text-muted-light">Checking the work…</span>
                <button onClick={cancel} className="ml-auto font-mono text-xs text-muted-light hover:text-ink">
                  Cancel
                </button>
              </div>
              <p className="mt-4 text-sm italic text-muted-light/70">
                &ldquo;{question}&rdquo;
              </p>
            </div>
          )}

          {state.type === "answer" && (
            <div className="mt-10">
              <div
                className="prose max-w-none text-ink prose-a:text-blue [&_pre]:bg-dark-soft [&_pre]:text-light [&_pre]:p-4 [&_pre]:text-xs [&_code]:bg-dark-soft/10 [&_code]:px-1 [&_code]:text-xs"
                dangerouslySetInnerHTML={{ __html: md(stripSourcesSection(state.answer)) }}
              />
              {state.sources.length > 0 && (
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {state.sources.map((s) => {
                    const href = resolveSourceHref(s);
                    const external = href.startsWith("http");
                    return (
                      <a
                        key={s.label + s.project}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="group flex items-center justify-between gap-3 border border-light-line bg-white px-4 py-3 transition-colors hover:border-cyan/60"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-mono text-[10px] uppercase tracking-wide text-muted-light">
                            {s.project}
                          </p>
                          <p className="mt-0.5 truncate text-sm text-ink">{s.label}</p>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-blue transition-transform group-hover:translate-x-0.5">
                          open ↗
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
              {state.relatedProjects.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted-light">
                  {state.relatedProjects.map((p) => <span key={p}>{p}</span>)}
                </div>
              )}
              <button onClick={reset} className="mt-6 font-mono text-sm tracking-[.02em] text-blue hover:underline">
                Ask another question <AnimatedArrow />
              </button>
            </div>
          )}

          {state.type === "refused" && (
            <div className="mt-10 border border-light-line bg-white p-6">
              <p className="text-base leading-relaxed text-muted-light">
                I don&apos;t have enough indexed evidence to answer that.
              </p>
              {state.reason && (
                <p className="mt-2 font-mono text-xs text-muted-light/50">{state.reason}</p>
              )}
              <button onClick={reset} className="mt-4 font-mono text-sm tracking-[.02em] text-blue hover:underline">
                Ask another question <AnimatedArrow />
              </button>
            </div>
          )}

          {state.type === "error" && (
            <div className="mt-10 border border-red-200 bg-red-50 p-6">
              <p className="text-base leading-relaxed text-red-700">{state.message}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => submit(question)} className="font-mono text-sm tracking-[.02em] text-red-700 hover:underline">
                  Retry
                </button>
                <button onClick={reset} className="font-mono text-sm tracking-[.02em] text-ink hover:underline">
                  New question
                </button>
              </div>
            </div>
          )}
        </MotionSection>
      </div>
    </section>
  );
}
