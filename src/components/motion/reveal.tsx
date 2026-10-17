"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type TargetAndTransition } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const settled = { opacity: 1, x: 0, y: 0, scale: 1 };

const variants: Record<string, { from: TargetAndTransition; to: TargetAndTransition }> = {
  up: { from: { opacity: 0, y: 40 }, to: settled },
  left: { from: { opacity: 0, x: -60 }, to: settled },
  right: { from: { opacity: 0, x: 60 }, to: settled },
  scale: { from: { opacity: 0, scale: 0.92 }, to: settled },
  blur: { from: { opacity: 0, scale: 0.88, filter: "blur(16px)" }, to: { ...settled, filter: "blur(0px)" } },
  /** Tips up toward the viewer like a card laid on a table. */
  tilt: {
    from: { opacity: 0, rotateX: 28, y: 60, transformPerspective: 900 },
    to: { ...settled, rotateX: 0, transformPerspective: 900 },
  },
  /** Wiped open from the bottom edge. */
  unfold: {
    from: { clipPath: "inset(100% 0% 0% 0%)" },
    to: { clipPath: "inset(0% 0% 0% 0%)" },
  },
};

type RevealProps = HTMLMotionProps<"div"> & {
  /** How the element arrives. */
  variant?: keyof typeof variants;
  /** Seconds. Use index × 0.08 for a stagger. */
  delay?: number;
  /** Share of the element that must be visible before it plays. */
  amount?: number;
  duration?: number;
};

/** One-shot entrance when the element scrolls into view. */
export function Reveal({ variant = "up", delay = 0, amount = 0.3, duration = 1, children, ...props }: RevealProps) {
  const v = variants[variant];

  // Chrome's IntersectionObserver honours the target's own clip-path, so a
  // fully clipped element never counts as visible. Observe the wrapper and
  // clip an inner layer instead.
  if (variant === "unfold") {
    return (
      <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount }} {...props}>
        <motion.div
          className="relative size-full"
          variants={{ hidden: v.from, shown: v.to }}
          transition={{ duration, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={v.from}
      whileInView={v.to}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
