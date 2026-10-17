"use client";

import * as React from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { certifications, values } from "@/content/home";
import { cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/cta-link";
import { Hairline } from "@/components/motion/hairline";
import { SplitText } from "@/components/motion/split-text";

function ValueRow({ value, index }: { value: (typeof values)[number]; index: number }) {
  const ref = React.useRef<HTMLLIElement>(null);
  const on = useInView(ref, { margin: "-44% 0px -44% 0px" });
  return (
    <li ref={ref}>
      <Hairline delay={index * 60} />
      <div className={cn("grid grid-cols-[3rem_1fr] gap-x-4 py-8 transition-opacity duration-500 md:grid-cols-[4rem_1fr_auto] md:py-10", on ? "opacity-100" : "opacity-40")}>
        <span className={cn("pt-2 text-[13px] tabular-nums transition-colors duration-500", on ? "text-signal" : "text-fg-3")}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className={cn("t-display text-[clamp(1.9rem,3.4vw,3.1rem)] transition-transform duration-700 ease-out-expo", on && "md:translate-x-3")}>
            {value.title}
          </h3>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-fg-2">{value.body}</p>
        </div>
        <span className="col-start-2 mt-4 self-start justify-self-start border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-fg-3 md:col-start-3 md:mt-2">
          {value.tag}
        </span>
      </div>
    </li>
  );
}

/**
 * Chapter 7 (inventory: why MIL Digital & values). The heading holds on
 * the left; MIL's five core values light up one by one as they cross the
 * middle of the screen.
 */
export function Values() {
  return (
    <section data-ground="#0c0d0f" className="sec" aria-label="Why MIL Digital">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="t-label">Why MIL Digital</p>
            <SplitText as="h2" text={"We're the data\nnerds in the room."} className="t-h2 mt-4" />
            <p className="t-body mt-6 text-fg-2">
              Strategy, media and creative under one roof, held together by numbers you can see. These are the values we
              work by, campaign after campaign.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {certifications.map((c) => (
                <Image key={c.name} src={c.image} alt={c.name} width={48} height={48} className="size-12" />
              ))}
              <span className="t-label max-w-[14em]">Meta certified media buying &amp; digital marketing</span>
            </div>
            <div className="mt-8">
              <TextLink href="/about-mil-digital">More about MIL</TextLink>
            </div>
          </div>
        </div>
        <ul className="lg:col-span-7">
          {values.map((v, i) => (
            <ValueRow key={v.title} value={v} index={i} />
          ))}
          <Hairline />
        </ul>
      </div>
    </section>
  );
}
