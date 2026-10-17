import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReport, getReports } from "@/lib/cms";
import { PageHero } from "@/components/page/page-hero";
import { ReportGate } from "@/components/page/small-forms";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const reports = await getReports();
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/reports/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = await getReport(slug);
  return r ? { title: r.title, description: r.summary } : {};
}

/** Inventory: industry and report detail (CMS); download is gated by a short form. */
export default async function ReportPage({ params }: PageProps<"/reports/[slug]">) {
  const { slug } = await params;
  const r = await getReport(slug);
  if (!r) notFound();

  return (
    <>
      <PageHero label={`Report · ${r.industry || "Industry"}`} title={r.title} intro={r.summary} image={r.image} />

      <section className="theme-light sec" aria-label="Key findings">
        <div className="container-x">
          <p className="t-label">Key findings</p>
          <div className={`mt-8 grid gap-px bg-line md:grid-cols-2 ${r.findings.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
            {r.findings.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} className="bg-background p-8">
                <p className="t-display text-[clamp(3.5rem,7vw,6rem)] leading-none">{f.stat}</p>
                <p className="mt-4 text-lg text-fg-body">{f.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-ground="#0c0d0f" className="sec" aria-label="Get the report">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-label">The full report</p>
            <h2 className="t-h2 mt-4">Get every chart, benchmark and recommendation.</h2>
            <p className="t-body mt-6 text-fg-2">
              {r.gated ? "Tell us where to send it. We'll only use your details to share this report and related research." : "Free to download."}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <ReportGate slug={r.slug} title={r.title} fileUrl={r.fileUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
