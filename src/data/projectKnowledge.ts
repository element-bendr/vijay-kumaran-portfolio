export type ProjectKnowledgeRecord = {
  id: string;
  project: string;
  category: string;
  visibility: "public" | "public_sanitized";
  summary: string;
  content: string;
  sources: Array<{ label: string; path?: string; url?: string }>;
};

export const projectKnowledge: ProjectKnowledgeRecord[] = [
  {
    id: "github-profile-positioning",
    project: "Vijay Kumaran",
    category: "Profile",
    visibility: "public",
    summary: "AI Automation & Web Systems Consultant based in Mumbai, India / Remote.",
    content:
      "Vijay Kumaran is an AI Automation & Web Systems Consultant who builds practical websites, business systems, and AI automations that reduce manual work and run reliably every day. He works with Next.js, TypeScript, Tailwind CSS, Cloudflare (Workers, D1, R2, Durable Objects), Postgres, pgvector, and AI workflows. His approach: clarity first — understand the real problem, goals, and constraints before building. Reliable systems — secure, tested, and designed for real-world usage. Traceable automation — observable, accountable workflows. Maintainable delivery — clean code, documentation, and thoughtful handover. Available for selected projects. Contact: element.bendr@gmail.com.",
    sources: [
      { label: "About page", path: "app/about/page.tsx" },
    ],
  },
  {
    id: "portfolio-services",
    project: "Vijay Kumaran — Services",
    category: "Services",
    visibility: "public",
    summary:
      "Four service areas: Websites, Business Systems, AI Automations, and Workflow Audit.",
    content:
      "Website Systems — Professional websites that build trust and support goals. Best for consultants, founders, product/catalogue brands, and service businesses. Output: fast, secure websites that convert visitors into leads. Business Systems — Smart systems to run a business smoothly and reliably. Best for growing teams and businesses managing operations. Output: organized processes, dashboards, and actionable data. AI Automation Systems — Automations that save time and eliminate repetitive work. Best for teams and operators with recurring manual tasks. Output: automated workflows that save hours every week. Workflow Audit — Clear insight into what is slowing a business down. Best for organizations feeling stuck or scaling with inefficiencies. Output: a prioritized action plan to simplify and improve operations.",
    sources: [
      { label: "Services page", path: "app/services/page.tsx" },
      { label: "Services data", path: "data/services.ts" },
    ],
  },
  {
    id: "newsharness",
    project: "newsharness",
    category: "Intelligence system",
    visibility: "public_sanitized",
    summary:
      "Cloudflare-native daily intelligence system for collection, clustering, enrichment, drafts, publishing, and traceable reporting.",
    content:
      "newsharness is a Cloudflare-native agent that discovers, curates, and delivers daily news intelligence. It orchestrates end-to-end pipelines using Cloudflare primitives with observability and traceability at each step. The system schedules and runs collection across multiple news providers, normalizes and deduplicates stories, clusters similar stories, extracts article content and enriches metadata, creates publication-ready drafts, supports publishing workflows, and stores analytics in D1 and artifacts in R2. Architecture: Sources → Provider normalization → Story clustering → Extraction + enrichment → Drafts + publishing → D1 analytics + R2 artifacts. Tech stack: Cloudflare Agents SDK, Durable Objects, D1, R2, Workers AI, Evals. Status: Built MVP / Cloudflare-native system. What this proves: Cloudflare Agents can orchestrate practical content pipelines, D1/R2/Durable Objects can support inspectable AI workflows, AI-assisted reporting should be observable and traceable, and separation of concerns improves reliability and maintainability.",
    sources: [
      { label: "newsharness case study", path: "app/work/newsharness/page.tsx" },
      { label: "Projects data", path: "data/projects.ts" },
    ],
  },
  {
    id: "memory-os",
    project: "memory-os",
    category: "Agent memory",
    visibility: "public_sanitized",
    summary:
      "Governed AI coding-agent memory system for project knowledge, task state, retrieval, and evidence-based handoffs.",
    content:
      "memory-os is a governed AI coding-agent memory system that provides durable project knowledge, task state management, retrieval, and evidence-based handoffs for AI-assisted development workflows. It uses Git-reviewed Markdown as the canonical knowledge format, GBrain for vector and keyword search across project context, Postgres with pgvector for structured storage and semantic retrieval, Beads for task tracking and state persistence, and Skills for reusable agent workflows. memory-os ensures that AI coding agents maintain consistent project context across sessions, produce verifiable handoffs, and ground decisions in retrievable evidence. Stack: Git-reviewed Markdown, GBrain, Postgres/pgvector, Beads, Skills.",
    sources: [
      { label: "Projects data", path: "data/projects.ts" },
      { label: "About page", path: "app/about/page.tsx" },
    ],
  },
  {
    id: "kpdc-trifecta",
    project: "KPDC / Trifecta",
    category: "Publishing system",
    visibility: "public_sanitized",
    summary:
      "Multi-site institutional publishing system with public websites, private admin app, notices, PDFs, galleries, and staff workflows.",
    content:
      "KPDC / Trifecta is a multi-site institutional publishing system serving an organization that requires public-facing websites, a private administrative application, official notices, PDF document generation, photo galleries, and staff workflows. The system is built as a monorepo using Next.js, deployed on Cloudflare Pages, and uses R2 for asset storage. It includes admin workflows for content management, notice publication, and gallery curation. What this proves: institutional publishing at scale can be done with modern web frameworks, Cloudflare infrastructure supports multi-site deployments reliably, and admin workflows make content operations sustainable for non-technical staff. Stack: Next.js, Cloudflare Pages, R2, Admin Workflows, Monorepo architecture.",
    sources: [
      { label: "Projects data", path: "data/projects.ts" },
      { label: "About page", path: "app/about/page.tsx" },
    ],
  },
  {
    id: "steelmade",
    project: "SteelMade",
    category: "Brand website",
    visibility: "public_sanitized",
    summary:
      "Production furniture brand website focused on product/category discovery, brand presentation, and enquiry generation.",
    content:
      "SteelMade is a production furniture brand website built for product and category discovery, strong brand presentation, and customer enquiry generation. The site is built with Next.js and uses Cloudinary for image optimization and delivery. It is deployed on Netlify with Cloudflare providing DNS and security. The focus is on clear product presentation, intuitive category navigation, and straightforward enquiry paths that convert visitors into qualified leads. What this proves: production brand websites can combine developer-friendly tooling with business outcomes, image-heavy catalog sites work well with Cloudinary's optimization pipeline, and multi-provider deployment (Netlify + Cloudflare) is practical for brand sites. Source code is public on GitHub. Stack: Next.js, Cloudinary, Netlify, Cloudflare.",
    sources: [
      { label: "Projects data", path: "data/projects.ts" },
      { label: "GitHub", url: "https://github.com/element-bendr/steelmade-cloudiary" },
    ],
  },
  {
    id: "chronoquill",
    project: "ChronoQuill",
    category: "Publishing automation",
    visibility: "public_sanitized",
    summary:
      "WhatsApp publishing automation built for repeatable, reviewable content delivery.",
    content:
      "ChronoQuill is a WhatsApp publishing automation that delivers scheduled, repeatable, and reviewable content to audiences. The system automates the creation and delivery pipeline: content is prepared, queued for review, and then published through WhatsApp on a defined schedule. The repeatable workflow ensures consistent content quality across deliveries. The reviewable step means content passes through an approval gate before publication, supporting editorial oversight. This project proves that messaging-platform automation can support structured publishing workflows with review and scheduling, and that content delivery outside traditional web channels is a practical automation target for client-facing workflows. Stack: Automation, Publishing workflows, Cloud services. Source code is public on GitHub.",
    sources: [
      { label: "Projects data", path: "data/projects.ts" },
      { label: "GitHub", url: "https://github.com/element-bendr/chronoquill" },
    ],
  },
  {
    id: "artsports-content-os",
    project: "ArtSports Content OS",
    category: "Content operations",
    visibility: "public_sanitized",
    summary:
      "Structured content automation for a multi-channel sports and arts publishing workflow.",
    content:
      "ArtSports Content OS is a structured content automation system for multi-channel publishing across sports and arts domains. The system organizes content into structured formats suitable for distribution across multiple channels — web, mobile, social, and email. It supports review workflows that let editors approve content before it reaches each channel. The automation handles scheduling, formatting, and delivery, ensuring consistency across channels while reducing manual publishing effort. What this proves: structured content automation can serve non-technical editorial teams across disparate content domains, multi-channel publishing benefits from a single source-of-truth content pipeline, and review workflows are essential for quality control in automated publishing. Stack: Structured content, Review workflows, Automation.",
    sources: [
      { label: "Projects data", path: "data/projects.ts" },
      { label: "GitHub", url: "https://github.com/element-bendr/ai-automation-case-studies" },
    ],
  },
  {
    id: "mnemos",
    project: "Mnemos",
    category: "Knowledge system",
    visibility: "public_sanitized",
    summary:
      "A practical knowledge system for durable project context and evidence-rich handoffs.",
    content:
      "Mnemos is a practical knowledge system designed to preserve durable project context and support evidence-rich handoffs between development sessions. Built on Memory OS principles, Mnemos captures project knowledge in a retrievable, versioned format so that context does not degrade between work sessions or team transitions. It integrates with Postgres for structured storage and supports retrieval workflows that help agents and developers surface relevant context quickly. The system emphasizes evidence: every decision, task state, and handoff artifact links back to its source, making it traceable and reviewable. What this proves: durable project context is achievable with structured knowledge systems, evidence-rich handoffs reduce onboarding and context-switching costs, and retrieval workflows make project knowledge actionable rather than archival. Stack: Memory OS, Postgres, Retrieval, Review control.",
    sources: [
      { label: "Projects data", path: "data/projects.ts" },
    ],
  },
  {
    id: "case-study-newsharness",
    project: "newsharness",
    category: "Intelligence system",
    visibility: "public_sanitized",
    summary:
      "Cloudflare-native daily news intelligence system — case study (sanitized public record).",
    content:
      "newsharness is a Cloudflare-native daily news intelligence system. Problem: daily intelligence workflows often become untraceable AI summaries. This system makes collection, source tracking, provider observability, clustering, extraction, drafts, publishing, and reporting inspectable. What it does: runs scheduled news intelligence workflows using Cloudflare Agents SDK, Durable Objects, D1, R2, modular collection providers, provider observability, story clustering, extraction, enrichments, article drafts, public publishing, weekly synthesis, and content refresh checks. What this proves: Cloudflare Agents SDK, Durable Objects, D1/R2 architecture, AI workflow automation, provider observability, evals, run traces, and inspectable AI reporting. Status: Built MVP / Cloudflare-native intelligence system. The repository is private. This public case study is sanitized.",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
    ],
  },
  {
    id: "case-study-memory-os",
    project: "memory-os",
    category: "Agent memory",
    visibility: "public_sanitized",
    summary:
      "Governed memory operating system for AI coding agents — case study (sanitized public record).",
    content:
      "memory-os is a governed memory operating system for AI coding agents. Problem: AI coding agents lose context, repeat mistakes, and mix temporary task state with durable knowledge. What it does: uses Git-reviewed Markdown as canonical truth, GBrain retrieval, Postgres/pgvector projections, Beads task state, agent skills, evidence/date/source/owner rules, setup/verify/sync/backup/restore workflows, and verification-gated handoffs. What this proves: AI-assisted engineering operations, memory governance, Postgres/pgvector usage, agent workflow architecture, and evidence-based automation discipline. Status: Built internal AI coding-agent memory system. The repository is private. This public case study is sanitized.",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
    ],
  },
  {
    id: "case-study-kpdc-trifecta",
    project: "KPDC / Trifecta",
    category: "Publishing system",
    visibility: "public_sanitized",
    summary:
      "Multi-site institutional publishing system — case study (sanitized public record).",
    content:
      "trifecta-kpdc is a multi-site institutional publishing system. Problem: institutions need to manage notices, PDFs, galleries, metadata, and public updates without depending on a developer for every small change. What it does: three public static websites plus one private admin app, with shared UI/config/content/storage/validation packages, Cloudflare Pages target, R2 storage docs, admin access docs, build/QA commands, and handover documentation. What this proves: business/admin system delivery, multi-site monorepo architecture, staff publishing workflows, Cloudflare deployment planning, production readiness, and handover discipline. Status: Built institutional publishing system. Live public sites: Kalyani Patil Degree College (kpcollege.in) and Kalyani Patil Law College (kalyanipatillawcollege.in).",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
      { label: "Live site — KP College", url: "https://www.kpcollege.in/" },
      { label: "Live site — KP Law College", url: "https://kalyanipatillawcollege.in/" },
    ],
  },
  {
    id: "case-study-steelmade",
    project: "SteelMade",
    category: "Brand website",
    visibility: "public",
    summary:
      "Production furniture brand website — case study (public record, live site and source available).",
    content:
      "SteelMade is a production furniture brand website. Problem: a furniture/manufacturing brand needed a professional web presence with product/category discovery and enquiry paths. What it does: production website using Next.js, TypeScript, Cloudinary, Netlify, and Cloudflare for responsive brand presentation, product/category navigation, and quote/enquiry-focused flows. What this proves: real client delivery, production website build, media-heavy brand website, deployment workflow, and client-facing business outcome. Status: Production client website. The live site and public implementation are available.",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
      { label: "Live site", url: "https://steelmade.co.in/" },
      { label: "GitHub", url: "https://github.com/element-bendr/steelmade-cloudiary" },
    ],
  },
  {
    id: "case-study-chronoquill",
    project: "ChronoQuill",
    category: "Publishing automation",
    visibility: "public_sanitized",
    summary:
      "WhatsApp publishing automation service — case study (public record, source available).",
    content:
      "ChronoQuill is a WhatsApp publishing automation service. Problem: recurring WhatsApp publishing needs predictable scheduling, duplicate prevention, missed-send recovery, and reviewable operations. What it does: local-first deterministic quote ingestion and WhatsApp publishing using Node.js, TypeScript, SQLite, Baileys, CLI operations, persistent auth, inbound reply capture, and systemd deployment. What this proves: workflow automation, deterministic scheduling, WhatsApp operational tooling, CLI/service design, and local-first automation. Status: Built local automation service. Public implementation available on GitHub.",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
      { label: "GitHub", url: "https://github.com/element-bendr/chronoquill" },
    ],
  },
  {
    id: "case-study-artsports",
    project: "ArtSports Content OS",
    category: "Content operations",
    visibility: "public_sanitized",
    summary:
      "Structured content automation for Instagram — case study (sanitized public record).",
    content:
      "ArtSports Content OS is a structured content planning and caption-generation workflow for Instagram. Problem: manual content planning creates inconsistent output, missed schedules, and weak review control. What it does: uses deterministic calendar planning, YAML schemas, prompt compilation, bounded LLM captions, deterministic fallbacks, validation, retries, manifests, and daily briefs. What this proves: AI-assisted content operations, human-reviewable outputs, structured planning, deterministic generation discipline, and operator-friendly briefs. Status: Built content workflow system. The repository is private. This public case study is sanitized.",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
    ],
  },
  {
    id: "case-study-mnemos",
    project: "Mnemos",
    category: "Knowledge system",
    visibility: "public_sanitized",
    summary:
      "Governed AI memory prototype — case study (sanitized public record).",
    content:
      "Mnemos is a governed AI memory system and prototype. Problem: knowledge ingestion from web/PDF/paper sources needs reviewable structure instead of loose AI summaries. What it does: uses Next.js UI, Node.js control plane, Playwright executor, Postgres source of truth, LLM runtime adapters, patch protocol, audit logs, Docker Compose, health checks, and topic-based notes. What this proves: governed AI memory design, LLM patch-review architecture, Playwright ingestion, Dockerized local AI system, auditability, and health-check thinking. Status: Governed AI memory system / prototype. The repository is private. This public case study is sanitized.",
    sources: [
      { label: "AI Automation Case Studies", url: "https://github.com/element-bendr/ai-automation-case-studies" },
    ],
  },
];
