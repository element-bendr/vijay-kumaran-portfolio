"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { getProgress, totalCount, unlockedCount } from "@/src/lib/progress";

export function ProgressCounter() {
  const [count, setCount] = useState(0);
  const [total] = useState(totalCount());
  const countMotion = useMotionValue(0);
  const countSpring = useSpring(countMotion, { duration: 400 });
  const displayCount = useTransform(countSpring, (v: number) => Math.round(v));

  useEffect(() => {
    countMotion.set(count);
  }, [count, countMotion]);

  useEffect(() => {
    const update = () => {
      const p = getProgress();
      setCount(unlockedCount(p));
    };
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);
  return <span className="hidden sm:inline">Systems unlocked: <motion.span>{displayCount}</motion.span>/{total}</span>;
}
