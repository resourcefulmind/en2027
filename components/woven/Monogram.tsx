import { content } from "@/content";

type Props = {
  /** Rendered pixel size (square). */
  size?: number;
  /** Add the engraved crest ring + top/bottom ticks (hero/footer use this). */
  crest?: boolean;
  className?: string;
};

/**
 * The EN monogram, filled with the shared #goldFoil gradient (defined once in
 * layout.tsx). Letters come from content.ts; the N carries an ivory outline so it
 * reads cleanly where it overlaps the E. Gold is metal here, never a text fill.
 */
export function Monogram({ size = 38, crest = false, className }: Props) {
  const { left, right } = content.couple.monogram;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={`${left} & ${right} monogram`}
    >
      {crest ? (
        <g fill="none" stroke="var(--color-gold)">
          <circle cx="60" cy="60" r="54" strokeWidth="1.1" />
          <circle cx="60" cy="60" r="47" strokeWidth="0.6" opacity="0.45" />
          <line x1="60" y1="3" x2="60" y2="9" strokeWidth="1" />
          <line x1="60" y1="111" x2="60" y2="117" strokeWidth="1" />
        </g>
      ) : null}
      <text
        x="50"
        y="82"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="74"
        fontWeight="500"
        fill="url(#goldFoil)"
      >
        {left}
      </text>
      <text
        x="71"
        y="82"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="74"
        fontWeight="500"
        fill="url(#goldFoil)"
        stroke="var(--color-ivory)"
        strokeWidth="4.5"
        paintOrder="stroke"
        style={{ strokeLinejoin: "round" }}
      >
        {right}
      </text>
    </svg>
  );
}
