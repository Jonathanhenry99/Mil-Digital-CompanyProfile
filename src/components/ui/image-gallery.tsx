"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ── Expanding image gallery ─────────────────────────────────────
 * Adapted from the 21st.dev "image-gallery" snippet: a row of image
 * panels where the hovered (or focused) one widens. Changes from the
 * original:
 *  - no global `* { font-family: Poppins }` override (it would replace the
 *    site font everywhere) and no hard-coded demo images;
 *  - the open panel stays open when the pointer leaves, and shows a small
 *    content card; closed panels show a vertical label;
 *  - stacks vertically on phones, keyboard focus opens a panel too;
 *  - welcoming entrance: panels are shuttered open one after another.
 * ─────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  id: string;
  src: string;
  alt?: string;
  /** Short label shown on the closed panel. */
  label: string;
  href?: string;
  /** Card shown on the open panel. */
  content?: React.ReactNode;
  /** Extra classes for this panel (e.g. an accent ring). */
  className?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ImageGallery({
  items,
  defaultIndex = 0,
  className,
}: {
  items: GalleryItem[];
  defaultIndex?: number;
  className?: string;
}) {
  const [active, setActive] = React.useState(defaultIndex);

  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09 } } }}
      className={cn("flex h-[720px] flex-col gap-2 md:h-[560px] md:flex-row md:gap-3", className)}
    >
      {items.map((item, i) => {
        const open = i === active;
        const Panel = item.href ? Link : "div";
        return (
          <motion.div
            key={item.id}
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0%)" },
              shown: { clipPath: "inset(0% 0% 0% 0%)" },
            }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative min-h-0 min-w-0 basis-0 transition-[flex-grow] duration-700 ease-out-expo"
            style={{ flexGrow: open ? 5 : 1 }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Panel
              href={item.href ?? ""}
              className={cn(
                "group absolute inset-0 block overflow-hidden border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                item.className,
              )}
            >
              <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={cn(
                  "object-cover transition-[transform,opacity,filter] duration-1000 ease-out-expo",
                  open ? "scale-100" : "scale-110 saturate-[0.35]",
                )}
              />
              <span
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-700",
                  open ? "opacity-80" : "opacity-100",
                )}
              />

              {/* Closed: label, vertical on desktop */}
              <span
                aria-hidden={open}
                className={cn(
                  "absolute bottom-4 left-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-opacity duration-300 md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:rotate-180 md:[writing-mode:vertical-rl]",
                  open ? "opacity-0" : "opacity-100 delay-300",
                )}
              >
                <span className="text-white/60">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </span>

              {/* Open: content card, fixed width so it never reflows mid-transition */}
              <span
                className={cn(
                  "absolute inset-x-3 bottom-3 block transition-[opacity,translate] duration-700 ease-out-expo md:inset-x-auto md:bottom-5 md:left-5 md:w-[min(420px,calc(100%-2.5rem))]",
                  open ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0",
                )}
              >
                {item.content}
              </span>
            </Panel>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ImageGallery;
