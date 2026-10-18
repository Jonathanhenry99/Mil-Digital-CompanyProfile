"use client";

import * as React from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { scrollToY } from "@/lib/lenis";
import { SCENE_MARKUP, buildScene, fitScene } from "./growth-scene";

/** MIL's approach, told along the Trinity Principles and Pillars (Brand Book 2025). */
const STEPS = [
  { n: "01", title: "Discover & Diagnose", body: "We audit your brand, channels and data to find where growth is leaking, before we touch a single campaign." },
  { n: "02", title: "Strategize", body: "A tailored plan across the Trinity: product, branding and marketing, with KPIs that fit your goals." },
  { n: "03", title: "Execute", body: "Organic, advertising and influencer working together every day, run by one team that owns the outcome." },
  { n: "04", title: "Grow & Celebrate", body: "Every result measured and reported, every milestone reached, together." },
];

// The last 8% of the scroll holds the finished room.
const HOLD = 0.92;

/**
 * Consultation page, "how we grow brands". Pinned for a few screens: one
 * office builds up from a bare concrete shell to a busy floor with a
 * milestone wall while the four steps light up in turn. Steps are buttons
 * that scroll to their part of the story.
 */
export function GrowthScroll() {
  const ref = React.useRef<HTMLElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const renderRef = React.useRef<((p: number) => void) | null>(null);
  const [step, setStep] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const draw = React.useCallback((raw: number) => {
    const p = Math.min(1, Math.max(0, raw / HOLD));
    renderRef.current?.(p);
    setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
  }, []);

  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // Rebuild from the static markup so a remount never doubles the generated layers.
    svg.innerHTML = SCENE_MARKUP;
    renderRef.current = buildScene(svg);
    const fit = () => fitScene(svg);
    fit();
    draw(scrollYProgress.get());
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      renderRef.current = null;
    };
  }, [draw, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", draw);

  const goTo = (i: number) => {
    const section = ref.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + (i * 0.25 + 0.125) * HOLD * total);
  };

  return (
    <section ref={ref} data-ground="#0a1733" className="growth-scroll relative h-[400svh]" aria-label="How we grow brands">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#0a1733]">
        <svg
          ref={svgRef}
          className="absolute inset-x-0 top-[36%] h-[64%] w-full md:top-0 md:h-full"
          viewBox="106 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="An office that changes from an empty concrete space into a busy agency floor with a milestone wall"
        />
        <div aria-hidden className="growth-shade pointer-events-none absolute inset-0" />

        <div className="container-x relative flex h-full flex-col justify-between gap-4 pb-[clamp(20px,4.5vh,44px)] pt-[clamp(88px,13vh,128px)]">
          <div className="max-w-[34rem]">
            <p className="t-label flex items-center gap-2.5">
              <span className="size-2 bg-signal" /> Our growth process
            </p>
            <h2 className="mt-[clamp(10px,2vh,20px)] max-w-[11.5em] text-balance font-display text-[clamp(2.1rem,min(4.2vw,7.2vh),4.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
              From a blank space to <span className="text-warm">measurable growth.</span>
            </h2>
            <ol className="mt-4 grid gap-[clamp(8px,1.6vh,16px)] md:mt-[clamp(18px,4vh,44px)]">
              {STEPS.map((s, i) => (
                <li key={s.n} className={cn("transition-opacity duration-400", i === step ? "opacity-100" : "opacity-40 max-md:hidden")}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === step ? "step" : undefined}
                    className="grid cursor-pointer grid-cols-[2.4rem_1fr] items-baseline py-0.5 text-left font-display focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                  >
                    <span className={cn("text-[0.78rem] tabular-nums tracking-[0.08em]", i === step ? "text-warm" : "text-fg-2")}>{s.n}</span>
                    <span className="text-[clamp(1.02rem,2.2vh,1.25rem)] font-semibold tracking-[-0.01em] text-white">{s.title}</span>
                  </button>
                  <p
                    className={cn(
                      "ml-[2.4rem] max-w-[36ch] overflow-hidden text-[0.95rem] leading-normal text-fg-2 transition-all duration-500",
                      i === step ? "mt-1.5 max-h-[7em] opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <ScrollTrack progress={scrollYProgress} />
        </div>
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of 4: {STEPS[step].title}
        </p>
      </div>
    </section>
  );
}

/** Before → After line along the bottom, with a tick per step. */
function ScrollTrack({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const fill = React.useRef<HTMLDivElement>(null);
  useMotionValueEvent(progress, "change", (p) => {
    if (fill.current) fill.current.style.transform = `scaleX(${Math.min(1, p / HOLD)})`;
  });
  return (
    <div aria-hidden className="grid grid-cols-[auto_1fr_auto] items-center gap-4 text-[0.72rem] uppercase tracking-[0.14em] text-fg-2">
      <span>Before</span>
      <div className="relative h-0.5 bg-white/25">
        <div ref={fill} className="absolute inset-0 origin-left bg-white" style={{ transform: "scaleX(0)" }} />
        {[25, 50, 75].map((l) => (
          <i key={l} className="absolute -top-[3px] h-2 w-px bg-white/30" style={{ left: `${l}%` }} />
        ))}
      </div>
      <span>After</span>
    </div>
  );
}
