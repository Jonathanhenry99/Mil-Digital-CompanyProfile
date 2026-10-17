"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { SignalField } from "./signal-field";

/** MIL's approach (brief: assessment, strategize, monitor; old site: funnel + KPIs). */
const STEPS = [
  { n: "01", title: "Assessment", body: "We audit your brand, channels, assets and data to find where growth is leaking." },
  { n: "02", title: "Strategize", body: "A funnel plan from awareness to consideration to conversion, with KPIs that fit your goals." },
  { n: "03", title: "Execute", body: "Meta certified ads, content and campaigns, run by one team that owns the outcome." },
  { n: "04", title: "Monitor & optimise", body: "Every metric measured, reported and tuned, so each month builds on the last." },
];

// Illustrative readings that climb as the chapter plays (labelled as such on screen).
const KPIS = [
  { label: "Reach", from: 12, to: 480, fmt: (v: number) => `${Math.round(v)}k` },
  { label: "Qualified leads", from: 40, to: 1260, fmt: (v: number) => `${Math.round(v)}` },
  { label: "ROAS", from: 1.1, to: 4.8, fmt: (v: number) => `${v.toFixed(1)}x` },
];

function Kpi({ k, progress }: { k: (typeof KPIS)[number]; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const text = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, (p - 0.45) / 0.5));
    return k.fmt(k.from + (k.to - k.from) * (1 - Math.pow(1 - t, 2)));
  });
  return (
    <div className="border-r border-line px-4 py-3 last:border-r-0 md:px-5">
      <p className="text-[11px] uppercase tracking-[0.1em] text-fg-3">{k.label}</p>
      <motion.p className="t-display mt-1 text-[clamp(1.4rem,2.4vw,2.2rem)] tabular-nums">{text}</motion.p>
    </div>
  );
}

/**
 * Chapter 6 (inventory: why MIL, our approach). Pinned for four screens:
 * scattered points assemble into a rising chart inside a dashboard frame
 * while the four steps light up in turn, and a trend line draws itself in
 * the last step. The canvas could later be swapped for a frame sequence
 * from a Higgsfield film without changing the chapter.
 */
export function Process() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 0.999))));

  const formation = useTransform(scrollYProgress, [0.2, 0.62], [0, 0.7]);
  const trend = useTransform(scrollYProgress, [0.74, 0.96], [0, 1]);
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { scrollYProgress: entry } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const frameOpacity = useTransform(entry, [0.3, 1], [0, 1]);
  const frameY = useTransform(entry, [0.3, 1], [60, 0]);

  return (
    <section ref={ref} data-ground="#0a1324" className="relative h-[420svh]" aria-label="How we grow brands">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-x grid w-full gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-4">
            <p className="t-label">How we grow brands</p>
            <h2 className="t-h2 mt-4 max-w-[11em]">From scattered data to steady growth.</h2>
            <ol className="mt-8 hidden gap-5 md:grid">
              {STEPS.map((s, i) => (
                <li key={s.n} className={cn("grid grid-cols-[40px_1fr] transition-opacity duration-500", i === step ? "opacity-100" : "opacity-35")}>
                  <span className="text-[13px] tabular-nums text-fg-2">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p
                      className={cn(
                        "overflow-hidden text-[15px] leading-relaxed text-fg-body transition-[opacity,max-height,margin] duration-500",
                        i === step ? "mt-1.5 max-h-24 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <motion.div style={{ opacity: frameOpacity, y: frameY }} className="ticks flex flex-col border border-line bg-[#08101f]/70 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2 bg-fg-3" />
                  <span className="size-2 bg-fg-3" />
                  <span className="size-2 bg-signal" />
                </span>
                <span className="text-[13px] text-fg-2">MIL / Growth dashboard</span>
              </div>
              <span className="border border-line px-2 py-0.5 text-[11px] uppercase tracking-[0.1em] text-fg-3">Illustrative</span>
            </div>
            <div className="grid grid-cols-3 border-b border-line">
              {KPIS.map((k) => (
                <Kpi key={k.label} k={k} progress={scrollYProgress} />
              ))}
            </div>
            <div className="relative h-[34svh] md:h-[46svh]">
              <SignalField progress={formation} className="absolute inset-0 size-full" />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-[8%] bottom-[20%] top-[12%] h-auto w-[84%]" aria-hidden>
                <motion.path
                  d="M0,92 C14,88 22,80 34,72 S58,52 70,40 S88,16 100,6"
                  fill="none"
                  stroke="var(--aqua)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: trend, filter: "drop-shadow(0 0 6px rgb(56 198 244 / .6))" }}
                />
              </svg>
              {/* Mobile: the current step sits on the frame */}
              <div className="absolute inset-x-4 bottom-3 md:hidden">
                <p className="text-[13px] text-fg-2">
                  {STEPS[step].n} · <span className="font-semibold text-foreground">{STEPS[step].title}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-line px-4 py-3 text-[13px] text-fg-2">
              <span>Noise</span>
              <span className="relative h-px flex-1 bg-line">
                <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-foreground" />
              </span>
              <span>Signal</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
