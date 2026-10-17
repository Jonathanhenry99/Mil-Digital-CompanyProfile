"use client";

import * as React from "react";
import { motion, useMotionValue } from "motion/react";
import { SignalField } from "@/components/sections/signal-field";

const CHANNELS = [
  { name: "Meta Ads", share: 0.42 },
  { name: "TikTok Shop", share: 0.27 },
  { name: "Google", share: 0.18 },
  { name: "Marketplace", share: 0.13 },
];

/**
 * A product preview made of real UI rather than a screenshot, so it can be
 * animated and reused on the full ATLAS page later. Figures are sample data.
 */
export function AtlasPreview() {
  const formed = useMotionValue(0);
  React.useEffect(() => {
    // Assemble the chart once, shortly after it appears.
    const id = window.setTimeout(() => formed.set(0.7), 400);
    return () => window.clearTimeout(id);
  }, [formed]);

  return (
    <div className="ticks border border-line bg-[#08101f]/80 backdrop-blur" aria-label="ATLAS dashboard preview with sample data" role="img">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-[13px] text-fg-2">
        <span className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 bg-fg-3" />
            <span className="size-2 bg-fg-3" />
            <span className="size-2 bg-aqua" />
          </span>
          ATLAS · Brand overview
        </span>
        <span className="border border-line px-2 py-0.5 text-[11px] uppercase tracking-[0.1em] text-fg-3">Sample data</span>
      </div>
      <div className="grid md:grid-cols-12">
        <div className="grid grid-cols-2 border-b border-line md:col-span-3 md:grid-cols-1 md:border-b-0 md:border-r">
          {[
            ["Revenue", "Rp 1.24 M", "+18%"],
            ["ROAS", "4.6x", "+0.8"],
            ["New customers", "3,210", "+12%"],
            ["CPA", "Rp 38k", "−9%"],
          ].map(([k, v, d]) => (
            <div key={k} className="border-b border-line p-4 last:border-b-0">
              <p className="text-[11px] uppercase tracking-[0.1em] text-fg-3">{k}</p>
              <p className="t-display mt-1 text-2xl">{v}</p>
              <p className="text-[12px] text-aqua">{d} vs last month</p>
            </div>
          ))}
        </div>
        <div className="relative h-[300px] md:col-span-6 md:h-auto md:min-h-[340px]">
          <SignalField progress={formed} className="absolute inset-0 size-full" />
        </div>
        <div className="border-t border-line p-4 md:col-span-3 md:border-l md:border-t-0">
          <p className="text-[11px] uppercase tracking-[0.1em] text-fg-3">Revenue by channel</p>
          <ul className="mt-4 space-y-4">
            {CHANNELS.map((c, i) => (
              <li key={c.name}>
                <div className="flex justify-between text-[13px]">
                  <span>{c.name}</span>
                  <span className="tabular-nums text-fg-2">{Math.round(c.share * 100)}%</span>
                </div>
                <div className="mt-1.5 h-1 bg-line">
                  <motion.div
                    className="h-full bg-signal"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.share * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
