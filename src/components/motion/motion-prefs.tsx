"use client";

import { MotionConfig } from "motion/react";

/**
 * Respects the visitor's reduced-motion setting for every Motion animation:
 * movement (slides, parallax, scaling) is dropped and only fades remain, so
 * content still arrives but nothing travels across the screen.
 */
export function MotionPrefs({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
