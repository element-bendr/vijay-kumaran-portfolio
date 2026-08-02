"use client";

import { useCallback, useRef } from "react";

export function CardGlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  }, []);

  const onLeave = useCallback(() => {
    ref.current?.style.setProperty("--mx", "50%");
    ref.current?.style.setProperty("--my", "50%");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          background: "radial-gradient(400px at var(--mx) var(--my), rgba(34,211,238,.06), transparent 70%)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
