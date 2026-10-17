import { ArrowRight, FileText } from "lucide-react";
import type { HomeData } from "@/lib/cms";
import { TextLink } from "@/components/ui/cta-link";
import { ImageGallery, type GalleryItem } from "@/components/ui/image-gallery";
import { SplitText } from "@/components/motion/split-text";

const card = "block border border-white/10 bg-[#0c0d0f]/80 p-5 backdrop-blur-xl";

/**
 * Chapter 10 (inventory: articles & reports). The featured report and the
 * latest articles as an expanding gallery; the hovered panel opens with a
 * short card. Panels shutter open in sequence on arrival.
 */
export function Insights({ insights }: { insights: HomeData["insights"] }) {
  const { articles, report } = insights;

  const items: GalleryItem[] = [
    ...(report
      ? [
          {
            id: report.slug,
            src: report.image,
            label: "New report",
            href: `/reports/${report.slug}`,
            className: "border-signal/50",
            content: (
              <span className={card}>
                <span className="inline-flex items-center gap-2 bg-signal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                  <FileText className="size-3" /> New report
                </span>
                <span className="t-display mt-4 block text-3xl">{report.title}</span>
                <span className="mt-2 block text-sm text-fg-2">{report.summary}</span>
                <span className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
                  {report.findings.map((f) => (
                    <span key={f.label}>
                      <span className="t-display block text-3xl text-signal-soft">{f.stat}</span>
                      <span className="mt-1 block text-xs text-fg-2">{f.label}</span>
                    </span>
                  ))}
                </span>
              </span>
            ),
          },
        ]
      : []),
    ...articles.map((a) => ({
      id: a.slug,
      src: a.image,
      label: a.category,
      href: `/insights/${a.slug}`,
      content: (
        <span className={card}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-soft">{a.category}</span>
          <span className="t-display mt-3 block text-2xl md:text-3xl">{a.title}</span>
          <span className="mt-2 block text-sm text-fg-2">{a.excerpt}</span>
          <span className="mt-5 flex items-center justify-between text-[13px] text-fg-2">
            {a.readingTime}
            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
              Read <ArrowRight className="size-3.5" />
            </span>
          </span>
        </span>
      ),
    })),
  ];

  return (
    <section data-ground="#101216" className="sec" aria-label="Insights and reports">
      <div className="container-x">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="t-label">Insights &amp; reports</p>
            <SplitText as="h2" text={"Thinking out loud,\nwith receipts."} className="t-h2 mt-4" />
          </div>
          <div className="grid justify-items-start gap-5 md:col-span-4 md:col-start-9 md:justify-items-end md:text-right">
            <p className="t-body text-fg-2">Playbooks, points of view and industry research from the MIL team.</p>
            <TextLink href="/insights">All insights</TextLink>
          </div>
        </div>
        <ImageGallery items={items} />
      </div>
    </section>
  );
}
