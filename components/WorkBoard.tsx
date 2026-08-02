"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
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
  { title: "Mnemos", sub: "Governed memory", href: "/work/mnemos" },
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

const STAMP: Record<string, { text: string; className: string }> = {
  X: { text: "YOU WIN!", className: "text-cyan" },
  O: { text: "SYSTEM WINS", className: "text-blue" },
  D: { text: "DRAW", className: "text-muted-light" },
};

export function WorkBoard() {
  const [board, setBoard] = useState<Array<Player>>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>(X);
  const [result, setResult] = useState<{ player: Player; cells: number[] } | null>(null);
  const controls = useAnimationControls();

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
      else if (w.player === O) { recordLoss(); controls.start({ x: [0, -10, 10, -6, 6, 0] }, { duration: 0.5 }); }
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
    <motion.div
      animate={controls}
      className="relative mx-auto w-full max-w-xl border border-white/[0.05] bg-dark-soft/30 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.08em] text-muted-dark/50">
        <span>{!result && (turn === X ? "Your move" : turn === O ? "System thinking…" : "")}</span>
        <button onClick={reset} className="text-cyan/60 transition-colors hover:text-cyan">restart</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const inWin = result?.cells.includes(i);
          return (
          <motion.div key={i}
            animate={inWin ? { scale: [1, 1.07, 1] } : { scale: 1 }}
            transition={inWin ? { duration: 0.8, repeat: 2, ease: "easeInOut" } : {}}
            className={`group relative flex aspect-square items-center justify-center border transition-colors ${cell ? "border-white/[0.04]" : "border-white/[0.04] hover:border-white/[0.10]"} ${inWin ? "bg-white/[0.03]" : ""}`}>
            {cell ? (
              <motion.span key={cell} initial={{ scale: 0.4, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className={`font-mono text-4xl leading-none ${cell === X ? "text-cyan/70" : cell === O ? "text-blue/60" : ""}`}>{cell}</motion.span>
            ) : (
              <button onClick={() => play(i)} className="h-full w-full" aria-label={CELLS[i].title} />
            )}
            {cell && (
              <a href={CELLS[i].href} target={CELLS[i].external ? "_blank" : undefined} rel={CELLS[i].external ? "noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 flex justify-center group-hover:py-1 transition-all">
                <span className="font-mono text-[8px] leading-tight tracking-[.04em] text-muted-dark/60 group-hover:text-cyan/60">
                  {CELLS[i].sub}
                </span>
              </a>
            )}
          </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {result && (
          <motion.div key="stamp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-dark/70">
            <motion.span key="nova" initial={{ scale: 0.2, opacity: 1 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle, rgba(34,211,238,.4), transparent 62%)" }} />
            <motion.span initial={{ scale: 0, rotate: -14 }} animate={{ scale: 1, rotate: -4 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}
              className={`font-mono text-7xl font-bold tracking-tight drop-shadow-[0_0_18px_rgba(34,211,238,.85)] sm:text-8xl ${STAMP[result.player ?? "D"].className}`}>
              {STAMP[result.player ?? "D"].text}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
