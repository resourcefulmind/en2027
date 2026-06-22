/**
 * Feature 01 verification page — TEMPORARY.
 * Deliberately NOT the Hero: this only proves the foundation resolves —
 * next/font (Fraunces + Hanken), the @theme color/type tokens, and the shared
 * goldFoil gradient from layout.tsx. Phase 2 (build-plan 03–12) replaces this
 * entire file with the composed section components.
 */
export default function Home() {
  return (
    <main className="grid min-h-svh place-items-center bg-ivory px-6 text-coffee">
      <div className="flex flex-col items-center gap-5 text-center">
        <p className="font-body text-eyebrow font-semibold uppercase tracking-eyebrow text-coffee-soft">
          Woven · foundation check
        </p>

        <h1 className="font-display text-h4 font-medium leading-title">
          Tokens &amp; fonts resolve
        </h1>

        {/* Color tokens generate utilities → swatches confirm the palette. */}
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-6 rounded-sm bg-ivory-deep ring-1 ring-line-subtle" />
          <span className="size-6 rounded-sm bg-coffee" />
          <span className="size-6 rounded-sm bg-coral" />
          <span className="size-6 rounded-sm bg-peach" />
          <span className="size-6 rounded-sm bg-gold" />
        </div>

        {/* goldFoil gradient (defined once in layout.tsx) is reachable. */}
        <svg width="120" height="12" viewBox="0 0 120 12" aria-hidden="true">
          <rect x="0" y="5" width="120" height="2" fill="url(#goldFoil)" />
          <circle cx="60" cy="6" r="4" fill="url(#goldFoil)" />
        </svg>

        <p className="font-body text-caption text-coffee-soft">
          Fraunces display · Hanken body · coffee on ivory · gold foil
        </p>
      </div>
    </main>
  );
}
