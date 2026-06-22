"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";

/* --- single-line rose engravings, ported verbatim from design/Our Story.html --- */

type Rosette = { spiral: string; ring: string };

// A rosette: an inward spiral wrapped by a scalloped petal ring.
function rosetteParts(cx: number, cy: number, scale: number): Rosette {
  const s = scale;
  let spiral = "";
  const turns = 2.45;
  const steps = 92;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const r = (0.9 + 1.55 * (t / (2 * Math.PI))) * s;
    const x = cx + Math.cos(t) * r;
    const y = cy + Math.sin(t) * r;
    spiral += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  const petals = 6;
  const R = 4.0 * s;
  const depth = 2.6 * s;
  let ring = "";
  for (let i = 0; i <= petals; i++) {
    const a = (i / petals) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(a) * R;
    const y = cy + Math.sin(a) * R;
    if (i === 0) {
      ring += "M" + x.toFixed(1) + " " + y.toFixed(1) + " ";
    } else {
      const aMid = ((i - 0.5) / petals) * 2 * Math.PI - Math.PI / 2;
      const ccx = cx + Math.cos(aMid) * (R + depth);
      const ccy = cy + Math.sin(aMid) * (R + depth);
      ring += "Q" + ccx.toFixed(1) + " " + ccy.toFixed(1) + " " + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
  }
  return { spiral, ring };
}

// Almond leaf between two points, width w.
function leaf(x1: number, y1: number, x2: number, y2: number, w: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const c1x = mx + nx * w;
  const c1y = my + ny * w;
  const c2x = mx - nx * w;
  const c2y = my - ny * w;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${c1x.toFixed(1)} ${c1y.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} Q${c2x.toFixed(1)} ${c2y.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)} `;
}

const polyPoints = (spiral: string) => spiral.replace(/[ML]/g, " ").trim();

// Precomputed once (deterministic geometry).
const SPRIG = rosetteParts(34, 30, 3.0);
const SPRIG_STEM = "M34 44 C 34 70, 33 92, 30 120 ";
const SPRIG_L1 = leaf(33, 74, 12, 64, 7);
const SPRIG_L2 = leaf(32, 96, 54, 90, 7.5);
const BLOOM = rosetteParts(32, 32, 3.6);

const STROKE: CSSProperties = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
};

type Props = {
  /** "sprig" = bloom + stem + leaves; "bloom" = standalone rosette. */
  variant?: "sprig" | "bloom";
  /** Stroke colour — gold (default) or coral. */
  color?: "gold" | "coral";
  className?: string;
};

/**
 * Gold single-line rose line-art that draws itself in on scroll via the Web
 * Animations API. Resting state is VISIBLE; we only hide-then-draw when motion is
 * allowed, and a setTimeout pins every stroke to its final state so the rose can
 * never be stranded mid-draw (ported from the design's draw logic).
 */
export function RoseSprig({ variant = "sprig", color = "gold", className }: Props) {
  const { ref, revealed } = useReveal<HTMLSpanElement>();
  const svgRef = useRef<SVGSVGElement>(null);

  // Prime strokes hidden on mount (only when motion is allowed).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    svg.querySelectorAll<SVGGeometryElement>("path, polyline").forEach((p) => {
      let len = 0;
      try {
        len = p.getTotalLength();
      } catch {
        len = 0;
      }
      if (!len) return;
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });
  }, []);

  // Draw in when the element enters view.
  useEffect(() => {
    if (!revealed) return;
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    svg.querySelectorAll<SVGGeometryElement>("path, polyline").forEach((p, i) => {
      let len = 0;
      try {
        len = p.getTotalLength();
      } catch {
        len = 0;
      }
      if (!len) return;
      if (reduce) {
        p.style.strokeDashoffset = "0";
        return;
      }
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      const anim = p.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 2200, delay: i * 120, easing: "cubic-bezier(0.22,0.61,0.36,1)", fill: "forwards" },
      );
      // Timer-driven safety (not the paint clock): guarantee a visible end state.
      const finalize = () => {
        try {
          anim.cancel();
        } catch {
          /* no-op */
        }
        p.style.strokeDashoffset = "0";
      };
      anim.onfinish = finalize;
      timers.push(window.setTimeout(finalize, 2600 + i * 120));
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [revealed]);

  return (
    <span
      ref={ref}
      className={cn("inline-block", color === "coral" ? "text-coral opacity-90" : "text-gold", className)}
    >
      {variant === "sprig" ? (
        <svg viewBox="0 0 68 130" width="100%" aria-hidden="true" ref={svgRef}>
          <path d={SPRIG_STEM} style={STROKE} />
          <path d={SPRIG_L1} style={STROKE} />
          <path d={SPRIG_L2} style={STROKE} />
          <polyline points={polyPoints(SPRIG.spiral)} style={STROKE} />
          <path d={SPRIG.ring} style={STROKE} />
        </svg>
      ) : (
        <svg viewBox="0 0 64 64" width="100%" aria-hidden="true" ref={svgRef}>
          <polyline points={polyPoints(BLOOM.spiral)} style={STROKE} />
          <path d={BLOOM.ring} style={STROKE} />
        </svg>
      )}
    </span>
  );
}
