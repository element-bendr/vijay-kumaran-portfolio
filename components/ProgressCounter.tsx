"use client";

import { useEffect, useState } from "react";
import { getProgress, totalCount, unlockedCount } from "@/src/lib/progress";

export function ProgressCounter() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const update = () => {
      const p = getProgress();
      setCount(unlockedCount(p));
      setTotal(totalCount());
    };
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);
  return <span className="hidden sm:inline">Systems unlocked: {count}/{total}</span>;
}
