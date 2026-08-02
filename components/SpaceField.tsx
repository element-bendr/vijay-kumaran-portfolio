"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const COLORS = ["#FFFFFF", "#A7B0C0", "#22D3EE", "#3B82F6"];
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const FLOW = (Math.PI * 5) / 4;
const BUCKETS = [
  { ratio: 0.5, speed: [6, 12], size: [0.4, 1], opacity: [0.3, 0.55] },
  { ratio: 0.3, speed: [12, 22], size: [0.7, 1.5], opacity: [0.45, 0.8] },
  { ratio: 0.2, speed: [20, 38], size: [1, 2.2], opacity: [0.7, 1] },
];

type Star = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string; bucket: number };

const PLANETS = [
  { color: "#22D3EE", size: 420, left: "6%", top: "22%", opacity: 0.16, drift: [22, -16] as const, breathe: 1.12 },
  { color: "#3B82F6", size: 560, left: "74%", top: "50%", opacity: 0.13, drift: [-26, 18] as const, breathe: 1.08 },
  { color: "#D946EF", size: 320, left: "56%", top: "6%", opacity: 0.11, drift: [16, 22] as const, breathe: 1.14 },
];

export function SpaceField() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    const COUNT = mobile ? 80 : 200;
    const streaks = !mobile && !reduce;

    let w = 0, h = 0;
    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const makeStar = (bucket: number): Star => {
      const b = BUCKETS[bucket];
      const ang = FLOW + rand(-0.4, 0.4);
      const spd = rand(b.speed[0], b.speed[1]);
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        size: rand(b.size[0], b.size[1]),
        opacity: rand(b.opacity[0], b.opacity[1]),
        color: Math.random() < 0.3 ? pick(COLORS.slice(2)) : pick(COLORS.slice(0, 2)),
        bucket,
      };
    };

    let stars: Star[] = [];
    BUCKETS.forEach((b, i) => {
      for (let n = Math.round(COUNT * b.ratio); n > 0; n--) stars.push(makeStar(i));
    });

    const M = 40;
    const wrapStar = (s: Star) => {
      if (s.x < -M) s.x = w + M;
      else if (s.x > w + M) s.x = -M;
      if (s.y < -M) s.y = h + M;
      else if (s.y > h + M) s.y = -M;
    };

    const draw = (s: Star, prev?: { x: number; y: number }) => {
      ctx.globalAlpha = s.opacity;
      ctx.fillStyle = s.color;
      if (prev && streaks && Math.abs(s.x - prev.x) < 120 && Math.abs(s.y - prev.y) < 120) {
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = Math.max(0.5, s.size * 0.6);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) draw(s);
    };

    if (reduce) {
      render();
      return;
    }

    let raf = 0;
    let last = performance.now();
    let inView = true;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const prev = { x: s.x, y: s.y };
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        wrapStar(s);
        draw(s, prev);
      }
      raf = requestAnimationFrame(tick);
    };

    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
    const start = () => { if (raf || !inView || document.hidden) return; last = performance.now(); raf = requestAnimationFrame(tick); };

    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? start() : stop(); }, { threshold: 0.05 });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const onResize = () => { resize(); stars = []; BUCKETS.forEach((b, i) => { for (let n = Math.round(COUNT * b.ratio); n > 0; n--) stars.push(makeStar(i)); }); render(); };
    window.addEventListener("resize", onResize);

    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  const planets = mobilePlanets(PLANETS);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="opacity-50" />
      {planets.map((p, i) => {
        const orchestrator = i === 0;
        const glow = { boxShadow: `0 0 ${p.size / 3}px ${p.color}66` };
        return (
          <motion.button
            key={i}
            type="button"
            onClick={orchestrator ? () => { setSecret((s) => !s); window.dispatchEvent(new CustomEvent("vijay-secret", { detail: "terminal-node" })); } : undefined}
            aria-label={orchestrator ? "The orchestrator node — where the universe converges" : undefined}
            className={`absolute rounded-full ${orchestrator ? "pointer-events-auto cursor-pointer" : ""}`}
            style={{ width: p.size, height: p.size, left: p.left, top: p.top, opacity: p.opacity, background: `radial-gradient(circle at 50% 45%, ${p.color}cc, ${p.color}00 68%)`, filter: "blur(48px)", ...glow }}
            initial={false}
            animate={reduce ? {} : {
              scale: [1, p.breathe, 1],
              x: p.drift[0],
              y: p.drift[1],
              ...(orchestrator && secret ? { opacity: [p.opacity, p.opacity + 0.15, p.opacity] } : {}),
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
          />
        );
      })}
    </div>
  );
}

function mobilePlanets(ps: typeof PLANETS) {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
    ? ps.slice(0, 2).map((p) => ({ ...p, size: p.size * 0.6, opacity: p.opacity * 0.7, drift: [0, 0] as const, breathe: p.breathe * 0.6 + 1 }))
    : ps;
}
