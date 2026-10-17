import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";

/** Label + headline (+ intro, + action) at the top of a section. */
export function SectionHead({
  label,
  title,
  intro,
  action,
  className,
}: {
  label: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-7">
        <p className="t-label">{label}</p>
        <SplitText as="h2" text={title} className="t-h2 mt-4" />
      </div>
      {intro || action ? (
        <Reveal className="grid justify-items-start gap-5 md:col-span-4 md:col-start-9">
          {intro ? <p className="t-body text-fg-2">{intro}</p> : null}
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}

type CaseLike = { slug: string; client: string; title: string; industry: string; services: string[]; metric: { value: string; label: string }; image: string };

/** A case study as a card: photo, client, one line, the headline result. */
export function CaseCard({ c, className, sizes = "(min-width: 1024px) 33vw, 100vw" }: { c: CaseLike; className?: string; sizes?: string }) {
  return (
    <Link href={`/our-works-case-study/${c.slug}`} className={cn("group block", className)}>
      <div className="ticks relative aspect-[4/3] overflow-hidden bg-surface">
        <Image src={c.image} alt={`${c.client} case study`} fill sizes={sizes} className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
        <span className="absolute bottom-3 left-3 bg-[#0c0d0f]/85 px-3 py-2 backdrop-blur">
          <span className="t-display block text-2xl text-white">{c.metric.value}</span>
          <span className="block text-[11px] text-white/70">{c.metric.label}</span>
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="text-[13px] text-fg-3">
            {c.industry} · {c.services.join(" + ")}
          </p>
          <h3 className="t-display mt-1.5 text-[1.6rem]">{c.client}</h3>
          <p className="mt-1 text-[15px] text-fg-2">{c.title}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-fg-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  );
}

type ArticleLike = { slug: string; category: string; title: string; excerpt: string; readingTime: string; image: string };

export function ArticleCard({ a, className }: { a: ArticleLike; className?: string }) {
  return (
    <Link href={`/insights/${a.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
      </div>
      <p className="mt-4 text-[13px] text-fg-3">
        <span className="text-signal">{a.category}</span> · {a.readingTime}
      </p>
      <h3 className="t-display mt-2 text-[1.55rem] transition-colors group-hover:text-signal">{a.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{a.excerpt}</p>
    </Link>
  );
}

/** CMS rich text with editorial typography. */
export function RichText({ data, className }: { data: unknown; className?: string }) {
  if (!data) return null;
  return (
    <div
      className={cn(
        "max-w-[42em] text-[18px] leading-[1.75] text-fg-body",
        "[&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-[clamp(1.7rem,2.6vw,2.3rem)] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground",
        "[&_h3]:mb-3 [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:mb-6 [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-4",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:pl-1",
        "[&_blockquote]:my-12 [&_blockquote]:border-l-2 [&_blockquote]:border-signal [&_blockquote]:pl-6 [&_blockquote]:font-display [&_blockquote]:text-[clamp(1.4rem,2.4vw,2rem)] [&_blockquote]:leading-snug [&_blockquote]:text-foreground",
        className,
      )}
    >
      <PayloadRichText data={data as SerializedEditorState} />
    </div>
  );
}

/** A quiet "coming soon" card for content the CMS doesn't hold yet. */
export function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-line-strong p-8">
      <p className="text-[15px] font-semibold">{title}</p>
      <p className="mt-2 max-w-xl text-[15px] text-fg-2">{body}</p>
    </div>
  );
}

/**
 * Fallback for the dynamic detail pages while their URL-specific content
 * streams in on a client-side navigation (Next 16 instant navigation):
 * the dark title band, without the words.
 */
export function PageSkeleton() {
  return (
    <section data-ground="#0c0d0f" className="min-h-[70svh] pt-40" aria-busy="true" aria-label="Loading">
      <div className="container-x">
        <span className="block h-3 w-40 animate-pulse bg-surface-raised" />
        <span className="mt-8 block h-16 w-[min(720px,80%)] animate-pulse bg-surface" />
        <span className="mt-4 block h-16 w-[min(520px,60%)] animate-pulse bg-surface" />
      </div>
    </section>
  );
}
