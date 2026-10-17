import { ArrowUpRight, FileText } from "lucide-react";
import type { HomeData } from "@/lib/cms";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageGallery, type GalleryItem } from "@/components/ui/image-gallery";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

const card = "block rounded-xl border border-white/60 bg-white/80 p-5 shadow-[0_20px_40px_-24px_rgb(var(--shadow-tint)/0.5)] backdrop-blur-xl";

/**
 * Latest report and articles as an expanding gallery (CMS later): the
 * hovered panel opens and shows a short card.
 * Welcoming: the sheet rises, then the panels shutter open in sequence.
 */
export function Insights({ insights }: { insights: HomeData["insights"] }) {
  const { articles, report } = insights;

  const reportItem: GalleryItem[] = report
    ? [
    {
      id: report.slug,
      src: report.image,
      label: "New report",
      href: `/reports/${report.slug}`,
      className: "border-signal/40",
      content: (
        <span className={card}>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white">
            <FileText className="size-3" /> New report
          </span>
          <span className="mt-4 block text-2xl font-medium leading-tight tracking-tight">{report.title}</span>
          <span className="mt-2 block text-sm text-muted-foreground">{report.summary}</span>
          <span className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
            {report.findings.map((f) => (
              <span key={f.label}>
                <span className="block font-mono text-2xl text-aqua">{f.stat}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{f.label}</span>
              </span>
            ))}
          </span>
        </span>
      ),
    },
      ]
    : [];

  const items: GalleryItem[] = [
    ...reportItem,
    ...articles.map((a) => ({
      id: a.slug,
      src: a.image,
      label: a.category,
      href: `/insights/${a.slug}`,
      content: (
        <span className={card}>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal-soft">{a.category}</span>
          <span className="mt-3 block text-xl font-medium leading-snug tracking-tight md:text-2xl">{a.title}</span>
          <span className="mt-2 block text-sm text-muted-foreground">{a.excerpt}</span>
          <span className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {a.readingTime}
            <span className="inline-flex items-center gap-1 text-foreground">
              Read <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        </span>
      ),
    })),
  ];

  return (
    <SectionEntrance variant="rise" sheetClassName="bg-surface">
      <div className="container-x py-24 md:py-36">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="10">Insights &amp; reports</Eyebrow>
            <SplitText
              as="h2"
              text={"Thinking out loud,\nwith receipts."}
              className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
            />
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="max-w-sm text-muted-foreground md:text-right">
              Playbooks, points of view and industry research from the MIL team.
            </p>
            <CtaLink href="/insights" variant="ghost">
              All insights
            </CtaLink>
          </div>
        </div>

        <ImageGallery items={items} />
      </div>
    </SectionEntrance>
  );
}
