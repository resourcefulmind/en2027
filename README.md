# Handoff: Woven — Ebere & Nnamdi Wedding Invitation Site

> **Building with an AI coding agent (Claude Code)?** Start with **`AGENTS.md`** and the **`context/`** spec pack — a full set of context-engineering files (project overview, architecture, code standards, library docs, UI tokens & rules, component registry, phased build plan, progress tracker) tailored to this project. This README is the human-readable summary; `context/` is what the agent reads. (No product AI/agents are needed — this is a presentational site + two small form endpoints; see `context/project-overview.md`.)

## Overview
A single-page, mobile-first invitation website for the **Igbo traditional marriage (Igba Nkwu)** of **Ebere & Nnamdi** — 5 January 2027, 1:00 PM, at Central School Onicha Combine, Onicha Ezinihitte, Mbaise, Imo State. The aesthetic is *elegant, warm, unhurried* — old-money editorial restraint with contemporary African-luxury warmth (confident coral + antique gold, fine letterpress-style paper texture, a signature coral "thread" that runs the length of the page).

The deliverable is the full scrolling page plus each section in isolation. Everything is **done at the design level**; what remains is **porting it into your Next.js app** and **wiring two pieces of data** (RSVP, Well-Wishes).

---

## Target stack (per developer)
You're building this in **Next.js (App Router)** yourself — your daily stack — and want **`next/image`** for photo optimisation. This handoff is written for that. The HTML/CSS/JS files in `design/` are **design references**: the source of truth for markup structure, exact CSS, and interaction logic, to be **ported into React components**. They are pixel-accurate and fully interactive (open any in a browser to feel the intended behaviour), but the forms are **display-only** — no persistence yet.

