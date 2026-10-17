"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { ArticleFull } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { ArticleCard } from "./blocks";

const date = (iso: string | null) =>
  iso ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)) : "";

/** Insights: category chips, the newest article large, the rest in a grid. */
export function InsightsList({ articles }: { articles: ArticleFull[] }) {
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const [cat, setCat] = React.useState("All");
  const shown = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  const [lead, ...rest] = shown;

  return (
    <section className="theme-light sec" aria-label="Articles">
      <div className="container-x">
        <div className="flex flex-wrap gap-2 border-y border-line py-5" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "border px-3 py-1.5 text-[13px] transition-colors",
                cat === c ? "border-foreground bg-foreground text-background" : "border-line-strong text-fg-2 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            {lead ? (
              <Link href={`/insights/${lead.slug}`} className="group mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface lg:col-span-7">
                  <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[13px] text-fg-3">
                    <span className="text-signal">{lead.category}</span> · {lead.readingTime} · {date(lead.publishedAt)}
                  </p>
                  <h2 className="t-h2 mt-4 transition-colors group-hover:text-signal">{lead.title}</h2>
                  <p className="t-body mt-4 text-fg-2">{lead.excerpt}</p>
                  {lead.author ? <p className="mt-6 text-sm">By {lead.author.name}</p> : null}
                </div>
              </Link>
            ) : (
              <p className="mt-12 text-fg-2">No articles in this category yet.</p>
            )}
            {rest.length ? (
              <div className="mt-16 grid gap-x-6 gap-y-14 border-t border-line pt-14 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <ArticleCard key={a.slug} a={a} />
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
