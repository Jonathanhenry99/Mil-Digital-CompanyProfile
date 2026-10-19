"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { nav, site, type NavItem } from "@/content/site";
import type { CaseStudy } from "@/content/home";
import { whatsappHref } from "@/lib/whatsapp";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-link";
import { Logo } from "@/components/ui/logo";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { StudioClock } from "./live-details";

const EASE = [0.22, 1, 0.36, 1] as const;
type Group = Extract<NavItem, { children: unknown }>;

/**
 * Three white islands (logo, menu, actions) float over the page (after
 * Winzy). Nothing in the row ever changes size: once you scroll, a white
 * bar fades in behind the islands so they read as one header, and the
 * dropdowns open as a separate card below. The header tucks away on the way
 * down and returns on the way up; a pill glides behind the hovered item.
 */
export function Header({ features }: { features: CaseStudy[] }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState<number | null>(null);
  const [mobile, setMobile] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (y < window.innerHeight * 0.6 || y < prev - 4) setHidden(false);
    else if (y > prev + 6 && open === null) setHidden(true);
  });

  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  React.useEffect(() => {
    const lenis = getLenis();
    if (mobile) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // White islands; their own shadow gives way to the bar's once it is in.
  const joined = scrolled || mobile;
  const island = cn(
    "rounded-full bg-white transition-shadow duration-500",
    joined ? "shadow-none" : "shadow-[0_12px_30px_-12px_rgb(10_23_51/0.5)]",
  );
  const group = open !== null && "children" in nav[open] ? (nav[open] as Group) : null;

  // The dropdown sits under the item it belongs to: centred on it, kept
  // inside the header, with a notch pointing at the item.
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [place, setPlace] = React.useState({ left: 0, notch: 0, width: 880 });
  React.useLayoutEffect(() => {
    if (open === null) return;
    const wrap = wrapRef.current?.getBoundingClientRect();
    const item = itemRefs.current[open]?.getBoundingClientRect();
    if (!wrap || !item) return;
    const width = Math.min(880, wrap.width);
    const centre = item.left + item.width / 2 - wrap.left;
    const left = Math.max(0, Math.min(centre - width / 2, wrap.width - width));
    setPlace({ left, notch: centre - left, width });
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-[calc(var(--frame)+6px)] pt-[calc(var(--frame)+6px)]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !mobile ? -130 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        onMouseLeave={() => {
          setOpen(null);
          setHover(null);
        }}
        onFocus={() => setHidden(false)}
      >
        <div ref={wrapRef} className="theme-light relative mx-auto max-w-[1760px] !bg-transparent">
          {/* The bar that joins the islands once you scroll */}
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[30px] bg-white shadow-[0_14px_36px_-16px_rgb(10_23_51/0.4)] ring-1 ring-[rgb(27_60_127/0.06)]"
            initial={false}
            animate={{ opacity: joined ? 1 : 0, scaleX: joined ? 1 : 0.985 }}
            transition={{ duration: 0.45, ease: EASE }}
          />

          <div className="relative flex h-16 items-center gap-3 px-1.5 md:h-[68px] md:px-2">
            <Link href="/" aria-label="MIL Digital home" className={cn("flex h-12 shrink-0 items-center px-5", island)}>
              <Logo tone="light" />
            </Link>

            <nav
              aria-label="Main"
              className={cn("ml-auto hidden h-12 items-center gap-0.5 p-1 lg:flex", island)}
              onMouseLeave={() => setHover(null)}
            >
              {nav.map((item, i) => (
                <NavEntry
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  item={item}
                  index={i}
                  open={open}
                  setOpen={setOpen}
                  hover={hover}
                  setHover={setHover}
                  pathname={pathname}
                />
              ))}
            </nav>

            <div className={cn("ml-auto flex h-12 items-center gap-4 p-1 lg:ml-0 2xl:pl-5", island)}>
              <StudioClock city={site.city} className="hidden items-center gap-2 whitespace-nowrap text-[13px] font-medium text-fg-2 2xl:inline-flex" />
              <BriefTrigger size="md" className="hidden h-10 sm:inline-flex">
                Book a consultation
              </BriefTrigger>
              <button
                type="button"
                className="inline-grid size-10 place-items-center rounded-full bg-mil-blue/[0.06] text-mil-blue lg:hidden"
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                onClick={() => setMobile((v) => !v)}
              >
                <span className="relative block h-2.5 w-5">
                  <span className={cn("absolute inset-x-0 top-0 h-[1.5px] bg-current transition-transform duration-300", mobile && "translate-y-[4.5px] rotate-45")} />
                  <span className={cn("absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition-transform duration-300", mobile && "-translate-y-[4.5px] -rotate-45")} />
                </span>
              </button>
            </div>
          </div>

          {/* Dropdown: its own card under the menu, so the row never moves */}
          <AnimatePresence>
            {group && open !== null ? (
              <motion.div
                key="mega"
                className="absolute top-full pt-3"
                style={{ width: place.width, transformOrigin: `${place.notch}px 0` }}
                initial={{ opacity: 0, y: -8, scale: 0.97, left: place.left }}
                animate={{ opacity: 1, y: 0, scale: 1, left: place.left }}
                exit={{ opacity: 0, y: -6, scale: 0.985, transition: { duration: 0.18 } }}
                transition={{ duration: 0.32, ease: EASE, left: { type: "spring", stiffness: 380, damping: 34 } }}
              >
                <motion.span
                  aria-hidden
                  className="absolute top-[7px] size-3 -translate-x-1/2 rotate-45 rounded-[3px] bg-white"
                  initial={false}
                  animate={{ left: place.notch }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
                <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-24px_rgb(10_23_51/0.45)] ring-1 ring-[rgb(27_60_127/0.06)]">
                  <AnimatePresence mode="wait" initial={false}>
                    <MegaPanel key={open} item={group} index={open} features={features} />
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>{mobile ? <MobileMenu pathname={pathname} /> : null}</AnimatePresence>
    </>
  );
}

function NavEntry({
  ref,
  item,
  index,
  open,
  setOpen,
  hover,
  setHover,
  pathname,
}: {
  ref: React.Ref<HTMLElement>;
  item: NavItem;
  index: number;
  open: number | null;
  setOpen: (i: number | null) => void;
  hover: number | null;
  setHover: (i: number | null) => void;
  pathname: string;
}) {
  const current = "children" in item ? item.children.some((c) => pathname.startsWith(c.href)) : pathname === item.href;
  const base = cn(
    "relative inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-4 text-[15px] font-medium transition-colors",
    current ? "text-mil-blue" : "text-fg hover:text-mil-blue",
  );
  // One pill, shared by every item, slides to the one under the pointer.
  const isOpen = open === index;
  const pill =
    hover === index || isOpen ? (
      <motion.span
        layoutId="nav-pill"
        aria-hidden
        className={cn("absolute inset-0 -z-10 rounded-full transition-colors duration-300", isOpen ? "bg-mil-blue" : "bg-mil-blue/[0.1]")}
        transition={{ type: "spring", stiffness: 420, damping: 36 }}
      />
    ) : null;
  const dot = current && !isOpen ? <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-mil-sky" /> : null;

  if ("children" in item) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cn(base, "isolate", isOpen && "text-white hover:text-white")}
        aria-expanded={isOpen}
        onMouseEnter={() => {
          setOpen(index);
          setHover(index);
        }}
        onClick={() => setOpen(isOpen ? null : index)}
      >
        {pill}
        {item.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
        {dot}
      </button>
    );
  }

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={item.href}
      className={cn(base, "isolate")}
      onMouseEnter={() => {
        setOpen(null);
        setHover(index);
      }}
    >
      {pill}
      {item.label}
      {item.badge ? (
        <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-warm/20 px-2 py-px text-[10px] font-semibold uppercase tracking-wider text-[#a3610a]">
          <span className="size-1 animate-pulse rounded-full bg-warm" />
          {item.badge}
        </span>
      ) : null}
      {dot}
    </Link>
  );
}

function MegaPanel({ item, index, features }: { item: Group; index: number; features: CaseStudy[] }) {
  const feature = features[index % Math.max(features.length, 1)];
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="grid grid-cols-[1fr_300px] gap-5 p-3"
    >
      <div className="px-2 pb-2 pt-4">
        <p className="t-label px-3">{item.label}</p>
        <ul className="mt-3">
          {item.children.map((link, i) => (
            <motion.li key={link.href} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE, delay: 0.04 * i }}>
              <Link href={link.href} className="group flex items-center justify-between gap-6 rounded-2xl px-4 py-3.5 transition-colors hover:bg-mil-blue/[0.06]">
                <span className="min-w-0">
                  <span className="t-display block whitespace-nowrap text-[1.6rem] leading-tight">{link.label}</span>
                  <span className="mt-1 block text-sm text-fg-2 transition-colors group-hover:text-foreground">{link.description}</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mil-blue/[0.06] text-mil-blue transition-all duration-500 ease-out-expo group-hover:bg-mil-blue group-hover:text-white">
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
      {feature ? (
        <Link href={`/our-works-case-study/${feature.slug}`} className="group block overflow-hidden rounded-[20px] bg-surface-raised">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={feature.image} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-mil-blue">Featured work</span>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <p className="text-sm font-semibold">{feature.client}</p>
            <p className="t-display text-xl text-signal-soft">{feature.metric.value}</p>
          </div>
        </Link>
      ) : null}
    </motion.div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const links = nav.flatMap((item) => ("children" in item ? item.children : [item]));
  return (
    <motion.div
      className="fixed inset-[var(--frame)] z-40 flex flex-col overflow-hidden rounded-[var(--card-radius)] bg-[#0e1f45] pt-24 lg:hidden"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <nav aria-label="Mobile" data-lenis-prevent className="container-x flex-1 overflow-y-auto">
        <ul>
          {links.map((link, i) => (
            <motion.li key={link.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.035 }}>
              <Link href={link.href} className="t-display block py-2 text-[clamp(2.1rem,9vw,3.2rem)]">
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="container-x grid grid-cols-2 gap-2 border-t border-line py-4">
        <BriefTrigger className="w-full">Brief us</BriefTrigger>
        <CtaLink href={whatsappHref(pathname)} variant="ghost" className="w-full">
          WhatsApp
        </CtaLink>
      </div>
    </motion.div>
  );
}
