"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { HomeData } from "@/lib/cms";
import { CtaLink } from "@/components/ui/cta-link";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { SplitText } from "@/components/motion/split-text";

/**
 * Chapter 1. The real team, full bleed. The photo leans with the cursor
 * and sinks as you scroll; the copy lifts away. When the journey film is
 * uploaded in the CMS it fades in over the photo after the page has
 * loaded, so it never competes with first paint.
 */
export function Hero({ hero, video }: { hero: HomeData["hero"]; video: string | null }) {
  const ref = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = React.useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const photoX = useTransform(sx, (v) => v * 16);
  const photoY = useTransform(() => sy.get() * 10 + scrollYProgress.get() * 140);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  React.useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Start the film only after load, and never on data-saver or reduced motion.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !video) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      v.src = video;
      v.load();
      v.addEventListener("canplaythrough", () => v.play().then(() => setVideoReady(true)).catch(() => {}), { once: true });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [video]);

  return (
    <section ref={ref} data-ground="#0e1f45" className="grain relative h-[calc(100svh-var(--frame)*2)] min-h-[660px] overflow-hidden" aria-label="Introduction">
      <div className="hero-photo-in absolute inset-0">
        <motion.div style={{ x: photoX, y: photoY, scale: photoScale }} className="absolute -inset-[4%] will-change-transform">
          {hero.background ? (
            <Image
              src={hero.background.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: hero.background.focal }}
            />
          ) : null}
          {video ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 size-full object-cover transition-opacity duration-[1200ms]"
              style={{ opacity: videoReady ? 1 : 0 }}
            />
          ) : null}
        </motion.div>
      </div>

      {/* Scrims: under the nav, a deep fade into the next chapter, and behind the copy */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(10 23 51 / .6) 0%, rgb(10 23 51 / 0) 22%), linear-gradient(0deg, #0e1f45 0%, rgb(14 31 69 / .82) 18%, rgb(14 31 69 / .35) 45%, rgb(14 31 69 / 0) 65%), linear-gradient(90deg, rgb(14 31 69 / .55) 0%, rgb(14 31 69 / 0) 55%)",
        }}
      />

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="container-x relative flex h-full flex-col justify-end pb-[clamp(28px,5vw,56px)] pt-28">
        <p className="fade-in-load t-label mb-6 flex items-center gap-2.5 text-foreground/80" style={{ "--d": "150ms" } as React.CSSProperties}>
          <span className="size-1.5 bg-signal" />
          {hero.eyebrow}
        </p>
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <SplitText as="h1" mode="load" delay={250} text={hero.title} className="t-display text-[clamp(3rem,7.4vw,7.6rem)]" />
          <div className="fade-in-load grid justify-items-start gap-6 pb-1.5" style={{ "--d": "650ms" } as React.CSSProperties}>
            <p className="max-w-[30em] text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-fg-body">{hero.body}</p>
            <div className="flex flex-wrap gap-3">
              <BriefTrigger>Book a free consultation</BriefTrigger>
              <CtaLink href="#work" variant="ghost">
                See our work
              </CtaLink>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
