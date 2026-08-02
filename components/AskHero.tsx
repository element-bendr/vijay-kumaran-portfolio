"use client";

import { useState } from "react";

const API_URL = "https://vijay-kumaran-portfolio-api.random-planzz.workers.dev";

export function AskHero() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!q.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.trim() }),
      });
      const data = await res.json();
      if (data.refused) {
        setAns("I don't have enough to answer that. Try asking about a specific project.");
      } else {
        const clipped = data.answer ? data.answer.slice(0, 280) + (data.answer.length > 280 ? "…" : "") : "";
        setAns(clipped);
      }
    } catch {
      setAns("Can't reach the assistant. Try again shortly.");
    }
    setLoading(false);
  };

  return (
    <div className="mb-4 font-mono text-xs">
      {!ans ? (
        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask about a project…"
            className="flex-1 border border-white/[0.08] bg-transparent px-3 py-2 text-xs text-muted-dark placeholder:text-muted-dark/40 focus:border-cyan/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!q.trim() || loading}
            className="shrink-0 border border-cyan/30 px-3 py-2 text-xs text-cyan/70 transition-colors hover:border-cyan hover:text-cyan disabled:border-white/[0.05] disabled:text-muted-dark/30"
          >
            {loading ? "…" : "Ask"}
          </button>
        </form>
      ) : (
        <div className="border border-white/[0.06] p-3">
          <p className="text-xs leading-relaxed text-muted-dark">{ans}</p>
          <div className="mt-2 flex gap-3">
            <button onClick={() => { setAns(""); setQ(""); }} className="text-[10px] text-cyan/60 hover:text-cyan">
              Ask another
            </button>
            <a href="/#ask" className="text-[10px] text-muted-dark/40 hover:text-cyan">
              Full Q&A ↓
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
