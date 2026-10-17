"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ceo } from "@/content/site";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-link";
import { SplitText } from "@/components/motion/split-text";

/** People and functions; each sets the photo and caption in the frame. */
const PEOPLE = [
  { name: ceo.name, role: ceo.role, photo: ceo.photo, focal: "50% 20%", caption: "Founder of MIL Digital and senior digital marketing consultant." },
  { name: "Strategy & consulting", role: "Audits, roadmaps, KPIs", photo: "/photos/mil-team-working.jpg", focal: "30% 40%", caption: "Assessment and growth strategy, from first audit to monthly review." },
  { name: "Performance & media", role: "Meta certified buyers", photo: "/photos/mil-team-working.jpg", focal: "72% 35%", caption: "Full-funnel campaigns across platforms, measured every week." },
  { name: "Creative & content", role: "Content, social, branding", photo: "/photos/mil-team-group.jpg", focal: "28% 50%", caption: "Content and brand work that people stop for." },
  { name: "The whole team", role: "15 certified experts", photo: "/photos/mil-team-group.jpg", focal: "50% 45%", caption: "One team in Bandung, working for brands across Indonesia." },
];

function Person({ p, i, active, onPick }: { p: (typeof PEOPLE)[number]; i: number; active: boolean; onPick: (i: number, fromScroll?: boolean) => void }) {
  const ref = React.useRef<HTMLLIElement>(null);
  const centred = useInView(ref, { margin: "-42% 0px -52% 0px" });
  React.useEffect(() => {
    if (centred) onPick(i, true);
  }, [centred, i, onPick]);
  return (
    <li
      ref={ref}
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType === "mouse" && onPick(i)}
      onFocus={() => onPick(i)}
      onClick={() => onPick(i)}
      className="group relative grid min-h-[68px] cursor-default grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-4 outline-none"
    >
      <span aria-hidden className={cn("absolute left-0 top-1/2 -mt-[3px] size-1.5 bg-foreground transition-[opacity,transform] duration-300", active ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
      <span className={cn("text-[clamp(1rem,1.3vw,1.125rem)] font-semibold tracking-tight transition-[transform,color] duration-500 ease-out-expo", active ? "translate-x-[18px] text-foreground" : "text-fg-2")}>
        {p.name}
      </span>
      <span className={cn("text-right text-[13px] transition-colors", active ? "text-fg-2" : "text-fg-3")}>{p.role}</span>
      <span aria-hidden className={cn("absolute inset-x-0 -bottom-px h-px origin-left bg-foreground transition-transform duration-700 ease-out-expo", active ? "scale-x-100" : "scale-x-0")} />
    </li>
  );
}

/**
 * Chapter 8 (inventory: team). One frame, many photos: hovering, focusing
 * or scrolling past a name swaps the photo and caption. Links to Our Team
 * and Career.
 */
export function Team() {
  const [active, setActive] = React.useState(0);
  const held = React.useRef(0);
  const pick = React.useCallback((i: number, fromScroll?: boolean) => {
    // A hover or click holds for a moment before scrolling can take over again.
    if (fromScroll && performance.now() - held.current < 1200) return;
    if (!fromScroll) held.current = performance.now();
    setActive(i);
  }, []);
  const p = PEOPLE[active];

  return (
    <section data-ground="#101216" className="sec" aria-label="Our team">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="ticks relative aspect-[4/5] overflow-hidden bg-surface">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={p.photo} alt={p.name} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" style={{ objectPosition: p.focal }} />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="t-label mt-4 min-h-[2.8em]" aria-live="polite">
            {p.caption}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="t-label">The team</p>
          <SplitText as="h2" text={"The people behind\nthe numbers."} className="t-h2 mt-4" />
          <p className="t-body mt-6 text-fg-2">
            15 certified digital marketing experts with 7 years of combined experience, growing brands across Indonesia from
            Bandung.
          </p>
          <ul className="mt-10 border-t border-line">
            {PEOPLE.map((person, i) => (
              <Person key={person.name} p={person} i={i} active={i === active} onPick={pick} />
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink href="/our-team" variant="ghost">
              Meet the team
            </CtaLink>
            <CtaLink href="/career" variant="ghost">
              Join us
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
