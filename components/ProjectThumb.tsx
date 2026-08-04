"use client";

import { useState } from "react";

const ALT_TEXT: Record<string, string> = {
  newsharness: "Cloudflare-native daily news intelligence system dashboard",
  "memory-os": "AI coding-agent memory system architecture",
  "kpdc-trifecta": "Institutional publishing system for KPDC college",
  steelmade: "Production furniture brand website design",
  chronoquill: "WhatsApp publishing automation interface",
  "artsports-content-os": "Structured content automation for sports and arts publishing",
  mnemos: "Governed AI memory prototype interface",
};

export function ProjectThumb({ slug }: { slug: string }) {
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <img
      src={`/projects/${slug}.avif`}
      alt={ALT_TEXT[slug] ?? `${slug} project screenshot`}
      className="mb-5 w-full border border-dark-line"
      onError={() => setError(true)}
    />
  );
}
