import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/identity";
const IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Vijay Kumaran — AI Automation & Web Systems Consultant",
};

export function createMetadata({
  path,
  title,
  description,
  article,
}: {
  path: string;
  title: string;
  description: string;
  article?: { publishedTime: string; tags: string[] };
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = path === "/" ? title : `${title} · Vijay Kumaran`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      url,
      title: socialTitle,
      description,
      images: [IMAGE],
      ...(article && { publishedTime: article.publishedTime, tags: article.tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [IMAGE.url],
    },
  };
}
