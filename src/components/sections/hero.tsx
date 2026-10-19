"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { HomeData } from "@/lib/cms";
import type { CaseStudy, Client } from "@/content/home";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { TextLink } from "@/components/ui/cta-link";
import { MARK_SHAPES } from "@/components/ui/brand-graphics";
import { cn } from "@/lib/utils";

/**
 * Chapter 1. The MIL studio scene, with the last word of the headline set
 * huge *between* the scene and a cut-out of its people, so the team stands
 * in front of it (after Winzy's "EGYPT" behind the pyramids). Around it: client logos and the brief CTA (bottom left), a
 * case study slideshow (bottom right) and a turning "scroll" badge.
 * The photo leans with the cursor; on scroll the word sinks slower than
 * the photo, which keeps the depth. When the journey film is uploaded it
 * fades in over the photo after load and the cut-out steps aside.
 */
export function Hero({
  hero,
  video,
  clients,
  cases,
}: {
  hero: HomeData["hero"];
  video: string | null;
  clients: Client[];
  cases: CaseStudy[];
}) {
  const ref = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = React.useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const photoX = useTransform(sx, (v) => v * 14);
  const photoY = useTransform(() => sy.get() * 8 + scrollYProgress.get() * 120);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const wordX = useTransform(sx, (v) => v * 6);
  const wordY = useTransform(() => sy.get() * 4 + scrollYProgress.get() * 60);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

  // "Turning brand noise into measurable growth." → lead + "growth"
  const flat = hero.title.replace(/\s*\n\s*/g, " ").trim();
  const cut = flat.lastIndexOf(" ");
  const lead = cut > 0 ? flat.slice(0, cut) : "";
  const word = (cut > 0 ? flat.slice(cut + 1) : flat).replace(/[.,!?;:]+$/, "");
  const focal = hero.background?.focal ?? "50% 50%";
  const showCutout = Boolean(hero.foreground) && !videoReady;

  return (
    <section ref={ref} data-ground="#0e1f45" className="grain relative h-[calc(100svh-var(--frame)*2)] min-h-[660px] overflow-hidden" aria-label="Introduction">
      <h1 className="sr-only">{flat}</h1>

      {/* 1. The scene (or the film, once it plays) */}
      <div className="hero-photo-in absolute inset-0">
        <motion.div style={{ x: photoX, y: photoY, scale: photoScale }} className="absolute -inset-[4%] will-change-transform">
          {hero.background ? (
            <Image
              src={hero.background.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className={cn("object-cover transition-[filter] duration-700", showCutout && "hero-dof")}
              style={{ objectPosition: focal }}
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
      {/* A navy veil over the softened scene, deepest top-left where the copy sits */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgb(10 23 51 / .82) 0%, rgb(10 23 51 / .55) 42%, rgb(14 31 69 / .25) 75%), linear-gradient(180deg, rgb(10 23 51 / .6) 0%, rgb(10 23 51 / 0) 40%)",
        }}
      />

      {/* 2. Tag, lead and the big word, behind the people */}
      <div aria-hidden className="container-x relative flex flex-col items-start pt-[var(--header-space)] text-left">
        <p className="fade-in-load inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-md sm:text-[11px] sm:tracking-[0.16em]" style={{ "--d": "100ms" } as React.CSSProperties}>
          <span className="size-1.5 rounded-full bg-mil-sky" />
          {hero.eyebrow}
        </p>
        {lead ? (
          <p className="fade-in-load mt-5 max-w-[22ch] font-display text-[clamp(1.4rem,2.5vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white" style={{ "--d": "250ms" } as React.CSSProperties}>
            {lead}
          </p>
        ) : null}
      </div>
      <motion.p
        aria-hidden
        style={{ x: wordX, y: wordY }}
        
        className="hero-word container-x pointer-events-none absolute inset-x-0 top-[calc(var(--header-space)+10rem)] select-none whitespace-nowrap text-left font-display font-bold uppercase leading-[0.8] tracking-[-0.045em] sm:top-[calc(var(--header-space)+clamp(7rem,10vw,10.5rem))]"
      >
        {word.split("").map((ch, i) => (
          <span key={i} className="hero-letter" style={{ "--i": i } as React.CSSProperties}>
            {ch}
          </span>
        ))}
      </motion.p>

      {/* 3. The people, cut from the same scene, in front of the word */}
      {hero.foreground ? (
        <div aria-hidden className="hero-photo-in pointer-events-none absolute inset-0 transition-opacity duration-700" style={{ opacity: showCutout ? 1 : 0 }}>
          <motion.div style={{ x: photoX, y: photoY, scale: photoScale }} className="absolute -inset-[4%]">
            <Image src={hero.foreground} alt="" fill priority sizes="100vw" className="object-cover brightness-[.9] saturate-[.95]" style={{ objectPosition: focal }} />
          </motion.div>
        </div>
      ) : null}
      {/* Settle the people into the dark room and ground the copy */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(0deg,#0e1f45_0%,rgb(14_31_69/.82)_32%,rgb(14_31_69/0)_100%)]" />

      {/* 4. Copy and actions */}
      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="container-x absolute inset-x-0 bottom-0 grid items-end gap-8 pb-[clamp(24px,4vw,48px)] lg:grid-cols-[1fr_auto_1fr]">
        <div className="fade-in-load grid max-w-[34rem] justify-items-start gap-5" style={{ "--d": "650ms" } as React.CSSProperties}>
          <ClientStack clients={clients} />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <BriefTrigger split variant="white">
              Book a free consultation
            </BriefTrigger>
            <TextLink href="#work" className="text-white">
              See our work
            </TextLink>
          </div>
          <p className="max-w-[30em] text-[15px] leading-relaxed text-fg-body max-md:hidden">{hero.body}</p>
        </div>

        <ScrollBadge />

        {cases.length ? <CaseTicker cases={cases} /> : <span />}
      </motion.div>
    </section>
  );
}

/** Overlapping round client logos with the brand count (from ShipX's "10K+ users"). */
function ClientStack({ clients }: { clients: Client[] }) {
  return (
    <div className="flex items-center gap-4">
      <ul className="flex -space-x-3">
        {clients.slice(0, 5).map((c) => (
          <li key={c.logo} className="grid size-11 place-items-center overflow-hidden rounded-full border-2 border-[#0e1f45] bg-[#1b3c7f] p-2">
            <Image src={c.logo} alt={c.name} width={80} height={40} className="max-h-5 w-auto object-contain" />
          </li>
        ))}
      </ul>
      <p className="text-[13px] leading-snug text-white/75">
        <span className="block font-display text-lg font-semibold text-white">150+ brands</span>
        grown with MIL across Indonesia
      </p>
    </div>
  );
}

/** A turning ring of text around the MIL mark; jumps to the next chapter. */
function ScrollBadge() {
  const text = "Scroll to explore · MIL Digital · ";
  return (
    <a
      href="#about"
      onClick={(e) => {
        e.preventDefault();
        const next = (e.currentTarget.closest("section")?.nextElementSibling as HTMLElement | null) ?? null;
        next?.scrollIntoView({ behavior: "smooth" });
      }}
      aria-label="Scroll to the next section"
      className="group relative mx-auto hidden size-[124px] place-items-center rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md xl:grid"
    >
      <svg viewBox="0 0 124 124" className="hero-badge absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="badge-ring" d="M62 62m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
        </defs>
        <text className="fill-white/85 text-[10.5px] font-semibold uppercase tracking-[0.24em]">
          <textPath href="#badge-ring">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="-4 -6 108 84" className="w-9 transition-transform duration-500 ease-out-expo group-hover:scale-110" aria-hidden>
        <g fill="#fff">
          <path d={MARK_SHAPES.graph} />
          <circle {...MARK_SHAPES.peopleDot} />
          <path d={MARK_SHAPES.peopleStem} />
          <path d={MARK_SHAPES.scaling} />
        </g>
      </svg>
    </a>
  );
}

/** Featured case studies, one at a time, with a 01/06 counter (from Winzy's slideshow card). */
function CaseTicker({ cases }: { cases: CaseStudy[] }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const list = cases.slice(0, 6);
  React.useEffect(() => {
    if (paused || list.length < 2) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % list.length), 4500);
    return () => window.clearTimeout(t);
  }, [i, paused, list.length]);
  const c = list[i];

  return (
    <div
      className="fade-in-load hidden w-[260px] justify-self-end lg:block xl:w-[300px]"
      style={{ "--d": "850ms" } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href={`/our-works-case-study/${c.slug}`} className="group block rounded-[22px] border border-white/15 bg-white/[0.08] p-2 backdrop-blur-xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[16px]">
          <AnimatePresence initial={false}>
            <motion.div key={c.slug} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
              <Image src={c.image} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">{c.metric.value}</span>
        </div>
        <div className="flex items-center gap-3 px-2 pb-1 pt-3 text-[12px] tabular-nums text-white/75">
          <span>
            {String(i + 1).padStart(2, "0")}/{String(list.length).padStart(2, "0")}
          </span>
          <span className="ml-auto flex gap-1">
            {list.map((item, k) => (
              <span key={item.slug} className="relative h-[3px] w-5 overflow-hidden rounded-full bg-white/25">
                {k === i ? <span key={`${i}-${paused}`} className={paused ? "absolute inset-0 bg-white" : "hero-tick absolute inset-0 origin-left bg-white"} /> : null}
                {k < i ? <span className="absolute inset-0 bg-white/70" /> : null}
              </span>
            ))}
          </span>
        </div>
      </Link>
      <div className="mt-3 flex items-baseline justify-between gap-4 px-1">
        <p className="font-display text-lg font-semibold text-white">{c.client}</p>
        <p className="line-clamp-1 text-right text-[12px] text-white/70">{c.metric.label}</p>
      </div>
    </div>
  );
}
