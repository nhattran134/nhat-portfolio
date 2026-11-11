---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/blog/index.astro","src/pages/blog/[id].astro","src/pages/projects/[id].astro"]
---

## Scope

Whole site: home (`src/pages/index.astro`), `/blog`, blog posts, project pages. Visitor mode: Persuade (consulting buyers first, hiring managers second).

## Audience, job, action

An engineering lead or CTO with a pipeline, cloud, release or AI-agent governance problem decides whether to contact Nathan. Primary action: the project request form in the first viewport (email + what you need). Services lead the proof, then projects, record, notes, full contact form.

Constraints: no testimonials shown until real; no client or cluster names from the AI work; content stays in CMS collections.

## Direction contract

THESIS: The site is Nathan's standards manual: what he builds is written down as numbered standards with correct and incorrect usage, the way a platform team publishes its golden paths. It refuses the dark terminal portfolio with a split hero and a grid of cards.

OWN-WORLD: Paper white pages and full-bleed cobalt (#1f3fd1) section divider pages, black ink, one grotesk (Schibsted Grotesk) in two or three weights. Section numbering (1.0, 1.1, 2.3) everywhere, hairline 12-column guides, 2px black rules, dotted leaders, black caption bars on forms and figures, square corners, no shadows, no gradients. Correct (cobalt, check) and incorrect (red #d4351c, cross) usage panels.

STORY: In one viewport the visitor sees who this is, the seven services as a contents page, and a form to ask for one. Scrolling, each service opens as a spec sheet; projects read as numbered case standards with their pipeline flow; experience is the record; notes are the blog; the page closes on a cobalt divider with the full contact form.

FIRST VIEWPORT: Running header (name, discipline line, numbered section nav). Left 46%: cobalt divider page, "Section 1 / Services" rule, the headline "I design the platforms your teams ship on." and the title line, then at the foot Figure 1.0: five release gates against your team, a governed agent and a typical agent setup, which skips identity check and approval (added at the user's request: the cover was too empty; the third column from the critique). Right 54%: white page with guides, "1.0 Contents", then "Form 1 · Project request" (email, required need, Send, a note row with confirmed contact facts) as the primary action, then services 1.1 to 1.7 with dotted leaders and arrows, AI agent platforms marked New. The form sits above the list so it is in the first viewport on 1280–1366px laptops and first in keyboard order.

FORM: Graphics standards manual, position 5 of 7 on the grounded list. seed:27180cb894ba363b. Signature interaction: the running header tracks the current section number as you scroll. Section numbers live inside headings ("2 Work"), never as giant standalone numerals (changed at the user's request). Motion is restrained and disabled under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Hero form posts to a separate Netlify form ("request"); the full form stays "contact".
