"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { CtaLink } from "@/components/ui/cta-link";
import { Crosshairs } from "@/components/ui/eyebrow";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { SignalField } from "./signal-field";

/**
 * Pinned for an extra 70% of the viewport. While pinned, the noise behind
 * the headline assembles into a rising chart, then the copy lifts away.
 * The headline and copy animate with CSS so they play before hydration.
 */
export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const copyY = useTransform(scrollYProgress, [0.7, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const hudValue = useTransform(scrollYProgress, (p) => `+${Math.round(Math.min(1, p / 0.7) * 212)}%`);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // The photo settles in as you scroll and steps back while the chart forms.
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0.15, 0.6], [1, 0.3]);

  return (
    <section ref={ref} className="relative h-[170svh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh min-h-[640px] overflow-hidden">
        {/* Background photo (CMS-editable) with fades so the copy always reads */}
        <div aria-hidden className="hero-photo-in pointer-events-none absolute inset-0">
          <motion.div style={{ scale: photoScale, opacity: photoOpacity }} className="absolute inset-0">
            <Image
              src={hero.background.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: hero.background.focal }}
            />
          </motion.div>
          {/* Brand tint, then fades: under the headline, under the header, into the next section */}
          <div className="absolute inset-0 bg-[#0b6bcb] opacity-20 mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30 md:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-background from-25% via-background/80 via-50% to-background/5 md:block" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_40%,transparent_40%,var(--background)_100%)]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
          <span className="aurora -right-[10%] -top-[20%] size-[60vw] max-w-[900px] bg-[#7cc8ff]" />
          <span className="aurora -left-[15%] top-[30%] size-[45vw] max-w-[700px] bg-[#c9e6ff] [animation-delay:-6s]" />
          <span className="aurora bottom-[-30%] right-[20%] size-[40vw] max-w-[640px] bg-[#9ad8f5] opacity-40 [animation-delay:-12s]" />
        </div>
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <SignalField progress={scrollYProgress} className="absolute inset-0 size-full" />
        <Crosshairs />

        {/* Reading of the chart once it has formed */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute left-[52%] top-[11%] hidden font-mono md:block"
          aria-hidden
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Growth index · 12 mo</p>
          <motion.p className="mt-1 text-3xl text-signal">{hudValue}</motion.p>
        </motion.div>

        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="container-x relative flex h-full flex-col justify-end pb-12 pt-28 md:pb-16"
        >
          <p className="eyebrow fade-in-load mb-6 flex items-center gap-2.5" style={{ "--d": "100ms" } as React.CSSProperties}>
            <span className="size-1.5 rounded-full bg-signal shadow-[0_0_12px_var(--signal)]" />
            {hero.eyebrow}
          </p>
          <SplitText
            as="h1"
            mode="load"
            delay={200}
            text={hero.title}
            className="max-w-[16ch] text-[clamp(2.9rem,8.2vw,8.25rem)] font-medium leading-[0.92] tracking-[-0.045em] [&_.split-line:last-child]:text-signal"
          />
          <div
            className="fade-in-load mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            style={{ "--d": "700ms" } as React.CSSProperties}
          >
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{hero.body}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <CtaLink href={site.bookingHref} size="lg">
                  Book a Consultation
                </CtaLink>
              </Magnetic>
              <CtaLink href={site.quizHref} size="lg" variant="ghost">
                Find your service
              </CtaLink>
            </div>
          </div>

          <motion.div
            style={{ opacity: cueOpacity }}
            className="mt-12 hidden items-center justify-between border-t border-line pt-5 md:flex"
          >
            <span className="eyebrow flex items-center gap-3">
              <span className="relative h-8 w-px overflow-hidden bg-line-strong">
                <span className="absolute inset-0 bg-foreground [animation:scroll-cue_1.8s_var(--ease-out-expo)_infinite]" />
              </span>
              Scroll to find the signal
            </span>
            <span className="eyebrow">Consulting · Advertising · Creative</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
