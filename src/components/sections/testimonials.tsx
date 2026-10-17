"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { HomeData } from "@/lib/cms";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
// Client logos by company name, for the quote card (from the marquee set).
const LOGOS: Record<string, string> = { LYLA: "/clients/lyla.png" };

/**
 * Chapter 9 (inventory: testimonials). One large quote at a time; arrows
 * appear once the CMS holds more than one testimonial.
 */
export function Testimonials({ testimonials }: { testimonials: HomeData["testimonials"] }) {
  const [i, setI] = React.useState(0);
  const t = testimonials[i % Math.max(testimonials.length, 1)];
  if (!t) return null;
  const many = testimonials.length > 1;
  const logo = LOGOS[t.company];

  return (
    <section data-ground="#0c0d0f" className="sec" aria-label="Client stories">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <p className="t-label">What clients say</p>
          {many ? (
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-label={d < 0 ? "Previous testimonial" : "Next testimonial"}
                  onClick={() => setI((v) => (v + d + testimonials.length) % testimonials.length)}
                  className="grid size-12 place-items-center border border-line-strong transition-colors hover:bg-foreground hover:text-background"
                >
                  {d < 0 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <Reveal variant="blur" duration={1.2} className="mt-10 grid gap-10 border-t border-line pt-12 lg:grid-cols-12" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="contents"
            >
              <blockquote className="t-statement lg:col-span-9">
                <span aria-hidden className="mr-1 text-signal">“</span>
                {t.quote}
                <span aria-hidden className="text-signal">”</span>
              </blockquote>
              <figcaption className="flex items-center gap-4 lg:col-span-3 lg:flex-col lg:items-start lg:justify-end">
                {logo ? (
                  <Image src={logo} alt={t.company} width={480} height={160} className="h-10 w-auto opacity-90" />
                ) : null}
                <span>
                  <span className="block font-semibold">{t.name === t.company ? `Team ${t.name}` : t.name}</span>
                  <span className="block text-[13px] text-fg-2">
                    {t.role}
                    {t.name === t.company ? "" : `, ${t.company}`}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
