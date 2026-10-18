"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown } from "lucide-react";
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
 * A floating white bar with rounded corners, inset in the page frame. It
 * drops in on load, tightens into a narrower, shorter island once you
 * scroll, tucks away on the way down and returns on the way up. A soft
 * pill glides behind whichever menu item the pointer is on.
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

  const compact = scrolled && open === null && !mobile;

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
        <div
          className={cn(
            "theme-light mx-auto rounded-[20px] !bg-white/88 shadow-[0_12px_32px_-14px_rgb(14_31_69/0.35)] ring-1 ring-[rgb(27_60_127/0.08)] backdrop-blur-xl transition-[max-width,box-shadow] duration-700 ease-out-expo md:rounded-[24px]",
            compact ? "max-w-[1240px]" : "max-w-[1760px]",
          )}
        >
          <div className={cn("flex items-center gap-6 px-4 transition-[height] duration-700 ease-out-expo md:px-6", compact ? "h-14 md:h-[60px]" : "h-16 md:h-[72px]")}>
            <Link href="/" aria-label="MIL Digital home" className="shrink-0">
              <Logo tone="light" />
            </Link>

            <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
              {nav.map((item, i) => (
                <NavEntry key={item.label} item={item} index={i} open={open} setOpen={setOpen} hover={hover} setHover={setHover} pathname={pathname} />
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-5 lg:ml-0">
              <span aria-hidden className={cn("hidden h-5 w-px bg-line-strong", !compact && "xl:block")} />
              <StudioClock city={site.city} className={cn("hidden items-center gap-2 whitespace-nowrap text-[13px] font-medium text-fg-2", !compact && "xl:inline-flex")} />
              <BriefTrigger size="md" className="hidden sm:inline-flex">
                Book a consultation
              </BriefTrigger>
              <button
                type="button"
                className="inline-grid size-11 place-items-center rounded-full border border-line-strong lg:hidden"
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                onClick={() => setMobile((v) => !v)}
              >
                <span className="relative block h-2.5 w-5">
                  <span className={cn("absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300", mobile && "translate-y-[5px] rotate-45")} />
                  <span className={cn("absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300", mobile && "-translate-y-[4px] -rotate-45")} />
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open !== null && "children" in nav[open] ? (
              <MegaPanel key={open} item={nav[open] as Group} index={open} features={features} />
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>{mobile ? <MobileMenu pathname={pathname} /> : null}</AnimatePresence>
    </>
  );
}

function NavEntry({
  item,
  index,
  open,
  setOpen,
  hover,
  setHover,
  pathname,
}: {
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
  const pill =
    hover === index || open === index ? (
      <motion.span layoutId="nav-pill" aria-hidden className="absolute inset-0 -z-10 rounded-full bg-mil-blue/[0.07]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
    ) : null;
  const dot = current ? <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-mil-sky" /> : null;

  if ("children" in item) {
    const isOpen = open === index;
    return (
      <button
        type="button"
        className={cn(base, "isolate", isOpen && "text-mil-blue")}
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
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }} className="border-t border-line">
      <div className="grid grid-cols-12 gap-8 px-6 py-8">
        <p className="t-label col-span-3 pt-3">{item.label}</p>
        <ul className="col-span-5">
          {item.children.map((link, i) => (
            <motion.li key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}>
              <Link href={link.href} className="group flex items-baseline justify-between gap-6 border-b border-line py-4">
                <span className="t-display text-2xl transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{link.label}</span>
                <span className="text-sm text-fg-2 transition-colors group-hover:text-foreground">{link.description}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
        {feature ? (
          <Link href={`/our-works-case-study/${feature.slug}`} className="group col-span-4 block overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={feature.image} alt="" fill sizes="400px" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="t-label">Featured work</p>
                <p className="mt-1 text-sm font-semibold">{feature.client}</p>
              </div>
              <p className="t-display text-2xl text-signal-soft">{feature.metric.value}</p>
            </div>
          </Link>
        ) : null}
      </div>
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
