"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/home";
import { scrollToY } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-link";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Work wheel ──────────────────────────────────────────────────
 * Selected case studies on the rim of a drum that turns as you scroll.
 * The active card faces you flat; its neighbours tip away above and below
 * and dim. Title on the left, index on the right (click to jump).
 * Welcoming: the drum swings up into place as the section arrives.
 * ─────────────────────────────────────────────────────────────── */

function WheelCard({ item, index, position }: { item: CaseStudy; index: number; position: MotionValue<number> }) {
  const offset = useTransform(position, (p) => index - p);
  const transform = useTransform(offset, (d) => {
    const c = Math.max(-2, Math.min(2, d));
    return `translateY(${c * 128}%) rotateX(${-c * 38}deg) scale(${1 - Math.abs(c) * 0.12})`;
  });
  const opacity = useTransform(offset, (d) => 1 - Math.min(1, Math.max(0, Math.abs(d) - 1.1) * 2));
  const dim = useTransform(offset, (d) => Math.min(1, Math.abs(d)) * 0.6);
  const zIndex = useTransform(offset, (d) => 100 - Math.round(Math.abs(d) * 10));
  const pillOpacity = useTransform(offset, (d) => 1 - Math.min(1, Math.abs(d) * 4));
  const pointerEvents = useTransform(offset, (d) => (Math.abs(d) < 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ transform, opacity, zIndex, pointerEvents }}
      className="col-start-1 row-start-1 w-[min(84vw,640px)] will-change-transform md:w-[min(44vw,640px)]"
    >
      <Link
        href={`/our-works-case-study/${item.slug}`}
        className="group relative block aspect-[16/10] overflow-hidden bg-surface shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-line"
      >
        <Image
          src={item.image}
          alt={`${item.client} case study`}
          fill
          sizes="(min-width: 768px) 44vw, 84vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <motion.span style={{ opacity: dim }} className="absolute inset-0 bg-background" />
        <motion.span
          style={{ opacity: pillOpacity }}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-paper px-3 py-2 text-xs font-semibold text-paper-ink"
        >
          <ArrowUpRight className="size-3.5" /> View case study
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function WorkWheel({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const ref = React.useRef<HTMLElement>(null);
  const n = caseStudies.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Each card holds the centre for the first and last 30% of its stretch of
  // scroll and the drum turns in between, so a card is never caught
  // half-way when the reader stops.
  const position = useTransform(scrollYProgress, (p) => {
    const x = Math.min(1, Math.max(0, p)) * (n - 1);
    const i = Math.min(n - 2, Math.floor(x));
    const t = Math.min(1, Math.max(0, (x - i - 0.3) / 0.4));
    return i + t * t * (3 - 2 * t);
  });
  const [active, setActive] = React.useState(0);
  useMotionValueEvent(position, "change", (p) => setActive(Math.round(p)));

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + ((el.offsetHeight - window.innerHeight) * i) / (n - 1));
  };

  const item = caseStudies[active];

  return (
    <section ref={ref} id="work" data-ground="#0c0d0f" className="relative" style={{ height: `${100 + (n - 1) * 60}svh` }} aria-label="Selected works">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="container-x grid h-full grid-rows-[auto_1fr] gap-6 pt-24 md:grid-cols-12 md:grid-rows-1 md:pt-0">
          {/* Active title */}
          <div className="flex flex-col justify-center md:col-span-3">
            <p className="t-label">Selected works</p>
            <div className="relative mt-6 min-h-[9.5rem] md:min-h-[14rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <p className="text-[13px] text-fg-2">
                    {item.industry} · {item.services.join(" + ")}
                  </p>
                  <h3 className="t-display mt-3 text-[clamp(2.2rem,3.6vw,3.5rem)]">
                    {item.client}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{item.title}</p>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="t-display text-3xl text-signal-soft">{item.metric.value}</span>
                    <span className="text-xs text-muted-foreground">{item.metric.label}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <CtaLink href="/our-works-case-study" variant="ghost" className="mt-8 hidden self-start md:inline-flex">
              All case studies
            </CtaLink>
          </div>

          {/* The drum */}
          <motion.div
            initial={{ opacity: 0, rotateX: 50, scale: 0.75 }}
            whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="grid place-items-center md:col-span-6"
            style={{ perspective: 1400, transformPerspective: 1400 }}
          >
            {caseStudies.map((cs, i) => (
              <WheelCard key={cs.slug} item={cs} index={i} position={position} />
            ))}
          </motion.div>

          {/* Index */}
          <nav aria-label="Case studies" className="hidden flex-col items-end justify-center md:col-span-3 md:flex">
            <ol className="space-y-2 text-right">
              {caseStudies.map((cs, i) => (
                <motion.li
                  key={cs.slug}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "true" : undefined}
                    className={cn(
                      "group inline-flex items-center gap-3 text-[15px] transition-colors duration-300",
                      i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-px bg-signal transition-all duration-500 ease-out-expo",
                        i === active ? "w-8" : "w-0 group-hover:w-3",
                      )}
                    />
                    {cs.client}
                    <span className="text-[11px] tabular-nums text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
