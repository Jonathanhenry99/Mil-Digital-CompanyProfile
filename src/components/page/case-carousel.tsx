"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/cta-link";
import { SplitText } from "@/components/motion/split-text";

type CaseLike = { slug: string; client: string; title: string; industry: string; services: string[]; metric: { value: string; label: string }; image: string };

/**
 * Case studies as a swipeable row (adapted from MGD's carousels): cards
 * peek in from the right, drag or use the arrows, a counter and a progress
 * rule keep your place. Industry chips filter the row in place. One screen
 * tall, every card links to its case study.
 */
export function CaseCarousel({
  cases,
  label = "Selected works",
  title = "Results, not\njust reports.",
  filters = true,
  theme = "dark",
}: {
  cases: CaseLike[];
  label?: string;
  title?: string;
  filters?: boolean;
  theme?: "dark" | "light";
}) {
  const track = React.useRef<HTMLDivElement>(null);
  const [industry, setIndustry] = React.useState("All");
  const [state, setState] = React.useState({ index: 0, progress: 0 });
  const industries = ["All", ...new Set(cases.map((c) => c.industry))];
  const shown = industry === "All" ? cases : cases.filter((c) => c.industry === industry);

  const update = React.useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    setState({ index: Math.round(el.scrollLeft / step), progress: max > 0 ? el.scrollLeft / max : 1 });
  }, []);

  React.useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    update();
  }, [industry, update]);

  const go = (dir: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <section id="work" data-ground={theme === "dark" ? "#0c0d0f" : undefined} className={cn("sec overflow-hidden", theme === "light" && "theme-light")} aria-label={label}>
      <div className="container-x">
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="t-label">{label}</p>
            <SplitText as="h2" text={title} className="t-h2 mt-4" />
          </div>
          <div className="flex flex-col gap-5 md:col-span-6 md:items-end">
            {filters && industries.length > 2 ? (
              <div className="flex flex-wrap gap-2 md:justify-end" role="group" aria-label="Filter by industry">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    aria-pressed={industry === ind}
                    onClick={() => setIndustry(ind)}
                    className={cn(
                      "border px-3 py-1.5 text-[13px] transition-colors",
                      industry === ind ? "border-foreground bg-foreground text-background" : "border-line-strong text-fg-2 hover:text-foreground",
                    )}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            ) : null}
            <TextLink href="/our-works-case-study">All case studies</TextLink>
          </div>
        </div>
      </div>

      {/* The row bleeds off the right edge; the left edge lines up with the grid. */}
      <div
        ref={track}
        onScroll={update}
        data-lenis-prevent-horizontal
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pl-[max(var(--gutter),calc((100vw-1760px)/2+var(--gutter)))] pr-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shown.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 3) * 0.08 }}
            className="w-[82vw] shrink-0 snap-start md:w-[46vw] lg:w-[38vw]"
          >
            <Link href={`/our-works-case-study/${c.slug}`} className="group block">
              <div className="ticks relative aspect-[4/3] overflow-hidden bg-surface">
                <Image src={c.image} alt={`${c.client} case study`} fill sizes="(min-width: 1024px) 38vw, 82vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white">
                  <span className="t-display block text-[clamp(2.4rem,4vw,3.6rem)]">{c.metric.value}</span>
                  <span className="block text-[13px] text-white/75">{c.metric.label}</span>
                </span>
                <span className="absolute right-4 top-4 grid size-10 place-items-center bg-white text-[#0c0d0f] opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-4">
                <h3 className="t-display text-[1.7rem]">{c.client}</h3>
                <p className="text-[13px] text-fg-3">{c.industry}</p>
              </div>
              <p className="mt-1 max-w-[30em] text-[15px] text-fg-2">{c.title}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="container-x mt-8 flex items-center gap-6">
        <p className="text-[13px] tabular-nums text-fg-2">
          <b className="text-foreground">{String(Math.min(state.index + 1, shown.length)).padStart(2, "0")}</b> / {String(shown.length).padStart(2, "0")}
        </p>
        <span className="relative h-px flex-1 bg-line">
          <span className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-300" style={{ width: `${Math.max(8, state.progress * 100)}%` }} />
        </span>
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous case study" : "Next case study"}
              className="grid size-12 place-items-center border border-line-strong transition-colors hover:bg-foreground hover:text-background"
            >
              {d < 0 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
