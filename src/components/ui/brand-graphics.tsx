import { cn } from "@/lib/utils";

/*
 * Supporting graphics from the MIL Digital Brand Book 2025.
 *  - <BrandShapes>: background elements made by enlarging the logomark
 *    ("Background Elements" page).
 *  - <LogoPart>: the three shapes behind the logo (Graph, People, Scaling).
 *  - <ArrowBadge>, <Spark>: the yellow arrow circle and the asterisk used
 *    around "LET'S GROW MILES ✱ AWAY TOGETHER!".
 * Shapes are drawn as simple vectors traced from the logomark.
 */

const M = "M0 72V31Q0 26 4 29L28 50L49 22Q52 18 52 24V72Z";
const I_DOT = { cx: 66, cy: 9, r: 8.5 };
const I_STEM = "M58 30Q58 24 64 24H68Q74 24 74 30V72H58Z";
const L = "M82 6Q82 0 88 0H92Q98 0 98 6V50Q98 72 82 72Z";

/** The logomark, enlarged and cropped, as a background element. */
export function BrandShapes({ className, variant = "mark" }: { className?: string; variant?: "mark" | "m" }) {
  const id = variant === "m" ? "bs-m" : "bs-mark";
  return (
    <svg aria-hidden viewBox={variant === "m" ? "0 0 54 74" : "0 0 100 74"} className={cn("pointer-events-none", className)} preserveAspectRatio="xMaxYMax meet">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1b3c7f" stopOpacity="0" />
          <stop offset="0.55" stopColor="#1460b8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#00adee" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <path d={M} />
        {variant === "mark" ? (
          <>
            <circle {...I_DOT} />
            <path d={I_STEM} />
            <path d={L} />
          </>
        ) : null}
      </g>
    </svg>
  );
}

/** One of the three shapes the logo is built from. */
export function LogoPart({ shape, className }: { shape: "graph" | "people" | "scaling"; className?: string }) {
  return (
    <svg aria-hidden viewBox={shape === "graph" ? "0 0 54 74" : shape === "people" ? "52 -2 26 76" : "80 -2 20 76"} className={className}>
      <defs>
        <linearGradient id={`lp-${shape}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1b3c7f" />
          <stop offset="1" stopColor="#00adee" />
        </linearGradient>
      </defs>
      <g fill={`url(#lp-${shape})`}>
        {shape === "graph" ? <path d={M} /> : null}
        {shape === "people" ? (
          <>
            <circle {...I_DOT} />
            <path d={I_STEM} />
          </>
        ) : null}
        {shape === "scaling" ? <path d={L} /> : null}
      </g>
    </svg>
  );
}

/** Yellow circle with an up-right arrow. */
export function ArrowBadge({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <circle cx="20" cy="20" r="20" fill="var(--mil-yellow)" />
      <path d="M14 26L26 14M16 14H26V24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The brand asterisk, in MIL light blue. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <g stroke="var(--mil-sky)" strokeWidth="6" strokeLinecap="round">
        <path d="M20 4V36M4 20H36M8.7 8.7L31.3 31.3M31.3 8.7L8.7 31.3" />
      </g>
    </svg>
  );
}
