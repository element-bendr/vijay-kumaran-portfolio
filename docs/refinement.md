Refine the Quiet Systems frontend after screenshot review.

The current direction is correct. Do not redesign the site. Tighten it.

Goals:

- Keep the modern minimalist Quiet Systems design language.
- Preserve dark hero + off-white content sections.
- Preserve real project names and truthful copy.
- Improve scanability, reduce oversized spacing, and add subtle visual proof cues.

Fixes:

1. Hero height
   Reduce vertical padding / min-height across Home, Work, Services, About, and newsharness pages by 12–18%.
   The first content section should be more visible on 1440x1000 screenshots.

2. Typography
   Reduce inner page hero headings by 8–12%.
   Homepage H1 can stay large, but Work, Services, About, and newsharness titles should be slightly smaller and easier to scan.
   Use clamp-based sizing.

3. Buttons
   Change CTA button labels from uppercase to sentence case:

- View case studies
- Book an audit
- Start a conversation
- View selected work
  Keep nav labels uppercase if already used.

4. Homepage project cards
   Add subtle visual project marks to the four featured project cards:

- newsharness: signal/news line motif
- memory-os: connected memory nodes
- KPDC / Trifecta: publishing/grid/building motif
- SteelMade: layered steel/industrial line motif

Keep marks minimal, monochrome/cyan, and non-distracting.
Do not add screenshots or fake dashboards.

5. Work page
   Improve subtitle to:
   “A proof index of systems built for websites, publishing workflows, AI automation, and operational clarity.”

Add small project symbols or marks to each project row.
Keep the row layout, but make it feel less text-only.
Do not add fake metrics or fake screenshots.

6. Services page
   Reduce hero height.
   Make service cards more compact.
   Reduce card padding.
   Ensure all four service card headings are visible sooner on 1440x1000.
   Keep four cards:

- Website Systems
- Business Systems
- AI Automation Systems
- Workflow Audit

7. About page
   Add a restrained right-side “Recent proof” panel in the hero or immediately below hero:

- newsharness — Cloudflare-native intelligence system
- memory-os — AI coding-agent memory system
- KPDC / Trifecta — institutional publishing workflow
- SteelMade — production brand website

Keep it minimal. No heavy card grid.

8. newsharness page
   Reduce hero title size slightly.
   Bring Overview and System Architecture content slightly higher.
   Keep project facts row.
   Do not add fake metrics, fake testimonials, fake team size, or fake outcomes.

9. Preserve:

- no fake data
- no stock images
- no 3D cubes
- no dense dashboards
- no particles
- no extra pages
- no RAG backend yet

Run:
npm run lint
npm run build

Regenerate screenshots:

- /
- /work
- /work/newsharness
- /services
- /about
  at 1440x1000.
