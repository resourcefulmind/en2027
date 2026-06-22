# Woven

A mobile-first wedding invitation site, built with Next.js.

A single-page presentational site with two forms — RSVP and well-wishes.

## Stack

- Next.js (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4
- `next/font` — Fraunces (display) + Hanken Grotesk (body)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```text
app/            routes, layout, global tokens
components/
  woven/        shared UI primitives
  sections/     page sections + navigation
lib/            scroll, class, and data helpers
content.ts      all site copy
```

## Status

Phase 2 — building the page UI section by section. In: foundation,
navigation, hero, countdown. Pending: the remaining sections and the form
endpoints (RSVP → Google Sheets, well-wishes → Supabase).
```
