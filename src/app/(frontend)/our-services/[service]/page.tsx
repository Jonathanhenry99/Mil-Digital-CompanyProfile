import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { creativeIndustries, platforms, servicePages } from "@/content/service-pages";
import { getCaseStudies, getHomeData } from "@/lib/cms";
import { whatsappHref } from "@/lib/whatsapp";
import { CtaLink, TextLink } from "@/components/ui/cta-link";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead, PageSkeleton } from "@/components/page/blocks";
import { CaseCarousel } from "@/components/page/case-carousel";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Process } from "@/components/sections/process";
import { CurvedGallery } from "@/components/sections/curved-gallery";
import { Hairline } from "@/components/motion/hairline";
import { Odometer } from "@/components/motion/odometer";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

export function generateStaticParams() {
  return servicePages.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/our-services/[service]">): Promise<Metadata> {
  const { service } = await params;
  const s = servicePages.find((p) => p.slug === service);
  return s ? { title: s.name, description: s.intro } : {};
}

/**
 * Template for the three service pages. Shared: hero, client proof,
 * frameworks, case studies. Unique per service: the approach (consultation),
 * platforms + ROAS (advertising), industries, works and values (creative).
 */
async function ServicePageContent({ params }: { params: PageProps<"/our-services/[service]">["params"] }) {
  const { service } = await params;
  const s = servicePages.find((p) => p.slug === service);
  if (!s) notFound();

  const [home, cases] = await Promise.all([getHomeData(), getCaseStudies()]);
  const related = cases.filter((c) => c.services.includes(s.caseService));
  const roasCase = cases.find((c) => /roas/i.test(c.metric.label)) ?? related[0];

  return (
    <>
      <PageHero
        label={s.name}
        title={s.headline}
        intro={s.intro}
        image={s.image}
        focal={s.focal}
        actions={
          <>
            <BriefTrigger service={s.briefService}>Discuss {s.briefService.toLowerCase()}</BriefTrigger>
            <CtaLink href={whatsappHref(`/our-services/${s.slug}`)} variant="ghost">
              WhatsApp
            </CtaLink>
          </>
        }
      />

      <ClientMarquee clients={home.clients} />

      {s.feature === "approach" ? <Process /> : null}

      {s.feature === "platforms" ? (
        <section className="theme-light sec" aria-label="Platforms and results">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="t-label">Platforms</p>
              <SplitText as="h2" text={"Wherever your\ncustomers scroll."} className="t-h2 mt-4" />
              <div className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
                {platforms.map((p, i) => (
                  <Reveal key={p} delay={i * 0.05} className="grid h-24 place-items-center bg-background">
                    <span className="t-display text-2xl">{p}</span>
                  </Reveal>
                ))}
              </div>
              <p className="t-label mt-4">Meta certified media buying professionals on the team.</p>
            </div>
            {roasCase ? (
              <Reveal variant="right" className="flex flex-col justify-between border border-line bg-surface p-8 lg:col-span-5 lg:col-start-8">
                <p className="t-label">Quick look · {roasCase.client}</p>
                <p className="t-display mt-10 text-[clamp(4.5rem,10vw,9rem)] leading-none">
                  <Odometer value={roasCase.metric.value.replace(/[^\d.]/g, "") || "0"} />
                  <span className="text-signal">{roasCase.metric.value.replace(/[\d.]/g, "")}</span>
                </p>
                <p className="mt-3 text-xl text-fg-body">{roasCase.metric.label}</p>
                <p className="mt-6 text-[15px] text-fg-2">{roasCase.title}</p>
                <div className="mt-8">
                  <TextLink href={`/our-works-case-study/${roasCase.slug}`}>Read the case study</TextLink>
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {s.feature === "creative" ? (
        <>
          <section className="theme-light sec" aria-label="Industries">
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="t-label">Portfolio industries</p>
                <SplitText as="h2" text={"Content for\nevery category."} className="t-h2 mt-4" />
              </div>
              <ul className="flex flex-wrap content-end gap-2 lg:col-span-7">
                {creativeIndustries.map((ind, i) => (
                  <li key={ind}>
                    <Reveal delay={i * 0.04} className="border border-line-strong px-4 py-2.5 text-[15px]">
                      {ind}
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <CurvedGallery gallery={home.gallery} />
          <section className="theme-light sec" aria-label="Values">
            <div className="container-x">
              <p className="t-label">What we believe</p>
              <SplitText
                as="p"
                text={"We're the data nerds of creative.\nIdeas are judged by what they do for the brand,\nnot just how they look."}
                className="t-statement mt-6 max-w-[26ch]"
              />
            </div>
          </section>
        </>
      ) : null}

      <section data-ground="#0c0d0f" className="sec" aria-label="Frameworks">
        <div className="container-x">
          <SectionHead label="Frameworks" title={s.frameworksTitle} />
          <ol className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {s.frameworks.map((f, i) => (
              <li key={f.title} className="bg-background">
                <Reveal delay={i * 0.08} className="h-full p-7">
                  <p className="text-[13px] tabular-nums text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-display mt-8 text-[1.75rem]">{f.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{f.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Hairline className="mt-16" />
        </div>
      </section>

      {related.length ? (
        <CaseCarousel cases={related} label="Case studies" title={`${s.name.split(" ")[0]} work,\nin numbers.`} filters={false} theme="light" />
      ) : null}
    </>
  );
}

/** URL data is read inside Suspense, so navigation to this route can be instant. */
export default function ServicePage({ params }: PageProps<"/our-services/[service]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServicePageContent params={params} />
    </Suspense>
  );
}
