"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { MotionItem, MotionSection } from "@/components/motion";
import { ProgressCounter } from "@/components/ProgressCounter";

const GITHUB_URL = "https://github.com/element-bendr";
const LINKEDIN_URL = "";
export const LIVE_SITES = [
  { name: "Sterling Synergies", url: "https://sterlingsynergies.com" },
  { name: "Sopranos Inc.", url: "https://sopranosinc.com" },
  { name: "GreenShoot", url: "https://greenshoot.in" },
];
export function LiveSitesStrip() { return <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[.1em] text-muted-dark"><span className="text-slate-400">Live on Cloudflare:</span>{LIVE_SITES.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="hover:text-cyan">{s.name} ↗</a>)}</div>; }
export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`font-mono text-xs uppercase tracking-[.16em] ${light ? "text-muted-light" : "text-cyan"}`}>{children}</p>; }
const MotionLink = motion.create(Link);
export function ButtonLink({ href, children, secondary = false, light = false }: { href: string; children: React.ReactNode; secondary?: boolean; light?: boolean }) { return <MotionLink whileHover={{ y: -2 }} transition={{ duration: 0.25, ease: "easeOut" }} href={href} className={`inline-flex items-center justify-center border px-5 py-3 font-mono text-sm tracking-[.02em] transition-colors ${light ? "border-white bg-white text-blue hover:bg-transparent hover:text-white" : secondary ? "border-dark-line text-light hover:border-cyan hover:text-cyan" : "border-blue bg-blue text-white hover:bg-transparent hover:text-blue"}`}>{children}</MotionLink>; }
export function ProjectMark({ slug }: { slug: string }) {
  const common = "h-12 w-20 text-cyan transition-[filter] duration-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,.35)]";
  if (slug === "newsharness") return <svg aria-hidden viewBox="0 0 80 48" className={common} fill="none"><path d="M2 32h12l5-16 7 25 7-20 6 11h10l5-18 7 10h17" stroke="currentColor" strokeWidth="1.5" /><path d="M2 43h76" stroke="currentColor" opacity=".35" /></svg>;
  if (slug === "memory-os") return <svg aria-hidden viewBox="0 0 80 48" className={common} fill="none"><path d="M16 12 40 24 64 10M16 12v24l24 10 24-12V10M40 24v22" stroke="currentColor" strokeWidth="1.5" opacity=".8" /><circle cx="16" cy="12" r="3" fill="currentColor" /><circle cx="40" cy="24" r="3" fill="currentColor" /><circle cx="64" cy="10" r="3" fill="currentColor" /></svg>;
  if (slug === "kpdc-trifecta") return <svg aria-hidden viewBox="0 0 80 48" className={common} fill="none"><path d="M8 40V18L24 8l16 10v22M40 40V14L56 4l16 10v26M16 25h16M48 22h16M16 32h16M48 30h16" stroke="currentColor" strokeWidth="1.5" opacity=".85" /><path d="M4 43h72" stroke="currentColor" opacity=".35" /></svg>;
  return <svg aria-hidden viewBox="0 0 80 48" className={common} fill="none"><path d="M7 35 24 14l18 19 15-24 12 19M7 42h66" stroke="currentColor" strokeWidth="1.5" /><path d="m15 35 18-8 13 5 13-9" stroke="currentColor" opacity=".4" /></svg>;
}
export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));
  return <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`sticky top-0 z-20 border-b text-light backdrop-blur transition-colors duration-300 ${scrolled ? "border-dark-line bg-dark" : "border-dark-line bg-dark/95"}`}><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16"><Link href="/" className="flex items-center gap-3 font-mono text-base font-bold tracking-[-.03em]"><span>VK</span><span className="h-4 w-px bg-cyan" /><span className="text-[13px] font-normal tracking-[.01em] text-muted-dark">Vijay Kumaran</span></Link><nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[.06em] desktop:flex"><Link href="/work" className="hover:text-cyan">Work</Link><Link href="/thinking" className="hover:text-cyan">Thinking</Link><Link href="/services" className="hover:text-cyan">Services</Link><Link href="/about" className="hover:text-cyan">About</Link><Link href="/about#approach" className="hover:text-cyan">Approach</Link><Link href="/about#contact" className="hover:text-cyan">Contact</Link><Link href="/about" className="group text-cyan hover:text-white">Book an audit <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span></Link></nav><details className="relative desktop:hidden"><summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-[.12em] text-cyan">Menu +</summary><nav className="absolute right-0 top-8 z-10 grid min-w-48 gap-4 border border-dark-line bg-dark p-5 font-mono text-xs uppercase tracking-[.12em] shadow-xl"><Link href="/work">Work</Link><Link href="/thinking">Thinking</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/about#approach">Approach</Link><Link href="/about#contact">Contact</Link><Link href="/about" className="text-cyan">Book an audit ↗</Link></nav></details></div></motion.header>;
}
export function Footer() { return <footer className="border-t border-dark-line bg-dark text-muted-dark"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 font-mono text-[11px] uppercase tracking-[.1em] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16"><span>Vijay Kumaran / Mumbai, India</span><span className="flex items-center gap-4"><Link href="/thinking" className="hover:text-cyan">Thinking</Link><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-cyan">GitHub ↗</a>{LINKEDIN_URL ? <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-cyan">LinkedIn ↗</a> : null}<ProgressCounter /></span><a href="mailto:element.bendr@gmail.com" className="text-cyan hover:text-white">element.bendr@gmail.com</a></div></footer>; }
export function PageShell({ children }: { children: React.ReactNode }) { return <><Header /><main>{children}</main><Footer /></>; }
export { AskTheWork } from "@/components/AskTheWork";