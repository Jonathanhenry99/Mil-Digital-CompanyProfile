"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The "welcoming" layer every major section gets (PROJECT_SPEC §5): as the
 * section's top travels up from the bottom of the viewport, its sheet opens
 * out to full size. Scroll-linked, so it plays forward and back with the
 * scroll. Variants are rotated down the page so consecutive sections never
 * arrive the same way; each section adds its own choreography on top.
 *
 * Uses `overflow: clip`, not `hidden`, so sticky children still stick.
 */
const variants = {
  /** Grows from a rounded card to full bleed. */
  rise: (p: number) => ({
    transform: `scale(${0.9 + 0.1 * p})`,
    borderRadius: `${48 * (1 - p)}px`,
  }),
  /** A window that widens from the centre. */
  curtain: (p: number) => ({
    clipPath: `inset(${14 * (1 - p)}% ${8 * (1 - p)}% 0% ${8 * (1 - p)}% round ${48 * (1 - p)}px)`,
  }),
  /** Tips up from below like a page being laid down. */
  tilt: (p: number) => ({
    transform: `perspective(1600px) rotateX(${14 * (1 - p)}deg) translateY(${80 * (1 - p)}px)`,
    borderRadius: `${40 * (1 - p)}px`,
  }),
} as const;

type SectionEntranceProps = {
  variant?: keyof typeof variants;
  className?: string;
  /** Classes for the moving sheet (background colour goes here). */
  sheetClassName?: string;
  id?: string;
  children: React.ReactNode;
};

export function SectionEntrance({
  variant = "rise",
  className,
  sheetClassName,
  id,
  children,
}: SectionEntranceProps) {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const style = useTransform(scrollYProgress, (p) => variants[variant](Math.min(1, Math.max(0, p))));

  const transform = useTransform(style, (s) => ("transform" in s ? s.transform : "none"));
  const borderRadius = useTransform(style, (s) => ("borderRadius" in s ? s.borderRadius : "0px"));
  const clipPath = useTransform(style, (s) => ("clipPath" in s ? s.clipPath : "none"));

  return (
    <section ref={ref} id={id} className={cn("relative", className)}>
      <motion.div
        className={cn("relative origin-top overflow-clip", sheetClassName)}
        style={reduce ? undefined : { transform, borderRadius, clipPath }}
      >
        {children}
      </motion.div>
    </section>
  );
}
