"use client";

import { useEffect } from "react";
import { recordVisit } from "@/src/lib/progress";

export function TrackVisit({ slug }: { slug: string }) {
  useEffect(() => {
    recordVisit(slug);
  }, [slug]);
  return null;
}
