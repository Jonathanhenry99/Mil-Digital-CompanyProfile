"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Job } from "@/lib/cms";
import { scrollToY } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { ApplicationForm } from "./small-forms";

const TYPE: Record<string, string> = { "full-time": "Full-time", contract: "Contract", internship: "Internship" };
const MODE: Record<string, string> = { onsite: "On-site", hybrid: "Hybrid", remote: "Remote" };

/**
 * Open roles as an accordion; "Apply" picks the role in the application
 * form below and scrolls to it (page inventory: open roles → application form).
 */
export function Careers({ jobs }: { jobs: Job[] }) {
  const [open, setOpen] = React.useState<number | null>(jobs[0]?.id ?? null);
  const [selected, setSelected] = React.useState<number | null>(null);
  const formRef = React.useRef<HTMLDivElement>(null);

  const apply = (id: number) => {
    setSelected(id);
    const el = formRef.current;
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 100);
  };

  return (
    <>
      <section data-ground="#0c0d0f" className="sec" aria-label="Open roles">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label">Open roles</p>
            <h2 className="t-h2 mt-4">{jobs.length ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}` : "No open roles right now"}</h2>
            <p className="t-body mt-4 text-fg-2">
              {jobs.length ? "Don't see your role? Send an open application below." : "We still read every open application. Tell us what you'd bring."}
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {jobs.map((j) => {
              const isOpen = open === j.id;
              return (
                <li key={j.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : j.id)}
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-6 text-left"
                  >
                    <span>
                      <span className="t-display block text-[clamp(1.6rem,2.6vw,2.3rem)] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{j.title}</span>
                      <span className="mt-2 block text-[13px] text-fg-2">
                        {j.department} · {j.location} · {TYPE[j.employmentType] ?? j.employmentType} · {MODE[j.workMode] ?? j.workMode}
                      </span>
                    </span>
                    <Plus className={cn("size-6 transition-transform duration-500", isOpen && "rotate-45")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-8 md:grid-cols-2">
                          <p className="text-[15px] leading-relaxed text-fg-body md:col-span-2">{j.summary}</p>
                          {[
                            ["What you'll do", j.responsibilities],
                            ["What you bring", j.requirements],
                          ].map(([title, items]) => (
                            <div key={title as string}>
                              <p className="t-label">{title as string}</p>
                              <ul className="mt-3 space-y-2 text-[15px] text-fg-body">
                                {(items as string[]).map((it) => (
                                  <li key={it} className="flex gap-3">
                                    <span className="mt-2.5 size-1.5 shrink-0 bg-signal" />
                                    {it}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <div className="md:col-span-2">
                            <button
                              type="button"
                              onClick={() => apply(j.id)}
                              className="inline-flex h-11 items-center gap-3 bg-[var(--cta-bg)] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--cta-bg-hover)]"
                            >
                              Apply for this role →
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="theme-light sec" aria-label="Application form">
        <div ref={formRef} className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label">Apply</p>
            <h2 className="t-h2 mt-4">Tell us about you.</h2>
            <p className="t-body mt-4 text-fg-2">A link to your CV or portfolio is enough to start. We reply to every application.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplicationForm jobs={jobs.map((j) => ({ id: j.id, title: j.title }))} selected={selected} />
          </div>
        </div>
      </section>
    </>
  );
}
