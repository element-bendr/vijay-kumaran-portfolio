const ALT_TEXT: Record<string, string> = {
  newsharness: "Cloudflare-native daily news intelligence system dashboard",
  "memory-os": "AI coding-agent memory system architecture",
  "kpdc-trifecta": "Institutional publishing system for KPDC college",
  steelmade: "Production furniture brand website design",
  chronoquill: "WhatsApp publishing automation interface",
  "artsports-content-os": "Structured content automation for sports and arts publishing",
  mnemos: "Governed AI memory prototype interface",
};

const PROJECT_IMAGES: Record<string, string> = {
  newsharness: "/projects/newsharness.avif",
  "kpdc-trifecta": "/projects/kpdc-trifecta.avif",
  steelmade: "/projects/steelmade.avif",
};

export function ProjectThumb({ slug }: { slug: string }) {
  const src = PROJECT_IMAGES[slug];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={ALT_TEXT[slug]}
      className="mb-5 aspect-[1200/630] w-full border border-dark-line object-cover"
    />
  );
}
