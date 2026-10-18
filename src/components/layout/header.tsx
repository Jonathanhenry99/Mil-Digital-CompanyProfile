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
 * Transparent over the hero, dark glass once scrolled; tucks away on the
 * way down and returns on the way up. Studio clock + Brief CTA on the right.
 */
export function Header({ features }: { features: CaseStudy[] }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState<number | null>(null);
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

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !mobile ? -110 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseLeave={() => setOpen(null)}
        onFocus={() => setHidden(false)}
      >
        {/* Over the hero a soft dark fade keeps the nav readable on bright photos. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/25 to-transparent transition-opacity duration-500",
            scrolled || open !== null ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          className={cn(
            "relative border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || open !== null ? "border-line bg-[#0e1f45]/85 backdrop-blur-xl" : "border-transparent",
          )}
        >
          <div className="container-x flex h-16 items-center gap-6 md:h-20">
            <Link href="/" aria-label="MIL Digital home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Main" className="ml-auto hidden items-center gap-8 lg:flex">
              {nav.map((item, i) => (
                <NavEntry key={item.label} item={item} index={i} open={open} setOpen={setOpen} pathname={pathname} />
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-6 lg:ml-0">
              <span aria-hidden className="hidden h-5 w-px bg-white/25 xl:block" />
              <StudioClock city={site.city} className="hidden items-center gap-2 text-[13px] font-medium text-white/80 xl:inline-flex" />
              <BriefTrigger size="md" className="hidden sm:inline-flex">
                Book a consultation
              </BriefTrigger>
              <button
                type="button"
                className="inline-grid size-11 place-items-center border border-line-strong lg:hidden"
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
  pathname,
}: {
  item: NavItem;
  index: number;
  open: number | null;
  setOpen: (i: number | null) => void;
  pathname: string;
}) {
  const base = "group relative inline-flex h-10 items-center gap-1 text-[15px] font-medium text-white transition-colors hover:text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]";
  const underline = (on: boolean) => (
    <span className={cn("absolute inset-x-0 bottom-1.5 h-px origin-left bg-foreground transition-transform duration-500 ease-out-expo", on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
  );

  if ("children" in item) {
    const isOpen = open === index;
    const current = item.children.some((c) => pathname.startsWith(c.href));
    return (
      <button type="button" className={cn(base, isOpen && "text-foreground")} aria-expanded={isOpen} onMouseEnter={() => setOpen(index)} onClick={() => setOpen(isOpen ? null : index)}>
        {item.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
        {underline(current)}
      </button>
    );
  }

  return (
    <Link href={item.href} className={base} onMouseEnter={() => setOpen(null)}>
      {item.label}
      {item.badge ? (
        <span className="ml-1.5 inline-flex items-center gap-1 border border-warm/50 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-warm">
          <span className="size-1 animate-pulse bg-warm" />
          {item.badge}
        </span>
      ) : null}
      {underline(pathname === item.href)}
    </Link>
  );
}

function MegaPanel({ item, index, features }: { item: Group; index: number; features: CaseStudy[] }) {
  const feature = features[index % Math.max(features.length, 1)];
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }} className="border-t border-line">
      <div className="container-x grid grid-cols-12 gap-8 py-8">
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
          <Link href={`/our-works-case-study/${feature.slug}`} className="group ticks col-span-4 block border border-line bg-surface">
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
      className="fixed inset-0 z-40 flex flex-col bg-[#0e1f45] pt-20 lg:hidden"
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
