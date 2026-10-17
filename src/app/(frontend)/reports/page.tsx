import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getReports } from "@/lib/cms";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/blocks";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Reports",
  description: "Industry research from MIL Digital: how Indonesian brands spend, test and grow online.",
};

// Copy for review with the MIL research team.
const ABOUT = [
  {
    title: "Methodology",
    body: "Each report combines anonymised campaign data from brands we manage, platform benchmarks and interviews with marketers in the industry. Every figure states its sample and period.",
  },
  {
    title: "Why it's powerful",
    body: "Most reports describe the market. Ours come from running campaigns in it, so the findings point to decisions you can make next month, not just trends to watch.",
  },
  {
    title: "Notes from the researcher",
    body: "We publish what surprised us as well as what confirmed our hunches, and we explain the limits of the data so you can judge it for yourself.",
  },
];

/** Inventory: report methodology, why it's powerful, notes from the researcher (CMS list). */
export default async function ReportsPage() {
  const reports = await getReports();
  return (
    <>
      <PageHero
        label="Reports"
        title={"Research from\nthe campaign floor."}
        intro="Industry reports built from real campaigns across Indonesia, written for the people who decide where the next rupiah goes."
      />

      <section className="theme-light sec" aria-label="About our research">
        <div className="container-x">
          <SectionHead label="About our research" title={"How we make\nour reports."} />
          <div className="grid gap-px bg-line md:grid-cols-3">
            {ABOUT.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} className="bg-background p-8">
                <p className="text-[13px] tabular-nums text-signal">0{i + 1}</p>
                <h3 className="t-display mt-8 text-[1.9rem]">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-ground="#0c0d0f" className="sec" aria-label="All reports">
        <div className="container-x">
          <SectionHead label="Latest reports" title={"Read the\nfindings."} />
          <div className="grid gap-6 md:grid-cols-2">
            {reports.map((r) => (
              <Link key={r.slug} href={`/reports/${r.slug}`} className="ticks group grid border border-line bg-surface md:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                  <Image src={r.image} alt="" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-between gap-8 p-6">
                  <div>
                    <p className="text-[13px] text-signal-soft">{r.industry || "Industry report"}</p>
                    <h3 className="t-display mt-3 text-[1.9rem]">{r.title}</h3>
                    <p className="mt-3 text-[15px] text-fg-2">{r.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-line pt-4">
                    {r.findings.slice(0, 2).map((f) => (
                      <span key={f.label}>
                        <span className="t-display block text-3xl">{f.stat}</span>
                        <span className="block text-xs text-fg-2">{f.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
