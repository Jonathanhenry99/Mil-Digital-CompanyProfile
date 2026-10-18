"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { brand, type Stat } from "@/content/home";
import { MARK_SHAPES } from "@/components/ui/brand-graphics";
import { ScrollFill } from "@/components/page/scroll-fill";
import { TextLink } from "@/components/ui/cta-link";
import { Odometer } from "@/components/motion/odometer";
import { cn } from "@/lib/utils";

const N = 16;

/** A ring of photos, mostly off-screen to the left, that turns with the scroll. */
function PhotoWheel({ images, progress }: { images: string[]; progress: MotionValue<number> }) {
  const [size, setSize] = React.useState({ R: 640, cx: -340, small: false });
  React.useEffect(() => {
    const measure = () => {
      const small = window.innerWidth < 768;
      const R = small ? Math.min(window.innerHeight * 0.62, 420) : Math.min(window.innerHeight * 0.78, 760);
      setSize({ R, cx: (small ? 118 : Math.min(window.innerWidth * 0.2, 300)) - R, small });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const rotate = useTransform(progress, [0, 1], [-20, -190]);
  const enter = useTransform(progress, [0, 0.12], [0, 1]);
  const y = useTransform(enter, (e) => `${(1 - e) * 30}vh`);
  const opacity = useTransform(enter, (e) => e * (size.small ? 0.35 : 1));

  return (
    <motion.div
      aria-hidden
      style={{ x: size.cx - size.R, y, rotate, opacity, width: size.R * 2, height: size.R * 2, marginTop: -size.R }}
      className="absolute left-0 top-1/2"
    >
      {Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-[120px] w-[170px] -translate-x-1/2 -translate-y-1/2 overflow-hidden md:h-[150px] md:w-[220px]"
          style={{ transform: `rotate(${(i * 360) / N}deg) translateX(${size.R}px)` }}
        >
          <Image src={images[i % images.length]} alt="" fill sizes="220px" className="object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

/** One figure; bright while it crosses the middle of the screen. */
function StatRow({ stat }: { stat: Stat }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-45% 0px -45% 0px" });
  return (
    <div ref={ref} className="grid min-h-[46svh] grid-cols-12 content-center gap-5">
      <div className="col-span-12 pl-[30%] md:col-span-7 md:col-start-6 md:pl-0">
        <p className={cn("t-display flex items-baseline text-[clamp(3.4rem,9vw,8.5rem)] transition-colors duration-500", on ? "text-foreground" : "text-dim")}>
          {stat.prefix ? <span className="mr-2 text-[0.35em]">{stat.prefix}</span> : null}
          <Odometer value={stat.value.toFixed(stat.decimals ?? 0)} />
          {stat.suffix ? <span className={cn("text-[0.55em] transition-colors duration-500", on ? "text-signal" : "")}>{stat.suffix}</span> : null}
        </p>
        <p className={cn("mt-2 pl-[clamp(1.5rem,5vw,5.5rem)] text-[clamp(1.375rem,2.6vw,2.375rem)] font-medium leading-tight tracking-[-0.015em] transition-colors duration-500", on ? "text-fg-body" : "text-dim")}>
          {stat.label}
        </p>
        <p className={cn("mt-4 max-w-[26em] pl-[clamp(1.5rem,5vw,5.5rem)] text-[15px] transition-colors duration-500", on ? "text-fg-2" : "text-transparent")}>
          {stat.note}
        </p>
      </div>
    </div>
  );
}

/**
 * Chapter 2: who MIL is. The statement fills in as it is read, while the
 * three shapes the logo is built from (graph, people, scaling; Brand Book
 * 2025) slide together into the MIL mark.
 */
export function Studio() {
  const markRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: markRef, offset: ["start end", "center 0.55"] });
  const graphX = useTransform(scrollYProgress, [0.2, 1], [-30, 0]);
  const scalingX = useTransform(scrollYProgress, [0.2, 1], [30, 0]);
  const peopleY = useTransform(scrollYProgress, [0.2, 1], [-14, 0]);

  return (
    <section className="theme-light sec" aria-label="About MIL Digital">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="t-label">About MIL Digital</p>
          <ScrollFill
            className="t-statement mt-8 max-w-[22ch]"
            text="We're not just an agency. We're your partner in growth, combining strategy and execution so your brand reaches its next milestone."
          />
          <div className="mt-10">
            <TextLink href="/about-mil-digital">About MIL Digital</TextLink>
          </div>
        </div>

        <div ref={markRef} className="lg:col-span-4 lg:col-start-9">
          <svg viewBox="-34 -6 168 84" className="mx-auto w-[min(100%,380px)]" role="img" aria-label="The MIL logomark, built from a graph, people and a scaling line">
            <defs>
              <linearGradient id="about-mark" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#1b3c7f" />
                <stop offset="1" stopColor="#00adee" />
              </linearGradient>
            </defs>
            <g fill="url(#about-mark)">
              <motion.path style={{ x: graphX }} d={MARK_SHAPES.graph} />
              <motion.g style={{ y: peopleY }}>
                <circle {...MARK_SHAPES.peopleDot} />
                <path d={MARK_SHAPES.peopleStem} />
              </motion.g>
              <motion.path style={{ x: scalingX }} d={MARK_SHAPES.scaling} />
            </g>
          </svg>
          <p className="t-label mt-10">
            MIL comes from <span className="text-signal">MIL</span>estone
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-5">
            {brand.logoMeaning.map((m) => (
              <div key={m.title}>
                <dt className="font-display text-lg font-semibold text-heading">{m.title}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-fg-2">{m.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** MIL in numbers, after Why MIL: the photo wheel turns while the figures light up one by one. */
export function StudioNumbers({ stats, wheel }: { stats: Stat[]; wheel: string[] }) {
  const flowRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: flow } = useScroll({ target: flowRef, offset: ["start end", "end end"] });

  return (
    <section className="theme-light" aria-label="MIL in numbers">
      <div ref={flowRef} className="relative">
        {/* A layer as tall as the chapter, with the wheel stuck to the viewport
            inside it, so the wheel can never outlive the chapter. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="sticky top-0 h-svh overflow-hidden">
            <PhotoWheel images={wheel} progress={flow} />
          </div>
        </div>
        <div className="container-x relative pb-[10svh]">
          {/* Certifications sit in Why MIL, right above this chapter. */}
          {stats.map((s) => (
            <StatRow key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