Suggested shape (adapt to your conventions):
- **App Router**, one route (`app/page.tsx`) composed of section components (`components/Hero.tsx`, `OurStory.tsx`, `Schedule.tsx`, …). Keep them server components; mark the interactive ones (`Nav`, `Gallery` lightbox, `RSVP`, `WellWishes`, `FAQ`, `Countdown`) `"use client"`.
- **Design tokens** → port `styles.css` + `tokens/*.css` into `app/globals.css` as CSS custom properties (they're already plain `:root` variables — near copy-paste). Tailwind optional; if you use it, map the tokens to your theme, but the custom properties alone are enough.
- **Data (LOCKED decision — not optional):** Next.js **Route Handlers** (`app/api/rsvp/route.ts`, `app/api/wishes/route.ts`). **RSVP → Google Sheet** (via the Google Sheets API in `lib/sheets.ts`) — chosen because the couple can open/sort/share responses on their phone, and the Sheet's **native notification settings** email them on each new RSVP (no email infra at launch). **Well-Wishes → Supabase** (`lib/db.ts`) — needs live read-back + moderation. See `context/architecture.md` + `context/library-docs.md`.
- **Images:** `next/image` for the Our Story beats and Gallery tiles. The frames are pre-styled placeholders — drop `<Image>` in with `fill` + `object-fit: cover` inside the existing framed containers.
- **Fonts:** use **`next/font/google`** for **Fraunces** + **Hanken Grotesk** (replaces the CDN `@import` in `tokens/fonts.css`; gives you self-hosting + no layout shift for free).
- **Confirmation emails:** **out of scope for launch** — the on-screen success modal is the confirmation. Add later (Resend/Nodemailer in the route handler) if wanted.
- **Hosting:** Vercel (obvious fit).

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, motion, and copy structure are intentional — reproduce them exactly. The approved copy is in `context/WEDDING_SITE_CONTENT_SCRIPT.md` and compiled into **`content.ts`** (real names, framing, venue, time, family line, dress code, FAQ, section copy). **Genuine remaining placeholders** (square-bracketed; do not invent): the real how-we-met + proposal story, photographs, cash account details (+ Euro/Dollar), `[registry-url]`, `[RSVP DEADLINE]`, `[#HASHTAG]`, contact person, hotel list, confirmed run-of-show times. Names pending final spelling sign-off.

---

## File structure of this bundle
```
design_handoff_woven_wedding/
├── CLAUDE.md                      ← Claude Code auto-load → points to AGENTS.md + locked decisions
├── AGENTS.md                      ← canonical agent instructions (read first)
├── README.md                      ← this file (human summary)
├── content.ts                     ← approved copy compiled from the content script (drop into repo root)
├── context/                       ← the spec pack the agent reads
│   ├── project-overview.md
│   ├── architecture.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── build-plan.md
│   ├── progress-tracker.md
│   ├── WEDDING_SITE_CONTENT_SCRIPT.md   ← approved real copy (source for content.ts)
│   └── WEDDING_SITE_FACTS.md            ← full source of truth (couple/venue/family/RSVP)
├── styles.css                     ← design-system entry (imports the tokens)
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── fonts.css                  ← Fraunces + Hanken Grotesk (Google Fonts; swap for next/font)
├── design/
│   ├── Woven - Full Site.html     ← the assembled page (reference for composition/order)
│   ├── Hero.html                  ← individual sections (same code, isolated) — port each to a component
│   ├── Our Story.html
│   ├── Wedding Details.html
│   ├── Schedule.html
│   ├── Gallery.html
│   ├── Gifting.html
│   ├── Well-Wishes.html
│   ├── FAQ.html
│   ├── RSVP.html
│   ├── Footer.html
│   └── Navigation.html
└── screenshots/                   ← 01–10, one per section, in page order
```
The **isolated section files** are the cleanest to port (unscoped, self-contained CSS + JS per section). The **full-site file** shows final order and how sections connect (the continuous thread); in it each section's CSS is namespaced under a `.scope-<section>` wrapper and its JS runs in an IIFE scoped to that wrapper — that namespacing is an artifact of stitching one HTML file and is **unnecessary in React** (component scoping replaces it). Port from the isolated files; use the full-site file as the composition/visual reference.

---

## Design tokens (exact values)
From `tokens/colors.css`:
| Token | Value | Use |
|---|---|---|
| `--ivory` | `#FAF4EA` | primary page background |
| `--ivory-deep` | `#F3E9D8` | alternate section background |
| `--coffee` | `#3E2C22` | primary body text (always on ivory) |
| `--coffee-soft` | `#6B5547` | secondary/muted text |
| `--coral` / `--accent` | `#E07856` | primary accent + CTAs |
| `--coral-deep` | `#C75F3F` | coral hover/pressed |
| `--peach` | `#F2C0AC` | soft accent |
| `--peach-soft` | `#F8DECF` | lightest wash / selected fill |
| `--gold` | `#C29B45` | hairlines, monogram, flourishes (never a fill behind text) |
| `--white` | `#FFFFFF` | card surfaces |
| `--focus-ring` | `rgba(224,120,86,0.45)` | input focus ring |

**Contrast rules (must keep):** body text is always coffee on ivory — never gold or pale coral. Coral buttons use white text. Gold is a fine metal accent only.

Typography (`tokens/typography.css`):
- **Display** (names, section titles): `Fraunces`, weight 500, letter-spacing −0.015em.
- **Body / labels / buttons:** `Hanken Grotesk`, 400/600/700.
- **Eyebrows:** Hanken, uppercase, letter-spacing ~0.22–0.28em, ~11–12px.
- Body ~17px / line-height 1.6. Display titles use `clamp()` (≈ 2.1rem→3.4rem section, up to ~6rem hero).
- Load via `next/font/google` (Fraunces: opsz/ital; Hanken: 400/500/600/700), expose as the same CSS variables the markup already uses.

Spacing / radii / shadow / motion (`tokens/spacing.css`):
- 8-based spacing scale (`--space-1`…`--space-11` = 4→176px).
- Radii: 6 / 10 / 16px + pill (999px).
- Shadows: warm, low-opacity, coffee-based (`--shadow-soft/card/lift`).
- Motion: `--ease-out: cubic-bezier(0.22,0.61,0.36,1)`; durations 160/320/640ms. **All motion respects `prefers-reduced-motion`.**

Also: a repeating-linear-gradient "paper texture" + an SVG `feTurbulence` noise overlay per section (`--noise`), and a gold-foil linear-gradient (`<linearGradient id="goldFoil">`) for the monogram/crest. These are inline in the HTML — port them into a shared layout (the `goldFoil` def needs to exist once in the DOM; e.g. a small SVG `<defs>` in `app/layout.tsx`).

---

## Sections (in page order)
See `screenshots/01..10`. Shared per section: paper texture, a faint top "thread-in" (coral line → gold bead) linking sections, an eyebrow + Fraunces heading, generous whitespace.

1. **Navigation** (`"use client"`, sticky) — EN crest (→ top), links *Our Story · Schedule · Details · Gallery*, coral **RSVP** button. Frosts/condenses after the hero (the one backdrop-blur in the design). Active link tracks the section in view. Mobile: crest + RSVP + hamburger → slide-in textured sheet.
2. **Hero** — eyebrow "Together with their families", names **Ebere & Nnamdi** (coral italic ampersand), interlocked **EN gold monogram**, date line (Tue 5 Jan 2027 · 1:00 PM · Onicha Ezinihitte), **live Countdown** (`"use client"`), CTAs **RSVP** (→ RSVP) and **Our Story** (→ Story).
3. **Our Story** — two alternating beats (How We Met / The Proposal) with **photo placeholders → `next/image`**, a Fraunces pull-quote, gold rose line-art that draws in on scroll, golden-hour wash.
4. **Wedding Details** — Venue / Time / Dress Code cards (gold double-hairline cardstock); Dress Code shows colour-swatch chips; buttons **Open in Maps** and **Add to Calendar** (generates an `.ics`).
5. **Schedule (Order of the Day)** — single-flow vertical timeline where the **coral thread is the spine**, gold node per event, times right-aligned. Spine draws + events fade in on scroll.
6. **Gallery** (`"use client"`) — editorial masonry of styled placeholder frames (EN monogram + gold rose corners) with a wide feature tile; **lightbox** (prev/next/close, keyboard + scrim). "Photographs coming soon" empty-state note. Real photos → `next/image` inside the frames.
7. **Gifting** — gracious intro, two cash-account cards (Naira + Foreign w/ IBAN+SWIFT) each with **copy-to-clipboard** + "Copied!" confirmation, and a secondary **registry** button (→ `[registry-url]`).
8. **Well-Wishes** (`"use client"`) — tiny 2-field form (name + message); submitted wishes render as tilted pressed-paper note-cards with gold wax-seal studs in a masonry wall; warm empty state; seeded samples. **Needs persistence — see below.**
9. **FAQ** (`"use client"`) — gold-hairline accordion, 3 tiers (Essentials / Getting There / Good to Know), single-open, first question open by default.
10. **RSVP** (`"use client"`) — *the core action.* Name, Email, Phone/WhatsApp; **attendance choice cards** (Joyfully accepts / Regretfully declines); conditional **adults/children steppers** (only on accept) or a gracious decline line; optional message; **success modal** personalised with the guest's first name (separate YES / NO copy). **Needs persistence — see below.**
11. **Footer** — thread resolves into a final gold knot, EN crest, names, date, closing line, the groom's formal honour (**High Chief Nnamdi Obioha · Ikeoha 1 of Lude**), hashtag `[#HASHTAG]`, golden-hour wash deepening at the base.

---

## Interactions & behaviour (port these exactly)
- **Smooth-scroll** nav/anchor buttons; account for sticky-nav offset (use `scroll-margin-top` on sections — already in the design).
- **Reveal-on-scroll** (fade-and-rise; rose line-art draw; timeline spine draw) via IntersectionObserver + Web Animations API, gated on `prefers-reduced-motion`, with fallbacks so content is never left hidden. In React, drive these in `useEffect` per client component.
- **Selection feedback is instant** (no transition) on the RSVP attendance cards — intentional for clarity on older guests' phones. (Note: the design uses literal hex for the selected-state colors on purpose; keep that.)
- **Lightbox & modals:** open/close via button, scrim click, and Esc; move focus in and restore on close; lock body scroll while open.
- **Forms validate on submit** (required fields, email format, no-links guard on wishes, message length caps).
- **Avoid `scrollIntoView`** for the nav (the design uses `window.scrollTo` with a computed offset) — keeps the sticky header from covering section tops.

---

## Backend — what still needs building (the real work)
The forms are display-only. Wire these two via Route Handlers.

### 1. RSVP — `POST /api/rsvp`
After the existing client validation, POST and then show the success modal.
Payload: `name`, `email`, `phone`, `attending` (`"yes"|"no"`), `adults` (int), `children` (int), `message` (optional). Add a server timestamp.
- The current JS already computes all of these (attendance from the selected `.choice`; counts from the steppers; values from the inputs). In the component, call the route in the submit handler right before opening the modal.
- **Persist to the Google Sheet** via `lib/sheets.ts` (locked decision). Validate server-side too. Handle failure gracefully (inline error, preserve input). The couple is notified by the Sheet's native notification settings — no email code at launch.

### 2. Well-Wishes — `POST /api/wishes` + `GET /api/wishes`
- **POST** `name` + `message` to **Supabase** via `lib/db.ts` (keep the no-links + length guards server-side), then optimistically prepend the new card (already implemented client-side) and show the toast.
- **GET** approved wishes on load and render the wall (replace the seeded sample array). Include a `status`/`approved` flag so the couple can hide a wish (the design assumes a quiet moderation path; no guest-facing moderation UI). Consider revalidation/caching as you see fit.

(No emails at launch; add to the RSVP route later if desired.)

---

## Placeholders to replace (content pass)
Most copy is already real in `content.ts` (names, framing, venue, time, family line, dress code, FAQ, sections). The **genuine remaining placeholders** (square-bracketed; do not invent) are:
- The real **how-we-met + proposal** story (Our Story) and **photographs** (Our Story + Gallery).
- Gifting: account name/number/bank, IBAN, SWIFT (+ confirm Euro/Dollar), and `[registry-url]` (Giftdice link).
- `[RSVP DEADLINE]`, `[#HASHTAG]` (couple to pick — suggestions in the content script), contact person + number, hotel list.
- The Maps link and the confirmed Igba Nkwu run-of-show times.
- Confirm final **name spellings** before publishing (see `context/WEDDING_SITE_FACTS.md` §11).

---

## Assets
- **No raster images** are required by the design — monogram, crest, rose line-art, flourishes, dividers, and textures are all inline SVG / CSS. Real **photographs** (Our Story beats + Gallery tiles) are the only images to add — via `next/image`; frames are pre-styled placeholders.
- **Fonts:** Fraunces + Hanken Grotesk → `next/font/google`.
- **Icons:** inline SVG (thin-stroke, in-file). No icon library/CDN dependency.

---

## Suggested build order for Claude Code
1. Scaffold the Next.js App Router app; port `styles.css` + `tokens/*.css` into `app/globals.css` (CSS custom properties), set up `next/font/google` for the two families, and add the shared `goldFoil` SVG `<defs>` + any global resets in `app/layout.tsx`.
2. Port each isolated section file in `design/` to a section component (`components/*.tsx`), composing them in `app/page.tsx` in the order above. Mark interactive ones `"use client"`; move their JS into `useEffect`/handlers. Match markup + CSS exactly.
3. Verify the continuous coral thread and section rhythm against `design/Woven - Full Site.html` and the screenshots.
4. Build Route Handlers: `POST /api/rsvp` (→ Google Sheet via `lib/sheets.ts`), `POST /api/wishes` + `GET /api/wishes` (→ Supabase via `lib/db.ts`); wire the two forms (keep the success modal + toast).
5. Content/placeholder pass with the couple's real details (ideally via a single `content.ts`).
6. Add real photographs to Our Story + Gallery via `next/image`.
7. Deploy to Vercel; attach the custom domain.
8. (Optional, later) confirmation emails in the RSVP route.
```
```
