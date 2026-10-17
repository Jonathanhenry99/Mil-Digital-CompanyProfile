"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  /** Use "\n" for a forced line break. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /**
   * "load" animates on CSS alone, before hydration (hero headlines).
   * "inview" waits until the text scrolls into view.
   */
  mode?: "load" | "inview";
  /** Delay before the first word, in ms. */
  delay?: number;
  className?: string;
};

/** Words rise one by one from behind a mask. See `.split-*` in globals.css. */
export function SplitText({ text, as: Tag = "span", mode = "inview", delay = 0, className }: SplitTextProps) {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  let i = 0;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("block", className)}
      data-mode={mode}
      data-shown={mode === "load" || inView}
    >
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      {text.split("\n").map((line, l) => (
        <span key={l} aria-hidden className="split-line block">
          {line.split(" ").map((word, w, words) => (
            <React.Fragment key={w}>
              <span className="split-word">
                <span
                  className="split-inner"
                  style={{ "--i": i++, "--d": `${delay}ms` } as React.CSSProperties}
                >
                  {word}
                </span>
              </span>
              {w < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
