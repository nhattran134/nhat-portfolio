---
name: Nathan Tran
description: A platform engineer's work written down as a graphics standards manual, paper pages and cobalt divider pages.
colors:
  paper: "#ffffff"
  ink: "#0d0d0f"
  mute: "#575a63"
  line: "#d9dbe0"
  field: "#1f3fd1"
  field-deep: "#1833b0"
  on-field: "#ffffff"
  on-field-mute: "#d5dcfb"
  no: "#c8321a"
  guide: "rgba(31, 63, 209, 0.13)"
  input-rule: "#868a93"
  placeholder: "#6e717a"
  leader: "#b4b8c2"
  code-wash: "#eef0f7"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 4.4vw, 64px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  prose:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  sheet-label:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0em"
  caption:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.04em"
  hero:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(44px, 4.8vw, 76px)"
    fontWeight: 800
    lineHeight: 1
  close:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 4vw, 56px)"
    fontWeight: 800
    lineHeight: 1.05
  post-title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1.05
  row-title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.15
  ui:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.3
  small:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  micro:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
  badge:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 800
    lineHeight: 1.2
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 3vw, 40px)"
  container: "1440px"
  head: "52px"
  head-phone: "84px"
  row: "26px 0 28px"
  sheet: "32px 0 72px"
  divider: "40px 0 44px"
  column-gap: "28px"
components:
  button-primary:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.field-deep}"
    textColor: "{colors.on-field}"
  button-on-field:
    backgroundColor: "{colors.on-field}"
    textColor: "{colors.field}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-on-field-hover:
    backgroundColor: "{colors.on-field-mute}"
    textColor: "{colors.field}"
  form-caption:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.caption}"
    padding: "9px 14px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 0"
  badge-new:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.none}"
    padding: "3px 6px"
  nav-link:
    textColor: "{colors.ink}"
    padding: "12px 0"
  nav-link-active:
    textColor: "{colors.field}"
  divider-band:
    backgroundColor: "{colors.field}"
    textColor: "{colors.on-field}"
    padding: "40px 0 44px"
---

# Design System: Nathan Tran

## Overview

**Creative North Star: "The Standards Manual"**

The site is set like a corporate graphics standards manual. White paper pages hold the content; full-bleed cobalt divider pages open each numbered part. Everything is numbered (1.0, 1.1 to 1.7, 2.1, 3.1, 4.1), every section sits under a 2px black rule, and the work is stated as standards with correct and incorrect usage beside them. Black ink, one grotesk, square corners, no shadows.

Density is that of a printed reference: long horizontal rows separated by 1px hairlines, a numeric gutter on the left, text that runs wide but stops at a measure. Colour is almost binary: paper and ink carry the pages, cobalt is the only accent and is used either as a whole surface (divider pages, the hero cover, the closing contact page) or as small marks (section numbers, markers, links, the active nav rule). Red appears only as the "incorrect" signal.

The world is light-only by design. There is no dark theme and `color-scheme` is pinned to light.

**Key Characteristics:**
- Paper pages and full-bleed cobalt divider pages, alternating as the manual's parts.
- Section numbering on every heading, nav item and list row.
- 2px black rules open sections; 1px hairlines separate rows.
- Hairline 12-column layout guides drawn on the contents page.
- Correct (cobalt, check) and incorrect (red, cross) usage panels.
- One family, Schibsted Grotesk, from 400 to 900; section numbers sit inside their headings in pale cobalt, never as standalone glyphs.
- Square corners everywhere; depth comes only from rules and colour fields.

## Colors

A two-ink manual: black on white, with one saturated cobalt used as surface or mark, and one red reserved for "incorrect".

### Primary
- **Manual Cobalt** (field): the divider page colour. Fills the hero cover, every section divider, inner page heads and the closing contact band. As a mark on paper: section numbers, list markers, links, the active nav underline, the focus outline, text selection, the correct-usage panel and the primary button.
- **Pressed Cobalt** (field-deep): hover state of the cobalt button only.
- **Cobalt Guide** (guide): the 13% cobalt hairline of the 12-column guides. Never used as a fill.

