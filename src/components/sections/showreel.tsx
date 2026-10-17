"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";
import type { HomeData } from "@/lib/cms";
import { SplitText } from "@/components/motion/split-text";

/**
 * The MIL journey film. Welcoming: a small framed card that opens out to
 * fill the screen as you scroll, then steps through the milestones from
 * day one to today. Until the film exists the poster stands in.
 */
export function Showreel({ showreel }: { showreel: HomeData["showreel"] }) {
  const { milestones } = showreel;
  const ref = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [28, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  const [step, setStep] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const t = Math.min(1, Math.max(0, (p - 0.45) / 0.5));
    setStep(Math.min(milestones.length - 1, Math.floor(t * milestones.length)));
  });

  // Only play the film while it is on screen.
  const inView = useInView(ref, { amount: 0.2 });
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <section ref={ref} className="theme-deep relative h-[320svh] bg-background" aria-label="Our journey">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 top-[7%] z-10 text-center">
          <p className="eyebrow mb-4">06 — {showreel.caption}</p>
          <SplitText
            as="h2"
            text={showreel.title}
            className="px-4 text-[clamp(1.75rem,4vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.04em]"
          />
        </motion.div>

        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-svh w-full overflow-hidden bg-surface will-change-transform"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            {showreel.video ? (
              <video
                ref={videoRef}
                src={showreel.video}
                poster={showreel.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
            ) : (
              <Image src={showreel.poster} alt="" fill sizes="100vw" className="object-cover" />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />

          {showreel.video ? null : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/30 py-2 pl-2 pr-5 text-sm backdrop-blur-md">
                <span className="flex size-9 items-center justify-center rounded-full bg-white text-[#0b2a5b]">
                  <Play className="size-4 translate-x-px fill-current" />
                </span>
                Journey film · coming soon
              </span>
            </div>
          )}

          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-x-0 bottom-0">
            <div className="container-x flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
              <div className="min-h-[9rem]">
                <motion.p
                  key={milestones[step].year}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-[clamp(4rem,10vw,9rem)] leading-none tracking-tight"
                >
                  {milestones[step].year}
                </motion.p>
                <motion.p
                  key={milestones[step].label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 text-lg text-foreground/80"
                >
                  {milestones[step].label}
                </motion.p>
              </div>
              <ol className="flex gap-2" aria-label="Milestones">
                {milestones.map((m, i) => (
                  <li key={m.year} className="w-14 md:w-20">
                    <span className="block h-0.5 overflow-hidden bg-white/20">
                      <span
                        className="block h-full origin-left bg-foreground transition-transform duration-500"
                        style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                      />
                    </span>
                    <span className="mt-2 block font-mono text-[10px] text-foreground/60">{m.year}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
