"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site, type NavItem } from "@/content/site";
import type { CaseStudy } from "@/content/home";
import { whatsappHref } from "@/lib/whatsapp";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-link";
import { Logo } from "@/components/ui/logo";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Transparent over the hero, glass bar once scrolled, tucks away while
 * scrolling down and returns on the way up (PROJECT_SPEC §2).
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
    setScrolled(y > 80);
    setHidden(y > 240 && y > prev && open === null);
  });

  // Close menus on navigation (state reset during render, not in an effect).
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Lock the page while the mobile menu is open.
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
        animate={{ y: hidden && !mobile ? -120 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseLeave={() => setOpen(null)}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || open !== null
              ? "border-line bg-background/70 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
            <Link href="/" aria-label="MIL Digital home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {nav.map((item, i) => (
                <NavEntry key={item.label} item={item} index={i} open={open} setOpen={setOpen} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <CtaLink href={site.bookingHref} className="hidden sm:inline-flex">
                Book a Consultation
              </CtaLink>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                onClick={() => setMobile((v) => !v)}
              >
                {mobile ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open !== null && "children" in nav[open] ? (
              <MegaPanel key={open} item={nav[open] as Extract<NavItem, { children: unknown }>} index={open} features={features} />
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
}: {
  item: NavItem;
  index: number;
  open: number | null;
  setOpen: (i: number | null) => void;
}) {
  const base =
    "relative inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-signal";

  if ("children" in item) {
    const isOpen = open === index;
    return (
      <button
        type="button"
        className={cn(base, isOpen && "text-foreground")}
        aria-expanded={isOpen}
        onMouseEnter={() => setOpen(index)}
        onClick={() => setOpen(isOpen ? null : index)}
      >
        {item.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
    );
  }

  return (
    <Link href={item.href} className={base} onMouseEnter={() => setOpen(null)}>
      {item.label}
      {item.badge ? (
        <span className="relative ml-1 inline-flex items-center gap-1 rounded-full border border-aqua/30 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-aqua">
          <span className="size-1 animate-pulse rounded-full bg-aqua" />
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

function MegaPanel({
  item,
  index,
  features,
}: {
  item: Extract<NavItem, { children: unknown }>;
  index: number;
  features: CaseStudy[];
}) {
  const feature = features[index % Math.max(features.length, 1)];
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="border-t border-line"
    >
      <div className="container-x grid grid-cols-12 gap-8 py-8">
        <p className="eyebrow col-span-3 pt-2">{item.label}</p>
        <ul className="col-span-5 grid gap-1">
          {item.children.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
            >
              <Link
                href={link.href}
                className="group flex items-baseline justify-between gap-6 rounded-lg px-3 py-3 transition-colors hover:bg-foreground/[0.04]"
              >
                <span className="text-xl font-medium tracking-tight">{link.label}</span>
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {link.description}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
        {feature ? (
        <Link
          href={`/our-works-case-study/${feature.slug}`}
          className="group col-span-4 overflow-hidden rounded-xl border border-line bg-surface"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={feature.image}
              alt=""
              fill
              sizes="400px"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
          </div>
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="eyebrow">Featured work</p>
              <p className="mt-1 text-sm font-medium">{feature.client}</p>
            </div>
            <p className="font-mono text-lg text-aqua">{feature.metric.value}</p>
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
      className="fixed inset-0 z-40 flex flex-col bg-background pt-20 lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto">
        <ul>
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              className="border-b border-line"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.04 }}
            >
              <Link href={link.href} className="flex items-baseline justify-between py-4">
                <span className="text-2xl font-medium tracking-tight">{link.label}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="container-x grid grid-cols-2 gap-2 border-t border-line py-4">
        <CtaLink href={site.bookingHref} className="justify-center">
          Book a call
        </CtaLink>
        <CtaLink href={whatsappHref(pathname)} variant="ghost" className="justify-center">
          WhatsApp
        </CtaLink>
      </div>
    </motion.div>
  );
}
