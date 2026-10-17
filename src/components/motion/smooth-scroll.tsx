"use client";

import * as React from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis smooth scroll for the whole page. Lenis drives the native scroll
 * position, so `position: sticky` and Motion's useScroll keep working.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);
  return null;
}
