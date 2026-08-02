"use client";

import { ProjectThumb } from "@/components/ProjectThumb";

const LIVE_URLS: Record<string, string[]> = {
  newsharness: ["https://cf-news-intel-agent.random-planzz.workers.dev/"],
  "kpdc-trifecta": ["https://www.kpcollege.in/", "https://kalyanipatillawcollege.in/"],
  steelmade: ["https://steelmade.co.in/"],
};

export function CaseStudyMeta({ slug }: { slug: string }) {
  const urls = LIVE_URLS[slug];

  return (
    <>
      <ProjectThumb slug={slug} />
      {urls && urls.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
          <span className="text-muted-dark">Live:</span>
          {urls.map((url) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" className="text-cyan hover:text-white">
              {new URL(url).hostname} ↗
            </a>
          ))}
        </div>
      )}
    </>
  );
}
