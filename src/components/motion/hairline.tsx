"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

/** A 1px rule that draws in from the left when it scrolls into view. */
export function Hairline({ delay = 0, className }: { delay?: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <span
      ref={ref}
      aria-hidden
      data-in={inView}
      className={cn("hairline", className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    />
  );
}
