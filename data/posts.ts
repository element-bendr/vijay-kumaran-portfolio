export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export const posts: Post[] = [
  {
    slug: "cloudflare-native-news-intelligence-agent",
    title: "Building a Cloudflare-native news intelligence agent",
    date: "2026-07-15",
    readingTime: "5 min read",
    excerpt:
      "What it takes to make an AI reporting pipeline inspectable end to end — collection, clustering, drafts, publishing, and traces.",
    tags: ["Cloudflare", "Agents", "Observability"],
    content: `
Most AI news products are a black box: text goes in, a summary comes out. newsharness was built on the opposite premise — the pipeline itself should be the deliverable.

## The shape of the system

The agent runs scheduled collection across multiple news providers, normalizes and deduplicates stories, clusters similar stories, extracts article content and enriches metadata, then creates publication-ready drafts with publishing workflows. Analytics land in D1, artifacts in R2.

The architecture reads as a straight line:

\`Sources → Provider normalization → Story clustering → Extraction + enrichment → Drafts + publishing → D1 analytics + R2 artifacts\`

## Why Cloudflare primitives

Each stage maps to a native primitive: Durable Objects hold per-provider state and scheduling, D1 stores traceable analytics, R2 keeps raw artifacts. Because every hop is a first-class Cloudflare resource, the whole run is inspectable — you can see which provider contributed what, when, and how it flowed downstream.

## What this proves

The lesson that generalizes: AI-assisted workflows should be observable and traceable, not magic. Separation of concerns between collection, clustering, extraction, and publishing makes the system reliable and maintainable — and it makes failures diagnosable instead of mysterious.
    `.trim(),
  },
  {
    slug: "giving-ai-coding-agents-a-governed-memory",
    title: "Giving AI coding agents a governed memory",
    date: "2026-06-28",
    readingTime: "6 min read",
    excerpt:
      "AI agents lose context and repeat mistakes. memory-os treats memory as a governed artifact instead of a scrap pile.",
    tags: ["AI agents", "Memory", "Postgres"],
    content: `
The core failure mode of AI coding agents is familiar: they lose context between sessions, repeat mistakes, and mix temporary task state with durable knowledge. memory-os was built to fix that by giving agents a memory with rules.

## Canonical truth in Git-reviewed Markdown

The system treats Git-reviewed Markdown as canonical truth. Durable knowledge lives in files that have passed review — versioned, dated, and attributed. Temporary task state is kept separate, so it can't pollute the knowledge that persists.

## Retrieval and storage

GBrain provides vector and keyword search across project context. Postgres with pgvector holds structured storage and semantic retrieval. Beads handles task state, and Skills package reusable agent workflows into a repeatable operating procedure.

## Evidence rules

Every fact carries evidence, a date, a source, and an owner. Setup, verify, sync, backup, and restore workflows are defined. Handoffs are verification-gated: work isn't marked done until the verification passes.

## What this proves

Durable project context is an engineering problem, not a hope. Evidence-based automation discipline — where decisions trace back to retrievable artifacts — is what separates a memory system from a scrap pile.

    `.trim(),
  },
  {
    slug: "what-client-delivery-actually-requires",
    title: "What client delivery actually requires",
    date: "2026-06-10",
    readingTime: "5 min read",
    excerpt:
      "Delivery is the unglamorous middle between a proposal and a live site. Two projects — a furniture brand and an institutional publisher — show what holds up.",
    tags: ["Delivery", "Production", "Clients"],
    content: `
Case studies look clean in retrospect. The work that makes them hold up is the unglamorous middle: scoping, deployment, content operations, and handover.

## A production furniture brand website

SteelMade needed product and category discovery, strong brand presentation, and enquiry paths that convert. The stack was practical: Next.js for the site, Cloudinary for image optimization and delivery, Netlify for hosting, Cloudflare for DNS and security. Image-heavy catalog sites are a different problem than text-heavy sites — Cloudinary's optimization pipeline made a media-dense storefront fast instead of heavy.

## An institutional publishing system

KPDC / Trifecta is a different kind of delivery: three public websites, one private admin app, shared packages for UI, config, content, storage, and validation. Notices, PDFs, galleries, and staff workflows — all managed by non-technical operators without a developer for every small change. The monorepo and admin workflows are what make content operations sustainable after handover.

## What generalizes

Two things hold both together. First, business outcomes: a site that converts, an admin app that removes the developer bottleneck. Second, handover discipline: documentation, build/QA commands, and deployment notes that let the next person — or the client's own staff — run the system without the original builder.

    `.trim(),
  },
  {
    slug: "making-automation-reviewable-not-just-fast",
    title: "Making automation reviewable, not just fast",
    date: "2026-05-20",
    readingTime: "5 min read",
    excerpt:
      "Speed is the easy promise of automation. Reviewability is what makes it safe to run. Two messaging and content automations show the pattern.",
    tags: ["Automation", "Review", "Workflows"],
    content: `
Automation projects sell on speed, but they live or die on control. If an operator can't see, approve, or stop what the automation is about to do, they stop trusting it — and then they stop using it.

## WhatsApp publishing automation

ChronoQuill delivers scheduled WhatsApp content with a repeatable, reviewable pipeline. Content is prepared, queued for a review gate, then published on a defined schedule. The reviewable step is the point: nothing reaches the audience without editorial sign-off. Deterministic scheduling, duplicate prevention, and missed-send recovery round out the operational edge cases that make or break a real deployment.

## Structured content for multi-channel publishing

ArtSports Content OS applies the same discipline to a sports-and-arts editorial workflow. Content is structured for distribution across web, mobile, social, and email from a single source of truth. Review workflows let editors approve before each channel receives content; scheduling, formatting, and delivery are automated. Structured content plus a review gate keeps quality high without per-channel manual work.

## The pattern

The lesson is consistent: a deterministic core (scheduling, formatting, delivery) wrapped in a human review layer (approval gates, briefs, manifests). Automation should remove the repetitive work — not the judgment.

    `.trim(),
  },
];
