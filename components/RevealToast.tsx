"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { recordSecret } from "@/src/lib/progress";

const SECRETS: Record<string, { icon: string; text: string }> = {
  "terminal-node": { icon: "⌖", text: "You found the orchestrator node." },
  "logo-triple": { icon: "◈", text: "VK unlocked." },
  "vk-keys": { icon: "▚", text: "Nice keyboard work." },
};

export function useSecret(trigger: string, detail: string) {
  useEffect(() => {
    if (trigger) window.dispatchEvent(new CustomEvent("vijay-secret", { detail }));
  }, [trigger, detail]);
}

export function RevealToast() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const fire = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!SECRETS[detail]) return;
      recordSecret(detail);
      setActive(detail);
    };
    window.addEventListener("vijay-secret", fire);
    return () => window.removeEventListener("vijay-secret", fire);
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setActive(null), 3200);
    return () => clearTimeout(t);
  }, [active]);

  return <AnimatePresence>{active ? <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="fixed bottom-5 left-5 z-50 flex items-center gap-3 border border-cyan/40 bg-dark-soft px-4 py-3 font-mono text-xs text-cyan shadow-xl"><span className="text-base leading-none">{SECRETS[active].icon}</span>{SECRETS[active].text}</motion.div> : null}</AnimatePresence>;
}
