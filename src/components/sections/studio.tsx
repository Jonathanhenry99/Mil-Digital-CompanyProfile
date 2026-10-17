"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { certifications, type Stat } from "@/content/home";
import { TextLink } from "@/components/ui/cta-link";
import { Odometer } from "@/components/motion/odometer";
import { SplitText } from "@/components/motion/split-text";
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
    <div ref={ref} className="grid min-h-[62svh] grid-cols-12 content-center gap-5">
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
 * Chapter 2 (inventory: stats + who MIL is). A statement over the team at
 * work, then the photo wheel turns while MIL's figures light up one by one.
 */
export function Studio({ stats, wheel, photo }: { stats: Stat[]; wheel: string[]; photo: string }) {
  const introRef = React.useRef<HTMLDivElement>(null);
  const flowRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: intro } = useScroll({ target: introRef, offset: ["start end", "end start"] });
  const photoY = useTransform(intro, [0, 1], ["-8%", "8%"]);
  const { scrollYProgress: flow } = useScroll({ target: flowRef, offset: ["start end", "end end"] });

  return (
    <>
    <section data-ground="#0c0d0f" aria-label="About MIL Digital">
      <div ref={introRef} className="grain relative flex min-h-svh items-center overflow-hidden">
        <motion.div style={{ y: photoY }} className="absolute -inset-y-[10%] inset-x-0">
          <Image src={photo} alt="" fill sizes="100vw" className="object-cover brightness-[.42] saturate-[.85]" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,#0c0d0f_0%,rgb(12_13_15/0)_40%,rgb(12_13_15/0)_70%,#0c0d0f_100%)]" />
        <div className="container-x relative py-[18svh]">
          <p className="t-label mb-8">About MIL Digital</p>
          <SplitText
            as="p"
            text={"Certified marketers, strategists and creators.\nOne table, from the first audit to the next milestone."}
            className="t-statement max-w-[24ch]"
          />
          <div className="mt-10">
            <TextLink href="/about-mil-digital">About MIL Digital</TextLink>
          </div>
        </div>
      </div>

    </section>

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
          {stats.map((s) => (
            <StatRow key={s.label} stat={s} />
          ))}
          <div className="grid grid-cols-12 gap-5">
            <ul className="col-span-12 flex flex-wrap gap-3 md:col-span-7 md:col-start-6">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-center gap-3 border border-line py-2 pl-2 pr-4">
                  <Image src={c.image} alt="" width={36} height={36} className="size-9" />
                  <span className="text-[13px] text-fg-2">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