### Secondary
- **Incorrect Red** (no): the incorrect-usage panel, an invalid input's underline, and the error status line. Nothing decorative.

### Neutral
- **Paper** (paper): page background and the background of every form, including forms set on cobalt.
- **Ink** (ink): text, every 2px rule, form frames, caption bars, code blocks.
- **Mute** (mute): descriptions, dates, secondary nav numbers, sheet-head notes, tag text.
- **Hairline** (line): 1px row separators and the slash between tags.
- **White on Field** (on-field) and **Pale Cobalt** (on-field-mute): text on cobalt; pale cobalt for ledes, back links, and the underline of links on cobalt.
- **Input Rule** (input-rule), **Placeholder** (placeholder), **Leader** (leader), **Code Wash** (code-wash): the input underline, placeholder text, dotted contents leaders and inline code background. These are literal values in the build, not custom properties.

### Named Rules
**The Surface Or Mark Rule.** Cobalt is either the entire page (a divider, cover, page head or close band, full bleed with a 2px ink rule on top) or a small mark on paper. It is never a tinted card, panel, or background block in the middle of a paper page.

**The Red Means Wrong Rule.** Red is only the incorrect-usage panel and error states. It never decorates.

## Typography

**Display Font:** Schibsted Grotesk (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Schibsted Grotesk (same stack)
**Label/Mono Font:** none for UI; inline and block code in `.prose` fall back to the system monospace stack.

**Character:** One sturdy news grotesk does everything. Hierarchy comes from weight (400 body to 800 display) and scale, with tight negative tracking on large sizes and none on labels.

### Hierarchy
- **Section number** (inherits its heading's size and weight, coloured on-field-mute on cobalt): the number that opens a divider, page-head or contact heading, as in "2 Work" or "2.1 Governed AI Agent Platform". It is part of the heading text and read by screen readers.
- **Display** (800, clamp(40px, 5vw, 72px), 1.05, -0.03em): divider and contact headings. The hero h1 is a tighter cousin (clamp(44px, 4.8vw, 76px), line-height 1, max 12ch).
- **Headline** (800, clamp(36px, 4.4vw, 64px), 1.02): inner page h1 on blog posts and project pages, max 20ch. The close band uses clamp(36px, 4vw, 56px).
- **Title** (800, 26px): a standard, project, or employer row. Post titles 24px; prose h2 30px with a 2px ink rule above it; role titles and prose h3 19 to 22px at 700.
- **Lede** (400, 19px, 1.45): the line under a divider or page heading, in pale cobalt, 36 to 52ch.
- **Body** (400, 17px, 1.55): default. Prose runs 18px / 1.65 at 62ch (about 70 characters in this face).
- **Sheet label** (700, 15px, 0 tracking): the numbered sheet heading ("3.1 Experience") and the cobalt row numbers.
- **Caption** (700, 13px, 0.04em, uppercase): form caption bars and field labels. Figure captions (flow figures, Figure 1.0) and table heads run 12px.
- **Small steps:** ui 16px (name, buttons, tool tags, standard numbers), small 14px (tags, figure notes, footer, discipline line, phone nav), micro 12px (figure captions, aside terms, step numbers), badge 11px (New); row titles 21px, post titles 24px, close-band heading clamp(36px, 4vw, 56px), hero h1 clamp(44px, 4.8vw, 76px). Usage-panel captions run 800 at 0.06em; aside definition terms 12px 800.

### Named Rules
**The Every Heading Is Numbered Rule.** A section heading, a sheet heading and a list row carry their manual number (2.3, 4.1) in cobalt or mute. A heading without a number is a page title, not a section.

**The Weight Not Face Rule.** Never add a second family. Contrast comes from 400 against 800/900.

## Layout

A centred 1440px container with a fluid gutter of clamp(16px, 3vw, 40px). The running header is sticky, 52px tall on desktop and 84px on phones where the numbered nav drops to a second, horizontally scrolling row; anchor scrolling is padded to clear it.

Pages are a stack of **dividers** and **sheets**. A divider is a full-bleed cobalt band on a 5fr / 7fr grid: numbered heading left, lede right, aligned to the bottom (40px 44px block padding; one column under 900px). A sheet is a paper page (32px top, 72px bottom) opening with a sheet head: a 2px ink rule beneath a numbered label on the left and a mute note or link on the right.

Inside sheets, content is horizontal rows divided by 1px hairlines with 26px / 28px padding. Rows use a fixed numeric gutter (52px, 40px on phones) followed by fractional columns: standards 5 / 3.5 / 3.5, projects number + 5 / 6 + link, experience 4 / 8, certifications and tools two equal columns. Rows collapse to two then one column at 900px to 1000px and 560px.

The home cover is a 46 / 54 spread at full viewport height under the header: the cobalt cover left, the contents page with 12-column guides right. The cover reads top to bottom: caption rule, h1 and lede, then Figure 1.0 anchored at the foot. Figure 1.0 is a table of five release gates (rows) against "Your team", "Agent, governed" and "Agent, typical setup" (columns): checks everywhere except the typical setup's Identity check and Approval, which are red crosses on paper squares. The contents page opens with "1.0 Contents", then the project request form (so it is in the first viewport down to 1280×768 and first in keyboard order), then services 1.1 to 1.7. Once the spread stacks (under 1100px) the cover figure hides and a paper version of Figure 1.0 follows the services list.

Inner pages: a cobalt page head (back link, then the numbered h1 in the 8-column prose track), then a 4 / 8 article grid whose left aside of specifications is sticky below the header.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth and grouping come from three things only: the cobalt field against paper, 2px ink rules, and 1px hairlines. A form set on cobalt is a white page with a 2px ink frame, not a lifted card.

### Named Rules
**The Rules Not Shadows Rule.** If something needs separating, draw a rule. Never a shadow, blur, or tonal gradient fill. The repeating-gradient technique that draws the 1px layout guides is a drawing tool for hairlines, not a permission for gradients.

## Shapes

Square corners throughout (0px), including inputs and selects. Lines come in a fixed set: 2px ink for section and sheet openings, form frames and the flow track; 1px ink inside forms between fields; 1px hairline between rows; 4px current-colour bar on top of a usage panel; 2px dotted leader in the contents list. The only filled geometric mark is the 10px cobalt square marking each flow step. Tags are plain text separated by hairline slashes, never pills.

Icons are four authored SVG strokes (arrow, back, check, cross) on a 24 grid, 2.25 stroke, square caps, drawn in `currentColor` at 16 to 18px.

## Components

### Buttons
Heavy, flat, rectangular.
- **Shape:** square (0px), 48px minimum height, 0 24px padding, 2px border matching the fill.
- **Primary:** cobalt fill, white 800 16px label, trailing arrow icon at 18px.
- **Hover / Focus:** fill shifts to pressed cobalt over 0.2s on the house ease; focus is a 2px cobalt outline offset 3px (white on cobalt surfaces).
- **On cobalt:** inverts to white fill with cobalt text; hover goes pale cobalt.
- **Inside a form:** the button loses its border and fills its cell: full height in the hero request row, 56px and right-aligned in the contact form, full width on phones.
- **Disabled (sending):** 55% opacity with a progress cursor.

### Text links
- **Arrow link:** cobalt 700 text with a trailing arrow; hover underlines and nudges the arrow 3px right.
- **Row title links:** ink, no underline; hover turns cobalt with a 2px underline.
- **Links on cobalt:** white 700 text over a 2px pale-cobalt underline that turns white on hover.

### Forms
A form is a page printed in the manual.
- **Frame:** paper background, 2px ink border, opened by a black caption bar (caption type, form number). A note row at the foot carries confirmed contact facts only: location, time zone and reply time ("within 2 days"). No email address appears anywhere on the site, on purpose, to avoid spam. Selects open on a disabled, required "Choose one". Invalid inputs, selects and textareas turn their underline red.
- **Fields:** uppercase caption labels with the input below; inputs are transparent with a 1px input-rule underline, 500 17px text, no radius. Adjacent fields are divided by 1px ink lines.
- **Focus:** the underline thickens to 2px cobalt; the outline is suppressed in favour of it.
- **Error:** invalid input underline turns red; the status line below the form (1px ink rule above) reads red for errors, cobalt for success.

### Navigation
The running header: name (800) and discipline line (mute, hidden under 1100px) left, a numbered section list right (600 15px, number in mute 500). Hover and the current section turn cobalt; the current section also gets a 2px cobalt bar that grows from the left along the header's bottom rule. `site.ts` sets `aria-current` from the section in view. On phones the list becomes a second scrolling row at 14px.

### Usage panels (signature)
Each standard row pairs its description with two figures: **Correct** in cobalt with a check, **Incorrect** in red with a cross. Each is a 4px bar in its colour, an 800 13px uppercase caption with the icon, then a 600 17px ink statement.

### Divider pages (signature)
Full-bleed cobalt, 2px ink rule on top, numbered display heading and pale lede on a 5 / 7 grid. No standalone numerals and no entrance motion on dividers.

### Contents list
Numbered rows (cobalt number, 700 21px title, dotted leader, cobalt arrow, mute description) separated by hairlines. Title text sits on a paper backing so the layout guides stop at the letterforms. A **New** badge (cobalt fill, white 800 11px uppercase, 0.08em) may mark one entry.

### Flow figure
A pipeline as a black caption bar over a grid of steps. Each step sits on a 2px ink track with a 10px cobalt square at its start, 700 14px label and a mute step number.

### Lists and records
Projects, posts, experience, certifications and tools are all hairline-ruled rows with a numeric gutter. Tags are mute 600 14px text with hairline slashes. List markers are cobalt.

## Do's and Don'ts

### Do:
- **Do** open every section with either a cobalt divider page or a sheet head under a 2px ink rule, and number it.
- **Do** keep cobalt (#1f3fd1) to whole surfaces or small marks; text on it is white or pale cobalt.
- **Do** separate rows with 1px hairlines and a fixed numeric gutter (52px, 40px on phones).
- **Do** set forms as paper frames with a 2px ink border and a black caption bar, even on cobalt.
- **Do** use the four authored icons (2.25 stroke, square caps) in `currentColor`.
- **Do** keep motion to one authored moment and quiet feedback, all on cubic-bezier(0.16, 1, 0.3, 1). The moment is Figure 1.0 running its gates once when it enters view: passes stamp in row by row (260ms each, 55ms apart, from scale 0.4), then the typical setup's skips land last (340ms, from scale 1.8). Pipeline figures play their stages left to right once (320ms, 60ms apart, from 10px left). Feedback: form status fades in with a 4px drop (180ms), field underlines ease colour (150ms), the nav bar grows from the left, arrows nudge. Pages cross-fade (220ms) with the running header held still. Entrances use fill 'backwards' so content is visible if script never runs.
- **Don't** add section reveals, hover lifts or parallax. Under reduced motion the stamps, stage order and page cross-fade are off; the form status keeps its fade.

### Don't:
- **Don't** round a corner or add a shadow.
- **Don't** fill a surface with a gradient; the repeating-gradient hairline guides are the only gradient, and they draw lines.
- **Don't** set tags as pills or chips; they are slash-separated text.
- **Don't** use red for anything but incorrect usage and errors.
- **Don't** add a second typeface or a dark theme.
- **Don't** place a cobalt tinted box inside a paper page.
