"use client";

import { motion } from "motion/react";
import { LIVE_SITES } from "@/components/site";
import { EASE } from "@/components/motion";

const TRUST = [
  { name: "Sterling Synergies", role: "Industrial supplies", quote: "Rebuilt our online presence. Clean, fast, handles enquiries.", slug: "sterling" },
  { name: "Sopranos Inc.", role: "Construction", quote: "Professional site that actually brings in leads.", slug: "sopranos" },
  { name: "GreenShoot", role: "Environmental service", quote: "No maintenance headaches. It just runs.", slug: "greenshoot" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-dark-line bg-dark-soft text-light">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {TRUST.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              className="border border-dark-line p-5"
            >
              <img src={`/projects/${t.slug}.avif`} alt="" className="mb-4 w-full border border-dark-line" />
              <p className="text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-3 bg-cyan/40" />
                <span className="font-mono text-xs text-cyan">{t.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[.08em] text-muted-dark">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 font-mono text-[11px] uppercase tracking-[.1em] text-muted-dark">
          <span className="text-slate-400">Live on Cloudflare: </span>
          {LIVE_SITES.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="hover:text-cyan">
              {s.name} ↗{" "}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
