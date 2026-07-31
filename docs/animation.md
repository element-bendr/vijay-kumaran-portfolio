Perform a restrained animation polish pass on the Quiet Systems portfolio frontend.

Do not redesign the site.
Do not change page structure.
Do not add backend/RAG code.
Do not add new sections.

Goal:
Make the website feel more premium, artistic, and alive while preserving the modern minimalist Quiet Systems design language.

Design language:
Quiet Systems.
Motion should communicate:
scattered work → structured system → reliable output.

Animation style:

- subtle
- precise
- calm
- premium
- system-like
- no flashy effects
- no particles
- no bouncing
- no 3D objects
- no fake terminal typing
- no cursor trails
- no over-animation

Use:

- Framer Motion or Motion if already installed/preferred
- CSS transitions where simpler
- SVG/CSS for system-line motif
- prefers-reduced-motion support

Tasks:

1. Install animation dependency if needed:

- framer-motion or motion

2. Add reusable motion components:

- MotionSection
- MotionHero
- AnimatedArrow
- SystemLines

3. Homepage hero:
   Add a subtle animated right-side system-line visual.
   It should suggest:
   Inputs → Systems → Output

Visual treatment:

- thin cyan/blue lines
- small nodes
- slow path-draw or opacity reveal
- very low opacity
- no labels unless extremely minimal
- no dashboards
- no particles
- no 3D cubes

4. Hero entrance:
   On initial load:

- nav/header already visible or gently fades in
- hero headline fades/rises in
- subheading follows
- supporting copy follows
- CTA buttons appear last
  Use a short stagger.
  Duration around 500–700ms.
  Movement should be small: about 12–18px.

5. Scroll reveals:
   Add subtle reveal animations to major sections:

- What I Build
- Featured Work
- Stack
- Ask the Work teaser
- Work page project rows
- Services cards
- About proof panel
- newsharness sections

Animation:

- opacity 0 to 1
- y 16px to 0
- small stagger for children
- once per viewport entry

6. Project cards / rows:
   On hover:

- slightly brighten border
- move arrow 4px
- faint accent glow on project mark
- tiny background tint
  Keep it calm.

7. Buttons:
   Add polished hover/focus:

- subtle lift or glow
- arrow shifts 3–4px
- focus-visible ring must remain accessible

8. Header:
   Add subtle scroll state:

- slightly more solid background
- backdrop blur
- thin border
  Do not shrink dramatically.

9. Ask the Work teaser:
   Keep it non-functional.
   Add a quiet hover/focus visual:

- input border glow
- suggested question chips fade/stagger in
- source-grounded line motif in background

10. Reduced motion:
    Respect prefers-reduced-motion.
    Disable path drawing, stagger, and movement.
    Keep simple opacity or no animation.

11. Performance:
    Avoid heavy animation loops.
    Avoid animating layout properties.
    Prefer opacity and transform.
    No large constantly animated backgrounds.

12. Verify:
    Run:
    npm run lint
    npm run build

Generate screenshots at 1440x1000:

- /
- /work
- /work/newsharness
- /services
- /about

Also test mobile view.

Do not:

- add RAG backend
- add /api/ask
- add D1/R2/Vectorize/AI Gateway
- add new copy claims
- add fake metrics
- add fake screenshots
- add fake testimonials

Commit:
feat: add quiet systems animation polish
