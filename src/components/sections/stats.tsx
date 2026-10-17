"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { certifications, type Stat } from "@/content/home";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Odometer } from "@/components/motion/odometer";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

// Hand-drawn upward trends, one per stat, purely decorative.
const SPARKS = [
  "M0 30 L12 26 L24 28 L36 18 L48 20 L60 10 L72 12 L84 2",
  "M0 28 L12 29 L24 22 L36 24 L48 14 L60 16 L72 6 L84 4",
  "M0 26 L12 22 L24 24 L36 16 L48 18 L60 8 L72 10 L84 3",
  "M0 22 L12 20 L24 21 L36 14 L48 12 L60 13 L72 6 L84 5",
];

/**
 * Welcoming: the sheet tips up from below, cells rise in sequence, digits
 * roll like an odometer and each sparkline draws itself.
 */
export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <SectionEntrance variant="tilt" sheetClassName="bg-background">
      <div className="container-x py-24 md:py-36">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <Eyebrow index="01" className="md:col-span-4">
            By the numbers
          </Eyebrow>
          <SplitText
            as="h2"
            text={"Numbers we're\naccountable for."}
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em] md:col-span-8"
          />
        </div>

        <dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="relative flex flex-col justify-between gap-10 border-b border-line py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 lg:first:pl-0"
            >
              <div className="flex items-start justify-between gap-4">
                <dt className="eyebrow">{stat.label}</dt>
                <svg viewBox="0 0 84 32" className="h-8 w-20 overflow-visible" aria-hidden>
                  <motion.path
                    d={SPARKS[i % SPARKS.length]}
                    fill="none"
                    stroke="var(--signal)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </div>
              <dd>
                <p className="flex items-end gap-1 text-[clamp(3.25rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.04em]">
                  {stat.prefix ? <span className="pb-[0.1em] text-[0.4em] leading-none text-muted-foreground">{stat.prefix}</span> : null}
                  <Odometer value={stat.value.toFixed(stat.decimals ?? 0)} />
                  {stat.suffix ? <span className="pb-[0.06em] text-[0.5em] leading-none text-signal-soft">{stat.suffix}</span> : null}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{stat.note}</p>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <p className="eyebrow shrink-0">Certified by</p>
          <ul className="flex flex-wrap items-center gap-4">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4">
                <Image src={c.image} alt="" width={40} height={40} className="size-10" />
                <span className="text-sm">{c.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SectionEntrance>
  );
}
