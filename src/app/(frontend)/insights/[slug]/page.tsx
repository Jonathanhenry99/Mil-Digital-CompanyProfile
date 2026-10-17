import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle, getArticles } from "@/lib/cms";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { ArticleCard, RichText, PageSkeleton } from "@/components/page/blocks";
import { SplitText } from "@/components/motion/split-text";

const date = (iso: string | null) =>
  iso ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso)) : "";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  return a ? { title: a.title, description: a.excerpt, openGraph: { images: a.image ? [a.image] : [] } } : {};
}

/** Inventory: article, author, related posts, consultation CTA (CMS). */
async function ArticlePageContent({ params }: { params: PageProps<"/insights/[slug]">["params"] }) {
  const { slug } = await params;
  const [a, all] = await Promise.all([getArticle(slug), getArticles()]);
  if (!a) notFound();
  const sameCat = all.filter((x) => x.slug !== a.slug && x.category === a.category);
  const related = [...sameCat, ...all.filter((x) => x.slug !== a.slug && x.category !== a.category)].slice(0, 3);

  return (
    <article>
      <header data-ground="#0c0d0f" className="container-x pb-12 pt-36 md:pt-44">
        <Link href="/insights" className="t-label inline-flex items-center gap-2 hover:text-foreground">
          <ArrowLeft className="size-4" /> All insights
        </Link>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="text-[13px] text-fg-3">
              <span className="text-signal">{a.category}</span> · {a.readingTime}
            </p>
            <SplitText as="h1" mode="load" text={a.title} className="t-display mt-4 text-[clamp(2.6rem,5.6vw,5.4rem)]" />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-line pt-5 text-[15px]">
          {a.author ? (
            <p>
              <span className="text-fg-3">Written by </span>
              <span className="font-semibold">{a.author.name}</span>
              {a.author.role ? <span className="text-fg-3">, {a.author.role}</span> : null}
            </p>
          ) : null}
          {a.publishedAt ? <p className="text-fg-3">{date(a.publishedAt)}</p> : null}
        </div>
      </header>

      <div className="container-x relative z-10">
        <div className="relative aspect-[21/9] overflow-hidden bg-surface">
          <Image src={a.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <div className="theme-light -mt-[12vw] pt-[12vw]">
      <div className="container-x grid gap-14 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-2">
          {a.content ? <RichText data={a.content} /> : <p className="t-body text-xl">{a.excerpt}</p>}
        </div>
        <aside className="lg:col-span-3">
          <div className="border border-line bg-surface p-6 lg:sticky lg:top-28">
            <p className="t-label">Free consultation</p>
            <p className="t-display mt-3 text-2xl">Want this applied to your brand?</p>
            <p className="mt-3 text-[15px] text-fg-2">Talk to our certified experts, free for the first session.</p>
            <BriefTrigger size="md" className="mt-6">
              Book a consultation
            </BriefTrigger>
          </div>
        </aside>
      </div>

      </div>

      {related.length ? (
        <section className="theme-light border-t border-line py-16" aria-label="Related articles">
          <div className="container-x">
            <p className="t-label">Keep reading</p>
            <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} a={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

/** URL data is read inside Suspense, so navigation to this route can be instant. */
export default function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ArticlePageContent params={params} />
    </Suspense>
  );
}
