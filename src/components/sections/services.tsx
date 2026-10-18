"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { services, type Service } from "@/content/home";
import { site } from "@/content/site";
import { TextLink } from "@/components/ui/cta-link";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

// Which Brief chip each service ticks.
const BRIEF_SERVICE = ["Consultation", "Advertising", "Creative"];
const EXTRA = ["Web SEO", "Web Development", "User Research"];

function Panel({ s, i, next }: { s: Service; i: number; next: React.RefObject<HTMLElement | null> | null }) {
  // As the next panel slides over this one, it dims and sinks back.
  const { scrollYProgress } = useScroll({ target: next ?? undefined, offset: ["start end", "start start"] });
  const dim = useTransform(scrollYProgress, [0, 1], [0, next ? 0.28 : 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, next ? 0.955 : 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", next ? "-3vh" : "0vh"]);

  return (
    <>
      <motion.div style={{ scale, y }} className="container-x grid min-h-[88svh] content-center gap-10 py-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <p className="t-label tabular-nums">
            <span className="text-signal">{s.index}</span> / 0{services.length}
          </p>
          <h3 className="t-display mt-5 text-[clamp(2.5rem,5.2vw,5rem)]">{s.title}</h3>
          <ul className="mt-8 flex flex-wrap gap-2">
            {s.points.map((p) => (
              <li key={p} className="border border-line-strong px-3 py-1.5 text-[13px] text-fg-2">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-end gap-8 lg:col-span-3 lg:col-start-6">
          <p className="t-body">{s.summary}</p>
          <div className="grid justify-items-start gap-4">
            <BriefTrigger service={BRIEF_SERVICE[i]} size="md">
              Discuss this service
            </BriefTrigger>
            <TextLink href={s.href}>Learn more</TextLink>
          </div>
        </div>
        <div className="ticks relative aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-9">
          <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
        </div>
      </motion.div>
      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-mil-blue" />
    </>
  );
}

/**
 * Chapter 5 (inventory: our services). Each service is a full panel that
 * slides over the one before; the covered panel dims and sinks back.
 * Every panel opens the Brief with that service already ticked.
 */
export function Services() {
  const refs = [React.useRef<HTMLElement>(null), React.useRef<HTMLElement>(null), React.useRef<HTMLElement>(null)];

  return (
    <section className="theme-light" aria-label="Our services">
      <div className="container-x grid gap-8 pb-14 pt-[var(--sec)] md:grid-cols-12">
        <SplitText as="h2" text={"Three disciplines,\none growth team."} className="t-h2 md:col-span-6" />
        <Reveal className="md:col-span-5 md:col-start-8 md:self-end">
          <p className="t-body text-fg-2">
            Start anywhere: a strategy audit, a campaign that needs to perform, or content that needs to stand out. The same
            team carries it from first plan to the numbers.
          </p>
        </Reveal>
      </div>

      <div>
        {services.map((s, i) => (
          <article
            key={s.href}
            ref={refs[i] as React.RefObject<HTMLElement>}
            className="relative overflow-hidden border-t border-line bg-background lg:sticky lg:top-0"
          >
            <Panel s={s} i={i} next={refs[i + 1] ?? null} />
          </article>
        ))}
      </div>

      <div className="container-x flex flex-col gap-6 border-t border-line py-10 md:flex-row md:items-center md:justify-between">
        <p className="t-label">
          Also: {EXTRA.join(" · ")}
        </p>
        <TextLink href={site.quizHref}>Not sure which fits? Take the 60-second brand quiz</TextLink>
      </div>
    </section>
  );
}
