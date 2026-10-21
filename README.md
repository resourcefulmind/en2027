# Woven

A mobile-first wedding invitation site, built with Next.js.

A single-page presentational site with two forms: RSVP and well-wishes.

## Stack

- Next.js (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4
- `next/font`: Fraunces (display) + Hanken Grotesk (body)

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

Live at https://en2027.vercel.app with every section built, RSVP writing to a
Google Sheet and well-wishes to Supabase. Remaining: the last gallery and story
photographs, then a final launch check.
```
