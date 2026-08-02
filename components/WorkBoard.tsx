"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { recordDraw, recordLoss, recordWin } from "@/src/lib/progress";

const X = "X";
const O = "O";
type Player = typeof X | typeof O | null;

const CELLS: Array<{ title: string; sub: string; href: string; external?: boolean }> = [
  { title: "newsharness", sub: "Intelligence system", href: "/work/newsharness" },
  { title: "memory-os", sub: "Agent memory", href: "/work/memory-os" },
  { title: "KPDC / Trifecta", sub: "Publishing system", href: "/work/kpdc-trifecta" },
  { title: "SteelMade", sub: "Brand website", href: "/work/steelmade" },
  { title: "ChronoQuill", sub: "Publishing automation", href: "/work/chronoquill" },
  { title: "ArtSports Content OS", sub: "Content operations", href: "/work/artsports-content-os" },
  { title: "Mnemos", sub: "Knowledge system", href: "/work/mnemos" },
  { title: "Book an audit", sub: "→ about", href: "/about#contact" },
  { title: "Ask the work", sub: "→ ask", href: "/#ask" },
];

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const winner = (b: Array<Player>) => {
  for (const l of lines) {
    const [a, c, d] = l;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], cells: l };
  }
  return b.every((p) => p) ? { player: null as Player, cells: [] as number[] } : null;
};

const bestMove = (b: Array<Player>) => {
  const empty = b.map((_, i) => i).filter((i) => !b[i]);
  if (!empty.length) return null;
  const score = (m: Player) =>
    lines.some(([a, c, d]) => b[a] === m && b[c] === m && b[d] === m);
  const blocked = (i: number) => {
    const nb = b.slice();
    nb[i] = O;
    return score(O);
  };
  const canWin = (i: number) => {
    const nb = b.slice();
    nb[i] = X;
    return score(X);
  };
  for (const i of empty) if (canWin(i)) return i;
  for (const i of empty) if (blocked(i)) return i;
  return empty[Math.floor(Math.random() * empty.length)];
};

export function WorkBoard() {
  const [board, setBoard] = useState<Array<Player>>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>(X);
  const [result, setResult] = useState<{ player: Player; cells: number[] } | null>(null);

  const play = (i: number) => {
    if (result || board[i]) return;
    const nb = board.slice();
    nb[i] = turn;
    setBoard(nb);
    setTurn(turn === X ? O : X);
    const w = winner(nb);
    if (w) {
      setResult(w);
      if (w.player === X) recordWin();
      else if (w.player === O) recordLoss();
      else recordDraw();
    }
  };

  useEffect(() => {
    if (turn !== O || result) return;
    const t = setTimeout(() => {
      const i = bestMove(board);
      if (i !== null) play(i);
    }, 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, result]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn(X);
    setResult(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
      className="mx-auto w-full max-w-md border border-dark-line bg-dark-soft/70 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[.18em] text-muted-dark">
        <span>You are <span className="text-cyan">X</span> · system is <span className="text-blue">O</span></span>
        <button onClick={reset} className="text-cyan transition-colors hover:text-white">↺ restart</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button key={i} onClick={() => play(i)}
            className={`group relative flex aspect-square items-center justify-center border border-dark-line transition-colors ${cell ? "" : "hover:border-cyan"} ${result?.cells.includes(i) ? "bg-white/[.04]" : ""}`}
            aria-label={cell ? `cell ${i}, ${cell}` : CELLS[i].title}>
            <span className={`font-mono text-3xl leading-none ${cell === X ? "text-cyan" : cell === O ? "text-blue" : ""}`}>{cell ?? ""}</span>
            {cell && <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-dark/85 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <a href={CELLS[i].href} target={CELLS[i].external ? "_blank" : undefined} rel={CELLS[i].external ? "noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-center">
                <span className="font-mono text-[10px] uppercase tracking-[.14em] text-cyan">{CELLS[i].sub}</span>
                <span className="mt-1 block text-xs text-light underline decoration-cyan/40 underline-offset-4">{CELLS[i].title} ↗</span>
              </a>
            </span>}
          </button>
        ))}
      </div>
      <div className="mt-3 h-5 text-center font-mono text-xs text-muted-dark">
        {result ? (result.player === X ? <span className="text-cyan">You win — systems still need a human.</span>
          : result.player === O ? <span className="text-blue">System wins — but it was built by a human.</span>
          : <span className="text-muted-light">Draw — the work is the point.</span>)
          : turn === X ? "Your move — click a cell." : "System is thinking…"}
      </div>
    </motion.div>
  );
}
