"use client";

import * as React from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { values } from "@/content/home";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

function ValueRow({ value, index }: { value: (typeof values)[number]; index: number }) {
  const ref = React.useRef<HTMLLIElement>(null);
  // Lit while the row crosses the middle band of the screen.
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <li
      ref={ref}
      className={cn(
        "grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-10 transition-[opacity,translate] duration-700 ease-out-expo md:grid-cols-[4rem_1fr_auto] md:py-14",
        active ? "opacity-100" : "opacity-35 md:translate-x-2",
      )}
    >
      <span className={cn("font-mono text-sm transition-colors duration-500", active ? "text-signal" : "text-muted-foreground")}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-tight tracking-[-0.03em]">{value.title}</h3>
        <p className="mt-3 max-w-lg text-muted-foreground">{value.body}</p>
      </div>
      <span className="col-start-2 self-start justify-self-start rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:col-start-3">
        {value.tag}
      </span>
    </li>
  );
}

/**
 * Why MIL. Heading pinned on the left; on the right each value lights up
 * as it crosses the centre of the screen while a rail fills alongside.
 * Welcoming: the sheet tips up, then the first value lights as it arrives.
 */
export function Values() {
  const listRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.5"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <SectionEntrance variant="tilt" sheetClassName="bg-surface">
      <div className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Eyebrow index="05">Why MIL Digital</Eyebrow>
            <SplitText
              as="h2"
              text={"We're the data\nnerds in the room."}
              className="mt-6 text-[clamp(2.25rem,4.6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.04em]"
            />
            <p className="mt-6 max-w-sm text-muted-foreground">
              Strategy, media and creative under one roof, held together by numbers you can see every week.
            </p>
            <CtaLink href="/about-mil-digital" variant="ghost" className="mt-8">
              About MIL Digital
            </CtaLink>
          </div>
        </div>

        <div ref={listRef} className="relative md:col-span-7">
          <span className="absolute -left-6 top-0 hidden h-full w-px bg-line md:block" aria-hidden>
            <motion.span style={{ scaleY: fill }} className="block h-full w-px origin-top bg-signal" />
          </span>
          <ul className="border-t border-line">
            {values.map((v, i) => (
              <ValueRow key={v.title} value={v} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </SectionEntrance>
  );
}
