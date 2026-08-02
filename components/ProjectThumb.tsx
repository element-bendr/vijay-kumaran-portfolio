"use client";

import { useState } from "react";

export function ProjectThumb({ slug }: { slug: string }) {
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <img
      src={`/projects/${slug}.avif`}
      alt=""
      className="mb-5 w-full border border-dark-line"
      onError={() => setError(true)}
    />
  );
}
