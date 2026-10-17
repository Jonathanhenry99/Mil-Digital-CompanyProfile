"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const DIGITS = "0123456789".split("");

/**
 * Digits roll up to their value like a mechanical counter when scrolled
 * into view. Non-digit characters (Rp, +, x, %) sit still. The real value
 * is in the accessible text; the rolling strips are aria-hidden.
 */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  let d = 0;

  return (
    <span ref={ref} className={cn("inline-flex tabular-nums", className)}>
      <span className="sr-only">{value}</span>
      {value.split("").map((char, i) => {
        const n = DIGITS.indexOf(char);
        if (n < 0) {
          return (
            <span key={i} aria-hidden>
              {char}
            </span>
          );
        }
        return (
          <span key={i} aria-hidden className="odo-col">
            <span
              className="odo-strip"
              style={
                {
                  "--i": d++,
                  transform: `translateY(${inView ? -n * 10 : 0}%)`,
                } as React.CSSProperties
              }
            >
              {DIGITS.map((digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
