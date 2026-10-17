import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/lib/cms";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { PageHero } from "@/components/page/page-hero";
import { Placeholder, RichText } from "@/components/page/blocks";
import { Odometer } from "@/components/motion/odometer";
import { Reveal } from "@/components/motion/reveal";

const SCALE_LABEL: Record<string, string> = { sme: "SME", "mid-market": "Mid-market", enterprise: "Enterprise" };

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/our-works-case-study/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  return c ? { title: `${c.client} case study`, description: c.title } : {};
}

/** Inventory: one dedicated page per case study (CMS). */
export default async function CaseStudyPage({ params }: PageProps<"/our-works-case-study/[slug]">) {
  const { slug } = await params;
  const [c, all] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!c) notFound();
  const next = all[(all.findIndex((x) => x.slug === c.slug) + 1) % all.length];
  const numeric = c.metric.value.replace(/[^\d.]/g, "");

  const facts = [
    ["Client", c.client],
    ["Industry", c.industry],
    ["Scale", c.scale ? SCALE_LABEL[c.scale] ?? c.scale : "—"],
    ["Services", c.services.join(", ")],
    ["Year", c.year ?? "—"],
  ];

  return (
    <>
      <PageHero label={`Case study · ${c.industry}`} title={c.client} intro={c.title} image={c.image} />

      <section className="theme-light sec" aria-label="Results">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="t-label">Headline result</p>
            <p className="t-display mt-6 text-[clamp(5rem,12vw,11rem)] leading-none">
              {c.metric.value.match(/^[^\d]*/)?.[0]}
              {numeric ? <Odometer value={numeric} /> : null}
              <span className="text-signal">{c.metric.value.replace(/^[^\d]*[\d.]+/, "")}</span>
            </p>
            <p className="mt-4 text-2xl text-fg-body">{c.metric.label}</p>
          </Reveal>
          <dl className="grid content-start gap-px bg-line sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {facts.map(([k, v], i) => (
              <div key={k} className={i === facts.length - 1 && facts.length % 2 ? "bg-background p-5 sm:col-span-2" : "bg-background p-5"}>
                <dt className="t-label">{k}</dt>
                <dd className="mt-2 text-lg font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section data-ground="#0c0d0f" className="sec" aria-label="The story">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label">The story</p>
            {c.summary ? <p className="t-statement mt-6 text-[clamp(1.6rem,2.6vw,2.4rem)]">{c.summary}</p> : null}
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {c.body ? (
              <RichText data={c.body} />
            ) : (
              <Placeholder
                title="Full story coming soon"
                body="The challenge, approach and results for this case study are being written. In the meantime, ask us how we'd approach a brand like yours."
              />
            )}
            <div className="mt-10">
              <BriefTrigger>Get a similar result</BriefTrigger>
            </div>
          </div>
        </div>
      </section>

      {next && next.slug !== c.slug ? (
        <Link href={`/our-works-case-study/${next.slug}`} className="theme-light group block border-t border-line" aria-label={`Next case study: ${next.client}`}>
          <div className="container-x grid items-center gap-8 py-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="t-label">Next case study</p>
              <p className="t-display mt-3 text-[clamp(2.6rem,6vw,5.5rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                {next.client} →
              </p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden md:col-span-4 md:col-start-9">
              <Image src={next.image} alt="" fill sizes="33vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
            </div>
          </div>
        </Link>
      ) : null}
    </>
  );
}
