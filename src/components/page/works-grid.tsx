"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { CaseStudyFull } from "@/lib/cms";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { CaseCard } from "./blocks";

const SCALE_LABEL: Record<string, string> = { sme: "SME", "mid-market": "Mid-market", enterprise: "Enterprise" };

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="t-label mr-2 w-20">{label}</span>
      {["All", ...options].map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "border px-3 py-1.5 text-[13px] transition-colors",
            value === o ? "border-foreground bg-foreground text-background" : "border-line-strong text-fg-2 hover:text-foreground",
          )}
        >
          {SCALE_LABEL[o] ?? o}
        </button>
      ))}
    </div>
  );
}

/**
 * Our Works: filter by industry, scale and service (page inventory). The
 * filter lives in the URL (?industry=&scale=&service=) so a filtered view
 * can be shared; cards re-flow with a layout animation.
 */
export function WorksGrid({ cases }: { cases: CaseStudyFull[] }) {
  const industries = [...new Set(cases.map((c) => c.industry))];
  const scales = [...new Set(cases.map((c) => c.scale).filter(Boolean))] as string[];
  const services = [...new Set(cases.flatMap((c) => c.services))];
  const [f, setF] = React.useState({ industry: "All", scale: "All", service: "All" });

  // Read the filter from the URL once mounted, and write it back on change.
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const next = { industry: q.get("industry") ?? "All", scale: q.get("scale") ?? "All", service: q.get("service") ?? "All" };
    if (next.industry !== "All" || next.scale !== "All" || next.service !== "All") {
      const id = window.setTimeout(() => setF(next), 0);
      return () => window.clearTimeout(id);
    }
  }, []);
  const set = (k: keyof typeof f) => (v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    const q = new URLSearchParams();
    for (const [key, val] of Object.entries(next)) if (val !== "All") q.set(key, val);
    window.history.replaceState(null, "", q.size ? `?${q}` : window.location.pathname);
  };

  const shown = cases.filter(
    (c) =>
      (f.industry === "All" || c.industry === f.industry) &&
      (f.scale === "All" || c.scale === f.scale) &&
      (f.service === "All" || c.services.includes(f.service)),
  );

  return (
    <section className="theme-light sec" aria-label="All case studies">
      <div className="container-x">
        <div className="grid gap-3 border-y border-line py-6">
          <Chips label="Industry" options={industries} value={f.industry} onChange={set("industry")} />
          {scales.length ? <Chips label="Scale" options={scales} value={f.scale} onChange={set("scale")} /> : null}
          <Chips label="Service" options={services} value={f.service} onChange={set("service")} />
        </div>
        <p className="t-label mt-6" aria-live="polite">
          {shown.length} case {shown.length === 1 ? "study" : "studies"}
        </p>

        <motion.div layout className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((c) => (
              <motion.div
                key={c.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <CaseCard c={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {shown.length === 0 ? (
          <div className="mt-8 border border-dashed border-line-strong p-10">
            <p className="text-lg font-semibold">No case study matches yet.</p>
            <p className="mt-2 text-fg-2">
              Try another filter, or{" "}
              <Link href={site.quizHref} className="text-signal underline underline-offset-4">
                take the brand quiz
              </Link>{" "}
              to see how MIL would approach your brand.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
