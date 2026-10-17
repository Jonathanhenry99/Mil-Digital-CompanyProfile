"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * A giant line of type that slides sideways with the scroll (adapted from
 * MGD's marquee strip): a light band between dark chapters, part
 * divider, part statement.
 */
export function TextBand({ text = "Digital marketing growth partner", reverse = false }: { text?: string; reverse?: boolean }) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-30%", "0%"] : ["0%", "-30%"]);
  const line = Array.from({ length: 4 }, () => text).join("  ·  ");

  return (
    <section ref={ref} className="theme-light overflow-hidden py-[clamp(28px,4vw,56px)]" aria-hidden>
      <motion.p style={{ x }} className="t-display whitespace-nowrap text-[clamp(4rem,11vw,11rem)] uppercase leading-none tracking-[-0.04em]">
        {line.split("  ·  ").map((t, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--fg)]" : ""}>{t}</span>
            <span className="mx-[0.25em] text-signal">·</span>
          </React.Fragment>
        ))}
      </motion.p>
    </section>
  );
}
