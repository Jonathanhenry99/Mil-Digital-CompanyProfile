"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type { HomeData } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionEntrance } from "@/components/motion/section-entrance";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 7; // seconds per quote

/**
 * One quote at a time, advancing on a timer shown as progress bars. The
 * timer pauses on hover, on keyboard focus and while off-screen.
 * Welcoming: the curtain opens and the first quote resolves out of a blur.
 */
export function Testimonials({ testimonials }: { testimonials: HomeData["testimonials"] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const paused = hovered || !inView;
  const t = testimonials[active % Math.max(testimonials.length, 1)];
  if (!t) return null;

  return (
    <SectionEntrance variant="curtain" sheetClassName="bg-background">
      <div
        ref={ref}
        className="container-x py-24 md:py-36"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <Eyebrow index="08">Client voices</Eyebrow>

        <div className="relative mt-12 min-h-[22rem] md:min-h-[20rem]" aria-live="polite">
          <span aria-hidden className="absolute -left-2 -top-10 font-serif text-[10rem] leading-none text-signal/30 md:-left-10">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={{ opacity: 0, filter: "blur(14px)", y: 24 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -16 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <blockquote className="max-w-5xl text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.03em]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-surface-raised font-mono text-sm text-signal-soft">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 ? (
        <div className="mt-14 grid grid-cols-3 gap-3 md:gap-6" role="tablist" aria-label="Testimonials">
          {testimonials.map((item, i) => (
            <button
              key={item.company}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className="group text-left"
            >
              <span className="block h-0.5 overflow-hidden bg-line-strong">
                {i === active ? (
                  <span
                    key={active}
                    className="block h-full origin-left bg-foreground"
                    style={{
                      animation: `testimonial-progress ${DURATION}s linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={() => setActive((a) => (a + 1) % testimonials.length)}
                  />
                ) : (
                  <span className={cn("block h-full bg-foreground/30", i < active ? "w-full" : "w-0")} />
                )}
              </span>
              <span
                className={cn(
                  "mt-3 block font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  i === active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {item.company}
              </span>
            </button>
          ))}
        </div>
        ) : null}
      </div>
    </SectionEntrance>
  );
}
